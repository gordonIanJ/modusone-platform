import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { CHI } from 'src/ChartReview/CHI'

import { Collapse, Container, Jumbotron, Nav, Navbar, NavItem, NavLink } from 'reactstrap'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
// import { Col, Collapse, Container, Jumbotron, Nav, Navbar, NavItem, NavLink, Row } from 'reactstrap'
import './index.css'

import { Piedmont } from 'src/ChartReview/Piedmont'

const routing = (
  <Router>
      <Jumbotron> 
        <Container>
          <Navbar color="light" light={true} expand="md">
            <Collapse navbar={true}>
              <Nav className="ml-auto" navbar={true}>
                <NavItem>
                  <NavLink tag={Link} to="/CHI">CHI</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/Piedmont">Piedmont</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <div>
            <Route exact={true} path="/" component={App} />
            <Route path="/chi" component={CHI} />
            <Route path="/piedmont" component={Piedmont} />
          </div>
        </Container> 
      </Jumbotron>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
