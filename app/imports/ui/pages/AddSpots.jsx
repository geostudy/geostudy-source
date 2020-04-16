import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, RadioField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  latitude: String,
  longitude: String,
  description: String,
  rating: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
  },
});

/** Renders the Page for adding a document. */
class AddSpots extends React.Component {

  /** On submit, insert the data. */
  // submit(data, formRef) {
  //   const { name, latitude, longitude, description, rating } = data;
  //   const owner = Meteor.user().username;
  //   Spots.insert({ name, latitude, longitude, description, rating },
  //     (error) => {
  //       if (error) {
  //         swal('Error', error.message, 'error');
  //       } else {
  //         swal('Success', 'Item added successfully', 'success');
  //         formRef.reset();
  //       }
  //     });
  // }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Spot</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <TextField name='latitude'/>
                <TextField name='longitude'/>
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

export default AddSpots;
