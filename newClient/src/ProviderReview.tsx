import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { IPertinentCondition, IProviderReview } from './ChartReviewForm'
import { PertinentCondition } from './PertinentCondition'

interface IProviderReviewProps {
    providerReview: IProviderReview
    idx: number 
    providerOptions: string[]
    diagnosisCategoryOptions: string[]
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
      diagnosisCategoryOptions,
      conditionOptions, 
      handleProviderNameChange, 
      // handleAddCondition, 
      handleRemoveProvider, 
      handleConditionNameChange,
      handleRemoveCondition } = props
  return ( 
    <div key={idx}>
        <h3>{`Condition #${idx + 1}`}</h3> 
        <FormGroup row={true}>
        <Label for={`Provider #${idx + 1}`} sm={2}>Provider</Label>
        <Col sm={10}> 
        <Input type="select" name={`Provider #${idx + 1}`} id={`Provider #${idx + 1}`} onChange={handleProviderNameChange(idx)} >
            <option label=" ">-- select a provider --</option> 
            {providerOptions.map((providerOption, idx1) => (
            <option key={idx1}>{providerOption}</option>
        ))}
        </Input> 
        </Col>
        </FormGroup>
        <FormGroup row={true}>
        <Label for={`Diagnosis Category #${idx + 1}`} sm={2}>Diagnosis Category</Label>
        <Col sm={10}> 
        <Input type="select" name={`Diagnosis Category #${idx + 1}`} id={`Diagnosis Category #${idx + 1}`} onChange={handleProviderNameChange(idx)} >
            <option label=" ">-- select a provider --</option> 
            {diagnosisCategoryOptions.map((diagnosisCategoryOption, idx1) => (
            <option key={idx1}>{diagnosisCategoryOption}</option>
        ))}
        </Input> 
        </Col>
        </FormGroup>
        <FormGroup row={true}>
        <Label for={`Condition #${idx + 1}`} sm={2}>Condition</Label>
        <Col sm={10}> 
        <Input type="select" name={`Condition #${idx + 1}`} id={`Condition #${idx + 1}`} onChange={handleProviderNameChange(idx)} >
            <option label=" ">-- select a provider --</option> 
            {conditionOptions.map((conditionOption, idx1) => (
            <option key={idx1}>{conditionOption}</option>
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
        <button type="button" onClick={handleRemoveProvider(idx)} className="small">-</button>
    </div>)
}