# MythologyAI

A comprehensive mythology exploration platform with AI-powered features.

## Setup Instructions

### Backend (Node.js)
1. Create `.env` from `.env.example` (if you have one) and fill variables:
   ```bash
   cp .env.example .env  # on Windows: copy .env.example .env
   ```

2. Install exact dependencies:
   ```bash
   npm ci               # or: npm install
   ```

3. Run the backend:
   ```bash
   npm run dev          # or: node server.js / nodemon
   ```

### Frontend (Angular)
1. Navigate to frontend directory:
   ```bash
   cd frontend   # if your Angular app lives in /frontend; else stay in root
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Start the development server:
   ```bash
   npm run start    # usually runs: ng serve
   ```

4. Open your browser to `http://localhost:4200`

### Python AI Services
1. Navigate to AI models directory:
   ```bash
   cd AI-Models
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate            # PowerShell
   ```

3. Install dependencies:
   ```bash
   pip install -U pip
   pip install -r requirements.txt     # create this file if missing
   ```

4. Run your AI scripts:
   ```bash
   python chatbot.py
   ```

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.