import React, { Component } from 'react'
import uuid from 'uuid'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

class App extends Component {
	constructor(props) {
		super(props)
		this.state={
			items: [],
			itemsToShow: "all",
			id: uuid(),
			item: '',
			editItem: false,
			isLoaded: false,
			error: null
		}
	}

	/*componentDidMount() {
		fetch("http://185.246.66.84:3000/etorbunova/tasks")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				isLoaded: true,
				items: result.items
			  });
			},
			(error) => {
			  this.setState({
				isLoaded: true,
				error
			  });
			}
		  )
	  }*/



	

	handleChange = event => {
		this.setState({
			item: event.target.value
		})
	}

	handleSubmit = event => {
		event.preventDefault()	
		const newItem = {
			id: this.state.id,
			title: this.state.item,
			completed: false
		}	
		const updatedItems = [...this.state.items, newItem]
		if (this.state.item.length > 0) {
			this.setState({
				items: updatedItems,
				id: uuid(),
				item: '',
				editItem: false
			})
		}
	}

	/*updateTodosToShow = string => {
		this.setState({
			itemsToShow: string
		});
	};*/

	handleDoneTask = (id, completed) => {
		const filteredItems = this.state.items.map(item => {
			item.id === id && (item.completed = !item.completed)
			return item
		})
		this.setState({
			items: filteredItems,
		})
	}

	handleDelete = id => {
		const filteredItems = this.state.items.filter(item => item.id !== id)
		this.setState({
			items: filteredItems
		})
	}

	handleEdit = id => {
		const filteredItems = this.state.items.filter(item => item.id !== id)
		const selectedItem = this.state.items.find(item => item.id === id)
		this.setState({
			items: filteredItems,
			id: id,
			item: selectedItem.title,
			editItem: true
		})
	}

	render() {
		let items = []
		
		if (this.state.itemsToShow === "all") {
			items = this.state.items;
		} 

		/*const {error, isLoaded, item} = this.state;
		if (error) {
			return <div>Ошибка: {error.message}</div>;
		  } else if (!isLoaded) {
			return <div>Загрузка...</div>;
		  } else {
			return (
			  <ul>
				{items.map(item => (
				  <li key={item.id}>
					{item.title} {item.completed}
				  </li>
				))}
			  </ul>
			);
		  }*/

		return (
			<div className="container">
				<div className="row">
					<div className="col-10 col-md-8 mx-auto mt-4">
						<h3 className="text-capitalize text-center">TodoInput</h3>
						<TodoInput
							item={this.state.item}
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
						/>
						<TodoList
							items={items}
							filterDoneTasks={this.filterDoneTasks}
							handleDelete={this.handleDelete}
							handleEdit={this.handleEdit}
							handleDoneTask={this.handleDoneTask}
							updateTodosToShow={this.updateTodosToShow}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App
