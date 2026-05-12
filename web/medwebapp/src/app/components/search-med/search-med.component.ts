import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface MedItem {
  brand: string;
  name: string;
  notes?: string;
  expiryDate: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-search-med',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-med.component.html',
  styleUrl: './search-med.component.css'
})
export class SearchMedComponent {
  searchName: string = '';
  searchResults: MedItem[] = [];

  constructor(private http: HttpClient) {}

  onSearch() {
    if (this.searchName.trim()) {
      this.http.get<MedItem[]>(`http://localhost:5001/api/Med/search/${this.searchName}`).subscribe({
        next: (results) => {
          this.searchResults = results;
        },
        error: (error) => {
          console.error('Error searching medicines', error);
          this.searchResults = [];
        }
      });
    } else {
      this.searchResults = [];
    }
  }
}