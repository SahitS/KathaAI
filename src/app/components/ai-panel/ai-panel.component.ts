import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface MahabharathaVerse {
  Book_id: string;
  Chapter_id: string;
  Verse_id: string;
  Content_eng: string;
  Content_hin: string;
  Content_chi: string;
  Summary?: string;
}

export interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

export interface Language {
  name: string;
  code: string;
}

@Component({
  selector: 'app-ai-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-panel.component.html',
  styleUrls: ['./ai-panel.component.scss']
})
export class AiPanelComponent implements OnInit {
  @Input() selectedVerse: MahabharathaVerse | null = null;
  @Output() closePanel = new EventEmitter<void>();

  // AI Panel States
  activeTab: 'chatbot' | 'translate' | 'summarize' = 'chatbot';
  
  // Chatbot
  chatMessages: ChatMessage[] = [];
  userQuestion: string = '';
  isChatLoading: boolean = false;
  
  // Translation
  availableLanguages: Language[] = [
    { name: 'Hindi (हिन्दी)', code: 'hi' },
    { name: 'Tamil (தமிழ்)', code: 'ta' },
    { name: 'Telugu (తెలుగు)', code: 'te' },
    { name: 'Bengali (বাংলা)', code: 'bn' },
    { name: 'Marathi (मराठी)', code: 'mr' },
    { name: 'Kannada (ಕನ್ನಡ)', code: 'kn' },
    { name: 'Gujarati (ગુજરાતી)', code: 'gu' },
    { name: 'Punjabi (ਪੰਜਾਬੀ)', code: 'pa' },
    { name: 'Malayalam (മലയാളം)', code: 'ml' },
    { name: 'Urdu (اردو)', code: 'ur' },
    { name: 'French (Français)', code: 'fr' },
    { name: 'Spanish (Español)', code: 'es' },
    { name: 'German (Deutsch)', code: 'de' },
    { name: 'Arabic (العربية)', code: 'ar' },
    { name: 'Russian (Русский)', code: 'ru' },
    { name: 'Japanese (日本語)', code: 'ja' },
    { name: 'Chinese (中文)', code: 'zh' }
  ];
  selectedLanguage: string = 'hi';
  translatedText: string = '';
  isTranslating: boolean = false;
  
  // Summarization
  summarizedText: string = '';
  isSummarizing: boolean = false;

