import React, { Component } from 'react';
import { Route } from 'react-router';
import FormAuthorization from '../component/FormAuthorization';
import Forms from '../component/Forms';
import MeteoStation from '../component/MeteoStation';
import Records from '../component/Records';
import Hydrometeorologycal from '../component/Hydrometeorologycal_bulletin';
import AirPollution from '../component/AirPollution';
import RegularObservable from '../component/RegularObservable';
import AdminMeteostation from '../component/AdminMeteostation';
import MailCastomize from '../component/MailCastomize';

class App extends Component {
  componentDidMount(){
  }
  render() {
    return (
          <div>
            <Route path="/" exact component= {Forms} />
            <Route path="/signin" exact component= {FormAuthorization}/>
            <Route path="/meteostation" exact component = {MeteoStation} />
            <Route path="/climate_records" exact component={Records} />
            <Route path="/hydrometeorologycal_bulletin" exact component={Hydrometeorologycal} />
            <Route path="/air_pollution" exact component={AirPollution} />
            <Route path="/gydrolygy" exact component={RegularObservable} />
            <Route path="/all_meteostation" exact component={AdminMeteostation} />
            <Route path="/mail_castomize" exact component={MailCastomize}/>
          </div>
    );
  }
}

export default App;
