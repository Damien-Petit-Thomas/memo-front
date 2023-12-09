<script>
  import { memoItems} from '$lib/stores/Editor.js'
  import {title} from '$lib/stores/title.js'
  import { onMount } from 'svelte'
  import DOMPurity from 'dompurify'
  export let item, value, required = true

  let editing = false, original
  

let content = item.content !== undefined ? item.content : item.name



  onMount(() => {

    original = value
  })
  
  function edit() {
    editing = true;
    if(!content || content === item.name){
      content = ""
    }
  }
  function saveContent() {
  
    content = DOMPurity.sanitize(content)
    if (content === '') {
      content = original
    }
    if (content !== original) {
      //si c'est le titre on update le store title
      if(item.css === 'h1'){
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
  
	function focus(element) {
    element.focus()
	}
  function handleKeyDown(event) {
  
      edit();
    
  }
</script>

{#if editing}
<!-- svelte-ignore a11y-no-noninteractive-element-interctions -->
<section  >
  <textarea  id={item.name}   bind:value={content} on:blur={saveContent} {required} use:focus/>
</section>
  



{:else}
<div on:click={edit} on:keydown={(event) => handleKeyDown(event)} role="button" tabindex="0">
  {#if item.css === 'h1'}
  <h1>{content}</h1>
  {:else if item.name === 'subtitle'}
  <h2>{content}</h2>
  {:else if item.name === 'blockquote'}
  <pre>
    <blockquote><pre>{content}</pre></blockquote>
  </pre>
  {:else if item.name === 'paragraphe'}
  <p>
    <pre>
      {content}
    </pre>
  
  {/if}
</div>
{/if}
<style>
  textarea  {
    margin: 1rem 0 0 0; 
    border: none;
    background: none;
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
    box-shadow: none;
    width: 100%;
    white-space: pre-wrap; 
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
