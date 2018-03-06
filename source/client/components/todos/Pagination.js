import React, {Component} from 'react';

import styles from './styles';

class Pagination extends Component {
  constructor(props){
    super(props)
  }

  pageUp(){
    this.props.changePage(-1);
  }

  pageDown(){
    this.props.changePage(1);
  }

  render(){
    return (
      <div>
        {this.props.page > 1 && <span className={styles.pagination} onClick={this.pageUp.bind(this)} >上一页</span>}
        <span>{ this.props.page }页/ { this.props.total }页</span>
        {this.props.page < this.props.total && <span className={styles.pagination} onClick={this.pageDown.bind(this)}>下一页</span>}
      </div>
    )
  }
}

export default Pagination
