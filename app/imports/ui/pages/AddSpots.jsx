import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { connectField } from 'uniforms';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { Spots } from '../../api/spot/Spots';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  image: String,
  name: String,
  location: String,
  description: String,
});

function Image({ onChange, value }) {
  const imgPlaceholder = 'images/temp-picture.png';

  function onImageChange({ target: { files } }) {
    if (files && files[0]) {
      onChange(URL.createObjectURL(files[0]));
    }
  }

  return (
      <div className="ImageField">
        <label htmlFor="file-input">
          <div>Choose your photo</div>
          <img
              style={{ cursor: 'pointer', width: '197px', height: '140px' }}
              src={value ? value : imgPlaceholder}
          />
        </label>
        <input
            accept="image/*"
            id="file-input"
            onChange={onImageChange}
            style={{ display: 'none' }}
            type="file"
        />
      </div>
  );
}

const ImageField = connectField(Image);

/** Renders the Page for adding a document. */
class AddSpots extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, image, location, description } = data;
    const rating = 0;
    const owner = Meteor.user().username;
    Spots.insert({ image, name, location, description, rating, owner },
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
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Spot</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='name'/>
                <ImageField name='image'/>
                <TextField name='location'/>
                <LongTextField name='description'/>
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
