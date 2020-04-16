import React from 'react';
import { Header, Image, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Map extends React.Component {
  render() {
    return (
        <div className='geostudy-map-back'>
          <Header as='h1' inverted textAlign='center'>Map</Header>
          <Container>
            <Image src='https://i.imgur.com/YtapuCa.png'/>
          </Container>
        </div>
    );
  }
}

export default Map;
