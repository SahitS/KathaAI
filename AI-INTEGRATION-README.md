
333333333333333333333333333

333+++# AI Integration for Mythology AI

This document explains the AI features integrated into the Mahabharatha component.

## Features

### 1. AI Chatbot
- **Purpose**: Answer questions about Mahabharata epic and Hindu mythology
- **API**: `http://localhost:8000/ask`
- **Input**: Question text and target language
- **Output**: AI-generated answer in the specified language

### 2. AI Translation
- **Purpose**: Translate verse content to multiple languages
- **API**: `http://localhost:8000/translate`
- **Supported Languages**: Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Gujarati, Punjabi, Malayalam, Urdu, French, Spanish, German, Arabic, Russian, Japanese, Chinese
- **Input**: Text, source language, target language
- **Output**: Translated text

### 3. AI Summarization
- **Purpose**: Generate concise summaries of verse content
- **API**: `http://localhost:8001/summarize`
- **Input**: Text to summarize, min/max length parameters
- **Output**: AI-generated summary

## Setup Instructions

### 1. Install Python Dependencies
```bash
cd AI-Models
pip install transformers torch fastapi uvicorn pydantic argostranslate sentencepiece
```

### 2. Start AI Services
Run the batch file to start all AI services:
```bash
start-ai-services.bat
```

Or start them individually:
```bash
# Chatbot API
cd AI-Models
python chatbot.py --serve --host 0.0.0.0 --port 8000

# Translation API  
python translate.py --serve --host 0.0.0.0 --port 8000

# Summarization API
python summarize.py --serve --host 0.0.0.0 --port 8001
```

### 3. Start Angular Application
```bash
ng serve
```

## Usage

1. Navigate to the Mahabharatha component
2. Click on any verse to open the detail modal
3. The AI panel will appear on the right side with three tabs:
   - **AI Chatbot**: Ask questions about Mahabharata
   - **AI Translate**: Translate the verse to different languages
   - **AI Summarize**: Get an AI-generated summary of the verse

## API Endpoints

### Chatbot API (Port 8000)
- `POST /ask`
  ```json
  {
    "question": "Who is Krishna in Mahabharata?",
    "target_lang": "en"
  }
  ```

### Translation API (Port 8000)
- `POST /translate`
  ```json
  {
    "text": "Hello world",
    "source_lang": "en",
    "target_lang": "hi"
  }
  ```

### Summarization API (Port 8001)
- `POST /summarize`
  ```json
  {
    "text": "Long text to summarize...",
    "min_length": 50,
    "max_length": 120
  }
  ```

## Troubleshooting

### Common Issues

1. **Port Conflicts**: If ports 8000 or 8001 are in use, modify the port numbers in the batch file
2. **Model Download**: First run may take time to download AI models (1-2GB)
3. **Memory Issues**: Ensure sufficient RAM (8GB+ recommended) for AI models
4. **Python Environment**: Make sure you're using the correct Python environment

### Error Handling

The frontend includes error handling for:
- API connection failures
- Service unavailability
- Invalid responses
- Network timeouts

Fallback messages will be displayed if AI services are unavailable.

## Performance Notes

- **First Load**: Initial model loading may take 30-60 seconds
- **Response Time**: 
  - Chatbot: 2-5 seconds
  - Translation: 3-8 seconds  
  - Summarization: 5-15 seconds
- **Memory Usage**: ~2-4GB RAM for all models
- **CPU Usage**: High during processing, normal when idle

## Future Enhancements

- [ ] Caching for faster responses
- [ ] Batch processing for multiple verses
- [ ] Custom model fine-tuning
- [ ] Voice input/output
- [ ] Offline mode support
