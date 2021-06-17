import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout  from './components/Layout';
import Home from './Pages/Home';
import AddCat from './Pages/AddCat';
import UploadImage from './Pages/UploadImage';
import ViewImages from './Pages/ViewImages';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />        
        <Route exact path='/addcat' component={AddCat} />
        <Route exact path='/uplimg/:catid, :subcatid' component={UploadImage} />        
        <Route exact path='/allimg/' component={ViewImages} />

      </Layout>
    );
  }
}
