import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() selectedLanguage: Language = {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  };
  @Input() activeTab: string = 'worldmap';
  
  @Output() tabChanged = new EventEmitter<string>();
  @Output() searchPerformed = new EventEmitter<string>();

  private destroy$ = new Subject<void>();
  
  searchQuery: string = '';
  isSearchFocused: boolean = false;
  
  languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setActiveTab(tab: string): void {
    this.tabChanged.emit(tab);
  }

  onSearchFocus(): void {
    this.isSearchFocused = true;
  }

  onSearchBlur(): void {
    this.isSearchFocused = false;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.searchPerformed.emit(this.searchQuery.trim());
      // Optionally switch to search tab
      this.tabChanged.emit('search');
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
  }
}