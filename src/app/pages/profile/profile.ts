import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonImg, IonCardContent, IonText } from "@ionic/angular/standalone";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonImg, IonCardContent, IonText],
})
export class ProfilePage implements OnInit {

  profile: any;

  ngOnInit() {

    const data = localStorage.getItem('selectedProfile');

    if (data) {
      this.profile = JSON.parse(data);
    }

  }

}