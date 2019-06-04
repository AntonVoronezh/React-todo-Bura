import React, { Component } from 'react';
import './SearchPanel.css';

class SearchPanel extends Component {
	state = {
		term: '',
  };
  
	onTermChange = e => {
		const value = e.target.value;
    this.setState({ term: value });
    
    const {onSearchChange = () => {}} = this.props;

    onSearchChange(value);
	};

	render() {
		return (
			<input
				type="text"
				className="form-control search-input"
				placeholder="type to search"
				value={this.state.term}
				onChange={this.onTermChange}
			/>
		);
	}
}

export default SearchPanel;
