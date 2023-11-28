<script>
  import { flip } from 'svelte/animate';
  import { dndzone} from 'svelte-dnd-action';
  export let items;
  const flipDurationMs = 300;
  function handleSort(e) {

		items = e.detail.items;
	}

</script>


<div class="mini-map">
  <section use:dndzone={{items, flipDurationMs}} on:consider={handleSort} on:finalize={handleSort}>
    {#each items as item(item.id)}
        <div animate:flip="{{duration: flipDurationMs}}">
            {item.name}
        </div>
    {/each}
  </section>
</div>



<style>
  .mini-map {
    border: red 1px solid;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

</style>