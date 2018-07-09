import React, { Component } from 'react';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { DataValid } from '../utils/DataValid';

const InputSize = 4;

class Weather extends Component {
    constructor(props){
      super(props);
      this.state = {
        DayName: "Понедiлок",
        Phenomen:"sun",
        DirectionWind:"up",
        isDay:"day",
        NumbDay: "1",
        date: "",
        wind:"",
        temperature: "",
        day:{},
        night:{}, 
        Message: false
      }
    }

    Submit = () => {
      var nday = "";
      // eslint-disable-next-line
      if(this.state.isDay == "day"){              
        nday = "day";
        var obj = {day: {
          weather: this.state.Phenomen,
          temperature: this.state.temperature,
          wind: this.state.wind,
          DirectionWind: this.state.DirectionWind
          },
          temperature: "",
          wind: "",
          date:this.state.date,
          night:this.props.data.night,
          DayName: this.state.DayName
        };
      }
      // eslint-disable-next-line
      if(this.state.isDay == 'night') {             
        nday= "night";
        obj = { night: {
          weather: this.state.Phenomen,
          temperature: this.state.temperature,
          wind: this.state.wind,
          DirectionWind: this.state.DirectionWind
          },
          temperature: "",
          wind: "",
          date: this.state.date,
          day: this.props.data.day,
          DayName: this.state.DayName
        };
      }
      if( DataValid(this.state.date) ){
        this.setState({[nday]: {
          weather: this.state.Phenomen,
          temperature: this.state.temperature,
          wind: this.state.wind,
          DirectionWind: this.state.DirectionWind
          },
          temperature: "",
          wind: "",
          date:"",
        });
  
        this.props.Submit(this.CreateObj(obj));
      }else{
        this.setState({Message: true})
      }
    }

    handelSaveValue = (obj) => {
      this.props.setMessage();
      this.setState({[obj.name]:obj.value})
    }

    handelChangeSelector = (e) => {
      this.props.setMessage();
      this.setState({[e.target.name]:e.target.value});
    }

    handelIsDaySelector = (e) => {
      this.props.setMessage();
      var nday = "";
      // eslint-disable-next-line
      if(e.target.value == "day"){              
        nday = "night";
      }
      // eslint-disable-next-line
      if(e.target.value == 'night') {             
        nday= "day";
      }
      this.setState({[nday]: {
        weather: this.state.Phenomen,
        temperature: this.state.temperature,
        wind: this.state.wind,
        DirectionWind: this.state.DirectionWind
      }, 
      isDay: e.target.value,
      temperature: "",
      wind: "",
      });
    }

    CreateObj = (state) => {
      var obj ={
        date: state.date,
        _id: this.props.data._id,
        title: state.DayName,
        ...this.props.data,
      }
      if(this.state.day !== {}) {
        obj.day = state.day;
      }else{
        obj.day = this.props.data.day
      }
      if(this.state.night !== {}) {
        obj.night = state.night;
      }else{
        obj.night = this.props.data.night;
      }
      return obj;
    }

    handelDateSelector = (e) => {
      this.props.setMessage();
      this.props.ChangeDay(e.target.value-1);
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
                <Form.Field 
                  width={InputSize}
                  control="select"
                  value={this.state.DayName} 
                  name="DayName" 
                  onChange={this.handelChangeSelector}
                >
                  <option value="Понедiлок">Понедельник</option>
                  <option value="Вiвторок">Вторник</option>
                  <option value="Середа">Среда</option>
                  <option value="Четверг">Четверг</option>
                  <option value="П'ятниця">Пятница</option>
                  <option value="Субота">Суббота</option>
                  <option value="Неділя">Воскресенье</option>
                </Form.Field>
                <Form.Field width={InputSize}>
                  <InputComponent 
                      value={this.state.date}
                      label="Дата"
                      name="date"
                      saveValue = {this.handelSaveValue}
                      placeholder="формат дд:мм"
                  /> 
                </Form.Field>
                <Form.Field control="select" value={this.state.isDay} onChange={this.handelIsDaySelector} width={InputSize}>
                  <option value="day">День</option>
                  <option value="night">Ночь</option>
                </Form.Field>
                <Form.Field width={InputSize}>
                  <InputComponent 
                      value ={this.state.temperature }
                      label="Температура"
                      name= "temperature"
                      saveValue = {this.handelSaveValue}
                  /> 
                </Form.Field>
                <Form.Field width={InputSize}>
                <InputComponent 
                      value={this.state.wind }
                      label="Ветер"
                      name="wind"
                      saveValue = {this.handelSaveValue}
                  /> 
                </Form.Field>
                <Form.Field 
                  width={InputSize}
                  control="select" 
                  value={this.state.DirectionWind} 
                  label="Направление ветра" 
                  name="DirectionWind" 
                  onChange={this.handelChangeSelector}
                >
                    <option value='up'>Северное</option>
                    <option value='down'>Южное</option>
                    <option value='left'>Западное</option>
                    <option value='right'>Восточное</option>
                    <option value='up rot-45'>Северо-Заподное</option>
                    <option value='left rot-45'>Северо-Восточное</option>
                    <option value='down rot-45'>Юго-Западное</option>
                    <option value='right rot-45'>Юго-Восточное</option>
                </Form.Field>
                <Form.Field 
                  width={InputSize}
                  control="select"
                  value={this.state.Phenomen } 
                  label="Феномены" 
                  name="Phenomen" 
                  onChange={this.handelChangeSelector}
                >
                    <option value='sun'>Солнечно</option>
                    <option value='sun_cloud'>Облачно</option>
                    <option value='cloud'>Пасмурно</option>
                    <option value='cloud_rain_snow'>Снег с дождем</option>
                    <option value='cloud_rain'>Дождь</option>
                    <option value='cloud_snow'>Снег</option>
                    <option value='fog'>Туман</option>
                    <option value='moon'>Чистая луна</option>
                    <option value='cloud_moon'>Облочная луна</option>
                </Form.Field>
                <Button onClick={this.Submit}>Сохранить День</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
      );
    }
}

export default Weather;
