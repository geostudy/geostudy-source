import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import { Spots } from '../../api/spot/Spots';
import { Tags } from '../../api/tag/Tags';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  image: String,
  name: String,
  location: String,
  description: String,
});

/** Renders the Page for adding a document. */
class AddSpots extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, image, location, description } = data;
    const fieldTags = ['Air Conditioned', 'Indoors', 'Outdoors'];
    const tagIds = _.map(fieldTags, (tagNames) => ());
    console.log(tagIds);
    const owner = Meteor.user().username;
    // Spots.insert({ image, name, location, description, owner },
    //     (error) => {
    //       if (error) {
    //         swal('Error', error.message, 'error');
    //       } else {
    //         swal('Success', 'Item added successfully', 'success');
    //         formRef.reset();
    //       }
    //     });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
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
                  {console.log(this.props.tags)}
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

AddSpots
    .propTypes = {
  Tags: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(
    () => {
      // Get access to Stuff documents.
      const subscription = Meteor.subscribe('Tags');
      return {
        tags: Tags.find({}).fetch(),
        ready: (subscription.ready()),
      };
    },
)(AddSpots);
