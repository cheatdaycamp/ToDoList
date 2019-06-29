var data_utils = {
    todo: ["Cook dinner", "Catch some Pokemons", "play the guitar"],
    done: ["Build a 3m sand castle", "Running", "Jogging",
    ]
}

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.updateToDo = this.updateToDo.bind(this);
        this.updateDone = this.updateDone.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            todo: [],
            done: ["Build a 3m sand castle", "Running", "Jogging"]
        }
    }

    renderItem(array) {
        return array.map((element) =>
            <li key={element}>
                <div className="itemWrapper">
                    <div className="circleSmall nomargin">
                        <i className="fas fa-check"></i>
                    </div>
                    <div className="items">{element}</div>
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
    reset() {
        this.setState({
            todo: [],
            done: [],
        })
    }
    updateToDo() {
        return this.renderItem(this.state.todo);
    }
    updateDone() {
        return this.renderItem(this.state.done)
    }
    addToDo(){
        this.setState({
            todo: [],
            done: [],
        })
    }
    render() {
        console.log("check")
        return (
            <div className="appContainer">
                <Input callbackReset = {this.reset}/>
                <div>To Do: </div>
                <div className="toDo">
                    <ul>
                        {this.updateToDo()}
                    </ul>
                </div>
                <div>Done:</div>
                <div className="done">
                    <ul>
                        {this.updateDone()}
                    </ul>
                </div>
            </div>
        )
    } x
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
        console.log("Input Value: " + this.state.inputValue)
        data_utils.todo.push(this.state.inputValue);
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

