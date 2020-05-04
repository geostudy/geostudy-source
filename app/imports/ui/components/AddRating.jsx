import React from 'react';
import { Item, Rating, Container } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders the Page for adding a document. */
class AddRating extends React.Component {

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let defaultScore = 0;
    const pluckScore = _.pluck(this.props.score, 'score');
    if (pluckScore.length === 1) {
      defaultScore = _.reduce(pluckScore, (memo, num) => num);
    }
    if (this.props.ratingCheck === true) {
      return (
          <Container>
            <Item.Extra>
              <div className='spots-text'>
                User has Rated: &nbsp; <Rating className='ratingInterface' icon='star'
                defaultRating={defaultScore} maxRating={5} onRate={this.submitRating}/>
                &nbsp; (Click again to re-rate!)
              </div>
            </Item.Extra>
          </Container>
      );
    }
    return (
        <Container>
          <Item.Extra>
            <div className='spots-text'>
              Tried this spot? <br/>
              Let us know what you think! <br/>
              <Rating className='ratingInterface' icon='star' defaultRating={1} maxRating={5}
                      onRate={this.submitRating}/> &nbsp; (Click to rate!)
            </div>
          </Item.Extra>
        </Container>
    );
  }

  submitRating = (event, data) => {
    if (this.props.ratingCheck === true) {
      const pluckId = _.reduce(_.pluck(this.props.score, '_id'), (memo, num) => num);
      this.props.Ratings.update({ _id: pluckId }, { $set: { score: data.rating } },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            }
          });
    } else {
      this.props.Ratings.insert({ score: data.rating, owner: this.props.user, spot: this.props.spotName },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            }
          });
    }
  }
}

AddRating.propTypes = {
  user: PropTypes.string.isRequired,
  spotName: PropTypes.string.isRequired,
  ratingCheck: PropTypes.bool.isRequired,
  score: PropTypes.array.isRequired,
  Ratings: PropTypes.object.isRequired,
};

export default AddRating;
