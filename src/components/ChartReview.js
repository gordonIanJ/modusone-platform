import React from 'react';
//import { Form, Input, Tooltip, Icon, Cascader, Row, Col, Button, DatePicker, Select } from 'antd';
import { Form, Input, Icon, Cascader, Button, DatePicker } from 'antd';
//import Unirest from 'unirest';
import stringify from 'json-stringify-pretty-compact';
import { cascaderState } from '../chartReviewForHospitals/components/ChartReview/initialState' 

const FormItem = Form.Item;
  
const transformCascaderState = (cascaderState) => {
  var diagnoses = cascaderState.diagnoses
  for (var i = 0; i < diagnoses.length; i++) {
    diagnoses[i].children = cascaderState.conditions
  }
  cascaderState.diagnoses = diagnoses
  return cascaderState
}
const transformedCascaderState = transformCascaderState(cascaderState)

let uuid = 0;
class RegistrationForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false
    }
  }

  cleanValues = (values) => {
    let cleanConditions = values.conditions.filter(val => {
      return val !== null;
    });      
    let cleanProviders = values.providers.filter(val => {
      return val !== null;
    });      
    values.conditions = cleanConditions
    values.providers = cleanProviders 
    return values 
  }
                      
  transformValues = (values) => {
    var conditionsClassified = {
      omitted: [],
      misdiagnosed: [],
      unmet: [],
      accurate: [],
    } 
    var conditions = [] 
    for (var i = 0; i < values.conditions.length; i++) {
      conditions[i] = {
          provider: values.providers[i],
          condition: values.conditions[i]
      }
      switch(values.conditions[i][0]) {
        case 'Omitted':
          conditionsClassified.omitted.push(conditions[i])
          break;
        case 'Criteria Unmet':
          conditionsClassified.unmet.push(conditions[i])
          break;
        case 'Misdiagnosed':
          conditionsClassified.misdiagnosed.push(conditions[i])
          break;
        case 'Accurate':
          conditionsClassified.accurate.push(conditions[i])
          break;
        default:
          break;
      } 
    }
    for (let [key, value] of Object.entries(conditionsClassified)) {  
      if (value.length < 1) {
        delete(conditionsClassified[key])
      } 
    } 
    values.conditions = conditionsClassified
    delete(values.providers)
    return values
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const CleanValues = this.cleanValues(values)
        const TransformedValues = this.transformValues(CleanValues)
        this.formValuePre.innerText = stringify(TransformedValues);
        /*Unirest.post('https://m1-chart-review.free.beeceptor.com')
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send(CleanValues)
        .end(function (response) {
          console.log(response.body);
        });*/
      }
    });
  }
  
  remove = (k) => {
    const { form } = this.props; 
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props; 
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select date!' }],
    };
    
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const dynFieldsetItems = keys.map((k, index) => {
      return (
          <div>
            <h2>{index === 0 ? 'Pertinent Conditions' : ''}</h2>
            <h3>Condition {index + 1}</h3>
            <FormItem
              {...formItemLayout}
              label="Provider"
            >
              {getFieldDecorator(`providers[${k}]`, {
              rules: [{ type: 'array', required: true, message: 'Please select a provider!' }],
            })(
              <Cascader options={transformedCascaderState.hospitals} />
            )} 
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Condition"
            >
              {getFieldDecorator(`conditions[${k}]`, {
              rules: [{ type: 'array', required: true, message: 'Please select a condition!' }],
             })(
              <Cascader options={transformedCascaderState.diagnoses} />
            )} 
            </FormItem>
          {keys.length >= 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length < 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
          </div>
      );
    });

    return (
      <div> 
        <h1>Chart Review - Hospitals</h1> 
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Provider"
          >
            {getFieldDecorator('hospital-provider', {
            rules: [{ type: 'array', required: true, message: 'Please select a provider!' }],
          })(
            <Cascader options={transformedCascaderState.hospitals} onChange={this.handleHospitalChange}/>
          )} 
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="MRN"
          >
            {getFieldDecorator('mrn', {
              rules: [{ required: true, message: 'Please input the medical record number!' }],
            })(
              <Input placeholder="MRN" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Date of Admission"
          >
            {getFieldDecorator('admission-date', config)(
              <DatePicker />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Date of Release"
          >
            {getFieldDecorator('discharge-date', config)(
              <DatePicker />
            )}
          </FormItem>
          {dynFieldsetItems}
          <FormItem {...formItemLayout}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> Add pertinent condition 
            </Button>
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button type="primary" htmlType="submit">Deliver</Button>
          </FormItem>
        </Form>
        <pre ref={ref => this.formValuePre = ref}></pre>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;
