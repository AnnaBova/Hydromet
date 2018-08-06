import React, { Component } from 'react';
import { Form, Button, Tab } from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Weather from './Weather';
import TextWeather from './TextWeather';
import {
    getHydroBulletin,
    ChangeDay,
    Edit,
    ChangeWeathers,
    GiveClimateData,
    GiveWeatherObservable,
    GiveDecadeBulletin,
    ChangeObservDay,
    EditDayObserv,
    getClimateData,
    getWeatherObserv,
    GetRaditional,
    ChangeStationRaditional,
    EditRaditionalReqest,
    SetHydrometMessage,
    UpdateDate,
    UpdateRadiation,
    UpdateClimateData,
    UpdateObservData,
    UpdateObservDataStation,
} from '../redux/actions/index';
import ClimateData from './ClimateData';
import ObservableWeather from './ObservableWeather';
import DecadBulletin from './Decad_bulletin';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import Radiation from './radiation';
import '../style/hydrometeorologycalBulletin.css';

const WEEK_DAYS = [
  "Неділя",
  "Понедiлок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
];


class Hydrometeorologycal extends Component {

    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
            panas: [
                {   menuItem: 'Погода по Запоріжжю',
                    render: () => <Tab.Pane>
                        <Weather
                            data={this.props.WeatherDay}
                            index={this.state.activeIndex}
                            Submit={this.saveBulletin}
                            ChangeDay={this.ChangeDay}
                            setMessage= {this.props.setMessage}
                            updateDate = {this.updateDate}
                        />
                        </Tab.Pane> },
                {   menuItem: 'Текстова погода по Запоріжжю',
                    render: () => <Tab.Pane>
                        <TextWeather
                            data={this.props.WeatherDay}
                            ChangeDay={this.ChangeDay}
                            Submit={this.saveBulletin}
                            index={this.state.activeIndex}
                            setMessage= {this.props.setMessage}
                            updateDate = {this.updateDate}
                        />
                        </Tab.Pane> },
                {   menuItem: 'Погода по області',
                    render: () => <Tab.Pane>
                    <Weather
                        data={this.props.WeatherDay}
                        Submit={this.saveBulletin}
                        ChangeDay={this.ChangeDay}
                        setMessage= {this.props.setMessage}
                        index={this.state.activeIndex}
                        updateDate = {this.updateDate}
                    />
                    </Tab.Pane> },
                {   menuItem: 'Текстова погода по області',
                    render: () => <Tab.Pane>
                        <TextWeather
                            data={this.props.WeatherDay}
                            ChangeDay={this.ChangeDay}
                            Submit={this.saveBulletin}
                            setMessage= {this.props.setMessage}
                            updateDate = {this.updateDate}
                            index={this.state.activeIndex}
                        />
                        </Tab.Pane> },
                {   menuItem: 'Огляд погоди',
                    render: () => <Tab.Pane>
                            <ObservableWeather
                                Submit={this.handleSubmitObserv}
                                EditDay={this.handleEditDayObserv}
                                ChangeDay={this.props.ChangeObservDay}
                                ObservDay = {this.props.ObservDay}
                                ObservWeather= {this.props.ObservWeather}
                                WeatherObservableData = {this.props.WeatherObservableData}
                                setMessage= {this.props.setMessage}
                                UpdateObservData={this.props.UpdateObservData}
                                UpdateObservDataStation={this.props.UpdateObservDataStation}
                            />
                        </Tab.Pane> },
                {   menuItem: 'Кліматичні дані Запоріжжя',
                    render: () => <Tab.Pane>
                        <ClimateData
                            Submit={this.handleSubmitClimate}
                            ClimateData={this.props.ClimateData}
                            setMessage= {this.props.setMessage}
                            UpdateClimateData= {this.props.UpdateClimateData}
                        /></Tab.Pane> },
                {   menuItem: 'Декадний бюлетень',
                    render: () => <Tab.Pane>
                        <DecadBulletin SubmitDecadBulletin = {this.handleDecadBulletinSubmit} setMessage= {this.props.setMessage}/></Tab.Pane> },
                {   menuItem: 'Радіаційний фон',
                    render: () => <Tab.Pane>
                        <Radiation
                            SubmitDecadBulletin = { this.handleDecadBulletinSubmit }
                            Raditional = { this.props.Raditional }
                            EditRaditionalReqest = { this.props.EditRaditionalReqest }
                            SetMessageTrue={this.props.SetHydrometMessageTrue }
                            UpdateRadiation={this.props.UpdateRadiation}
                            ChangeStationRaditional = { this.props.ChangeStationRaditional }
                            setMessage= {this.props.setMessage}
                        /></Tab.Pane> },
            ],
        }
    }

    handleEditDayObserv = (obj) => {
        this.props.EditDayObserv(obj);
    }

    handleSubmitObserv = (value) => {
        const arr = this.props.WeatherObservableData.StationWeather.map((item, index)=>{
          if(index === value.Station)return {
            ...item,
            MaxTemperature : value.MaxTemperature,
            MinTemperature : value.MinTemperature,
            Precipitation : value.precipitation,
          }
          return item;
        });
        var obj2 = {
            ...this.props.WeatherObservableData,
            day: value.day,
            month: value.month,
            year: value.year,
            text:   value.text,
            StationWeather: arr
        }
        this.props.GiveWeatherObservable(obj2);
    }

    ChangeDay = (value) => {
        this.props.setMessage();
        this.props.ChangeDay(value);
    }

    handleDecadBulletinSubmit = (val) => {
        this.props.GiveDecadeBulletin(val);
        this.props.SetHydrometMessageTrue();
    }

    handleSubmitClimate = (value) => {
        this.props.GiveClimateData(value);
        this.props.SetHydrometMessageTrue();
    }

    handleTabChange = (e, { activeIndex }) => {
        if(activeIndex < 4){
            this.props.setMessage();
            this.props.ChangeWeathers(activeIndex);
        }
        this.setState({ activeIndex })
    }

    toDataURL = (src, callback) => {
        let image = new Image();
        image.crossOrigin = 'Anonymous';

        image.onload = function() {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.height = this.naturalHeight-1;
            canvas.width = this.naturalWidth-1;
            context.drawImage(this, 0, 0);
            var dataURL = canvas.toDataURL();
            callback(dataURL);
        };

        image.src = src;
    }

    Submit = (obj) => {
        this.props.SetHydrometMessageTrue();
        this.props.EditDay(obj, this.state.activeIndex);
    }

    updateDate = (dateString) => {
      const dates = dateString.split('.');
      const textDates = [];
      const weekDays = [];
      const enteredDate = new Date(`${+dates[2]}-${+dates[1]}-${+dates[0]}`);
    
      switch (this.state.activeIndex) {
        case 0:
          var firstDate = this.props.WeatherCityOrigin[0].date.split('.');
          break;
        case 1:
          firstDate = this.props.TextWeatherCityOrigin[0].date.split('.');
          break;
        case 2:
          firstDate = this.props.WeatherOblOrigin[0].date.split('.');
          break;
        case 3:
          firstDate = this.props.TextWeatherOblOrigin[0].date.split('.');
          break;
        default:
            break;
      }

      const oneDay = 24*60*60*1000;

      const diffDays = Math.round((enteredDate.getTime() - new Date(`${firstDate[1]}.${firstDate[0]}.${firstDate[2]}`).getTime())/(oneDay));

      // if (diffDays === 0) return;

      for (var i = 0; i < 5; i++) {
        const date = new Date(enteredDate.getTime() + 24 * 3600 * 1000 * i);
        weekDays.push(WEEK_DAYS[date.getDay()]);
        let day = date.getDate();
        day = (`${day}`.length === 1)? `0${day}` : day;
        let month = date.getMonth() + 1;
        month = (`${month}`.length === 1)? `0${month}` : month;
        textDates.push(`${day}.${month}.${enteredDate.getFullYear()}`);
      }

      const map = (item, index) => {
        item.title = weekDays[index];
        item.date = textDates[index];
        return item;
      }

      const textMap = (item, index) => {
        item.date = textDates[index];
        return item;
      }

      const obl = this.props.WeatherOblOrigin.map((this.state.activeIndex === 0)? map : item => item);
      const city = this.props.WeatherCityOrigin.map((this.state.activeIndex === 2)? map : item => item);
      const textCity = this.props.TextWeatherCityOrigin.map((this.state.activeIndex === 1)? textMap : item => item);
      const textObl = this.props.TextWeatherOblOrigin.map((this.state.activeIndex === 3)? textMap : item => item);

      if(diffDays > 0 && diffDays < 6) {
        for(let i = 0; i < diffDays; i++){
          switch (this.state.activeIndex) {
            case 0:
              city.shift();
              city.push({
                day:{
                    weather: "sun",
                    DirectionWind: "up"
                },
                night:{
                    weather: "moon",
                    DirectionWind: "up"
                },
                date: '',
                title: '',
              });
              break;
            case 2:
              obl.shift();
              obl.push({
                day:{
                    weather: "sun",
                    DirectionWind: "up"
                },
                night:{
                    weather: "moon",
                    DirectionWind: "up"
                },
                date: '',
                title: '',
              });
              break;
            case 1:
              textCity.shift();
              textCity.push({
                date: '',
              });
              break;
            case 3:
              textObl.shift();
              textObl.push({
                date: '',
              });
              break;
            default:
              break;
          }
        }
      } else if(diffDays < 0 && diffDays > -6) {
        for(let i = 0; i < -1 * diffDays; i++){
          switch (this.state.activeIndex) {
            case 0:
              city.pop();
              city.unshift({
                day:{
                    weather: "sun",
                    DirectionWind: "up"
                },
                night:{
                    weather: "moon",
                    DirectionWind: "up"
                },
                date: '',
                title: '',
              });
              break;
            case 2:
              obl.pop();
              obl.unshift({
                day:{
                    weather: "sun",
                    DirectionWind: "up"
                },
                night:{
                    weather: "moon",
                    DirectionWind: "up"
                },
                date: '',
                title: '',
              });
              break;
            case 1:
              textCity.pop();
              textCity.unshift({
                date: '',
              });
              break;
            case 3:
              textObl.pop();
              textObl.unshift({
                date: '',
              });
              break;
            default:
              break;
          }
        }
      } else if(diffDays < -6 || diffDays > 6) {
        for(let i = 0; i < 6; i ++){
          switch (this.state.activeIndex) {
            case 0:
              city.shift();
              city.push({
                day:{
                    weather: "sun",
                    DirectionWind: "up"
                },
                night:{
                    weather: "moon",
                    DirectionWind: "up"
                },
                date: '',
                title: '',
              });
              break;
            case 2:
              obl.shift();
              obl.push({
                day:{
                    weather: "sun",
                    DirectionWind: "up"
                },
                night:{
                    weather: "moon",
                    DirectionWind: "up"
                },
                date: '',
                title: '',
              });
              break;
            case 1:
              textCity.shift();
              textCity.push({
                date: '',
              });
              break;
            case 3:
              textObl.shift();
              textObl.push({
                date: '',
              });
              break;
            default:
              break;
          }
        }
      }

      this.props.UpdateDate({
        city:city.map((this.state.activeIndex === 0)? map : item => item),
        obl:obl.map((this.state.activeIndex === 2)? map : item => item),
        textCity:textCity.map((this.state.activeIndex === 1)? textMap : item => item),
        textObl:textObl.map((this.state.activeIndex === 3)? textMap : item => item),
      });
    }

    saveBulletin = () => {
      switch (this.state.activeIndex) {
        case 0:
          this.props.EditDay(this.props.WeatherCity, 0);
          break;
        case 1:
          this.props.EditDay(this.props.TextWeatherCity, 1);
          break;
        case 2:
          this.props.EditDay(this.props.WeatherObl, 2);
          break;
        case 3:
          this.props.EditDay(this.props.TextWeatherObl, 3);
          break;
        default:
          break;
      }
    }

    componentDidMount(){
        this.props.GetRaditional();
        this.props.getBuletin();
        this.props.getClimateData();
        this.props.getWeatherObserv();
        if(!localStorage.getItem('token')){
            this.props.noAuthorization();
        }
    }

    LogOut = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization();
    }

    GetWeatherTable = (array) => {
        var arr = [];
        for(var i=0; i< 5; i++){
            var text = `${array[i].date}  ${array[i].text}`;
            arr.push({
                text: text,
                margin: [0,5,0,5],
                fontSize: 11
            });
        }
        return arr;
    }
    SaveReport = () => {
      const {vfs} = vfsFonts.pdfMake;
	    pdfMake.vfs = vfs;
        this.toDataURL('http://77.120.123.202:3001/public/assets/images/herb.jpg', (img1) => {
            this.toDataURL('http://77.120.123.202:3001/public/assets/images/map.png', (img2) => {
              this.toDataURL('http://77.120.123.202:3001/public/assets/images/signature.png', (signature) => {
                var obj = {
                    pageSize: 'A4',
                    content: [
                        {
                            image: img1,
                            alignment: 'center'
                        },
                        {
                          text: 'ДЕРЖАВНА СЛУЖБА УКРАЇНИ З НАДЗВИЧАЙНИХ СИТУАЦІЙ',
                          style: 'bold',
                          alignment: 'center',
                          margin: [0,35,0,0]
                        },
                        {
                          text: 'ЗАПОРІЗЬКИЙ ОБЛАСНИЙ ЦЕНТР З ГІДРОМЕТЕОРОЛОГІЇ',
                          style: 'bold',
                          fontSize: 20,
                          alignment: 'center'
                        },
                        {
                          text: '(ЗАПОРІЗЬКИЙ ЦГМ)',
                          style: 'bold',
                          alignment: 'center'
                        },
                        {
                            text:'69095, м. Запоріжжя, пр. Соборний, 105,  тел/факс. (061) 787-62-06, 787-62-09',
                            alignment: 'center',
                        },
                        {
                            text:'E-mail: pgdzaporozh@meteo.gov.ua, zcgm@ukr.net',
                            alignment: 'center',
                        },
                        {
                            text:'Гідрометеорологічний белютень',
                            style: 'bold',
                            alignment: 'center',
                            margin: [0,35,0,0]
                        },
                        {
                            text: `№${this.props.ClimateData.number}`,
                            alignment: 'right',
                            style: 'bold'
                        },
                        {
                            text: "Прогноз погоди по Запорізькій області",
                            style: 'bold',
                            alignment: 'center',
                            margin: [0,13,0,0]
                        },
                        this.GetWeatherTable(this.props.TextWeatherObl),
                        {
                            text: "Прогноз погоди по м. Запоріжжя",
                            style: 'bold',
                            alignment: 'center',
                            margin: [0,13,0,0]
                        },
                        this.GetWeatherTable(this.props.TextWeatherCity),
                        {
                           stack: [
                                {
                                    text: 'Начальник центру',
                                    alignment: 'left'
                                },
                                {
                                    image: signature,
                                    alignment: 'right',
                                    margin: [0, 0, 30, 0]
                                },
                                {
                                    text: 'І.Г.Черник',
                                    alignment: 'right',
                                    margin:[0,-14,0,0],
                                },
                            ],
                            margin: [0,20, 0 ,0]
                        },
                        {
                            text: `Бюллетень складений о ${this.props.ClimateData.time} годині ${this.props.ClimateData.date}`,
                            margin: [0,20,0,0],
                            pageBreak: 'after'
                        },
                        {
                            text: 'Огляд погоди',

                            alignment: 'center',
                            style: 'bold'
                        },
                        {
                            margin: [0,30,0,30],
                            width: 200,
                            text: this.props.WeatherObservableData.text,
                            alignment: 'center',
                        },
                        {
                            image: img2,
                            width: 530
                        },
                        {
                            text: 'Клімітатичні дані',
                            style: 'bold',
                            alignment: 'center',
                        },
                        {
                            margin: [0,10,0,0],
                            text: 'Максимальна денна температура повітря за день зафiксовано у ' + this.props.ClimateData.MaxTemperature.date + ' роцi : ' + this.props.ClimateData.MaxTemperature.value
                        },
                        {
                            margin: [0,10,0,0],
                            text: 'Мінімальна температура повітря за ніч  зафiксовано у ' + this.props.ClimateData.MinTemperature.date + ' роцi : ' + this.props.ClimateData.MinTemperature.value
                        },
                        {
                            margin: [0,10,0,0],
                            text: 'Середня за добу температура повітря зафiксовано у ' + this.props.ClimateData.SrTemperature.date + ' роцi : ' + this.props.ClimateData.SrTemperature.value
                        }
                    ],
                    styles: {
                        bold:{
                            fontSize: 13,
                            bold: true
                        }
                    }
                }

                if(this.props.ClimateData.StormText !== ""){
                    obj.content.splice(8, 0,  {
                        text: 'Штормове попередження про найважливіші гідрометеорологічні явища ',
                        alignment: 'center',
                        style: 'bold',
                        margin: [5,20,0,0],
                    });
                    obj.content.splice(9, 0,{
                        text: this.props.ClimateData.StormText,
                        alignment: 'center',
                    });
                }
                pdfMake.createPdf(obj).download('Гідрометеорологічний белютень.pdf');
            });
          });
        });


    }

    handleSendMail = () => {
        this.props.GoTyMailCastomize();
    }

    render() {    
    return (
        <Form success={this.props.Message}>
            <Tab panes={this.state.panas} activeIndex={this.state.activeIndex} onTabChange={this.handleTabChange}></Tab>
            <Button floated="left" onClick={this.SaveReport}>Зберегти звіт</Button>
            <Button onClick={this.handleSendMail}>Надіслати користувачам</Button>
            <Button type="button" floated="right" onClick={this.LogOut}>Вийти</Button>
        </Form>);
    }
}

