import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Tag extends React.Component {
  render() {
    return (
        ''
    );
  }
}

/** Require a document to be passed to this component. */
Tag.propTypes = {
  tags: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Tag);
