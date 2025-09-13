# KathaAI

git clone https://github.com/SahitS/KathaAI.git
cd KathaAI

#Backend (Node)
create .env from .env.example (if you have one) and fill variables
cp .env.example .env  # on Windows: copy .env.example .env

install exact deps
npm ci               # or: npm install
run
npm run dev          # or: node server.js / nodemon


#Angular
cd frontend   # if your Angular app lives in /frontend; else stay in root
npm ci
npm run start    # usually runs: ng serve
then open http://localhost:4200


#Python servies AI models
cd AI-Models
python -m venv .venv
.\.venv\Scripts\activate            # PowerShell
pip install -U pip
pip install -r requirements.txt     # create this file if missing
run your scripts, e.g.:
python chatbot.py
