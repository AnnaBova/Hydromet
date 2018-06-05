import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getToken } from '../redux/actions/index';

class FormAuthorization extends Component {

  OnSubmit = (event) => {
    const user = {
      login: event.target.login.value,
      password: event.target.password.value
    }
    this.props.authorization(user);
  }

  render() {
    return (
          <Form onSubmit={this.OnSubmit}>
            <Form.Field>
              <label>Login: </label>
              <input placeholder='Login' name="login" />
            </Form.Field>
            <Form.Field>
              <label>Password: </label>
              <input placeholder='Password' type="password" name="password" />
            </Form.Field>
            <Button>Submit</Button>
          </Form>
    );
  }
}

const mapStateToDispatch = (dispatch) => ({
  authorization: bindActionCreators(getToken, dispatch)
});


export default connect(null, mapStateToDispatch)(FormAuthorization);