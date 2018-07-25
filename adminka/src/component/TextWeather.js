import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { FullDataValid } from '../utils/DataValid';
import { UpdateWeatherCityText,
         UpdateWeatherOblText } from '../redux/actions/index';

const InputSize = 16;

class TextWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      Message: false,
      ErrorMessage: false
    }
  }

  handleSaveValue = (index) => (event) => {
    this.props.setMessage();
    this.setState({
      Message: false,
      ErrorMessage: false
    });
    const arr = (this.props.index === 1)? this.props.textWeatherCity.slice(0) : this.props.textWeatherObl.slice(0);
    arr[index]['text'] = event.value;
    (this.props.index === 0)? this.props.updateWeatherCityText(arr[index], index) : this.props.updateWeatherOblText(arr[index], index);
  }

  CreateObj = () => {
    return {
      _id: this.props.data._id,
      date: this.state.date,
      text: this.state.text
    }
  }

  handleDateSelector = (e) => {
    this.props.ChangeDay(e.target.value-1);
    this.props.setMessage();
  }

  handleSubmit = () => {
    if((this.props.index === 0)? FullDataValid(this.props.textWeatherCity[0].date) : FullDataValid(this.props.textWeatherObl[0].date)){
      this.setState({
        Message: true,
        ErrorMessage: false
      });
      this.props.Submit();
    } else {
      this.setState({
        Message: false,
        ErrorMessage: true
      });
    }
  }

  handleDateChange = (event) => {
    this.setState({
      Message: false,
      ErrorMessage: false
    });
    if(!FullDataValid(event.value)) return;
    this.props.updateDate(event.value);
  }

  render() {
    let arr = (this.props.index === 1)? this.props.textWeatherCity : this.props.textWeatherObl;
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4} />
            <Grid.Column width={6}>
              <Message success header="Збереження" content="Дані успішно збережені" visible={this.state.Message}/>
              <Message error header="Помилка" content="Неправильна дата" visible={this.state.ErrorMessage}/>
            </Grid.Column>
          </Grid.Row>
          <Form.Field width={3}>
            <InputComponent
                value={arr[0] && arr[0].date}
                label="Дата"
                name="date"
                saveValue = {this.handleDateChange}
                placeholder="формат дд.мм.рррр"
            />
          </Form.Field>
          <Grid.Row>
            {arr.map((item, index)=>{
              return (
                <div className="dayInput" key = {index}>
                  <Grid.Column width={8}>
                  <Form.Field width={InputSize}>
                    {item.date} <br />
                  </Form.Field>
                  <Form.Field width={InputSize}>
                        <InputComponent
                            value={item.text}
                            label="Текст"
                            name="text"
                            saveValue = {this.handleSaveValue(index)}
                        />
                  </Form.Field>
                  </Grid.Column>
                </div>
              );
            })}
          </Grid.Row>
        </Grid>
        <Button onClick = {this.handleSubmit}>Зберегти</Button>
      </div>  );
  }
}

function mapStateToProps(state){
  return {
    textWeatherObl: state.hydrometeorolog_bulletin.TextWeatherObl,
    textWeatherCity: state.hydrometeorolog_bulletin.TextWeatherCity
  };
}

function mapDispatchToProps (dispatch) {
  return {
    updateWeatherCityText: bindActionCreators(UpdateWeatherCityText, dispatch),
    updateWeatherOblText: bindActionCreators(UpdateWeatherOblText, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextWeather);
