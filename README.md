# NirogGyan Healthcare Appointment Booking (Frontend Focused)

A responsive React-based web application for booking healthcare appointments.  
This project is built as part of the **NirogGyan Frontend Assignment** focusing primarily on **frontend development**.

---

## Features

- **Doctors Listing Page**
  - Displays all doctors with name, specialization, profile image, and availability status.
  - Search doctors by name.
  - Filter doctors by availability and specialization (dropdown filters).

- **Doctor Profile Page**
  - Shows detailed information about the doctor (hospital, specialization, working hours, location).
  - Displays all booked appointments in a neat column on the right side.
  - Allows marking an appointment as **Done** or **Delete**.
  - Even deleted appointments keep the time slot blocked (no double booking).

- **Appointment Booking**
  - Simple form to book an appointment with:
    - Patient name
    - Email
    - Date
    - Time (1 to 12 hours, 00/30 mins, AM/PM)
    - Reason for appointment
  - **Slot Management**:
    - Maximum 6 appointments per day.
    - Blocks slots permanently after done or deleted appointments.
    - Shows remaining slots for selected date.
  - Confirmation message shown upon booking.

- **UI & Responsiveness**
  - Built with **Bootstrap** for styling.
  - Mobile-friendly and responsive layout.

- **Mock Data**
  - Doctors data loaded from a static JSON file.
  - Appointments and blocked slots persisted using `localStorage`.

---

## Tech Stack

- **Frontend**: React (CRA, JavaScript, React Router DOM)
- **Styling**: Bootstrap 5
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Data Handling**: `localStorage` for persistence
- **Backend**: Mock JSON (no real backend)

---

## Folder Structure
- public/
  - images/
    - (static doctor images)
- src/
  - components/
    - DoctorsList.js
    - DoctorProfile.js
    - BookAppointment.js
    - Doctors.css
  - data/
    - Doctors.json
  - App.js
  - index.js



---

## How to Run Locally

1. Clone this repository:
   ```
   git clone https://github.com/Harsha572/niroggyan.git
   cd niroggyan-healthcare```
2. Install dependencies:
    - npm install
3. Start the development server:
    - npm start
4. Open the app in browser at http://localhost:3000.

## Improvements with More Time
  - **Authentication**: Implement login/registration for users and doctors.
  - **Backend API**: Move appointments and doctors data to Node.js/Express or Firebase.
  - **Advanced Scheduling**: Add weekly schedules for doctors and holiday management.
  - **Unit Testing**: Add Jest and React Testing Library tests.
  - **UI Enhancements**: Use Tailwind CSS or Material-UI for a more modern look.

## Challenges Faced and Solutions
  - **Challenge**: Managing appointments without a real backend.
    - Solution: Used localStorage to persist data across reloads.
  - **Challenge**: Blocking already deleted time slots.
    - Solution: Implemented a blockedSlots storage to keep track of permanently blocked slots.
  - **Challenge**: Responsive design for time selectors and appointment list.
    - Solution: Used Bootstrap grid system and flex utilities.

## Status
  - This project is still under development.
  - It will be linked to a backend API and upgraded to a full-stack application with enhanced responsiveness and advanced features.
