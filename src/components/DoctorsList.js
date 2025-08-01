import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import doctorsData from '../data/Doctors';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import './Doctors.css';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    setDoctors(doctorsData);
  }, []);

  const filteredDoctors = doctors.filter((d) => {
    const matchesName = d.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesStatus = statusFilter ? d.availability === statusFilter : true;
    const matchesDepartment = departmentFilter ? d.specialization === departmentFilter : true;
    return matchesName && matchesStatus && matchesDepartment;
  });

  const statuses = [...new Set(doctors.map((d) => d.availability))];
  const departments = [...new Set(doctors.map((d) => d.specialization))];

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Doctor List</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Select Status</option>
            {statuses.map((status, idx) => (
              <option key={idx} value={status}>{status}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {filteredDoctors.map((doctor) => (
          <Col md={4} key={doctor.id} className="mb-4">
            <Card className="doctor-card d-flex flex-row align-items-center shadow-sm" style={{borderStyle: "none"}}>
              <Card.Img
                src={doctor.image}
                style={{ width: "200px", height: "200px", borderRadius: "30px", objectFit: "cover" }}
                className="p-2"
              />
              <Card.Body>
                <Card.Title>{doctor.name}</Card.Title>
                <Card.Text>{doctor.specialization}</Card.Text>
                <p><b>Status:</b> {doctor.availability}</p>
                <Link to={`/doctor/${doctor.id}`}>
                  <Button variant="primary">View Profile</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DoctorsList;
