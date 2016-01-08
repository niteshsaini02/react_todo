var ToDoItem = React.createClass({
	loadCheckedState: function() {
		$.ajax({
			url: this.props.url,
			data: 'dowhat=getCheckedState&id='+this.props.id,
			cache: false,
			success: function(data) {
				//console.log(data);
				this.setState({selected: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handleCheckedState: function(e) {
		var cboxID = e.target.getAttribute('id');
		//console.log(cboxID);
		$.ajax({
			url: this.props.url,
			type: 'POST',
			data: 'dowhat=changeCBox&id='+e.target.getAttribute('id'),
			cache: false,
			success: function(data) {
				//console.log(data);
				this.setState({selected: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {selected: this.props.selected};
	},
	componentDidMount: function() {
		this.loadCheckedState();
		setInterval(this.loadCheckedState, 2000);
	},
	render: function() {
		return (
			<div className="todo_item">
				<input type="checkbox" id={this.props.id} onChange={this.handleCheckedState} checked={this.state.selected} />
				<label htmlFor={this.props.id}>{this.props.text}</label>
			</div>
		);
	}
});

var ToDoTable = React.createClass({
	render: function() {
		var url = this.props.url;
		var toDoItems = this.props.data.map(function(toDoItem) {
			return (<ToDoItem url={url} key={toDoItem.key} id={toDoItem.key} selected={toDoItem.selected} text={toDoItem.text} />);
		});
		return (
			<div id="todo_table">
				{toDoItems}
			</div>
		);
	}
});

var NewToDoItem = React.createClass({
	getInitialState: function() {
		return {text: ''};
	},
	handleTextChange: function(e) {
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var text = this.state.text.trim();
		if (!text) return;
		this.props.onTodoSubmit({text: text});
		this.setState({text: ''});
	},
	render: function() {
		return (
			<form className="add_todo_form" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Enter A New Item" value={this.state.text} onChange={this.handleTextChange} />
				<input type="submit" value="Add" />
			</form>
		);
	}
});

var ToDoApp = React.createClass({
	loadToDoFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			data: 'dowhat=getList',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handleToDoSubmit: function(todo) {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: todo,
			success: function(data) {
				//console.log(data);
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadToDoFromServer();
		setInterval(this.loadToDoFromServer, this.props.toDoInterval);
	},
	render: function() {
		return (
			<div>
				<NewToDoItem onTodoSubmit={this.handleToDoSubmit} />
				<ToDoTable url={this.props.url} data={this.state.data} />
			</div>
		);
	}
});

ReactDOM.render(
	<ToDoApp url='todo_functions.php' toDoInterval={2000} />,
	document.getElementById('container')
);