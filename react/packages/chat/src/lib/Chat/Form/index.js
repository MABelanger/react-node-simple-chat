import React from 'react';
import styles from './styles.module.css';

import * as utils from './utils';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.state = {
      content: ''
    };
  }

  handleContentChange(e) {
    const content = e.target.value;
    // if is enter
    let lastChar = content[content.length - 1];
    if (utils.isSendChar(lastChar)) {
      this.handleSend(e);
    } else {
      this.setState({
        content
      });
    }
  }

  handleSend(e) {
    e.preventDefault();
    let contentHtml = utils.getContentHtml(this.state.content);
    this.props.onSend(contentHtml);
    this.setState({
      content:''
    });
  }

  render() {
    return(
      <div className={styles["form"]}>
        <form className={styles["InputAddOn"]} autoComplete="off">
          <textarea className={styles["InputAddOn-field"]}
                 id="content"
                 type="text"
                 value={this.state.content}
                 onChange={this.handleContentChange}
          />
          <button className={styles["button"]}
                  onClick={this.handleSend}> Send </button>
        </form>
      </div>
    );
  }


}
export default Form;
