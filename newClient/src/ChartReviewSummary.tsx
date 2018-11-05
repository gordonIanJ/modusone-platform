import * as React from 'react'
import { IProviderReview } from './ChartReview'
import { ConditionReview } from './ConditionReview';

interface IChartReviewSummaryProps {
 providerConditions: IProviderReview[]
 handleProviderReviewChange: (idx: number) => (evt: any) => void
}

export const ChartReviewSummary: React.SFC<IChartReviewSummaryProps> = (props) => {

  return(
  <div>
      { props.providerConditions.map((condition, idx) =>
        <ConditionReview
          providerCondition={condition}
          idx={idx}
          handleProviderReviewChange={props.handleProviderReviewChange}
          key={idx}
        /> 
      )}        
  </div>
 )
}