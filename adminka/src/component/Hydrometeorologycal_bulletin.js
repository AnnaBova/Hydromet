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
    EditRaditionalReqest
} from '../redux/actions/index';
import ClimateData from './ClimateData';
import ObservableWeather from './ObservableWeather';
import DecadBulletin from './Decad_bulletin';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import Radiation from './ radiation';

class Hydrometeorologycal extends Component {

    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
            panas: [
                {   menuItem: 'Погода по Запорожью', 
                    render: () => <Tab.Pane>
                        <Weather 
                            data={this.props.WeatherDay} 
                            Submit={this.Submit} 
                            ChangeDay={this.ChangeDay}
                            setMessage= {this.props.setMessage}
                        />
                        </Tab.Pane> },
                {   menuItem: 'Текстовая погода по Запорожью', 
                    render: () => <Tab.Pane>
                        <TextWeather
                            data={this.props.WeatherDay} 
                            ChangeDay={this.ChangeDay}
                            Submit={this.Submit}
                            setMessage= {this.props.setMessage}
                        />
                        </Tab.Pane> },
                {   menuItem: 'Погода по облости', 
                    render: () => <Tab.Pane>
                    <Weather 
                        data={this.props.WeatherDay} 
                        Submit={this.Submit} 
                        ChangeDay={this.ChangeDay}
                        setMessage= {this.props.setMessage}
                    />
                    </Tab.Pane> },
                {   menuItem: 'Текстовая погода по облости', 
                    render: () => <Tab.Pane> 
                        <TextWeather 
                            data={this.props.WeatherDay}
                            ChangeDay={this.ChangeDay}
                            Submit={this.Submit}
                            setMessage= {this.props.setMessage}
                        />
                        </Tab.Pane> },
                {   menuItem: 'Обзор погоды', 
                    render: () => <Tab.Pane>
                            <ObservableWeather  
                                Submit={this.handelSubmitObserv}
                                EditDay={this.handelEditDayObserv}
                                ChangeDay={this.props.ChangeObservDay}
                                ObservDay = {this.props.ObservDay}
                                ObservWeather= {this.props.ObservWeather}
                                WeatherObservableData = {this.props.WeatherObservableData}
                                setMessage= {this.props.setMessage}
                            />
                        </Tab.Pane> },
                {   menuItem: 'Климатические данные запорожья', 
                    render: () => <Tab.Pane>
                        <ClimateData 
                            Submit={this.handelSubmitClimate}
                            ClimateData={this.props.ClimateData}
                            setMessage= {this.props.setMessage}
                        /></Tab.Pane> },
                {   menuItem: 'Декадный белютень', 
                    render: () => <Tab.Pane>
                        <DecadBulletin SubmitDecadBulletin = {this.handelDecadBulletinSubmit} setMessage= {this.props.setMessage}/></Tab.Pane> },
                {   menuItem: 'Радиационный фон', 
                    render: () => <Tab.Pane>
                        <Radiation 
                            SubmitDecadBulletin = { this.handelDecadBulletinSubmit }
                            Raditional = { this.props.Raditional }
                            EditRaditionalReqest = { this.props.EditRaditionalReqest } 
                            ChangeStationRaditional = { this.props.ChangeStationRaditional }
                            setMessage= {this.props.setMessage}
                        /></Tab.Pane> },
            ],
        }
    }

    handelEditDayObserv = (obj) => {
        this.props.EditDayObserv(obj);
    }

    handelSubmitObserv = (value) => {
        var obj2 = {
            ...this.props.WeatherObservableData,
            day: value.day,
            mounth: value.mounth,
            year: value.year,
            text:   value.text,
            StationWeather: this.props.ObservWeather
        }
        this.props.GiveWeatherObservable(obj2);
    }

    ChangeDay = (value) => {
        this.props.ChangeDay(value);
    }

    handelDecadBulletinSubmit = (val) => {
        this.props.GiveDecadeBulletin(val);
    }

    handelSubmitClimate = (value) => {
        this.props.GiveClimateData(value);     
    }

    handleTabChange = (e, { activeIndex }) => {
        if(activeIndex < 4){
            this.props.ChangeWeathers(activeIndex);
        }
        this.setState({ activeIndex })
    }

    toDataURL = (src, callback) => {
        var image = new Image();
        image.crossOrigin = 'Anonymous';
     
        image.onload = function() {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            context.drawImage(this, 0, 0);
            var dataURL = canvas.toDataURL('image/jpeg');
            callback(dataURL);
        };
        
        image.src = src;
    }

    Submit = (obj) => {
        const newLocal =  this.props.SelectWeathers.map(item => {
            //eslint-disable-next-line
            if (item._id == obj._id) {
                item = obj;
            }
            return item;
        });
        this.props.EditDay(newLocal, this.state.activeIndex);
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
        this.toDataURL('http://77.120.115.201:3001/public/assets/images/doc_header.png', (img1) => { 
            this.toDataURL('http://77.120.115.201:3001/public/assets/images/map.png', (img2) => {
                var obj = {
                    pageSize: 'A4',
                    content: [
                        {
                            image: img1,
                            width:530
                        },
                        {
                            text:'Гидрометрический белютень',
                            style: 'bold',
                            alignment: 'center',
                            margin: [0,35,0,0]
                        },
                        {
                            text:this.props.ClimateData.day + ' ' + this.props.ClimateData.mounth + ' ' + this.props.ClimateData.year + ' року ',
                            style: 'bold',
                            margin: [0,13,0,0]
                        },
                        {
                            text: '№207',
                            alignment: 'right',
                            style: 'bold',
                            margin: [0,-15,0,0]
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
                                    text: 'І.Г.Черник',
                                    alignment: 'right',
                                    margin:[0,-14,0,0],
                                }
                            ],
                            margin: [0,20, 0 ,0]
                        }, 
                        {
                            text: 'Бюллетень складений ' + this.props.ClimateData.DateBulletin,
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
                    obj.content.splice(4, 0,  {
                        text: 'Штормове попередження про найважливіші гідрометеорологічні явища ',
                        alignment: 'center',
                        style: 'bold',
                        margin: [5,20,0,0],
                    });
                    obj.content.splice(5, 0,{
                        text: this.props.ClimateData.StormText,
                        alignment: 'center',
                    });
                }
                pdfMake.createPdf(obj).download('гидрометрический белютень.pdf');
            });
        });
        
        
    }

    handelSendMail = () => {
        this.props.GoTyMailCastomize();
    }

    render() {
    return (
        <Form success={this.props.Message}>
            <Tab panes={this.state.panas} activeIndex={this.state.activeIndex} onTabChange={this.handleTabChange}></Tab>
            <Button floated="left" onClick={this.SaveReport}>Сохранить отчет</Button>
            <Button onClick={this.handelSendMail}>Отправить пользователям</Button>
            <Button type="button" floated="right" onClick={this.LogOut}>Выйти</Button>
        </Form>);
    }
}

const mapStateToProps = (state) => ({
    Message: state.hydrometeorolog_bulletin.Message,
    Raditional: state.RaditionalReducer.raditional,
    ClimateData: state.hydrometeorolog_bulletin.ClimateData,
    WeatherDay: state.hydrometeorolog_bulletin.WeatherDay,
    SelectWeathers: state.hydrometeorolog_bulletin.SelectWeathers,
    ObservWeather: state.hydrometeorolog_bulletin.WeatherObservable,
    ObservDay: state.hydrometeorolog_bulletin.ObservDay,
    TextWeatherObl: state.hydrometeorolog_bulletin.TextWeatherObl,
    TextWeatherCity: state.hydrometeorolog_bulletin.TextWeatherCity,
    WeatherObservableData: state.hydrometeorolog_bulletin.WeatherObservableData
});

const mapDispatchToProps = (dispatch) => ({
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
    noAuthorization: () => dispatch(push('/signup')),
    GoTyMailCastomize: () => dispatch(push('/mail_castomize')),
    setMessage: () => dispatch({type: 'SET_HYDRO_BULLETIN_MESSAGE'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hydrometeorologycal);