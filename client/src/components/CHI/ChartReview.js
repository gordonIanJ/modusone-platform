import React from 'react';
import { Form, Input, Icon, Cascader, Button, DatePicker } from 'antd';
import Unirest from 'unirest';
import stringify from 'json-stringify-pretty-compact';

let ReadModel = require('./readmodel.json');

const FormItem = Form.Item;
const { TextArea } = Input;
  
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
    let cleanAttendingProviders = values.attendingProviders.filter(val => {
      return val !== null;
    });      
    values.conditions = cleanConditions
    values.attendingProviders = cleanAttendingProviders 
    return values 
  }
                      
  makeConditionRecords = (values) => {
    var conditions = [] 
    for (var i = 0; i < values.conditions.length; i++) {
      conditions[i] = {
        reviewerEmail: values.email,
        assignedFacility: values.hospital[0],
        assignedProvider: values.assignedProvider[0],
        medicalRecordId: values.mrn,
        admissionDate: values.admissionDate,
        dischargeDate: values.dischargeDate,  
        conditionName: values.conditions[i][1], 
        conditionDiagnosisQuality: values.conditions[i][0],
        conditionNotes: values.conditionNotes[i],
        attendingProvider: values.attendingProviders[i][0],
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
              {getFieldDecorator(`attendingProviders[${k}]`, {
              rules: [{ type: 'array', required: true, message: 'Please select a provider!' }],
            })(
              <Cascader options={ReadModel.Cascaders.Providers} />
            )} 
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Condition"
            >
              {getFieldDecorator(`conditions[${k}]`, {
              rules: [{ type: 'array', required: true, message: 'Please select a condition!' }],
             })(
              <Cascader options={ReadModel.Cascaders.Conditions} />
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
        <h1>Chart Review - CHI</h1> 
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
            label="Hospital"
          >
            {getFieldDecorator('hospital', {
            rules: [{ type: 'array', required: true, message: 'Please select a hospital!' }],
          })(
            <Cascader options={ReadModel.Cascaders.Hospitals} />
          )} 
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Provider"
          >
            {getFieldDecorator('assignedProvider', {
            rules: [{ type: 'array', required: true, message: 'Please select a provider!' }],
          })(
            <Cascader options={ReadModel.Cascaders.Providers} />
          )} 
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="MySIS ID"
          >
            {getFieldDecorator('mrn', {
              rules: [{ required: true, message: 'Please input the medical record number!' }],
            })(
              <Input placeholder="MySIS ID" />
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