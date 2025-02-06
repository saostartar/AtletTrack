// src/pages/koordinator/PesanAtlet.js
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup, Badge, Spinner } from 'react-bootstrap';
import api from '../../services/api';

const PesanAtlet = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [athletes, setAthletes] = useState([]);
  const [selectedAthleteId, setSelectedAthleteId] = useState('');
  const [newConversationMessage, setNewConversationMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
    fetchAthletes();
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const response = await api.get('/koordinator/conversations');
      setConversations(response.data);
      setLoading(false);
    } catch (err) {
      setError('Gagal memuat percakapan');
      setLoading(false);
    }
  };

  const fetchAthletes = async () => {
    try {
      const response = await api.get('/koordinator/atlet');
      setAthletes(response.data);
    } catch (err) {
      setError('Gagal memuat daftar atlet');
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await api.get(`/koordinator/conversations/${conversationId}/messages`);
      setMessages(response.data);
    } catch (err) {
      setError('Gagal memuat pesan');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
  
    try {
      await api.post('/koordinator/messages', {
        isi: messageInput,
        recipientId: selectedConversation.atletId,
        conversationId: selectedConversation.id
      });
      setMessageInput('');
      fetchMessages(selectedConversation.id);
      fetchConversations();
    } catch (err) {
      setError('Gagal mengirim pesan');
    }
  };

  const handleStartNewConversation = async (e) => {
    e.preventDefault();
    if (!selectedAthleteId) {
      setError('Silakan pilih atlet terlebih dahulu');
      return;
    }
    if (!newConversationMessage.trim()) {
      setError('Silakan masukkan pesan');
      return;
    }
  
    try {
      await api.post('/koordinator/messages', {
        isi: newConversationMessage,
        recipientId: selectedAthleteId
      });
      setNewConversationMessage('');
      setSelectedAthleteId('');
      fetchConversations();
      setError('');
    } catch (err) {
      setError('Gagal memulai percakapan');
    }
  };

  const renderMessage = (message) => (
    <div key={message.id} className={`d-flex ${message.senderRole === 'koordinator' ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
      {message.senderRole !== 'koordinator' && (
        <div className="d-flex align-items-center me-2">
          <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" 
               style={{ width: '32px', height: '32px' }}>
            <small className="text-primary fw-bold">{selectedConversation?.Atlet?.nama[0]}</small>
          </div>
        </div>
      )}
      <div className={`d-flex flex-column ${message.senderRole === 'koordinator' ? 'align-items-end' : 'align-items-start'}`}>
        <div className={`px-3 py-2 rounded-3 ${
          message.senderRole === 'koordinator' 
            ? 'bg-primary text-white' 
            : 'bg-light border'
        }`}>
          <p className="mb-1">{message.isi}</p>
          <small className={`${message.senderRole === 'koordinator' ? 'text-white-50' : 'text-muted'}`}>
            {new Date(message.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            {message.senderRole === 'koordinator' && (
              <span className="ms-2">
                <i className={`bi bi-${message.status === 'read' ? 'check-all' : 'check'}`}></i>
              </span>
            )}
          </small>
        </div>
      </div>
    </div>
  );

  return (
    <Container fluid className="py-4">
      <Row className="g-4">
        <Col md={4}>
          <div className="d-flex flex-column gap-3">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-primary bg-gradient text-white py-3">
                <h5 className="mb-0">
                  <i className="bi bi-chat-dots me-2"></i>
                  Percakapan
                </h5>
              </Card.Header>
              <ListGroup variant="flush">
                {loading ? (
                  <div className="text-center p-4">
                    <Spinner animation="border" variant="primary" size="sm" />
                  </div>
                ) : (
                  conversations.map(conv => (
                    <ListGroup.Item
                      key={conv.id}
                      action
                      active={selectedConversation?.id === conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className="d-flex align-items-center py-3 border-start border-5 border-transparent"
                    >
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                           style={{ width: '45px', height: '45px' }}>
                        <span className="text-primary fw-bold">{conv.Atlet.nama[0]}</span>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{conv.Atlet.nama}</h6>
                        <small className="text-muted">Klik untuk melihat percakapan</small>
                      </div>
                      {conv.unreadCount > 0 && (
                        <Badge bg="danger" pill className="ms-2">{conv.unreadCount}</Badge>
                      )}
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-light py-3">
                <h5 className="mb-0">
                  <i className="bi bi-plus-circle me-2"></i>
                  Percakapan Baru
                </h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleStartNewConversation}>
                  <Form.Group className="mb-3">
                    <Form.Label>Pilih Atlet</Form.Label>
                    <Form.Select 
                      className="mb-3"
                      value={selectedAthleteId}
                      onChange={(e) => setSelectedAthleteId(e.target.value)}
                      required
                    >
                      <option value="">Pilih atlet...</option>
                      {athletes.map(athlete => (
                        <option key={athlete.id} value={athlete.id}>
                          {athlete.nama}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Pesan</Form.Label>
                    <Form.Control
                      type="text"
                      value={newConversationMessage}
                      onChange={(e) => setNewConversationMessage(e.target.value)}
                      placeholder="Ketik pesan..."
                      className="rounded-pill"
                      required
                    />
                  </Form.Group>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-100 rounded-pill"
                  >
                    Mulai Percakapan
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
        
        <Col md={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white py-3 border-bottom">
              {selectedConversation ? (
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '45px', height: '45px' }}>
                    <span className="text-primary fw-bold">{selectedConversation.Atlet.nama[0]}</span>
                  </div>
                  <h5 className="mb-0">{selectedConversation.Atlet.nama}</h5>
                </div>
              ) : (
                <h5 className="mb-0">Pilih percakapan</h5>
              )}
            </Card.Header>
            <Card.Body className="bg-light bg-opacity-25" style={{ height: '60vh', overflowY: 'auto' }}>
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')} className="m-3">
                  {error}
                </Alert>
              )}
              {selectedConversation ? (
                <div className="px-3">
                  {messages.map(renderMessage)}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                  <i className="bi bi-chat-dots display-1 mb-3"></i>
                  <p className="lead">Pilih percakapan untuk mulai berkirim pesan</p>
                </div>
              )}
            </Card.Body>
            {selectedConversation && (
              <Card.Footer className="bg-white border-top p-3">
                <Form onSubmit={handleSendMessage}>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Ketik pesan..."
                      className="rounded-pill border-0 bg-light"
                    />
                    <Button 
                      type="submit" 
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      variant="primary"
                      style={{ width: '38px', height: '38px' }}
                    >
                      <i className="bi bi-send"></i>
                    </Button>
                  </div>
                </Form>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PesanAtlet;