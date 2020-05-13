import React from 'react';
import { Button, Item, Divider } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class User extends React.Component {

  handleInputChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
        <Item>
          <Item.Content>
            <Divider inverted/>
            <Item.Header as='h3'><p className='spots-text'> {this.props.user.username}
            </p></Item.Header>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Item.Extra>
                  <Button className="ui button"
                          onClick={() => this.deleteUser(this.props.user._id)}>
                    Delete Tag
                  </Button>
                </Item.Extra>
            ) : ''}
            <Divider/>
          </Item.Content>
        </Item>
    );
  }

  deleteUser(userId) {
    if (this.props.user.username !== 'admin@foo.com' &&
        Meteor.user().username !== this.props.user.username && Roles.userIsInRole(Meteor.userId(), 'admin')) {
      Meteor.users.remove({ _id: userId });
    } else if (Meteor.user().username === 'admin@foo.com' && Meteor.user().username !== this.props.user.username) {
      Meteor.users.remove({ _id: userId });
      } else {
      swal('Error', 'Cannot delete user', 'error');
    }
  }
}

/** Require a document to be passed to this component. */
User.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default User;
