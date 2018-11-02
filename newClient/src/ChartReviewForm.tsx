import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import {v1 as uuidv1} from 'uuid'
import { ProviderReview } from './ProviderReview'

/*
https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class
https://goshakkk.name/array-form-inputs/
*/

interface IProvider {
  name: string
}

export interface ICondition {
  name: string
  details?: string
}

/*export interface IPertinentCondition extends ICondition {
  uuid: string 
  diagnosisCategory: string
}*/


export interface IProviderReview {
  uuid: string 
  providerName: string
  conditionName: string
  diagnosisCategory: string
  // pertinentConditions?: IPertinentCondition[]
}

interface IGroup {
  name: string;
  hospital?: string;
  providers: IProvider[]
  conditions: ICondition[]
}

/*interface IConditionsByProviderReviewId {
  [providerReviewId: string]: IPertinentCondition[]
}*/

interface IChartReviewFormState {
  email: string | undefined  
  accountNumber: string | undefined
  conditionOptions: string[]
  diagnosisCategoryOptions: string[]
  groups: IGroup[]
  nameOfReviewedGroup: string
  providerOptions: string[]
  providerReviews: IProviderReview[]
  // conditionsByProviderReviewId: IConditionsByProviderReviewId 
  reviewerEmail: string | undefined 
  underReview: boolean | undefined
}

export class ChartReviewForm extends React.Component<any, IChartReviewFormState> {
  public readonly state: IChartReviewFormState = {
    accountNumber: undefined,
    conditionOptions: ["sweaty palms", "nervous tick"],
    // conditionsByProviderReviewId: {},
    diagnosisCategoryOptions: ["Accurate", "Omitted"],
    email: undefined, 
    groups: [
      {
        conditions: [
          {
            name: "Major Depression"
          }
        ],
        name: "bariatrics",
        providers: [
          {
            name: "Rob"
          },
          {
            name: "Roy"
          }
        ]
      }
    ],
    nameOfReviewedGroup: "bariatrics",
    providerOptions: ["Rob","Roy"],
    providerReviews: [],
    reviewerEmail: "", 
    underReview: undefined
  };
  
  /* TODO Initialize the state
  
  private reviewedGroup  = (nameOfReviewedGroup: string, groups: IGroup[]): IGroup => {
    const reviewedGroup = groups.find(obj => obj.name == nameOfReviewedGroup)
    if (reviewedGroup !== undefined) {
      return reviewedGroup
    } else {
      return {
        name: "",
        providers: [],
        conditions: []
      }
    }
  }

  private conditionOptions = (reviewedGroup: (nameOfReviewedGroup: string, groups: IGroup[]) => IGroup) => {
    const group = reviewedGroup(this.state.nameOfReviewedGroup, this.state.groups)
    group.conditions.forEach(() => {
      this.state.conditionOptions.push(name)}) 

  }

  private providerOptions = (reviewedGroup: (nameOfReviewedGroup: string, groups: IGroup[]) => IGroup) => {
    const group = reviewedGroup(this.state.nameOfReviewedGroup, this.state.groups)
    group.providers.forEach(() => {
      this.state.providerOptions.push(name)}) 

  }
  
  https://www.robinwieruch.de/react-fetching-data/
  */ 

  public render() {
    return (
      <div>
      <h1>Chart Review for CHI</h1> 
      <form onSubmit={this.handleSubmit}>
           <FormGroup row={true}>
            <Label for="email" sm={2}>Your Email</Label>
            <Col sm={10}> 
              <Input type="text" name="reviewerEmail" id="reviewerEmail" onChange={this.handleReviewerEmailChange()} />
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="accountNumber" sm={2}>Account Number</Label>
            <Col sm={10}> 
            <Input type="text" name="accountNumber" id="accountNumber" onChange={this.handleAccountNumberChange()} />
            </Col>
          </FormGroup>
          { this.state.providerReviews != null && this.state.providerReviews.length > 0 &&
          <h2>Conditions</h2>
          }
          {this.state.providerReviews.map((providerReview, idx) => (
            <ProviderReview 
              providerReview={providerReview} 
              idx={idx} 
              providerOptions={this.state.providerOptions}
              conditionOptions={this.state.conditionOptions}
              diagnosisCategoryOptions={this.state.diagnosisCategoryOptions}
              handleProviderNameChange={this.handleProviderNameChange}
              // handleAddCondition={this.handleAddCondition}
              handleRemoveProvider={this.handleRemoveProvider}
              // handleConditionNameChange={this.handleConditionNameChange}
              // handleRemoveCondition={this.handleRemoveCondition}
            />
          ))}
        <button type="button" onClick={this.handleAddProvider} className="small">Add Condition</button>
        <button type="button" onClick={this.handleReview} className="small">Review</button>
      </form>
      </div>
    );
  }
  
  /* DRY change handling
  private changeStateAttributeValue = (stateName: string, attributeKey: string, attributeValue: string) => {
    var newState = this.state; 
    var stateBeingChanged = this.state[stateName];
    stateBeingChanged[attributeKey] = attributeValue;
    newState[stateName] = stateBeingChanged;
    this.setState(newState);
  }
  */ 
  
  /*
  private handleReviewedGroupChange = () => {}
  */
  
  private handleReviewerEmailChange = () => (evt: any) => {
    this.setState({reviewerEmail: evt.target.value})
  }
  
  private handleAccountNumberChange = () => (evt: any) => {
    this.setState({ accountNumber: evt.target.value })
  }
  
  private handleReview = () => {
    this.setState({underReview: true}) 
    // tslint:disable-next-line:no-console   
     console.log(this.state)
  }
  
  private handleSubmit = () => {
    // tslint:disable-next-line:no-console   
    // console.log("Submit handled")
  }

  private handleProviderNameChange = (idx: number) => (evt: any) => {
    const newProviders = this.state.providerReviews.map((provider, sidx) => {
      // tslint:disable-next-line:no-console   
      console.log("In handleProviderNameChange...")
      // tslint:disable-next-line:no-console   
      console.log(this.state)
      if (idx !== sidx) { return provider; }
      // tslint:disable-next-line:no-console   
      console.log("idx === sidx")
      return { ...provider, [evt.target.name]: evt.target.value };
    });
    this.setState({ providerReviews: newProviders }); // TODO: Make this a callback
  }
  
  private handleAddProvider = () => {
    this.setState( (previousState, props) => {
      const uniqueId: string = uuidv1();
      return {providerReviews: previousState.providerReviews.concat([{ uuid: uniqueId, providerName: '', conditionName: '', diagnosisCategory: '' }])}
    });
  }

  private handleRemoveProvider = (idx: number) => () => {
    this.setState({
      providerReviews: this.state.providerReviews.filter((s, sidx) => idx !== sidx)
    });
  }

}