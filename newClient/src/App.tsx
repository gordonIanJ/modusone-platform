import * as React from 'react'
import './App.css'

// import { Col, Collapse, Container, Jumbotron, Nav, Navbar, NavItem, NavLink, Row } from 'reactstrap'
import { Col, Row } from 'reactstrap'
import { ChartReview } from './ChartReview/ChartReview'

class App extends React.Component {
  public render() {
    return (
      <Row>
        <Col>
          <ChartReview customer='CHI' />
        </Col>
      </Row>
    )
  }
}

export default App
