import React, { Component } from 'react';
import { Form, Button, TextArea, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { FullDataValid  } from '../utils/DataValid';
const InputSize = 4;

class ClimateData extends Component {
    constructor(props){
        super(props);
        this.state = {
            day: "",
            mounth: "сiчень",
            year: "",
            date:"",
            value:"",
            SrTemperature: {},
            MaxTemperature: {},
            MinTemperature: {},
            StormWarning: "",
            DateBulletin: "",
            Time:"",
            number: '',
            ErrorMessage: false
        }
    }

    handleSaveProperties = (objName) => (obj) => {
        this.props.setMessage();
        const current = this.state[objName];
        current[obj.name] = obj.value;
        this.setState({
          [objName]: current,
          ErrorMessage: false
        });
    }

    handleSaveValue = (event) => {
      this.props.setMessage();
      this.setState({
        [event.name]:event.value,
        ErrorMessage:false
      });
    }

    handleOnChange = (e) => {
        this.props.setMessage();
        this.setState({ SelectorValue: e.target.value, date: "", value: "", ErrorMessage: false})
    }

    handleSubmit = () => {
        var obj = {
            ...this.props.ClimateData,
            StormText: this.state.StormWarning,
            day: this.state.day,
            mounth: this.state.month,
            year: this.state.year,
            SrTemperature: this.state.SrTemperature,
            MaxTemperature: this.state.MaxTemperature,
            number: this.state.number,
            MinTemperature: this.state.MinTemperature,
            DateBulletin:`${this.state.Time} годині ${this.state.DateBulletin}`,
        }
        if(
            FullDataValid(this.state.DateBulletin) &&
            Number.isInteger(+this.state.day.split('-')[0])
          )
            {
            this.props.Submit(obj);
            this.setState({
                ErrorMessage: false
            });
        }
        else{
            this.setState({ErrorMessage: true});
        }
    }

    handleChangeTextArea = (e) => {
        this.props.setMessage();
        this.setState({StormWarning:e.target.value, ErrorMessage: false});
    }

    handleOnChangeMounth = (e) => {
        this.props.setMessage();
        this.setState({mounth: e.target.value, ErrorMessage: false});
    }

    render() {
    return (
    <div>
        <Grid>
            <Grid.Row>
                <Grid.Column width={4}/>
                <Grid.Column width={7}>
                <Message success header="Збереження" content="Дані успішно збережені" />
                <Message error header="Помилка" content="Неправильно введені дата або час" visible={this.state.ErrorMessage}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column  width={5}/>
                <Grid.Column width={8}>
                  <Form.Field width={InputSize}>
                      <InputComponent
                          value = {this.state.day}
                          name="day"
                          label="День"
                          saveValue ={this.handleSaveValue}
                      />
                  </Form.Field>
                  <Form.Field width={InputSize}>
                      <InputComponent
                          value = {this.state.month}
                          name="month"
                          label="Мiсяць"
                          saveValue ={this.handleSaveValue}
                      />
                  </Form.Field>
                  <Form.Field width={InputSize}>
                      <InputComponent
                          value = {this.state.year}
                          name="year"
                          label="Рік"
                          saveValue ={this.handleSaveValue}
                      />
                  </Form.Field>
                <p className="label">Середня температура</p>
                <Form.Group>
                    <Form.Field width={InputSize}>
                        <InputComponent
                            value = {this.state.SrTemperature.value}
                            name="value"
                            label="Значення"
                            saveValue ={this.handleSaveProperties('SrTemperature')}
                        />
                    </Form.Field>
                </Form.Group>
                <p className="label">Максимальна температура</p>
                <Form.Group>
                    <Form.Field width={InputSize}>
                        <InputComponent
                            value = {this.state.MaxTemperature.value}
                            name="value"
                            label="Значення"
                            saveValue ={this.handleSaveProperties('MaxTemperature')}
                        />
                    </Form.Field>
                    <Form.Field>
                        <InputComponent
                            value = {this.state.MaxTemperature.date}
                            name = "date"
                            label="Рік"
                            saveValue ={this.handleSaveProperties('MaxTemperature')}
                        />
                    </Form.Field>
                </Form.Group>
                <p className="label">Мінімальна температура</p>
                <Form.Group>
                    <Form.Field width={InputSize}>
                        <InputComponent
                            value = {this.state.MinTemperature.value}
                            name="value"
                            label="Значення"
                            saveValue ={this.handleSaveProperties('MinTemperature')}
                        />
                    </Form.Field>
                    <Form.Field>
                        <InputComponent
                            value = {this.state.MinTemperature.date}
                            name = "date"
                            label="Рік"
                            saveValue ={this.handleSaveProperties('MinTemperature')}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Field width={InputSize}>
                        <label>Штормове попередження</label>
                        <TextArea autoHeight value={this.state.StormWarning} name="StormWarning" onChange={this.handleChangeTextArea} />
                </Form.Field>
                <Form.Group>
                <Form.Field width={InputSize}>
                <InputComponent
                            value = {this.state.DateBulletin}
                            name = "DateBulletin"
                            label="Белютень складено дата: "
                            saveValue = {this.handleSaveValue}
                            placeholder = "дд.мм.гггг"
                />
                </Form.Field>
                <Form.Field>
                    <InputComponent
                        value={this.state.Time}
                        name="Time"
                        label="Час складання: "
                        saveValue={this.handleSaveValue}
                        placeholder="О котрій годині?"
                    />
                </Form.Field>
                <Form.Field>
                    <InputComponent
                        value={this.state.number}
                        name="number"
                        label="Номер бюлетеню:"
                        saveValue={this.handleSaveValue}
                        placeholder="Номер бюлетеню"
                    />
                </Form.Field>
                </Form.Group>
                <Button onClick={this.handleSubmit}>Зберегти</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>);
    }
}

export default ClimateData;
