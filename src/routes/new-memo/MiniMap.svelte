<script>
  import { flip } from 'svelte/animate';
  import { dndzone} from 'svelte-dnd-action';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function openEditor(item) {
    dispatch('openEditor', item);
  }

  let items = [];
  const flipDurationMs = 300;
  function handleSort(e) {

		items = e.detail.items;
	}

  function remove(item) {
  
    const id = item.id;
    items = items.filter(item => item.id !== id);
  }


  function edit(item) {
    const id = item.id;
    const edit = document.getElementById(id)
    if(edit.classList.contains('edit')) return;
    edit.classList.add('edit');
    const aria = document.createElement('textarea');
    edit.appendChild(aria);
    aria.focus();
    aria.addEventListener('blur', () => {
      edit.classList.remove('edit');
      edit.removeChild(aria);
    })

  }





</script>


<div class="mini-map">
  <section use:dndzone={{items, flipDurationMs}} on:consider={handleSort} on:finalize={handleSort}>
    {#each items as item(item.id)}
        <div 
        class="content-item" 
        id={item.id} animate:flip="{{duration: flipDurationMs}}" 
        on:dblclick={openEditor(item)}>
            <span>{item.name}</span>
            <button on:click={remove(item)}/>
        </div>
    {/each}
  </section>
</div>



<style>


.mini-map section div:hover {
  background-color: #f0f0f0;
  transform: scaleY(1.5);
}

  button {
    justify-self: flex-end;
		background-image: url($lib/assets/remove.svg);
		background-repeat: no-repeat;
		width: 20px;
		height: 20px;
	}
  .mini-map {
    border: red 1px solid;
    width: 100%;
    height: 100%;
  }
  .mini-map section {
    height: 100%  ;
    border: black 1px solid;  
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .mini-map section div {
    display: flex;
    border : green 1px solid;
    justify-content: center;
    transition: .3s;
  }
 
</style>