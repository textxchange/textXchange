import React from 'react';
import { Grid, Image, Header, Button, Icon } from 'semantic-ui-react';
import SearchBook from '../components/SearchBook';

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
              {/*<Button icon labelPosition='left'>*/}
              {/*  <Icon name='user' />*/}
              {/*  Sign In*/}
              {/*</Button>*/}
              <SearchBook/>
            </Grid>
            <br/><br/><br/>
          </div>
        </div>
    );
  }
}

export default Landing;
