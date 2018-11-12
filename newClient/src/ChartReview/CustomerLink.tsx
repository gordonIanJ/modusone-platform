import * as React from 'react'

import { Link } from 'react-router-dom'

import { 
  NavLink,
} from 'reactstrap'

import { ICustomer } from './Interfaces'

interface ICustomerLinkProps {
  customer: ICustomer
}

export const CustomerLink: React.SFC<ICustomerLinkProps> = (props) => {
  const { customer } = props
  return (
      <NavLink 
        name="{customer.name}" 
        to={"/" + customer.name + "/"}
        tag={Link} 
        active={customer.isActive}>{customer.name}</NavLink>
  )
  /* return ( TODO; and, use CustomerLink in the Home component, too
    <div onClick={setCustomerActive(customer.name)} >
      <NavItem>
        <NavLink 
          name="{customer.name}" 
          to={"/" + customer.name + "/"}
          tag={Link} 
          activeclassname={"active"} >{customer.name}</NavLink>
        </NavItem>
    </div>
  )*/
}