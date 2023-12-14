<script>
import  {createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
  export let items;
</script>

<section  >
  <button id="saveMemo"
  on:click={() => dispatch('saveMemo')}
  >sauvagarder</button>
  <div class="content-type-container">
    {#each items as item(item.id)}
            <button
            on:click={() => dispatch('selectItem', item)}
            >{item.name}</button>
    
    {/each}
  </div>
</section>


<style>



section{
    display: flex;
    flex-direction: column;;
    width: 15%;
    height: 100vh;
    gap: 5rem;
    border-right : 1px solid #818181;

}

.content-type-container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    widows: 100%;
}


    button#saveMemo{
        margin-bottom: 1rem;
    }


    button:hover {
        background-color: rgb(203, 232, 219); ;
        color : #4a535f;
    }
  

</style>