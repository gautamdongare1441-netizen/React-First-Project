import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>

        <Navbar.Brand href="/">
          My Website
        </Navbar.Brand>

        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  )
}

export default MyNavbar;