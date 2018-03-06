import React, {Component} from 'react';
import { subscribe } from 'horizon-react';

import TodoItem from './TodoItem';
import Pagination from './Pagination';

import styles from './styles';



const mapDataToProps = {
  todos: (hz, props) => hz('todos')
};

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:1
    }
  }

  changePage(num) {
    this.setState({
      page:this.state.page + num
    });
  }

  render() {
    let renderList = this.props.todos.sort(
      (a,b) => {
        return b.time-a.time
      }).filter((item,index) => {
        return index >= (this.state.page-1) * this.props.limit && index < this.state.page * this.props.limit
      });
      console.log(renderList)
    return (
      <ul className={styles.list} style={{ height: renderList.length * 49 + 30 }}>
        {renderList.map(
          (todo,index) => {
            return <TodoItem
                key={todo.id}
                todo={todo}
                horizon={this.props.horizon}
              />
          }
        )}
        <Pagination page={this.state.page} total={Math.ceil(this.props.todos.length / this.props.limit)} changePage={this.changePage.bind(this)}></Pagination>
      </ul>
    );
  }


}

// const TodoList = (props) => (
  
//   <ul className={styles.list} style={{ height: props.todos.length * 49 + 50 }}>
//   {console.log(props)}
//     {props.todos.map(
//       (todo,index) => {
//         if(index < (state.page-1) * props.limit || index > state.page * props.limit){
//           return;
//         }
//         return <TodoItem
//             key={todo.id}
//             todo={todo}
//             horizon={props.horizon}
//           />
//       }
//     )}
//     <Pagination page={state.page} total={props.todos.length} changePage={this.changePage}></Pagination>
//   </ul>
// );

export default subscribe({
  mapDataToProps
})(TodoList);
