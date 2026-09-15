# 🏥 HealthBridge Hospital — Healthcare Website

A modern, clean, responsive, and conversion-focused multi-specialty healthcare website built for the **SuuSri AI Web Development Internship Assignment**.

---

## 🎯 Project Objective
To build a trustworthy, accessible, and interactive healthcare landing page for **HealthBridge Hospital** with an appointment booking workflow, department filters, preventive health packages, patient testimonials, and full contact form integration with a Node.js Express backend.

---

## 🎨 Visual Identity & Design Direction
- **Design Direction**: Clean + Trustworthy
- **Color Palette**: Deep Medical Blue (`#0256b3`), Sky Accent (`#0096c7`), Light Cyan (`#e0f2fe`), Navy (`#0f172a`), Crisp White (`#ffffff`).
- **Typography**: Modern Google Fonts (`Plus Jakarta Sans` & `Poppins`).

---

## 🚀 Key Sections Included

1. **Top Emergency Header**: 24/7 Hotline (+91 80182 26416), Emergency email, hospital location, and Quick Appointment action.
2. **Main Navigation**: Sticky header with logo, section links, book appointment CTA, and mobile hamburger menu.
3. **Hero Section**: Headline, tagline, main appointment CTA, explore departments button, and animated counter stat cards (50+ Doctors, 25,000+ Patients, 15+ Years).
4. **About Us**: Hospital background, mission, NABH accreditation, and 15+ years experience badge.
5. **Specialized Departments (Interactive Filter)**: Category filter tabs (All, Cardiology, Pediatrics, Orthopedics, Neurology, Diagnostics) with smooth transitions and department consult triggers.
6. **Medical Specialists (Doctors)**: Profile cards with doctor credentials, experience badges, and direct doctor booking buttons.
7. **Health Packages**: Tiered health checkup plans (Basic ₹999, Comprehensive ₹2,999, Executive ₹4,999) with "Most Popular" ribbon.
8. **World-Class Facilities**: Highlights 24/7 Emergency & ICU, Advanced Pathology Lab, Modular OTs, and 24 Hours Pharmacy.
9. **Patient Testimonials**: Real patient review cards with star ratings and photos.
10. **Contact & Location**: Hospital location details, helpline numbers, and an inquiry form connected to `http://localhost:5000/api/contact`.
11. **Interactive Appointment Modal**: Popup appointment booking dialog with pre-filled department/doctor selection and form validation.
12. **Footer**: Quick links, department directory, emergency hotline, and copyright metadata.

---

## ⚡ Interactive Features & GSAP Animations

- **GSAP & ScrollTrigger Animations**:
  - Hero badge, title, subtitle, and CTA staggered entrances.
  - Scroll-triggered card reveals for departments, doctors, health packages, facilities, and testimonials.
- **Interactive Department Filter**: Dynamic tab filtering for medical specialties.
- **Appointment Modal Dialog**: Triggered from top header, hero CTA, department cards, and doctor cards with pre-selected options.
- **Live Counter Animation**: Animated number counters triggered on scroll for hospital statistics.
- **Scroll Progress Bar**: Real-time reading progress bar at the top of the browser window.
- **Back to Top Button**: Smooth scroll-to-top action appearing after scrolling 400px down.
- **Floating WhatsApp CTA**: Instant chat launcher for patient inquiries (+91 80182 26416).
- **Backend API Integration**: Contact form posts data to `POST /api/contact`.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Flexbox & CSS Grid), JavaScript (ES6+)
- **Animation Libraries**: GSAP 3.12, ScrollTrigger
- **Typography & Icons**: Google Fonts (`Plus Jakarta Sans`, `Poppins`), Emoji & SVG Icons
- **Backend**: Node.js, Express, MongoDB (Mongoose), CORS

---

## 📋 How to Run the Healthcare Project

1. **Open the Healthcare Website**:
   - Double-click [`index.html`](index.html) to open in any web browser, OR open using VS Code Live Server extension.

2. **Run the Backend (Optional for Contact Form API)**:
   ```bash
   cd ../backend
   npm install
   node server.js
   ```
   - The backend server runs on `http://localhost:5000`. Form submissions from the contact page will automatically post to `/api/contact`.

---

## 👨‍💻 Developer & Internship Information

- **Task**: 02 — Healthcare Website Track
- **Assignment**: SuuSri AI Web Development Task Assignment
- **Organization**: SuuSri AI (AI • Digital • Software • Automation • Growth)
