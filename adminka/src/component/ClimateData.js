import React, { Component } from 'react';
import { Form, Button, TextArea, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
const InputSize = 4;

class ClimateData extends Component {
    constructor(props){
        super(props);
        this.state = {
            ErrorMessage: false
        }
    }

    handleSaveProperties = (objName) => (obj) => {
        this.props.setMessage();
        const current = this.props.ClimateData[objName];
        current[obj.name] = obj.value;
        this.setState({
          ErrorMessage: false
        });
        this.props.UpdateClimateData({
          ...this.props.ClimateData,
          [objName]:current
        });
    }

    handleSaveValue = (event) => {
      this.props.setMessage();
      this.setState({
        ErrorMessage:false
      });
      this.props.UpdateClimateData({
        ...this.props.ClimateData,
        [event.name]:event.value
      });
    }

    handleOnChange = (e) => {
        this.props.setMessage();
        this.setState({ SelectorValue: e.target.value, date: "", value: "", ErrorMessage: false})
    }

    handleSubmit = () => {
        // if(
        //     FullDataValid(this.props.ClimateData.date)
        //     // && Number.isInteger(+this.state.day.split('-')[0])
        //   )
        //     {
        this.props.Submit(this.props.ClimateData);
        this.setState({
            ErrorMessage: false
        });
        // }
        // else{
        //     this.setState({ErrorMessage: true});
        // }
    }

    handleChangeTextArea = (e) => {
        this.props.setMessage();
        this.props.UpdateClimateData({
          ...this.props.ClimateData,
          StormText:e.target.value
        });
        this.setState({ErrorMessage: false});
    }

    handleOnChangeMonth = (e) => {
        this.props.setMessage();
        this.props.UpdateClimateData({
          ...this.props.ClimateData,
          month:e.target.value
        });
        this.setState({ErrorMessage: false});
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
                          value = {this.props.ClimateData.day}
                          name="day"
                          label="День"
                          saveValue ={this.handleSaveValue}
                      />
                  </Form.Field>

                  <Form.Field
                    width={InputSize}
                    control="select"
                    name="month"
                    label="Місяць"
                    value={this.props.ClimateData.month}
                    onChange={this.handleOnChangeMonth}
                  >
                    <option value="січня">Січень</option>
                    <option value="лютого">Лютий</option>
                    <option value="березня">Березень</option>
                    <option value="квітня">Квітень</option>
                    <option value="травня">Травень</option>
                    <option value="червня">Червень</option>
                    <option value="липня">Липень</option>
                    <option value="серпня">Серпень</option>
                    <option value="вересня">Вересень</option>
                    <option value="жовтня"> Жовтень</option>
                    <option value="листопада">Листопад</option>
                    <option value="грудня">Грудень</option>
                  </Form.Field>

                  <Form.Field width={InputSize}>
                      <InputComponent
                          value = {this.props.ClimateData.year}
                          name="year"
                          label="Рік"
                          saveValue ={this.handleSaveValue}
                      />
                  </Form.Field>
                <p className="label">Середня температура</p>
                <Form.Group>
                    <Form.Field width={InputSize}>
                        <InputComponent
                            value = {this.props.ClimateData.SrTemperature.value}
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
                            value = {this.props.ClimateData.MaxTemperature.value}
                            name="value"
                            label="Значення"
                            saveValue ={this.handleSaveProperties('MaxTemperature')}
                        />
                    </Form.Field>
                    <Form.Field>
                        <InputComponent
                            value = {this.props.ClimateData.MaxTemperature.date}
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
                            value = {this.props.ClimateData.MinTemperature.value}
                            name="value"
                            label="Значення"
                            saveValue ={this.handleSaveProperties('MinTemperature')}
                        />
                    </Form.Field>
                    <Form.Field>
                        <InputComponent
                            value = {this.props.ClimateData.MinTemperature.date}
                            name = "date"
                            label="Рік"
                            saveValue ={this.handleSaveProperties('MinTemperature')}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Field width={InputSize}>
                        <label>Штормове попередження</label>
                        <TextArea autoHeight value={this.props.ClimateData.StormText} name="StormText" onChange={this.handleChangeTextArea} />
                </Form.Field>
                <Form.Group>
                <Form.Field width={InputSize}>
                <InputComponent
                            value = {this.props.ClimateData.date}
                            name = "date"
                            label="Белютень складено дата: "
                            saveValue = {this.handleSaveValue}
                            placeholder = "дд.мм.гггг"
                />
                </Form.Field>
                <Form.Field>
                    <InputComponent
                        value={this.props.ClimateData.time}
                        name="Time"
                        label="Час складання: "
                        saveValue={this.handleSaveValue}
                        placeholder="О котрій годині?"
                    />
                </Form.Field>
                <Form.Field>
                    <InputComponent
                        value={this.props.ClimateData.number}
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
