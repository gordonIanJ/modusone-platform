import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { IPertinentCondition, IProviderReview } from './ChartReviewForm';

interface IPertinentConditionProps {
  idx: number
  conditionOptions: string[]
  providerReview: IProviderReview
  pertinentCondition: IPertinentCondition
  handleConditionNameChange: (providerReview: IProviderReview, idx: number) => (event: any) => void
  handleRemoveCondition: (providerReview: IProviderReview, pertinentCondition: IPertinentCondition) => (event: any) => void
}

export const PertinentCondition: React.SFC<IPertinentConditionProps> = (props) => {
  const { idx, conditionOptions, providerReview, pertinentCondition, handleConditionNameChange, handleRemoveCondition } = props 
  return(
    <div key={idx}>
      <FormGroup row={true}>
        <Label for={`Condition #${idx + 1}`} sm={2}>{`Condition #${idx + 1} Name`}</Label>
        <Col sm={10}> 
          <Input type="select" name={`Condition #${idx + 1}`} id={`Condition #${idx + 1}`} onChange={handleConditionNameChange(providerReview, idx)} >
            <option label=" ">-- select a condition --</option> 
            {conditionOptions.map((conditionOption, idx3) => (
              <option key={idx3}>{conditionOption}</option>
            ))}
          </Input> 
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label for="Condition Detail" sm={2}>{`Condition #${idx + 1} Detail`}</Label>
        <Col sm={10}> 
            <Input type="textarea" name="text" id="exampleText" placeholder={`Condition #${idx + 1} detail`} />
        </Col>
      </FormGroup>
      <button type="button" onClick={handleRemoveCondition(providerReview, pertinentCondition)} className="small">-</button>
    </div>
  )
}