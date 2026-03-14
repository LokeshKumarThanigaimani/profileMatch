import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { IonHeader, IonText, IonTitle, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonCard, IonImg, IonCardContent, IonButton, IonButtons, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.html',
  styleUrls: ['./matches.scss'],
  imports: [CommonModule, IonHeader, IonTitle, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonText, IonCard, IonImg, IonCardContent, IonButton, IonButtons, IonIcon],
})
export class MatchesPage implements OnInit {

  profiles: any[] = [];
  currentIndex = 0;
  currentProfile: any;

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private gestureCtrl: GestureController
  ) {}

  ngOnInit() {

    localStorage.removeItem('profiles');

    const data = localStorage.getItem('profiles');

    if (data) {
      this.profiles = JSON.parse(data);
    } else {

      const dummyProfiles = [
        {
          id: 1,
          name: 'Priyanka',
          age: 27,
          height: '5 ft 2 in',
          caste: 'Tamil, Nair',
          degree: 'MBBS',
          job: 'Doctor',
          city: 'Chennai',
          image: 'https://i.pravatar.cc/400?img=1'
        },
        {
          id: 2,
          name: 'Pragati',
          age: 25,
          height: '5 ft 5 in',
          caste: 'Kayastha',
          degree: 'MBA',
          job: 'Manager',
          city: 'Mumbai',
          image: 'https://i.pravatar.cc/400?img=5'
        },
        {
          id: 3,
          name: 'Ananya',
          age: 26,
          height: '5 ft 4 in',
          caste: 'Brahmin',
          degree: 'B.Tech',
          job: 'Software Engineer',
          city: 'Bangalore',
          image: 'https://i.pravatar.cc/400?img=9'
        },
        {
          id: 4,
          name: 'Divya',
          age: 28,
          height: '5 ft 3 in',
          caste: 'Reddy',
          degree: 'CA',
          job: 'Accountant',
          city: 'Hyderabad',
          image: 'https://i.pravatar.cc/400?img=10'
        },
        {
          id: 5,
          name: 'Sneha',
          age: 24,
          height: '5 ft 6 in',
          caste: 'Nair',
          degree: 'BBA',
          job: 'HR Executive',
          city: 'Kochi',
          image: 'https://i.pravatar.cc/400?img=16'
        }
      ];

      localStorage.setItem('profiles', JSON.stringify(dummyProfiles));
      this.profiles = dummyProfiles;
    }

    this.currentProfile = this.profiles[this.currentIndex];
    this.setupSwipeGesture();
    this.setupMouseDrag();
  }

  setupMouseDrag() {
    setTimeout(() => {
      const cardsContainer = document.querySelector('.cards') as HTMLElement;
      if (cardsContainer) {
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        cardsContainer.addEventListener('mousedown', (e) => {
          isDown = true;
          cardsContainer.style.cursor = 'grabbing';
          startX = e.pageX - cardsContainer.offsetLeft;
          scrollLeft = cardsContainer.scrollLeft;
        });

        cardsContainer.addEventListener('mouseleave', () => {
          isDown = false;
          cardsContainer.style.cursor = 'grab';
        });

        cardsContainer.addEventListener('mouseup', () => {
          isDown = false;
          cardsContainer.style.cursor = 'grab';
        });

        cardsContainer.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - cardsContainer.offsetLeft;
          const walk = (x - startX) * 2;
          cardsContainer.scrollLeft = scrollLeft - walk;
        });
      }
    }, 100);
  }

  setupSwipeGesture() {
    setTimeout(() => {
      const card = document.querySelector('.profile-card:first-child');
      if (card) {
        const gesture = this.gestureCtrl.create({
          el: card as HTMLElement,
          gestureName: 'swipe',
          onMove: (ev) => {
            (card as HTMLElement).style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 20}deg)`;
          },
          onEnd: (ev) => {
            if (ev.deltaX > 150) {
              this.interested();
            } else if (ev.deltaX < -150) {
              this.notInterested();
            }
            (card as HTMLElement).style.transform = '';
          }
        });
        gesture.enable();
      }
    }, 100);
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: msg === 'Interested' ? 'success' : 'dark',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });

    toast.present();
  }

  nextProfile() {

    this.currentIndex++;

    if (this.currentIndex >= this.profiles.length) {
      this.currentIndex = 0;
    }

    this.currentProfile = this.profiles[this.currentIndex];
  }

  getVisibleProfiles() {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      const index = (this.currentIndex + i) % this.profiles.length;
      visible.push(this.profiles[index]);
    }
    return visible;
  }

  interested() {
    this.showToast("Interested");
    this.nextProfile();
    setTimeout(() => this.setupSwipeGesture(), 200);
  }

  notInterested() {
    this.showToast("Not Interested");
    this.nextProfile();
    setTimeout(() => this.setupSwipeGesture(), 200);
  }

  shortlist() {
    this.showToast("Shortlisted");
    this.nextProfile();
  }

  viewProfile(profile: any) {
    localStorage.setItem('selectedProfile', JSON.stringify(profile));
    this.navCtrl.navigateForward(`/view-profile/${profile.id}`);
  }

  nextCard() {
    if (this.currentIndex < this.profiles.length - 1) {
      this.currentIndex++;
      this.currentProfile = this.profiles[this.currentIndex];
      this.scrollToCurrentCard();
    }
  }

  prevCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentProfile = this.profiles[this.currentIndex];
      this.scrollToCurrentCard();
    }
  }

  scrollToCurrentCard() {
    setTimeout(() => {
      const cardsContainer = document.querySelector('.cards') as HTMLElement;
      const cardWidth = 260;
      if (cardsContainer) {
        cardsContainer.scrollTo({
          left: this.currentIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }, 0);
  }

}