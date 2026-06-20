import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root' // Singleton: Same instance shared across the entire app
})

export class DataShareService {

  // Holds your reactive object state dictionary
  sharedData = signal<{ userId: number; name: string }>({ userId: 0, name: '' });

  updateSharedData(newData: { userId: number; name: string }) {
    this.sharedData.set(newData);
  }
  
}