import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonIcon, IonButton
} from '@ionic/angular/standalone';
import { GestureController, Gesture } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircle, heartCircle, imagesOutline, starOutline, close, checkmark, arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.html',
  styleUrls: ['./swipe.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonCard, IonCardContent, IonIcon, IonButton
  ]
})
export class SwipePage implements OnInit, AfterViewInit {
  @ViewChild('cardRef', { read: ElementRef }) cardRef!: ElementRef;

  profiles: any[] = [];
  currentIndex = 0;
  toastMessage = '';
  toastVisible = false;
  toastType = '';
  private gesture!: Gesture;
  private swiping = false;

  constructor(
    private gestureCtrl: GestureController,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ checkmarkCircle, heartCircle, imagesOutline, starOutline, close, checkmark, arrowBack });
  }

  get currentProfile() {
    return this.profiles[this.currentIndex] || null;
  }

  get nextProfile() {
    return this.profiles[this.currentIndex + 1] || null;
  }

  ngOnInit() {
    this.loadProfiles();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('Setting up gesture after view init');
      this.setupGesture();
    }, 500);
  }

  loadProfiles() {
    const data = localStorage.getItem('profiles');
    if (data) {
      this.profiles = JSON.parse(data);
    } else {
      this.profiles = [
        { id: 1, name: 'Pragati', age: 27, height: '5 ft 5 in', degree: 'MBBS', job: 'Doctor', city: 'Poosam', caste: 'Hindu - Kayastha', location: 'Chennai, Tamil Nadu.', image: 'https://randomuser.me/api/portraits/women/1.jpg', imageCount: 15 },
        { id: 2, name: 'Priyanka', age: 27, height: '5 ft 2 in', degree: 'MBBS', job: 'Doctor', city: 'Chennai', caste: 'Tamil, Nair', location: '.', image: 'https://randomuser.me/api/portraits/women/2.jpg', imageCount: 12 },
        { id: 3, name: 'Ananya', age: 26, height: '5 ft 4 in', degree: 'B.Tech', job: 'Software Engineer', city: 'Bangalore', caste: 'Brahmin', location: 'Karnataka.', image: 'https://randomuser.me/api/portraits/women/3.jpg', imageCount: 18 },
        { id: 4, name: 'Divya', age: 24, height: '5 ft 3 in', degree: 'M.A.', job: 'Teacher', city: 'Coimbatore', caste: 'Hindu - Iyer', location: 'Tamil Nadu.', image: 'https://randomuser.me/api/portraits/women/5.jpg', imageCount: 10 },
        { id: 5, name: 'Sneha', age: 27, height: '5 ft 5 in', degree: 'MBA', job: 'Marketing Manager', city: 'Kochi', caste: 'Hindu - Nair', location: 'Kerala.', image: 'https://randomuser.me/api/portraits/women/7.jpg', imageCount: 14 },
        { id: 6, name: 'Meera', age: 28, height: '5 ft 7 in', degree: 'B.E.', job: 'Business Owner', city: 'Mumbai', caste: 'Hindu - Patel', location: 'Maharashtra.', image: 'https://randomuser.me/api/portraits/women/8.jpg', imageCount: 20 },
        { id: 7, name: 'Kavya', age: 26, height: '5 ft 4 in', degree: 'M.Tech', job: 'Data Scientist', city: 'Pune', caste: 'Hindu - Menon', location: 'Maharashtra.', image: 'https://randomuser.me/api/portraits/women/9.jpg', imageCount: 16 },
        { id: 8, name: 'Riya', age: 25, height: '5 ft 6 in', degree: 'B.Arch', job: 'Architect', city: 'Delhi', caste: 'Hindu - Rajput', location: 'NCR.', image: 'https://randomuser.me/api/portraits/women/10.jpg', imageCount: 11 }
      ];
      localStorage.setItem('profiles', JSON.stringify(this.profiles));
    }
  }

  setupGesture() {
    if (this.gesture) this.gesture.destroy();
    const el = this.cardRef?.nativeElement;
    if (!el) {
      console.log('Card element not found for gesture setup');
      setTimeout(() => this.setupGesture(), 100);
      return;
    }

    console.log('Setting up gesture on element:', el);
    
    // Add touch event listeners as backup
    let startY = 0;
    let startX = 0;
    
    el.addEventListener('touchstart', (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      console.log('Touch start:', { startX, startY });
    });
    
    el.addEventListener('touchend', (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const deltaY = endY - startY;
      const deltaX = endX - startX;
      
      console.log('Touch end:', { deltaX, deltaY });
      
      // Check for swipe up (negative deltaY)
      if (deltaY < -80 && Math.abs(deltaY) > Math.abs(deltaX)) {
        console.log('Touch swipe UP detected - shortlist');
        this.animateOut('up', () => this.shortlist());
        return;
      }
      
      // Check for horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 120) {
          console.log('Touch swipe RIGHT detected - accept');
          this.animateOut('right', () => this.accept());
        } else if (deltaX < -120) {
          console.log('Touch swipe LEFT detected - reject');
          this.animateOut('left', () => this.reject());
        }
      }
    });
    
    // Keep the original gesture as well
    this.gesture = this.gestureCtrl.create({
      el,
      gestureName: 'tinder-swipe',
      threshold: 10,
      onMove: (ev) => {
        el.style.transition = 'none';
        el.style.transform = `translateX(${ev.deltaX}px) translateY(${ev.deltaY}px) rotate(${ev.deltaX / 15}deg)`;
        el.style.opacity = `${Math.max(0.3, 1 - Math.abs(ev.deltaX) / 400)}`;
      },
      onEnd: (ev) => {
        console.log('Ionic gesture ended - deltaX:', ev.deltaX, 'deltaY:', ev.deltaY);
        
        // Check swipe up first (negative deltaY means up)
        if (ev.deltaY < -80) {
          console.log('Ionic gesture UP - shortlist');
          this.animateOut('up', () => this.shortlist());
        }
        // Then check horizontal swipes
        else if (ev.deltaX > 120) {
          console.log('Ionic gesture RIGHT - accept');
          this.animateOut('right', () => this.accept());
        } 
        else if (ev.deltaX < -120) {
          console.log('Ionic gesture LEFT - reject');
          this.animateOut('left', () => this.reject());
        } 
        // Reset if no significant swipe
        else {
          console.log('No significant swipe - resetting');
          el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
          el.style.transform = '';
          el.style.opacity = '1';
        }
      }
    });
    this.gesture.enable();
    console.log('Gesture enabled');
  }

  animateOut(direction: string, callback: () => void) {
    if (this.swiping) return;
    this.swiping = true;
    const el = this.cardRef?.nativeElement;
    if (!el) { callback(); this.swiping = false; return; }

    el.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    if (direction === 'right') el.style.transform = 'translateX(600px) rotate(30deg)';
    else if (direction === 'left') el.style.transform = 'translateX(-600px) rotate(-30deg)';
    else el.style.transform = 'translateY(-600px)';
    el.style.opacity = '0';

    setTimeout(() => {
      callback();
      this.swiping = false;
      this.cdr.detectChanges();
      const newEl = this.cardRef?.nativeElement;
      if (newEl) {
        newEl.style.transition = 'none';
        newEl.style.transform = '';
        newEl.style.opacity = '1';
      }
    }, 400);
  }

  showToast(msg: string, type: string) {
    this.toastMessage = msg;
    this.toastType = type;
    this.toastVisible = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.toastVisible = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  nextProfileAction() {
    if (this.currentIndex < this.profiles.length - 1) {
      this.currentIndex++;
      this.cdr.detectChanges();
      setTimeout(() => this.setupGesture(), 200);
    } else {
      this.currentIndex++;
      this.cdr.detectChanges();
    }
  }

  accept() {
    this.showToast('✓ Interested', 'success');
    this.nextProfileAction();
  }

  reject() {
    this.showToast('✗ Not Interested', 'danger');
    this.nextProfileAction();
  }

  shortlist() {
    this.showToast('★ Shortlisted', 'warning');
    this.nextProfileAction();
  }

  acceptBtn() {
    this.animateOut('right', () => this.accept());
  }

  rejectBtn() {
    this.animateOut('left', () => this.reject());
  }

  shortlistBtn() {
    this.animateOut('up', () => this.shortlist());
  }

  viewProfile() {
    if (this.currentProfile) {
      this.router.navigate(['/view-profile', this.currentProfile.id]);
    }
  }
}
