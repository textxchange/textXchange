import React from 'react';
import { Grid, Image, Icon, Header, Segment } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const txGreen = { background: '#16c381' };
    return (
        <div>
          <div className='books-background'>
            <Grid verticalAlign='middle' textAlign='center' container>

              <Grid.Column width={4}>
                <Image size='medium' circular src="/images/textXchange-logo.png"/>
              </Grid.Column>
            </Grid>
          </div>
          <br/><br/><br/>
          <Grid container centered stackable columns={3}>
            <Grid.Column textAlign='center'>
              <Segment inverted style={txGreen}>
                <Header inverted as='h1'>Welcome!</Header>
                <Icon size='huge' name='user circle outline'/>
                <Header inverted as='h3'>University of Hawaii text book market exchange providing
                  an affordable route to education</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Segment inverted style={txGreen}>
                <Header inverted as='h1'>Buy Textbooks</Header>
                <Icon size='huge' name='shop'/>
                <Header inverted as='h3'>Purchase used text books for the classes you need from other students,
                  and below market price</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Segment inverted style={txGreen}>
                <Header inverted as='h1'>Exchange Textbooks</Header>
                <Icon size='huge' name='dollar sign'/>
                <Header inverted as='h3'>Sell your own text books to other college students or
                exchange text books for different classes from a vast database</Header>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
