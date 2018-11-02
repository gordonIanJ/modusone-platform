import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { IProviderReview } from './ChartReviewForm'

interface IProviderReviewProps {
    providerReview: IProviderReview
    idx: number 
    providerOptions: string[]
    diagnosisCategorySelectOptions: string[]
    conditionOptions: string[]
    handleProviderReviewChange: (idx: number) => (event: any) => void 
    handleRemoveProvider: (idx: number) => (event: any) => void
}

export const ProviderReview: React.SFC<IProviderReviewProps> = (props) => {
  const { 
      idx, 
      providerOptions,
      diagnosisCategorySelectOptions,
      conditionOptions, 
      handleProviderReviewChange, 
      handleRemoveProvider, 
      } = props
  return ( 
    <div key={idx}>
        <h3>{`Condition #${idx + 1}`}</h3> 
        <FormGroup row={true}>
        <Label for={`Provider #${idx + 1}`} sm={2}>Provider</Label>
        <Col sm={10}> 
        <Input type="select" name="providerName" id={`Provider #${idx + 1}`} onChange={handleProviderReviewChange(idx)} >
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
        <Input type="select" name="diagnosisCategory" id={`Diagnosis Category #${idx + 1}`} onChange={handleProviderReviewChange(idx)} >
            <option label=" ">-- select a provider --</option> 
            {diagnosisCategorySelectOptions.map((diagnosisCategoryOption, idx1) => (
            <option key={idx1}>{diagnosisCategoryOption}</option>
        ))}
        </Input> 
        </Col>
        </FormGroup>
        <FormGroup row={true}>
        <Label for={`Condition #${idx + 1}`} sm={2}>Condition</Label>
        <Col sm={10}> 
        <Input type="select" name="conditionName" id={`Condition #${idx + 1}`} onChange={handleProviderReviewChange(idx)} >
            <option label=" ">-- select a provider --</option> 
            {conditionOptions.map((conditionOption, idx1) => (
            <option key={idx1}>{conditionOption}</option>
        ))}
        </Input> 
        </Col>
        </FormGroup>
        <FormGroup row={true}>
          <Label for="conditionDetail" sm={2}>Condition Detail</Label>
          <Col sm={10}> 
            <Input type="textarea" name="conditionDetail" id="conditionDetail" onChange={handleProviderReviewChange(idx)} />
          </Col>
        </FormGroup>
        <button type="button" onClick={handleRemoveProvider(idx)} className="small">-</button>
    </div>)
}