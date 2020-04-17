import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Grid, Header, Button, Divider, Container, Segment, Image, TextArea, Menu } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const divStyle = { paddingTop: '50px', paddingBottom: '150px' };
    return (
        <div className="landing-background">
          <div className="landing-back">
            <Grid container verticalAlign='middle' centered rows={1}>
              <Grid.Row>
                <div>
                  <Header size="huge" as='h2' icon textAlign='center' inverted>
                    <div className="landing-text">
                      Find your next study spot today, join GEOStudy
                    </div>
                  </Header>
                  <Segment padded inverted>
                    <Button as={NavLink} activeClassName="active" exact to="/signin" key='signin' fluid inverted>
                      Login
                    </Button>
                    <Divider horizontal inverted>Or</Divider>
                    <Button as={NavLink} activeClassName="active" exact to="/signup" key='signup' fluid inverted>
                      Create Account
                    </Button>
                  </Segment>
                </div>
              </Grid.Row>
            </Grid>
          </div>
          <div>
            <footer>
              <div style={divStyle} className="ui center aligned container">
                <Grid container verticalAlign='middle' centered columns={2} rows={3}>
                  <Grid.Row>
                    <Grid.Column>
                      <div className="landing-text">
                        <Header as='h2' inverted>Create an account to post new study spots.</Header>
                        <Header as='h4' inverted>Creating an account will give you access to the many features of this
                          website. If you already have an account, please click the login button above.</Header>
                      </div>
                    </Grid.Column>
                    <Grid.Column>
                      <Image src="/images/temp-picture.png" rounded size="medium"/>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src="/images/temp-picture.png" rounded size="medium"/>
                    </Grid.Column>
                    <Grid.Column>
                      <div className="landing-text">
                        <Header as='h2' inverted>Discover new study spots!</Header>
                        <Header as='h4' inverted>Login to find new study spots all across UH Manoa! You can find the
                          spots by either going to the Spots page, or taking a look at the Maps page to see all of
                          UH Manoa.</Header>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row>
                    <Grid.Column>
                      <div className="landing-text">
                        <Header as='h2' inverted>Find a study spot you like? Leave it a good rating.</Header>
                        <Header as='h4' inverted>Each spot will have a rating attached to it. This can tell you what to
                          expect from the given spot. If you want to be heard as well, feel free to give a spot a
                          rating.
                        </Header>
                      </div>
                    </Grid.Column>
                    <Grid.Column>
                      <Image src="/images/temp-picture.png" rounded size="medium"/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </footer>
          </div>
        </div>

    );
  }
}

Landing.propTypes = {
  currentUser: PropTypes.string,
};

export default Landing;
