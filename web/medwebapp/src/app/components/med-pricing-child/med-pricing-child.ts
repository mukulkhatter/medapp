import { Component, inject, Input, input, output, signal } from "@angular/core";
import { User } from "../med-pricing-parent/med-pricing-parent";
import { DataShareService } from "../../Services/data-share.service";

@Component({
  selector: 'app-med-child',
  standalone: true,
  imports: [],
  templateUrl: './med-pricing-child.html',
  styleUrl: './med-pricing-child.css'
})

export class MedPricingChildComponent{

    //valuefromParent :number;

    // Optional input with a default fallback value
    //messagefromParent =signal<string>('');
    messagefromParent = input<string>('Hello Child'); 

     // Enforced input; Angular throws an error if the parent skips this property
    //valuefromParent = input.required<number>(); 

    valuefromParent = input<number>(5); 

     @Input() datafromParent: string = 'Data 1'; 



     // Define a custom event emitter
    onAlert = output<string>();


    userObj = input<User>();

    constructor(){

        //this.messagefromParent.set("hello child");
        //this.valuefromParent=5;
    }

    
    notifyParent() {
        // Send data upwards
        this.onAlert.emit('The child button was clicked!');
    }

    private dataService = inject(DataShareService);
  
     // Link the template evaluation to the service signal reference
    userProfile = this.dataService.sharedData; 
}
