import React from 'react';
import { Item, Icon } from 'semantic-ui-react';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class SpotsAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div
            style={{
              backgroundColor: '#36393f',
              padding: 15,
            }}
        >
            <Item.Group>
              <Item>
                <Item.Image src='https://i.imgur.com/eBL8AET.jpg'/>

                <Item.Content>
                  <Item.Header as='h3'><p className='spots-text'>Library</p></Item.Header>
                  <Item.Meta><p className='spots-subtext'>Latitude: 40.785091</p></Item.Meta>
                  <Item.Meta><p className='spots-subtext'>Longitude: -73.968285</p></Item.Meta>
                  <Item.Description>
                    <p className='spots-text'>
                      Lots of Resources
                    </p>
                  </Item.Description>
                  <Item.Extra>
                    <Icon color='yellow' name='star'/>
                    <Icon color='yellow' name='star'/>
                    <Icon color='yellow' name='star'/>
                    <Icon color='yellow' name='star'/>
                    <Icon name='star'/>
                  </Item.Extra>
                  <Item.Extra>
                    <button className="ui button" position="left">Edit</button>
                    <button className="ui button">Delete</button>
                  </Item.Extra>
                </Item.Content>
              </Item>


              <Item>
                <Item.Image src='https://i.imgur.com/tURqjqu.jpg'/>

                <Item.Content>
                  <Item.Header as='h3'><p className='spots-text'>Staircase</p></Item.Header>
                  <Item.Meta><p className='spots-subtext'>Latitude: 40.785091</p></Item.Meta>
                  <Item.Meta><p className='spots-subtext'>Longitude: -73.968285</p></Item.Meta>
                  <Item.Description>
                    <p className='spots-text'>
                      Sunny, open air, background noise
                    </p>
                  </Item.Description>
                  <Item.Extra>
                    <Icon color='yellow' name='star'/>
                    <Icon color='yellow' name='star'/>
                    <Icon name='star'/>
                    <Icon name='star'/>
                    <Icon name='star'/>
                  </Item.Extra>
                  <Item.Extra>
                    <button className="ui button">Edit</button>
                    <button className="ui button">Delete</button>
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
        </div>
    );
  }
}

export default SpotsAdmin;
