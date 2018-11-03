import 'bootstrap/dist/css/bootstrap.min.css'
import * as React from 'react'
import { Col, FormGroup, Input, Label } from 'reactstrap'
import {v1 as uuidv1} from 'uuid'
import { ProviderReview } from './ProviderReview'
import { readModel } from './readmodel'
// import { render } from "react-dom"

import "react-table/react-table.css"

import ReactTable from "react-table"

/*
https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class
https://goshakkk.name/array-form-inputs/
*/

export interface IProviderReview {
  uuid: string 
  providerName: string
  conditionName: string
  diagnosisCategory: string
  conditionDetail: string
}

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
  customer: string
}

interface IChartReviewFormState {
  diagnosisCategorySelectOptions: string[]
  groups: IGroups
  groupUnderReview: string
  dynamicSelectOptions: IDynamicSelectOptions
  providerConditions: IProviderReview[]
  underReview: boolean
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
    providerConditions: [],
    underReview: false 
  }

  public componentDidMount() {
    this.setState({diagnosisCategorySelectOptions: readModel.diagnosisCategorySelectOptions})
    this.setState({groups: readModel.groups})
  }
  
  public render() {
    if (! this.state.underReview) {
      return (
        <div>
        <h1>Chart Review</h1> 
        <form onSubmit={this.handleSubmit}>
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
            { this.state.providerConditions != null && this.state.providerConditions.length > 0 &&
            <h2>Conditions</h2>
            }
            {this.state.providerConditions.map((providerReview, idx) => (
              <ProviderReview
                key={idx} 
                providerReview={providerReview} 
                idx={idx} 
                providerOptions={this.state.dynamicSelectOptions.providers}
                conditionOptions={this.state.dynamicSelectOptions.conditions}
                diagnosisCategorySelectOptions={this.state.diagnosisCategorySelectOptions}
                handleProviderReviewChange={this.handleProviderReviewChange}
                handleRemoveProvider={this.handleRemoveProvider}
              />
            ))}
          <button type="button" onClick={this.handleAddProvider} className="small">Add Condition</button>
          <button type="button" onClick={this.handleReview} className="small">Review</button>
        </form>
        </div>
      )
    } else {
      // tslint:disable-next-line:no-console   
      console.log(this.state)
      /*const data = {
        'lastName': 'Gordon'
      }*/
      return(
        <div>
          <div>
            <ReactTable
              columns={[
                {
                  Header: "Provider",
                  columns: [
                    {
                      Header: "Name",
                      accessor: "providerName"
                    }
                  ]
                },
                {
                  Header: "Pertinent Condition",
                  columns: [
                    {
                      Header: "Diagnosis Category",
                      accessor: "diagnosisCategory"
                    },
                    {
                      Header: "Condition Name",
                      accessor: "conditionName"
                    },
                    {
                      Header: "Condition Detail",
                      accessor: "conditionDetail"
                    }
                  ]
                }              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
            <br />
            <div style={{ textAlign: "center" }}>
              <em>Tip: Hold shift when sorting to multi-sort!</em>
            </div>
          </div>
          <button type="button" onClick={this.handleSubmit} className="small">Submit</button>
        </div>
      )
    }
  }

  private handleChange = (evt: any) => {
    const newState = this.state
    newState[evt.target.name] = evt.target.value
    if (evt.target.name === 'groupUnderReview' && newState.groups[evt.target.value] != null) {
      newState.dynamicSelectOptions = newState.groups[evt.target.value].selectOptions
    }
    this.setState(newState)  
  }
  
  private handleReview = () => {
    this.setState({underReview: true}) 
  }
  
  private handleSubmit = () => {
    // tslint:disable-next-line:no-console   
    // console.log("Submit handled")
  }
  
  private handleProviderReviewChange = (idx: number) => (evt: any) => {
    const newProviders = this.state.providerConditions.map((provider, sidx) => {
      if (idx !== sidx) { return provider }
      return { ...provider, [evt.target.name]: evt.target.value }
    })
    this.setState({ providerConditions: newProviders }) // TODO: Make this a callback
  }
  
  private handleAddProvider = () => {
    this.setState( (previousState, props) => {
      const uniqueId: string = uuidv1()
      return {providerConditions: previousState.providerConditions.concat([{ uuid: uniqueId, providerName: '', conditionName: '', diagnosisCategory: '', conditionDetail: '' }])}
    })
  }

  private handleRemoveProvider = (idx: number) => () => {
    this.setState({
      providerConditions: this.state.providerConditions.filter((s, sidx) => idx !== sidx)
    })
  }

  /*private renderEditable(cellInfo: any) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }*/

}