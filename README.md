# KathaAI

git clone https://github.com/SahitS/KathaAI.git
cd KathaAI

# Backend (Node)
create .env from .env.example (if you have one) and fill variables <br>
cp .env.example .env  # on Windows: copy .env.example .env <br>

install exact deps <br>
npm ci               # or: npm install <br>
run <br>
npm run dev          # or: node server.js / nodemon <br>


# Angular
cd frontend   # if your Angular app lives in /frontend; else stay in root <br>
npm ci <br>
npm run start    # usually runs: ng serve <br>
then open http://localhost:4200 <br>


# Python servies AI models
cd AI-Models <br>
python -m venv .venv
.\.venv\Scripts\activate            # PowerShell <br>
pip install -U pip <br>
pip install -r requirements.txt     # create this file if missing <br>
run your scripts, e.g.: <br>
python chatbot.py <br>
