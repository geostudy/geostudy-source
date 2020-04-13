import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'white' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              ICS 314 GeoStudy Team<br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a href="https://geostudy.github.io/">GeoStudy Project Page</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
