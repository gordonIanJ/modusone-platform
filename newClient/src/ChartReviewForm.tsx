import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react'
import { Col, FormGroup, Input, Label } from 'reactstrap'
import { IConditionsByProvider, IProviderReview} from './ChartReview'
import { ProviderReview } from './ProviderReview'
import { readModel } from './readmodel'

/*
https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class
https://goshakkk.name/array-form-inputs/
*/

interface IGroup {
  hospital?: string
  selectOptions: IDynamicSelectOptions
}

interface IGroups {
  [key: string]: IGroup
}

interface IDynamicSelectOptions {
  providers: string[]
  conditions: string[]
  hospitals?: string[]
}

interface IChartReviewFormProps {
  conditionsByProvider: IConditionsByProvider 
  customer: string
  providerConditions: IProviderReview[]
  handleProviderReviewChange: (idx: number) => (event: any) => void
  handleRemoveProvider: (idx: number) => () => void
  handleAddProvider: () => void
  handleReview: () => void 
}

interface IChartReviewFormState {
  diagnosisCategorySelectOptions: string[]
  groups: IGroups
  groupUnderReview: string
  dynamicSelectOptions: IDynamicSelectOptions
}

export class ChartReviewForm extends React.Component<IChartReviewFormProps, IChartReviewFormState> {

  public readonly state: IChartReviewFormState = {
    diagnosisCategorySelectOptions: [],
    dynamicSelectOptions: {
      conditions: [],
      providers: []
    }, 
    groupUnderReview: "",
    groups: {},
  }
  
  constructor(props: IChartReviewFormProps) {
    super(props)
  }

  public componentDidMount() {
    this.setState({diagnosisCategorySelectOptions: readModel.diagnosisCategorySelectOptions})
    this.setState({groups: readModel.groups})
  }
  
  public render() {
      return(
        <div> 
          <h1>Chart Review</h1> 
            <FormGroup row={true}>
              <Label for="email" sm={2}>Your Email</Label>
              <Col sm={10}> 
                <Input type="text" name="reviewerEmail" id="reviewerEmail" onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="accountNumber" sm={2}>Account Number</Label>
              <Col sm={10}> 
              <Input type="text" name="accountNumber" id="accountNumber" onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="dateOfAdmission" sm={2}>Date of Admission</Label>
              <Col sm={10}> 
              <Input type="date" name="dateOfAdmission" id="dateOfAdmission" onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
              <Label for="dateOfRelease" sm={2}>Date of Release</Label>
              <Col sm={10}> 
              <Input type="date" name="dateOfRelease" id="dateOfRelease" onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row={true}>
            <Label for="groupUnderReview" sm={2}>Group</Label>
            <Col sm={10}> 
            <Input type="select" name="groupUnderReview" id="groupUnderReview" onChange={this.handleChange} >
                <option label=" ">-- select a group --</option> 
                {Object.keys(this.state.groups).map((groupOption, idx1) => (
                  <option key={idx1}>{groupOption}</option>
                ))}
            </Input> 
            </Col>
            </FormGroup>
            {this.props.customer === 'CHI' && (this.state.groupUnderReview === 'Hospitalist' || this.state.groupUnderReview === 'General Surgery') && 
              <FormGroup row={true}>
              <Label for="hospitalName" sm={2}>Hospital</Label>
              <Col sm={10}> 
                <Input type="select" name="hospitalName" id="hospitalName" onChange={this.handleChange} >
                  <option label=" ">-- select a hospital --</option> 
                  { this.state.dynamicSelectOptions.hospitals != null && this.state.dynamicSelectOptions.hospitals.map((hospitalOption, idx1) => (
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
                <Input type="select" name="hospitalName" id="hospitalName" onChange={this.handleChange} >
                  <option label=" ">-- select a hospital --</option> 
                  { this.state.dynamicSelectOptions.hospitals != null && this.state.dynamicSelectOptions.hospitals.map((hospitalOption, idx1) => (
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
                providerOptions={this.state.dynamicSelectOptions.providers}
                conditionOptions={this.state.dynamicSelectOptions.conditions}
                diagnosisCategorySelectOptions={this.state.diagnosisCategorySelectOptions}
                handleProviderReviewChange={this.props.handleProviderReviewChange}
                handleRemoveProvider={this.props.handleRemoveProvider}
              />
            ))}
          <button type="button" onClick={this.props.handleAddProvider} className="small">Add Condition</button>
          <button type="button" onClick={this.props.handleReview} className="small">Review</button>
        </div>
      )
  }
   
  private handleChange = (evt: any) => {
    const newState = this.state
    newState[evt.target.name] = evt.target.value
    if (evt.target.name === 'groupUnderReview' && newState.groups[evt.target.value] != null) {
      newState.dynamicSelectOptions = newState.groups[evt.target.value].selectOptions
    }
    this.setState(newState)  
  }

}