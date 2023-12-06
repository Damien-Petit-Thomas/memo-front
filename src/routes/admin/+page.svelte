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
      console.log('get categories')
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
			<TodoList 
			store={todos}
			 done={true}
	
			 />
		</div>
	</div>
	<div class="list-container">
		
		<Categorielist
		 store={categories}
		 title="creer une catégorie"
		 />
		<Categorielist 
		title="creer un tag"
		store={tags} />
	</div>

</div>



	<!-- <a href="" >drag-test</a> -->
	<a href="/admin/create-memo" >creer un memo</a>
<style>
	.list-container{
		display: flex;
	width: 100vw;
	justify-content: space-between;
	}
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
