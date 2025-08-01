import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorsList from './components/DoctorsList';
import DoctorProfile from './components/DoctorProfile';
import BookAppointment from './components/BookAppointment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorsList />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/book/:id" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
