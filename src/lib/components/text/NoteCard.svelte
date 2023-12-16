<script>
	import { createEventDispatcher } from "svelte";
	export let value;
	export let isEditable = true;
	let isSave = true;
	let original = value;
	export let css = null;
const dispatch = createEventDispatcher();



function handleKeyDown(e) {
  const trimmedInnerText = e.target.innerText.trim();
  const trimmedOriginal = "blockquote"

  if (trimmedInnerText === trimmedOriginal) {
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
function handleBlur(e) {
  const trimmedInnerText = e.target.innerText.trim();
  const trimmedOriginal = 'summary'

  if (trimmedInnerText === '') {
  return e.target.innerText = trimmedOriginal;
  }
  dispatch('contentEdited', trimmedInnerText);
  isSave = true;
}


</script>

<pre>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="note-card"
  aria-label='note card  '
	style={css} 
	contenteditable={isEditable}
	on:keydown={handleKeyDown}
	on:blur={handleBlur}
	class:isSave={isSave}
	class:isEditable={isEditable}
	>
	<div class ='img'></div>
	{@html value}
</div>
</pre>




<style>


.img{
	min-width: 20px;
	min-height: 20px;
	background-repeat: no-repeat;
	background-image: url($lib/assets/warning.svg);
}



div.isEditable.note-card {
	color:white;
	background: #679ac2;
	background-color: transparent;
  border: 1px solid #696969;
	border-left: 4px solid #5E9EFF;
	border-radius: .25rem;
	font-family: Roboto Slab;
	padding: 1rem 1rem 1rem 3rem;
	margin: 0 auto; 
  width: 90%;
	font-weight: bold !important;
	color: var(--color-preview-qoute-body) !important;     
	animation: notSave 3s infinite; 
}



div.isSave {
animation: save .5s 3;
}

</style>