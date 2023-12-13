<script>
 import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

function handleKeyDown(e){
const content = e.target.innerText
if (e.ctrlKey && e.key === ' ') {
  e.preventDefault()
  dispatch('contentEdited', content)
}

}


  export let value;
  export let css = null;
	export let isEditable = true;
</script>

<pre>
	<blockquote 
	style={css} contenteditable={isEditable} on:keydown={handleKeyDown}
	>{@html value}</blockquote>
</pre>




<style>






blockquote {
	/* background: rgb(116, 26, 26); */
	background: rgb(53, 48, 48);

	border-left: 4px solid var(--color-orange);
	border-right: 4px solid var(--color-orange);
	font-family: Roboto Slab;
	padding: 2.4rem;
  width: 100%;
	border-radius: 0.4rem;
	color: var(--color-preview-qoute-body) !important;
	font-weight: bold !important;
}
</style>
