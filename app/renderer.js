import React from 'react';
import { render } from 'react-dom';

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
    this.setState({ clippings: [{ content: 'lol', id: Date.now() }, ...clippings] })
  }

  render() {
    return (
      <div className="container">
        <header className="controls">
          <button id="copi-from-clipboard" onClick={this.addClipping}>Copy from Clipboard</button>
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
        <button>&rarr; Clipboard</button>
        <button>Update</button>
      </div>
    </article>
  )
}

render(<Application />, document.getElementById('application'))