const mapStateToProps = (state) => ({
    Message: state.hydrometeorolog_bulletin.Message,
    Raditional: state.RaditionalReducer.raditional,
    ClimateData: state.hydrometeorolog_bulletin.ClimateData,
    WeatherDay: state.hydrometeorolog_bulletin.WeatherDay,
    WeatherCity: state.hydrometeorolog_bulletin.WeatherCity,
    WeatherObl: state.hydrometeorolog_bulletin.WeatherObl,
    SelectWeathers: state.hydrometeorolog_bulletin.SelectWeathers,
    ObservWeather: state.hydrometeorolog_bulletin.WeatherObservable,
    ObservDay: state.hydrometeorolog_bulletin.ObservDay,
    TextWeatherObl: state.hydrometeorolog_bulletin.TextWeatherObl,
    TextWeatherCity: state.hydrometeorolog_bulletin.TextWeatherCity,
    WeatherObservableData: state.hydrometeorolog_bulletin.WeatherObservableData,
    WeatherCityOrigin: state.hydrometeorolog_bulletin.WeatherCityOrigin,
    WeatherOblOrigin: state.hydrometeorolog_bulletin.WeatherOblOrigin,
    TextWeatherOblOrigin: state.hydrometeorolog_bulletin.TextWeatherOblOrigin,
    TextWeatherCityOrigin: state.hydrometeorolog_bulletin.TextWeatherCityOrigin,
});

