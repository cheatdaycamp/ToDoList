var data_utils = {
    todo: ["Cook dinner", "Catch some Pokemons", "play the guitar"],
    done: ["Build a 3m sand castle", "Running", "Jogging",
    ]
}

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this)
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
        data_utils.todo = [];
        data_utils.done = [];
    }

    render() {
        var todo = this.renderItem(data_utils.todo);
        var done = this.renderItem(data_utils.done)
        return (
            <div className="appContainer">
                <Input />
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
            <div className="header">
                <input type="text" value={this.state.inputValue} onChange = {this.updateInputValue} placeholder="what should I do next?" />
                <div onClick={this.addItem} className="add"><i className="fas fa-plus"></i></div>
            </div>
        )
    }
}
class Item extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li>
                <div className="itemWrapper">
                    <div className="circleSmall nomargin">
                        <i className="fas fa-check"></i>
                    </div>
                    <div className="items">Pija</div>
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
            </li>
        )
    }
}



(() => {
    ReactDOM.render(
        <ToDo />,
        document.getElementById("root"));
})();

