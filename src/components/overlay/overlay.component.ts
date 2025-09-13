import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnChanges {
  @Input() countryData: CountryData | null = null;
  @Input() isSelected: boolean = false;
  @Input() isHovered: boolean = false;
  @Output() closeOverlay = new EventEmitter<void>();
  @Output() showAllMythologies = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit() {
    // Component initialized
  }

  ngOnChanges() {
    // Component inputs changed
  }

  private readonly MAX_DISPLAYED_MYTHOLOGIES = 3;

  getDisplayedMythologies(): Mythology[] {
    if (!this.countryData?.detailedMythologies) return [];
    return this.countryData.detailedMythologies.slice(0, this.MAX_DISPLAYED_MYTHOLOGIES);
  }

  getRemainingMythologiesCount(): number {
    if (!this.countryData?.detailedMythologies) return 0;
    return Math.max(0, this.countryData.detailedMythologies.length - this.MAX_DISPLAYED_MYTHOLOGIES);
  }

  onShowAllMythologies(): void {
    if (this.countryData) {
      this.showAllMythologies.emit(this.countryData.id);
    }
  }

  onCloseClick(): void {
    this.closeOverlay.emit();
  }

  onExploreMythology(mythology: Mythology): void {
    // Navigate to specific mythology content based on the mythology name
    if (mythology.name.toLowerCase().includes('mahabharatha')) {
      this.router.navigate(['/mahabharatha']);
    } else {
      // For other mythologies, you can add more routes here
      console.log('Exploring mythology:', mythology.name);
      // For now, just show an alert
      alert(`Exploring ${mythology.name} - Feature coming soon!`);
    }
  }
}