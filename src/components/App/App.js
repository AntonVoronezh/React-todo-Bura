import React, { Component } from 'react';
import './App.css';
import TodoList from '../TodoList';
// import Filter from '../Filter';
import SearchPanel from '../SearchPanel';
import TodoItemAdd from '../TodoItemAdd';
import ItemStatusFilter from '../ItemStatusFilter';

class App extends Component {
	state = {
		items: [
			{ id: 1, label: 'Drink Coffee', important: false, done: false },
			{ id: 2, label: 'Learn React', important: false, done: false },
			{ id: 3, label: 'Make Awesome App', important: false, done: false },
		],
		filter: 'all',
		search: '',
	};

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex(el => id === el.id);

		const oldItem = arr[idx];
		const value = !oldItem[propName];

		const newItem = { ...arr[idx], [propName]: value };

		return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
	}

	onToggleImportant = id => {
		this.setState(({ items }) => {
			const itemsArr = this.toggleProperty(items, id, 'important');
			return { items: itemsArr };
		});
	};

	onToggleDone = id => {
		this.setState(({ items }) => {
			const itemsArr = this.toggleProperty(items, id, 'done');
			return { items: itemsArr };
		});
	};

	onDelete = id => {
		this.setState(({ items }) => {
			const idx = items.findIndex(el => id === el.id);

			return { items: [...items.slice(0, idx), ...items.slice(idx + 1)] };
		});
	};

	onItemAdded = label => {
		const itemsCount = this.state.items.length;

		const newItem = { id: itemsCount + 1, label, important: false, done: false };

		this.setState(({ items }) => {
			return { items: [...items, newItem] };
		});
	};

	searchItems(items = [], text = '') {
		if (text.length === 0) {
			return items;
		}

		return items.filter(({ label }) => label.toLowerCase().indexOf(text.toLowerCase()) > -1);
	}

	onSearchChange = search => {
		this.setState({ search });
  };
  
  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  
	filterItems(items, filter) {
		if (filter === 'all') {
			return items;
		} else if (filter === 'active') {
			return items.filter(item => !item.done);
		} else if (filter === 'done') {
			return items.filter(item => item.done);
		}
	}

	render() {
		const { items, search, filter } = this.state;
		const visiblItems = this.searchItems(this.filterItems(items, filter), search);

		return (
			<div className="todo-app">
				<div className="search-panel d-flex">
					<SearchPanel onSearchChange={this.onSearchChange} />
					<ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
				</div>

				<TodoList
					items={visiblItems}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}
					onDelete={this.onDelete}
				/>
				<TodoItemAdd onItemAdded={this.onItemAdded} />
			</div>
		);
	}
}

export default App;
