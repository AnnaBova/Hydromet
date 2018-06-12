import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import InputComponent from './InputComponent';

class TextWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      date:"",
      text:""
    }
  }

  handelSaveValue = (obj) => {
    this.setState({[obj.name]:obj.value})
  }

  render() {
    return (
      <div>
        <Form.Field control="select">
              <option>1 день</option>
              <option>2 день</option>
              <option>3 день</option>
              <option>4 день</option>
              <option>5 день</option>
        </Form.Field>
        <Form.Field>
              <InputComponent 
                  value={this.state.date}
                  label="Дата"
                  name="date"
                  saveValue = {this.handelSaveValue}
              /> 
        </Form.Field>
        <Form.Field>
              <InputComponent 
                  value={this.state.text}
                  label="Текст"
                  name="text"
                  saveValue = {this.handelSaveValue}
              /> 
        </Form.Field>
      </div>  );
  }
}

export default TextWeather;
