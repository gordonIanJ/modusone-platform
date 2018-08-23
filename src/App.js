import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';
import ChartReview from './components/ChartReview'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row>
          <Col span={12} offset={6}>
            <ChartReview />
          </Col>
        </Row>  
      </div>
    );
  }
}

export default App;
