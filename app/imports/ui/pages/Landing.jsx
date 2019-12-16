import React from 'react';
import { Grid, Image, Header, Message } from 'semantic-ui-react';
import SearchBook from '../components/SearchBook';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    // const txGreen = { background: '#b7d8bd', margin: '-8em 12em 5em 12em' };
    return (
        <div className='books-background' style={{ marginBottom: '0px', paddingBottom: '1.5em' }}>
          <Grid verticalAlign='middle' textAlign='center' relaxed style={{ padding: '1em 7em 0em 7em' }} container>
            <Grid.Column>
              <Image size='medium' circular src="/images/textXchange-logo.png" centered/>
              <Header inverted as='h1' className='landing-header'
              >University of Hawaii&apos;s textbook market exchange providing
                an affordable route to education</Header>
              <SearchBook/>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
