import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import  InputComponent  from './InputComponent';
import { getStation, AddWeather, ChangeSelectedGap, setWater, SetWaterTemperature } from '../redux/actions/index';
import '../style/meteorolog.css';

const STATION_NAMES = {
  zaporozhye:'Запоріжжя',
  prism:'Пришиб',
  kyrylivka: "Кирилівка",
  botievye: "Ботієве",
  melitopol: "Мелітополь",
  gulyaypole: "Гуляйполе",
  berdyansk: "Бердянськ",
};

class MeteoStation extends Component {
    constructor(props){
      super(props);
      this.state = {
              Message: false,
              ErrorMessage: false,
      }
    }

    componentDidMount(){
      if(!localStorage.getItem('token')){
          this.props.noAuthorization();
      }else{
          this.props.getStation();
      }
    }

    handleSubmit = (e) => {
      window.scrollTo(window.scrollX, 0);
      this.props.AddWeather(this.props.weather);
      this.props.saveWater(this.props.waterTemperature);
      this.setState({
          Message: true,
          ErrorMessage: false
      })
    }

    handleSaveValue = (index) => (event) => {
      this.props.ChangeSelectedGap({
        ...this.props.weather[index],
        Weather:{
          ...this.props.weather[index].Weather,
          [event.name]:event.value
        }
      });
      this.setState({
        Message:false
      });
    }

    OnChangeSelector = (index) => (event) => {
      this.props.ChangeSelectedGap({
        ...this.props.weather[index],
        Weather:{
          ...this.props.weather[index].Weather,
          [event.target.name]:event.target.value
        }
      });
      this.setState({
        Message:false
      });
    }

    OnChangeWater = (river) => (event) => {
      this.props.setWater({
        ...this.props.waterTemperature,
        [river]:{
          ...this.props.waterTemperature[river],
          [event.name]: event.value
        }
      });
    }

    OnChangeWaterTime = (river) => (event) => {
      this.props.setWater({
        ...this.props.waterTemperature,
        [river]:{
          ...this.props.waterTemperature[river],
          [event.target.name]: event.target.value
        }
      });
    }

    OnClick = () => {
      localStorage.removeItem('token');
      this.props.noAuthorization();
    }

    handleGygrology = () => {
      this.props.getGydrolygy();
    }

