import React from 'react';
import { Formik } from 'formik';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const ChartReview = () => (
  <div>
    <h1>Chart Review</h1>
    {/*
          The benefit of the render prop approach is that you have full access to React's
          state, props, and composition model. Thus there is no need to map outer props
          to values...you can just set the initial values, and if they depend on props / state
          then--boom--you can directly access to props / state.
          The render prop accepts your inner form component, which you can define separately or inline
          totally up to you:
          - `<Formik render={props => <form>...</form>}>`
          - `<Formik component={InnerForm}>`
          - `<Formik>{props => <form>...</form>}</Formik>` (identical to as render, just written differently)
        */}
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(
        values,
        { setSubmitting, setErrors /* setValues and other goodies */ }
      ) => {
        /*LoginToMyApp(values).then( TODO
          user => {
            setSubmitting(false);
            // do whatevs...
            // props.updateUser(user)
          },
          errors => {
            setSubmitting(false);
            // Maybe transform your API's errors into the same shape as Formik's
            //setErrors(transformMyApiErrors(errors)); TODO
          }
        );*/
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormItem> 
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          </FormItem>
          {touched.email && errors.email && <div>{errors.email}</div>}
          <FormItem>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          </FormItem>
          {touched.password && errors.password && <div>{errors.password}</div>}
          <FormItem>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
          </FormItem>
        </Form>
      )}
    />
  </div>
);

export default ChartReview;
