<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import DOMPurity from 'dompurify'
  export let value, required = true
  export let item;
  const dispatch = createEventDispatcher()
  let editing = false, original
  
  onMount(() => {
    original = value
  })
  
  function edit() {
    editing = true;
  }
  function submit() {

    value = DOMPurity.sanitize(value)
    if (value != original) {
      dispatch('submit', value);
    }

    editing = false;
  }


 
  



  function sendUpdateToPreview(data, type) {
    const event = new CustomEvent('updatePreview', {
      detail: {
        data,
        type,
      },
    });
    window.dispatchEvent(event);
  }


  

  

  

	
	function focus(element) {
    element.focus()
	}
  function handleKeyDown(event) {
    if (event.key === 'ctrl + e') {
      edit();
    }
  }
</script>

{#if editing}
<!-- svelte-ignore a11y-no-noninteractive-element-interctions -->
<form on:submit|preventDefault={submit} on:keydown={handleKeyDown}>
  <textarea  id={item.css}   bind:value on:blur={submit} {required} use:focus/>
</form>



{:else}
<div on:click={edit} on:keydown={(event) => handleKeyDown(event)} role="button" tabindex="0">
  {#if item.css === 'h1'}
  <h1>{value}</h1>
  {:else if item.css === 'h2'}
  <h2>{value}</h2>
  {:else if item.css === 'blockquote'}
  <pre>
    <blockquote><pre>{value}</pre></blockquote>
  </pre>
  {:else if item.css === 'p'}
  <p>
    <pre>
      {value}
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
