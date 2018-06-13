import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Tab, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Tabels from './Table';
import { GetClimateRecords, ChangeRecords, EditRecord, SaveRecords, getPhenomena, SavePhenomena } from '../redux/actions/index';
import Event from './Event';

class Records extends Component {
    constructor(props){
        super(props);
        this.state = {
            panas: [
                {   menuItem: 'Климатические рекорды', 
                    render: () => <Tab.Pane>
                            <Tabels 
                                Submit = {this.Submit}
                                Records={this.props.Records} 
                                Record={this.props.Record} 
                                OnChange={this.OnChange} 
                                noAuthorization={this.props.noAuthorization}
                                EditRecord={this.props.EditRecord}
                            />
                        </Tab.Pane> },
                {   menuItem: 'Стихийные феномены', 
                    render: () => <Tab.Pane>
                            <Tabels 
                                Submit = {this.Submit}
                                Records={this.props.Records} 
                                Record={this.props.Record} 
                                OnChange={this.OnChange} 
                                noAuthorization={this.props.noAuthorization}
                                EditRecord={this.props.EditRecord}
                            />
                        </Tab.Pane> },
                {   menuItem: 'События', 
                render: () => <Tab.Pane><Event /></Tab.Pane> }
            ],
            activeIndex: 0,
        }
    }

    Submit = () => {
        if(this.state.activeIndex === 0){
            this.props.SaveRecords(this.props.Records);
        }else{
            this.props.SavePhenomena(this.props.Records);
        }
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

    componentDidMount() {
        this.props.GetRecords();
    }

    render() {

        return (
        <Grid.Column width = {4}>
            <Tab panes = {this.state.panas} activeIndex={this.state.activeIndex} onTabChange={this.ChangeTab}></Tab> 
        </Grid.Column>
        );
    }
}

const mapStateToProps = (state) => ({
    Record: state.climateRecords.Record,
    Records: state.climateRecords.Tables,
});

const mapDispatchToProps = (dispatch) => ({
    GetRecords: bindActionCreators(GetClimateRecords,  dispatch),
    ChangeRecords: bindActionCreators(ChangeRecords, dispatch),
    noAuthorization: () => dispatch(push('/signup')),
    EditRecord: bindActionCreators(EditRecord, dispatch),
    SaveRecords: bindActionCreators(SaveRecords, dispatch),
    getPhenomena: bindActionCreators(getPhenomena, dispatch),
    SavePhenomena: bindActionCreators(SavePhenomena, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Records);