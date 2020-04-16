import React from 'react';
import { Grid, Header, Button, Divider, Container, Segment, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const divStyle = { paddingTop: '50px', paddingBottom: '150px' };
    return (
        <div className="landing-background">
          <div className="landing-back">
            <Grid container verticalAlign='middle' centered rows={2}>
              <Grid.Row>
                <Container>
                  <div className="landing-header">
                    <p>I had something here but now I do not like it</p>
                  </div>
                </Container>
              </Grid.Row>
                <Grid.Row>
                  <div>
                    <Header size="huge" as='h2' icon textAlign='center'>
                      <div className="landing-text">
                        Find your next study spot today, join GEOStudy
                      </div>
                    </Header>
                    <Segment padded inverted>
                      <Button secondary fluid inverted>
                        Login
                      </Button>
                      <Divider horizontal inverted>Or</Divider>
                      <Button secondary fluid inverted>
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
                        <h2 className="landing-text">Create an account to post new study spots.</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat.</p>
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
                        <h2 className="landing-text" >Discover new study spots!</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat.</p>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row>
                    <Grid.Column>
                      <div className="landing-text">
                        <h2 className="landing-text">Find a study spot you like?  Leave it a good rating.</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat.</p>
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
