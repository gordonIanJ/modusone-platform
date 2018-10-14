import React from 'react';
import { Form, Input, Icon, Cascader, Button, DatePicker } from 'antd';
import Unirest from 'unirest';
import stringify from 'json-stringify-pretty-compact';
  
const FormItem = Form.Item;
const { TextArea } = Input;

let ReadModel = require('./readmodel.json');
let Cascaders =  { 
  'Providers': [],
  'Conditions': [],
  'Hospitals': [],
  'Groups': []
}
for (var Hospital of ReadModel['Hospitals']) {
  Cascaders['Hospitals'].push(
    {
      "label": Hospital,
      "value": Hospital 
    }
  )
}
for (var group in ReadModel['ConditionsByGroup']) {
  Cascaders['Groups'].push( 
    {
        "label": group,
        "value": group,
    }
  )
}
for (var diagnosisType of ReadModel['DiagnosisTypes']) {
  Cascaders['Conditions'].push( 
    {
        "label": diagnosisType,
        "value": diagnosisType,
        "children": []
    }
  )
}

let uuid = 0;
class RegistrationForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      group: "",
    }
  }

  cleanValues = (values) => {
    if (typeof(values.conditions) !== 'undefined') { 
      let cleanConditions = values.conditions.filter(val => {
        return val !== null;
      });
      values.conditions = cleanConditions
    }
    if (typeof(values.attendingProviders)!== 'undefined') { 
      let cleanAttendingProviders = values.attendingProviders.filter(val => {
        return val !== null;
      });
      values.attendingProviders = cleanAttendingProviders 
    }
    return values 
  }
                      
  makeRecords = (values) => {
    var conditions = [] 
    if (typeof(values.conditions) !== 'undefined') { 
      for (var i = 0; i < values.conditions.length; i++) {
        conditions[i] = {
          reviewerEmail: values.email,
          assignedGroup: values.assignedGroup[0],
          assignedProvider: values.assignedProvider[0],
          medicalRecordId: values.mrn,
          admissionDate: values.admissionDate,
          dischargeDate: values.dischargeDate,  
          conditionName: values.conditions[i][1], 
          conditionDiagnosisQuality: values.conditions[i][0],
          conditionNotes: values.conditionNotes[i],
          attendingProvider: values.attendingProviders[i][0]
        }
        if (typeof(values.assignedHospital) !== 'undefined') {
          conditions[i]['assignedHospital'] = values.assignedHospital[0]
        }
      }
    } else {
      conditions[0] = {
        reviewerEmail: values.email,
        assignedGroup: values.assignedGroup[0],
        assignedProvider: values.assignedProvider[0],
        medicalRecordId: values.mrn,
        admissionDate: values.admissionDate,
        dischargeDate: values.dischargeDate,  
        conditionName: "none", 
        conditionDiagnosisQuality: "N/A",
        conditionNotes: "N/A",
        attendingProvider: "N/A" 
      }
      if (typeof(values.assignedHospital) !== 'undefined') {
        conditions[0]['assignedHospital'] = values.assignedHospital[0]
      }
    }
    return conditions
  } 
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      const CleanValues = this.cleanValues(values)
      const ConditionRecords = this.makeRecords(CleanValues)
      this.formValuePre.innerText = stringify(ConditionRecords)
      Unirest.post('https://pertinentconditions.azurewebsites.net/api/FormHandlerHttpTriggered?code=W4/89mgbh6tFo/kepjg5a6DoAEifp78VjrcmfPRJ5xhq3IA7zxRigA==')
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
      .send(ConditionRecords)
      .end(function (response) {
        if (typeof(response.body) !== 'undefined') {console.log(JSON.stringify(response.body))}
      })
      //this.props.form.resetFields()
    })
  }
  
  remove = (k) => {
    const { form } = this.props; 
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
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
  
  onGroupCascaderChange = (value) => {
    for (var i1=0; i1<Cascaders['Conditions'].length; i1++) {
      Cascaders['Conditions'][i1]['children'] = []
    }
    Cascaders['Providers'] = [] 
    this.props.form.setFieldsValue({keys: []})
    group = value[0]
    this.setState({"group": group})
    if (typeof group !== 'undefined') {
      // Add provider options to the Provider field
      for (var Provider of ReadModel['ProvidersByGroup'][group]) {
        if (Provider['reportingName'] !== "") { 
          Cascaders['Providers'].push({
            "label": Provider['reportingName'],
            "value": Provider['reportingName']
          })
        }
      }
      // Add condition options to the Condition field of each pertinent condition fieldset 
      for (var i2=0; i2<Cascaders['Conditions'].length; i2++) {
        for (var ReadModelCondition of ReadModel['ConditionsByGroup'][group]) {
          Cascaders['Conditions'][i2]['children'].push({
            "label": ReadModelCondition,
            "value": ReadModelCondition
          })
        }
      }
    }
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
          <div key={`container + ${index}`}>
            <h2 >{index === 0 ? 'Pertinent Conditions' : ''}</h2>
            <h3 >Condition {index + 1}</h3>
            <FormItem
              {...formItemLayout}
              label="Provider"
            >
              {getFieldDecorator(`attendingProviders[${k}]`, {
              rules: [{ type: 'array', required: true, message: 'Please select a provider!' }],
            })(
              <Cascader options={Cascaders.Providers} />
            )} 
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Condition"
            >
              {getFieldDecorator(`conditions[${k}]`, {
              rules: [{ type: 'array', required: true, message: 'Please select a condition!' }],
             })(
              <Cascader options={Cascaders.Conditions} />
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
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
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
            label="Assigned Group"
          >
            {getFieldDecorator('assignedGroup', {
            rules: [{ type: 'array', required: true, message: 'Please select a group!' }],
          })(
            <Cascader options={Cascaders.Groups} onChange={this.onGroupCascaderChange} />
          )} 
          </FormItem>
          { this.state.group === "Hospitalist" && <FormItem
            {...formItemLayout}
            label="Hospital"
          >
            {getFieldDecorator('assignedHospital', {
            rules: [{ type: 'array', required: true, message: 'Please select a hospital!' }],
          })(
            <Cascader options={Cascaders.Hospitals} />
          )} 
          </FormItem> }
          <FormItem
            {...formItemLayout}
            label="Provider"
          >
            {getFieldDecorator('assignedProvider', {
            rules: [{ type: 'array', required: true, message: 'Please select a provider!' }],
          })(
            <Cascader options={Cascaders.Providers} />
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