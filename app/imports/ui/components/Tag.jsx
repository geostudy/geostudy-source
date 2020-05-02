import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Item } from 'semantic-ui-react';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Tag extends React.Component {
  render() {
    const spotTags = _.filter(this.props.Tags.find().fetch(), (tag) => (_.contains(tag.spot, this.props.spots.name)));
    const spotName = _.pluck(spotTags, 'name');

    return (
        <Item.Extra>
          <br/>
          <div className='spots-text'>
            Tags:&nbsp;{ this.listTags(spotName) }
          </div>
        </Item.Extra>
    );
  }

  listTags(names) {
    return _.map(names, (name) => (`[ ${name} ]\u00A0\u00A0\u00A0`));
  }
}

/** Require a document to be passed to this component. */
Tag.propTypes = {
  tags: PropTypes.array.isRequired,
  Tags: PropTypes.object.isRequired,
  spots: PropTypes.object.isRequired,
  Spots: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Tag);