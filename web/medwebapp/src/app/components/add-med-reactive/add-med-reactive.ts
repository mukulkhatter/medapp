import { LowerCasePipe } from "@angular/common";
import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { email } from "@angular/forms/signals";

@Component({
    selector: "app-add-med-reactive",
    templateUrl: "./add-med-reactive.html",
    standalone: true,
    imports: [ReactiveFormsModule,LowerCasePipe]

})
export class AddMedReactiveComponent implements OnInit, OnDestroy, OnChanges {
    medForm: FormGroup;
    pipe: LowerCasePipe = new LowerCasePipe();
title = "Add Medicine Reactive Form";
    constructor() {
        this.medForm = new FormGroup({
            name: new FormControl('', [Validators.required]),email: new FormControl('')
        });
this.pipe.transform(this.title);
    }
    ngOnChanges(): void {
    }
    ngOnInit(): void {
        // API call to fetch data for the form, if needed
debugger;
    }

    onSubmit() {
    // If Valid Call API
    debugger;
    }
    ngOnDestroy(): void {
        // unsubscribe from any subscriptions to prevent memory leaks
    }
}
