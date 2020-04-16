import React from 'react';
import { Grid, Header, Button, Divider, Container, Segment, Image, TextArea } from 'semantic-ui-react';

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
                      <Button color='white' fluid inverted>
                        Login
                      </Button>
                      <Divider horizontal inverted>Or</Divider>
                      <Button color='white' fluid inverted>
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
                        <Header as='h4' inverted>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat.</Header>
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
                      <div className="landing-text" >
                        <Header as='h2' inverted>Discover new study spots!</Header>
                        <Header as='h4' inverted>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat.</Header>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row>
                    <Grid.Column>
                      <div className="landing-text">
                        <Header as='h2' inverted>Find a study spot you like?  Leave it a good rating.</Header>
                        <Header as='h4' inverted>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat.</Header>
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

export default Landing;
