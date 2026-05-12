import { Component, OnInit, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounce } from 'rxjs';
import { Router } from '@angular/router';

interface MedItem {
  brand: string;
  name: string;
  notes?: string;
  expiryDate: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-med-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './med-list.component.html',
  styleUrl: './med-list.component.css'
})
export class MedListComponent implements OnInit {
    medicinesList: MedItem[] = [];
  medicines: MedItem[] = [];
  loading = signal(false);
  medicineSignal = signal<MedItem[]>([]);
 searchName: string = '';

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.loadMedicines();
  
  }

  loadMedicines() {
    this.loading.set(true);
    this.http.get<MedItem[]>('http://localhost:5001/api/Med').subscribe({
      next: (medicines) => {
        this.medicinesList = medicines;
        this.medicineSignal.set(medicines);
        this.loading.set(false);
      },
      error: (error) => {
        //console.error('Error loading medicines', error);
        this.loading.set(false);
        this.medicineSignal.set([]);
      }
    });
  }


onSearch() {
   
    if (this.searchName.trim() && this.searchName.length>=3) {
     this.medicineSignal.update(() => this.medicinesList.filter(med => med.name.toLowerCase().includes(this.searchName.toLowerCase())));
  }
  else{
    this.medicineSignal.set(this.medicinesList);
  }
  
}

  refresh() {
    this.searchName = '';
    this.loadMedicines();
  }
  getRowClass(med: MedItem): string {
    if (med.quantity < 10) {
      return 'low-quantity';
    }
    
    const expiryDate = new Date(med.expiryDate);
    const today = new Date();
    const daysUntilExpiry = (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    
    if ( daysUntilExpiry < 30) {
      return 'expiry-soon';
    }
    
    return '';
  }

  onAddNew(){
    this.router.navigate(['/']);
  }
}