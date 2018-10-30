import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { IPertinentCondition, IProviderReview } from './ChartReviewForm'
import { PertinentCondition } from './PertinentCondition'

interface IProviderReviewProps {
    providerReview: IProviderReview
    idx: number 
    providerOptions: string[]
    conditionOptions: string[]
    handleProviderNameChange: (idx: number) => (event: any) => void 
    handleAddCondition: (event: any) => void
    handleRemoveProvider: (idx: number) => (event: any) => void
    handleConditionNameChange: (providerReview: IProviderReview, idx: number) => (event: any) => void
    handleRemoveCondition: (providerReview: IProviderReview, pertinentCondition: IPertinentCondition) => (event: any) => void 
}

export const ProviderReview: React.SFC<IProviderReviewProps> = (props) => {
  const { 
      providerReview, 
      idx, 
      providerOptions, 
      conditionOptions, 
      handleProviderNameChange, 
      handleAddCondition, 
      handleRemoveProvider, 
      handleConditionNameChange,
      handleRemoveCondition } = props
  return ( 
    <div key={idx}>
        <h3>{`Provider #${idx + 1}`}</h3> 
        <FormGroup row={true}>
        <Label for={`Provider #${idx + 1}`} sm={2}>{`Provider #${idx + 1} Name`}</Label>
        <Col sm={10}> 
        <Input type="select" name={`Provider #${idx + 1}`} id={`Provider #${idx + 1}`} onChange={handleProviderNameChange(idx)} >
            <option label=" ">-- select a provider --</option> 
            {providerOptions.map((providerOption, idx1) => (
            <option key={idx1}>{providerOption}</option>
        ))}
        </Input> 
        </Col>
        </FormGroup>
        {providerReview.pertinentConditions != null && providerReview.pertinentConditions.length > 0 &&
        <h4>{`Conditions for Provider #${idx + 1}`}</h4>
        }
        {providerReview.pertinentConditions != null && providerReview.pertinentConditions.map((pertinentCondition: IPertinentCondition, idx2: number) => (
        <PertinentCondition
          idx={idx2}
          conditionOptions={conditionOptions}
          providerReview={providerReview}
          pertinentCondition={pertinentCondition}
          handleConditionNameChange={handleConditionNameChange}
          handleRemoveCondition={handleRemoveCondition} 
        />
        ))}
        <button type="button" id={providerReview.uuid} onClick={ handleAddCondition } className="small">Add Condition</button>
        <button type="button" onClick={handleRemoveProvider(idx)} className="small">-</button>
    </div>)
}