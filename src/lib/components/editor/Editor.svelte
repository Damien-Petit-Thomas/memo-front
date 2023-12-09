<script>
  import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import EditableItem from "$lib/components/editor/EditorEditableItem.svelte";
  import Toolbar from "./EditorToolBar.svelte";
  import { memoItems } from '$lib/stores/Editor.js';
  import { currentMemo } from '$lib/stores/currentMemo.js';
  


const title = {content : $currentMemo.title ? $currentMemo.title : "titre", css : "h1"};
  const flipDurationMs = 200;
  let dragDisabled = true;
  let deletedItems = [];

  function handleConsider(e) {
    const { items: newItems, info: { source, trigger } } = e.detail;
   
    memoItems.set(newItems); 
    if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
      dragDisabled = true;
    }
  }

  function handleFinalize(e) {
    const { items: newItems, info: { source } } = e.detail;
    memoItems.set(newItems);  
    if (source === SOURCES.POINTER) {
      dragDisabled = true;
    }
  }

  function startDrag(e) {
    e.preventDefault();
    dragDisabled = false;
  }

  function handleKeyDown(e) {
    if ((e.key === "Enter" || e.key === " ") && dragDisabled) dragDisabled = false;
  }

  function submit(field) {
    return ({ detail: newValue }) => {
      console.log(`updated ${field}, new value is: "${newValue}"`);
    };
  }

  function deleteItem({ id }) {
    memoItems.update(items => items.filter(item => item.id !== id));
  }


  function handleValue(item) {
  return  item.content !== undefined ? item.content : item.content = item.name
  }
</script>

<Toolbar />
<div class="wrapper">
  <EditableItem item={title} value={title.content} on:submit={submit(title.content)} on:deleteItem={deleteItem} />
  <section class="editor"
          use:dndzone="{{ items: $memoItems, dragDisabled, flipDurationMs }}"
          on:consider="{handleConsider}"
          on:finalize="{handleFinalize}">

    {#each $memoItems as item (item.id)}
    <div animate:flip="{{ duration: flipDurationMs }}">
      {#if !deletedItems.includes(item)}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <div tabindex={dragDisabled ? 0 : -1}
              aria-label="drag-handle"
              class="handle"
              style={dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
              on:mousedown={startDrag}
              on:touchstart={startDrag}
              on:keydown={handleKeyDown} />
        {JSON.stringify(item)}
          <EditableItem {item} value={handleValue(item)}  on:submit={submit(item.name)} on:deleteItem={deleteItem} />
          <button class="delete" on:click={() => deleteItem(item)}>X</button>
          {/if}
        </div>
    {/each}
  </section>
</div>

<style>

    .wrapper {
        display: flex;
        flex-direction: column;
        min-width: 70%;
        widows: 15%;
        background-color: rgb(29, 32, 32);
    }
    .editor {
        display: flex;
        flex-direction: column;
        min-width: 70%;
        widows: 15%;
        background-color: rgb(29, 32, 32);
    }


	div {
		position: relative;
	}
	.handle {
		position: absolute;
		left: 50%;
		width: 1em;
		height: 0.25em;
		background-color: grey;
		transition: cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s;
	}
	.handle:hover {
		scale: 3;
	}

	button.delete {
		background-color: grey;
		border : none;
		border-radius: 5%;
		position: absolute;
		font-size: 0.5em;
		right: 0;
		top: 0;
	}

	button.delete:hover {
		background-color: red;
	}


</style>