import React from 'react';
import { Header, Checkbox, Container, Radio,
  Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SortFilter extends React.Component {

  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  addTags(getTags, cycle) {
    return (
        <Grid.Row centered >
          {_.map(getTags.slice((cycle) * 5, (cycle + 1) * 5), (tag) => (this.displayTags(tag.name)))}
          </Grid.Row>
    );
  }

  displayTags(tagName) {
    return (
    <Checkbox label={tagName} value={tagName} onMouseUp={this.sendFilters()}/>
    );
  }

  sendFilters() {
    const tagList = _.pluck(this.props.tags, 'name');
  }

  render() {
    const totalCycles = Math.ceil(this.props.tags.length / 5);
    return (
        <Container>
              <Header as="h3" textAlign="center" inverted>Sort by:</Header>
              <Radio
                  label='Default'
                  name='radioGroup'
                  value='default'
                  checked={this.state.value === 'default'}
                  onChange={this.handleChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                  label='Highest Rating'
                  name='radioGroup'
                  value='rating'
                  checked={this.state.value === 'rating'}
                  onChange={this.handleChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                  label='Alphabetical'
                  name='radioGroup'
                  value='alpha'
                  checked={this.state.value === 'alpha'}
                  onChange={this.handleChange}
              />
              <Header as="h3" textAlign="center" inverted>Filter by:</Header>
              <Grid columns={5}>
                {_.times(totalCycles, (cycles) => (this.addTags(this.props.tags, cycles)))}
              </Grid>
          <Button className="ui button">
            Confirm Search
          </Button>
        </Container>
    );
  }
}

  /** Require a document to be passed to this component. */
  SortFilter.propTypes = {
    Spots: PropTypes.object.isRequired,
    spot: PropTypes.array.isRequired,
    Tags: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    currentUser: PropTypes.string,
  };

  /** Wrap this component in withRouter since we use the <Link> React Router element. */
  export default SortFilter;
