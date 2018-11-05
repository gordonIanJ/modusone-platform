import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { IProviderReview } from './ChartReview'

 interface IConditionReviewProps {
    providerCondition: IProviderReview
    idx: number 
    // handleProviderReviewChange: (idx: number) => (event: any) => void 
}

export const ConditionReview: React.SFC<IConditionReviewProps> = (props) => {
  const { 
    providerCondition   
    // idx, 
    // handleProviderReviewChange, 
  } = props
  return (
   <div>
     <span>{providerCondition.providerName}</span>
     <span>{providerCondition.diagnosisCategory}</span>
     <span>{providerCondition.conditionName}</span>
     <span>{providerCondition.conditionDetail}</span>
   </div> 
  )
}