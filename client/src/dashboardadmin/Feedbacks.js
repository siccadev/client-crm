import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Feedbacks.css';

function Feedbacks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:3001/feedback')
      .then((res) => {
        console.log('API response:', res.data);
        setData(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => console.error('API error:', err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/feedback/${id}`)
      .then((response) => {
        console.log('Delete response:', response.data);
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => console.error('Delete error:', err));
  };

  return (
    <Container>
      <h1>Feedbacks</h1>
      <Row>
        {data.length > 0 ? (
          data.map((e) => (
            <Col lg={6} md={6} key={e.id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  {/* <Card.Title>{e.username}</Card.Title> */}
                  <Card.Text>{e.feedback}</Card.Text>
                  <Button variant="danger" onClick={() => handleDelete(e.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No feedback available</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Feedbacks;
