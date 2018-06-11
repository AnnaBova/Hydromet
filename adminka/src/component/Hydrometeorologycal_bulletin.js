import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Hydrometeorologycal extends Component {

    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.noAuthorization();
        }
    }

  render() {
  return (
      <Form>
          <Form.Field >
              <label htmlFor="StormWarning">Штормовое предупреждение</label>
            <TextArea autoHeight name="StormWarning" placeholder='Tell us more' />
          </Form.Field>
      </Form>);
  }
}


const mapDispatchToProps = (dispatch) => ({
    noAuthorization: () => dispatch(push('/signup'))
});

export default connect(null,mapDispatchToProps)(Hydrometeorologycal);