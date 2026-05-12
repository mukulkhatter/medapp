import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MedListComponent } from "../med-list/med-list.component";
import { AddMedComponent } from "../add-med/add-med.component";

@Component({
    selector: 'app-med',
    templateUrl: './app-med.component.html',
    styleUrls: ['./app-med.component.css'],
    standalone: true,
    imports: [AddMedComponent, RouterModule]
})
export class AppMedComponent {
constructor(private router: Router) {
}

addnew()
{
this.router.navigate(['/add']);
}

}