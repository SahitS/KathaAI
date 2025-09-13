from __future__ import annotations
import sys, subprocess, re, argparse
from typing import Dict, Tuple, Optional

# ---------------------------
# Best-effort auto-installer (only if missing)
# ---------------------------
def ensure(pkg_import: str, pip_name: Optional[str] = None):
    try:
        return __import__(pkg_import)
    except Exception:
        pip_pkg = pip_name or pkg_import
        print(f"[i] Installing missing dependency: {pip_pkg} ...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", pip_pkg])
        return __import__(pkg_import)

def ensure_transformers():
    try:
        return __import__("transformers")
    except Exception:
        print("[i] Installing transformers ...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "transformers>=4.41"])
        return __import__("transformers")

def ensure_torch_cpu():
    try:
        return __import__("torch")
    except Exception:
        print("[i] Installing torch (CPU) ...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "torch"])
        return __import__("torch")

# Core deps (import, install only if missing)
torch = ensure_torch_cpu()
transformers = ensure_transformers()
_ = ensure("argostranslate", "argostranslate")

# Optional API deps (only when --serve used)
FASTAPI_AVAILABLE = True
try:
    fastapi = __import__("fastapi")
    uvicorn = ensure("uvicorn", "uvicorn")
    pydantic = ensure("pydantic", "pydantic")
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
except Exception:
    FASTAPI_AVAILABLE = False

from transformers import pipeline
import argostranslate.package as argos_pkg
import argostranslate.translate as argos_trans

# ---------------------------
# Config
# ---------------------------
DEFAULT_SRC_LANG = "en"
NOT_ALLOWED_MSG_EN = "I can only answer questions related to the Mahabharata epic and Hindu mythology. Please ask about characters, events, or teachings from the Mahabharata."

LANG_OPTIONS: Dict[str, str] = {
    "English (en)": "en",
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
DEFAULT_LANG_NAME = "English (en)"

# ---------------------------
# Comprehensive Mahabharata Knowledge Base
# ---------------------------
MAHA_MASTER_EN = """
The Mahabharata, attributed traditionally to Vyasa (Krishna Dvaipayana, also called Vedavyasa), is one of the two major Sanskrit epics of ancient India. It narrates the Kuru dynasty's lineage, the rivalry of the Pandavas and Kauravas, the dice game, exile, the 18-day Kurukshetra war, Krishna's Bhagavad Gita discourse to Arjuna, the fall of great warriors like Bhishma, Drona, and Karna, Ashvatthama's night raid, Yudhishthira's coronation, and the final ascent.

The epic begins with an invocation to the divine beings Narayana, Nara, and Saraswati, before the story of 'Jaya' is told. Sauti, son of Lomaharshana, begins narrating the Mahabharata to the sages in the Naimisha forest. The sages, gathered at a great sacrifice, expressed their desire to hear ancient stories of wisdom and righteousness.

The Mahabharata, with 100,000 verses, is the distilled wisdom of the scriptures and conveys deep philosophical truths. It is believed to grant the four aims of life to those who read or hear it with devotion. Vyasa composed the Mahabharata and taught it to his disciple Vaishampayana, who then shared it at a royal event.

King Janamejaya held a snake sacrifice to avenge his father's death by serpent bite. Vaishampayana recited the full Mahabharata at the grand snake sacrifice. The epic covers a wide range of characters—human and divine—within a single grand story.

The story begins with the ancestry of the Bharata race, tracing their lineage and noble deeds. It tells of kings who upheld dharma, and others who fell due to pride, anger, or deceit. Through stories of love, betrayal, valor, and loss, the epic mirrors the struggles of human life.

The Pandavas and Kauravas are born into the Kuru line, destined to clash in war. Envy and ambition spark a power struggle for the throne of Hastinapura. Despite efforts by elders to preserve peace, destiny moves events toward war.

Drona becomes the martial teacher of both the Pandavas and Kauravas. Arjuna surpasses all in skill, earning Drona's admiration. Duryodhana befriends Karna to rival Arjuna's strength. Tensions in the kingdom rise as rivalry intensifies.

The Pandavas grew popular for their virtue and bravery. Duryodhana becomes anxious about the Pandavas' growing influence. Shakuni advises Duryodhana to plot against the Pandavas. A deadly trap is set for the Pandavas in the form of a lacquer palace.

Vidura's subtle warning helps the Pandavas escape the plot. The Pandavas flee through a tunnel before the fire consumes the palace. The Pandavas are presumed dead, and Duryodhana feels victorious. The Pandavas live incognito in the forest with their mother.

In exile, the Pandavas grow wiser through encounters with sages. Though challenges awaited, the Pandavas were destined for greatness. The Pandavas arrive in Ekachakra and decide to stay hidden there. While in hiding, the Pandavas serve the people and live humbly.

The town of Ekachakra lived in fear of the demon Bakasura. Bhima decides to face Bakasura to save their host's family. Bhima slays Bakasura and saves the people of Ekachakra. Bhima's deed spreads their fame, but their identity stays hidden.

Word spreads of Draupadi's swayamvara, attracting attention across kingdoms. The Pandavas decide to attend Draupadi's swayamvara in disguise. Arjuna wins Draupadi at the swayamvara by his archery skill. Draupadi's marriage to the Pandavas marks the beginning of their return to power.

The epic's greatness lies not just in war, but in the lessons it imparts to the soul. The Mahabharata is said to contain all knowledge—nothing is beyond it. Sages have long turned to the Mahabharata for spiritual guidance. The teachings of the epic purify the soul like holy waters.

One verse of deep meaning can elevate a soul above suffering. The Mahabharata enlightens those who listen with faith and sincerity. Listening to the Mahabharata with faith brings spiritual merit and wisdom. The Mahabharata is considered equivalent to the Vedas in spiritual authority.

The epic offers insights into ethics, governance, philosophy, and social duties. Even divine beings revere the Mahabharata, recognizing its universal wisdom. The epic repeatedly explores the tension between moral duty and individual desires. Every individual contributed to the story destined to unfold.

Kurukshetra was inevitable, driven by moral dilemmas and betrayals. The Mahabharata's wisdom extends far beyond the battlefield. Sauti affirms the timeless relevance of the Mahabharata. Sauti vows to deliver Vyasa's story in full and in truth.

The sages sat in quiet reflection, ready to receive the wisdom of the epic. The telling of the epic begins—vast, deep, and boundless like the sea. The Mahabharata enlightens those who listen with faith and sincerity. The epic's verses shine like the sun, dispelling the darkness of ignorance for those who hear it with devotion.
""".strip()

# ---------------------------
# Comprehensive Mahabharata Q&A Database
# ---------------------------
FACT_OVERRIDES = [
    # Author and composition
    (re.compile(r"\b(who\s+wrote|who\s+is\s+the\s+author\s+of)\s+(the\s+)?maha?bha?ra?tha?\b", re.I),
     "Vyasa (Krishna Dvaipayana, also called Vedavyasa) is traditionally credited as the author/compiler of the Mahabharata."),
    (re.compile(r"\b(author)\b.*\bmaha?bha?ra?tha?\b", re.I),
     "Vyasa (Krishna Dvaipayana, Vedavyasa) is traditionally regarded as the author/compiler of the Mahabharata."),
    
    # Main characters
    (re.compile(r"\b(who\s+are\s+the\s+pandavas|pandavas)\b", re.I),
     "The Pandavas are the five sons of King Pandu: Yudhishthira (eldest), Bhima, Arjuna, Nakula, and Sahadeva. They are the heroes of the Mahabharata."),
    (re.compile(r"\b(who\s+are\s+the\s+kauravas|kauravas)\b", re.I),
     "The Kauravas are the hundred sons of King Dhritarashtra, led by Duryodhana. They are the antagonists in the Mahabharata."),
    (re.compile(r"\b(who\s+is\s+krishna|krishna)\b", re.I),
     "Krishna is the eighth avatar of Vishnu, who serves as Arjuna's charioteer and guide during the Kurukshetra war. He delivers the Bhagavad Gita to Arjuna."),
    (re.compile(r"\b(who\s+is\s+arjuna|arjuna)\b", re.I),
     "Arjuna is the third Pandava, known as the greatest archer. He is the recipient of the Bhagavad Gita from Krishna and plays a central role in the Kurukshetra war."),
    (re.compile(r"\b(who\s+is\s+bhishma|bhishma)\b", re.I),
     "Bhishma is the granduncle of both Pandavas and Kauravas, known for his vow of celibacy and his role as the commander of the Kaurava army."),
    (re.compile(r"\b(who\s+is\s+drona|drona)\b", re.I),
     "Drona is the royal preceptor who taught archery to both Pandavas and Kauravas. He becomes the commander of the Kaurava army after Bhishma's fall."),
    (re.compile(r"\b(who\s+is\s+karna|karna)\b", re.I),
     "Karna is the eldest son of Kunti and Surya, raised by a charioteer. He is Duryodhana's closest friend and a formidable warrior who fights for the Kauravas."),
    (re.compile(r"\b(who\s+is\s+draupadi|draupadi)\b", re.I),
     "Draupadi is the common wife of all five Pandavas, known for her beauty and intelligence. She plays a crucial role in the dice game incident."),
    
    # Key events
    (re.compile(r"\b(what\s+is\s+the\s+bhagavad\s+gita|bhagavad\s+gita)\b", re.I),
     "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the Mahabharata. It contains a conversation between Prince Arjuna and Krishna, who serves as his charioteer."),
    (re.compile(r"\b(what\s+is\s+the\s+kurukshetra\s+war|kurukshetra\s+war)\b", re.I),
     "The Kurukshetra War is the central conflict of the Mahabharata, fought between the Pandavas and Kauravas for 18 days on the battlefield of Kurukshetra."),
    (re.compile(r"\b(what\s+is\s+the\s+dice\s+game|dice\s+game)\b", re.I),
     "The dice game is a crucial event where Yudhishthira gambles away his kingdom, brothers, and even Draupadi to the Kauravas, leading to the Pandavas' 13-year exile."),
    (re.compile(r"\b(what\s+is\s+the\s+exile|exile)\b", re.I),
     "The Pandavas were exiled for 13 years (12 years in the forest and 1 year incognito) after losing everything in the dice game to the Kauravas."),
    
    # Philosophical concepts
    (re.compile(r"\b(what\s+is\s+dharma|dharma)\b", re.I),
     "Dharma in the Mahabharata refers to righteous duty, moral law, and the path of righteousness. It is a central theme throughout the epic."),
    (re.compile(r"\b(what\s+is\s+karma|karma)\b", re.I),
     "Karma refers to the law of cause and effect, where every action has consequences. It is a fundamental concept in the Mahabharata's philosophy."),
    
    # Specific battles and events
    (re.compile(r"\b(how\s+did\s+karna\s+die|karna\s+death)\b", re.I),
     "Karna died on the 17th day of the Kurukshetra war when his chariot wheel got stuck in the mud and Arjuna killed him while he was defenseless."),
    (re.compile(r"\b(how\s+did\s+bhishma\s+die|bhishma\s+death)\b", re.I),
     "Bhishma was mortally wounded by Arjuna on the 10th day of the war using Shikhandi as a shield, and he chose to die on the bed of arrows."),
    (re.compile(r"\b(how\s+did\s+drona\s+die|drona\s+death)\b", re.I),
     "Drona was killed when Yudhishthira lied about Ashwatthama's death, causing Drona to lay down his weapons in grief, after which Dhrishtadyumna beheaded him."),
    
    # General Mahabharata questions
    (re.compile(r"\b(what\s+is\s+the\s+mahabharata|mahabharata)\b", re.I),
     "The Mahabharata is one of the two major Sanskrit epics of ancient India, containing over 100,000 verses. It tells the story of the Kuru dynasty and the great war between Pandavas and Kauravas."),
    (re.compile(r"\b(how\s+long\s+is\s+the\s+mahabharata|mahabharata\s+length)\b", re.I),
     "The Mahabharata contains over 100,000 verses, making it one of the longest epic poems in the world. It is approximately 1.8 million words long."),
]

# ---------------------------
# Gate (Mahabharata-only)
# ---------------------------
class MahabharataGate:
    def __init__(self):
        self.kw = re.compile(
            r"\b(mahabharata|mahabaratha|mahabharat|pandava|kaurava|kurukshetra|bhishma|drona|karna|"
            r"krishna|arjuna|yudhishthira|bhima|nakula|sahadeva|draupadi|duryodhana|ashvatthama|"
            r"vyasa|indraprastha|hastinapura|gita|bhagavad\s*gita|dharma|karma|exile|dice\s*game|"
            r"swayamvara|bakasura|vidura|shakuni|kunti|gandhari|dhritarashtra|pandu|"
            r"janamejaya|vaishampayana|sauti|naimisha|bharata|kuru|hastinapura|"
            r"ekachakra|lacquer\s*house|lakshagriha|shikhandi|dhrishtadyumna|"
            r"epic|mythology|hindu|vedas|sanskrit|ancient\s*india|indian\s*epic)\b",
            re.I
        )
    def is_mahabharata(self, question: str) -> bool:
        return bool(self.kw.search(question or ""))

# ---------------------------
# Simple retriever from in-memory paragraph
# ---------------------------
class ParagraphRetriever:
    def __init__(self, paragraph: str):
        self.text = paragraph
        # Split into sentences and create a more sophisticated search
        self.sentences = re.split(r'(?<=[\.\!\?])\s+', self.text)
        
    def retrieve(self, question: str, max_chars: int = 900) -> str:
        q = (question or "").lower()
        keywords = re.findall(r"[a-zA-Z]+", q)
        
        # Enhanced scoring system
        scored = []
        for s in self.sentences:
            sl = s.lower()
            score = 0
            
            # Basic keyword matching
            for k in keywords:
                if k in sl:
                    score += 1
                    # Bonus for exact word matches
                    if re.search(r'\b' + re.escape(k) + r'\b', sl):
                        score += 2
            
            # Bonus for character names and important terms
            important_terms = ['pandava', 'kaurava', 'krishna', 'arjuna', 'bhishma', 'drona', 'karna', 
                             'draupadi', 'duryodhana', 'vyasa', 'kurukshetra', 'bhagavad gita', 'dharma']
            for term in important_terms:
                if term in sl:
                    score += 1
            
            scored.append((score, s))
        
        # Sort by score (descending)
        scored.sort(key=lambda x: x[0], reverse=True)
        
        chosen, total = [], 0
        for sc, s in scored:
            if sc <= 0 and chosen:
                break
            if total + len(s) + 1 > max_chars and chosen:
                break
            chosen.append(s)
            total += len(s) + 1
        
        if not chosen:
            # Fallback to first few sentences
            chosen = self.sentences[:3]
        
        ans = " ".join(chosen).strip()
        if len(ans) > max_chars:
            ans = ans[:max_chars].rsplit(" ", 1)[0] + " ..."
        
        return ans

# ---------------------------
# Rephraser (lightweight)
# ---------------------------
class Rephraser:
    def __init__(self):
        self.pipe = None
        self._init_pipe()
    def _init_pipe(self):
        try:
            try:
                self.pipe = pipeline("text2text-generation", model="ramsrigouthamg/t5_paraphraser", max_new_tokens=196)
            except Exception:
                self.pipe = pipeline("text2text-generation", model="t5-small", max_new_tokens=196)
        except Exception:
            self.pipe = None
    def paraphrase(self, context_answer: str, question: str) -> str:
        if not context_answer.strip() or self.pipe is None:
            return context_answer
        try:
            prompt = f"Paraphrase to directly answer.\nQ: {question}\nA: {context_answer}\nParaphrase:"
            out = self.pipe(prompt, do_sample=False, num_beams=4)
            txt = out["generated_text"].strip()
            txt = re.sub(r"(?i)^paraphrase:\s*", "", txt).strip()
            return txt or context_answer
        except Exception:
            return context_answer

# ---------------------------
# Translator (Argos Translate, EN->XX only)
# ---------------------------
class Translator:
    def __init__(self):
        self.cache_installed = set()
        try:
            argos_pkg.update_package_index()
        except Exception:
            pass
    def _ensure_pair(self, src: str, tgt: str) -> bool:
        if src == tgt:
            return True
        key = f"{src}->{tgt}"
        if key in self.cache_installed:
            return True
        try:
            available = argos_pkg.get_available_packages()
            matches = [p for p in available if p.from_code == src and p.to_code == tgt]
            if not matches:
                installed = argos_pkg.get_installed_packages()
                ok = any(p.from_code == src and p.to_code == tgt for p in installed)
                if ok: self.cache_installed.add(key)
                return ok
            pkg = matches
            path = pkg.download()
            argos_pkg.install_from_path(path)
            self.cache_installed.add(key)
            return True
        except Exception:
            try:
                installed = argos_pkg.get_installed_packages()
                ok = any(p.from_code == src and p.to_code == tgt for p in installed)
                if ok: self.cache_installed.add(key)
                return ok
            except Exception:
                return False
    def translate(self, text: str, src_lang: str, tgt_lang: str) -> str:
        if not text.strip():
            return ""
        if tgt_lang == src_lang or tgt_lang == "en":
            return text
        if src_lang != "en":
            src_lang = "en"
        if not self._ensure_pair(src_lang, tgt_lang):
            return text
        try:
            return argos_trans.translate(text, src_lang, tgt_lang)
        except Exception:
            return text

# ---------------------------
# Orchestrator
# ---------------------------
class MahabharataChatbot:
    def __init__(self):
        self.gate = MahabharataGate()
        self.retriever = ParagraphRetriever(MAHA_MASTER_EN)
        self.rephraser = Rephraser()
        self.tx = Translator()

    def _not_allowed(self, target_lang: str) -> str:
        return self.tx.translate(NOT_ALLOWED_MSG_EN, src_lang="en", tgt_lang=target_lang)

    def _override(self, question: str) -> Optional[str]:
        for pat, ans in FACT_OVERRIDES:
            if pat.search(question or ""):
                return ans
        return None

    def ask(self, question: str, target_lang: str) -> Tuple[str, Optional[str]]:
        if not question or not question.strip():
            return self._not_allowed(target_lang), None
        if not self.gate.is_mahabharata(question):
            return self._not_allowed(target_lang), None

        direct = self._override(question)
        if direct:
            answer_en = direct
        else:
            answer_en = self.retriever.retrieve(question, max_chars=900)
            answer_en = self.rephraser.paraphrase(answer_en, question)

        final = self.tx.translate(answer_en, src_lang=DEFAULT_SRC_LANG, tgt_lang=target_lang)
        return final, "Mahabharata (in-memory)"

# ---------------------------
# CLI
# ---------------------------
def run_cli():
    bot = MahabharataChatbot()

    keys = list(LANG_OPTIONS.keys())
    print("\nSelect answer language:")
    for i, name in enumerate(keys, 1):
        print(f"  {i}. {name}")

    while True:
        try:
            choice = input(f"\nEnter choice number (default {keys.index(DEFAULT_LANG_NAME)+1}): ").strip()
            if not choice:
                target_lang = LANG_OPTIONS[DEFAULT_LANG_NAME]
                break
            num = int(choice)
            if 1 <= num <= len(keys):
                target_lang = LANG_OPTIONS[keys[num - 1]]
                break
        except Exception:
            pass
        print("Please enter a valid number from the list.")

    print("\nAsk a Mahabharata question (blank to exit). Examples:")
    print("  • Who was Karna and how did he die?")
    print("  • What is the Bhagavad Gita about?")
    print("  • Why did the Pandavas go to exile?")
    print("  • Who are the main characters in Mahabharata?")
    print("  • What happened in the Kurukshetra war?")
    print("  • Tell me about Draupadi's swayamvara")
    print("  • What is dharma according to Mahabharata?\n")

    while True:
        q = input("Your question: ").strip()
        if not q:
            print("Goodbye!")
            break
        ans, source = bot.ask(q, target_lang)
        print("\n=== Answer ===")
        print(ans)
        if source:
            print(f"\n[source: {source}]")
        print("")

# ---------------------------
# API (prototype)
# ---------------------------
def run_api(host: str, port: int):
    if not FASTAPI_AVAILABLE:
        print("[!] FastAPI not available. Install: pip install fastapi uvicorn pydantic")
        sys.exit(1)

    bot = MahabharataChatbot()
    app = FastAPI(title="Mahabharata Chatbot API", version="2.0.0", description="A comprehensive Mahabharata Q&A system with multilingual support")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    class AskIn(BaseModel):
        question: str
        target_lang: str = "en"

    class AskOut(BaseModel):
        answer: str
        language: str
        source_title: str | None

    @app.get("/languages")
    def languages():
        return [{"name": k, "code": v} for k, v in LANG_OPTIONS.items()]

    @app.post("/ask", response_model=AskOut)
    def ask(payload: AskIn):
        lang = payload.target_lang if payload.target_lang in LANG_OPTIONS.values() else "en"
        ans, src = bot.ask(payload.question, lang)
        return AskOut(answer=ans, language=lang, source_title=src)

    print(f"[i] API running at http://{host}:{port}  (POST /ask, GET /languages)")
    uvicorn.run(app, host=host, port=port)

# ---------------------------
# Entrypoint
# ---------------------------
def main():
    parser = argparse.ArgumentParser(description="Comprehensive Mahabharata Chatbot - Multilingual Q&A system focused exclusively on the Mahabharata epic and Hindu mythology. Features enhanced knowledge base, intelligent search, and API integration.")
    parser.add_argument("--serve", action="store_true", help="Run as HTTP API instead of CLI")
    parser.add_argument("--host", type=str, default="127.0.0.1", help="API host")
    parser.add_argument("--port", type=int, default=8000, help="API port")
    args = parser.parse_args()

    if args.serve:
        run_api(args.host, args.port)
    else:
        run_cli()

if __name__ == "__main__":
    main()
