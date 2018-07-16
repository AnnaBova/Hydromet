import React, { Component } from 'react';
import { Grid, Form, Button, Icon, Message } from 'semantic-ui-react';
import InputComponent from './InputComponent';
import '../style/Event.css';
class AddPhoto extends Component {
    constructor(props){
        super(props);
        this.state = {
            file: undefined,
            station: 'zaporozhye',
            number: this.props.photo || '1'
        }
    }

    handelSubmit = () => {
        var { file, number, station } = this.state;
        var arr = file.name.split('.');
        // eslint-disable-next-line
        if(arr[1] == 'jpeg' || arr[1]=="JPEG" || arr[1] =="JPG"){
            arr[1]="jpg";
        }
        let name =`${station}${number}.${arr[1]}`
        var blob = file.slice(0, file.size, file.type);
        const NewFileName = new File([blob], name, {type: file.type});
        this.props.uploadCaruselImage(NewFileName, this.state.station);
        this.props.setMessageTrue();
    }

    handelStationChange = (e) => {
        this.props.setMessageFalse();
        this.setState({station: e.target.value});
    }

    handelSaveValue = (obj)=>{
        this.props.setMessageFalse();
        this.setState({[obj.name]: obj.value})
    }

    handelOnChange = (e) => {
        e.preventDefault()
        this.props.setMessageFalse();
        this.setState({file: e.target.files[0]});
    }

    render() {
        return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={6}>
                    { this.props.Message ? <Message success header="Збереження" content="Дані успішно збережені" /> : <div /> }
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={5} />
                <Grid.Column width={5}>
                    <Form>
                        <Form.Field label="Станція" control="select"  onChange={this.handelStationChange}>
                            <option value="zaporozhye">Запоріжжя</option>
                            <option value="berdyansk">Бердянск</option>
                            <option value="melitopol">Мелітополь</option>
                            <option value="botievye">Ботиево</option>
                            <option value="prism">Пришиб</option>
                            <option value="kyrylivka">Кирилівка</option>
                            <option value="gulyaypole">Гуляйполе</option>
                        </Form.Field>
                        <Form.Field>
                            <InputComponent
                                label="Номер фото"
                                value={this.state.number}
                                name="number"
                                saveValue={this.handelSaveValue}
                            />
                        </Form.Field>
                        <Form.Field>
                            <input type="file" name="file" id="file" className="inputfile" onChange={this.handelOnChange} />
                            <label htmlFor="file" className="ui huge green floated button">
                                <Icon name="upload"></Icon>
                                Завантажити фотографію
                            </label>
                        </Form.Field>
                        <Button onClick={this.handelSubmit}>Зберегти фото</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>);
    }
}

export default AddPhoto;
