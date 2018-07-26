import React from 'react';
import { Form, TextArea, Grid, Button, Message, Icon } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import { FullDataValid } from '../utils/DataValid';
import '../style/Event.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSelectedEvent,
         requestUpdateEvent } from '../redux/actions/index';

updateSelectedEvent

class EditEvent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      Message:false
    };
  }

  handleSaveValue = (event) => {
    this.props.updateSelectedEvent(event);
  }

  handleOnChangeText = (event) => {
    this.props.updateSelectedEvent({
      name: 'Text',
      value: event.target.value
    });
  }

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({file: e.target.files[0]});
  }

  handleSubmit = () => {
      if(FullDataValid(this.props.currentEvent.date)){
          const obj = {
              _id: this.props.currentEvent._id,
              title: this.props.currentEvent.title,
              text: this.props.currentEvent.Text,
              file: this.state.file,
              date: this.props.currentEvent.date,
              description: this.props.currentEvent.description
          }
          this.props.saveEvent(obj);
          this.setState({
              file: undefined,
              Message: false
          });
      }else{
          this.setState({Message: true})
      }
  }

  render () {
    if(Object.keys(this.props.currentEvent).length === 0 )return;
    return (<Grid>
        <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={6}>
                { this.props.Message ? <Message success header="Збереження" content="Дані успішно збережені" /> : <div /> }
                { this.state.Message ? <Message error header="Помилка" content="Неправильно введена дата" /> : <div /> }
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={4} />
            <Grid.Column width={12}>
                <Form>
                        <Form.Field>
                            <InputComponent
                                label="Дата"
                                name="date"
                                value={this.props.currentEvent.date}
                                saveValue={this.handleSaveValue}
                                placeholder="формат дд.мм.рррр"
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                label="Назва"
                                name="title"
                                value={this.props.currentEvent.title}
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                label="Опис"
                                name="description"
                                value={this.props.currentEvent.description}
                                saveValue={this.handleSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Текст</label>
                            <TextArea
                                value={this.props.currentEvent.Text}
                                autoHeight
                                onChange={this.handleOnChangeText}
                            />
                        </Form.Field>
                        <Form.Field>
                          <input disable="true" type="text" value={(this.state.file)?this.state.file.name : this.props.currentEvent.Picture} />
                            <input accept="image/jpeg" type="file" name="file" id="file" className="inputfile" onChange={this.handleOnChange} />
                            <label htmlFor="file" className="ui huge green floated button">
                                <Icon name="upload"></Icon>
                                Завантажити фотографію
                            </label>
                        </Form.Field>
                        <Button primary onClick={this.handleSubmit}>Зберегти подію</Button>
                </Form>
            </Grid.Column>
        </Grid.Row>
    </Grid>);
  }
}

function mapStateToProps(state) {
  return {
    events: state.events.Events,
    currentEvent: state.events.updatingEvent
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSelectedEvent: bindActionCreators(updateSelectedEvent, dispatch),
    saveEvent: bindActionCreators(requestUpdateEvent, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
