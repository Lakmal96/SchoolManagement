import React, { useState } from 'react';
import {
  Collapse,
  Navbar as ReactstrapNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';

function Navbar(props) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Container>
      <ReactstrapNavbar color="faded" light>
        <NavbarBrand href="/" className="me-auto">
          Student Management
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="ms-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/students/">Students</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/teachers/">Teachers</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/classrooms/">Classrooms</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/subjects/">Subjects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/allocate-subjects/">Allocate Subjects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/allocate-classrooms/">Allocate Classrooms</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/student-details/">Student Details</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </ReactstrapNavbar>
    </Container>
  );
}

export default Navbar;
