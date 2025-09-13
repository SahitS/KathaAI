"""
translate.py
------------
Local, free multilingual translation using Meta's M2M100 (facebook/m2m100_418M).
- CLI mode (default): prompts for language and prints translation of a Mahabharata excerpt (dummy data).
- API mode (--serve): exposes /translate for frontend integration.

USAGE (CLI):
  python translate.py

USAGE (API):
  python translate.py --serve --host 0.0.0.0 --port 8000
  curl -X POST "http://localhost:8000/translate" -H "Content-Type: application/json" \
       -d "{\"text\":\"Hello world\",\"source_lang\":\"en\",\"target_lang\":\"hi\"}"

Dependencies:
  pip install "transformers>=4.41" "torch>=2.2" sentencepiece fastapi uvicorn pydantic
"""

from __future__ import annotations
import argparse
import re
import sys
from typing import Dict, List

# Helpful, early check so users get a clear message if sentencepiece is missing.
try:
    import sentencepiece  # noqa: F401
except Exception:
    print(
        "\n[!] sentencepiece is not installed or not in this interpreter.\n"
        "    Run:  pip install sentencepiece\n"
        "    If you have multiple Python versions, ensure you're installing into the SAME environment.\n",
        file=sys.stderr,
    )
    # Don't exit; transformers will error later with a clearer trace if needed.

# Core model imports
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer

# Optional for API mode
try:
    from fastapi import FastAPI
    from pydantic import BaseModel
    import uvicorn
    FASTAPI_AVAILABLE = True
except Exception:
    FASTAPI_AVAILABLE = False


# --------------------------
# Config: model + languages
# --------------------------
MODEL_ID = "facebook/m2m100_418M"  # multilingual many-to-many translation model

# Human-friendly names -> ISO codes used by M2M100 tokenizer
LANG_OPTIONS: Dict[str, str] = {
    "Hindi (hi)": "hi",
    "Tamil (ta)": "ta",
    "Telugu (te)": "te",
    "Bengali (bn)": "bn",
    "Marathi (mr)": "mr",
    "Kannada (kn)": "kn",
    "Gujarati (gu)": "gu",
    "Punjabi (pa)": "pa",
    "Malayalam (ml)": "ml",
    "Urdu (ur)": "ur",
    "French (fr)": "fr",
    "Spanish (es)": "es",
    "German (de)": "de",
    "Arabic (ar)": "ar",
    "Russian (ru)": "ru",
    "Japanese (ja)": "ja",
    "Chinese (zh)": "zh",
}

DEFAULT_SOURCE_LANG = "en"  # our demo text is in English


# --------------------------
# Translation utilities
# --------------------------
class Translator:
    """Thin wrapper around M2M100 for easy reuse in CLI and API."""

    def __init__(self, model_id: str = MODEL_ID):
        print("[i] Loading model (first run downloads weights)...")
        self.tokenizer = M2M100Tokenizer.from_pretrained(model_id)
        self.model = M2M100ForConditionalGeneration.from_pretrained(model_id)
        print("[i] Model loaded.")

    @staticmethod
    def _split_into_chunks(text: str, max_chars: int = 900) -> List[str]:
        """
        Simple, punctuation-aware splitter for long passages so we stay within
        safe generation limits (model max_length ~512 tokens).
        """
        # Split on sentence boundaries, keep punctuation.
        sentences = re.split(r'(?<=[\.\!\?।])\s+', text.strip())
        chunks: List[str] = []
        cur = ""
        for s in sentences:
            if len(cur) + len(s) + 1 <= max_chars:
                cur = (cur + " " + s).strip()
            else:
                if cur:
                    chunks.append(cur)
                cur = s
        if cur:
            chunks.append(cur)
        return chunks

    def translate(self, text: str, source_lang: str, target_lang: str) -> str:
        """
        Translate text from source_lang to target_lang using M2M100.
        Handles long text via chunking and recombines results.
        """
        if not text.strip():
            return ""

        self.tokenizer.src_lang = source_lang
        outs: List[str] = []
        for chunk in self._split_into_chunks(text, max_chars=900):
            enc = self.tokenizer(chunk, return_tensors="pt")
            gen = self.model.generate(
                **enc,
                forced_bos_token_id=self.tokenizer.get_lang_id(target_lang),
                max_length=512,
            )
            out = self.tokenizer.batch_decode(gen, skip_special_tokens=True)[0]
            outs.append(out)
        return " ".join(outs).strip()


