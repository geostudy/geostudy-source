import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Item, Header, Loader, Container } from 'semantic-ui-react';
import Spot from '/imports/ui/components/Spot';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots';

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
                spot={spot}/>)}
            </Item.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListSpots.propTypes = {
  spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Spots');
  return {
    spots: Spots.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListSpots);
