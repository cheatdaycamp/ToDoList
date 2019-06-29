class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.addToDo = this.addToDo.bind(this);
        this.moveToDone = this.moveToDone.bind(this);
        this.checkAndPush = this.checkAndPush.bind(this);
        this.deleteItem = this.deleteItem.bind(this)
        this.state = {
            todo: [],
            done: []
        }
    }

    // resets all the items in both lists
    reset() {
        this.setState({
            todo: [],
            done: [],
        })
    }

    // on button '+' adds a new element.
    addToDo(newElement) {
        var myNewItem = <Item list={"todo"} element={newElement} callbackMove={this.moveToDone} callbackDelete = {this.deleteItem}/>
        this.checkAndPush(myNewItem)
        // var myNewList = (this.state.todo).concat(myNewItem)
        // this.setState({
        //     todo: myNewList,
        // })
    }

    // deletes item
    deleteItem(){
        console.log("delete")
    }

    //moves between lists
    moveToDone() {
        var tempshit=[];
        for (var i = 0; i < this.state.todo.length; i++) {
            if (this.state.todo[i].props.list !== 'todo') {
                tempshit = (this.state.todo[i]);
                console.log("the element" + tempshit)
                var newTodo = this.state.todo.splice(i,1)
                console.log(newTodo)
                var newDone = this.state.done.concat(tempshit);
                console.log(newDone)
                this.setState({
                    todo: newTodo,
                    done: newDone
                })
            } else if (this.state.todo[i].props.list !== 'done') {
                tempshit = (this.state.done[i]);
                console.log("the element" + tempshit)
                var newTodo = this.state.done.concat(tempshit);
                console.log(newTodo)
                var newDone = this.state.todo.splice(i,1)
                console.log(newDone)
                this.setState({
                    todo: newTodo,
                    done: newDone
                })
            }
        }
    }

    // Checks the property of the item, an according to it, adds it to the right State in the parent component.
    checkAndPush(newElement) {
        if (newElement.props.list == "todo") {
            var myNewList = (this.state.todo).concat(newElement)
            this.setState({
                todo: myNewList,
            })
        } else {
            var myNewList = (this.state.done).concat(newElement)
            this.setState({
                done: myNewList,
            })
        }
    }

    render() {
        console.log("Rendering")
        var todo = this.state.todo,
            done = this.state.done;
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
    } x
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.list,
            inputValue: this.props.element,
            delete: false,
        };
        this.props.delete =false;
        this.updateInputValue = this.updateInputValue.bind(this)
        this.moveToDone = this.moveToDone.bind(this)
        this.deleteThis = this.deleteThis.bind(this)
    }

    //toggles between todo and done state and prop
    moveToDone(e) {
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
        this.props.element = e.target.value;
    }

    //triggers the delete method on parent
    deleteThis(){
        this.props.delete = true;
        this.setState({
            delete: true
        });
        this.props.callbackDelete()
    }
    render() {
        console.log(this.state.category);
        return (
            <li key={this.props.keynumber} >
                <div className="itemWrapper">
                    <div onClick={this.moveToDone} className="circleSmall nomargin">
                        <i className="fas fa-check"></i>
                    </div>
                </div>
                <input onBlur={this.updateInputValue} type="text" className="items" value={this.state.inputValue}></input>
                <div className="itemWrapper">
                    <div onClick={this.updateInputValue} className="circleSmall">
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    <div className="circleSmall">
                        <i className="fas fa-star"></i>
                    </div>
                    <div  onClick={this.deleteThis} className="circleSmall">
                        <i className="fas fa-trash-alt"></i>
                    </div>
                </div>
            </li>);
    }

}

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this)
        this.state = {
            inputValue: ""
        }
    }
    addItem() {
        this.props.callbackAddToDo(this.state.inputValue)
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

