import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm  sticky-top"

      style={{
        padding: '0rem 0rem', 
        height: '60px', 
      }}
    >
      <Container>
   
      <Navbar.Brand href="#" className="fw-bold" style={{ padding: '0' }}>
          <img
            src="\logo\iip-black.png"
            alt="Logo"
            style={{
              height: '40px',
              width: 'auto',
            }} 
    
          />
        </Navbar.Brand>


        {/* <Navbar.Brand
          href="#"
          className="fw-bold"
          style={{
            fontSize: '1.25rem',
            padding: '0', 
          }}
        >
          InternshipPortal
        </Navbar.Brand> */}

        {/* Toggle button for mobile */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            padding: '0.25rem 0.5rem'
          }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
    
          <Nav
            className="m-auto text-center"
            style={{
              padding: '0',
              margin: '0', 
            }}
          >
            {/* <Nav.Link
              href="#home"
              className="px-3"
              style={{
                fontSize: '0.85rem',
                padding: '0.25rem 0.75rem',
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#explore"
              className="px-3"
              style={{
                fontSize: '0.85rem', 
                padding: '0.25rem 0.75rem', 
              }}
            >
              Explore
            </Nav.Link>
            <Nav.Link
              href="#about"
              className="px-3"
              style={{
                fontSize: '0.85rem', 
                padding: '0.25rem 0.75rem', 
              }}
            >
              About
            </Nav.Link> */}
          </Nav>

          
          <div className="d-flex gap-2">
            <Link to={'/login'}>
              <Button
                variant="outline-success"
                className="btn-sm"
                style={{
                  fontSize: '0.9rem',
                  padding: '0.5rem 1rem',
                }}
              >
                Login
              </Button>
            </Link>
            <Link to={'/signup'}>
              <Button
                variant="success"
                className="btn-sm"
                style={{
                  fontSize: '0.9rem',
                  padding: '0.5rem 1rem', 
                  // .025,0.5
                }}
              >
                Signup
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
