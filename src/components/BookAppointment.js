import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import doctorsData from '../data/Doctors';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctorsData.find((d) => d.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    hour: '1',
    minute: '00',
    meridian: 'AM',
    reason: ''
  });
  const [success, setSuccess] = useState(false);
  const [remainingSlots, setRemainingSlots] = useState(6);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (doctor?.availability === 'Fully Booked' || doctor?.availability === 'On Leave') {
      alert('This doctor is not available for appointments.');
      navigate(`/doctor/${doctor.id}`);
    }
  }, [doctor, navigate]);

  if (!doctor) return <h3 className="text-center mt-5">Doctor not found</h3>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    if (name === 'date') {
      const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
      const blockedSlots = JSON.parse(localStorage.getItem('blockedSlots')) || {};

      const doctorAppointments = appointments[doctor.id] || [];
      const blockedForDoctor = blockedSlots[doctor.id] || [];

      const bookedForDay = new Set([
        ...doctorAppointments.filter(app => app.date === value).map(app => app.time),
        ...blockedForDoctor.filter(slot => slot.startsWith(value)).map(slot => slot.split('-')[1])
      ]);

      setBookedSlots([...bookedForDay]);
      setRemainingSlots(6 - bookedForDay.size);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointmentDate = formData.date;
    const appointmentTime = `${formData.hour}:${formData.minute} ${formData.meridian}`;

    const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
    const doctorAppointments = appointments[doctor.id] || [];

    if (doctorAppointments.filter(app => app.date === appointmentDate).length >= 6) {
      alert('This doctor already has 6 appointments for that day.');
      return;
    }

    const blockedSlots = JSON.parse(localStorage.getItem('blockedSlots')) || {};
    const blockedForDoctor = blockedSlots[doctor.id] || [];
    const duplicate = doctorAppointments.some(app => app.date === appointmentDate && app.time === appointmentTime);
    const blocked = blockedForDoctor.includes(`${appointmentDate}-${appointmentTime}`);

    if (duplicate || blocked) {
      alert('This time slot is already booked or blocked for this doctor.');
      return;
    }

    const newAppointment = {
      name: formData.name,
      email: formData.email,
      date: appointmentDate,
      time: appointmentTime,
      reason: formData.reason
    };

    const updatedAppointments = {
      ...appointments,
      [doctor.id]: [...doctorAppointments, newAppointment]
    };

    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setSuccess(true);
    setFormData({ name: '', email: '', date: '', hour: '1', minute: '00', meridian: 'AM', reason: '' });
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '700px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Book Appointment with {doctor.name}</h3>
        <Link to={`/doctor/${doctor.id}`}>
          <Button variant="secondary" size="sm">← Back</Button>
        </Link>
      </div>
      {success && <Alert variant="success">Appointment booked successfully!</Alert>}
      <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', marginLeft: "20px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Patient Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            required
            onChange={handleChange}
          />
          {formData.date && (
            <>
              <span className={`badge ${remainingSlots <= 0 ? 'bg-danger' : 'bg-success'} mt-2`}>
                {remainingSlots <= 0 ? "No slots left" : `${remainingSlots} slots remaining`}
              </span>
              {bookedSlots.length > 0 && (
                <div className="mt-3">
                  <h6 className="mb-1 text-primary">Booked Slots on <b>{formData.date}</b></h6>
                  <small className="text-muted d-block mb-2">Please choose a time slot other than these:</small>
                  <div className="d-flex flex-wrap gap-2">
                    {bookedSlots.map((slot, index) => (
                      <span key={index} className="badge bg-danger">{slot}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <div className="d-flex flex-wrap gap-2">
            <Form.Select name="hour" value={formData.hour} onChange={handleChange}>
              {[...Array(12)].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </Form.Select>
            <Form.Select name="minute" value={formData.minute} onChange={handleChange}>
              <option value="00">00</option>
              <option value="30">30</option>
            </Form.Select>
            <Form.Select name="meridian" value={formData.meridian} onChange={handleChange}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </Form.Select>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Reason for Appointment</Form.Label>
          <Form.Control
            as="textarea"
            name="reason"
            rows={3}
            value={formData.reason}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" variant="success" className="w-100">
          Confirm Booking
        </Button>
      </Form>
    </Container>
  );
}

export default BookAppointment;
