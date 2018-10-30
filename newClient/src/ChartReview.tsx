import * as React from 'react';
import { ChartReviewForm } from './ChartReviewForm';

// https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class

interface IChartReviewState {
  readonly count: number;
}

export class ChartReview extends React.Component<any, IChartReviewState> { 
  public readonly state: IChartReviewState = {
    count: 0,
  };

  public render() {
    return (
      <ChartReviewForm />
    );
  }
}