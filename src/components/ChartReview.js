import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Row, Col, Button, DatePicker, Select } from 'antd';
import Unirest from 'unirest';
import stringify from 'json-stringify-pretty-compact';

const FormItem = Form.Item;


/* TODO: Derive read models for Cascaders and Selects
const hospitals = [
  {
    name: 'Ballard',
    providers: [
      'JORIELLE R BAUTISTA MD',
      'EILEEN E. CHANG ARNP'
    ]
  },
  {
    name: 'Downtown',
    providers: [
      'JENNA L. GREEN ARNP',
      'MARK O MCCABE MD'
    ]
  }
];

const providers = hospitals.map(function(hospital) {
  const children = hospital.providers.map(function(provider) { 
    return(
      {
        value: provider,
        label: provider
      }
    ) 
  });  
  return(
    { 
      value: hospital.name.toLowerCase,
      label: hospital.name,
      children: children 
    }
  )
});
*/

/*
const conditions = [
  {
    name: 'Major Depressive Disorder',
    qualities: [
      {
        frequency: [
          'single',
          'episodic'
        ],
      },
      {
        severity: [ 
          'severe',
          'active',
          'remiss'
        ]
      }
    ] 
  },
  {
    name: 'Chronic Kidney Disease' 
  },
  {
    name: 'Diabetes',
    qualities: [
      {
        type: [
          'type-1',
          'type-2'
        ]
      }
    ]
  },
  {
    name: 'Morbid Obesity'
  },
  {
    name: 'Drug Dependence',
    qualities: [
      'drug-type',
      {
        severity: [ 
          'severe',
          'active',
          'remiss'
        ]
      }
    ] 
  }
];
*/

const hospitals = [
  {
    value: 'ballard',
    label: 'Ballard',
    children: [
      {
        value: 'JORIELLE R BAUTISTA MD',
        label: 'JORIELLE R BAUTISTA MD',
      },
      {
        value: 'EILEEN E. CHANG ARNP',
        label: 'EILEEN E. CHANG ARNP',
      }

    ],
  }, 
  {
    value: 'downtown',
    label: 'Downtown',
    children: [
      {
        value: 'JENNA L. GREEN ARNP',
        label: 'JENNA L. GREEN ARNP',
      },
      {
        value: 'MARK O MCCABE MD',
        label: 'MARK O MCCABE MD',
      }
    ],
  }
];

const getProvidersByHospital = (hospitalId) => {
  var providers = Array()
  for (var hCount = 0; hCount < hospitals.length; hCount++) {
    var hospital = hospitals[hCount]
    if (hospital.value === hospitalId) { 
      var children = hospital.children
      for (var cCount = 0; cCount < children.length; cCount++) {
        var child = children[cCount]
        providers.push(child.value) 
      }
    }
  }
  console.log(providers) 
  return providers
}

const conditions = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
  }],
}];

let uuid = 0;
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        this.formValuePre.innerText = stringify(values);
        Unirest.post('https://m1-chart-review.free.beeceptor.com')
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send(values)
        .end(function (response) {
          console.log(response.body);
        });

      }
    });
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

  handleHospitalChange = (value, selectedOptions) => {
    if (selectedOptions[0] !== undefined) {
      this.setState({hospital: selectedOptions[0].label});
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const fieldsetItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFieldsetItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select date!' }],
    };
    
    let divStyle = {
      marginTop: '2em'
    };
    
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    console.log('this.state.hospital is: ' + this.state.hospital)
    const providers = getProvidersByHospital(this.state.hospital)
    console.log('providers are: ' + providers)

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
              <Cascader options={providers[this.state.hospital]} />
            )} 
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Condition"
            >
              {getFieldDecorator(`conditions[${k}]`, {
              rules: [{ type: 'array', required: true, message: 'Please select a condition!' }],
             })(
              <Cascader options={conditions} />
            )} 
            </FormItem>
          {keys.length >= 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              //disabled={keys.length < 1}
              disabled={false}
              onClick={() => this.remove(k)}
            />
          ) : null}
          </div>
      );
    });

    return (
      <div style={divStyle}> 
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
            <Cascader options={hospitals} onChange={this.handleHospitalChange}/>
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