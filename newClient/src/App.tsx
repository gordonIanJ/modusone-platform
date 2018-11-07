import * as React from 'react'
import './App.css'

import { Col, Container, Jumbotron, Row } from 'reactstrap'
import { ChartReview } from './ChartReview/ChartReview'

class App extends React.Component {
  public render() {
    return (
      <Jumbotron> 
        <Container>
          <Row>
            <Col>
              <ChartReview />
            </Col>
        </Row>
        </Container> 
      </Jumbotron>
    )
  }
}

export default App
