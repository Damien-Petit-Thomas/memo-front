<script>
	import { memos } from '$lib/stores/memo.js';
	import { todos } from '$lib/stores/todo.js';
	import {onMount} from 'svelte';
	
	import {categories} from '$lib/stores/category.js';
	import {tags} from '$lib/stores/tag.js'
	import Categorielist from '$lib/components/createList/CreateList.svelte';
	import TodoList from '$lib/components/todolist/Todolist.svelte';
	
	onMount(() => {
		if ($categories.length === 0) {
			categories.get()
		}
		if ($tags.length === 0) {
			tags.get()
		}
		if ($todos.length === 0) {
			todos.get()
		}
	});
	
	
</script>

<div class="container_main">
	<div class="container_todo">
		<div class="wrapper_todo-header">
			<h3>TODO LIST</h3>
			<input
			placeholder="ajouter une tâche"
			type="text"
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					todos.add(e.currentTarget.value);
					e.currentTarget.value = '';
				}
			}}
			/>
		</div>
		<div class="wrapper">
			<div class="todo">
				<h2>À FAIRE</h2>
				<TodoList store={todos} done={false} />
			</div>
			<div class="done">
				<h2>EN COURS</h2>
				<TodoList
				store={todos}
				done={true}
				/>
			</div>
		</div>
	</div>
	
	<div class="container-form">
		
		<Categorielist
		store={categories}
		title="creer une catégorie"
		/>
		<Categorielist 
		title="creer un tag"
		store={tags} />
	</div>
	
</div>



<button class='btn btn-create-memo'>
	<a href="/admin/create-memo" >creer un memo</a>
</button>
<style>
	
	.btn {
		align-self: center;
		background: none;
		width: 15rem;
		border: 2px solid #4CAF50;
		border-radius: 0;
		color: #4CAF50;
		text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
		padding: 1rem;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 1rem;
		margin: 1rem;
		cursor: pointer;
	}

	.btn:hover {
		border-top : none;
		border-bottom : none;
		box-shadow: none;
		width: 20rem;
	}

	a:hover {
		text-decoration: none;
		color: #4CAF50;
	}


	.container-form {
		padding: 1rem;

		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	
	.container_todo {
		padding: 1rem;
		width : 50%;
		gap:2rem;
		border: 1px solid #4CAF50;
		box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
		display: flex;
		flex-direction: column;
	}
	
	.container_todo input[type="text"] {
		padding: 0.5rem;
		margin-top: 1rem;
		border: 1px solid #098f09;
		color: #4CAF50;
		width: 80%;
	}
	
	.wrapper {
		display: flex;
		flex-direction: row;
		
		justify-content: space-between;
	}
	
	.container_main {
		color: #4CAF50;
		text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
		gap: 3rem;
		justify-content: space-between;
		display: flex;
		margin: 2rem;
	}
	
	
	
	h2 {
		font-size: 2em;
		font-weight: 200;
	}
</style>
