import React from 'react';
import { Loader } from 'semantic-ui-react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const Marker = ({ text }) => (
    <div style={{
      color: 'white',
      background: 'blue',
      padding: '1em 1em',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
);

/**  */
class GoogleMaps extends React.Component {

  render() {
    return (
        <div className="landing-background" style={{padding: '2em', margin: '-1em'}}>
          <div className="ui container" style={{ width: '70vw', height: '70vh', margin: '' }}>
            <WrappedMap
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'}
                loadingElement={<div style={{ height: `100%` }}/>}
                containerElement={<div style={{ height: `100%` }}/>}
                mapElement={<div style={{ height: `100%` }}/>}
            >
              <Marker
                  lat={21.298872}
                  lng={-157.817204}
                  text={'Test'}
              />
            </WrappedMap>
          </div>
        </div>
    );
  }
}

function Map() {
  return <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 21.297274, lng: -157.817359 }}
  />;
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default GoogleMaps;
