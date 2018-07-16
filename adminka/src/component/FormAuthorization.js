import React, { Component } from 'react';
import { Button, Form, Grid, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getToken } from '../redux/actions/index';
import { Link } from 'react-router-dom';

class FormAuthorization extends Component {
  componentDidMount(){
  }

  OnSubmit = (event) => {
    const user = {
      login: event.target.login.value,
      password: event.target.password.value
    }
    this.props.authorization(user);
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={5} />
          <Grid.Column width={5}>
            { this.props.Message ? <Message negative header="Неавторизовано" content="Шкодую, можливо ви неправильно ввели логін або пароль"/>: <div /> }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6} />
          <Grid.Column width={2}>

            <Form onSubmit={this.OnSubmit}>
              <Form.Field>
                <label>Login: </label>
                <input placeholder='Login' name="login" />
              </Form.Field>
              <Form.Field>
                <label>Password: </label>
                <input placeholder='Password' type="password" name="password" />
              </Form.Field>
              <Button>Увійти</Button>
              <br />
              <a href='http://zapcgm.com.ua/'>На головну сторінку</a>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  Message: state.authorization.Message
})

const mapStateToDispatch = (dispatch) => ({
  authorization: bindActionCreators(getToken, dispatch)
});


export default connect(mapStateToProps, mapStateToDispatch)(FormAuthorization);