# --------------------------
# Demo input (dummy data)
# --------------------------
MAHABHARATA_DEMO = (
    "Hear, O monarch, the account of the great Itihasa composed by Vyasa. "
    "In it are contained the sacred teachings of the Vedas, the essence of the Upanishads, "
    "and the wisdom of the Puranas. King Janamejaya once convened the sages to learn of his ancestors; "
    "thus the sage Vaisampayana recited the vast history, recounting dharma, the destinies of kings and warriors, "
    "and the lessons woven into ages past."
)


# --------------------------
# CLI mode
# --------------------------
def run_cli():
    """Interactive CLI: choose a target language and translate the demo verse."""
    tr = Translator(MODEL_ID)

    # Print language menu
    print("\nSelect a target language:")
    keys = list(LANG_OPTIONS.keys())
    for idx, name in enumerate(keys, start=1):
        print(f"  {idx}. {name}")

    # Ask for choice
    while True:
        try:
            choice = int(input("\nEnter choice number: ").strip())
            if 1 <= choice <= len(keys):
                break
        except Exception:
            pass
        print("Please enter a valid number from the list above.")

    target_name = keys[choice - 1]
    target_code = LANG_OPTIONS[target_name]
    print(f"\n[i] Translating to: {target_name} ({target_code})\n")

    # In a real app, you'd pass your page/slide text here.
    source_text = MAHABHARATA_DEMO
    print("=== SOURCE (EN) ===")
    print(source_text, "\n")

    translated = tr.translate(source_text, source_lang=DEFAULT_SOURCE_LANG, target_lang=target_code)

    print(f"=== TRANSLATION → {target_name} ===")
    print(translated)


# --------------------------
# API mode (for frontend)
# --------------------------
def run_api(host: str, port: int):
    """
    Start a simple FastAPI server exposing /translate.
    POST /translate
    {
      "text": "string",
      "source_lang": "en",
      "target_lang": "hi"
    }
    """
    if not FASTAPI_AVAILABLE:
        print("[!] fastapi/uvicorn not installed. Run:\n    pip install fastapi uvicorn pydantic\n")
        sys.exit(1)

    tr = Translator(MODEL_ID)
    app = FastAPI(title="Mythology Translator API", version="1.0.0")

    class TranslateIn(BaseModel):
        text: str
        source_lang: str = DEFAULT_SOURCE_LANG
        target_lang: str

    class TranslateOut(BaseModel):
        translation: str
        source_lang: str
        target_lang: str

    @app.post("/translate", response_model=TranslateOut)
    def translate_endpoint(payload: TranslateIn):
        # Basic sanity check for allowed langs; in production you might relax or expand this.
        if payload.source_lang not in (["en"] + list(LANG_OPTIONS.values())):
            return TranslateOut(
                translation="",
                source_lang=payload.source_lang,
                target_lang=payload.target_lang,
            )
        if payload.target_lang not in LANG_OPTIONS.values():
            return TranslateOut(
                translation="",
                source_lang=payload.source_lang,
                target_lang=payload.target_lang,
            )
        out = tr.translate(payload.text, source_lang=payload.source_lang, target_lang=payload.target_lang)
        return TranslateOut(translation=out, source_lang=payload.source_lang, target_lang=payload.target_lang)

    print(f"[i] API running at http://{host}:{port}  (POST /translate)")
    uvicorn.run(app, host=host, port=port)


# --------------------------
# Entrypoint
# --------------------------
def main():
    parser = argparse.ArgumentParser(description="Local multilingual translator (M2M100).")
    parser.add_argument("--serve", action="store_true", help="Run as an HTTP API instead of CLI demo")
    parser.add_argument("--host", type=str, default="127.0.0.1", help="Host for API mode")
    parser.add_argument("--port", type=int, default=8000, help="Port for API mode")
    args = parser.parse_args()

    if args.serve:
        run_api(args.host, args.port)
    else:
        run_cli()


if __name__ == "__main__":
    main()
