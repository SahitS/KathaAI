#!/usr/bin/env python3
"""
summarize.py
------------
Text summarizer using Hugging Face Transformers (BART CNN).
- Auto-installs dependencies if they're missing.
- Uses GPU if available, otherwise CPU.
- CLI mode: Accepts text via:
    1) default built-in Mahabharata sample (no args),
    2) --text "your text here",
    3) --file /path/to/file.txt,
    4) or piped stdin.
- API mode: FastAPI server for frontend integration.

CLI Usage:
    python summarize.py
    python summarize.py --text "Some long paragraph..."
    python summarize.py --file input.txt
    echo "text" | python summarize.py

API Usage:
    python summarize.py --serve --host 0.0.0.0 --port 8001
    curl -X POST "http://localhost:8001/summarize" -H "Content-Type: application/json" \
         -d "{\"text\":\"Your long text here\",\"min_length\":50,\"max_length\":120}"
"""

import sys
import os
import subprocess
import importlib
import argparse
import re
from typing import List

# Optional for API mode
try:
    from fastapi import FastAPI
    from pydantic import BaseModel
    import uvicorn
    FASTAPI_AVAILABLE = True
except Exception:
    FASTAPI_AVAILABLE = False

# ---------------------------
# Dependency management
# ---------------------------
def ensure_package(pkg: str) -> None:
    try:
        importlib.import_module(pkg)
    except ImportError:
        print(f"[setup] '{pkg}' not found. Installing...", flush=True)
        subprocess.check_call([sys.executable, "-m", "pip", "install", pkg])
        # verify
        importlib.import_module(pkg)

def ensure_deps():
    # torch first (so transformers can see it)
    ensure_package("torch")
    ensure_package("transformers")
    # Optional API deps
    if FASTAPI_AVAILABLE:
        ensure_package("fastapi")
        ensure_package("uvicorn")
        ensure_package("pydantic")

# ---------------------------
# Simple sentence-aware chunking
# ---------------------------
def split_into_chunks(text: str, max_chars: int = 2500) -> List[str]:
    """
    Split text into roughly sentence-sized chunks under max_chars.
    This keeps inputs safe for BART (which has a token limit ~1024).
    """
    text = text.strip()
    if not text:
        return []
    sentences = re.split(r'(?<=[\.\!\?।])\s+', text)
    chunks, buf = [], ""
    for s in sentences:
        if len(buf) + len(s) + 1 <= max_chars:
            buf = (buf + " " + s).strip()
        else:
            if buf:
                chunks.append(buf)
            buf = s
    if buf:
        chunks.append(buf)
    return chunks

# ---------------------------
# Main summarization logic
# ---------------------------
def build_summarizer():
    from transformers import pipeline
    import torch  # type: ignore

    device = 0 if torch.cuda.is_available() else -1
    if device == 0:
        print("[info] CUDA detected: using GPU", flush=True)
    else:
        print("[info] Using CPU", flush=True)

    # facebook/bart-large-cnn is ~1.6GB on first download
    return pipeline(
        "summarization",
        model="facebook/bart-large-cnn",
        device=device
    )

def summarize_text(summarizer, text: str, min_len: int = 50, max_len: int = 120) -> str:
    # If very long, summarize in chunks and then (optionally) summarize the concatenation.
    chunks = split_into_chunks(text, max_chars=2500)
    if not chunks:
        return ""

    partials = []
    for i, ch in enumerate(chunks, 1):
        print(f"[run] Summarizing chunk {i}/{len(chunks)}...", flush=True)
        out = summarizer(ch, max_length=max_len, min_length=min_len, do_sample=False)
        partials.append(out[0]["summary_text"].strip())

    combined = " ".join(partials).strip()

    # If we had to chunk and produced many partials, do a short final pass to tighten.
    if len(partials) > 1:
        print("[run] Refining combined summary...", flush=True)
        refined = summarizer(
            combined,
            max_length=max_len,
            min_length=min_len,
            do_sample=False
        )[0]["summary_text"].strip()
        return refined

    return combined

