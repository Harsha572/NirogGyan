import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import doctorsData from '../data/Doctors';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import './Doctors.css';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    setDoctors(doctorsData);
  }, []);

  const filteredDoctors = doctors.filter((d) => {
    const matchesName = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? d.availability === statusFilter : true;
    const matchesDepartment = departmentFilter ? d.specialization === departmentFilter : true;
    return matchesName && matchesStatus && matchesDepartment;
  });

  const uniqueDepartments = [...new Set(doctors.map((d) => d.specialization))];

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Doctor List</h2>

      {/* Filters Row */}
      <Row className="mb-4 g-2 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col xs={6} md={3} lg={4}>
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="Available Today">Available Today</option>
            <option value="Fully Booked">Fully Booked</option>
            <option value="On Leave">On Leave</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={3} lg={4}>
          <Form.Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
            <option value="">All Departments</option>
            {uniqueDepartments.map((dep, idx) => (
              <option key={idx} value={dep}>{dep}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Doctors List */}
      <Row>
        {filteredDoctors.length === 0 ? (
          <p className="text-center">No doctors found.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <Col xs={12} sm={6} lg={4} key={doctor.id} className="mb-4">
              <Card className="doctor-card p-3 h-100 d-flex flex-column flex-md-row align-items-center">
                <Card.Img
                  src={doctor.image}
                  className="img-fluid mb-3 mb-md-0"
                  style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "12px" }}
                />
                <Card.Body className="text-center text-md-start">
                  <Card.Title>{doctor.name}</Card.Title>
                  <Card.Text>{doctor.specialization}</Card.Text>
                  <p><b>Status:</b> {doctor.availability}</p>
                  <Link to={`/doctor/${doctor.id}`}>
                    <Button variant="primary" className="w-100">View Profile</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default DoctorsList;
