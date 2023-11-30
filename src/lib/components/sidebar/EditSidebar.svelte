<script>
import  {createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
  export let items;
</script>


<section  >
  {#each items as item(item.id)}
          <button
          on:click={() => dispatch('selectItem', item)}
          >{item.name}</button>
  {/each}
</section>


<style>
    section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 15%;
        widows: 15%;
    }
</style>