const mapDispatchToProps = (dispatch) => ({
    SetHydrometMessageTrue: bindActionCreators(SetHydrometMessage, dispatch),
    EditRaditionalReqest: bindActionCreators(EditRaditionalReqest, dispatch),
    ChangeStationRaditional: bindActionCreators(ChangeStationRaditional, dispatch),
    GetRaditional: bindActionCreators(GetRaditional, dispatch),
    getWeatherObserv: bindActionCreators(getWeatherObserv, dispatch),
    getClimateData: bindActionCreators(getClimateData, dispatch),
    ChangeObservDay: bindActionCreators(ChangeObservDay, dispatch),
    EditDayObserv: bindActionCreators(EditDayObserv, dispatch),
    GiveDecadeBulletin: bindActionCreators(GiveDecadeBulletin, dispatch),
    GiveWeatherObservable: bindActionCreators(GiveWeatherObservable, dispatch),
    GiveClimateData: bindActionCreators(GiveClimateData, dispatch),
    ChangeWeathers: bindActionCreators(ChangeWeathers, dispatch),
    EditDay: bindActionCreators(Edit, dispatch),
    ChangeDay: bindActionCreators(ChangeDay, dispatch),
    getBuletin: bindActionCreators(getHydroBulletin, dispatch),
    UpdateDate: bindActionCreators(UpdateDate, dispatch),
    UpdateRadiation: bindActionCreators(UpdateRadiation, dispatch),
    UpdateClimateData: bindActionCreators(UpdateClimateData, dispatch),
    UpdateObservData: bindActionCreators(UpdateObservData, dispatch),
    UpdateObservDataStation: bindActionCreators(UpdateObservDataStation, dispatch),
    noAuthorization: () => dispatch(push('/signin')),
    GoTyMailCastomize: () => dispatch(push('/mail_castomize')),
    setMessage: () => dispatch({type: 'SET_HYDRO_BULLETIN_MESSAGE'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hydrometeorologycal);
