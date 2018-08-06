import React, { Component } from 'react';
import { Grid, Form, Button, Icon, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GetStationPhotos,
         DeleteStationPhoto } from '../redux/actions';
import URL from '../utils/path';
import '../style/Event.css';
const PATH_TO_IMAGE = `${URL}/public/Events`;

class AddPhoto extends Component {
    constructor(props){
        super(props);
        this.state = {
            file: null,
            imageTypeError: false,
            station: 'zaporozhye',
        }
    }

    componentDidMount () {
      this.props.GetStationPhotos(this.state.station);
    }

    handleSubmit = () => {
        var { file, station } = this.state;
        if (!file) return;
        var arr = file.name.split('.');
         // eslint-disable-next-line
        if(arr[1] === 'jpeg' || arr[1]==="JPEG" ||
           arr[1] ==="JPG" || arr[1] === 'jpg'){
            arr[1]="jpg";
            let name =`${station}_${arr[0]}.${arr[1]}`
            var blob = file.slice(0, file.size, file.type);
            const NewFileName = new File([blob], name, {type: file.type});
            this.props.uploadCaruselImage(NewFileName, this.state.station);
            this.props.setMessageTrue();
            this.setState({file: null});
         } else {
          this.setState({
            imageTypeError: true
          });
        } 
    }

    handleStationChange = (e) => {
        this.props.setMessageFalse();
        this.setState({station: e.target.value});
        this.props.GetStationPhotos(e.target.value)
    }

    handleSaveValue = (obj)=>{
        this.props.setMessageFalse();
        this.setState({[obj.name]: obj.value})
    }

    handleOnChange = (e) => {
        e.preventDefault()
        this.props.setMessageFalse();
        this.setState({file: e.target.files[0]});
    }

    handleImageClick = (image) => (event) => {
      this.setState({
        imageTypeError: false
      });
      this.props.setMessageFalse();
      const check = window.confirm('Ви впевнені, що хочете видалити це фото?');
      if(!check)return;
      this.props.DeleteStationPhoto(this.state.station, image);
    }

    render() {
        if(!this.props.photos) return 'Завантаження';
        return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={6}>
                    { this.props.Message ? <Message success header="Збереження" content="Дані успішно збережені" /> : <div /> }
                    { this.state.imageTypeError && <Message error header="Помилка" content="Зображення повинно бути типу .jpg" /> }
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={5} />
                <Grid.Column width={5}>
                    <Form>
                        <Form.Field label="Станція" control="select" onChange={this.handleStationChange}>
                            <option value="zaporozhye">Запоріжжя</option>
                            <option value="berdyansk">Бердянск</option>
                            <option value="melitopol">Мелітополь</option>
                            <option value="botievye">Ботиево</option>
                            <option value="prism">Пришиб</option>
                            <option value="kyrylivka">Кирилівка</option>
                            <option value="gulyaypole">Гуляйполе</option>
                            <option value="hydrology">Відділ гідрології</option>
                        </Form.Field>
                        <Form.Field>
                            <input disable="true" type="text" value={(this.state.file)?this.state.file.name : ''} />
                            <input type="file" name="file" id="file" className="inputfile" accept="image/jpeg" onChange={this.handleOnChange} />
                            <label htmlFor="file" className="ui huge green floated button">
                                <Icon name="upload"></Icon>
                                Завантажити фотографію
                            </label>
                        </Form.Field>
                        <Button onClick={this.handleSubmit}>Зберегти фото</Button>
                    </Form>
                </Grid.Column>
                <div className="imgWrapper">
                  {this.props.photos.map(item => {
                    const style = {
                      backgroundImage: `url(${PATH_TO_IMAGE}/${item})`
                    };
                    return <div key={item} style={style} className="stationPhoto">
                      <span className="deleteCross" onClick={this.handleImageClick(item)}>X</span>
                    </div>
                  })}
                </div>
            </Grid.Row>
        </Grid>);
    }
}

function mapStateToProps(state){
  return {
    photos: state.climateRecords.photos
  }
}

function mapDispatchToProps(dispatch){
  return {
    GetStationPhotos: bindActionCreators(GetStationPhotos, dispatch),
    DeleteStationPhoto: bindActionCreators(DeleteStationPhoto, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);
