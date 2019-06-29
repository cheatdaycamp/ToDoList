class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.reset = this.reset.bind(this);
        this.addToDo = this.addToDo.bind(this);
        this.moveToDone = this.moveToDone.bind(this);
        this.checkAndPush = this.checkAndPush.bind(this);

        this.state = {
            todo: [],
            done: []
        }
    }

    renderItem(array) {
        var that = this;
        return array.map((item) => <Item element={item} callbackMove={that.moveToDone} />)
    }
    reset() {
        this.setState({
            todo: [],
            done: [],
        })
    }
    addToDo(newElement) {
        var myNewItem = <Item element={newElement}/>
        var myNewList = (this.state.todo).concat(myNewItem)
        this.setState({
            todo: myNewList,
        })
    }
    moveToDone() {
        console.log("asasda")
        var move = this.state.todo.filter((item, j) => i !== j);
        // var myNewList = (this.state.todo).concat(newElement)
        // this.setState({
        //     todo: myNewList,
        // })
    }
    checkAndPush(e) {
        if (e.target.state.category == "todo") {
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
        console.log(this.state)
        var todo = this.state.todo,
            done = this.renderItem(this.state.done)
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
            category: "todo",
            inputValue: this.props.element
        };
        this.updateInputValue = this.updateInputValue.bind(this)
        this.moveToDone = this.moveToDone.bind(this)
    }

    moveToDone(e) {
        if (this.state.category == 'todo') {
            this.setState({
                category: 'done'
            });
        } else {
            this.setState({
                category: 'todo'
            });
        }
        console.log(e.target)
        this.props.callbackMove
    }
    updateInputValue(e) {
        console.log(e.target.value)
        this.setState({
            inputValue: e.target.value
        });
    }
    render() {
        console.log(this.state.category);
        return (
            <li key={this.props.element} >
                <div className="itemWrapper">
                    <div onClick={this.moveToDone} className="circleSmall nomargin">
                        <i className="fas fa-check"></i>
                    </div>
                </div>
                <input type="text" className="items" value={this.state.inputValue}></input>
                <div className="itemWrapper">
                    <div onClick={this.updateInputValue} className="circleSmall">
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    <div className="circleSmall">
                        <i className="fas fa-star"></i>
                    </div>
                    <div className="circleSmall">
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

