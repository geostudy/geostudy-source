import React from 'react';
import { Button, Item } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import { Tags } from '../../api/tag/Tags';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Suggestion extends React.Component {
  render() {
    return (
        <Item>
          <Item.Content>
            <Item.Header as='h3'><p className='spots-text'> {this.props.suggestion.name}
            </p></Item.Header>
            <Item.Meta><p className='spots-subtext'>Suggested by: &nbsp; {this.props.suggestion.owner}</p></Item.Meta>
            <Item.Description>
              <p className='spots-text'>
                Description: &nbsp;{this.props.suggestion.description}
              </p>
            </Item.Description>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Item.Extra>
                  <Button className="ui button"
                          onClick={() => this.addSuggestion(this.props.suggestion._id,
                              this.props.suggestion.name)}>Add</Button>
                  <Button className="ui button"
                          onClick={() => this.rejectSuggestion(this.props.suggestion._id)}>Reject</Button>
                </Item.Extra>
            ) : ''}
          </Item.Content>
        </Item>
    );
  }

  addSuggestion(suggestionId, suggestionName) {
    const name = _.reduce(suggestionName, (memo, num) => (memo + num));
    const testArray = [];
    console.log(name);
    Tags.insert({ name, testArray },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Suggestion added successfully', 'success');
            this.props.Suggestions.remove(suggestionId);
          }
        });
  }

  rejectSuggestion(suggestionId) {
    this.props.Suggestions.remove(suggestionId);
  }
}

/** Require a document to be passed to this component. */
Suggestion.propTypes = {
  Suggestions: PropTypes.object.isRequired,
  suggestion: PropTypes.object.isRequired,
  Tags: PropTypes.object.isRequired,
  tag: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default Suggestion;
