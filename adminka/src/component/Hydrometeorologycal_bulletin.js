import React, { Component } from 'react';
import { Form, TextArea, Button, Tab, Grid } from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Weather from './Weather';
import TextWeather from './TextWeather';
import { getHydroBulletin, ChangeDay, EditDay } from '../redux/actions/index';

class Hydrometeorologycal extends Component {

    constructor(props){
        super(props);
        this.state = {
            panas: [
                {   menuItem: 'Погода по Запорожью', 
                    render: () => <Tab.Pane><Weather data={this.props.WeatherDay} Submit={this.Submit} ChangeDay={this.ChangeDay}/></Tab.Pane> },
                {   menuItem: 'Текстовая погода по Запорожью', 
                    render: () => <Tab.Pane><TextWeather /></Tab.Pane> },
                {   menuItem: 'Погода по облости', 
                    render: () => <Tab.Pane><Weather data={this.props.WeatherDay} Submit={this.Submit} ChangeDay={this.ChangeDay}/></Tab.Pane> },
                {   menuItem: 'Текстовая погода по облости', 
                    render: () => <Tab.Pane><TextWeather /></Tab.Pane> },
                {   menuItem: 'Обзор погоды', 
                    render: () => <Tab.Pane>Tab 5</Tab.Pane> },
                {   menuItem: 'Климатические данные запорожья', 
                    render: () => <Tab.Pane>Tab 6</Tab.Pane> },
            ],
            activeIndex: 0,
        }
    }

    ChangeDay = (value) => {
        this.props.ChangeDay(value);
    }

    Submit = (obj) => {
        this.props.EditDay(obj);
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
            <Grid.Column>
            <Form.Field >
                <label htmlFor="StormWarning">Штормовое предупреждение</label>
                <TextArea autoHeight name="StormWarning" placeholder='Tell us more' />
            </Form.Field>
            <Tab panes={this.state.panas}></Tab>
            <Button>Save</Button>
            <Button type="button" onClick={this.LogOut}>Close</Button>
            </Grid.Column>
        </Form>);
    }
}

const mapStateToProps = (state) => ({
    WeatherDay: state.hydrometeorolog_bulletin.WeatherDay
});

const mapDispatchToProps = (dispatch) => ({
    EditDay: bindActionCreators(EditDay, dispatch),
    ChangeDay: bindActionCreators(ChangeDay, dispatch),
    getBuletin: bindActionCreators(getHydroBulletin, dispatch),
    noAuthorization: () => dispatch(push('/signup'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Hydrometeorologycal);