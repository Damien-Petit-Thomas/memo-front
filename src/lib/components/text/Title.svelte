<script>
  export let value;
  export let isEditable = true;
  import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

function handleKeyDown(e){
const content = e.target.innerText
if (e.ctrlKey && e.key === ' ') {
  e.preventDefault()
  dispatch('contentEdited', content)
}

}






</script>

<pre>
  <h2 
  on:keydown={handleKeyDown}
  contenteditable={isEditable}
  >{value}</h2>
</pre>

<style>
  h2 {
    text-align: center;
    font-weight: bold;
    color: var(--color-preview-title);
  }
</style>
