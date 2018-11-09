import * as React from 'react'
import { Input } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import { IDynamicSelectOptions, IProviderReview } from './ChartReview'

import { BottomMarginButton } from '../StyledComponents'


interface IConditionReviewProps {
  dynamicSelectOptions: IDynamicSelectOptions  
  diagnosisCategorySelectOptions: string[] 
  idx: number 
  handleProviderReviewChange: (idx: number) => (event: any) => void
  handleRemoveProvider: (idx: number) => (event: any) => void 
  providerCondition: IProviderReview
}

export const ConditionReview: React.SFC<IConditionReviewProps> = (props) => {
  const { 
    diagnosisCategorySelectOptions, 
    dynamicSelectOptions, 
    handleProviderReviewChange,
    handleRemoveProvider, 
    idx, 
    providerCondition   
  } = props

  /*
  TODO:
  - Sort and type-ahead for select options for provider and for condition
  */
  return (
   <div>
     <Input type="select" name="providerName" value={providerCondition.providerName} onChange={handleProviderReviewChange(idx)} >
       <option label=" ">-- select a provider --</option> 
       {dynamicSelectOptions.providers.map((providerOption, idx1) => (
         <option key={idx1}>{providerOption}</option>
       ))}
     </Input> 
     <Input type="select" name="diagnosisCategory" value={providerCondition.diagnosisCategory} onChange={handleProviderReviewChange(idx)} >
       <option label=" ">-- select a provider --</option> 
       {diagnosisCategorySelectOptions.map((diagnosisCategoryOption, idx1) => (
         <option key={idx1}>{diagnosisCategoryOption}</option>
       ))}
     </Input> 
     <Input type="select" name="conditionName" value={providerCondition.conditionName} onChange={handleProviderReviewChange(idx)} >
       <option label=" ">-- select a provider --</option> 
       {dynamicSelectOptions.conditions.map((conditionOption, idx1) => (
         <option key={idx1}>{conditionOption}</option>
       ))}
     </Input> 
     <Input type="textarea" name="conditionDetail" value={providerCondition.conditionDetail} onChange={handleProviderReviewChange(idx)} />
     <BottomMarginButton type="button" onClick={handleRemoveProvider(idx)} className="small, btn">-</BottomMarginButton>
   </div> 
  )
}