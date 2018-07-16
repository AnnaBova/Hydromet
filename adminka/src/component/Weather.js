import React, { Component } from 'react';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { DataValid } from '../utils/DataValid';

const InputSize = 16;

const DAY_DEFAULT = {
  weekDay: 0,
  day:{
    Phenomen:"sun",
    DirectionWind:"up",
    wind:"",
    temperature: "",
  },
  night:{
    Phenomen:"sun",
    DirectionWind:"up",
    wind:"",
    temperature: "",
  }
};

const WEEK_DAYS = [
  "Понедiлок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Суббота",
  "Неділя"
];

class Weather extends Component {
    constructor(props){
      super(props);

      this.state = {
        DayName: 4,
        date: "",
        days: [],
        Message: false
      };

      let daysArray = [
        Object.assign({},DAY_DEFAULT),
        Object.assign({},DAY_DEFAULT),
        Object.assign({},DAY_DEFAULT),
        Object.assign({},DAY_DEFAULT),
        Object.assign({},DAY_DEFAULT),
      ];

      daysArray = daysArray.map((item, index)=>{
        let nextDay = item.weekDay + this.state.DayName + index;
        item.weekDay = (nextDay > 6)? -1 + (nextDay - 6) : nextDay;
        return item;
      });

      this.state.days = daysArray;
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
                  <Message success header="Збереження" content="Дані успішно збережені" />
                  <Message error header="Помилка" content="Неправильна дата" visible={this.state.Message}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Form.Field
                    width={InputSize}
                    control="select"
                    value={this.state.DayName}
                    name="DayName"
                    onChange={this.handelChangeSelector}
                  >
                    <option value={0}>Понедiлок</option>
                    <option value={1}>Вiвторок</option>
                    <option value={2}>Середа</option>
                    <option value={3}>Четверг</option>
                    <option value={4}>П’ятниця</option>
                    <option value={5}>Субота</option>
                    <option value={6}>Неділя</option>
                  </Form.Field>
                  <Form.Field width={InputSize}>
                    <InputComponent
                        value={this.state.date}
                        label="Дата"
                        name="date"
                        saveValue = {this.handelSaveValue}
                        onchange = {this.handleChangeTest}
                        placeholder="формат дд.мм"
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                {/*<Grid.Column  width={5}/>*/}
                {this.state.days.map((item)=>{
                   return (
                     <div className = "dayInput">
                      {WEEK_DAYS[item.weekDay]} <br />

                      <span className = "formTitle">День</span>

                       <Grid.Column width={3}>
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
                             label="Вітер"
                             name="wind"
                             saveValue = {this.handelSaveValue}
                         />
                       </Form.Field>
                       <Form.Field
                         width={InputSize}
                         control="select"
                         value={this.state.DirectionWind}
                         label="Напрямок вітру"
                         name="DirectionWind"
                         onChange={this.handelChangeSelector}
                       >
                         <option value='up'>Північне</option>
                         <option value='down'>Південне</option>
                         <option value='left'>Західне</option>
                         <option value='right'>Східне</option>
                         <option value='up rot-45'>Північно-Західне</option>
                         <option value='left rot-45'>Північно-Східне</option>
                         <option value='down rot-45'>Південно-Західне</option>
                         <option value='right rot-45'>Південно-Східне</option>
                       </Form.Field>
                       <Form.Field
                         width={InputSize}
                         control="select"
                         value={this.state.Phenomen }
                         label="Феномени"
                         name="Phenomen"
                         onChange={this.handelChangeSelector}
                       >
                           <option value='sun'>Сонячно</option>
                           <option value='sun_cloud'>Хмарно</option>
                           <option value='cloud'>Похмуро</option>
                           <option value='cloud_rain_snow'>Сніг з дощем</option>
                           <option value='cloud_rain'>Дощ</option>
                           <option value='cloud_snow'>Сніг</option>
                           <option value='fog'>Туман</option>
                           <option value='moon'>Чистий місяць</option>
                           <option value='cloud_moon'>Захмарений місяцьа</option>
                       </Form.Field>
                       </Grid.Column>

                       <span className = "formTitle">Ніч</span>

                       <Grid.Column width={3}>
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
                             label="Вітер"
                             name="wind"
                             saveValue = {this.handelSaveValue}
                         />
                       </Form.Field>
                       <Form.Field
                         width={InputSize}
                         control="select"
                         value={this.state.DirectionWind}
                         label="Напрямок вітру"
                         name="DirectionWind"
                         onChange={this.handelChangeSelector}
                       >
                         <option value='up'>Північне</option>
                         <option value='down'>Південне</option>
                         <option value='left'>Західне</option>
                         <option value='right'>Східне</option>
                         <option value='up rot-45'>Північно-Західне</option>
                         <option value='left rot-45'>Північно-Східне</option>
                         <option value='down rot-45'>Південно-Західне</option>
                         <option value='right rot-45'>Південно-Східне</option>
                       </Form.Field>
                       <Form.Field
                         width={InputSize}
                         control="select"
                         value={this.state.Phenomen }
                         label="Феномени"
                         name="Phenomen"
                         onChange={this.handelChangeSelector}
                       >
                           <option value='sun'>Сонячно</option>
                           <option value='sun_cloud'>Хмарно</option>
                           <option value='cloud'>Похмуро</option>
                           <option value='cloud_rain_snow'>Сніг з дощем</option>
                           <option value='cloud_rain'>Дощ</option>
                           <option value='cloud_snow'>Сніг</option>
                           <option value='fog'>Туман</option>
                           <option value='moon'>Чистий місяць</option>
                           <option value='cloud_moon'>Захмарений місяцьа</option>
                       </Form.Field>
                       </Grid.Column>
                    </div>
                  );
                })}


              </Grid.Row>
              <Grid.Row> <Button onClick={this.Submit}>Зберегти день</Button></Grid.Row>
            </Grid>
          </div>
      );
    }
}

export default Weather;
