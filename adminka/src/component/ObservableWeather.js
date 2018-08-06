import React, { Component } from 'react';
import { Form, Button, TextArea, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { DayValid } from '../utils/DataValid';

const InputSize = 4;

class ObservableWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      dayDate: "",
      nigthDate: "",
      dayMounth: "січня",
      nigthMounth: "січня",
      year: "",
      text:"",
      MaxTemperature: "",
      MinTemperature: "",
      precipitation: "",
      Phenomena: "sun",
      Station: 0,
      ErrorMessage: false,
    }
  }

  handleSaveValueData = (obj) => {
    this.props.setMessage();
    this.props.UpdateObservDataStation({
      obj,
      index: this.state.Station
    });
    this.setState({ErrorMessage: false});
  }

  handleSaveValue = (event) => {
    this.props.setMessage();
    this.props.UpdateObservData(event);
  }

  validator = () => {
    if(this.props.WeatherObservableData.StationWeather[this.state.Station].MaxTemperature !== "" ||
      this.props.WeatherObservableData.StationWeather[this.state.Station].MinTemperature !== "" ||
      this.props.WeatherObservableData.StationWeather[this.state.Station].precipitation !== ""){
        return true;
      }else {
        return false;
      }
  }

  Submit = () => {
    window.scrollTo(window.scrollX, 0);
    if(DayValid(this.props.WeatherObservableData.dayDate) && 
       DayValid(this.props.WeatherObservableData.nigthDate)){
      if(this.validator()){
        this.props.EditDay({
          ...this.props.ObservDay,
          MaxTemperature: this.props.WeatherObservableData.StationWeather[this.state.Station].MaxTemperature,
          MinTemperature: this.props.WeatherObservableData.StationWeather[this.state.Station].MinTemperature,
          Precipitation: this.props.WeatherObservableData.StationWeather[this.state.Station].precipitation,
          Station: this.state.Station,
        });
        this.props.Submit({
          dayDate: this.props.WeatherObservableData.dayDate,
          dayMonth: this.props.WeatherObservableData.dayMonth,
          nigthDate: this.props.WeatherObservableData.nigthDate,
          nigthMonth: this.props.WeatherObservableData.nigthMonth,
          year: this.props.WeatherObservableData.year,
          text: this.props.WeatherObservableData.text,
          MaxTemperature: this.props.WeatherObservableData.StationWeather[this.state.Station].MaxTemperature,
          MinTemperature: this.props.WeatherObservableData.StationWeather[this.state.Station].MinTemperature,
          Precipitation: this.props.WeatherObservableData.StationWeather[this.state.Station].precipitation,
          Station: this.state.station
        });
      }
    }else{
      this.setState({ErrorMessage: true});
    }
  }

  handleOnChange = (event) => {
    this.props.setMessage();
    this.props.UpdateObservData({
      name:'text',
      value:event.target.value
    });
    this.setState({ErrorMessage: false});
  }

  handleStationChange = (e) => {
      this.props.setMessage();
      this.setState({
        ErrorMessage: false,
        Station: +e.target.value
      });
  }

  handleOnChangeMonth = (event) => {
    this.props.setMessage();
    this.props.UpdateObservData({
      name: event.target.name,
      value:event.target.value
    });
    this.setState({ErrorMessage: false});
  }

  render() {
    if(this.props.WeatherObservableData.length === 0) return 'Loading';
  return (<div >
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}/>
          <Grid.Column width={7}>
            <Message success header="Збереження" content="Дані успішно збережені" />
            <Message error header="Помилка" content="Неправильна введена дата"  visible={this.state.ErrorMessage}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column  width={5}/>
          <Grid.Column width={8}>
          <Form.Group>
            <Form.Field width={InputSize}>
              <InputComponent
                value={this.props.WeatherObservableData.dayDate}
                label="День: дата"
                name = "dayDate"
                saveValue={this.handleSaveValue}
              />
            </Form.Field >
            <Form.Field
              width={InputSize}
              control="select"
              label="Місяць"
              name="dayMounth"
              value={this.props.WeatherObservableData.dayMonth}
              onChange={this.handleOnChangeMonth}
            >
              <option value="січня">Січень</option>
              <option value="лютого">Лютий</option>
              <option value="березня">Березень</option>
              <option value="квітня">Квітень</option>
              <option value="травня">Травень</option>
              <option value="червня">Червень</option>
              <option value="липня">Липень</option>
              <option value="серпня">Серпень</option>
              <option value="вересня">Вересень</option>
              <option value="жовтня"> Жовтень</option>
              <option value="листопада">Листопад</option>
              <option value="грудня">Грудень</option>
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={InputSize}>
              <InputComponent
                value={this.props.WeatherObservableData.nigthDate}
                label="Нiч: дата"
                name = "nigthDate"
                saveValue={this.handleSaveValue}
              />
            </Form.Field >
            <Form.Field
              width={InputSize}
              control="select"
              label="Місяць"
              dayMounth="nigthMounth"
              value={this.props.WeatherObservableData.nigthMonth}
              onChange={this.handleOnChangeMonth}
            >
              <option value="січня">Січень</option>
              <option value="лютого">Лютий</option>
              <option value="березня">Березень</option>
              <option value="квітня">Квітень</option>
              <option value="травня">Травень</option>
              <option value="червня">Червень</option>
              <option value="липня">Липень</option>
              <option value="серпня">Серпень</option>
              <option value="вересня">Вересень</option>
              <option value="жовтня"> Жовтень</option>
              <option value="листопада">Листопад</option>
              <option value="грудня">Грудень</option>
            </Form.Field>
          </Form.Group>
          <Form.Field width={InputSize}>
            <InputComponent
              value={this.props.WeatherObservableData.year}
              label="Рік"
              name = "year"
              saveValue={this.handleSaveValue}
            />
          </Form.Field>
          <Form.Field width={InputSize}>
            <label>Огляд погоди</label>
            <TextArea autoHeight value={this.props.WeatherObservableData.text} onChange={this.handleOnChange}/>
          </Form.Field>
          <Form.Field
            width={InputSize}
            control="select"
            defaultValue={this.state.Station}
            onChange={this.handleStationChange}
            name ="Station"
            label="Станції"
          >
            <option value="0">Запоріжжя</option>
            <option value="1">Пришиб</option>
            <option value="2">Бердянск</option>
            <option value="3">Гуляйполе</option>
            <option value="4">Ботиево</option>
            <option value="5">Кирилівка</option>
            <option value="6">Мелітополь</option>
          </Form.Field>
          <Form.Field width={InputSize}>
            <InputComponent
              value={this.props.WeatherObservableData.StationWeather[this.state.Station].MinTemperature}
              label="Мінімальна температура"
              name = "MinTemperature"
              saveValue={this.handleSaveValueData}
            />
          </Form.Field>
          <Form.Field width={InputSize}>
            <InputComponent
                value={this.props.WeatherObservableData.StationWeather[this.state.Station].MaxTemperature}
              label="Максимальна температура"
              name = "MaxTemperature"
              saveValue={this.handleSaveValueData}
            />
          </Form.Field>
          <Form.Field width={InputSize}>
            <InputComponent
                value={this.props.WeatherObservableData.StationWeather[this.state.Station].Precipitation}
              label="Кількість опадів"
              name = "Precipitation"
              saveValue={this.handleSaveValueData}
            />
          </Form.Field>
          <Button onClick={this.Submit}>Зберегти</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  </div>);
  }
}

export default ObservableWeather;
