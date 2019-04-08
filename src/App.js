// -*-RJSX-*-

import React, { useState } from 'react';
import LC from  'leancloud-storage';
import AppStyles from './App.module.css';

LC.init('B09iIN0UKf2qQIjqKz5WiRnv-gzGzoHsz', 'Xes23aMR9VUqzpmEvch8YV4A');

function saveTodo(content) {
  const Todo = LC.Object.extend('Todo');
  const todo = new Todo();
  todo.set('content', content);
  todo.set('finished', false);
  return todo.save();
}

function loadTodos() {
  const query = new LC.Query('Todo');
  query.equalTo('finished', false);
  query.limit(20);
  query.descending('createdAt');
  return query.find();
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(undefined);
  const [error, setError] = useState('');
  const addTodo = () => {
    saveTodo(inputValue).then(todo => {
      setInputValue('');
      setTodos(prev => [todo].concat(prev));
    }).catch(setError);
  };

  if (todos === undefined) {
    loadTodos().then(setTodos).catch(setError);
  }

  const toggle = item => {
    item.set('finished', !item.get('finished'));
    item.save().then(() => setTodos(prev => prev.slice(0))).catch(setError);
  };

  return (
    <div className={AppStyles.app}>
      <div className={AppStyles.error}>{error.toString()}</div>
      <div className={AppStyles.add}>
        <input placeholder="What to do next?" value={inputValue}
               onChange={e => setInputValue(e.target.value)}
               onKeyUp={e => { if (e.keyCode === 13) addTodo(); } } />
        <input type="button" value="↩" />
      </div>
      <ul>
        {todos && todos.map(item =>
                   <li key={item.getObjectId()} onClick={() => toggle(item)}
                       data-finished={item.get('finished')}>
                     {item.get('content')}
                   </li> )}
      </ul>
    </div>
  );
}

export default App;
