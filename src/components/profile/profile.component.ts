import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Language } from '../../shared/interfaces/language.interface';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  preferredLanguage: Language;
  joinDate: Date;
  favoriteBooks: string[];
  readingProgress: { [key: string]: number };
  preferences: {
    theme: 'dark' | 'light';
    notifications: boolean;
    autoTranslate: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() currentLanguage: Language = {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English'
  };
  
  @Output() languageChanged = new EventEmitter<Language>();

  isEditing = false;
  activeTab = 'account';
  tempLanguage: Language | null = null;

  languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳', nativeName: 'ਪੰਜਾਬੀ' }
  ];

  userProfile: UserProfile = {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    avatar: 'https://via.placeholder.com/100',
    preferredLanguage: this.languages[0], // English by default
    joinDate: new Date('2023-06-15'),
    favoriteBooks: ['Ramayana', 'Mahabharata', 'Iliad', 'Norse Mythology'],
    readingProgress: {
      'Ramayana': 75,
      'Mahabharata': 45,
      'Iliad': 90,
      'Norse Mythology': 30
    },
    preferences: {
      theme: 'dark',
      notifications: true,
      autoTranslate: false,
      fontSize: 'medium'
    }
  };

  stats = {
    booksRead: 12,
    languagesExplored: 5,
    totalReadingTime: 156,
    completionRate: 68
  };

  constructor() { }

  ngOnInit(): void {
    // Update user profile with current language if provided
    if (this.currentLanguage) {
      this.userProfile.preferredLanguage = this.currentLanguage;
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.tempLanguage) {
      this.saveLanguagePreference();
    }
  }

  selectLanguage(language: Language): void {
    this.tempLanguage = language;
    if (!this.isEditing) {
      this.saveLanguagePreference();
    }
  }

  saveLanguagePreference(): void {
    if (this.tempLanguage) {
      this.userProfile.preferredLanguage = this.tempLanguage;
      this.languageChanged.emit(this.tempLanguage);
      this.tempLanguage = null;
    }
  }

  saveProfile(): void {
    this.isEditing = false;
    this.saveLanguagePreference();
    console.log('Profile saved:', this.userProfile);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.tempLanguage = null;
  }

  updatePreference(key: string, value: any): void {
    (this.userProfile.preferences as any)[key] = value;
  }

  getReadingProgressColor(progress: number): string {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getActiveLanguage(): Language {
    return this.tempLanguage || this.userProfile.preferredLanguage;
  }

  uploadAvatar(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userProfile.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  exportData(): void {
    const data = {
      profile: this.userProfile,
      exportDate: new Date()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'profile-data.json';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
    }
  }
}