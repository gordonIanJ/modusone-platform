import * as React from 'react'
import { 
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavLink
} from 'reactstrap'



interface IHomeState {
  dropdownOpen: boolean
}

// export const Home: React.SFC = (props) => {
export class Home extends React.Component<any, IHomeState> {
  constructor(props: any) {
    super(props);
   
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  
  public render() {
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