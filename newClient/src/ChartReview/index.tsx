/* 
https://medium.com/styled-components/component-folder-pattern-ee42df37ec68
*/

import * as React from 'react'
import View from './View';
// import './index.css'
// import loadData from './loadData';

interface IAppState {
  isOpen: boolean
}

export default class Index extends React.Component<any, IAppState> { 
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  public render() {
    /* https://medium.com/styled-components/component-folder-pattern-ee42df37ec68
    return (
      <View {...this.props} {...this.state} onLoad={this.load} />
    );
    */
    return (
      <View isOpen={false} toggle={this.toggle}  />
    );
  }
  
  /* https://medium.com/styled-components/component-folder-pattern-ee42df37ec68
  load = this.load.bind(this);
  async load(...args) {
    try {
      this.setState({ loading: true, error: false });
      const data = await loadData(...args);
      this.setState({ loading: false, data });
    } catch (ex) {
      this.setState({ loading: false, error: true });
    }
  }
  */
  
  private toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}