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

  handleInputChange = e => {
    this.setState({ value: e.target.value });
  };

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

                  <Input placeholder='Type new tag name...' onChange={this.handleInputChange}
                    action={{ content: 'Edit Tag', onClick: () => this.updateTag(this.props.tag._id) }}
                  />
                  <Button className="ui button"
                          onClick={() => this.deleteTag(this.props.tag._id)}>
                    Delete Tag
                  </Button>
                </Item.Extra>
            ) : ''}
            <Divider inverted/>
          </Item.Content>
        </Item>
    );
  }

  updateTag(tagId) {
    if (_.contains(_.pluck(Tags.find().fetch(), 'name'), this.state.value) === false) {
      Tags.update({ _id: tagId }, { $set: { name: this.state.value } },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Success', 'Tag updated successfully', 'success');
            }
          });
    } else {
      swal('Error',
          'Cannot update tag name. Either it is the current name or the tag name is already in use.', 'error');
    }
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
