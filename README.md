# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


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
   ```bash
   git clone https://github.com/Harsha572/niroggyan.git
   cd niroggyan-healthcare```

2. Install dependencies:
  npm install
  Start the development server:
    npm start
  Open the app in browser at http://localhost:3000.


## Improvements with More Time
  - **Authentication**:
    - Implement login/registration for users and doctors.
  - **Backend API**:
    - Move appointments and doctors data to Node.js/Express or Firebase.
  - **Advanced Scheduling**:
    - Add weekly schedules for doctors and holiday management.
  - **Unit Testing**:
    - Add Jest and React Testing Library tests.
  - **UI Enhancements**:
    - Use Tailwind CSS or Material-UI for a more modern look.

## Challenges Faced and Solutions
  - **Challenge**: Managing appointments without a real backend.
    - Solution: Used localStorage to persist data across reloads.
  - **Challenge**: Blocking already deleted time slots.
    - Solution: Implemented a blockedSlots storage to keep track of permanently blocked slots.
  - **Challenge**: Responsive design for time selectors and appointment list.
    - Solution: Used Bootstrap grid system and flex utilities.

## License
- This project is for educational and assignment purposes only.