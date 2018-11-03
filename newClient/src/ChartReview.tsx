import * as React from 'react'
import { ChartReviewForm } from './ChartReviewForm'
import { ChartReviewSummary } from './ChartReviewSummary'
// import {v1 as uuidv1} from 'uuid'

// https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class

interface IChartReviewProps {
  customer: string
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
  underReview: boolean 
}

export class ChartReview extends React.Component<IChartReviewProps, IChartReviewState> { 
  public readonly state: IChartReviewState = {
    conditionsByProvider: {},
    providerConditions: [],
    underReview: false
  }
  
  constructor(props: IChartReviewProps) {
    super(props)
  }
  
  public render() {
    return (
      <div>
      {! this.state.underReview && (
        <ChartReviewForm
          conditionsByProvider={this.state.conditionsByProvider} 
          customer={this.props.customer}
          providerConditions={this.state.providerConditions}
          handleAddProvider={this.handleAddProvider} 
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