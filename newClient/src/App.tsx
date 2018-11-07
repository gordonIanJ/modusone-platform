import * as React from 'react'
import './App.css'

import { CHI } from 'src/ChartReview/CHI'

import { 
  Collapse, 
  Container,
  /*DropdownItem,
  DropdownMenu,
  DropdownToggle,*/ 
  Jumbotron, 
  Nav, 
  Navbar,
  NavbarBrand, 
  NavItem, 
  NavLink,
  // UncontrolledDropdown 
} from 'reactstrap'

import { BrowserRouter as 
  Router, 
  Route } from 'react-router-dom'
import './index.css'

import { Home } from './ChartReview/Home'

import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import { Piedmont } from 'src/ChartReview/Piedmont'

interface IAppProps {
  knockKnock: string
}

interface IAppState {
  isOpen: boolean
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  public render() {
    return (
  <Router>
    <div>
    <Navbar color="light" light={true} expand="md">
          <NavbarBrand href="/">ModusOne Health</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
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
  
  private toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}

export default App
