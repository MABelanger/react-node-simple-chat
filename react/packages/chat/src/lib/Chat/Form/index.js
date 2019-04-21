import React from 'react';
import styles from './styles.module.css';

import * as utils from './utils';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleSendSeen = this.handleSendSeen.bind(this);
    this.state = {
      content: ''
    };
  }

  handleContentChange(e) {
    const content = e.target.value;
    // if is enter
    let lastChar = content[content.length - 1];
    if (utils.isSendChar(lastChar)) {
      this.handleSendMessage(e);
    } else {
      this.setState({
        content
      });
    }
  }

  handleSendMessage(e) {
    e.preventDefault();
    let contentHtml = utils.getContentHtml(this.state.content);
    this.props.onSendMessage(contentHtml);
    this.setState({
      content:''
    });
  }

  handleSendSeen(e) {
    e.preventDefault();
    console.log('seen')
    let seenDate = new Date().toISOString()
    this.props.onSendSeen(seenDate);
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
                 onFocus={this.handleSendSeen}
          />
          <button className={styles["button"]}
                  onClick={this.handleSendMessage}> Send </button>
        </form>
      </div>
    );
  }


}
export default Form;
