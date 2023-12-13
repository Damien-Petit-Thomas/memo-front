<script>
  import { memoItems} from '$lib/stores/Editor.js'
  import {title} from '$lib/stores/title.js'
  import { onMount } from 'svelte'
  import Paragraphe from '$lib/components/text/Paragraph.svelte';
  import Subtitle from '$lib/components/text/Subtitle.svelte';
  import Title from '$lib/components/text/Title.svelte';
  import Blockquote from '$lib/components/text/Blockquote.svelte';
  import DOMPurity from 'dompurify'
  export let item, value

  let editing = false, original
  

let content = item.content !== undefined ? item.content : item.name

const components = {
    title: Title,
    paragraphe: Paragraphe,
    subtitle: Subtitle,
    blockquote: Blockquote
  };

  onMount(() => {

    original = value
  })
  
  function edit() {
    editing = true;
    if(!content || content === item.name){
      content = ""
    }
  }
  function saveContent(e) {
    console.log(e)
    // return console.log(e)
  let content = e.detail
    content = DOMPurity.sanitize(content)
    if (content === '') {
      content = original
    }
    if (content !== original) {
      //si c'est le titre on update le store title
      // console.log(content)
      if(item.name === 'title'){
        title.update(() => content);
      }
      memoItems.update(items => {
        const index = items.findIndex(memItem => memItem.id === item.id)
        if (index !== -1) {
          items[index].content = content
        }
        return items
      })
    }
    editing = false
  }

    editing = false;
  
    
  
  
  




  document.addEventListener('input', event => {
    const element = event.target;
    if (element.tagName.toLowerCase() !== 'textarea') return;

    element.style.height = 'auto'; 
    const newHeight = Math.min(window.innerHeight / 2, element.scrollHeight);
    element.style.height = newHeight + 'px';
  });


</script>

<!-- {#if editing} -->
<!-- svelte-ignore a11y-no-noninteractive-element-interctions -->

  <!-- <textarea  id={item.name}  on:keydown={handleKeyDown} bind:value={content} on:blur={saveContent} {required} use:focus/> -->

  




<div  role="button" tabindex="0">
  {#if components[item.name]}
  <svelte:component 
  this={components[item.name]} 
  value={content}
  css={item.css}
  on:contentEdited={saveContent}
 
  on:blur={saveContent}  
/>

 {:else }
 <p>{content}</p>

  
  {/if}
</div>
<style>
  /*  on fait en  sorte que le textarea prenne toute la place disponible */
  /* textarea  {
    resize: none;
    outline-style: none;
    height: 100vh;
    border: none;
    margin: 1rem 0 0 0; 
    padding-bottom: 2rem;
    border: none;
    background: none;
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
    box-shadow: none;
    width: 100%;
  
  } */

/* #blockquote {
  background: rgb(158, 19, 19);
  border-left: 4px solid var(--color-orange);
  border-right: 4px solid var(--color-orange);
  font-family: Roboto Slab;
  padding: 2.4rem;
  width: 100%;
  border-radius: 0.4rem;
  color: var(--color-preview-qoute-body) !important;
  font-weight: bold !important;
}

  #title {
    color: rgb(255, 255, 255);
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-align: center;
    height: 5rem;
}

  


h1 {
    color: rgb(255, 255, 255);
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-align: center;
}



 */

p {
    color: rgb(255, 255, 255);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-align: left;
}



blockquote ,textarea#blockquote {
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