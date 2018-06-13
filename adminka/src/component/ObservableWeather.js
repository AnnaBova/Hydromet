import React, { Component } from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import InputComponent from './InputComponent';

const InputSize = 4;

class ObservableWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      day: "",
      mounth: "",
      year: "",
      text:""
    }
  }

  handelSaveValue = (obj) => {
    this.setState({[obj.name]: obj.value});
  }

  Submit = () => {
    this.props.Submit(this.state);
  } 

  handelOnChange = (e) => {
    this.setState({text:e.target.value});
  } 

  render() {
  return (<div >
      <Form.Field width={InputSize}>
        <InputComponent 
          value={this.state.day}
          label="День"  
          name = "day"
          saveValue={this.handelSaveValue}
        />
      </Form.Field >
      <Form.Field width={InputSize}>
        <InputComponent 
          value={this.state.mounth}
          label="Месяц" 
          name="mounth"
          saveValue={this.handelSaveValue}
        />
      </Form.Field>
      <Form.Field width={InputSize}>
        <InputComponent 
          value={this.state.year}
          label="Год" 
          name = "year"
          saveValue={this.handelSaveValue}
        />
      </Form.Field>
      <Form.Field width={InputSize}>
        <label>Осмотр погоды</label>
        <TextArea autoHeight onChange={this.handelOnChange}/>
      </Form.Field>

      <Button onClick={this.Submit}>Сохранить</Button>
  </div>);
  }
}

export default ObservableWeather;