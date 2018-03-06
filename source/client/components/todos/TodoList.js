import React, {Component} from 'react';
import { subscribe } from 'horizon-react';

import TodoItem from './TodoItem';
import Pagination from './Pagination';
import Sort from './Sort';

import styles from './styles';



const mapDataToProps = {
  todos: (hz, props) => hz('todos')
};

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:1,
      sort:0
    }
  }

  changePage(num) {
    this.setState(Object.assign({},this.state,{
      page:this.state.page + num
    }));
  }

  changeSort(sort) {
    this.setState(Object.assign({},this.state,{
      sort:sort
    }));
    
  }

  

  render() {
    let renderList = this.props.todos;
    switch(this.state.sort){
      case 0:
        renderList = renderList.sort(
          (a,b) => {
            return a.time-b.time
        })
        break;
      case 1:
        renderList = renderList.sort(
          (a,b) => {
            return b.time-a.time
        })
        break;
      case 2:
        renderList = renderList.sort(function(a,b){
          return a.text>b.text
        })
        break;
      case 3:
        renderList = renderList.sort(function(a,b){
          return a.text<b.text
        });
        break;
    }   
      renderList = renderList.filter((item,index) => {
        return index >= (this.state.page-1) * this.props.limit && index < this.state.page * this.props.limit
      });
    return (
      <ul className={styles.list} style={{ height: renderList.length * 49 + 50 }}>
        <Sort sort={this.state.sort} changeSort={this.changeSort.bind(this)} ></Sort>
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
