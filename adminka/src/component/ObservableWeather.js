import React, { Component } from 'react';
import { Form, Button, TextArea, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';

const InputSize = 4;

class ObservableWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      day: "",
      mounth: "январь",
      year: "",
      text:"",
      MaxTemperature: "",
      MinTemperature: "",
      precipitation: "",
      Phenomena: "sun",
      Station: "1"
    }
  }

  handelSaveValue = (obj) => {
    this.props.setMessage();
    this.setState({[obj.name]: obj.value});
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
    if(this.validator()){
      this.props.EditDay({
        ...this.props.ObservDay,
        MaxTemperature: this.state.MaxTemperature,
        MinTemperature: this.state.MinTemperature,
        Precipitation: this.state.precipitation,
        Phenomen: this.state.Phenomena
      });
      this.setState({
        MaxTemperature: "", 
        MinTemperature:"", 
        precipitation:"",
        Phenomen:""
      }, ()=> {
        this.props.Submit(this.state);
      })     
    }

  } 

  handelOnChange = (e) => {
    this.props.setMessage();
    this.setState({text:e.target.value});
  } 

  handelStationChange = (e) => {
      this.props.setMessage();
      this.props.ChangeDay(e.target.value-1);
      this.setState({
        MaxTemperature: "", 
        MinTemperature:"", 
        precipitation:"",
        Phenomen:""
      })

  }

  handelChangePhenomen = (e) => {
    this.props.setMessage();
    this.setState({Phenomena: e.target.value})
  }

  handelOnChangeMounth = (e) =>{
    this.props.setMessage();
    this.setState({mounth:e.target.value})
  }

  render() {
  return (<div >
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}/>
          <Grid.Column width={7}>
            <Message success header="Сохранение" content="Данные успешно сохранены" />
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
              saveValue={this.handelSaveValue}
            />
          </Form.Field >
          <Form.Field 
            width={InputSize}
            control="select"
            label="Месяц"
            value={this.state.mounth}
            onChange={this.handelOnChangeMounth}
          >
            <option value="январь">Январь</option>
            <option value="февраль">Февраль</option>
            <option value="апрель">Апрель</option>
            <option value="май">Май</option>
            <option value="июнь">Июнь</option>
            <option value="июль">Июль</option>
            <option value="август">Август</option>
            <option value="сентябрь">Сентябрь</option>
            <option value="октябрь">Октябрь</option>
            <option value="ноябрь">Ноябрь</option>
            <option value="декабрь">Декабрь</option>
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
          <Form.Field 
            width={InputSize} 
            control="select" 
            defaultValue={this.state.Station} 
            onChange={this.handelStationChange} 
            name ="Station" 
            label="Станции"
          >
            <option value="1">Запорожье</option>
            <option value="2">Пришиб</option>
            <option value="3">Бердянск</option>
            <option value="4">Гуляйполе</option>
            <option value="5">Ботиево</option>
            <option value="6">Кириловка</option>
            <option value="7">Мелитополь</option>
          </Form.Field>
          <Form.Field width={InputSize}>
            <InputComponent 
              value={this.state.MinTemperature}
              label="Минимальная температура" 
              name = "MinTemperature"
              saveValue={this.handelSaveValue}
            />
          </Form.Field>
          <Form.Field width={InputSize}>
            <InputComponent 
              value={this.state.MaxTemperature}
              label="Максимальная температура" 
              name = "MaxTemperature"
              saveValue={this.handelSaveValue}
            />
          </Form.Field>
          <Form.Field width={InputSize}>
            <InputComponent 
              value={this.state.precipitation}
              label="Количество осадком" 
              name = "precipitation"
              saveValue={this.handelSaveValue}
            />
          </Form.Field>
          <Form.Field width={InputSize} control="select" defaultValue={this.state.Phenomenas} name ="Phenomena" label="Феномены" onChange={this.handelChangePhenomen}>
              <option value='sun'>Солнечно</option>
              <option value='sun_cloud'>Облачно</option>
              <option value='cloud'>Пасмурно</option>
              <option value='cloud_rain_snow'>Снег с дождем</option>
              <option value='cloud_rain'>Дождь</option>
              <option value='cloud_snow'>Снег</option>
              <option value='fog'>Туман</option>
          </Form.Field> 
          <Button onClick={this.Submit}>Сохранить</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  </div>);
  }
}

export default ObservableWeather;