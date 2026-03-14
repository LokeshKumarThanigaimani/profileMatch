# 💑 Profile Match App - Matrimony Swipe Application

A modern, responsive matrimony profile matching application built with **Angular 20** and **Ionic 8**, featuring Tinder-like swipe functionality with a professional matrimony UI design.

![Angular](https://img.shields.io/badge/Angular-20.3.0-red)
![Ionic](https://img.shields.io/badge/Ionic-8.8.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)

## 🎯 Project Overview

This application was developed as part of a coding assessment for **TVS Matrimony**. It implements a complete profile matching system with swipe gestures, detailed profile views, and localStorage persistence, following a professional matrimony app design pattern.

## ✨ Features

### Main Features
- 🔄 **Swipe Functionality** - Smooth touch-based swipe gestures for profile navigation
- 👤 **Detailed Profile View** - Comprehensive profile information with sections
- 💚 **Interest Actions** - Express interest, reject, or shortlist profiles
- 💾 **LocalStorage** - Persistent data storage without backend
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- ⚡ **Ionic Components** - Built entirely with Ionic UI components
- 🎨 **Matrimony UI** - Professional matrimony-themed design

### UI Components
- **Header with Search** - Search bar and notification icons
- **Tabs Section** - Pending, Accepted, Shortlisted tabs
- **Profile Cards** - Large profile images with online status
- **Detailed Information** - Location, height, education, profession
- **Action Buttons** - Reject (✗), Shortlist (★), Accept (✓)
- **Profile Details Page** - Complete profile with multiple sections

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```bash
# Navigate to project directory
cd ProfileMatchApp

# Install dependencies (already done)
npm install

# Start development server
ng serve

# Open browser
Navigate to http://localhost:4200/
```

## 🌐 Application URLs

Once the dev server is running at `http://localhost:4200`, use these URLs:

| Page | URL | Description |
|------|-----|-------------|
| **Home (Default)** | [http://localhost:4200/](http://localhost:4200/) | Redirects to Swipe page |
| **Swipe Profiles** | [http://localhost:4200/swipe](http://localhost:4200/swipe) | Main swipe screen to browse profiles |
| **View Profile** | [http://localhost:4200/view-profile/:id](http://localhost:4200/view-profile/1) | Detailed profile view (replace `:id` with profile ID, e.g. `1`) |
| **Matches** | [http://localhost:4200/matches](http://localhost:4200/matches) | View matched profiles |

> **Tip:** The default URL `/` automatically redirects to `/swipe`, so just opening `http://localhost:4200/` will take you to the swipe screen.

## 📱 How to Use

### Swipe Screen
- **View Profile**: Tap on the profile image or chevron icon
- **Swipe Right** or click **✓ (green)** → Express Interest
- **Swipe Left** or click **✗ (red)** → Not Interested  
- **Swipe Up** or click **★ (yellow)** → Add to Shortlist
- **Search**: Use the search bar to find profiles
- **Tabs**: Switch between Pending, Accepted, and Shortlisted

### Profile Detail Screen
- View complete profile information organized in sections:
  - Basic Information (Age, Height, Location)
  - Education & Career
  - About/Bio
  - Family Details
  - Contact Preferences
- **Express Interest** button to show interest
- **Not Interested** button to reject
- **Back button** to return to swipe screen

## 🎨 UI Design

The application follows a professional matrimony app design with:

### Swipe Screen
- Header with app title, notifications, and settings icons
- Search bar for profile search
- Segmented tabs (Pending, Accepted, Shortlisted)
- Large profile card with:
  - Profile image (400px height)
  - Online status badge
  - Name and age
  - Location, height, education, profession icons
  - Bio section
  - View profile button
- Footer with three action buttons

### Profile Detail Screen
- Full-width profile image with online status
- Profile header card with verified badge
- Organized information sections:
  - Basic Information
  - Education & Career
  - About
  - Family Details
  - Contact Preferences
- Footer with action buttons

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 20.3.0 | Frontend Framework |
| Ionic | 8.8.1 | UI Components |
| TypeScript | 5.9.2 | Programming Language |
| HammerJS | 2.0.8 | Touch Gestures |
| SCSS | - | Styling |

## 📂 Project Structure

```
ProfileMatchApp/
├── src/
│   ├── app/
│   │   ├── assets/                          # Reference images
│   │   │   ├── Ionic-Search-Swipe.png
│   │   │   ├── Ionic-View-Profile.png
│   │   │   └── Swipe-screen.png
│   │   ├── pages/
│   │   │   ├── matches/
│   │   │   │   ├── matches.html             # Matches page UI
│   │   │   │   ├── matches.scss             # Matches page styles
│   │   │   │   ├── matches.spec.ts          # Matches page tests
│   │   │   │   └── matches.ts               # Matches page logic
│   │   │   ├── profile/
│   │   │   │   ├── profile.html             # Profile detail UI
│   │   │   │   ├── profile.scss             # Profile detail styles
│   │   │   │   ├── profile.spec.ts          # Profile detail tests
│   │   │   │   └── profile.ts               # Profile detail logic
│   │   │   └── swipe/
│   │   │       ├── swipe.html               # Swipe screen UI
│   │   │       ├── swipe.scss               # Swipe screen styles
│   │   │       └── swipe.ts                 # Swipe screen logic
│   │   ├── services/
│   │   │   └── profile.service.ts           # Profile data management
│   │   ├── app.config.ts                    # App configuration
│   │   ├── app.html                         # Root app template
│   │   ├── app.routes.ts                    # Routing configuration
│   │   ├── app.scss                         # App-level styles
│   │   ├── app.spec.ts                      # App tests
│   │   └── app.ts                           # Root app component
│   ├── index.html                           # Main HTML entry
│   ├── main.ts                              # App bootstrap
│   └── styles.scss                          # Global Ionic styles
├── public/                                  # Static assets
├── .editorconfig                            # Editor settings
├── .gitignore                               # Git ignore rules
├── angular.json                             # Angular CLI config
├── ionic.config.json                        # Ionic config
├── package.json                             # Dependencies
├── README.md                                # Documentation
├── START_APP.bat                            # Quick start script
├── tsconfig.json                            # TypeScript config
├── tsconfig.app.json                        # App TS config
└── tsconfig.spec.json                       # Test TS config
```

## 💾 Data Management

### Profile Structure
```typescript
interface Profile {
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
```

### Sample Data
8 diverse Indian matrimony profiles included:
- Priya Sharma - Software Engineer, Chennai
- Rahul Kumar - Product Manager, Bangalore
- Anjali Reddy - Doctor, Hyderabad
- Vikram Singh - Entrepreneur, Mumbai
- Divya Iyer - Teacher, Coimbatore
- Arjun Patel - Architect, Ahmedabad
- Sneha Nair - Marketing Manager, Kochi
- Karthik Menon - Data Scientist, Pune

### LocalStorage
- All profiles stored in browser's localStorage
- Key: `'profiles'`
- Managed through `ProfileService`
- Data persists across browser sessions

## ✅ Requirements Completed

- [x] Swipe through profiles with touch gestures
- [x] Navigate to profile detail on photo/button tap
- [x] Right swipe/tick → "✓ Interested" toast → Next profile
- [x] Left swipe/cross → "✗ Not Interested" toast → Next profile
- [x] Swipe up/star → "★ Shortlisted" toast → Next profile
- [x] Profile data stored in localStorage (not hardcoded)
- [x] Only Ionic components used (no plain HTML tags)
- [x] Responsive design for mobile and desktop
- [x] Professional matrimony UI design

## 🧪 Testing

```bash
# Run unit tests
ng test

# Build for production
ng build --configuration production

# Build output location
dist/ProfileMatchApp/
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px - Optimized touch interface
- **Tablet**: 768px - 1024px - Adaptive layout
- **Desktop**: > 1024px - Full-width experience

## 🎨 Customization

### Theme Colors
Edit `src/styles.scss`:
```scss
:root {
  --ion-color-primary: #3880ff;
  --ion-color-success: #2dd36f;
  --ion-color-warning: #ffc409;
  --ion-color-danger: #eb445a;
}
```

### Add New Profiles
Edit `src/app/services/profile.service.ts` and add to `defaultProfiles` array.

## 📚 Documentation

- **[PROJECT_README.md](PROJECT_README.md)** - Comprehensive documentation
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Quick setup guide
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Implementation details
- **[SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md)** - Submission checklist

## 🐛 Troubleshooting

### App doesn't start
```bash
npm install
ng serve --open
```

### Swipe not working
- Ensure HammerJS is installed
- Check browser console for errors
- Try on a touch-enabled device

### Profiles not loading
- Clear browser cache and localStorage
- Refresh the page

## 🔮 Future Enhancements

- Backend API integration
- User authentication
- Real-time chat
- Advanced search filters
- Profile editing
- Image upload
- Push notifications
- Match algorithm

## 👨💍 Developer

**Lokesh Kumar**
- Email: lokeshkumar981121@gmail.com
- Project: Matrimony Coding Assessment
- Date: March 2026

## 📄 License

This project is created for educational and assessment purposes.

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Ionic Team for beautiful UI components
- TVS Matrimony for the opportunity

---

## 📞 Support

For questions or issues:
- **Email**: lokeshkumar981121@gmail.com

---

**Made with ❤️ for Matrimony**

⭐ Star this repo if you find it helpful!
