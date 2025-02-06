// src/pages/atlet/Communication.js
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  ListGroup,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
} from "react-bootstrap";
import api from "../../services/api";

const Communication = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isi, setIsi] = useState("");
  const [error, setError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [newConversationKoordinators, setNewConversationKoordinators] =
    useState([]);
  const [selectedKoordinatorForNewConv, setSelectedKoordinatorForNewConv] =
    useState("");
  const [isiNewConv, setIsiNewConv] = useState("");
  const [newConvError, setNewConvError] = useState("");
  const [sendingNewConv, setSendingNewConv] = useState(false);

  const messagesEndRef = useRef(null);

  // Initial fetch and polling
  useEffect(() => {
    fetchConversations();
    fetchKoordinators();
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const response = await api.get("/atlet/conversations"); 
      setConversations(response.data);
      setLoadingConversations(false);
    } catch (error) {
      setError("Gagal memuat percakapan");
      setLoadingConversations(false);
    }
  };

  // Fetch koordinators for new conversation
  const fetchKoordinators = async () => {
    try {
      const response = await api.get("/koordinator/list");
      setNewConversationKoordinators(response.data);
    } catch (error) {
      setError("Gagal memuat daftar koordinator");
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId) => {
    setLoadingMessages(true);
    try {
      const response = await api.get(
        `/atlet/conversations/${conversationId}/messages` // Updated path
      );
      setMessages(response.data);
      setLoadingMessages(false);
    } catch (error) {
      setMessageError("Gagal memuat pesan");
      setLoadingMessages(false);
    }
  };

  // Handle conversation selection
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation.id);
    setMessageError("");
  };

  // Send message in existing conversation
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!isi.trim()) {
      setMessageError("Pesan tidak boleh kosong");
      return;
    }

    setSendingMessage(true);
    try {
      await api.post("/atlet/messages", {
        isi,
        recipientId: selectedConversation.koordinatorId,
        conversationId: selectedConversation.id,
      });
      setIsi("");
      fetchMessages(selectedConversation.id);
      fetchConversations();
      setMessageError("");
    } catch (error) {
      setMessageError("Gagal mengirim pesan");
    } finally {
      setSendingMessage(false);
    }
  };

  // Start new conversation
  const handleStartNewConversation = async (e) => {
    e.preventDefault();
    if (!selectedKoordinatorForNewConv || !isiNewConv.trim()) {
      setNewConvError("Pilih koordinator dan masukkan pesan");
      return;
    }

    setSendingNewConv(true);
    try {
      await api.post("/atlet/messages", {
        isi: isiNewConv,
        recipientId: selectedKoordinatorForNewConv,
      });
      setIsiNewConv("");
      setSelectedKoordinatorForNewConv("");
      fetchConversations();
      setNewConvError("");
    } catch (error) {
      setNewConvError("Gagal memulai percakapan baru");
    } finally {
      setSendingNewConv(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Message component
  const renderMessage = (message) => (
    <div key={message.id} className={`d-flex ${message.senderRole === "atlet" ? "justify-content-end" : "justify-content-start"} mb-3`}>
      {message.senderRole !== "atlet" && (
        <div className="d-flex align-items-center me-2">
          <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" 
               style={{ width: "32px", height: "32px" }}>
            <small className="text-primary fw-bold">
              {selectedConversation?.Koordinator?.nama[0]}
            </small>
          </div>
        </div>
      )}
      <div className={`d-flex flex-column ${message.senderRole === "atlet" ? "align-items-end" : "align-items-start"}`}>
        <div className={`px-3 py-2 rounded-3 ${
          message.senderRole === "atlet" 
            ? "bg-primary text-white" 
            : "bg-light border"
        }`}>
          <p className="mb-1">{message.isi}</p>
          <small className={message.senderRole === "atlet" ? "text-white-50" : "text-muted"}>
            {new Date(message.createdAt).toLocaleString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "short",
            })}
            {message.senderRole === "atlet" && (
              <span className="ms-2">
                <i className={`bi bi-${message.status === "read" ? "check-all" : "check"}`}></i>
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
                {loadingConversations ? (
                  <div className="text-center p-4">
                    <Spinner animation="border" variant="primary" size="sm" />
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <ListGroup.Item
                      key={conv.id}
                      action
                      active={selectedConversation?.id === conv.id}
                      onClick={() => handleSelectConversation(conv)}
                      className="d-flex align-items-center py-3 border-start border-5 border-transparent"
                    >
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                           style={{ width: "45px", height: "45px" }}>
                        <span className="text-primary fw-bold">{conv.Koordinator.nama[0]}</span>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{conv.Koordinator.nama}</h6>
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
                  {newConvError && (
                    <Alert variant="danger" dismissible onClose={() => setNewConvError("")}>
                      {newConvError}
                    </Alert>
                  )}
                  <Form.Group className="mb-3">
                    <Form.Select
                      value={selectedKoordinatorForNewConv}
                      onChange={(e) => setSelectedKoordinatorForNewConv(e.target.value)}
                      className="rounded-pill"
                      required
                    >
                      <option value="">Pilih koordinator...</option>
                      {newConversationKoordinators.map((koordinator) => (
                        <option key={koordinator.id} value={koordinator.id}>
                          {koordinator.nama}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      value={isiNewConv}
                      onChange={(e) => setIsiNewConv(e.target.value)}
                      placeholder="Ketik pesan..."
                      className="rounded-pill"
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={sendingNewConv}
                    className="rounded-pill w-100"
                  >
                    {sendingNewConv ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>
                        Mulai Percakapan
                      </>
                    )}
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
                       style={{ width: "45px", height: "45px" }}>
                    <span className="text-primary fw-bold">{selectedConversation.Koordinator.nama[0]}</span>
                  </div>
                  <h5 className="mb-0">{selectedConversation.Koordinator.nama}</h5>
                </div>
              ) : (
                <h5 className="mb-0">Pilih percakapan</h5>
              )}
            </Card.Header>
            <Card.Body className="bg-light bg-opacity-25" style={{ height: "60vh", overflowY: "auto" }}>
              {messageError && (
                <Alert variant="danger" dismissible onClose={() => setMessageError("")} className="m-3">
                  {messageError}
                </Alert>
              )}
              {selectedConversation ? (
                <div className="px-3">
                  {loadingMessages ? (
                    <div className="text-center p-4">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <>
                      {messages.map(renderMessage)}
                      <div ref={messagesEndRef} />
                    </>
                  )}
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
                      value={isi}
                      onChange={(e) => setIsi(e.target.value)}
                      placeholder="Ketik pesan..."
                      disabled={sendingMessage}
                      className="rounded-pill border-0 bg-light"
                    />
                    <Button 
                      type="submit"
                      disabled={sendingMessage}
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      variant="primary"
                      style={{ width: "38px", height: "38px" }}
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

export default Communication;
