import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Stack, Button } from "react-bootstrap";
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
const NavBar = () => {
  const {user, logoutUser} = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">ChatAPP</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Stack direction="horizontal" gap={3}>
              {
                user && (<>
                   <Link to="/register" className="nav-link" onClick={() => logoutUser()}>Logout</Link>
                </>)
              }
              {
                !user && (
                  <>
                    <Link to="/register" className="nav-link">Register</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                  </>
                )
              }
            </Stack>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
