import { writable } from 'svelte/store';

export const todos = (() => {
  const { subscribe, update } = writable([]);
  // si le store est vide, on va chercher les données dans la BDD
  
  const add = async (description) => {
    try {
      const response = await fetch('http://localhost:3000/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        const newTodo = await response.json();
        update(($todos) => [...$todos, newTodo]);
      } else {
        console.error(`Error adding todo: ${response.status}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const remove = async (todo) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todo/${todo.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        update(($todos) => $todos.filter((t) => t.id !== todo.id));
      } else {
        console.error(`Error removing todo: ${response.status}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const mark = async (todo) => {
    const done = !todo.done;
    const { description } = todo;
    const data = { done, description };

    try {
      const response = await fetch(`http://localhost:3000/api/todo/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        update(($todos) => $todos.map((t) => (t.id === todo.id ? { ...t, done } : t)));
      } else {
        console.error(`Error updating todo: ${response.status}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return {
    update,
    subscribe,
    add,
    remove,
    mark,
  };
})();
