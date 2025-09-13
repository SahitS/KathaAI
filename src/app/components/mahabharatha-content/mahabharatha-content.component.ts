import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AiPanelComponent } from '../../components/ai-panel/ai-panel.component';
import { ActivatedRoute, Router } from '@angular/router';

interface MahabharathaVerse {
  Book_id: string;
  Chapter_id: string;
  Verse_id: string;
  Content_eng: string;
  Content_hin: string;
  Content_chi: string;
  Summary: string;
}

interface Chapter {
  id: string;
  title: string;
  verseCount: number;
  isExpanded: boolean;
  verses: MahabharathaVerse[];
}

@Component({
  selector: 'app-mahabharatha-content',
  standalone: true,
  imports: [CommonModule, AiPanelComponent],
  templateUrl: './mahabharatha-content.component.html',
  styleUrls: ['./mahabharatha-content.component.scss', './ai-help-styles.scss']
})
export class MahabharathaContentComponent implements OnInit {
  chapters: Chapter[] = [];
  selectedVerse: MahabharathaVerse | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  showAiHelp: boolean = false;
  
  private readonly API_BASE_URL = 'http://localhost:3001';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMahabharathaData();
  }

  loadMahabharathaData(): void {
    this.isLoading = true;
    this.error = null;

    // Initialize chapters 1-10
    this.chapters = Array.from({ length: 10 }, (_, i) => ({
      id: (i + 1).toString(),
      title: `Chapter ${i + 1}`,
      verseCount: 0,
      isExpanded: false,
      verses: []
    }));

    // Load data for all chapters
    this.loadAllChapters();
  }

  private loadAllChapters(): void {
    // Load data from the backend
    this.loadBackendData();
  }

  private loadBackendData(): void {
    // Load Chapter 1 data from backend (since that's what we have)
    this.http.get<MahabharathaVerse[]>(`${this.API_BASE_URL}/entries?chapter=1`)
      .subscribe({
        next: (data) => {
          console.log('Loaded data from backend:', data);
          
          // Add data to Chapter 1
          const chapter1 = this.chapters.find(c => c.id === "1");
          if (chapter1) {
            chapter1.verses = data;
            chapter1.verseCount = data.length;
          }

          // For other chapters, show empty state
          this.chapters.forEach(chapter => {
            if (chapter.id !== "1") {
              chapter.verseCount = 0;
              chapter.verses = [];
            }
          });

          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading data from backend:', error);
          this.error = 'Failed to load Mahabharatha content from server';
          this.isLoading = false;
          
          // Fallback to mock data if backend fails
          this.loadMockData();
        }
      });
  }

  private loadMockData(): void {
    // Mock data for Chapter 1 (fallback when backend is not available)
    const mockVerses: MahabharathaVerse[] = [
      {
        Book_id: "1",
        Chapter_id: "1",
        Verse_id: "1",
        Content_eng: "Om! Having bowed down to Narayana and Nara, the most exalted male being, and also to the goddess Saraswati, must the word Jaya be uttered.",
        Content_hin: "ॐ! नारायण और नर, उन श्रेष्ठ पुरुषों, और देवी सरस्वती को प्रणाम करके 'जय' शब्द का उच्चारण करना चाहिए।",
        Content_chi: "唵！向至高的神祇那罗延与圣人那罗，以及女神萨拉斯瓦蒂致敬，然后应当诵念'胜利'（Jaya）之语。",
        Summary: "Invocation to the divine beings before beginning the epic"
      },
      {
        Book_id: "1",
        Chapter_id: "1",
        Verse_id: "2",
        Content_eng: "In the forest of Naimisha, the sages, having performed a twelve-year sacrifice, were sitting in the assembly hall.",
        Content_hin: "नैमिष वन में, ऋषियों ने बारह वर्ष का यज्ञ करने के बाद, सभा भवन में बैठे थे।",
        Content_chi: "在尼弥沙森林中，圣人们完成了十二年的祭祀后，坐在集会大厅里。",
        Summary: "Setting the scene in the forest of Naimisha"
      },
      {
        Book_id: "1",
        Chapter_id: "1",
        Verse_id: "3",
        Content_eng: "There, the great sage Sauti, having been asked by the sages, began to narrate the Mahabharata.",
        Content_hin: "वहाँ, महान ऋषि सौति ने, ऋषियों के द्वारा पूछे जाने पर, महाभारत का वर्णन शुरू किया।",
        Content_chi: "在那里，伟大的圣人苏提在圣人们的询问下，开始讲述摩诃婆罗多。",
        Summary: "Sage Sauti begins the narration of the Mahabharata"
      }
    ];

    // Add mock data to Chapter 1
    const chapter1 = this.chapters.find(c => c.id === "1");
    if (chapter1) {
      chapter1.verses = mockVerses;
      chapter1.verseCount = mockVerses.length;
    }

    // For other chapters, show empty state
    this.chapters.forEach(chapter => {
      if (chapter.id !== "1") {
        chapter.verseCount = 0;
        chapter.verses = [];
      }
    });

    this.isLoading = false;
  }

  toggleChapter(chapter: Chapter): void {
    chapter.isExpanded = !chapter.isExpanded;
    
    // If expanding and verses not loaded, load them
    if (chapter.isExpanded && chapter.verses.length === 0) {
      this.loadChapterData(chapter.id);
    }
  }
  loadChapterData(id: string): void {
    // This method is called when expanding a chapter
    console.log(`Loading data for chapter ${id}`);
    
    // For now, only Chapter 1 has data in the backend
    if (id === "1") {
      this.http.get<MahabharathaVerse[]>(`${this.API_BASE_URL}/entries?chapter=${id}`)
        .subscribe({
          next: (data) => {
            const chapter = this.chapters.find(c => c.id === id);
            if (chapter) {
              chapter.verses = data;
              chapter.verseCount = data.length;
            }
          },
          error: (error) => {
            console.error(`Error loading chapter ${id}:`, error);
          }
        });
    } else {
      // For other chapters, show empty state
      const chapter = this.chapters.find(c => c.id === id);
      if (chapter) {
        chapter.verses = [];
        chapter.verseCount = 0;
      }
    }
  }

  selectVerse(verse: MahabharathaVerse): void {
    this.selectedVerse = verse;
  }

  openAiHelp(): void {
    this.showAiHelp = true;
  }

  closeAiHelp(): void {
    this.showAiHelp = false;
  }

  closeVerseDetail(): void {
    this.selectedVerse = null;
  }

  goBack(): void {
    this.router.navigate(['/'], { queryParams: { page: 'worldmap' } });
  }
}