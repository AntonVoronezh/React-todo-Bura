import React from 'react';
import './Todo.css';
import TodoItem from './TodoItem';

const TodoList = ({ items, onToggleImportant, onToggleDone, onDelete }) => {
	const todoItems = items.map(i => {
		const { id, ...rest } = i;

		return (
			<li key={id} className="list-group-item">
				<TodoItem
					{...rest}
					onToggleImportant={() => onToggleImportant(id)}
					onToggleDone={() => onToggleDone(id)}
					onDelete={() => onDelete(id)}
				/>
			</li>
		);
	});
	return <ul className="todo-list list-group">{todoItems}</ul>;
};

export default TodoList;
