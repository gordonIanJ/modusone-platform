import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row>
          <Col span={12} offset={6}>
            <p>Hello, world</p>
          </Col>
        </Row>  
      </div>
    );
  }
}

export default App;
