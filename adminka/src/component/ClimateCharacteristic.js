import React, { Component } from 'react';
import {Grid, Form, Button, TextArea, Message} from 'semantic-ui-react';

class ClimateCharacteristic extends Component {

    constructor(props){
        super(props);
        this.state={
            "1block": this.props.ClimateCharacteristic['1block'] || "",
            "2block": this.props.ClimateCharacteristic['2block'] || "",
            "3block": this.props.ClimateCharacteristic['3block'] || "",
            "4block": this.props.ClimateCharacteristic['4block'] || "",
            "5block": this.props.ClimateCharacteristic['5block'] || "",
            "6block": this.props.ClimateCharacteristic['6block'] || "",
            "7block": this.props.ClimateCharacteristic['7block'] || "",
        }
    }

    handelAreaOnChange = (e) => {
        this.props.setMessageFalse();
        this.setState({[e.target.name]: e.target.value});
    }
    handelOnSubmit = () => {
        this.props.EditClimate({
            ...this.props.ClimateCharacteristic,
            "1block": this.state["1block"],
            "2block": this.state["2block"],
            "3block": this.state["3block"],
            "4block": this.state["4block"],
            "5block": this.state["5block"],
            "6block": this.state["6block"],
            "7block": this.state["7block"]
        });
        this.props.setMessageTrue();
    }
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}/>
                    <Grid.Column width={7}>
                        { this.props.Message ? <Message success header="Сохранение" content="Данные успешно сохранены" /> : <div /> }
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={5}/>
                    <Grid.Column width={5}>
                    <Form>
                        <h3>Кліматична характеристика Запорізької області</h3>
                        <Form.Field>
                            <TextArea 
                                autoHeight
                                value = {this.state['1block']}
                                name="1block"
                                onChange={this.handelAreaOnChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea
                                autoHeight 
                                value = {this.state['2block']}
                                name="2block"
                                onChange={this.handelAreaOnChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea
                                autoHeight
                                value = {this.state['3block']} 
                                name="3block"
                                onChange={this.handelAreaOnChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea
                                autoHeight
                                value = {this.state['4block']} 
                                name="4block"
                                onChange={this.handelAreaOnChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea
                                autoHeight
                                value = {this.state['5block']} 
                                name="5block"
                                onChange={this.handelAreaOnChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea
                                autoHeight
                                value = {this.state['6block']} 
                                name="6block"
                                onChange={this.handelAreaOnChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea
                                autoHeight
                                value = {this.state['7block']} 
                                name="7block"
                                onChange={this.handelAreaOnChange}
                            />
                        </Form.Field>
                        <Button primary onClick={this.handelOnSubmit}>Сохранить</Button>
                    </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            );
    }
}


export default ClimateCharacteristic;