import * as React from 'react'

import { CHI } from 'src/ChartReview/CHI'

import { 
  Collapse, 
  Container,
  Jumbotron, 
  Nav, 
  Navbar,
  NavbarBrand,
  NavItem 
} from 'reactstrap'

import { BrowserRouter as 
  Router, 
  Route } from 'react-router-dom'

import { CustomerLink } from './CustomerLink'
import { Home } from './Home'

import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import { Piedmont } from 'src/ChartReview/Piedmont'
import { ICustomer } from './Interfaces'

/* https://medium.com/styled-components/component-folder-pattern-ee42df37ec68 
import Loading from './Loading';
import Error from './Error';
*/

interface IViewProps {
  customers: ICustomer[] 
  isOpen: boolean
  setCustomerActive: (customerName: string) => void
  toggle: () => void
}

export const View: React.SFC<IViewProps> = (props) => {
  
  // const { customers, isOpen, setCustomerActive, toggle } = props
  const { customers, isOpen, toggle } = props
  // <Route exact={true} path="/" render={(props) => <Home setCustomerActive={setCustomerActive} />} /> 
  return ( 
    <Router>
      <div>
      <Navbar color="primary" dark={true} expand="md" className="modusOne" >
        <NavbarBrand href="/">ModusOne Health</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar={true}>
          <Nav className="ml-auto" navbar={true}>
            {customers.map( (customer, idx) => 
              <NavItem key={idx}> 
                <CustomerLink customer={customer} />
              </NavItem>
            )}
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