    render() {
        if(this.props.gaps.length === 0) return 'Завантаждення';
        if(this.props.water === "zaporozhye" || this.props.water === "berdyansk"){
          if(!this.props.waterTemperature) return 'Завантаждення';
        }
        return (
        <Grid>
              <Grid.Row>
              <Grid.Column width={4}/>
              <Grid.Column width={7}>
                <Message success header="Збереження" content="Дані успішно збережені" hidden={!this.state.Message}/>
                <Message error header="Помилка" content="Неправильна дата" hidden={!this.state.ErrorMessage}/>
              </Grid.Column>
              </Grid.Row>
              <div className="stationTitle">{STATION_NAMES[this.props.water]}</div>
              <Form onSubmit={this.handleSubmit} >
                <div className="inputWraper">
                  {this.props.weather.map((item, index)=>{
                    const gap = this.props.gaps[index];
                    return (<div className="inputItem" key={index}>
                              <p>{`${gap.Summer} або ${gap.Winter}`}</p>
                              <InputComponent
                                  value = {item.Weather.temperature}
                                  label="Температура"
                                  name="temperature"
                                  type="text"
                                  saveValue = {this.handleSaveValue(index)}
                              />
                              <InputComponent
                                  value = {item.Weather.wind}
                                  label="Швидкість вітру"
                                  name="wind"
                                  type="text"
                                  saveValue = {this.handleSaveValue(index)}
                              />
                          <Form.Field
                            value={item.Weather.DirectionWind}
                            label='Напрямок вітру'
                            control='select'
                            name="DirectionWind"
                            onChange={this.OnChangeSelector(index)}
                          >
                              <option value=''></option>
                              <option value='up'>Північне</option>
                              <option value='down'>Південне</option>
                              <option value='left'>Західне</option>
                              <option value='right'>Східне</option>
                              <option value='up rot-45'>Північно-Західне</option>
                              <option value='left rot-45'>Північно-Східне</option>
                              <option value='down rot-45'>Південно-Західне</option>
                              <option value='right rot-45'>Південно-Східне</option>
                          </Form.Field>
                              <InputComponent
                                  value = {item.Weather.pressure}
                                  label="Атмосферний тиск"
                                  name="pressure"
                                  type="text"
                                  saveValue = {this.handleSaveValue(index)}
                              />
                          <Form.Field
                            value = {item.Weather.phenomena}
                            label='Атмосферні явища'
                            control='select'
                            name="phenomena"
                            onChange= {this.OnChangeSelector(index)}
                          >
                              <option value=''></option>
                              <option value='sun'>Сонячно</option>
                              <option value='sun_cloud'>Хмарно</option>
                              <option value='cloud'>Похмуро</option>
                              <option value='cloud_rain_snow'>Сніг з дощем</option>
                              <option value='cloud_rain'>Дощ</option>
                              <option value='cloud_snow'>Сніг</option>
                              <option value='fog'>Туман</option>
                              <option value="mist">Мряка</option>
                              <option value="hail">Град</option>
                              <option value='blizzard'>Хуртовина</option>
                              <option value='flurry'>Шквал</option>
                              <option value='subfamily'>Поземок</option>
                              <option value='storm_hail'>Гроза, град</option>
                              <option value='dust_storm'>Пилова буря</option>
                              <option value='storm_lightning'>Гроза, дощ</option>
                              <option value='dusty'>Пил</option>
                              <option value="mist_rain">Мряка, дощ, ожеледь</option>
                              <option value="storm">Гроза </option>
                          </Form.Field>
                      </div>);
                })}
                </div>
                <Grid.Column width={4}/>
                <Grid.Column width={4}>
                {(this.props.water === "zaporozhye")?
                          <div className="nonFormInputWrapper">
                            <select type="select"
                              className="nonFormInput"
                              name = "Observable"
                              onChange = {this.OnChangeWaterTime('Dnipro')}
                              value={this.props.waterTemperature.Dnipro.Observable}
                            >
                              <option value='00'>00 або 02</option>
                              <option value='03'>03 або 05</option>
                              <option value='06'>06 або 08</option>
                              <option value='09'>09 або 11</option>
                              <option value='12'>12 або 14</option>
                              <option value='15'>15 або 17</option>
                              <option value='18'>18 або 20</option>
                              <option value='21'>21 або 23</option>
                            </select>
                            <InputComponent
                              value={this.props.waterTemperature.Dnipro.Temperature}
                              label="Температура води"
                              name="Temperature"
                              type="text"
                              saveValue = {this.OnChangeWater('Dnipro')}
                            />
                        </div> : ( this.props.water === "berdyansk")?
                        <div className="nonFormInputWrapper">
                          <select type="select"
                            className="nonFormInput"
                            name = "Observable"
                            onChange = {this.OnChangeWaterTime('Azov')}
                            value={this.props.waterTemperature.Azov.Observable}
                          >
                            <option value='00'>00 або 02</option>
                            <option value='03'>03 або 05</option>
                            <option value='06'>06 або 08</option>
                            <option value='09'>09 або 11</option>
                            <option value='12'>12 або 14</option>
                            <option value='15'>15 або 17</option>
                            <option value='18'>18 або 20</option>
                            <option value='21'>21 або 23</option>
                          </select>
                          <InputComponent
                            value={this.props.waterTemperature.Azov.Temperature}
                            className="nonFormInput"
                            label="Температура води"
                            name="Temperature"
                            type="text"
                            saveValue = {this.OnChangeWater('Azov')}
                          />
                      </div> : <div />
                }
                <Button type="submit" primary>Надіслати форму</Button>
                { this.props.water === "zaporozhye" ? <Link to="/gydrolygy"><Button type="button">Заповнити гідрологічні спостереження</Button></Link>: <div />  }
                <Button type="button" onClick = {this.OnClick} >Вийти</Button>
                </Grid.Column>
              </Form>
        </Grid>);
    }
}

const mapStateToProps = (state) => ({
    water: state.authorization.StationName,
    weather: state.currentWeather.weather,
    gaps: state.currentWeather.gaps,
    selectedGap: state.currentWeather.selectedGap,
    waterTemperature: state.currentWeather.waterTemperature,
});

const mapDispatchToProps = (dispatch) => ({
    noAuthorization: () => dispatch(push('/signin')),
    getStation: bindActionCreators(getStation ,dispatch),
    AddWeather: bindActionCreators(AddWeather, dispatch),
    ChangeSelectedGap: bindActionCreators(ChangeSelectedGap, dispatch),
    setWater: bindActionCreators(setWater, dispatch),
    saveWater: bindActionCreators(SetWaterTemperature, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeteoStation);
