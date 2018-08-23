import React, { Component } from 'react'

export default class ChartReview extends Component {
  render() {
    const { header } = this.props
    return (
      <div>
        <h2>{header}</h2>
      </div>
    )
  }
}
