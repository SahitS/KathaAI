@echo off
echo Installing AI Dependencies for Mythology AI...
echo.

echo Checking Python installation...
python --version
if %errorlevel% neq 0 (
    echo Python is not installed or not in PATH.
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

echo.
echo Installing required packages...
echo This may take several minutes as it downloads AI models...

python -m pip install --upgrade pip
python -m pip install transformers>=4.41
python -m pip install torch
python -m pip install fastapi
python -m pip install uvicorn
python -m pip install pydantic
python -m pip install argostranslate
python -m pip install sentencepiece

echo.
echo Installation complete!
echo.
echo To start the AI services, run: start-ai-services.bat
echo.
pause
