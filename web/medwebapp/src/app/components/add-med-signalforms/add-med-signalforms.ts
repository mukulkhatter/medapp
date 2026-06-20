import { Component, OnDestroy, signal } from '@angular/core';
import {initialData, MedItem,MedItemSchema} from '../../Services/AddMedService';
import { form, FormField ,FormRoot} from '@angular/forms/signals';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
selector:'add-med-reactivesignal-route',
standalone:true,
templateUrl:'./add-med-signalforms.html',
styleUrl:'./add-med-signalforms.css',
imports: [FormField,FormRoot],
})



export class AddMedSignalFromsComponent implements OnDestroy {
    
    message = signal('');

    private destroy$ = new Subject<void>();

    medItemModel=signal<MedItem>(initialData);

    constructor(private http: HttpClient, private router: Router) {

    }

    medItemForm = form(this.medItemModel,
        MedItemSchema,
        {
            submission: {
                action: async (field) => {
                await this.saveMed(field().value());
                },
                onInvalid: (field) => {
                    const firstError = field().errorSummary()[0];
                    firstError?.fieldTree().focusBoundControl();
                },
            },
        },
    );


    saveMed(formData: MedItem) {
debugger;
        this.http.post('http://localhost:5001/api/Med', formData)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response) => {
                    console.log('Medicine added successfully', response);
                    this.message.set('Medicine added successfully!');
                    setTimeout(() => {
                        this.message.set('');
                    }, 3000);
                },
                error: (error) => {
                    console.error('Error adding medicine', error);
                    this.message.set('Error adding medicine. Please try again.');
                }
        });
    }

     ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}