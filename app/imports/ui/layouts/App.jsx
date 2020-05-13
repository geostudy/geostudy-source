import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import AddSpots from '../pages/AddSpots';
import EditSpot from '../pages/EditSpot';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import MySpots from '../pages/MySpots';
import ListSpots from '../pages/ListSpots';
import SuggestTags from '../pages/SuggestTags';
import AdminSuggestion from '../pages/AdminSuggestion';
import AdminTags from '../pages/AdminTagsPage';
import AdminUsers from '../pages/AdminUsers';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {

  render() {

    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/mine" component={MySpots}/>
              <ProtectedRoute path="/home" component={Home}/>
              <ProtectedRoute path="/spots" component={ListSpots}/>
              <ProtectedRoute path="/add" component={AddSpots}/>
              <ProtectedRoute path="/edit/:_id" component={EditSpot}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <ProtectedRoute path="/suggestion" component={SuggestTags}/>
              <AdminProtectedRoute path="/adminsuggestion" component={AdminSuggestion}/>
              <AdminProtectedRoute path="/admintags" component={AdminTags}/>
              <AdminProtectedRoute path="/adminusers" component={AdminUsers}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
