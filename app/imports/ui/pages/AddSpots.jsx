import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Spots } from '../../api/spot/Spots';
import { Tags } from '../../api/tag/Tags';

/** Renders the Page for adding a document. */
class AddSpots extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, image, location, description, tags } = data;
    const owner = Meteor.user().username;
    if (_.contains(_.pluck(this.props.spot, 'name'), name) === false) {
      Spots.insert({ image, name, location, description, owner },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Success', 'Study Spot added successfully', 'success');
              formRef.reset();
            }
          });
      const tagId = _.pluck(_.flatten(_.map(tags, (tag) => (_.where(this.props.tags, { name: tag }))), true), '_id');
      const tagArray = _.pluck(_.flatten(_.map(tags, (tag) => (_.where(this.props.tags,
          { name: tag }))), true), 'spotId');
      _.map(tagArray, (array) => array.push(_.reduce(_.pluck(Spots.find({ name: name }).fetch(),
          '_id'), (memo, num) => (memo + num))));
      const tagZip = _.zip(tagId, tagArray);
      _.map(tagZip, (pair) => (Tags.update({ _id: pair[0] }, { $set: { spotId: pair[1] } },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            }
          })));
      this.setState({ redirect: true });
    } else {
      swal('Error', 'This Study Spot name is already in use', 'error');
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    if (this.state.redirect) {
      return <Redirect to='/spots'/>;
    }
    let fRef = null;
    const allowedTags = _.pluck(this.props.tags, 'name');
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
            <Header as="h2" textAlign="center" inverted>Add Study Spot</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
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

AddSpots.propTypes = {
  tags: PropTypes.array.isRequired,
  spot: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(
    () => {
      // Get access to Stuff documents.
      const subscription = Meteor.subscribe('Tags');
      const subscription2 = Meteor.subscribe('Spots');
      return {
        tags: Tags.find({}).fetch(),
        spot: Spots.find({}).fetch(),
        ready: (subscription.ready() || subscription2.ready()),
      };
    },
)(AddSpots);