# ---------------------------
# CLI / I/O helpers
# ---------------------------
DEFAULT_TEXT = (
    "Narada said, 'Hear, O monarch, the story of the Mahabharata, the most sacred of all histories. "
    "It was first composed by the great Rishi Vyasa, and in it are contained the sacred teachings of the Vedas, "
    "the essence of the Upanishads, and the wisdom of the Puranas. It is said that whatever is not in the "
    "Mahabharata is nowhere to be found. This great epic describes the origin of the Bharata race, the lives and "
    "deeds of kings and warriors, the struggles between righteousness and unrighteousness, the duties of men, the "
    "destiny of mankind, and the highest truths of dharma. In the beginning, King Janamejaya, the great-grandson of "
    "Arjuna, desiring to hear the story of his ancestors, assembled the sages at his court. The learned sage "
    "Vaisampayana, a disciple of Vyasa, recited the whole history as taught by his master. It is through his words "
    "that we hear today the tale of the Kurukshetra war and the many stories of dharma and destiny interwoven within "
    "it. The Mahabharata is divided into many parvas, each filled with profound lessons, and is a guide to life for "
    "all people in all ages.'"
)

def read_stdin_if_piped() -> str:
    if not sys.stdin.isatty():
        data = sys.stdin.read()
        return data.strip()
    return ""

def parse_args():
    p = argparse.ArgumentParser(description="Summarize text with BART (facebook/bart-large-cnn).")
    p.add_argument("--text", type=str, help="Raw text to summarize.")
    p.add_argument("--file", type=str, help="Path to a UTF-8 text file to summarize.")
    p.add_argument("--min-length", type=int, default=50, help="Minimum summary length (tokens).")
    p.add_argument("--max-length", type=int, default=120, help="Maximum summary length (tokens).")
    p.add_argument("--serve", action="store_true", help="Run as HTTP API instead of CLI")
    p.add_argument("--host", type=str, default="127.0.0.1", help="API host")
    p.add_argument("--port", type=int, default=8001, help="API port")
    return p.parse_args()

def get_input_text(args) -> str:
    # Priority: --text > --file > stdin > default text
    if args.text:
        return args.text.strip()
    if args.file:
        if not os.path.exists(args.file):
            print(f"[error] File not found: {args.file}", file=sys.stderr)
            sys.exit(1)
        with open(args.file, "r", encoding="utf-8") as f:
            return f.read().strip()
    piped = read_stdin_if_piped()
    if piped:
        return piped
    return DEFAULT_TEXT

# ---------------------------
# API mode (for frontend)
# ---------------------------
def run_api(host: str, port: int):
    """
    Start a FastAPI server exposing /summarize.
    POST /summarize
    {
      "text": "string",
      "min_length": 50,
      "max_length": 120
    }
    """
    if not FASTAPI_AVAILABLE:
        print("[!] fastapi/uvicorn not installed. Run:\n    pip install fastapi uvicorn pydantic\n")
        sys.exit(1)

    summarizer = build_summarizer()
    app = FastAPI(title="Text Summarizer API", version="1.0.0", description="Summarize text using BART CNN model")

    class SummarizeIn(BaseModel):
        text: str
        min_length: int = 50
        max_length: int = 120

    class SummarizeOut(BaseModel):
        summary: str
        original_length: int
        summary_length: int
        min_length: int
        max_length: int

    @app.post("/summarize", response_model=SummarizeOut)
    def summarize_endpoint(payload: SummarizeIn):
        try:
            summary = summarize_text(
                summarizer,
                payload.text,
                min_len=payload.min_length,
                max_len=payload.max_length
            )
            return SummarizeOut(
                summary=summary,
                original_length=len(payload.text),
                summary_length=len(summary),
                min_length=payload.min_length,
                max_length=payload.max_length
            )
        except Exception as e:
            return SummarizeOut(
                summary=f"Error: {str(e)}",
                original_length=len(payload.text),
                summary_length=0,
                min_length=payload.min_length,
                max_length=payload.max_length
            )

    print(f"[i] API running at http://{host}:{port}  (POST /summarize)")
    uvicorn.run(app, host=host, port=port)

# ---------------------------
# Entrypoint
# ---------------------------
def main():
    ensure_deps()
    args = parse_args()

    if args.serve:
        run_api(args.host, args.port)
        return

    # Re-import after potential install
    summarizer = build_summarizer()
    text = get_input_text(args)

    print("\n=== Original Text (truncated preview) ===")
    preview = text if len(text) < 500 else text[:500] + "..."
    print(preview)

    print("\n[info] Generating summary...")
    try:
        summary = summarize_text(
            summarizer,
            text,
            min_len=args.min_length,
            max_len=args.max_length
        )
    except Exception as e:
        print(f"[error] Summarization failed: {e}", file=sys.stderr)
        sys.exit(2)

    print("\n=== Summarized Version ===")
    print(summary)
    print("\n[done]")

if __name__ == "__main__":
    main()
