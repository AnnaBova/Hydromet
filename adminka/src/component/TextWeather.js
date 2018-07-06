import React, { Component } from 'react';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { DataValid } from '../utils/DataValid';

const InputSize = 4;

class TextWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      date:"",
      text:"",
      Message: false,
    }
  }

  handelSaveValue = (obj) => {
    this.props.setMessage();
    this.setState({[obj.name]:obj.value})
  }

  CreateObj = () => {
    return {
      _id: this.props.data._id,
      date: this.state.date,
      text: this.state.text
    }
  }

  handelDateSelector = (e) => {
    this.props.ChangeDay(e.target.value-1);
    this.props.setMessage();
  }

  handelSubmit = () => {
    if(DataValid(this.state.date)){
      this.props.Submit(this.CreateObj());
      this.setState({
        date: "",
        text: "",
        Message: false,
      });
    }else{
      this.setState({Message: true});
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4} />
            <Grid.Column width={6}>
              <Message success header="Сохранение" content="Данные успешно сохранены "/>
              <Message error header="Ошибка" content="Неправильная дата" visible={this.state.Message}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column  width={5}/>
            <Grid.Column width={8}>
            <Form.Field control="select" onChange={this.handelDateSelector} width={InputSize}>
              <option value="1">1 день</option>
              <option value="2">2 день</option>
              <option value="3">3 день</option>
              <option value="4">4 день</option>
              <option value="5">5 день</option>
            </Form.Field>
            <Form.Field width={InputSize}>
                  <InputComponent 
                      value={this.state.date}
                      label="Дата"
                      name="date"
                      saveValue = {this.handelSaveValue}
                      placeholder="формат дд.мм"
                  /> 
            </Form.Field>
            <Form.Field width={InputSize}>
                  <InputComponent 
                      value={this.state.text}
                      label="Текст"
                      name="text"
                      saveValue = {this.handelSaveValue}
                  /> 
            </Form.Field>
            <Button onClick = {this.handelSubmit}>Сохранить день</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>  );
  }
}

export default TextWeather;
