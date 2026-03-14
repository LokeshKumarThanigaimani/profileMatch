import { Injectable } from '@angular/core';

export interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  image: string;
  bio: string;
  height?: string;
  education?: string;
  profession?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly STORAGE_KEY = 'profiles';

  constructor() {
    this.initializeProfiles();
  }

  private initializeProfiles(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const defaultProfiles: Profile[] = [
        {
          id: 1,
          name: 'Pragati',
          age: 27,
          location: 'Chennai, Tamil Nadu',
          image: 'https://randomuser.me/api/portraits/women/1.jpg',
          bio: 'Software Engineer | Love traveling and reading',
          height: '5 ft 5 in',
          education: 'MBBS',
          profession: 'Doctor, Poosam, Hindu - Kayastha'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          age: 25,
          location: 'Bangalore, Karnataka',
          image: 'https://randomuser.me/api/portraits/women/2.jpg',
          bio: 'Product Manager | Fitness enthusiast',
          height: '5 ft 4 in',
          education: 'B.Tech',
          profession: 'Software Engineer, Hindu - Brahmin'
        },
        {
          id: 3,
          name: 'Anjali Reddy',
          age: 26,
          location: 'Hyderabad, Telangana',
          image: 'https://randomuser.me/api/portraits/women/3.jpg',
          bio: 'Doctor | Classical dancer',
          height: '5 ft 6 in',
          education: 'MBBS',
          profession: 'Doctor, Hindu - Reddy'
        },
        {
          id: 4,
          name: 'Divya Iyer',
          age: 24,
          location: 'Coimbatore, Tamil Nadu',
          image: 'https://randomuser.me/api/portraits/women/5.jpg',
          bio: 'Teacher | Music lover',
          height: '5 ft 3 in',
          education: 'M.A.',
          profession: 'Teacher, Hindu - Iyer'
        },
        {
          id: 5,
          name: 'Sneha Nair',
          age: 27,
          location: 'Kochi, Kerala',
          image: 'https://randomuser.me/api/portraits/women/7.jpg',
          bio: 'Marketing Manager | Foodie',
          height: '5 ft 5 in',
          education: 'MBA',
          profession: 'Marketing Manager, Hindu - Nair'
        },
        {
          id: 6,
          name: 'Meera Patel',
          age: 28,
          location: 'Mumbai, Maharashtra',
          image: 'https://randomuser.me/api/portraits/women/8.jpg',
          bio: 'Entrepreneur | Love adventure sports',
          height: '5 ft 7 in',
          education: 'B.E.',
          profession: 'Business Owner, Hindu - Patel'
        },
        {
          id: 7,
          name: 'Kavya Menon',
          age: 26,
          location: 'Pune, Maharashtra',
          image: 'https://randomuser.me/api/portraits/women/9.jpg',
          bio: 'Data Scientist | Chess player',
          height: '5 ft 4 in',
          education: 'M.Tech',
          profession: 'Data Scientist, Hindu - Menon'
        },
        {
          id: 8,
          name: 'Riya Singh',
          age: 25,
          location: 'Delhi, NCR',
          image: 'https://randomuser.me/api/portraits/women/10.jpg',
          bio: 'Architect | Photography enthusiast',
          height: '5 ft 6 in',
          education: 'B.Arch',
          profession: 'Architect, Hindu - Rajput'
        }
      ];
      this.saveProfiles(defaultProfiles);
    }
  }

  getProfiles(): Profile[] {
    const profiles = localStorage.getItem(this.STORAGE_KEY);
    return profiles ? JSON.parse(profiles) : [];
  }

  getProfileById(id: number): Profile | undefined {
    const profiles = this.getProfiles();
    return profiles.find(p => p.id === id);
  }

  saveProfiles(profiles: Profile[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
  }

  addProfile(profile: Profile): void {
    const profiles = this.getProfiles();
    profiles.push(profile);
    this.saveProfiles(profiles);
  }

  updateProfile(id: number, updatedProfile: Partial<Profile>): void {
    const profiles = this.getProfiles();
    const index = profiles.findIndex(p => p.id === id);
    if (index !== -1) {
      profiles[index] = { ...profiles[index], ...updatedProfile };
      this.saveProfiles(profiles);
    }
  }

  deleteProfile(id: number): void {
    const profiles = this.getProfiles().filter(p => p.id !== id);
    this.saveProfiles(profiles);
  }
}
