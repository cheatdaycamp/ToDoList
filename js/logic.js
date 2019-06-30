class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.addToDo = this.addToDo.bind(this);
        this.moveToDone = this.moveToDone.bind(this);
        this.checkAndPush = this.checkAndPush.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            todo: [],
            done: [],
        }
        this.nextId = 0;
    }

    // resets all the items in both lists
    reset() {
        this.setState({
            todo: [],
            done: [],
        })
        this.nextId = 0;
    }

    // on button '+' adds a new element.
    addToDo(newElement) {
        console.log(newElement)
        var myNewItem = <Item list={"todo"} keyword={this.nextId} element={newElement} callbackMove={this.moveToDone} callbackDelete={this.deleteItem} />;
        this.nextId++;
        this.setState({
            todo: this.state.todo.concat(myNewItem)
        })
    }

    // deletes item
    deleteItem(idReceived) {
        console.log(idReceived);
        this.setState({
            todo: this.state.todo.filter((val) => {
                return val.props.keyword !== idReceived
            }),
            done: this.state.done.filter((val) => {
                return val.props.keyword !== idReceived
            })
        });
        // this.state.todo.map((d) => d.setState({ inputValue: this.props.element }))
    }

    moveToDone() {
        var newTodo = this.state.todo, newDone = this.state.done, tempValue;
        for (var i = 0; i < this.state.todo.length; i++) {
            if (this.state.todo[i].props.list !== 'todo') {
                tempValue = (this.state.todo[i]);
                newTodo = this.state.todo.splice(i, 1)
                newDone = this.state.done.push(tempValue);
                this.setState({
                    todo: newTodo,
                    done: newDone
                })
            }

            // else if (this.state.todo[i].props.list !== 'done') {
            //     tempValue = (this.state.done[i]);
            //     var newTodo = this.state.done.concat(tempValue);
            //     var newDone = this.state.todo.splice(i,1)
            //     this.setState({
            //         todo: newTodo,
            //         done: newDone
            //     })
            // }
        } tempValue = [];
    };

    // Checks the property of the item, an according to it, adds it to the right State in the parent component.
    checkAndPush(newElement) {
        var newTodo = this.state.todo, newDone = this.state.done;
        (newElement.props.list == "todo") ? newTodo.push(newElement) : newTodo.push(newElement);
        this.setState({
            todo: newTodo,
            done: newDone,
        })
    }

    render() {
        var todo = this.state.todo,
            done = this.state.done;
        console.log(this.state.todo);
        return (
            <div className="appContainer">
                <Input callbackReset={this.reset} callbackAddToDo={this.addToDo} />
                <div>To Do: </div>
                <div className="toDo">
                    <ul>
                        {todo}
                    </ul>
                </div>
                <div>Done:</div>
                <div className="done">
                    <ul>
                        {done}
                    </ul>
                </div>
            </div>
        )
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        console.log(`constructor ${this.props.element}`)
        this.state = {
            category: this.props.list,
            inputValue: this.props.element,
            delete: false,
        };
        this.props.delete = false;
        this.updateInputValue = this.updateInputValue.bind(this)
        this.moveToDone = this.moveToDone.bind(this)
        this.deleteThis = this.deleteThis.bind(this)
    }

    //toggles between todo and done state and prop
    moveToDone() {
        if (this.state.category == 'todo') {
            this.setState({
                category: 'done'
            });
            this.props.list = 'done'
        } else {
            this.setState({
                category: 'todo'
            });
            this.props.list = 'todo'
        }
        this.props.callbackMove()
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
        // this.props.delete = true;
        // this.setState({
        //     delete: true
        // });
        this.props.callbackDelete(this.props.keyword)
    }
    render() {
        this.props.element = this.props.inputValue;
        return (
            <li key={this.props.keyword} >
                <div className="itemWrapper">
                    <div onClick={this.moveToDone} className="circleSmall nomargin">
                        <i className="fas fa-check"></i>
                    </div>
                </div>
                <input onBlur={this.updateInputValue} type="text" className="items" value={this.state.inputValue}></input>
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
            </li>);
    }
}

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };
        this.addItem = this.addItem.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this)
    }
    addItem() {
        console.log(this.state.inputValue);
        this.props.callbackAddToDo(this.state.inputValue);
        console.log("after adding item")
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
                    <input type="text" value={this.state.inputValue} onChange={this.updateInputValue} placeholder="what should I do next?" />
                    <div onClick={this.addItem} className="add"><i className="fas fa-plus"></i></div>
                </div>
                <div onClick={this.props.callbackReset} className="add"><i className="fas fa-redo"></i></div>
            </div>
        )
    }
}

(() => {
    ReactDOM.render(
        <ToDo />,
        document.getElementById("root"));
})();

