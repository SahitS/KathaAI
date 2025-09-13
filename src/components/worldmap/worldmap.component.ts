import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../overlay/overlay.component';

interface Mythology {
  name: string;
  description: string;
  era: string;
  origin: string;
  image: string;
}

interface CountryData {
  id: string;
  name: string;
  booksCount: number;
  languages: string[];
  mythologies: string[];
  detailedMythologies?: Mythology[];
}

@Component({
  selector: 'app-worldmap',
  standalone: true,
  imports: [CommonModule, OverlayComponent],
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.scss']
})
export class WorldmapComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  @Input() selectedRegion: string | null = null;
  @Output() regionSelected = new EventEmitter<string>();
  @Output() regionDeselected = new EventEmitter<void>();

  selectedCountry: CountryData | null = null;
  isLoading: boolean = true;
  
  // Add flags to prevent multiple initializations
  private isMapInitialized: boolean = false;
  private isMapLoading: boolean = false;
  private mapObject: any = null;
  
  // Sample data for countries with mythological content
  countriesData: { [key: string]: CountryData } = {
    'IN': {
      id: 'IN',
      name: 'India',
      booksCount: 15,
      languages: ['Hindi', 'Sanskrit', 'Tamil', 'Bengali'],
      mythologies: ['Ramayana', 'Mahabharata', 'Puranas', 'Vedas'],
      detailedMythologies: [
        {
          name: 'Mahabharatha',
          description: 'Ancient stories of gods, goddesses, and epic heroes from the Vedas and Puranas',
          era: '1500 BCE - Present',
          origin: 'Vedic Tradition',
          image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Buddhist Mythology',
          description: 'Tales of the Buddha, bodhisattvas, and the path to enlightenment',
          era: '500 BCE - Present',
          origin: 'Buddhist Tradition',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Jain Mythology',
          description: 'Stories of Tirthankaras and the principles of non-violence and liberation',
          era: '600 BCE - Present',
          origin: 'Jain Tradition',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Sikh Mythology',
          description: 'Tales of the Gurus and the teachings of the Guru Granth Sahib',
          era: '1500 CE - Present',
          origin: 'Sikh Tradition',
          image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Tamil Mythology',
          description: 'Ancient Dravidian stories and the Sangam literature',
          era: '300 BCE - 300 CE',
          origin: 'Dravidian Tradition',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center'
        }
      ]
    },
    'GR': {
      id: 'GR',
      name: 'Greece',
      booksCount: 12,
      languages: ['Greek', 'Ancient Greek'],
      mythologies: ['Iliad', 'Odyssey', 'Theogony', 'Greek Myths'],
      detailedMythologies: [
        {
          name: 'Greek Mythology',
          description: 'Epic tales of gods, heroes, and the foundation of Western civilization',
          era: '800 BCE - 146 BCE',
          origin: 'Greek Tradition',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Homeric Epics',
          description: 'The Iliad and Odyssey - stories of the Trojan War and Odysseus journey',
          era: '800 BCE - 700 BCE',
          origin: 'Homeric Tradition',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Theogony',
          description: 'Hesiods account of the origins of the gods and the universe',
          era: '700 BCE',
          origin: 'Hesiodic Tradition',
          image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=100&h=100&fit=crop&crop=center'
        }
      ]
    },
    'NO': {
      id: 'NO',
      name: 'Norway',
      booksCount: 8,
      languages: ['Norwegian', 'Old Norse'],
      mythologies: ['Edda', 'Norse Sagas', 'Viking Tales'],
      detailedMythologies: [
        {
          name: 'Norse Mythology',
          description: 'Tales of Odin, Thor, and the Viking gods of Asgard',
          era: '800 CE - 1200 CE',
          origin: 'Norse Tradition',
          image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'The Edda',
          description: 'Collection of Old Norse poems and stories about gods and heroes',
          era: '1200 CE',
          origin: 'Icelandic Tradition',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Viking Sagas',
          description: 'Epic tales of Viking heroes, battles, and adventures',
          era: '800 CE - 1200 CE',
          origin: 'Viking Tradition',
          image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop&crop=center'
        }
      ]
    },
    'EG': {
      id: 'EG',
      name: 'Egypt',
      booksCount: 10,
      languages: ['Arabic', 'Ancient Egyptian'],
      mythologies: ['Book of the Dead', 'Pyramid Texts', 'Egyptian Myths'],
      detailedMythologies: [
        {
          name: 'Egyptian Mythology',
          description: 'Ancient stories of pharaohs, gods, and the afterlife from the Nile civilization',
          era: '3100 BCE - 30 BCE',
          origin: 'Egyptian Tradition',
          image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Book of the Dead',
          description: 'Ancient Egyptian funerary texts and spells for the afterlife',
          era: '1550 BCE - 50 BCE',
          origin: 'Egyptian Funerary Tradition',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Pyramid Texts',
          description: 'The oldest religious texts in the world, inscribed in pyramids',
          era: '2400 BCE - 2300 BCE',
          origin: 'Old Kingdom Egypt',
          image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop&crop=center'
        }
      ]
    },
    'CN': {
      id: 'CN',
      name: 'China',
      booksCount: 14,
      languages: ['Mandarin', 'Classical Chinese'],
      mythologies: ['Journey to the West', 'Fengshen Yanyi', 'Classic of Mountains and Seas'],
      detailedMythologies: [
        {
          name: 'Chinese Mythology',
          description: 'Ancient tales of dragons, immortals, and celestial beings from Chinese tradition',
          era: '2000 BCE - Present',
          origin: 'Chinese Tradition',
          image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Journey to the West',
          description: 'Epic tale of Monkey King and his journey to obtain Buddhist scriptures',
          era: '1590 CE',
          origin: 'Ming Dynasty Literature',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Taoist Mythology',
          description: 'Stories of the Eight Immortals and Taoist philosophy',
          era: '200 BCE - Present',
          origin: 'Taoist Tradition',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center'
        }
      ]
    },
    'JP': {
      id: 'JP',
      name: 'Japan',
      booksCount: 9,
      languages: ['Japanese', 'Classical Japanese'],
      mythologies: ['Kojiki', 'Nihon Shoki', 'Japanese Folk Tales'],
      detailedMythologies: [
        {
          name: 'Shinto Mythology',
          description: 'Ancient Japanese stories of kami (spirits) and the creation of Japan',
          era: '712 CE - Present',
          origin: 'Shinto Tradition',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Kojiki',
          description: 'Records of Ancient Matters - the oldest surviving Japanese text',
          era: '712 CE',
          origin: 'Japanese Imperial Court',
          image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=100&h=100&fit=crop&crop=center'
        },
        {
          name: 'Buddhist Mythology',
          description: 'Japanese Buddhist tales and the path to enlightenment',
          era: '538 CE - Present',
          origin: 'Japanese Buddhist Tradition',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center'
        }
      ]
    },
    'MX': {
      id: 'MX',
      name: 'Mexico',
      booksCount: 7,
      languages: ['Spanish', 'Nahuatl', 'Maya'],
      mythologies: ['Popol Vuh', 'Aztec Codices', 'Maya Mythology']
    },
    'PE': {
      id: 'PE',
      name: 'Peru',
      booksCount: 6,
      languages: ['Spanish', 'Quechua'],
      mythologies: ['Inca Mythology', 'Andean Tales']
    },
    'IE': {
      id: 'IE',
      name: 'Ireland',
      booksCount: 8,
      languages: ['Irish Gaelic', 'English'],
      mythologies: ['Ulster Cycle', 'Celtic Mythology', 'Irish Folk Tales']
    },
    'IS': {
      id: 'IS',
      name: 'Iceland',
      booksCount: 6,
      languages: ['Icelandic', 'Old Norse'],
      mythologies: ['Icelandic Sagas', 'Eddas']
    },
    'IT': {
      id: 'IT',
      name: 'Italy',
      booksCount: 8,
      languages: ['Italian', 'Latin'],
      mythologies: ['Aeneid', 'Roman Mythology', 'Dante\'s Divine Comedy']
    },
    'GB': {
      id: 'GB',
      name: 'United Kingdom',
      booksCount: 10,
      languages: ['English', 'Old English'],
      mythologies: ['Beowulf', 'King Arthur', 'Celtic Legends']
    },
    'FR': {
      id: 'FR',
      name: 'France',
      booksCount: 7,
      languages: ['French', 'Old French'],
      mythologies: ['Chanson de Roland', 'French Folklore']
    },
    'DE': {
      id: 'DE',
      name: 'Germany',
      booksCount: 9,
      languages: ['German', 'Old High German'],
      mythologies: ['Nibelungenlied', 'Germanic Mythology']
    },
    'RU': {
      id: 'RU',
      name: 'Russia',
      booksCount: 11,
      languages: ['Russian', 'Old Church Slavonic'],
      mythologies: ['Russian Folklore', 'Slavic Mythology']
    },
    'TR': {
      id: 'TR',
      name: 'Turkey',
      booksCount: 6,
      languages: ['Turkish', 'Ottoman Turkish'],
      mythologies: ['Turkish Folklore', 'Anatolian Myths']
    },
    'IR': {
      id: 'IR',
      name: 'Iran',
      booksCount: 12,
      languages: ['Persian', 'Avestan'],
      mythologies: ['Shahnameh', 'Zoroastrian Texts', 'Persian Mythology']
    },
    'TH': {
      id: 'TH',
      name: 'Thailand',
      booksCount: 5,
      languages: ['Thai', 'Pali'],
      mythologies: ['Thai Folklore', 'Buddhist Jataka Tales']
    },
    'VN': {
      id: 'VN',
      name: 'Vietnam',
      booksCount: 4,
      languages: ['Vietnamese', 'Classical Chinese'],
      mythologies: ['Vietnamese Folklore', 'Dragon Legends']
    },
    'KR': {
      id: 'KR',
      name: 'South Korea',
      booksCount: 6,
      languages: ['Korean', 'Classical Korean'],
      mythologies: ['Korean Folklore', 'Samguk Yusa']
    }
  };

  mapStats = {
    totalBooks: 0,
    totalLanguages: 0,
    totalCountries: 0
  };

  constructor() { }

  ngOnInit(): void {
    this.calculateMapStats();
    // Simulate loading
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  ngAfterViewInit(): void {
    // Only initialize once
    if (!this.isMapInitialized && !this.isMapLoading) {
    this.initializeMap();
      this.setupMouseWheelScrolling();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Handle selectedRegion changes regardless of map initialization status
    if (changes['selectedRegion']) {
      console.log('Selected region changed:', {
        previousValue: changes['selectedRegion'].previousValue,
        currentValue: changes['selectedRegion'].currentValue,
        isMapInitialized: this.isMapInitialized
      });
      
      // If map is initialized, apply the change immediately
      if (this.isMapInitialized) {
        this.updateMapSelection(changes['selectedRegion'].currentValue);
      }
      // If map is not initialized, the change will be applied when map finishes loading
      // (this is already handled in the map initialization code at lines 476-478)
    }
  }

  private calculateMapStats(): void {
    const countries = Object.values(this.countriesData);
    this.mapStats.totalBooks = countries.reduce((sum, country) => sum + country.booksCount, 0);
    this.mapStats.totalCountries = countries.length;
    
    const allLanguages = new Set<string>();
    countries.forEach(country => {
      country.languages.forEach(lang => allLanguages.add(lang));
    });
    this.mapStats.totalLanguages = allLanguages.size;
  }

  onSvgLoaded(): void {
    console.log('World map SVG loaded successfully');
    // The initialization will happen in the onload event of the object
  }

  onSvgError(): void {
    console.error('Failed to load world map SVG');
    this.isLoading = false;
    this.isMapLoading = false;
  }

  private initializeMap(): void {
    // Prevent multiple initializations
    if (this.isMapInitialized || this.isMapLoading) {
      console.log('Map initialization already in progress or completed');
      return;
    }

    this.isMapLoading = true;
    console.log('Starting map initialization...');
    
    // Initialize SVG map interactions
    setTimeout(() => {
      const mapObject = this.mapContainer.nativeElement.querySelector('object');
      if (mapObject) {
        this.mapObject = mapObject;
        
        // Wait for the object to load
        mapObject.onload = () => {
          try {
            const mapSvg = mapObject.contentDocument?.querySelector('svg');
      if (mapSvg) {
              console.log('SVG found, applying styles and event listeners...');
              
              // Apply custom styles to the SVG
              this.applyCustomStyles(mapSvg);
              
              // Get all country paths (both with id and class attributes)
              const countriesWithId = mapSvg.querySelectorAll('path[id]');
              const countriesWithClass = mapSvg.querySelectorAll('path[class]');
              const allCountries = [...countriesWithId, ...countriesWithClass];
              console.log('Found countries in SVG:', allCountries.length);
              
              let highlightedCount = 0;
              allCountries.forEach((country: any) => {
                // Try to get country ID from either id attribute or class attribute
                let countryId = country.getAttribute('id');
                if (!countryId) {
                  // If no id, try to get from class and map to our data keys
                  const className = country.getAttribute('class');
                  if (className) {
                    // Map class names to our country data keys
                    const classToIdMap: { [key: string]: string } = {
                      'Greece': 'GR',
                      'Norway': 'NO',
                      'India': 'IN'
                    };
                    countryId = classToIdMap[className];
                  }
                }
                
                if (!countryId) return; // Skip if we can't identify the country
                
          const countryData = this.countriesData[countryId];
          
                // Set uniform initial styles for all countries
                country.style.fill = 'rgba(100, 116, 139, 0.3)';
                country.style.stroke = 'rgba(148, 163, 184, 0.5)';
                country.style.strokeWidth = '1';
                
                // Add special styling for countries with data
          if (countryData) {
            country.classList.add('has-data');
                  country.style.fill = 'rgba(59, 130, 246, 0.4)';
                  country.style.stroke = 'rgba(59, 130, 246, 0.8)';
                  country.style.strokeWidth = '1.5';
                  highlightedCount++;
                }
                
                // Add cursor pointer for all countries
                country.style.cursor = 'pointer';
                country.style.transition = 'fill 0.15s ease-out, stroke 0.15s ease-out, stroke-width 0.15s ease-out';
                country.style.willChange = 'fill, stroke, stroke-width';
                
                // Add event listeners (only once)
          country.addEventListener('mouseenter', (event: any) => {
            this.onCountryHover(event, countryId);
          });
          
          country.addEventListener('mouseleave', () => {
            this.onCountryLeave();
          });
          
          country.addEventListener('click', (event: any) => {
            this.onCountryClick(event, countryId);
          });
        });
              
              console.log('Map initialization completed. Highlighted countries:', highlightedCount);
              
              // Mark as initialized
              this.isMapInitialized = true;
              this.isMapLoading = false;
              this.isLoading = false;
              
              // If there's a pre-selected region, highlight it
              if (this.selectedRegion) {
                this.updateMapSelection(this.selectedRegion);
              }
              
            } else {
              console.error('Could not find SVG element in object');
              this.isLoading = false;
              this.isMapLoading = false;
            }
          } catch (error) {
            console.error('Error accessing object contentDocument:', error);
            this.isLoading = false;
            this.isMapLoading = false;
          }
        };

        // Handle load errors
        mapObject.onerror = () => {
          console.error('Failed to load SVG object');
          this.isLoading = false;
          this.isMapLoading = false;
        };

      } else {
        console.error('Could not find object element');
        this.isLoading = false;
        this.isMapLoading = false;
      }
    }, 500);
  }

  private updateMapSelection(selectedRegion: string | null): void {
    if (!this.mapObject || !this.isMapInitialized) return;

    try {
      const mapSvg = this.mapObject.contentDocument?.querySelector('svg');
      if (mapSvg) {
        // Remove previous selection
        const selectedElements = mapSvg.querySelectorAll('.selected');
        selectedElements.forEach((el: any) => {
          el.classList.remove('selected');
        });

        // Add selection to current region if exists
        if (selectedRegion) {
          // Try to find country by id first
          let targetCountry = mapSvg.querySelector(`path[id="${selectedRegion}"]`);
          
          // If not found by id, try to find by class
          if (!targetCountry) {
            const classToIdMap: { [key: string]: string } = {
              'GR': 'Greece',
              'NO': 'Norway',
              'IN': 'India'
            };
            const className = classToIdMap[selectedRegion];
            if (className) {
              targetCountry = mapSvg.querySelector(`path[class="${className}"]`);
            }
          }
          
          if (targetCountry) {
            targetCountry.classList.add('selected');
          }
        }
      }
    } catch (error) {
      console.error('Error updating map selection:', error);
    }
  }

  private applyCustomStyles(svg: any): void {
    // Create a style element for the SVG
    const style = svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = `
      /* Uniform base styles for all countries */
      path {
        fill: rgba(100, 116, 139, 0.3) !important;
        stroke: rgba(148, 163, 184, 0.5) !important;
        stroke-width: 1 !important;
        transition: fill 0.15s ease-out, stroke 0.15s ease-out, stroke-width 0.15s ease-out !important;
        will-change: fill, stroke, stroke-width !important;
      }
      
      /* Countries with data */
      .has-data {
        fill: rgba(59, 130, 246, 0.4) !important;
        stroke: rgba(59, 130, 246, 0.8) !important;
        stroke-width: 1.5 !important;
      }
      
      /* Hover effects - optimized for smoothness */
      .has-data:hover, .hovered {
        fill: rgba(59, 130, 246, 0.8) !important;
        stroke: #3b82f6 !important;
        stroke-width: 2 !important;
      }
      
      /* Selection effects */
      .selected {
        fill: rgba(16, 185, 129, 0.6) !important;
        stroke: #10b981 !important;
        stroke-width: 2.5 !important;
        animation: pulse-selected 2s infinite !important;
      }
      
      @keyframes pulse-selected {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
    `;
    svg.appendChild(style);
  }

  onCountryHover(event: any, countryId: string): void {
    const countryData = this.countriesData[countryId];
    if (countryData) {
      // Use requestAnimationFrame for smooth hover effects
      requestAnimationFrame(() => {
      event.target.classList.add('hovered');
      });
    }
  }

  onCountryLeave(): void {
    // Remove hover effects from all countries in the SVG
    if (this.mapObject && this.mapObject.contentDocument) {
      const hoveredElements = this.mapObject.contentDocument.querySelectorAll('.hovered');
      // Use requestAnimationFrame for smooth removal
      requestAnimationFrame(() => {
        hoveredElements.forEach((el: any) => {
          el.classList.remove('hovered');
        });
      });
    }
  }

  onCountryClick(event: any, countryId: string): void {
    const countryData = this.countriesData[countryId];
    if (countryData) {
      console.log('Country clicked:', {
        countryId,
        countryData,
        hasDetailedMythologies: !!countryData.detailedMythologies
      });
      
      // Remove previous selection and add to current country
      this.updateMapSelection(countryId);
      
      // Emit region selection event
      this.regionSelected.emit(countryId);
    }
  }

  resetSelection(): void {
    // Remove selection from SVG
    this.updateMapSelection(null);
    
    // Emit region deselection event
    this.regionDeselected.emit();
  }

  onCloseOverlay(): void {
    this.resetSelection();
  }

  onShowAllMythologies(countryId: string): void {
    // This would navigate to a detailed mythology page
    console.log(`Showing all mythologies for country: ${countryId}`);
    // TODO: Implement navigation to detailed mythology page
  }

  getCountryData(regionId: string): CountryData | null {
    return this.countriesData[regionId] || null;
  }

  private setupMouseWheelScrolling(): void {
    const mapContainer = this.mapContainer.nativeElement.querySelector('.world-map-container');
    if (mapContainer) {
      let isScrolling = false;
      
      mapContainer.addEventListener('wheel', (event: WheelEvent) => {
        // Prevent default scrolling behavior
        event.preventDefault();
        
        if (isScrolling) return;
        isScrolling = true;
        
        // Get scroll amounts with reduced sensitivity for smoother scrolling
        const deltaX = event.deltaX * 0.8;
        const deltaY = event.deltaY * 0.8;
        
        // Apply smooth scrolling
        mapContainer.scrollBy({
          left: deltaX,
          top: deltaY,
          behavior: 'smooth'
        });
        
        // Reset scroll flag after a short delay
        setTimeout(() => {
          isScrolling = false;
        }, 16); // ~60fps
      }, { passive: false });
    }
  }
}