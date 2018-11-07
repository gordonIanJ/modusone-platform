import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { ConditionReview } from './ConditionReview'

import { IDynamicSelectOptions, IFormValues, IGroups, IProviderReview } from './ChartReview'

/*
https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class
https://goshakkk.name/array-form-inputs/
*/

interface IChartReviewSummaryFormProps {
  customer: string
  diagnosisCategorySelectOptions: string[]
  dynamicSelectOptions: IDynamicSelectOptions
  providerConditions: IProviderReview[]
  formValues: IFormValues
  groupUnderReview: string
  groups: IGroups
  handleChange: (evt: any) => void
  handleProviderReviewChange: (idx: number) => (event: any) => void
  handleRemoveProvider: (idx: number) => () => void
  handleAddProvider: () => void
  handleReview: () => void
}

export class ChartReviewSummaryForm extends React.Component<IChartReviewSummaryFormProps> {

  constructor(props: IChartReviewSummaryFormProps) {
    super(props)
  }
  
  public render() {
      return(
        <div> 
          <h3>Summary for Confirmation</h3> 
          <Row>
            <Col md={4}>
              <FormGroup>
              <Label for="accountNumber">Account Number</Label> 
                <Input type="text" name="accountNumber" value={this.props.formValues.accountNumber} onChange={this.props.handleChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup> 
              <Label for="dateOfAdmission">Date of Admission</Label> 
                <Input type="date" name="dateOfAdmission" value={this.props.formValues.dateOfAdmission} onChange={this.props.handleChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup> 
              <Label for="dateOfRelease">Date of Release</Label> 
                <Input type="date" name="dateOfRelease" value={this.props.formValues.dateOfRelease} onChange={this.props.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup> 
                <Label for="groupUnderReview">Group</Label> 
                <Input type="select" name="groupUnderReview" value={this.props.formValues.groupUnderReview} onChange={this.props.handleChange} >
                  <option label=" ">-- select a group --</option> 
                  {Object.keys(this.props.groups).map((groupOption, idx1) => (
                    <option key={idx1}>{groupOption}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
                {this.props.customer === 'CHI' && (this.props.formValues.groupUnderReview === 'Hospitalist' || this.props.formValues.groupUnderReview === 'General Surgery') && 
                <FormGroup> 
                  <Label for="hospitalName">Hospital</Label> 
                  <Input type="select" name="hospitalName" value={this.props.formValues.hospitalName} onChange={this.props.handleChange} >
                    <option label=" ">-- select a hospital --</option> 
                    { this.props.dynamicSelectOptions.hospitals != null && this.props.dynamicSelectOptions.hospitals.map((hospitalOption, idx1) => (
                      <option key={idx1}>{hospitalOption}</option>
                    ))}
                  </Input>
              </FormGroup>
                }
                {this.props.customer !== 'CHI' &&
                <FormGroup> 
                  <Label for="hospitalName">Hospital</Label> 
                  <Input type="select" name="hospitalName"  value={this.props.formValues.hospitalName} onChange={this.props.handleChange} >
                    <option label=" ">-- select a hospital --</option> 
                    { this.props.dynamicSelectOptions.hospitals != null && this.props.dynamicSelectOptions.hospitals.map((hospitalOption, idx1) => (
                      <option key={idx1}>{hospitalOption}</option>
                    ))}
                  </Input>
              </FormGroup>
                }
            </Col>
          </Row>
                { this.props.providerConditions != null && this.props.providerConditions.length > 0 &&
                  <h2>Pertinent Conditions</h2>
                }
                { this.props.providerConditions.map((condition, idx) =>
                  <ConditionReview
                    providerCondition={condition}
                    idx={idx}
                    handleProviderReviewChange={this.props.handleProviderReviewChange}
                    handleRemoveProvider={this.props.handleRemoveProvider}
                    key={idx}
                    dynamicSelectOptions={this.props.dynamicSelectOptions}
                    diagnosisCategorySelectOptions={this.props.diagnosisCategorySelectOptions} 
                  /> 
                )}        
          <button type="button" onClick={this.props.handleAddProvider} className="small">Add Condition</button>
          <button type="button" onClick={this.handleSubmit} className="small">Confirm & Deliver</button>
        </div>
      )
  }

  private makeRecords = (values: IFormValues, providerConditions: IProviderReview[]) => {
    const conditions = [] 
    if (typeof(providerConditions) !== 'undefined') { 
      for (let i = 0; i < providerConditions.length; i++) {
        conditions[i] = {
          admissionDate: values.dateOfAdmission,
          assignedGroup: values.groupUnderReview,
          assignedHospital: "N/A",
          attendingProvider: providerConditions[i].providerName,
          conditionDiagnosisQuality: providerConditions[i].diagnosisCategory,
          conditionName: providerConditions[i].conditionName, 
          conditionNotes: providerConditions[i].conditionDetail,
          dischargeDate: values.dateOfRelease,  
          medicalRecordId: values.accountNumber,
          reviewerEmail: values.reviewerEmail
        }
        if (typeof(values.hospitalName) !== 'undefined') {
          conditions[i].assignedHospital = values.hospitalName
        }
      }
    } else {
      conditions[0] = {
        admissionDate: values.dateOfAdmission,
        assignedGroup: values.groupUnderReview,
        assignedHospital: "N/A",
        attendingProvider: "N/A", 
        conditionDiagnosisQuality: "N/A",
        conditionName: "none", 
        conditionNotes: "N/A",
        dischargeDate: values.dateOfRelease,  
        medicalRecordId: values.accountNumber,
        reviewerEmail: values.reviewerEmail,
      }
      if (typeof(values.hospitalName) !== 'undefined') {
        conditions[0].assignedHospital = values.hospitalName
      }
    }
    return conditions
  } 

  private handleSubmit = () => {
    const ConditionRecords = this.makeRecords(this.props.formValues, this.props.providerConditions)

    const httpHeaders = {
      'customer': this.props.customer
    }
    // tslint:disable-next-line:no-console 
    axios.post('https://pertinentconditionsdevelop.azurewebsites.net/api/FormHandlerHttpTriggered?code=KVI7YTvv3YZPSBtHvxIs1Tjl3SmyNGTCypDadKg1JbcYZkR90EBERw==', ConditionRecords, {headers: httpHeaders})
      .then(res => {
        // tslint:disable-next-line:no-console 
        console.log(res.data);
      })
  }

}