class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.updateToDo = this.updateToDo.bind(this);
        this.updateDone = this.updateDone.bind(this);
        this.reset = this.reset.bind(this);
        this.addToDo = this.addToDo.bind(this);

        this.state = {
            todo: ["play the guitar", "asdas"],
            done: ["Build a 3m sand castle", "Running", "Jogging"]
        }
    }

    renderItem(array) {
        return array.map((item) => <Item element={item} />)
    }
    reset() {
        this.setState({
            todo: [],
            done: [],
        })
    }
    updateToDo() {
        var that = this;
        return that.renderItem(this.state.todo);
    }
    updateDone() {
        var that = this;
        return that.renderItem(this.state.done)
    }
    addToDo(newElement) {
        console.log("the new element is " + newElement);
        var myNewList = (this.state.todo).concat(newElement)
        console.log("the current list is " + myNewList)
        this.setState({
            todo: myNewList,
        })
    }
    render() {
        console.log(typeof (this.state.todo));
        var todo = this.renderItem(this.state.todo),
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
            inputValue: ""
        }
    }
    render() {
        return (
            <li key={this.props.element}>
                <div className="itemWrapper">
                    <div className="circleSmall nomargin">
                        <i className="fas fa-check"></i>
                    </div>
                    <div className="items">{this.props.element}</div>
                </div>

                <div className="itemWrapper">
                    <div className="circleSmall ">
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    <div className="circleSmall">
                        <i className="fas fa-star"></i>
                    </div>
                    <div className="circleSmall">
                        <i className="fas fa-minus"></i>
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
        console.log("rendered")
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

