import { Component, inject, OnDestroy, signal } from '@angular/core';
import {initialData, MedItem,MedItemSchema} from '../../Services/AddMedService';
import { form, FormField ,FormRoot} from '@angular/forms/signals';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { AuthService, initialLoginData, LoginCredentials, UserSchema } from '../../Services/auth.service';

@Component({
selector:'add-med-reactivesignal-route',
standalone:true,
templateUrl:'./user-login.html',
styleUrl:'./user-login.css',
imports: [FormField,FormRoot],
})



export class UserLoginFromComponent implements OnDestroy {
    
    authservice=inject(AuthService);

    private destroy$ = new Subject<void>();

    userLoginModel=signal<LoginCredentials>(initialLoginData);

    constructor(private http: HttpClient, private router: Router) {

    }

    userLoginForm = form(this.userLoginModel,
        UserSchema,
        {
            submission: {
                action: async (field) => {
                await this.authservice.login(field().value());

                this.router.navigate(['/medList']);
                
                },
                onInvalid: (field) => {
                    const firstError = field().errorSummary()[0];
                    firstError?.fieldTree().focusBoundControl();
                },
            },
            
        },
    );



     ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}