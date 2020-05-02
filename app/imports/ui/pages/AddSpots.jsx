import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import { Spots } from '../../api/spot/Spots';

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
    const owner = Meteor.user().username;
    Spots.insert({ image, name, location, description, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Row>
            <Header as="h2" textAlign="center" inverted>Add Spot</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <TextField name='name'/>
                  <p>Upload your image to <a href="https://imgur.com/">Imgur</a> and paste the link here!</p>
                  <TextField name='image'/>
                  <TextField name='location'/>
                  <LongTextField name='description'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className="ui container" style={{ width: '70vw', height: '46vh', margin: '0em' }}>
                <WrappedMap
                    googleMapURL={'https://maps.googleapis.com/maps/' +
                    'api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'}
                    loadingElement={<div style={{ height: '100%' }}/>}
                    containerElement={<div style={{ height: '100%' }}/>}
                    mapElement={<div style={{ height: '100%' }}/>}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

function Map() {
  return <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 21.297274, lng: -157.817359 }}
  />;
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default AddSpots;
