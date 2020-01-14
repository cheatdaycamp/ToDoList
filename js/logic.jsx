class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      toDoList: [
        {
          id: 2,
          activity: "caca",
          done: false
        },
        {
          id: 3,
          activity: "caca2",
          done: true
        }
      ]
    };
    this.nextId = 4;
  }

  // resets all the items in both lists
  reset() {
    this.setState({
      toDoList: []
    });
    this.nextId = 0;
  }

  // on button '+' adds a new element.
  addToDo(newElement) {
    console.log(newElement);
    this.nextId++;
    let toDo = {
      id: this.nextId,
      activity: newElement,
      done: false
    };
    console.log(toDo);

    let new_list = this.state.toDoList.concat([toDo])
    console.log(new_list)
    this.setState({
      toDoList: new_list
    });
  }

  // deletes item
  deleteItem(idReceived) {
    let list = this.state.toDoList;
    list.splice(
      todos.findIndex(item => {
        return item.id === idReceived;
      }),
      1
    );
    this.setState({
      toDoList: list
    });
  }

  render() {
    console.log(this.state)
    let toDos = this.state.toDoList.filter(item => {
      return item.done == false;
    });
    let done = this.state.toDoList.filter(item => {
      return item.done == true;
    });

    return (
      <div className="appContainer">
        <Input callbackReset={this.reset} callbackAddToDo={this.addToDo} />
        <div>To Do:</div>
        <div className="toDo">
          <ul>
            {toDos.map(item => (
              <Item todo={item} key={item.id} />
            ))}
          </ul>
        </div>
        <div>Done:</div>
        <div className="done">
          <ul>
            {done.map(item => (
              <Item todo={item} key={item.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.props.delete = false;
    this.updateInputValue = this.updateInputValue.bind(this);
    this.moveToDone = this.moveToDone.bind(this);
    this.deleteThis = this.deleteThis.bind(this);
  }

  //toggles
  moveToDone() {
    if (this.state.category == "todo") {
      this.setState({
        category: "done"
      });
      this.props.list = "done";
    } else {
      this.setState({
        category: "todo"
      });
      this.props.list = "todo";
    }
    this.props.callbackMove();
  }

  //updates the input value when the user clicks on the pencil
  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
    // this.props.element = e.target.value;
  }

  //triggers the delete method on parent
  deleteThis() {
    this.props.callbackDelete(this.props.keyword);
  }

  render() {
    this.props.element = this.props.inputValue;
    return (
      <li>
        <div className="itemWrapper">
          <div onClick={this.moveToDone} className="circleSmall nomargin">
            <i className="fas fa-check"></i>
          </div>
        </div>
        {/*<input onBlur={this.updateInputValue} type="text" className="items"*/}
        {/*       value={this.props.todo.activity}>*/}
        {/*</input>*/}

        <span>{this.props.todo.activity}</span>

        <div className="itemWrapper">
          <div className="circleSmall">
            <i className="fas fa-pencil-alt"></i>
          </div>
          <div className="circleSmall">
            <i className="fas fa-star"></i>
          </div>
          <div onClick={this.deleteThis} className="circleSmall">
            <i className="fas fa-trash-alt"></i>
          </div>
        </div>
      </li>
    );
  }
}
// asasd
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.addItem = this.addItem.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  addItem() {
    this.props.callbackAddToDo(this.state.inputValue);
    this.setState({
      inputValue: ""
    });
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.updateInputValue}
            placeholder="what should I do next?"
          />
          <div onClick={this.addItem} className="add">
            <i className="fas fa-plus"></i>
          </div>
        </div>
        <div onClick={this.props.callbackReset} className="add">
          <i className="fas fa-redo"></i>
        </div>
      </div>
    );
  }
}

(() => {
  ReactDOM.render(<ToDo />, document.getElementById("root"));
})();
