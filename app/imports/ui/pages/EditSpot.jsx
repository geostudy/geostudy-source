import React from 'react';
import swal from 'sweetalert';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, RadioField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots';

/** Create a schema to specify the structure of the data to appear in the form. */
const SpotSchema = new SimpleSchema({
  image: String,
  name: String,
  location: String,
  description: String,
  rating: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
  },
});

/** Renders the Page for adding a document. */
class EditSpot extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const { image, name, location, description, rating, owner, tags } = data;
    // const owner = Meteor.user().username;
    Spots.update(owner, tags, { $set: { image, name, location, description, rating } },
        (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Spot Updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Edit Spot</Header>
            <AutoForm schema={SpotSchema} onSubmit={data => this.submit(data)} >
              <Segment>
                <TextField name='image'/>
                <TextField name='name'/>
                <TextField name='location'/>
                <LongTextField name='description'/>
                <RadioField name='rating' inline/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Spot document in the props object. Uniforms adds 'model' to the props, which we use. */
EditSpot.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Spots');
  return {
    doc: Spots.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditSpot);
