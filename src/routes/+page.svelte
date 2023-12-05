<script>
	import  {fullmemos} from '$lib/stores/fullmemos.js';
	import { memos } from '$lib/stores/memo.js';
 	import { todos } from '$lib/stores/todo.js';
	import {categories} from '$lib/stores/category.js';
	import {tags} from '$lib/stores/tag.js'
	import Sidebar from '../lib/components/sidebar/Sidebar.svelte';
	import Categorielist from '$lib/components/createList/CreateList.svelte';
	import TodoList from '$lib/components/todolist/Todolist.svelte';
	import {onMount} from 'svelte';
  export let data;

	// on rempli les stores
	onMount(() => {
		categories.set(data.categories);
		tags.set(data.tags);
		memos.set(data.memos);
		todos.set(data.todos);
		fullmemos.set(data.fullmemos);
	});






				</script>







<div class="container">
	<Sidebar/>
</div>




<style>
	.container {
		display: flex;
		height: 100vh;
		width: 100vw;
	}

	
</style>