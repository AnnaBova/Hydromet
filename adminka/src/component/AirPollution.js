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

    handelOnClick = () => {
        localStorage.removeItem('token');
        this.props.noAuthorization();
    }

    handelSaveValue = (obj) => {
        this.props.setMessage()
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

    handelOnChange = (e) => {
        this.props.setMessage();
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
            Matter:e.target.value,
            Post9: "",
            Post10: "",
            Post11: "",
            Post12: "",
            Post13: ""
        });

        this.props.ChangeMatter(e.target.value);
    }

    handelOnClickSave = () => {
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
            Matter:this.state.Matter,
            Post9: "",
            Post10: "",
            Post11: "",
            Post12: "",
            Post13: ""
        });
    } 

    render() {

        return (
            <Grid>
                <Grid.Column width={6}/>   
                <Grid.Column width={3}>
                    <h3>Диаграма Загрязнения воздуха</h3>
                    {this.props.Message ? <Message success header="Сохранение" content="Данные успешно сохранены" />: <div />}
                    <Form>
                        <Form.Field 
                            control="select" 
                            value={this.state.Matter}
                            onChange={this.handelOnChange}
                        >
                            <option value="0">Пиль</option>
                            <option value="1">Двооксид сірки</option>
                            <option value="2">Оксид вуглецю</option>
                            <option value="3">Двооксид азоту</option>
                            <option value="4">Оксид азоту</option>
                            <option value="5">Фенол</option>
                            <option value="6">Хлористий водень</option>
                            <option value="7">Фтористий водень</option>
                            <option value="8">Формальдегід</option>
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.state.Post9}  
                                label="Пост №9"
                                name = "Post9" 
                                saveValue={this.handelSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.state.Post10}  
                                label="Пост №10" 
                                name ="Post10"
                                saveValue={this.handelSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.state.Post11}  
                                label="Пост №11"
                                name="Post11"
                                saveValue={this.handelSaveValue} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent 
                                value={this.state.Post12} 
                                label="Пост №12"
                                name="Post12"
                                saveValue={this.handelSaveValue} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.state.Post13} 
                                label="Пост №13"
                                name="Post13"
                                saveValue={this.handelSaveValue} 
                            />
                        </Form.Field>
                        <Button primary onClick={this.handelOnClickSave}>Сохранить</Button>
                        <Button type="button" onClick={this.handelOnClick}>Выйти</Button>
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
    setMessage: () => dispatch({type: 'SET_AIR_POLLUTION_MESSAGE'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);