import React from 'react';
import { Grid, Image, Header, Button, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    // const txGreen = { background: '#b7d8bd', margin: '-8em 12em 5em 12em' };
    return (
        <div>
          <div className='books-background' style={{ marginBottom: '-3em', paddingBottom: '13em' }}>
            <Grid verticalAlign='middle' textAlign='center' container>
              <Image size='medium' circular src="/images/textXchange-logo.png" centered/>
              <Header inverted as='h1'>University of Hawaii&apos;s textbook market exchange providing
                an affordable route to education</Header>
              <Button icon labelPosition='left'>
                <Icon name='user' />
                Sign In
              </Button>
            </Grid>
            <br/><br/><br/>
          </div>
          {/*<Segment inverted style={txGreen}>*/}
          {/*  <Grid container centered stackable columns={3}>*/}
          {/*    <Grid.Column textAlign='center' style={{ marginRight: '14em' }}>*/}
          {/*      <Header inverted as='h1'>Buy Textbooks</Header>*/}
          {/*      <Icon size='huge' name='shop'/>*/}
          {/*      <Header inverted as='h3'>Purchase used text books for the classes you need from other students,*/}
          {/*        and below market price</Header>*/}
          {/*    </Grid.Column>*/}
          {/*    <Grid.Column textAlign='center'>*/}
          {/*      <Header inverted as='h1'>Sell Textbooks</Header>*/}
          {/*      <Icon size='huge' name='dollar sign'/>*/}
          {/*      <Header inverted as='h3'>Sell your own text books to other college students or*/}
          {/*        exchange text books for different classes from a vast database</Header>*/}
          {/*    </Grid.Column>*/}
          {/*  </Grid>*/}
          {/*  <Divider inverted vertical>AND</Divider>*/}
          {/*</Segment>*/}
        </div>
    );
  }
}

export default Landing;
