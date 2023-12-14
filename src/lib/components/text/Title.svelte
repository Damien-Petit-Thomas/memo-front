<script>
	import { createEventDispatcher } from "svelte";
	export let value;
	export let isEditable = true;
	let isSave = false;
	let original = value;
	export let css = null;
const dispatch = createEventDispatcher();


function handleKeyDown(e) {
  const trimmedInnerText = e.target.innerText.trim();
  const original = 'titre'

  if (trimmedInnerText === original) {
    e.target.innerText = '';
  }

  if (e.ctrlKey && e.key === ' ') {
    e.preventDefault();
    dispatch('contentEdited', trimmedInnerText);
    isSave = true;
  } else {
    isSave = false;
  }
}



</script>

<pre>
  <h2 
  style={css} 
	contenteditable={isEditable}
	on:keydown={handleKeyDown}
  class:isSave={isSave}
  class:isEditable={isEditable}
  >{value}
</h2>
</pre>

<style>
  h2.isEditable {
      text-align: center;
      font-weight: bold;
      color: var(--color-preview-title);
      animation: notSave 3s infinite; 
      border-left: 4px solid var(--color-orange);
  }



  h2.isSave {
    animation: save .5s 3;
  }
</style>
