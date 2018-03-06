import React, {Component} from 'react';

import styles from './styles';

class Sort extends Component {
  constructor(props){
    super(props)
  }

  changeSelect(event){
      let select = event.target;
      let sort = select.options[select.selectedIndex].value;

      this.props.changeSort(parseInt(sort));
  }

  render(){
    return (
      <div>
        <select className={styles.sort} defaultValue={this.props.sort} onChange={this.changeSelect.bind(this)}>
            <option value ="0">时间正序</option>
            <option value ="1">时间倒序</option>
            <option value="2">文字正序</option>
            <option value="3">文字倒序</option>
        </select>
      </div>
    )
  }
}

export default Sort
