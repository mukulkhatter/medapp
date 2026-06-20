import { Component, inject, signal } from "@angular/core";
import { RouterOutlet, RouterLinkWithHref, Router, ActivatedRoute } from "@angular/router";
import { MedPricingChildComponent } from "../med-pricing-child/med-pricing-child";
import { DataShareService } from "../../Services/data-share.service";
import { HasUnsavedChanges } from "../../guards/pending-changes.component";

@Component({
  selector: 'app-med-parent',
  standalone: true,
  imports: [
     //RouterOutlet, // Required to handle nested routing and navigation
    RouterLinkWithHref, 
    MedPricingChildComponent
    ], 
  templateUrl: './med-pricing-parent.html',
  styleUrl: './med-pricing-parent.css'
})

export class MedPricingParentComponent implements HasUnsavedChanges {

    parentMessage = 'Welcome to our application Child!';
    parentValue = 10;

    parentData = 'This is a message from the traditional decorator setup';


    childMessage = 'Waiting for child action...';


    currentUser: User = { id: 101, name: 'John' };
    

    // Modern Angular method to inject services
    private router = inject(Router); 

    // ... inside class
    private route = inject(ActivatedRoute);
  
    goToChild() {

        //1. Navigates to http://localhost:4200/med-pricing-parent/med-pricing-child'
        //this.router.navigate(['/med-pricing-parent', 'med-pricing-child']);

        //2. Navigates to http://localhost:4200/users/45/profile
        //const userId = 45;
        //this.router.navigate(['/users', userId, 'profile']);

        //3. Example using navigate()
        // this.router.navigate(['/products'], {
        // queryParams: { page: 2, sort: 'asc' }, // Appends ?page=2&sort=asc
        // fragment: 'specifications',            // Appends #specifications
        // skipLocationChange: false              // Set true to hide URL change in address bar
        // });


        //4. If current URL is '/med-pricing-parent', this goes to '/med-pricing-parent/med-pricing-child'
        this.router.navigate(['med-pricing-child'], { relativeTo: this.route });
    }

    goToChildURL() {

        //1. Navigates to http://localhost:4200/med-pricing-parent/med-pricing-child
        this.router.navigateByUrl('/med-pricing-parent/med-pricing-child');

        //2. Navigates to http://localhost:4200/search?query=angular
        //this.router.navigateByUrl('/search?query=angular');

    }

    handleChildAction(message:string){
        this.childMessage = message; // Updates to: 'The child button was clicked!
    }


    updateDataOnChild() {
    // CRITICAL: Overwrite the reference entirely so Angular notices the change
    this.currentUser = {
      id: 102,
      name: 'Johnny'
    };

    // this.currentUser = { ...this.currentUser, id: 102 };
    // this.currentUser = { ...this.currentUser, name: 'Johnny' };

    //this.currentUser.name = 'Alice Johnson'; // Bad: View won't update!
  }


  private dataService = inject(DataShareService);

  changeUser() {
    // Send updated object properties over the service connection link
    this.dataService.updateSharedData({ userId: 404, name: 'Jonathan Doe' });
  }


  //if user want to navigate from one component to another then ask yes or no for saving data
  isDirty = signal<boolean>(false);

  hasUnsavedChanges(): boolean {
    return this.isDirty(); // Guard blocks navigation if true
  }

}

export interface User{
    id: number;
    name:string;
}