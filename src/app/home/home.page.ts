import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular';
import { ApiService } from '../api-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel],
})
export class HomePage implements OnInit {
  private apiService = inject(ApiService);
  public users: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.runGetCollectionTest();
  }

  runGetCollectionTest() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('GET All Users Response:', data);
      },
      error: (err) => console.error('GET All Error:', err)
    });
  }

  runGetSingleTest(id: number) {
    this.apiService.getUser(id).subscribe({
      next: (data) => console.log(`GET User ${id} Response:`, data),
      error: (err) => console.error('GET Single Error:', err)
    });
  }

  runPostTest() {
    const newUser = { name: 'Bruce Wayne', email: 'bruce@gotham.com' };
    this.apiService.createUser(newUser).subscribe({
      next: (res) => console.log('POST (Create) Response:', res),
      error: (err) => console.error('POST Error:', err)
    });
  }

  runPutTest(id: number) {
    // Requires ALL structural properties
    const fullReplacement = { name: 'Alice Peterson', email: 'alice_p@example.com', status: 'suspended' };
    this.apiService.replaceUser(id, fullReplacement).subscribe({
      next: (res) => console.log('PUT (Replace) Response:', res),
      error: (err) => console.error('PUT Error:', err)
    });
  }

  runPatchTest(id: number) {
    // Requires ONLY the updated property fields
    const partialData = { status: 'active' };
    this.apiService.patchUser(id, partialData).subscribe({
      next: (res) => console.log('PATCH (Modify) Response:', res),
      error: (err) => console.error('PATCH Error:', err)
    });
  }

  runDeleteTest(id: number) {
    this.apiService.deleteUser(id).subscribe({
      next: (res) => console.log('DELETE Response:', res),
      error: (err) => console.error('DELETE Error:', err)
    });
  }
}
