import React from 'react';
import { Button, Item, Rating } from 'semantic-ui-react';
import Tag from '/imports/ui/components/Tag';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import AddRating from './AddRating';
import { Tags } from '../../api/tag/Tags';
import { Spots } from '../../api/spot/Spots';


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
            <Tag Tags={Tags} tags={this.props.tags} Spots={Spots} spots={this.props.spot}/>
            <Item.Extra>
              <div className='spots-text'> Average Rating:
                &nbsp; <Rating icon='star' maxRating={5} rating={this.getRating(this.props.spot.name)} disabled/> &nbsp;
               (Total Ratings: {this.getRatingCount(this.props.Ratings.find({ spot: this.props.spot.name }).count())})
            </div>
            </Item.Extra>
            <Item.Extra>
              <AddRating user={Meteor.user().username} spotName={this.props.spot.name} Ratings={this.props.Ratings}
                         score={_.where(_.where(this.props.rating,
                             { spot: this.props.spot.name }),
                             { owner: Meteor.user().username })}
                         ratingCheck={_.contains(_.pluck(_.where(_.where(this.props.rating,
                             { spot: this.props.spot.name }),
                             { owner: Meteor.user().username }), 'owner'), Meteor.user().username)} />
            </Item.Extra>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Item.Extra>
                  <div className='spots-text'>
                    Owner: &nbsp; { this.props.spot.owner }
                  </div>
                </Item.Extra>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') || (Meteor.user().username === this.props.spot.owner) ? (
                <Item.Extra>
                  <Link to={`/edit/${this.props.spot._id}`} className='spots-test'>Edit</Link>
                </Item.Extra>
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Item.Extra>
                  <Button className="ui button"
                          onClick={() => this.removeItem(this.props.spot._id)}>Delete</Button>
                </Item.Extra>
            ) : ''}
          </Item.Content>
        </Item>
    );
  }

  removeItem(spotId) {
    const ratingSpot = _.where(this.props.rating, { spot: this.props.spot.name });
    const ratingId = _.pluck(ratingSpot, '_id');
    const tagSpot = _.filter(this.props.tags, (tag) => (_.contains(tag.spot, this.props.spot.name)));
    const tagId = _.pluck(tagSpot, '_id');
    const tagArray = _.pluck(tagSpot, 'spot');
    const tagNewArray = _.map(tagArray, (array) => _.reject(array, (value) => value === this.props.spot.name));
    const tagZip = _.zip(tagId, tagNewArray);
    _.map(tagZip, (pair) => (this.props.Tags.update({ _id: pair[0] }, { $set: { spot: pair[1] } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          }
        })));
    _.map(ratingId, (id) => this.props.Ratings.remove(id));
    this.props.Spots.remove(spotId);
  }

  getRating(nameGet) {
    const infoGet = _.pluck(this.props.Ratings.find({ spot: nameGet }).fetch(), 'score');
    if (infoGet === undefined || infoGet.length === 0) {
      return '0';
    }
    const infoReduce = _.reduce(infoGet, (memo, num) => memo + num);
    const infoLength = (infoGet.length - 1);
    return (infoReduce / infoLength);
  }

  getRatingCount(number) {
    if (number <= 0) {
      return 0;
    }
    return number - 1;
  }
}

/** Require a document to be passed to this component. */
Spot.propTypes = {
  Spots: PropTypes.object.isRequired,
  spot: PropTypes.object.isRequired,
  Ratings: PropTypes.object.isRequired,
  rating: PropTypes.array.isRequired,
  Tags: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Spot);