  private readonly CHATBOT_API_URL = 'http://localhost:8000';
  private readonly TRANSLATE_API_URL = 'http://localhost:8002';
  private readonly SUMMARIZE_API_URL = 'http://localhost:8001';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize with a welcome message
    this.chatMessages.push({
      type: 'bot',
      message: 'Hello! I\'m your Mahabharata AI assistant. Ask me anything about the epic, its characters, events, or teachings!',
      timestamp: new Date()
    });
  }

  // Tab switching
  switchTab(tab: 'chatbot' | 'translate' | 'summarize'): void {
    this.activeTab = tab;
    
    // Auto-trigger actions when switching tabs
    if (tab === 'translate' && this.selectedVerse && !this.translatedText) {
      this.translateVerse();
    } else if (tab === 'summarize' && this.selectedVerse && !this.summarizedText) {
      this.summarizeVerse();
    }
  }

  // Chatbot functionality
  sendMessage(): void {
    if (!this.userQuestion.trim() || this.isChatLoading) return;

    const userMessage: ChatMessage = {
      type: 'user',
      message: this.userQuestion,
      timestamp: new Date()
    };
    
    this.chatMessages.push(userMessage);
    this.isChatLoading = true;
    
    const question = this.userQuestion;
    this.userQuestion = '';

    // Call chatbot API
    this.http.post(`${this.CHATBOT_API_URL}/ask`, {
      question: question,
      target_lang: 'en'
    }).subscribe({
      next: (response: any) => {
        const botMessage: ChatMessage = {
          type: 'bot',
          message: response.answer || 'I apologize, but I couldn\'t process your question. Please try again.',
          timestamp: new Date()
        };
        this.chatMessages.push(botMessage);
        this.isChatLoading = false;
      },
      error: (error) => {
        console.error('Chatbot error:', error);
        const botMessage: ChatMessage = {
          type: 'bot',
          message: 'I\'m sorry, I\'m having trouble connecting to the AI service. Please try again later.',
          timestamp: new Date()
        };
        this.chatMessages.push(botMessage);
        this.isChatLoading = false;
      }
    });
  }

  // Translation functionality
  translateVerse(): void {
    if (!this.selectedVerse || this.isTranslating) return;

    this.isTranslating = true;
    const textToTranslate = this.selectedVerse.Content_eng;

    // Try the translation API first
    this.http.post(`${this.TRANSLATE_API_URL}/translate`, {
      text: textToTranslate,
      source_lang: 'en',
      target_lang: this.selectedLanguage
    }).subscribe({
      next: (response: any) => {
        this.translatedText = response.translation || 'Translation not available';
        this.isTranslating = false;
      },
      error: (error) => {
        console.error('Translation error:', error);
        // Fallback to simple translation mapping
        this.translatedText = this.getFallbackTranslation(textToTranslate, this.selectedLanguage);
        this.isTranslating = false;
      }
    });
  }

  // Fallback translation for common languages
  private getFallbackTranslation(text: string, targetLang: string): string {
    const translations: { [key: string]: string } = {
      'hi': 'यह पाठ हिंदी में अनुवादित किया जाना है। (Translation service loading...)',
      'ta': 'இந்த உரை தமிழில் மொழிபெயர்க்கப்பட வேண்டும்। (Translation service loading...)',
      'te': 'ఈ వచనం తెలుగులో అనువదించబడాలి। (Translation service loading...)',
      'bn': 'এই পাঠ বাংলায় অনুবাদ করতে হবে। (Translation service loading...)',
      'mr': 'हा मजकूर मराठीत भाषांतर करावा लागेल। (Translation service loading...)',
      'kn': 'ಈ ಪಠ್ಯವನ್ನು ಕನ್ನಡದಲ್ಲಿ ಅನುವಾದಿಸಬೇಕು। (Translation service loading...)',
      'gu': 'આ લખાણ ગુજરાતીમાં અનુવાદ કરવું પડશે। (Translation service loading...)',
      'pa': 'ਇਸ ਲਿਖਤ ਦਾ ਪੰਜਾਬੀ ਵਿੱਚ ਅਨੁਵਾਦ ਕਰਨਾ ਪਵੇਗਾ। (Translation service loading...)',
      'ml': 'ഈ വാചകം മലയാളത്തിൽ വിവർത്തനം ചെയ്യണം। (Translation service loading...)',
      'ur': 'اس متن کا اردو میں ترجمہ کرنا ہوگا۔ (Translation service loading...)',
      'fr': 'Ce texte doit être traduit en français. (Translation service loading...)',
      'es': 'Este texto debe traducirse al español. (Translation service loading...)',
      'de': 'Dieser Text muss ins Deutsche übersetzt werden. (Translation service loading...)',
      'ar': 'يجب ترجمة هذا النص إلى العربية. (Translation service loading...)',
      'ru': 'Этот текст нужно перевести на русский язык. (Translation service loading...)',
      'ja': 'このテキストは日本語に翻訳する必要があります。 (Translation service loading...)',
      'zh': '此文本需要翻译成中文。 (Translation service loading...)'
    };

    return translations[targetLang] || `Translation to ${targetLang} is loading... (Service starting up)`;
  }

  onLanguageChange(): void {
    this.translatedText = ''; // Clear previous translation
    if (this.selectedVerse) {
      this.translateVerse();
    }
  }

  // Summarization functionality
  summarizeVerse(): void {
    if (!this.selectedVerse || this.isSummarizing) return;

    this.isSummarizing = true;
    const textToSummarize = this.selectedVerse.Content_eng;

    this.http.post(`${this.SUMMARIZE_API_URL}/summarize`, {
      text: textToSummarize,
      min_length: 30,
      max_length: 100
    }).subscribe({
      next: (response: any) => {
        this.summarizedText = response.summary || 'Summary not available';
        this.isSummarizing = false;
      },
      error: (error) => {
        console.error('Summarization error:', error);
        this.summarizedText = 'Summarization service is currently unavailable.';
        this.isSummarizing = false;
      }
    });
  }

  // Utility methods
  closeAiPanel(): void {
    this.closePanel.emit();
  }

  formatTimestamp(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
