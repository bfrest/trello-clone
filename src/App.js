import React, { useState } from 'react';
import './App.css';

function App() {
	const [items, setItems] = useState({
		backlog: ['This Item', 'That Item'],
		todo: ['Another'],
		progress: ['Progress Column'],
		complete: ['Last Item']
	});

	const handleChangeColumn = (itemToMove, currentArr, nextArr) => {
		let copyOfState = {};
		// copying state to modify it
		Object.assign(copyOfState, items);
		const indexOfItem = copyOfState[currentArr].indexOf(itemToMove);
		// removes the task from the previous array
		copyOfState[currentArr].splice(indexOfItem, 1);
		// adds item to the end of the new array
		copyOfState[nextArr].push(itemToMove);
		// sets new state
		setItems(copyOfState);
	};

	const addItem = column => {
    let copyOfState = {};
		// copying state to modify it
		Object.assign(copyOfState, items);
    let itemToAdd = prompt('New Item');
    
    // check if the item already exists
    let arraysToCheck = Object.values(copyOfState);
    if (
			arraysToCheck[0].includes(itemToAdd) ||
      arraysToCheck[1].includes(itemToAdd) ||
      arraysToCheck[2].includes(itemToAdd) ||
      arraysToCheck[3].includes(itemToAdd)
		) {
      return;
    }
			// adds new item to the correct array
			copyOfState[column].push(itemToAdd);
		// sets new state
		setItems(copyOfState);
	};

	return (
		<div className='App'>
			<div className='backlog column'>
				<h2>Backlog</h2>
				<button onClick={() => addItem('backlog')}>+ Add an item</button>

				{/* diplays each item of the specific array */}
				{items.backlog.map(item => (
					<div className='item'>
						<p>{item}</p>
						<button onClick={() => handleChangeColumn(item, 'backlog', 'todo')}>{`>`}</button>
					</div>
				))}
			</div>

			<div className='todo column'>
				<h2>To do</h2>
				<button onClick={() => addItem('todo')}>+ Add an item</button>
				
        {/* diplays each item of the specific array */}
				{items.todo.map(item => (
					<div className='item'>
						<button onClick={() => handleChangeColumn(item, 'todo', 'backlog')}>{`<`}</button>
						<p>{item}</p>
						<button onClick={() => handleChangeColumn(item, 'todo', 'progress')}>{`>`}</button>
					</div>
				))}
			</div>

			<div className='progress column'>
				<h2>In Progress</h2>
				<button onClick={() => addItem('progress')}>+ Add an item</button>

				{/* diplays each item of the specific array */}
				{items.progress.map(item => (
					<div className='item'>
						<button onClick={() => handleChangeColumn(item, 'progress', 'todo')}>{`<`}</button>
						<p>{item}</p>
						<button onClick={() => handleChangeColumn(item, 'progress', 'complete')}>{`>`}</button>
					</div>
				))}
			</div>

			<div className='complete column'>
				<h2>Completed</h2>
				<button onClick={() => addItem('complete')}>+ Add an item</button>

				{/*diplays each item of the specific array  */}
				{items.complete.map(item => (
					<div className='item'>
						<button onClick={() => handleChangeColumn(item, 'complete', 'progress')}>{`<`}</button>
						<p>{item}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
