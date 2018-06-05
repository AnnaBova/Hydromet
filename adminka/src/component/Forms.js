import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Forms extends Component {

    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.noAuthorization();
        }
    }

  render() {
  return (<div>Hello world</div>);
  }
}


const mapDispatchToProps = (dispatch) => ({
    noAuthorization: () => dispatch(push('/signup'))
});

export default connect(null,mapDispatchToProps)(Forms);