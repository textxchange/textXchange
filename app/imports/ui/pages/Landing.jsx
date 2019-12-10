import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import SearchBook from '../components/SearchBook';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    // const txGreen = { background: '#b7d8bd', margin: '-8em 12em 5em 12em' };
    return (
        <div>
          <div className='books-background' style={{ marginBottom: '-3em', paddingBottom: '13em' }}>
            <Grid verticalAlign='middle' textAlign='center' container>
              <Grid.Row>
                <Image size='medium' circular src="/images/textXchange-logo.png" centered/>
              </Grid.Row>
              <Grid.Row>
                <Header inverted as='h1'>University of Hawaii&apos;s textbook market exchange providing
                an affordable route to education</Header>
              </Grid.Row>
              {/* <Button icon labelPosition='left'> */}
              {/*  <Icon name='user' /> */}
              {/*  Sign In */}
              {/* </Button> */}
              <Grid.Row>
                <SearchBook/>
              </Grid.Row>
            </Grid>
            <br/><br/><br/>
          </div>
        </div>
    );
  }
}

export default Landing;
