import React, { Component } from 'react';
import { Form, Button, TextArea, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { DayValid } from '../utils/DataValid';

const InputSize = 4;

class ObservableWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      day: "",
      mounth: "січня",
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

  handleSaveValue = (obj) => {
    this.props.setMessage();
    this.setState({[obj.name]: obj.value, ErrorMessage: false});
  }

  validator = () => {
    if(this.state.MaxTemperature !== "" ||
      this.state.MinTemperature !== "" ||
      this.state.precipitation !== ""){
        return true;
      }else {
        return false;
      }
  }

  Submit = () => {
    if(DayValid(this.state.day)){
      if(this.validator()){
        this.props.EditDay({
          ...this.props.ObservDay,
          MaxTemperature: this.state.MaxTemperature,
          MinTemperature: this.state.MinTemperature,
          Precipitation: this.state.precipitation,
          Phenomen: this.state.Phenomena,
          Station: this.state.Station,
        });
        this.props.Submit(this.state);
      }
    }else{
      this.setState({ErrorMessage: true});
    }
  }

  handleOnChange = (e) => {
    this.props.setMessage();
    this.setState({text:e.target.value, ErrorMessage: false});
  }

  handleStationChange = (e) => {
      this.props.setMessage();
      this.setState({
        MaxTemperature: "",
        MinTemperature: "",
        precipitation: "",
        ErrorMessage: false,
        Station: +e.target.value
      })

  }

  handleChangePhenomen = (e) => {
    this.props.setMessage();
    this.setState({Phenomena: e.target.value, ErrorMessage: false})
  }

  handleOnChangeMounth = (e) =>{
    this.props.setMessage();
    this.setState({mounth:e.target.value, ErrorMessage: false})
  }

  render() {
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
          <Form.Field width={InputSize}>
            <InputComponent
              value={this.state.day}
              label="День"
              name = "day"
              saveValue={this.handleSaveValue}
            />
          </Form.Field >
          <Form.Field
            width={InputSize}
            control="select"
            label="Місяць"
            value={this.state.mounth}
            onChange={this.handleOnChangeMounth}
          >
            <option value="січня">Січень</option>
            <option value="лютий">Лютий</option>
            <option value="березень">Березень</option>
            <option value="квітень">Квітень</option>
            <option value="травень">Травень</option>
            <option value="червень">Червень</option>
            <option value="липень">Липень</option>
            <option value="серпень">Серпень</option>
            <option value="вересень">Вересень</option>
            <option value="жовтень"> Жовтень</option>
            <option value="листопад">Листопад</option>
            <option value="грудень">Грудень</option>
          </Form.Field>
          <Form.Field width={InputSize}>
            <InputComponent
              value={this.state.year}
              label="Рік"
              name = "year"
              saveValue={this.handleSaveValue}
            />
          </Form.Field>
          <Form.Field width={InputSize}>
            <label>Осмотр погоды</label>
            <TextArea autoHeight onChange={this.handleOnChange}/>
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
              value={this.state.MinTemperature}
              label="Мінімальна температура"
              name = "MinTemperature"
              saveValue={this.handleSaveValue}
            />
          </Form.Field>
          <Form.Field width={InputSize}>
            <InputComponent
              value={this.state.MaxTemperature}
              label="Максимальна температура"
              name = "MaxTemperature"
              saveValue={this.handleSaveValue}
            />
          </Form.Field>
          <Form.Field width={InputSize}>
            <InputComponent
              value={this.state.precipitation}
              label="Кількість опадів"
              name = "precipitation"
              saveValue={this.handleSaveValue}
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
