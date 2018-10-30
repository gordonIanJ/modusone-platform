import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import {v1 as uuidv1} from 'uuid'

/*
https://github.com/piotrwitek/react-redux-typescript-guide#stateful-components---class
https://goshakkk.name/array-form-inputs/
*/

interface IProvider {
  name: string
}

interface ICondition {
  name: string
  details?: string
}

interface IPertinentCondition extends ICondition {
  uuid: string 
  diagnosisCategory: string
}

interface IProviderReview {
  uuid: string 
  providerName: string
  pertinentConditions?: IPertinentCondition[]
}

interface IGroup {
  name: string;
  hospital?: string;
  providers: IProvider[]
  conditions: ICondition[]
}

interface IConditionsByProviderReviewId {
  [key: string]: IPertinentCondition[]
}

interface IChartReviewFormState {
  email: string | undefined  
  accountNumber: string | undefined
  conditionOptions: string[]
  groups: IGroup[]
  nameOfReviewedGroup: string
  providerOptions: string[]
  providerReviews: IProviderReview[]
  conditionsByProviderReviewId: IConditionsByProviderReviewId 
  reviewerEmail: string | undefined 
  underReview: boolean | undefined
}

export class ChartReviewForm extends React.Component<any, IChartReviewFormState> {
  public readonly state: IChartReviewFormState = {
    accountNumber: undefined,
    conditionOptions: ["sweaty palms", "nervous tick"],
    conditionsByProviderReviewId: {},
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
    providerReviews: [], // TODO: replace pertinentConditions and providerReviews, with providerReviews
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
          <h2>Providers</h2>
          }
          {this.state.providerReviews.map((providerReview, idx1) => (
            <div key={idx1}>
              <h3>{`Provider #${idx1 + 1}`}</h3> 
              <FormGroup row={true}>
                <Label for={`Provider #${idx1 + 1}`} sm={2}>{`Provider #${idx1 + 1} Name`}</Label>
                <Col sm={10}> 
                  <Input type="select" name={`Provider #${idx1 + 1}`} id={`Provider #${idx1 + 1}`} onChange={this.handleProviderNameChange(idx1)} >
                  <option label=" ">-- select a provider --</option> 
                  {this.state.providerOptions.map((providerOption, idx3) => (
                    <option key={idx3}>{providerOption}</option>
                  ))}
                  </Input> 
                </Col>
              </FormGroup>
              { providerReview.pertinentConditions != null && providerReview.pertinentConditions.length > 0 &&
              <h4>{`Conditions for Provider #${idx1 + 1}`}</h4>
              }
              {providerReview.pertinentConditions != null && providerReview.pertinentConditions.map((pertinentCondition: IPertinentCondition, idx2: number) => (
                <div key={idx2}>
                  <FormGroup row={true}>
                    <Label for={`Condition #${idx2 + 1}`} sm={2}>{`Condition #${idx2 + 1} Name`}</Label>
                    <Col sm={10}> 
                      <Input type="select" name={`Condition #${idx2 + 1}`} id={`Condition #${idx2 + 1}`} onChange={this.handleConditionNameChange(providerReview, idx2)} >
                      <option label=" ">-- select a condition --</option> 
                      {this.state.conditionOptions.map((conditionOption, idx3) => (
                        <option key={idx3}>{conditionOption}</option>
                      ))}
                      </Input> 
                    </Col>
                  </FormGroup>
                  <FormGroup row={true}>
                    <Label for="Condition Detail" sm={2}>{`Condition #${idx2 + 1} Detail`}</Label>
                    <Col sm={10}> 
                      <Input type="textarea" name="text" id="exampleText" placeholder={`Condition #${idx2 + 1} detail`} />
                    </Col>
                  </FormGroup>
                  <button type="button" onClick={this.handleRemoveCondition(providerReview, pertinentCondition)} className="small">-</button>
                </div>
              ))}
              <button type="button" id={providerReview.uuid} onClick={ this.handleAddCondition } className="small">Add Condition</button>
              <button type="button" onClick={this.handleRemoveProvider(idx1)} className="small">-</button>
            </div>
          ))}
        <button type="button" onClick={this.handleAddProvider} className="small">Add Provider</button>
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

  private handleConditionNameChange = (providerReview: IProviderReview, pertinentConditionIndex: number) => (evt: any) => {
    const newConditions = this.state.providerReviews[providerReview.providerName].map((condition: object, sidx: number) => {
      if (pertinentConditionIndex !== sidx) { return condition; }
      return { ...condition, name: evt.target.value };
    });

    this.setState({ providerReviews: newConditions }); // TODO: Make this a callback
  }

  private handleAddCondition = (event: any) => {
    const reviewId = event.currentTarget.id    
    const uniqueId: string = uuidv1()
    this.setState( (previousState, props) => {
      // TODO:
      // - Get a copy of the matching providerReview from previousState.providerReviews[]
      const thisReview = previousState.providerReviews.find(x => x.uuid === reviewId)
      // tslint:disable-next-line:no-console   
      console.log(thisReview)
      // - Push a pertinentCondition onto pertinentConditions[] of the copy
      if (thisReview !== undefined) {
        if (thisReview.pertinentConditions !== undefined) {
          // tslint:disable-next-line:no-console
          console.log(thisReview.pertinentConditions)   
          thisReview.pertinentConditions.push({name: "", uuid: uniqueId, diagnosisCategory: ""})
          // tslint:disable-next-line:no-console
          console.log(thisReview.pertinentConditions)   
        }
        // - Get a copy of the previousState.providerReviews[] filtered !matching
        const filteredReviews = previousState.providerReviews.filter((y) => {
          return !y.uuid.match(reviewId)
        });
        // - Push the providerReview with the added pertinentCondtion to the filtered copy
        filteredReviews.push(thisReview)
        // tslint:disable-next-line:no-console   
        console.log(filteredReviews) 
        // - Return the filtered copy
        return { providerReviews: filteredReviews }
      } else {
        return {providerReviews: previousState.providerReviews}
      }
    }) 
  }

  private handleRemoveCondition = (providerReview: IProviderReview, pertinentCondition: IPertinentCondition) => () => {
    this.setState( (previousState, props) => {
      const filteredReviews = previousState.providerReviews.filter((providerReviewItem) => {
        return !providerReviewItem.uuid.match(providerReview.uuid)
      }); 
      return {providerReviews: filteredReviews.filter((pertinentConditionItem) => {
        return !pertinentConditionItem.uuid.match(pertinentCondition.uuid)
      })} 
    })
  }
  
  private handleProviderNameChange = (idx: number) => (evt: any) => {
    const newProviders = this.state.providerReviews.map((provider, sidx) => {
      if (idx !== sidx) { return provider; }
      return { ...provider, name: evt.target.value };
    });

    this.setState({ providerReviews: newProviders }); // TODO: Make this a callback
  }
  
  private handleAddProvider = () => {
    this.setState( (previousState, props) => {
      const uniqueId: string = uuidv1();
      return {providerReviews: previousState.providerReviews.concat([{ uuid: uniqueId, providerName: '', pertinentConditions: [] }])}
    });
  }

  private handleRemoveProvider = (idx: number) => () => {
    this.setState(() => {
      // TODO
    });
  }
}