import * as React from 'react'
import { 
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavLink
} from 'reactstrap'

/* TODO
import { CustomerLink } from './CustomerLink'
*/

interface IHomeProps {
  setCustomerActive: (customerName: string) => void
}

interface IHomeState {
  dropdownOpen: boolean
}

export class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
   
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  
  public render() {
    /*
    TODO: Set Navlinks in Navbar to active upon a click of a NavLink in this dropdown
    */
    return(
      <div> 
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret={true} color="success">
          Select a customer 
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem>
          <NavLink href="/Piedmont/">Piedmont</NavLink>
        </DropdownItem>
        <DropdownItem>
          <NavLink href="/CHI/">CHI</NavLink>
        </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      </div>
    )
  }
    
  private toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
}