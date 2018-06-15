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
    ChandeDayObserv
} from '../redux/actions/index';
import ClimateData from './ClimateData';
import ObservableWeather from './ObservableWeather';
import DecadBulletin from './Decad_bulletin';

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
                        />
                        </Tab.Pane> },
                {   menuItem: 'Текстовая погода по Запорожью', 
                    render: () => <Tab.Pane>
                        <TextWeather
                            data={this.props.WeatherDay} 
                            ChangeDay={this.ChangeDay}
                            Submit={this.Submit}
                        />
                        </Tab.Pane> },
                {   menuItem: 'Погода по облости', 
                    render: () => <Tab.Pane>
                    <Weather 
                        data={this.props.WeatherDay} 
                        Submit={this.Submit} 
                        ChangeDay={this.ChangeDay}
                    />
                    </Tab.Pane> },
                {   menuItem: 'Текстовая погода по облости', 
                    render: () => <Tab.Pane> 
                        <TextWeather 
                            data={this.props.WeatherDay}
                            ChangeDay={this.ChangeDay}
                            Submit={this.Submit}
                        />
                        </Tab.Pane> },
                {   menuItem: 'Обзор погоды', 
                    render: () => <Tab.Pane>
                            <ObservableWeather  
                                Submit={this.handelSubmitObserv}
                                ChangeDay={this.handelChangeDayObserv}
                            />
                        </Tab.Pane> },
                {   menuItem: 'Климатические данные запорожья', 
                    render: () => <Tab.Pane>
                        <ClimateData 
                            Submit={this.handelSubmitClimate}
                        /></Tab.Pane> },
                {   menuItem: 'Декадный белютень', 
                    render: () => <Tab.Pane>
                        <DecadBulletin SubmitDecadBulletin = {this.handelDecadBulletinSubmit}/></Tab.Pane> },
            ],
        }
    }

    handelChangeDayObserv = (obj) => {
        this.props.ChandeDayObserv(obj);
    }

    handelSubmitObserv = (value) => {
        var obj2 = {
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
        this.props.getBuletin()
        if(!localStorage.getItem('token')){
            this.props.noAuthorization();
        }
    }

    LogOut = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization();
    }

    render() {
    return (
        <Form>
            <Tab panes={this.state.panas} activeIndex={this.state.activeIndex} onTabChange={this.handleTabChange}></Tab>
            <Button floated="left">Сохранить отчет</Button>
            <Button type="button" floated="right" onClick={this.LogOut}>Выйти</Button>
        </Form>);
    }
}

const mapStateToProps = (state) => ({
    WeatherDay: state.hydrometeorolog_bulletin.WeatherDay,
    SelectWeathers: state.hydrometeorolog_bulletin.SelectWeathers,
    ObservWeather: state.hydrometeorolog_bulletin.WeatherObservable
});

const mapDispatchToProps = (dispatch) => ({
    ChandeDayObserv: bindActionCreators(ChandeDayObserv, dispatch),
    GiveDecadeBulletin: bindActionCreators(GiveDecadeBulletin, dispatch),
    GiveWeatherObservable: bindActionCreators(GiveWeatherObservable, dispatch),
    GiveClimateData: bindActionCreators(GiveClimateData, dispatch),
    ChangeWeathers: bindActionCreators(ChangeWeathers, dispatch),
    EditDay: bindActionCreators(Edit, dispatch),
    ChangeDay: bindActionCreators(ChangeDay, dispatch),
    getBuletin: bindActionCreators(getHydroBulletin, dispatch),
    noAuthorization: () => dispatch(push('/signup'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Hydrometeorologycal);