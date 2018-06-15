import React, { Component } from 'react';
import { Form, Button, TextArea, Grid } from 'semantic-ui-react';
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
      Station: "zaparozhye"
    }
  }

  handelSaveValue = (obj) => {
    this.setState({[obj.name]: obj.value});
  }

  Submit = () => {
    this.props.ChangeDay({
      Station: this.state.Station,
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
    })
    this.props.Submit(this.state);
  } 

  handelOnChange = (e) => {
    this.setState({text:e.target.value});
  } 

  handelStationChange = (e) => {
    this.props.ChangeDay({
      Station: this.state.Station,
      MaxTemperature: this.state.MaxTemperature,
      MinTemperature: this.state.MinTemperature,
      Precipitation: this.state.precipitation,
      Phenomen: this.state.Phenomena
    });
    this.setState({
      Station: e.target.value, 
      MaxTemperature: "", 
      MinTemperature:"", 
      precipitation:"",
      Phenomen:""
    })
  }

  handelOnChangeMounth = (e) =>{
    this.setState({mounth:e.target.value})
  }

  render() {
  return (<div >
      <Grid>
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
        <option value="zaparozhye">Запорожье</option>
        <option value="prism">Пришиб</option>
        <option value="berdyansk">Бердянск</option>
        <option value="gulyaypole">Гуляйполе</option>
        <option value="botievye">Ботиево</option>
        <option value="kyrylivka">Кириловка</option>
        <option value="melitopol">Мелитополь</option>
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
      <Form.Field width={InputSize} control="select" defaultValue={this.state.Phenomenas} name ="Phenomena" label="Феномены">
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
      </Grid>
  </div>);
  }
}

export default ObservableWeather;