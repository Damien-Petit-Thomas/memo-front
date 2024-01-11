<script>
	import { createEventDispatcher } from "svelte";
	export let value;
	export let isEditable = true;
	let isSave = true;
	export let css = null;
const dispatch = createEventDispatcher();


  $: value1 = value.split('\n')[0];
  $: value2 = value1.split('\n')[1];

  console.log(value1);
  console.log(value2);



function handleKeyDown(e) {
  const trimmedInnerText = e.target.innerText.trim();
  const trimmedOriginal = `visible text
                            invisible text`;


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
  const trimmedOriginal = 'paragraphe'

  if (trimmedInnerText === '') {
  return e.target.innerText = trimmedOriginal;
  }
  dispatch('contentEdited', trimmedInnerText);
  isSave = true;
}



</script>

<details>
  <summary>{@html value1}</summary>
  {@html value2}
  </details>

<pre
style={css} 
contenteditable={isEditable}
on:keydown={handleKeyDown}
on:blur={handleBlur}
class:isSave={isSave}
class:isEditable={isEditable}
  >
  {@html value}
</pre>



<style>


  pre {
    margin: 0 1rem 0 1rem;
  }
  pre.isEditable {
    border-left: 1px solid lightskyblue;

    color: rgb(174, 174, 189);
	animation: notSave 3s infinite; 

  }

  pre.isSave {
    animation: save .5s 3;
  }




</style>