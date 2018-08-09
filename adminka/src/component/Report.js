import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { FullDataValid } from '../utils/DataValid';
import { UpdateReportInfo,
         UpdateAzovText, } from '../redux/actions/index';

const InputSize = 16;

class Report extends Component {
  constructor(props){
    super(props);
    this.state = {
      Message: false,
      ErrorMessage: false
    }
  }

  handleSaveValue = (index) => (event) => {
    this.props.setMessage();
    this.setState({
      Message: false,
      ErrorMessage: false
    });
    const arr = this.props.textWeatherObl.slice(0);
    arr[index]['text'] = event.value;
    this.props.UpdateReportInfo(arr[index], index);
  }

  CreateObj = () => {
    return {
      _id: this.props.data._id,
      date: this.state.date,
      text: this.state.text
    }
  }

  handleDateSelector = (e) => {
    this.props.ChangeDay(e.target.value-1);
    this.props.setMessage();
  }

  handleSubmit = () => {
    if(FullDataValid(this.props.textWeatherObl[0].date)){
      this.setState({
        Message: true,
        ErrorMessage: false
      });
      this.props.Submit();
    } else {
      this.setState({
        Message: false,
        ErrorMessage: true
      });
    }
  }

  handleSaveValueAzov = (obj) => {
    this.props.updateAzovText(obj.value);
  }

  handleDateChange = (event) => {
    this.setState({
      Message: false,
      ErrorMessage: false
    });
    if(!FullDataValid(event.value)) return;
    this.props.updateDate(event.value);
  }

  render() {
    let arr = this.props.textWeatherObl;
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4} />
            <Grid.Column width={6}>
              <Message success header="Збереження" content="Дані успішно збережені" visible={this.state.Message}/>
              <Message error header="Помилка" content="Неправильна дата" visible={this.state.ErrorMessage}/>
            </Grid.Column>
          </Grid.Row>
          <Form.Field width={3}>
            <InputComponent
                value={arr[0] && arr[0].date}
                label="Дата"
                name="date"
                saveValue = {this.handleDateChange}
                placeholder="формат дд.мм.рррр"
            />
          </Form.Field>
          <Grid.Row>
          <Grid.Column width={5} />
          <Grid.Column width={6}>
          <Form.Field>  
            <InputComponent
                    type="textarea"
                    cols={50}
                    row={4}
                    label="Погода по Азовському морю"
                    name="text"
                    value={this.props.AzovText}
                    saveValue={this.handleSaveValueAzov}
                />
          </Form.Field>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{display: 'flex', justifyContent: 'center'}}>
            {arr.map((item, index)=>{
              return (
                <div className="dayInput" key = {index}>
                  <Grid.Column width={8}>
                  <Form.Field width={InputSize}>
                    {item.date} <br />
                  </Form.Field>
                  <Form.Field width={InputSize}>
                        <InputComponent
                            type="textarea"
                            cols={50}
                            row={4}
                            value={item.text}
                            label="Текст"
                            name="text"
                            saveValue = {this.handleSaveValue(index)}
                        />
                  </Form.Field>
                  </Grid.Column>
                </div>
              );
            })}
          </Grid.Row>
        </Grid>
        <Button onClick = {this.handleSubmit}>Зберегти</Button>
      </div>  );
  }
}

function mapStateToProps(state){
  return {
    textWeatherObl: state.hydrometeorolog_bulletin.Report.TextWeather,
    AzovText: state.hydrometeorolog_bulletin.Report.AzovText,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    UpdateReportInfo: bindActionCreators(UpdateReportInfo, dispatch),
    updateAzovText: bindActionCreators(UpdateAzovText, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);
