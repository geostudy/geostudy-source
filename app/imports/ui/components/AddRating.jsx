import React from 'react';
import { Item, Rating, Container } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Ratings, RatingsSchema } from '../../api/rating/Ratings';

/** Renders the Page for adding a document. */
class AddRating extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { score, owner, spot } = data;
    Ratings.insert({ score, owner, spot },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Rating added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
            <AutoForm ref={ref => { fRef = ref; }} schema={RatingsSchema} onSubmit={data => this.submit(data, fRef)} >
              <Container>
              <Item.Extra>
                <Rating className='ratingInterface' icon='star' defaultRating={0} maxRating={5}
                   onRate=
                      {this.getRating}/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={this.props.owner}/>
                <HiddenField name='spot' value={this.props.spot}/>
                <HiddenField name='score' value={this.score}/>
              </Item.Extra>
              </Container>
            </AutoForm>
    );
  }

  getRating = (event, data) => {
    console.log(data.rating);
    return (data.rating);
  }
}

AddRating.propTypes = {
  owner: PropTypes.string.isRequired,
  spot: PropTypes.string.isRequired,
};

export default AddRating;
