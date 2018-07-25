import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Form, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { getStationId, AddWeatherStation } from '../redux/actions/index';
// import { FullDataValid } from '../utils/DataValid';
import MeteoStation from './MeteoStation'

class AdminMeteostation extends Component {
    constructor(props){
        super(props);
        this.state = {
            Station: "zaporozhye",
            Message: false,
            ErrorMessage: false
        }
    }

    handleStationChange = (e) => {
        this.props.getStationId(e.target.value);
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
                <Form>
                    <Form.Field label="Станция" control="select" onChange={this.handleStationChange}>
                        <option value="zaporozhye">Запоріжжя</option>
                        <option value="berdyansk">Бердянск</option>
                        <option value="melitopol">Мелітополь</option>
                        <option value="botievye">Ботиево</option>
                        <option value="prism">Пришиб</option>
                        <option value="kyrylivka">Кирилівка</option>
                        <option value="gulyaypole">Гуляйполе</option>
                    </Form.Field>
                </Form>
              </Grid.Column>
              <MeteoStation admin={true}/>
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
