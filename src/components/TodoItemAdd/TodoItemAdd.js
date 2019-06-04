import React, { Component } from 'react';
import './TodoItemAdd.css';

export default class TodoItemAdd extends Component {
	state = {
		label: '',
	};

	onLabelChange = e => {
		this.setState({ label: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

    const { label } = this.state;
    
		if (label !== '') {
			this.props.onItemAdded(label);
			this.setState({ label: '' });
		}
	};

	render() {
		return (
			<form className="bottom-panel d-flex" onSubmit={this.onSubmit}>
				<input
					type="text"
					className="form-control new-todo-label"
					value={this.state.label}
					onChange={this.onLabelChange}
					placeholder="What needs to be done?"
				/>

				<button type="submit" className="btn btn-outline-secondary">
					Add
				</button>
			</form>
		);
	}
}
