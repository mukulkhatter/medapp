import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedItem, MedService } from '../../Services/AddMedService';
import { Router } from '@angular/router';

@Component({
 selector: 'app-med-list-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './med-list-signal.html',
  styleUrl: './med-list-signal.css',
  providers: [MedService] 
})

export class MedListSignal{

constructor(private router: Router) {}

 private medService = inject(MedService);

   // Expose signals from the service to the template
  searchMed = this.medService.searchMed;
  medicines = this.medService.medicines;
  loading = this.medService.isloading;
  error = this.medService.errors;

  // Updates the signal as the user types (the debounce handle triggers the API)
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchMed.set(input.value);
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