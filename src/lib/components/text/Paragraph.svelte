<script>
  export let value;
  export let isEditable=true;
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


<pre
  contenteditable={isEditable}
  on:keydown={handleKeyDown}
  >
  {@html value}
</pre>



<style>
  pre {
    color: rgb(174, 174, 189);
  }

</style>