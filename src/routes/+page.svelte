<script>
	import { createTodoStore } from '$lib/stores/todos.js';
	import TodoList from '$lib/components/todolist/Todolist.svelte';
   export let data;
	 const todosDB = data.todos.map((todo) => {
		return {
			done: todo.done,
			description: todo.description,
			id: todo.id
		};
	});
	const todos = createTodoStore(
	todosDB
	);
	
</script>
<div class="board">
	<input
		placeholder="ajouter une tâche"
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				todos.add(e.currentTarget.value);
				e.currentTarget.value = '';
			}
		}}
	/>

	<div class="wrapper">
		<div class="todo">
			<h2>À FAIRE</h2>
			<TodoList store={todos} done={false} />
		</div>
		<div class="done">
			<h2>EN COURS</h2>
			<TodoList store={todos} done={true} />
		</div>
		</div>
	</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.board {
		display: flex;
		flex-direction: column;

	}

	.board > input {

		width: 100%;
		font-size: 1.4em;
		grid-column: 1/3;
		padding: 0.5em;
		margin: 0 0 1rem 0;
	}


	h2 {
		font-size: 2em;
		font-weight: 200;
	}
</style>
