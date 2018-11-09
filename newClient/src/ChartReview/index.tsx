/* 
https://medium.com/styled-components/component-folder-pattern-ee42df37ec68
*/

import * as React from 'react'

import { ICustomer } from './Interfaces'
import View from './View'
/* https://medium.com/styled-components/component-folder-pattern-ee42df37ec68
import './index.css'
import loadData from './loadData'
*/

interface IState {
  isOpen: boolean
  customers: ICustomer[] 
}

/* TODO: Pass the active customer down via Context
const CustomerContext = React.createContext(undefined);
*/

export default class extends React.Component<any, IState> { 
  
  constructor(props: any) {
    super(props)

    this.toggle = this.toggle.bind(this)
    /*
    TODO:
    - https://www.robinwieruch.de/react-fetching-data/ 
    - https://www.robinwieruch.de/react-fetching-data/ 
    */
    this.state = {
      customers: [
          {
            isActive: false,   
            name: "CHI"
          },
          {
            isActive: false,   
              name: "Piedmont"
          }
      ],
      isOpen: false
    }
  }
  
  public render() {
    /* https://medium.com/styled-components/component-folder-pattern-ee42df37ec68
    return (
      <View {...this.props} {...this.state} onLoad={this.load} />
    )
    */
    return (
      <View 
        customers={this.state.customers} 
        isOpen={this.state.isOpen}
        setCustomerActive={this.setCustomerActive}
        toggle={this.toggle} />
    )
  }
  
  /* https://medium.com/styled-components/component-folder-pattern-ee42df37ec68
  load = this.load.bind(this)
  async load(...args) {
    try {

      this.setState({ loading: true, error: false })
      const data = await loadData(...args)
      this.setState({ loading: false, data })
    } catch (ex) {
      this.setState({ loading: false, error: true })
    }
  }
  */
  
  private toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  private setCustomerActive = (customerName: string) => {
    // tslint:disable-next-line:no-console
    console.log("In setCustomerActive...") 
    this.setState((previousState, props) => {
      previousState.customers[customerName].isActive = true
      return previousState
    })
  }

}