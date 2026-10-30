import { useState } from "react";
import {
  Container, Row, Col, Card, Button, Badge, Modal,
  Navbar, Form, Offcanvas, ListGroup, ButtonGroup,
} from "react-bootstrap";

const products = [
  { id: 1, name: "Wireless Headphones", price: 1999, tag: "New", category: "Audio", desc: "Noise cancelling, 20 hours battery life." },
  { id: 2, name: "Smart Watch", price: 3499, tag: "Popular", category: "Wearable", desc: "Heart rate, steps and sleep tracking." },
  { id: 3, name: "Bluetooth Speaker", price: 1499, tag: "Sale", category: "Audio", desc: "Waterproof, deep bass, 12 hours playtime." },
  { id: 4, name: "Fitness Band", price: 999, tag: "Sale", category: "Wearable", desc: "Lightweight band with step and calorie tracking." },
  { id: 5, name: "Power Bank", price: 1299, tag: "New", category: "Accessories", desc: "10000 mAh, fast charging, dual USB ports." },
  { id: 6, name: "Phone Stand", price: 399, tag: "Popular", category: "Accessories", desc: "Adjustable aluminium stand for phone and tablet." },
];

function ProductCards() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setSelected(null);
    setShowCart(true);
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" sticky="top" className="px-3">
        <Navbar.Brand>🛒 My Shop</Navbar.Brand>
        <Button
          variant="outline-light"
          className="ms-auto"
          onClick={() => setShowCart(true)}
        >
          Cart <Badge bg="danger">{cartCount}</Badge>
        </Button>
      </Navbar>

      <Container className="py-5">
        <h2 className="text-center mb-4">Gautam Chi  Products Shop</h2>

        {/* Search + Filter */}
        <Row className="mb-4 g-3 align-items-center">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Product shodha..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={6} className="text-md-end">
            <ButtonGroup>
              {categories.map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "dark" : "outline-dark"}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>

        {/* Product Cards */}
        <Row className="g-4">
          {filtered.length === 0 && (
            <p className="text-center text-muted">Kahi product sapadla nahi.</p>
          )}
          {filtered.map((p) => (
            <Col key={p.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start">
                    <Card.Title>{p.name}</Card.Title>
                    <Badge bg="primary">{p.tag}</Badge>
                  </div>
                  <small className="text-secondary mb-2">{p.category}</small>
                  <Card.Text className="text-muted">{p.desc}</Card.Text>
                  <h5 className="mt-auto">₹{p.price}</h5>
                  <div className="d-flex gap-2 mt-2">
                    <Button
                      variant="outline-dark"
                      className="flex-fill"
                      onClick={() => setSelected(p)}
                    >
                      Details
                    </Button>
                    <Button
                      variant="success"
                      className="flex-fill"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Details Modal */}
      <Modal show={!!selected} onHide={() => setSelected(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selected?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Badge bg="secondary" className="mb-2">{selected?.category}</Badge>
          <p>{selected?.desc}</p>
          <h4>₹{selected?.price}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Close
          </Button>
          <Button variant="success" onClick={() => addToCart(selected)}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cart Panel */}
      <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart ({cartCount})</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length === 0 ? (
            <p className="text-muted">Cart rikama aahe.</p>
          ) : (
            <>
              <ListGroup variant="flush">
                {cart.map((i) => (
                  <ListGroup.Item key={i.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{i.name}</strong>
                      <div className="text-muted">₹{i.price} × {i.qty}</div>
                    </div>
                    <ButtonGroup size="sm">
                      <Button variant="outline-secondary" onClick={() => changeQty(i.id, -1)}>−</Button>
                      <Button variant="outline-secondary" disabled>{i.qty}</Button>
                      <Button variant="outline-secondary" onClick={() => changeQty(i.id, 1)}>+</Button>
                    </ButtonGroup>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <hr />
              <h5 className="d-flex justify-content-between">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </h5>
              <Button variant="dark" className="w-100 mt-2">Checkout</Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ProductCards;