<script>
  import { createEventDispatcher, onMount } from 'svelte'
  
  export let value, required = true
  export let item;
  const dispatch = createEventDispatcher()
  let editing = false, original
  
  onMount(() => {
    original = value
  })
  
  function edit() {
    editing = true
  }
  
  function submit() {
    if (value != original) {
      dispatch('submit', value)
		}
		
    editing = false
  }
  
  function keydown(event) {
    if (event.key == 'Escape') {
      event.preventDefault()
      value = original
      editing = false
    }
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
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
{#if item.css === 'p' || item.css === 'blockquote'}
<form on:submit|preventDefault={submit} on:keydown={keydown}>
  <textarea  id={item.css}   bind:value on:blur={submit} {required} use:focus/>
</form>
{:else}
<form on:submit|preventDefault={submit} on:keydown={keydown}>
  <input id={item.css} bind:value on:blur={submit} {required} use:focus/>
</form>
{/if}

{:else}
<div on:click={edit} on:keydown={(event) => handleKeyDown(event)} role="button" tabindex="0">
  {#if item.css === 'h1'}
  <h1>{value}</h1>
  {:else if item.css === 'h2'}
  <h2>{value}</h2>
  {:else if item.css === 'blockquote'}
  <blockquote>{value}</blockquote>
  {:else if item.css === 'p'}
  <p>{value}</p>
  {/if}
</div>
{/if}
<style>
  textarea {
    border: none;
    background: none;
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
    box-shadow: none;
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
	background: var(--color-preview-qoute-bg);
	border-left: 4px solid var(--color-orange);
	font-family: Roboto Slab;
	padding: 2.4rem;
	border-radius: 0.4rem;
	color: var(--color-preview-qoute-body) !important;
	font-weight: bold !important;
}



</style>
