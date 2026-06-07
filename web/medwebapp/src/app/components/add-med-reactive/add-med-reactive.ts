import { Component, OnDestroy, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

interface MedItem {
  brand: string;
  name: string;
  notes?: string;
  expiryDate: string;
  quantity: number;
  price: number;
}

// Custom Validator: Price must be greater than 0
function priceValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // Don't validate empty values
  }
  const price = parseFloat(control.value);
  return price > 0 ? null : { invalidPrice: { value: control.value } };
}

@Component({
    selector: "app-add-med-reactive",
    templateUrl: "./add-med-reactive.html",
    styleUrl: "./add-med-reactive.css",
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class AddMedReactiveComponent implements OnDestroy {
    medForm: FormGroup;
    message = signal('');
    private destroy$ = new Subject<void>();

    constructor(private http: HttpClient, private router: Router) {
        this.medForm = new FormGroup({
            brand: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            notes: new FormControl(''),
            expiryDate: new FormControl(''),
            quantity: new FormControl(0, [Validators.required]),
            price: new FormControl(0, [Validators.required, priceValidator])
        });
    }

    onSubmit() {
        if (this.medForm.valid) {
            const formData: MedItem = this.medForm.value;
            this.http.post('http://localhost:5001/api/Med', formData)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (response) => {
                        console.log('Medicine added successfully', response);
                        this.message.set('Medicine added successfully!');
                        this.medForm.reset();
                        setTimeout(() => {
                            this.message.set('');
                        }, 3000);
                    },
                    error: (error) => {
                        console.error('Error adding medicine', error);
                        this.message.set('Error adding medicine. Please try again.');
                    }
                });
        } else {
            this.message.set('Please fill in all required fields correctly.');
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
