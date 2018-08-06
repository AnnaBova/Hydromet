import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { FullDataValid } from '../utils/DataValid';
import { UpdateWeatherCity,
         UpdateWeatherObl } from '../redux/actions/index';

const InputSize = 16;


class Weather extends Component {
    constructor(props){
      super(props);
      this.state = {
        Message: false,
        ErrorMessage: false
      };
    }

    Submit = () => {
      window.scrollTo(window.scrollX, 0);
      if((this.props.index === 0)? FullDataValid(this.props.weatherCity[0].date) : FullDataValid(this.props.weatherCity[0].date)){
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

    handleSaveValue = (obj) => {
      this.props.setMessage();
      this.setState({[obj.name]:obj.value})
      this.setState({
        Message: false,
        ErrorMessage: false
      });
    }

    handleChangeWeather = (index, time) => (event)=>{
      this.setState({
        Message: false,
        ErrorMessage: false
      });
      const arr = (this.props.index === 0)? this.props.weatherCity.slice(0) : this.props.weatherObl.slice(0);
      arr[index][time][event.name] = event.value;
      (this.props.index === 0)? this.props.updateWeatherCity(arr[index], index) : this.props.updateWeatherObl(arr[index], index);
    }

    handleChangeSelector = (index, time) => (event)=>{
      this.setState({
        Message: false,
        ErrorMessage: false
      });
      const { name, value } = event.target;
      const arr = (this.props.index === 0)? this.props.weatherCity.slice(0) : this.props.weatherObl.slice(0);
      arr[index][time][name] = value;
      (this.props.index === 0)? this.props.updateWeatherCity(arr[index], index) : this.props.updateWeatherObl(arr[index], index);
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
      let arr = (this.props.index === 0) ? this.props.weatherCity : this.props.weatherObl;
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
              <Grid.Row>
                <Grid.Column width={3}>
                  <Form.Field width={InputSize}>
                    <InputComponent
                        value={arr[0] && arr[0].date}
                        label="Дата"
                        name="date"
                        saveValue = {this.handleDateChange}
                        placeholder="формат дд.мм.рррр"
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                {arr.map((item, index)=>{
                   return (
                     <div className = "dayInput" key={index}>

                      {item.title} <br />
                      {item.date} <br />

                      <p className = "formTitle">День</p>

                       <Grid.Column width={3}>
                       <Form.Field width={InputSize}>
                         <InputComponent
                             value = {item.day.temperature}
                             label="Температура"
                             name= "temperature"
                             saveValue = {this.handleChangeWeather(index, 'day')}
                         />
                       </Form.Field>
                       <Form.Field width={InputSize}>
                       <InputComponent
                             value={item.day.wind}
                             label="Вітер"
                             name="wind"
                             saveValue = {this.handleChangeWeather(index, 'day')}
                         />
                       </Form.Field>
                       <Form.Field
                         width={InputSize}
                         control="select"
                         defaultValue={item.day.DirectionWind}
                         label="Напрямок вітру"
                         name="DirectionWind"
                         onBlur={this.handleChangeSelector(index, 'day')}
                       >
                         <option value='down'>Північне</option>
                         <option value='up'>Південне</option>
                         <option value='right'>Західне</option>
                         <option value='left'>Східне</option>
                         <option value='rigth rot-45'>Північно-Західне</option>
                         <option value='down rot-45'>Північно-Східне</option>
                         <option value='up rot-45'>Південно-Західне</option>
                         <option value='left rot-45'>Південно-Східне</option>
                         <option value=''>Штиль</option>
                       </Form.Field>
                       <Form.Field
                         width={InputSize}
                         control="select"
                         value={item.day.weather}
                         label="Aтмосферні явища"
                         name="weather"
                         onChange={this.handleChangeSelector(index, 'day')}
                       >
                           <option value='sun'>Сонячно</option>
                           <option value='sun_cloud'>Мінлива хмарність</option>
                           <option value='cloud'>Хмарно</option>
                           <option value='shower'>Невеликий дощ</option>
                           <option value='shower_lightning'>Невеликий дощ, гроза</option>
                           <option value='rain'>Дощ</option>
                           <option value='rain_lightning'>Дощ, гроза</option>
                           <option value='rain_lightning_hail'>Дощ, гроза, град</option>
                           <option value='rain_strong'>Сильний дощ</option>
                           <option value='rain_strong_lightning'>Сильний дощ, гроза</option>
                           <option value='rain_strong_lightning_hail'>Сильний дощ, гроза, град</option>
                           <option value='snow_small'>Невеликий сніг</option>
                           <option value='snow'>Сніг</option>
                           <option value='snow_strong'>Сильний сніг</option>
                           <option value='precipitations_small'>Невеликі опади </option>
                           <option value='precipitations'>Опади, сильні опади</option>
                           <option value='fog'>Туман</option>
                           <option value='blizzard'>Хуртовина</option>
                           <option value='ice'>Ожеледь</option>
                           <option value='frosts'>Заморозки</option>
                       </Form.Field>
                       </Grid.Column>

                       <hr />
                       <p className = "formTitle">Ніч</p>

                       <Grid.Column width={3}>
                       <Form.Field width={InputSize}>
                         <InputComponent
                             value ={item.night.temperature }
                             label="Температура"
                             name= "temperature"
                             saveValue = {this.handleChangeWeather(index, 'night')}
                         />
                       </Form.Field>
                       <Form.Field width={InputSize}>
                       <InputComponent
                             value={item.night.wind }
                             label="Вітер"
                             name="wind"
                             saveValue = {this.handleChangeWeather(index, 'night')}
                         />
                       </Form.Field>
                       <Form.Field
                         width={InputSize}
                         control="select"
                         defaultValue={item.night.DirectionWind}
                         label="Напрямок вітру"
                         name="DirectionWind"
                         onBlur={this.handleChangeSelector(index, 'night')}
                       >
                         <option value='down'>Північне</option>
                         <option value='up'>Південне</option>
                         <option value='right'>Західне</option>
                         <option value='left'>Східне</option>
                         <option value='down rot-45'>Північно-Західне</option>
                         <option value='right rot-45'>Північно-Східне</option>
                         <option value='up rot-45'>Південно-Західне</option>
                         <option value='left rot-45'>Південно-Східне</option>
                         <option value=''>Штиль</option>
                       </Form.Field>
                       <Form.Field
                         width={InputSize}
                         control="select"
                         value={item.night.weather }
                         label="Aтмосферні явища"
                         name="weather"
                         onChange={this.handleChangeSelector(index, 'night')}
                       >
                           <option value='moon'>Чистий місяць</option>
                           <option value='cloud_moon'>Захмарений місяць</option>
                           <option value='cloud'>Хмарно</option>
                           <option value='shower'>Невеликий дощ</option>
                           <option value='shower_lightning'>Невеликий дощ, гроза</option>
                           <option value='rain'>Дощ</option>
                           <option value='rain_lightning'>Дощ, гроза</option>
                           <option value='rain_lightning_hail'>Дощ, гроза, град</option>
                           <option value='rain_strong'>Сильний дощ</option>
                           <option value='rain_strong_lightning'>Сильний дощ, гроза</option>
                           <option value='rain_strong_lightning_hail'>Сильний дощ, гроза, град</option>
                           <option value='snow_small'>Невеликий сніг</option>
                           <option value='snow'>Сніг</option>
                           <option value='snow_strong'>Сильний сніг</option>
                           <option value='precipitations_small'>Невеликі опади </option>
                           <option value='precipitations'>Опади, сильні опади</option>
                           <option value='fog'>Туман</option>
                           <option value='blizzard'>Хуртовина</option>
                           <option value='ice'>Ожеледь</option>
                           <option value='frosts'>Заморозки</option>
                       </Form.Field>
                       </Grid.Column>
                    </div>
                  );
                })}
              </Grid.Row>
              <Grid.Row> <Button onClick={this.Submit}>Зберегти</Button></Grid.Row>
            </Grid>
          </div>
      );
    }
}

function mapStateToProps (state) {
  return {
    weatherCity:state.hydrometeorolog_bulletin.WeatherCity,
    weatherObl:state.hydrometeorolog_bulletin.WeatherObl
  };
}

function mapDispatchToProps (dispatch) {
  return {
    updateWeatherCity: bindActionCreators(UpdateWeatherCity, dispatch),
    updateWeatherObl: bindActionCreators(UpdateWeatherObl, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
