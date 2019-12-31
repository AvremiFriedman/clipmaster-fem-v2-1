import React from 'react';
import { render } from 'react-dom';
import { clipboard } from 'electron';

const writeToClipboard = content => {
  clipboard.writeText(content);
}

class Application extends React.Component {

  constructor() {
    super();
    this.state = {
      clippings: [
        {
          content: 'lol',
          id: 123,
        },
      ],
    };

    this.addClipping = this.addClipping.bind(this);
  };

  addClipping() {
    const { clippings } = this.state;

    const content = clipboard.readText();
    const id = Date.now();

    const clipping = { content, id };

    this.setState({
      clippings: [clipping, ...clippings],
    });
  }

  render() {
    return (
      <div className="container">
        <header className="controls">
          <button id="copy-from-clipboard" onClick={this.addClipping}>Copy from Clipboard</button>
        </header>

        <section className="content">
          <div className="clippings-list">
            {this.state.clippings.map(clipping => (
              <Clipping content={clipping.content} key={clipping.id} />
            ))}
          </div>
        </section>
      </div>
    )
  }
}

const Clipping = ({ content }) => {
  return (
    <article className="clippings-list-item">
      <div className="clipping-text" disabled>
        {content}
      </div>
      <div className="clipping-controls">
        <button onClick={() => writeToClipboard(content)}>&rarr; Clipboard</button>
        <button>Update</button>
      </div>
    </article>
  )
}

render(<Application />, document.getElementById('application'))