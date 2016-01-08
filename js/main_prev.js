var ToDoItem = React.createClass({
	render: function() {
		return (
			<div className="todo_item">
				<input type="checkbox" id={this.props.id} checked={this.props.selected} />
				<label htmlFor={this.props.id}>{this.props.text}</label>
			</div>
		);
	}
});

var ToDoTable = React.createClass({
	render: function() {
		var toDoItems = this.props.data.map(function(toDoItem) {
			return (<ToDoItem id={toDoItem.id} selected={toDoItem.selected} text={toDoItem.text} />);
		});
		return (
			<div id="todo_table">
				{toDoItems}
			</div>
		);
	}
});

var NewToDoItem = React.createClass({
	render: function() {
		return (
			<form className="add_todo_form">
				<input type="text" placeholder="Enter A New Item" />
				<input type="submit" value="Add" />
			</form>
		);
	}
});

var ToDoApp = React.createClass({
	render: function() {
		return (
			<div>
				<NewToDoItem />
				<ToDoTable data={this.props.data} />
			</div>
		);
	}
});

var ToDoData = [
	{id: 1, selected: true, text: "Study React"},
	{id: 2, selected: false, text: "Make Todo App"},
	{id: 3, selected: false, text: "Show to Siddhartha"}
];

ReactDOM.render(
	<ToDoApp data={ToDoData} />,
	document.getElementById('container')
);