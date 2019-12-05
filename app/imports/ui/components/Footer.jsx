import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '1em', color: 'black' };
    return (
        <div style={{ background: '#c8e1cc' }}>
          <footer>
            <div style={divStyle} className="ui center aligned container">
              <hr />
              textXchange<br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
              <a href="https://textxchange.github.io/">https://textxchange.github.io/</a>
            </div>
          </footer>
        </div>
    );
  }
}

export default Footer;
