import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'

// import { CHI } from 'src/ChartReview/CHI'

/*import { 
  Collapse, 
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle, 
  Jumbotron, 
  Nav, 
  Navbar,
  NavbarBrand, 
  NavItem, 
  NavLink,
  UncontrolledDropdown } from 'reactstrap'*/
import registerServiceWorker from './registerServiceWorker'

/*import { BrowserRouter as 
  Router, 
  // Link, 
  Route } from 'react-router-dom'*/
// import { Col, Collapse, Container, Jumbotron, Nav, Navbar, NavItem, NavLink, Row } from 'reactstrap'
import './index.css'

/*import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import { Piedmont } from 'src/ChartReview/Piedmont'*/

/*
const routing = (
  <Router>
    <div>
    <Navbar color="light" light={true} expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={toggleIsOpen} />
          <Collapse isOpen={isOpen} navbar={true}>
            <Nav className="ml-auto" navbar={true}>
              <NavItem>
                <NavLink href="/CHI/">CHI</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav={true} inNavbar={true}>
                <DropdownToggle nav={true} caret={true}>
                  Options
                </DropdownToggle>
                <DropdownMenu right={true}>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider={true} />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
      <Jumbotron> 
        <Container>
          <div>
            <Route exact={true} path="/" component={App} />
            <Route path="/chi" component={CHI} />
            <Route path="/piedmont" component={Piedmont} />
          </div>
        </Container> 
      </Jumbotron>
      </div>
  </Router>
)
*/

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
