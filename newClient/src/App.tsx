import * as React from 'react'
import './App.css'

import { Col, Container, Jumbotron, Row } from 'reactstrap'
import { ChartReview } from './ChartReview'
import { config } from './config.js'

class App extends React.Component {
  public state = {
    customer: config.customer
  } 
  public render() {
    return (
      <Jumbotron> 
        <Container>
          <Row>
            <Col>
              <ChartReview customer={this.state.customer} />
            </Col>
        </Row>
        </Container> 
      </Jumbotron>
    )
  }
}

export default App
