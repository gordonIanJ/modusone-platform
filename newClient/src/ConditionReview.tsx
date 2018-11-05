import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { IProviderReview } from './ChartReview'

 interface IConditionReviewProps {
    providerCondition: IProviderReview
    idx: number 
    handleProviderReviewChange: (idx: number) => (event: any) => void 
}

export const ConditionReview: React.SFC<IConditionReviewProps> = (props) => {
  const { 
    providerCondition,   
    idx, 
    handleProviderReviewChange 
  } = props

  return (
   <div>
     <input type="text" value={providerCondition.providerName} name="providerName" onChange={handleProviderReviewChange(idx)} />
     <input type="text" value={providerCondition.diagnosisCategory} name="diagnosisCategory" onChange={handleProviderReviewChange(idx)} />
     <input type="text" value={providerCondition.conditionName} name="conditionName" onChange={handleProviderReviewChange(idx)} />
     <input type="text" value={providerCondition.conditionDetail} name="conditionDetail" onChange={handleProviderReviewChange(idx)} />
   </div> 
  )
}