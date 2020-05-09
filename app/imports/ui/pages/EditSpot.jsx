import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import { Spots } from '../../api/spot/Spots';
import { Tags } from '../../api/tag/Tags';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Renders the Page for adding a document. */
class EditSpot extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const { name, image, location, description, tags, _id } = data;
    const owner = Meteor.user().username;
    const removeArray = _.difference(this.props.doc.tags, tags);
    const addArray = _.difference(tags, this.props.doc.tags);
    Spots.update(_id, { $set: { image, name, location, description, owner } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item updated successfully', 'success');
          }
        });
    if (_.isEqual(tags, this.props.doc.tags) === false) {
      if (_.isEqual(removeArray, []) === false) {
        const removeTagObject = _.flatten(_.map(removeArray, (tag) => (_.where(this.props.tags,
            { name: tag }))), true);
        const removeTagId = _.pluck(removeTagObject, '_id');
        const removeTagArray = _.pluck(removeTagObject, 'spotId');
        const removeTagNewArray = _.map(removeTagArray, (array) => _.reject(array,
            (value) => value === this.props.doc._id));
        const removeTagZip = _.zip(removeTagId, removeTagNewArray);
        _.map(removeTagZip, (pair) => (Tags.update({ _id: pair[0] }, { $set: { spotId: pair[1] } },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              }
            })));
      }

      if (_.isEqual(addArray, []) === false) {
        const addTagId = _.pluck(_.flatten(_.map(tags, (tag) => (_.where(this.props.tags,
            { name: tag }))), true), '_id');
        const addTagArray = _.pluck(_.flatten(_.map(tags, (tag) => (_.where(this.props.tags,
            { name: tag }))), true), 'spotId');
        _.map(addTagArray, (array) => array.push(_id));
        const addTagZip = _.zip(addTagId, addTagArray);
        _.map(addTagZip, (pair) => (Tags.update({ _id: pair[0] }, { $set: { spotId: pair[1] } },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              }
            })));
      }
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const allowedTags = _.pluck(this.props.tags, 'name');
    const tagSpot = _.filter(this.props.tags, (tag) => (_.contains(tag.spotId, this.props.doc._id)));
    const tagName = _.pluck(tagSpot, 'name');
    const newDoc = this.props.doc;
    newDoc.tags = tagName;
    const formSchema = new SimpleSchema({
      image: String,
      name: String,
      location: String,
      description: String,
      tags: { type: Array, optional: true },
      'tags.$': { type: String, allowedValues: allowedTags },
    });

    return (
        <Grid container centered>
          <Grid.Row>
            <Header as="h2" textAlign="center" inverted>Edit the Study Spot</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <AutoForm schema={formSchema} onSubmit={data => this.submit(data)} model={newDoc}>
                <Segment>
                  <TextField name='name' label='Name of Study Spot'/>
                  <p>Upload your image to <a href="https://imgur.com/">Imgur</a> and paste the link here!</p>
                  <TextField name='image' label='Picture of Study Spot'/>
                  <TextField name='location' label='Location/Address of Study Spot'/>
                  <LongTextField name='description' label='Describe the Study Spot'/>
                  <MultiSelectField name='tags' label='Add tags that apply to the Study Spot'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
            <Grid.Column width={14}>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

EditSpot.propTypes = {
  doc: PropTypes.object,
  spot: PropTypes.array.isRequired,
  model: PropTypes.object,
  tags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Spots');
  const subscription2 = Meteor.subscribe('Tags');

  return {
    doc: Spots.findOne(documentId),
    tags: Tags.find().fetch(),
    spot: Spots.find().fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(EditSpot);
