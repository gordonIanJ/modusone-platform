import React from 'react';
import { Form, Input, Icon, Cascader, Button, DatePicker } from 'antd';
import Unirest from 'unirest';
import stringify from 'json-stringify-pretty-compact';
import { cascaderState } from '../initialState' 

const FormItem = Form.Item;
const { TextArea } = Input;
  
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
                      
  makeConditionRecords = (values) => {
    var conditions = [] 
    for (var i = 0; i < values.conditions.length; i++) {
      conditions[i] = {
        email: values.email,
        assignedHospital: values.hospitalProvider[0],
        assignedProvider: values.hospitalProvider[1],
        mrn: values.mrn,
        admissionDate: values.admissionDate,
        dischargeDate: values.dischargeDate,  
        conditionName: values.conditions[i][1], 
        conditionDiagnosisQuality: values.conditions[i][0],
        conditionNotes: values.conditionNotes[i],
        attendingHospital: values.providers[i][0],
        attendingProvider: values.providers[i][1] 
      }
    }
    return conditions
  } 
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const CleanValues = this.cleanValues(values)
        const ConditionRecords = this.makeConditionRecords(CleanValues)
        this.formValuePre.innerText = stringify(ConditionRecords)
        Unirest.post('https://pertinentconditions.azurewebsites.net/api/FormHandlerHttpTriggered?code=W4/89mgbh6tFo/kepjg5a6DoAEifp78VjrcmfPRJ5xhq3IA7zxRigA==')
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send(ConditionRecords)
        .end(function (response) {
          console.log(JSON.stringify(response.body))
        })
        //this.props.form.resetFields()
      }
    })
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
            <FormItem
              {...formItemLayout}
              label="Condition Notes"
            >
              {getFieldDecorator(`conditionNotes[${k}]`, {
                rules: [{
                  required: false,
                }],
              })(
                <TextArea />
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
            {getFieldDecorator('hospitalProvider', {
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
            {getFieldDecorator('admissionDate', config)(
              <DatePicker />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Date of Release"
          >
            {getFieldDecorator('dischargeDate', config)(
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