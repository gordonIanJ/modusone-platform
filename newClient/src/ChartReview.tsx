import * as React from 'react';
import { ChartReviewForm } from './ChartReviewForm';

// https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class

interface IChartReviewProps {
  customer: string
}

export class ChartReview extends React.Component<IChartReviewProps, {}> { 
  public render() {
    return (
      <ChartReviewForm customer={this.props.customer} />
    );
  }
}