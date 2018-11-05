import * as React from 'react'
import { ChartReviewForm } from './ChartReviewForm'
import { ChartReviewSummary } from './ChartReviewSummary'
import { readModel } from './readmodel'
// import {v1 as uuidv1} from 'uuid'

// https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class

interface IChartReviewProps {
  customer: string
}

export interface IGroup {
  hospital?: string
  selectOptions: IDynamicSelectOptions
}

export interface IGroups {
  [key: string]: IGroup
}

export interface IDynamicSelectOptions {
  providers: string[]
  conditions: string[]
  hospitals?: string[]
}

export interface IProviderReview {
  // uuid: string 
  providerName: string
  conditionName: string
  diagnosisCategory: string
  conditionDetail: string
}

interface IPertinentCondition {
  conditionName: string
  diagnosisCategory: string
  conditionDetail: string
}

export interface IConditionsByProvider {
  [key: string]: IPertinentCondition
}

interface IChartReviewState {
  providerConditions: IProviderReview[]
  conditionsByProvider: IConditionsByProvider
  diagnosisCategorySelectOptions: string[]
  dynamicSelectOptions: IDynamicSelectOptions
  groupUnderReview: string
  groups: IGroups
  underReview: boolean 
}

export class ChartReview extends React.Component<IChartReviewProps, IChartReviewState> { 
  public readonly state: IChartReviewState = {
    conditionsByProvider: {},
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
  
  constructor(props: IChartReviewProps) {
    super(props)
  }

  public componentDidMount() {
    this.setState({diagnosisCategorySelectOptions: readModel.diagnosisCategorySelectOptions})
    this.setState({groups: readModel.groups})
  }
  
  public render() {
    return (
      <div>
      {! this.state.underReview && (
        <ChartReviewForm
          customer={this.props.customer}
          diagnosisCategorySelectOptions={this.state.diagnosisCategorySelectOptions}
          dynamicSelectOptions={this.state.dynamicSelectOptions}
          groupUnderReview={this.state.groupUnderReview} 
          groups={this.state.groups}
          providerConditions={this.state.providerConditions}
          handleAddProvider={this.handleAddProvider} 
          handleChange={this.handleChange} 
          handleProviderReviewChange={this.handleProviderReviewChange}
          handleRemoveProvider={this.handleRemoveProvider}
          handleReview={this.handleReview} 
        />
      )}
      { this.state.underReview && (
        <ChartReviewSummary
          providerConditions={this.state.providerConditions}
          handleProviderReviewChange={this.handleProviderReviewChange}
        />
      )}
      </div>
    )}
  
  private handleChange = (evt: any) => {
    const newState = this.state
    newState[evt.target.name] = evt.target.value
    if (evt.target.name === 'groupUnderReview' && newState.groups[evt.target.value] != null) {
      newState.dynamicSelectOptions = newState.groups[evt.target.value].selectOptions
    }
    this.setState(newState)  
  }
  
  private handleReview = () => {
    const newState = this.state
    newState.underReview = true
    this.setState(newState) 
  }
  
  private handleProviderReviewChange = (idx: number) => (evt: any) => {
    const newProviders = this.state.providerConditions.map((provider, sidx) => {
      if (idx !== sidx) { return provider }
      return { ...provider, [evt.target.name]: evt.target.value }
    })
    this.setState({ providerConditions: newProviders })
  }
  
  private handleAddProvider = () => {
    this.setState( (previousState, props) => {
      // const uniqueId: string = uuidv1()
      // return {providerConditions: previousState.providerConditions.concat([{ uuid: uniqueId, providerName: '', conditionName: '', diagnosisCategory: '', conditionDetail: '' }])}
      return {providerConditions: previousState.providerConditions.concat([{ providerName: '', conditionName: '', diagnosisCategory: '', conditionDetail: '' }])}
    })
  }

  private handleRemoveProvider = (idx: number) => () => {
    this.setState({
      providerConditions: this.state.providerConditions.filter((s, sidx) => idx !== sidx)
    })
  }

}