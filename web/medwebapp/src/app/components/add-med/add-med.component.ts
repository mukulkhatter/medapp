import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  selector: 'app-add-med',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-med.component.html',
  styleUrl: './add-med.component.css'
})
export class AddMedComponent {
  med: MedItem = {
    brand: '',
    name: '',
    notes: '',
    expiryDate: '',
    quantity: 0,
    price: 0
  };
message = signal('');
  constructor(private http: HttpClient, private router: Router) {
    this.message.set('');
  }

  onSubmit() {
    if (this.med.brand && this.med.name) {
      this.http.post('http://localhost:5001/api/Med', this.med).subscribe({
        next: (response) => {
          console.log('Medicine added successfully', response);
          this.message.set('Medicine added successfully!');
          setTimeout(() => {
// Reset form
          this.med = {
            brand: '',
            name: '',
            notes: '',
            expiryDate: '',
            quantity: 0,
            price: 0
          };
          this.router.navigate(['/medList']);
          },3000);
          
        },
        error: (error) => {
          console.error('Error adding medicine', error);
          this.message.set('Error adding medicine. Please try again.');
        }
      });
    }
  }
}