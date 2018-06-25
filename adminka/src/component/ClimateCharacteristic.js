import React, { Component } from 'react';
import {Grid, Form, Button, TextArea} from 'semantic-ui-react';

class ClimateCharacteristic extends Component {

    constructor(props){
        super(props);
        this.state={
            "1block": "",
            "2block": "",
            "3block": "",
            "4block": "",
            "5block": "",
            "6block": "",
            "7block": "",
        }
    }


    handelAreaOnChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <Grid>
                <Grid.Column width={5}/>
                <Grid.Column width={5}>
                <Form>
                    <h3>Кліматична характеристика Запорізької області</h3>
                    <Form.Field>
                        <TextArea 
                            name="1block"
                            onChange={this.handelAreaOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <TextArea 
                            name="2block"
                            onChange={this.handelAreaOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <TextArea 
                            name="3block"
                            onChange={this.handelAreaOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <TextArea 
                            name="4block"
                            onChange={this.handelAreaOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <TextArea 
                            name="5block"
                            onChange={this.handelAreaOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <TextArea 
                            name="6block"
                            onChange={this.handelAreaOnChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <TextArea 
                            name="7block"
                            onChange={this.handelAreaOnChange}
                        />
                    </Form.Field>
                    <Button>Сохранить</Button>
                </Form>
                </Grid.Column>
            </Grid>
            );
    }
}


export default ClimateCharacteristic;