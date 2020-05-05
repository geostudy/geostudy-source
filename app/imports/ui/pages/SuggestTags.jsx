import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Suggestions, SuggestionsSchema } from '../../api/suggestion/Suggestions';
import { Tags } from '../../api/tag/Tags';

/** Renders the Page for adding a document. */
class SuggestTags extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const tagCheck = _.pluck(this.props.tags, 'name');
    const suggestionCheck = _.pluck(this.props.suggestions, 'name');
    const { name, description, owner } = data;
    if (_.contains(tagCheck, name)) {
      swal('Error', `${name} already exists as a tag.`, 'error');
    } else if (_.contains(suggestionCheck, name)) {
      swal('Error', `${name} has already been suggested.`, 'error');
    } else {
      Suggestions.insert({ name, description, owner },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Success', 'Thank you for your tag suggestion!', 'success');
              formRef.reset();
            }
          });
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Row>
            <Grid.Column width={14}>
              <Header as="h2" textAlign="center" inverted>Suggest A Tag</Header>
              <div className='spots-text'>
                Don&apos;t see a tag that really describes your study spot? Think there&apos;s something that will
                help people find just the study spot they&apos;re looking for? Let us know and you just might see it
                added once we review and approve your suggestion.
                <br/>
                <br/>
                Your suggestions continue to help make the site better!
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={SuggestionsSchema} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <TextField name='name'/>
                  <LongTextField name='description' label='Please describe why we should add this as a tag'/>
                  <HiddenField name='owner' value={Meteor.user().username}/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

SuggestTags
    .propTypes = {
  tags: PropTypes.array.isRequired,
  suggestions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(
    () => {
      // Get access to Stuff documents.
      const subscription = Meteor.subscribe('Tags');
      const subscription2 = Meteor.subscribe('Suggestions');
      return {
        suggestions: Suggestions.find({}).fetch(),
        tags: Tags.find({}).fetch(),
        ready: (subscription.ready() && subscription2.ready()),
      };
    },
)(SuggestTags);
