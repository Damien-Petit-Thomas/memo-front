<script>
	import { memos } from '$lib/stores/memo.js';
 	import { todos } from '$lib/stores/todo.js';
	import {categories} from '$lib/stores/category.js';
	import {tags} from '$lib/stores/tag.js'
	import Sidebar from '../lib/components/sidebar/MainSidebar.svelte';

	import {onMount} from 'svelte';
  export let data;

	// on rempli les stores
	onMount(() => {
		categories.set(data.categories);
		tags.set(data.tags);
		memos.set(data.memos);
		todos.set(data.todos);
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