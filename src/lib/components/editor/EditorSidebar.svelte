<script>
import  {createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
  export let items;
</script>

<section  >
  <button id="saveMemo"
  on:click={() => dispatch('saveMemo', "test")}
  >sauvagarder</button>
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
        width: 15%;
        widows: 15%;
    }

    button#saveMemo{
        margin-bottom: 1rem;
    }

  

</style>