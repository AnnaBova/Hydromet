import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Tab, Grid, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Tabels from './Table';
import {
    GetClimateRecords,
    ChangeRecords,
    EditRecord,
    SaveRecords,
    getPhenomena,
    SavePhenomena,
    uploadDocumentRequest,
    getEvents,
    DeleteEvent,
    GetClimateCharacteristic,
    EditClimateCharacteristicReqest,
    setRecordMessageTrue,
    setRecordMessageFalse,
    setEventMessageTrue,
    setEventMessageFalse,
    uploadCaruselImage,
    getStation,
    setUpdatingEvent
} from '../redux/actions/index';
import AddPhoto from './AddPhoto';
import EventList from './EventList';
import Event from './Event';
import ClimateCharacteristic from './ClimateCharacteristic';

class Records extends Component {
    constructor(props){
        super(props);
        this.state = {
            panas: [
                {   menuItem: 'Кліматичні рекорди',
                    render: () => <Tab.Pane>
                            <Tabels
                                Submit = {this.Submit}
                                Records={this.props.Records}
                                Record={this.props.Record}
                                OnChange={this.OnChange}
                                noAuthorization={this.props.noAuthorization}
                                EditRecord={this.props.EditRecord}
                                setMessage = {this.props.setRecordMessageFalse}
                                Message = {this.props.Message}
                            />
                        </Tab.Pane> },
                {   menuItem: 'Гідрометеорологічні явища',
                    render: () => <Tab.Pane>
                            <Tabels
                                Submit = {this.Submit}
                                Records={this.props.Records}
                                Record={this.props.Record}
                                OnChange={this.OnChange}
                                noAuthorization={this.props.noAuthorization}
                                EditRecord={this.props.EditRecord}
                                setMessage = {this.props.setRecordMessageFalse}
                                Message = {this.props.Message}
                            />
                        </Tab.Pane> },
                {   menuItem: 'Додати подію',
                render: () => <Tab.Pane><Event
                    Message = {this.props.EventMessage}
                    setMessageTrue={this.props.setEventMessageTrue}
                    setMessageFalse={this.props.setEventMessageFasle}
                    UploadFile={this.props.UploadFile}
                    /></Tab.Pane> },
                {   menuItem: 'Всі події',
                render: () => <Tab.Pane><EventList setUpdatingEvent={this.props.setUpdatingEvent} data ={this.props.Events} GetEvents = {this.props.GetEvents} Delete={this.DeleteEvent}/></Tab.Pane> },
                {   menuItem: 'Кліматична характеристика області',
                render: () => <Tab.Pane>
                            <ClimateCharacteristic
                                Message = {this.props.EventMessage}
                                setMessageTrue={this.props.setEventMessageTrue}
                                setMessageFalse={this.props.setEventMessageFasle}
                                ClimateCharacteristic = {this.props.ClimateCharacteristic}
                                EditClimate={this.props.EditClimate}
                            /></Tab.Pane> },
                {   menuItem: 'Фото на сторінці станції',
                render: () => <Tab.Pane><AddPhoto
                    uploadCaruselImage={this.props.uploadCaruselImage}
                    Message = {this.props.EventMessage}
                    setMessageTrue={this.props.setEventMessageTrue}
                    setMessageFalse={this.props.setEventMessageFasle}
                    photo={this.props.photo}
                /></Tab.Pane> },
            ],
            activeIndex: 0,
        }
    }

    Submit = () => {
        if(this.state.activeIndex === 0){
            this.props.SaveRecords(this.props.Records);
            this.props.setRecordMessageTrue()
        }else{
            this.props.SavePhenomena(this.props.Records);
            this.props.setRecordMessageTrue()
        }
    }

    DeleteEvent = (value) => {
        this.props.DeleteEvent(value)
    }

    OnChange = (value) => {
        this.props.ChangeRecords(value);
    }

    ChangeTab = (e, { activeIndex }) => {
        this.setState({activeIndex});
        if(activeIndex === 1){
            this.props.getPhenomena();
        }else {
            this.props.GetRecords();
        }
    }

    LogOut = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization()
    }

    componentDidMount() {
        this.props.GetClimateCharacteristic();
        this.props.GetRecords();
    }

    render() {

        return (
            <Grid.Row>
                <Grid.Column width = {4}>
                    <Tab panes = {this.state.panas} activeIndex={this.state.activeIndex} onTabChange={this.ChangeTab}></Tab>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Button type="button" floated="right" onClick ={this.LogOut}>Вийти</Button>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

const mapStateToProps = (state) => ({
    ClimateCharacteristic: state.ClimateCharacteristic.DataArr,
    Events: state.events.Events,
    Record: state.climateRecords.Record,
    Records: state.climateRecords.Tables,
    Message: state.climateRecords.Message,
    EventMessage: state.events.Message,
    photo: state.authorization.photo,
});

const mapDispatchToProps = (dispatch) => ({
    getStation: bindActionCreators(getStation, dispatch),
    setEventMessageTrue: bindActionCreators(setEventMessageTrue, dispatch),
    setEventMessageFasle: bindActionCreators(setEventMessageFalse, dispatch),
    setRecordMessageTrue: bindActionCreators(setRecordMessageTrue, dispatch),
    setRecordMessageFalse: bindActionCreators(setRecordMessageFalse, dispatch),
    EditClimate: bindActionCreators(EditClimateCharacteristicReqest, dispatch),
    GetClimateCharacteristic: bindActionCreators(GetClimateCharacteristic, dispatch),
    DeleteEvent: bindActionCreators(DeleteEvent, dispatch),
    GetEvents : bindActionCreators(getEvents, dispatch),
    UploadFile: bindActionCreators(uploadDocumentRequest, dispatch),
    GetRecords: bindActionCreators(GetClimateRecords,  dispatch),
    ChangeRecords: bindActionCreators(ChangeRecords, dispatch),
    noAuthorization: () => dispatch(push('/signin')),
    EditRecord: bindActionCreators(EditRecord, dispatch),
    SaveRecords: bindActionCreators(SaveRecords, dispatch),
    getPhenomena: bindActionCreators(getPhenomena, dispatch),
    SavePhenomena: bindActionCreators(SavePhenomena, dispatch),
    uploadCaruselImage: bindActionCreators( uploadCaruselImage, dispatch),
    setUpdatingEvent: bindActionCreators(setUpdatingEvent, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Records);
