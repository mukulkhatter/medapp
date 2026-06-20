import { CanDeactivateFn } from '@angular/router';
import { HasUnsavedChanges } from './pending-changes.component';

export const canDeactivateGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {

    debugger;

  // If the component has unsaved changes, prompt the user
  if (component.hasUnsavedChanges && component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes! Do you really want to leave this page?');
    // Returning true navigates away; returning false cancels the navigation.
  }
  return true; 
};