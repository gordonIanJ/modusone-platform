import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react'
import { Col, FormGroup, Input, Label } from 'reactstrap'
import { IDynamicSelectOptions, IGroups, IProviderReview } from './ChartReview'
import { ProviderReview } from './ProviderReview'

/*
https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class
https://goshakkk.name/array-form-inputs/
*/

interface IChartReviewFormProps {
  customer: string
  diagnosisCategorySelectOptions: string[]
  dynamicSelectOptions: IDynamicSelectOptions
  groups: IGroups
  groupUnderReview: string
  providerConditions: IProviderReview[]
  handleChange: (evt: any) => void
  handleChangeCustomer: (evt: any) => void
  handleProviderReviewChange: (idx: number) => (event: any) => void
  handleRemoveProvider: (idx: number) => () => void
  handleAddProvider: () => void
  handleReview: () => void 
}

export class ChartReviewForm extends React.Component<IChartReviewFormProps> {

  constructor(props: IChartReviewFormProps) {
    super(props)
  }
  
  public render() {
      return(
        <div> 
          <h1>Chart Review</h1> 
            <FormGroup row={true}>
              <Label for="customer" sm={2}>Customer</Label>
              <Col sm={10}> 
                <Input type="select" name="customer" id="customer" onChange={this.props.handleChangeCustomer} >
                    <option label=" ">-- select a customer --</option> 
                      <option>CHI</option>
                      <option>Piedmont</option>
                </Input> 
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="email" sm={2}>Your Email</Label>
              <Col sm={10}> 
                <Input type="text" name="reviewerEmail" id="reviewerEmail" onChange={this.props.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="accountNumber" sm={2}>Account Number</Label>
              <Col sm={10}> 
              <Input type="text" name="accountNumber" id="accountNumber" onChange={this.props.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="dateOfAdmission" sm={2}>Date of Admission</Label>
              <Col sm={10}> 
              <Input type="date" name="dateOfAdmission" id="dateOfAdmission" onChange={this.props.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="dateOfRelease" sm={2}>Date of Release</Label>
              <Col sm={10}> 
              <Input type="date" name="dateOfRelease" id="dateOfRelease" onChange={this.props.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
            <Label for="groupUnderReview" sm={2}>Group</Label>
            <Col sm={10}> 
            <Input type="select" name="groupUnderReview" id="groupUnderReview" onChange={this.props.handleChange} >
                <option label=" ">-- select a group --</option> 
                {Object.keys(this.props.groups).map((groupOption, idx1) => (
                  <option key={idx1}>{groupOption}</option>
                ))}
            </Input> 
            </Col>
            </FormGroup>
            {this.props.customer === 'CHI' && (this.props.groupUnderReview === 'Hospitalist' || this.props.groupUnderReview === 'General Surgery') && 
              <FormGroup row={true}>
              <Label for="hospitalName" sm={2}>Hospital</Label>
              <Col sm={10}> 
                <Input type="select" name="hospitalName" id="hospitalName" onChange={this.props.handleChange} >
                  <option label=" ">-- select a hospital --</option> 
                  { this.props.dynamicSelectOptions.hospitals != null && this.props.dynamicSelectOptions.hospitals.map((hospitalOption, idx1) => (
                    <option key={idx1}>{hospitalOption}</option>
                  ))}
              </Input> 
              </Col>
              </FormGroup>
            }
            {this.props.customer !== 'CHI' &&
              <FormGroup row={true}>
              <Label for="hospitalName" sm={2}>Hospital</Label>
              <Col sm={10}> 
                <Input type="select" name="hospitalName" id="hospitalName" onChange={this.props.handleChange} >
                  <option label=" ">-- select a hospital --</option> 
                  { this.props.dynamicSelectOptions.hospitals != null && this.props.dynamicSelectOptions.hospitals.map((hospitalOption, idx1) => (
                    <option key={idx1}>{hospitalOption}</option>
                  ))}
              </Input> 
              </Col>
              </FormGroup>
            }
            { this.props.providerConditions != null && this.props.providerConditions.length > 0 &&
            <h2>Conditions</h2>
            }
            {this.props.providerConditions.map((providerReview, idx) => (
              <ProviderReview
                key={idx} 
                providerReview={providerReview} 
                idx={idx} 
                providerOptions={this.props.dynamicSelectOptions.providers}
                conditionOptions={this.props.dynamicSelectOptions.conditions}
                diagnosisCategorySelectOptions={this.props.diagnosisCategorySelectOptions}
                handleProviderReviewChange={this.props.handleProviderReviewChange}
                handleRemoveProvider={this.props.handleRemoveProvider}
              />
            ))}
          <button type="button" onClick={this.props.handleAddProvider} className="small">Add Condition</button>
          <button type="button" onClick={this.props.handleReview} className="small">Review</button>
        </div>
      )
  }

}