import React, { Component } from 'react';
import { Form, Grid, Button, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import InputComponent from './InputComponent';
import { getAirPollution, ChangeMatter, postEditMatter } from '../redux/actions/index';

class Forms extends Component {
    constructor(props){

        super(props);
        this.state = {
            Matter: "0",
            Post9: "",
            Post10: "",
            Post11: "",
            Post12: "",
            Post13: "",
        }
    }

    componentDidMount(){
        this.props.getAirPollution();
        if(!localStorage.getItem('token')){
            this.props.noAuthorization();
        }
    }

    handleOnClick = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization();
    }

    handleSaveValue = (obj) => {
        this.props.Message && this.props.setMessage();
        this.setState({[obj.name]:obj.value});
    }

    Validation = () => {
        if(
            this.state.Post9 === "" ||
            this.state.Post10 === "" ||
            this.state.Post11 === "" ||
            this.state.Post12 === "" ||
            this.state.Post13 === ""){
            return false;
        }else {
            return true;
        }
    }

    handleOnChange = (e) => {
        this.setState({
            Matter:e.target.value,
            Post9: "",
            Post10: "",
            Post11: "",
            Post12: "",
            Post13: "",
        });

        this.props.ChangeMatter(e.target.value);
        this.props.Message && this.props.setMessage();
    }

    handleOnClickSave = () => {
        if(this.Validation()){
            this.props.editMatter({
                ...this.props.Matter,
                data: [
                    this.state.Post9,
                    this.state.Post10,
                    this.state.Post11,
                    this.state.Post12,
                    this.state.Post13
                ]
            });
        }
        this.setState({
            Matter:this.state.Matter
        });
    }

    render() {
        return (
            <Grid>
                <Grid.Column width={6}/>
                <Grid.Column width={3}>
                    <h3>Діаграма Забруднення повітря</h3>
                    {this.props.Message ?   <Message success header="Збереження" content="Дані успішно збережені" /> : <div />}
                    <Form>
                        <Form.Field
                            control="select"
                            value={this.state.Matter}
                            onChange={this.handleOnChange}
                        >
                            {this.props.AirData.map((item, index) =>{
                              return (<option key={index} value={`${index}`}>{item.label}</option>)
                            })}
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.state.Post9}
                                label="Пост №9"
                                name = "Post9"
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.state.Post10}
                                label="Пост №10"
                                name ="Post10"
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.state.Post11}
                                label="Пост №11"
                                name="Post11"
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.state.Post12}
                                label="Пост №12"
                                name="Post12"
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.state.Post13}
                                label="Пост №13"
                                name="Post13"
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Button primary onClick={this.handleOnClickSave}>Зберегти</Button>
                        <Button type="button" onClick={this.handleOnClick}>Вийти</Button>
                    </Form>
                </Grid.Column>
            </Grid>);
    }
}

const mapStateToProps = (state) => ({
    Message: state.AirPollution.Message,
    AirData: state.AirPollution.data,
    Matter: state.AirPollution.matter
})

const mapDispatchToProps = (dispatch) => ({
    getAirPollution: bindActionCreators(getAirPollution, dispatch),
    ChangeMatter: bindActionCreators(ChangeMatter, dispatch),
    editMatter: bindActionCreators(postEditMatter, dispatch),
    noAuthorization: () => dispatch(push('/signin')),
    setMessage: () => dispatch({type: 'SET_AIR_POLLUTION_MESSAGE', payload: false})
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
