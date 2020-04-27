import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Item, Header, Loader, Container } from 'semantic-ui-react';
import Spot from '/imports/ui/components/Spot';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots';
import { Tags } from '../../api/tag/Tags';
import { Ratings } from '../../api/rating/Ratings';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListSpots extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Spots</Header>
            <Item.Group>
              {this.props.spots.map((spot, index) => <Spot key={index} Spots={Spots}
                spot={spot} tags={this.props.tags.filter(tag => (tag.spot.includes(spot.name)))}
                ratings={this.props.ratings.filter(rating => (rating.spot === spot.name))}/>)}
            </Item.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListSpots.propTypes = {
  spots: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  ratings: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Spots');
  const subscription2 = Meteor.subscribe('Ratings');
  const subscription3 = Meteor.subscribe('Tags');
  return {
    spots: Spots.find({}).fetch(),
    ratings: Ratings.find({}).fetch(),
    tags: Tags.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready() && subscription3.ready()),
  };
})(ListSpots);
