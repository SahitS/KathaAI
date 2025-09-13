@echo off
echo Starting AI Services for Mythology AI...

echo.
echo Starting Mahabharata Chatbot API on port 8000...
start "Chatbot API" cmd /k "cd AI-Models && python chatbot.py --serve --host 0.0.0.0 --port 8000"

echo.
echo Starting Translation API on port 8002...
start "Translation API" cmd /k "cd AI-Models && python translate.py --serve --host 0.0.0.0 --port 8002"

echo.
echo Starting Summarization API on port 8001...
start "Summarization API" cmd /k "cd AI-Models && python summarize.py --serve --host 0.0.0.0 --port 8001"

echo.
echo All AI services are starting...
echo - Chatbot API: http://localhost:8000
echo - Translation API: http://localhost:8002  
echo - Summarization API: http://localhost:8001
echo.
echo Note: The first run may take time to download AI models.
echo Press any key to continue...
pause > nul
