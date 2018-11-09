import * as React from 'react'

import { CHI } from 'src/ChartReview/CHI'

import { 
  Collapse, 
  Container,
  Jumbotron, 
  Nav, 
  Navbar,
  NavbarBrand, 
  NavItem, 
  NavLink,
} from 'reactstrap'

import { BrowserRouter as 
  Router, 
  Route } from 'react-router-dom'

import { Home } from './Home'

import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import { Piedmont } from 'src/ChartReview/Piedmont'

/* https://medium.com/styled-components/component-folder-pattern-ee42df37ec68 
import Loading from './Loading';
import Error from './Error';
*/

interface IViewProps {
    isOpen: boolean
    toggle: () => void
}

export const View: React.SFC<IViewProps> = (props) => {
  
  const {} = props
  return ( 
    <Router>
      <div>
      <Navbar color="primary" dark={true} expand="md" className="modusOne" >
        <NavbarBrand href="/">ModusOne Health</NavbarBrand>
        <NavbarToggler onClick={props.toggle} />
        <Collapse isOpen={props.isOpen} navbar={true}>
          <Nav className="ml-auto" navbar={true}>
            <NavItem>
              <NavLink href="/Piedmont/">Piedmont</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/CHI/">CHI</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Jumbotron> 
        <Container>
          <div>
            <Route exact={true} path="/" component={Home} />
            <Route path="/chi" component={CHI} />
            <Route path="/piedmont" component={Piedmont} />
          </div>
        </Container> 
      </Jumbotron>
      </div>
    </Router>
  )
}

export default View 