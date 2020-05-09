import React from 'react';
import { Grid, Header, Divider, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the Home page. */
class Home extends React.Component {
  render() {
    const divStyle = { paddingTop: '50px', paddingBottom: '150px' };
    return (
        <div className="landing-background">
          <div className="landing-back">
            <Grid container verticalAlign='middle' centered rows={1}>
              <Grid.Row>
                <div>
                  <Header size="huge" as='h2' icon textAlign='center' inverted>
                    <div className="Home-text">
                      Find your next study spot today, join GEOStudy
                    </div>
                  </Header>
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
                      <div className="Home-text">
                        <Header as='h2' inverted>Create an account to post new study spots.</Header>
                        <Header as='h4' inverted>Creating an account will give you access to the many features of this
                          website. If you already have an account, please click the login button above.</Header>
                      </div>
                    </Grid.Column>
                    <Grid.Column>
                      <Image src="/images/manoa-building.jpg" rounded size="medium"/>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider inverted/>
                  <Grid.Row>
                    <Grid.Column>
                      <div className="Home-text">
                        <Header as='h2' inverted>Discover new study spots!</Header>
                        <Header as='h4' inverted>Login to find new study spots all across UH Manoa! You can find the
                          spots by going to the Spots page.</Header>
                      </div>
                    </Grid.Column>
                    <Grid.Column>
                      <Image src="/images/manoa-qlc.jpg" rounded size="medium"/>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider inverted/>
                  <Grid.Row>
                    <Grid.Column>
                      <div className="Home-text">
                        <Header as='h2' inverted>Find a study spot you like? Leave it a good rating.</Header>
                        <Header as='h4' inverted>Each spot will have a rating attached to it. This can tell you what to
                          expect from the given spot. If you try it out yourself,
                          make sure to give it your own rating too!
                        </Header>
                      </div>
                    </Grid.Column>
                    <Grid.Column>
                      <Image src="/images/manoa-front.jpg" rounded size="medium"/>
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

export default Home;
