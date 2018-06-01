import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import RestaurantList from '../RestaurantList';
import RestaurantDetail from '../RestaurantDetail';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import './style';

class App extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="page-container">
            <Header />
            <div className="page-body">
              <Switch>
                <Route path="/restaurant" component={RestaurantDetail} />
                <Route path="/restaurants" component={RestaurantList} />
                <Redirect path="/" to="/restaurants" />
              </Switch>
            </div>
            <Footer />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
}

export default App;