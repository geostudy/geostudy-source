import React from 'react';
import { Button, Item } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Spot extends React.Component {
  render() {
    return (
        <Item>
          <Item.Image src={this.props.spot.image}/>

          <Item.Content>
            <Item.Header as='h3'><p className='spots-text'>{this.props.spot.name}</p></Item.Header>
            <Item.Meta><p className='spots-subtext'>{this.props.spot.location}</p></Item.Meta>
            <Item.Description>
              <p className='spots-text'>
                {this.props.spot.description}
              </p>
            </Item.Description>
            <Item.Extra>
              <p className='spots-text'>
                Rating: {this.props.Spots.find().count()}
              </p>
            </Item.Extra>
            <Item.Extra>
              <Link to={`/edit/${this.props.spot._id}`} className='spots-test'>Edit</Link>
            </Item.Extra>
            <Item.Extra>
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <Button className="ui button" onClick={() => this.removeItem(this.props.spot._id)}>Delete</Button>
              ) : ''}
            </Item.Extra>
          </Item.Content>
        </Item>
    );
  }

  removeItem(spotId) {
    this.props.Spots.remove(spotId);
  }

  getRating() {
    const ratingName = this.props.spot.name;
    console.log(ratingName);
  }
}

/** Require a document to be passed to this component. */
Spot.propTypes = {
  Spots: PropTypes.object.isRequired,
  spot: PropTypes.object.isRequired,
  Ratings: PropTypes.object.isRequired,
  rating: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Spot);
