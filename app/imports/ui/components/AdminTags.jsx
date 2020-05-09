import React from 'react';
import { Button, Item, Input, Divider } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import { Tags } from '../../api/tag/Tags';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminTags extends React.Component {
  render() {
    return (
        <Item>
          <Item.Content>
            <Divider inverted/>
            <Item.Header as='h3'><p className='spots-text'> {this.props.tag.name}
            </p></Item.Header>
            <Item.Meta><p className='spots-subtext'>
              Associated with: {_.size(this.props.tag.spotId)} Spots
            </p></Item.Meta>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Item.Extra>

                  <Input className="ui button"
                          action={{
                            content: 'Checkout',
                          }}
                         actionposition='right'
                         placeholder='Type new tag name...'
                  />
                  <Button className="ui button"
                          onClick={() => this.deleteTag(this.props.tag._id)}>Delete Tag</Button>
                </Item.Extra>
            ) : ''}
            <Divider inverted/>
          </Item.Content>
        </Item>
    );
  }

  addSuggestion(tagId, tagName) {
    const name = _.reduce(tagName, (memo, num) => (memo + num));
    const testArray = [];
    Tags.insert({ name, testArray },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Suggestion added successfully', 'success');
          }
        });
  }

  deleteTag(tagId) {
    this.props.Tags.remove(tagId);
  }
}

/** Require a document to be passed to this component. */
AdminTags.propTypes = {
  Tags: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default AdminTags;
