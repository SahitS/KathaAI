import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { WorldmapComponent } from '../components/worldmap/worldmap.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { Language } from '../shared/interfaces/language.interface';

// Import your custom components

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    NavbarComponent,
    WorldmapComponent,
    ProfileComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'KathaAI';
  
  // Current page state (based on search params)
  currentPage: string = 'worldmap';
  selectedRegion: string | null = null;
  isHomePage: boolean = true;
  
  // Current selected language
  selectedLanguage: Language = {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the app
    this.initializeApp();
  }

  private initializeApp(): void {
    // Any initialization logic here
    console.log('KathaAI App Initialized');
  }

  // Handle view switching from navbar
  onTabChanged(tab: string): void {
    this.currentPage = tab;
    // Update URL with page parameter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: tab },
      queryParamsHandling: 'merge'
    });
    console.log('Page changed to:', tab);
  }

  // Handle language changes from profile component
  onLanguageChanged(language: Language): void {
    this.selectedLanguage = language;
    console.log('Language changed to:', language);
    
    // Here you would typically:
    // 1. Update the UI language
    // 2. Save to localStorage/backend
    // 3. Emit to other components that need language updates
    
    // Save to localStorage for persistence
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
  }

  // Handle search from navbar
  onSearchPerformed(query: string): void {
    console.log('Search performed:', query);
    // Implement search logic here
    // This could filter books, navigate to search results, etc.
  }

  // Load saved language preference on app start
  ngOnInit(): void {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.selectedLanguage = JSON.parse(savedLanguage);
    }

    // Check current route to determine if we're on home page
    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.isHomePage = url === '/' || url === '' || !url.includes('/mahabharatha');
    });

    // Subscribe to query parameter changes
    this.route.queryParams.subscribe(params => {
      // Handle page parameter
      const page = params['page'];
      if (page && ['worldmap', 'profile', 'search'].includes(page)) {
        this.currentPage = page;
      } else {
        this.currentPage = 'worldmap'; // Default page
      }
      
      // Handle region parameter
      const region = params['region'];
      if (region) {
        this.selectedRegion = region;
        console.log('Region selected from URL:', region);
      } else {
        this.selectedRegion = null;
      }
    });
  }

  // Handle region selection from worldmap
  onRegionSelected(regionId: string): void {
    this.selectedRegion = regionId;
    
    console.log('Region selected in app component:', {
      regionId,
      selectedRegion: this.selectedRegion
    });
    
    // Update URL with BOTH page and region parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        page: 'worldmap',  // Ensure we're on worldmap page
        region: regionId 
      },
      queryParamsHandling: 'merge'
    }).then(() => {
      // Reload the page to ensure proper rendering
      window.location.reload();
    });
  }

  // Handle region deselection
  onRegionDeselected(): void {
    this.selectedRegion = null;
    
    // Remove region from URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { region: null },
      queryParamsHandling: 'merge'
    });
  }

}