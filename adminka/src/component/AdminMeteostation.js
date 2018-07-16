import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Form, Button, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { bindActionCreators } from 'redux';
import { getStationId, AddWeatherStation } from '../redux/actions/index';
import { FullDataValid } from '../utils/DataValid';

class AdminMeteostation extends Component {
    constructor(props){
        super(props);
        this.state = {
            Station: "zaporozhye",
            TimeGaps: "00",
            temperature: "",
            DiractionWind: "up",
            wind: "",
            pressure: "",
            phenomena: "sun",
            validation: false,
            waterField: true,
            waterTemperature: "",
            date: "",
            Message: false,
            ErrorMessage: false
        }
    }

    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.noAuthorization();

        }else{
            this.props.getStationId('zaporozhye');
        }

    }

    handelStationChange = (e) => {
        this.props.getStationId(e.target.value);
        this.setState({ Station: e.target.value, Message: false, ErrorMessage: false });
    }

    handelSaveValue = (obj) => {
        this.setState({ [obj.name]:obj.value, Message: false, ErrorMessage: false });
    }

    OnChangeTimeGaps = (e) => {
        this.setState({ TimeGaps:e.target.value, Message: false, ErrorMessage: false });
    }

    OnChangeDiraction = (e) => {
        this.setState({ DiractionWind: e.target.value, Message: false, ErrorMessage: false });
    }

    OnChangePhenomena = (e) => {
        this.setState({ phenomena: e.target.value, Message: false, ErrorMessage: false });
    }

    handelSubmit = (e) => {
        const weather = {
            TimeGaps: this.state.TimeGaps,
            temperature: this.state.temperature,
            DiractionWind: this.state.DiractionWind,
            wind: this.state.wind,
            pressure: this.state.pressure,
            phenomena: this.state.phenomena,
            waterTemperature: this.state.waterTemperature,
            date: this.state.date,
            Station: this.state.Station
        }
        if(FullDataValid(this.state.date)){
            this.props.AddWeatherStation(weather);
            this.setState({
                Station: "zaporozhye",
                TimeGaps: "00",
                temperature: "",
                DiractionWind: "up",
                wind: "",
                pressure: "",
                phenomena: "sun",
                validation: false,
                waterField: true,
                waterTemperature: "",
                date: "",
                Message: true,
                ErrorMessage: false
            })
        }else{
            this.setState({ErrorMessage: true});
        }
    }

    OnClick = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization();
    }

    render() {
    return (
        <Grid>
        <Grid.Row>
            <Grid.Column width={4}/>
            <Grid.Column width={7}>
                {this.state.Message ? <Message success header="Збереження" content="Дані успішно збережені" /> : <div /> }
                {this.state.ErrorMessage ? <Message error header="Помилка" content="Неправильно введена дата" /> : <div /> }
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column  width={5}/>
            <Grid.Column width={5}>
                <Form onSubmit={this.handelSubmit}>
                    <Form.Field label="Станция" control="select" onChange={this.handelStationChange}>
                        <option value="zaporozhye">Запоріжжя</option>
                        <option value="berdyansk">Бердянск</option>
                        <option value="melitopol">Мелітополь</option>
                        <option value="botievye">Ботиево</option>
                        <option value="prism">Пришиб</option>
                        <option value="kyrylivka">Кирилівка</option>
                        <option value="gulyaypole">Гуляйполе</option>
                    </Form.Field>
                    <Form.Field  >
                        <InputComponent
                            value = {this.state.date}
                            label="Дата"
                            name="date"
                            type="text"
                            saveValue = {this.handelSaveValue}
                            placeholder = "формат дд.мм.гггг"
                        />
                    </Form.Field>
                    <Form.Field label='Час спостереження' control='select' name="TimeGaps" onChange={this.OnChangeTimeGaps}>
                        <option value='00'>00 або 02</option>
                        <option value='03'>03 або 05</option>
                        <option value='06'>06 або 08</option>
                        <option value='09'>09 або 11</option>
                        <option value='12'>12 або 14</option>
                        <option value='15'>15 або 17</option>
                        <option value='18'>18 або 20</option>
                        <option value='21'>21 або 23</option>
                    </Form.Field>
                    <Form.Field  >
                        <InputComponent
                            value = {this.state.temperature}
                            label="Температура"
                            name="temperature"
                            type="text"
                            saveValue = {this.handelSaveValue}
                        />
                    </Form.Field>
                    <Form.Field  >
                        <InputComponent
                            value = {this.state.wind}
                            label="Швидкість вітру"
                            name="wind"
                            type="text"
                            saveValue = {this.handelSaveValue}
                        />
                    </Form.Field>
                    <Form.Field label='Напрямок вітру' control='select' name="DiractionWind" onChange= {this.OnChangeDiraction}>
                        <option value='up'>Північний</option>
                        <option value='down'>Південний</option>
                        <option value='left'>Західний</option>
                        <option value='right'>Східний</option>
                        <option value='up rot-45'>Північно-Західне</option>
                        <option value='left rot-45'>Північно-Східне</option>
                        <option value='down rot-45'>Південно-Західне</option>
                        <option value='right rot-45'>Південно-Східне</option>
                    </Form.Field>
                    <Form.Field>
                        <InputComponent
                            value = {this.state.pressure}
                            label="Атмосферний тиск"
                            name="pressure"
                            type="text"
                            saveValue = {this.handelSaveValue}
                        />
                    </Form.Field>
                    <Form.Field label='Атмосферні явища' control='select' name="phenomena" onChange= {this.OnChangePhenomena}>
                        <option value='sun'>Сонячно</option>
                        <option value='sun_cloud'>Хмарно</option>
                        <option value='cloud'>Пасмурно</option>
                        <option value='cloud_rain_snow'>Сніг з дощем</option>
                        <option value='cloud_rain'>Дощ</option>
                        <option value='cloud_snow'>Сніг</option>
                        <option value='fog'>Туман</option>
                    </Form.Field>
                    { this.state.Station === "zaporozhye" || this.state.Station  === "berdyansk"?
                        (<Form.Field>
                            <InputComponent
                                value = {this.state.waterTemperature}
                                label="Температура води"
                                name="waterTemperature"
                                type="text"
                                saveValue = {this.handelSaveValue}
                            />
                        </Form.Field>): <div />
                    }
                        <Button type="submit" primary>Надіслати форму</Button>
                        <Button type="button" onClick = {this.OnClick} >Вийти</Button>
                </Form>
            </Grid.Column>
        </Grid.Row>
        </Grid>);
    }
}


const mapDispatchToProps = (dispatch) => ({
    noAuthorization: () => dispatch(push('/signin')),
    getStationId: bindActionCreators(getStationId ,dispatch),
    AddWeatherStation: bindActionCreators(AddWeatherStation, dispatch),
});

export default connect(null,mapDispatchToProps)(AdminMeteostation);
