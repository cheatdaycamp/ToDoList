class CreateToDO {
    constructor(id, activity, done = false, stared = false) {
        this.id = id;
        this.activity = activity;
        this.done = done;
        this.stared = stared;
    }
}

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.addToDo = this.addToDo.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.starToDo = this.starToDo.bind(this);
        this.updateName = this.updateName.bind(this);
        this.checkToDosLength = this.checkToDosLength.bind(this);
        this.state = {
            toDoList: []
        };
        this.nextId = 3;
    }

    checkToDosLength() {
        return this.state.toDoList.length > 0;
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
        this.setState({
            toDoList: this.state.toDoList.concat([new CreateToDO(this.nextId, newElement)])
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
        this.checkToDosLength()
    }

    starToDo(idReceived) {
        let list = this.state.toDoList;
        let element =list.findIndex(el => el.id === idReceived)
            list[element].stared = !list[element].stared ;
        this.setState({
            toDoList: list
        });
    }

    updateName(idReceived, newActivity) {
        let list = this.state.toDoList;
        list[list.findIndex(el => el.id === idReceived)].activity = newActivity;
        this.setState({
            toDoList: list
        });
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
        let toDos = [];
        let done = [];
        this.state.toDoList.sort((a,b) => b.stared - a.stared || a.id - b.id).forEach((item)=>
        {
            item.done ? done.push(item) : toDos.push(item)
        })
        return (
            <div className="appContainer">
                <Input callbackReset={this.reset} callbackAddToDo={this.addToDo}
                       callbackLength={this.checkToDosLength()}/>
                <div>To Do:</div>
                <div className="toDo">
                    <ul>
                        {toDos.map(item => (
                            <Item
                                todo={item}
                                key={`toDo_${item.id}`}
                                callbackDelete={this.deleteItem}
                                callbackMove={this.changeStatus}
                                callbackStared={this.starToDo}
                                callbackChangeName={this.updateName}
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
                                key={`done_${item.id}`}
                                callbackDelete={this.deleteItem}
                                callbackMove={this.changeStatus}
                                callbackStared={this.starToDo}
                                callbackChangeName={this.updateName}
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
        this.updateName = this.updateName.bind(this);
        this.enableModification = this.enableModification.bind(this);
        this.moveCaretToTheEnd = this.moveCaretToTheEnd.bind(this);
        this.resetInputValue = this.resetInputValue.bind(this);
        this.checkLetter = this.checkLetter.bind(this);
        this.changeStarStatus = this.changeStarStatus.bind(this)
        this.state = {
            inputValue: this.props.todo.activity,
            isDisabled: true,
            enableButton: false,
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

    updateName() {
        this.props.callbackChangeName(this.props.todo.id, this.state.inputValue);
        this.textInput.disabled = true;
    }

    checkLetter(e) {
        if ((e.key === 'Enter' && this.textInput.disabled === false)) {
            this.updateName()
        } else if (e.keyCode === 27) {
            this.resetInputValue();
        } else {
            this.updateInputValue(e)
        }
    }

    resetInputValue() {
        this.setState({
            inputValue: this.props.todo.activity
        });
        this.textInput.blur();
        this.setState({
            enableButton: false
        });
    }

    enableModification() {
        this.setState({
            enableButton: !this.state.enableButton
        });
        this.textInput.disabled = false;
        this.textInput.focus();
    }

    moveCaretToTheEnd(e) {
        e.target.value = '';
        e.target.value = this.state.inputValue;
    }

    changeStarStatus(){
        this.props.callbackStared(this.props.todo.id)
    }
    //triggers the delete method on parent
    deleteThis() {
        this.props.callbackDelete(this.props.todo.id);
    }

    render() {
        return (
            <li>
                <div className="itemWrapper">
                    <div onClick={this.toggleStatus} className="circleSmall nomargin">
                        <i className="fas fa-check"/>
                    </div>
                </div>
                <input
                    ref={(textInput) => this.textInput = textInput}
                    type="text" className="items"
                    value={this.state.inputValue}
                    onBlur={this.resetInputValue}
                    onKeyUp={this.checkLetter}
                    onFocus={this.moveCaretToTheEnd}
                    onChange={this.updateInputValue}
                    disabled={true}
                >
                </input>

                <div className="itemWrapper">
                    {/*{this.state.enableButton &&*/}
                    {/*<div className="circleSmall" onClick={this.updateName}>*/}
                    {/*    A*/}
                    {/*</div>}*/}
                    <div onClick={this.enableModification} className="circleSmall">
                        <i className="fas fa-pencil-alt"/>
                    </div>
                    <div onClick = {this.changeStarStatus}className={this.props.todo.stared? "stared circleSmall" : "circleSmall"}>
                        <i className={"fas fa-star" + `${this.props.todo.stared ? " stared " : ""}`}/>
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
            inputValue: "",
        };
        this.addItem = this.addItem.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.checkKeyPress13 = this.checkKeyPress13.bind(this);
    }

    addItem() {
        this.state.inputValue.length && this.props.callbackAddToDo(this.state.inputValue);
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
                {this.props.callbackLength && <div onClick={this.props.callbackReset} className="add">
                    <i className="fas fa-redo"/>
                </div>}
            </div>
        );
    }
}

(() => {
    ReactDOM.render(<ToDo/>, document.getElementById("root"));
})();
