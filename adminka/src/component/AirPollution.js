import React, { Component } from 'react';
import { Form, Grid, Button, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import InputComponent from './InputComponent';
import { getAirPollution, ChangeMatter, postEditMatter, EditPollutionValue } from '../redux/actions/index';

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
      this.props.editValue(this.state.Matter, obj.name, obj.value);
    }

    handleOnChange = (e) => {
      this.setState({
          Matter:e.target.value
      });
      this.props.ChangeMatter(e.target.value);
      this.props.Message && this.props.setMessage();
    }

    handleOnClickSave = () => {
      this.props.Message && this.props.setMessage();
        this.props.editMatter({
            ...this.props.Matter,
            data: [
                this.props.Matter.data[0],
                this.props.Matter.data[1],
                this.props.Matter.data[2],
                this.props.Matter.data[3],
                this.props.Matter.data[4],
            ]
        });
        this.setState({
            Matter:this.state.Matter
        });
    }

    render() {
      console.log(this.props);
      if(this.props.AirData.length === 0) return 'loading';
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
                                value={this.props.Matter.data[0]}
                                label="Пост №9"
                                name = "0"
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.props.Matter.data[1]}
                                label="Пост №10"
                                name ="1"
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.props.Matter.data[2]}
                                label="Пост №11"
                                name="2"
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.props.Matter.data[3]}
                                label="Пост №12"
                                name="3"
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                value={this.props.Matter.data[4]}
                                label="Пост №13"
                                name="4"
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
    editValue: bindActionCreators(EditPollutionValue, dispatch),
    editMatter: bindActionCreators(postEditMatter, dispatch),
    noAuthorization: () => dispatch(push('/signin')),
    setMessage: () => dispatch({type: 'SET_AIR_POLLUTION_MESSAGE', payload: false})
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
