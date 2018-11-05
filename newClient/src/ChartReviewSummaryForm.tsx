import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react'
// import { Col, FormGroup, Input, Label } from 'reactstrap'
import { Input } from 'reactstrap'
import { ConditionReview } from './ConditionReview'

import { IDynamicSelectOptions, IGroups, IProviderReview } from './ChartReview'

/*
https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class
https://goshakkk.name/array-form-inputs/
*/

interface IChartReviewSummaryFormProps {
  customer: string
  diagnosisCategorySelectOptions: string[]
  dynamicSelectOptions: IDynamicSelectOptions
  providerConditions: IProviderReview[]
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
          <h1>Chart Review Summary and Confirmation</h1> 
              <Input type="text" name="accountNumber" id="accountNumber" onChange={this.props.handleChange} />
              <Input type="date" name="dateOfAdmission" id="dateOfAdmission" onChange={this.props.handleChange} />
              <Input type="date" name="dateOfRelease" id="dateOfRelease" onChange={this.props.handleChange} />
            <Input type="select" name="groupUnderReview" id="groupUnderReview" onChange={this.props.handleChange} >
                <option label=" ">-- select a group --</option> 
                {Object.keys(this.props.groups).map((groupOption, idx1) => (
                  <option key={idx1}>{groupOption}</option>
                ))}
            </Input>
            {this.props.customer === 'CHI' && (this.props.groupUnderReview === 'Hospitalist' || this.props.groupUnderReview === 'General Surgery') && 
                <Input type="select" name="hospitalName" id="hospitalName" onChange={this.props.handleChange} >
                  <option label=" ">-- select a hospital --</option> 
                  { this.props.dynamicSelectOptions.hospitals != null && this.props.dynamicSelectOptions.hospitals.map((hospitalOption, idx1) => (
                    <option key={idx1}>{hospitalOption}</option>
                  ))}
                </Input> 
            }
            {this.props.customer !== 'CHI' &&
                <Input type="select" name="hospitalName" id="hospitalName" onChange={this.props.handleChange} >
                  <option label=" ">-- select a hospital --</option> 
                  { this.props.dynamicSelectOptions.hospitals != null && this.props.dynamicSelectOptions.hospitals.map((hospitalOption, idx1) => (
                    <option key={idx1}>{hospitalOption}</option>
                  ))}
                </Input>
            }
            { this.props.providerConditions != null && this.props.providerConditions.length > 0 &&
            <h2>Conditions</h2>
            }
            { this.props.providerConditions.map((condition, idx) =>
              <ConditionReview
                providerCondition={condition}
                idx={idx}
                handleProviderReviewChange={this.props.handleProviderReviewChange}
                key={idx}
              /> 
            )}        
          <button type="button" onClick={this.props.handleAddProvider} className="small">Add Condition</button>
          <button type="button" onClick={this.props.handleReview} className="small">Review</button>
        </div>
      )
  }

}