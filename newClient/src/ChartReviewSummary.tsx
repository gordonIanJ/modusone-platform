import * as React from 'react'
import { IProviderReview } from './ChartReview'
import { ConditionReview } from './ConditionReview';

interface IChartReviewSummaryProps {
 providerConditions: IProviderReview[]
}

export const ChartReviewSummary: React.SFC<IChartReviewSummaryProps> = (props) => {
   
  return(
  <div>
      { props.providerConditions.map((condition, idx) =>
        <ConditionReview
          providerCondition={condition}
          idx={idx}
          key={idx}
        /> 
      )}        
  </div>
 )
}