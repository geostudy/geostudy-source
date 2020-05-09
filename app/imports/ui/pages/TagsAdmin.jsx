import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Item, Header, Loader, Container, Pagination } from 'semantic-ui-react';
import Suggestion from '/imports/ui/components/Suggestion';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Suggestions } from '../../api/suggestion/Suggestions';
import { Tags } from '../../api/tag/Tags';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class TagsAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handleChange = (e, data) => {
    this.setState({ activePage: data.activePage });
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Administrator Tags</Header>
          <Item.Group>
            {this.props.suggestions.slice((this.state.activePage - 1) * 5,
                this.state.activePage * 5).map((suggestion, index) => <Suggestion
                key={index} Suggestions={Suggestions} suggestion={suggestion}
                Tags={Tags} tag={this.props.tags}/>)}
          </Item.Group>
          <hr/>
          <Container textAlign={'center'}>
            <Pagination
                defaultActivePage={1}
                ellipsisItem={{ content: <Icon name='ellipsis horizontal'/>, icon: true }}
                firstItem={{ content: <Icon name='angle double left'/>, icon: true }}
                lastItem={{ content: <Icon name='angle double right'/>, icon: true }}
                prevItem={{ content: <Icon name='angle left'/>, icon: true }}
                nextItem={{ content: <Icon name='angle right'/>, icon: true }}
                totalPages={Math.ceil(this.props.suggestions.length / 5)}
                onPageChange={this.handleChange}
            />
          </Container>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
TagsAdmin.propTypes = {
  tags: PropTypes.array.isRequired,
  suggestions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(
    () => {
      // Get access to Stuff documents.
      const subscription = Meteor.subscribe('Suggestions');
      const subscription2 = Meteor.subscribe('Tags');
      return {
        suggestions: Suggestions.find({}).fetch(),
        tags: Tags.find({}).fetch(),
        ready: (subscription.ready() && subscription2.ready()),
      };
    },
)(TagsAdmin);
