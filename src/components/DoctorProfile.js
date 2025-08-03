import { useParams, Link } from 'react-router-dom';
import doctorsData from '../data/Doctors';
import { Container, Card, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function DoctorProfile() {
  const { id } = useParams();
  const doctor = doctorsData.find((d) => d.id === parseInt(id));

  const [appointments, setAppointments] = useState({});
  const [blockedSlots, setBlockedSlots] = useState({});

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || {};
    const storedBlocked = JSON.parse(localStorage.getItem('blockedSlots')) || {};
    setAppointments(storedAppointments);
    setBlockedSlots(storedBlocked);
  }, []);

  if (!doctor) return <h3 className="text-center mt-5">Doctor not found</h3>;

  const doctorAppointments = (appointments[doctor.id] || []).sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA - dateB;
  });

  const handleDone = (index) => {
    const updated = { ...appointments };
    updated[doctor.id][index].status = 'done';

    const key = `${updated[doctor.id][index].date}-${updated[doctor.id][index].time}`;
    const updatedBlocked = { ...blockedSlots };
    if (!updatedBlocked[doctor.id]) updatedBlocked[doctor.id] = [];
    if (!updatedBlocked[doctor.id].includes(key)) updatedBlocked[doctor.id].push(key);

    localStorage.setItem('appointments', JSON.stringify(updated));
    localStorage.setItem('blockedSlots', JSON.stringify(updatedBlocked));
    setAppointments(updated);
    setBlockedSlots(updatedBlocked);
  };

  const handleDelete = (index) => {
    const updated = { ...appointments };
    const removed = updated[doctor.id][index];

    const key = `${removed.date}-${removed.time}`;
    const updatedBlocked = { ...blockedSlots };
    if (!updatedBlocked[doctor.id]) updatedBlocked[doctor.id] = [];
    if (!updatedBlocked[doctor.id].includes(key)) updatedBlocked[doctor.id].push(key);

    updated[doctor.id].splice(index, 1);

    localStorage.setItem('appointments', JSON.stringify(updated));
    localStorage.setItem('blockedSlots', JSON.stringify(updatedBlocked));
    setAppointments(updated);
    setBlockedSlots(updatedBlocked);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Doctor Profile</h3>
        <Link to="/">
          <Button variant="secondary" size="sm">← Back</Button>
        </Link>
      </div>
      <Row>
        <Col xs={12} md={8} className="mb-3">
          <Card className="border-0 shadow-sm">
            <Card.Img 
              src={doctor.image} 
              className="img-fluid rounded mx-auto mt-3"
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} 
            />
            <Card.Body>
              <Card.Title>{doctor.name}</Card.Title>
              <Card.Text><b>Specialization:</b> {doctor.specialization}</Card.Text>
              <Card.Text><b>Hospital:</b> {doctor.hospital}</Card.Text>
              <Card.Text><b>Address:</b> {doctor.location}</Card.Text>
              <Card.Text><b>Status:</b> {doctor.availability}</Card.Text>
              <Card.Text><b>Working Hours:</b> {doctor.schedule}</Card.Text>
              <Link to={`/book/${doctor.id}`}>
                <Button variant="primary" className="w-100">Book Appointment</Button>
              </Link>

            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <h5>Appointments</h5>
          {doctorAppointments.length === 0 ? (
            <p>No appointments yet.</p>
          ) : (
            <ListGroup>
              {doctorAppointments.map((app, idx) => (
                <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-start flex-wrap">
                  <div>
                    <b>{app.name}</b><br/>
                    {app.date}, {app.time}<br/>
                    Reason: {app.reason}<br/>
                    Status: {app.status || 'booked'}
                  </div>
                  <div className="d-flex flex-column gap-2 mt-2 mt-md-0">
                    {app.status !== 'done' && (
                      <Button size="sm" variant="success" onClick={() => handleDone(idx)}>Done</Button>
                    )}
                    <Button size="sm" variant="danger" onClick={() => handleDelete(idx)}>Delete</Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DoctorProfile;
