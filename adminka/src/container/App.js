import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Route } from 'react-router';
import FormAuthorization from '../component/FormAuthorization';
import Forms from '../component/Forms';
import MeteoStation from '../component/MeteoStation';
import Records from '../component/Records';
import Hydrometeorologycal from '../component/Hydrometeorologycal_bulletin';

class App extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
        <Grid.Column width={4} />
          <div>
            <Route path="/" exact component= {Forms} />
            <Route path="/signup" exact component= {FormAuthorization}/>
            <Route path="/meteostation" exact component = {MeteoStation} />
            <Route path="/climate_records" exact component={Records} />
            <Route path="/hydrometeorologycal_bulletin" exact component={Hydrometeorologycal} />
          </div>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
