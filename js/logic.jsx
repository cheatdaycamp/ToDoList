class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.addToDo = this.addToDo.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.starToDo = this.starToDo.bind(this);
        this.state = {
            toDoList: [
                {
                    id: 2,
                    activity: "Hi",
                    done: false,
                    stared: false,
                },
                {
                    id: 3,
                    activity: "This should start as done",
                    done: true,
                    stared: false,

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
        this.nextId++;
        let toDo = {
            id: this.nextId,
            activity: newElement,
            done: false,
            stared: false,
        };
        this.setState({
            toDoList: this.state.toDoList.concat([toDo])
        });
    }

    // deletes item
    deleteItem(idReceived) {
        let list = this.state.toDoList.filter(todo => {
            return todo.id !== idReceived;
        });

        this.setState({
            toDoList: list
        });
    }

    starToDo(idReceived) {

    }

    changeStatus(idReceived) {
        let list = this.state.toDoList;
        let indexOfToDo = this.state.toDoList.findIndex(
            todo => todo.id === idReceived
        );
        list[indexOfToDo].done = !list[indexOfToDo].done;
        this.setState({
            toDoList: list
        });
    }

    render() {
        let toDos = this.state.toDoList.filter(item => {
            return item.done === false;
        });
        let done = this.state.toDoList.filter(item => {
            return item.done === true;
        });

        return (
            <div className="appContainer">
                <Input callbackReset={this.reset} callbackAddToDo={this.addToDo}/>
                <div>To Do:</div>
                <div className="toDo">
                    <ul>
                        {toDos.map(item => (
                            <Item
                                todo={item}
                                key={item.id}
                                callbackDelete={this.deleteItem}
                                callbackMove={this.changeStatus}
                                callbackStared={this.starToDo}
                            />
                        ))}
                    </ul>
                </div>
                <div>Done:</div>
                <div className="done">
                    <ul>
                        {done.map(item => (
                            <Item
                                todo={item}
                                key={item.id}
                                callbackDelete={this.deleteItem}
                                callbackMove={this.changeStatus}
                            />
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
        this.updateInputValue = this.updateInputValue.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
        this.deleteThis = this.deleteThis.bind(this);
        this.state = {
            inputValue: this.props.todo.activity
        }
    }

    //toggles
    toggleStatus() {
        this.props.callbackMove(this.props.todo.id);
    }

    //updates the input value when the user clicks on the pencil
    updateInputValue(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    //triggers the delete method on parent
    deleteThis() {
        this.props.callbackDelete(this.props.todo.id);
    }

    render() {
        this.props.element = this.props.inputValue;
        return (
            <li>
                <div className="itemWrapper">
                    <div onClick={this.toggleStatus} className="circleSmall nomargin">
                        <i className="fas fa-check"/>
                    </div>
                </div>
                <input
                    type="text" className="items"
                    value={this.state.inputValue}
                    onBlur={this.updateInputValue}
                    onChange={this.updateInputValue}
                >
                </input>

                <div className="itemWrapper">
                    <div className="circleSmall">
                        <i className="fas fa-pencil-alt"/>
                    </div>
                    <div className="circleSmall">
                        <i className="fas fa-star"/>
                    </div>
                    <div onClick={this.deleteThis} className="circleSmall">
                        <i className="fas fa-trash-alt"/>
                    </div>
                </div>
            </li>
        );
    }
}


class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };
        this.addItem = this.addItem.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.checkKeyPress13 = this.checkKeyPress13.bind(this)
    }

    addItem() {
        this.props.callbackAddToDo(this.state.inputValue);
        this.setState({
            inputValue: ""
        });
    }

    checkKeyPress13(e) {
        e.key === 'Enter' && this.addItem()
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
                        onKeyPress={this.checkKeyPress13}
                        placeholder="what should I do next?"
                    />
                    <div onClick={this.addItem} className="add">
                        <i className="fas fa-plus"/>
                    </div>
                </div>
                <div onClick={this.props.callbackReset} className="add">
                    <i className="fas fa-redo"/>
                </div>
            </div>
        );
    }
}

(() => {
    ReactDOM.render(<ToDo/>, document.getElementById("root"));
})();
