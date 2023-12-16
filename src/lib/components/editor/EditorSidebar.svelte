<script>
import  {createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
  export let items;

const detail = items.find(item => item.name === 'detail' );
const summary = items.find(item => item.name === 'summary' );




</script>

<section  >
  <button id="saveMemo"
  on:click={() => dispatch('saveMemo')}
  >sauvagarder</button>
  <div class="content-type-container">
    {#each items as item(item.id)}
    {#if item.name !== 'detail' && item.name !== 'summary'}
            <button
            on:click={() => dispatch('selectItem', [item])}
            >{item.name}</button>
    {/if}
  <!--  on fait un bouton commun pour detail et summary -->
  {/each}
  {#if detail && summary}

  <button
  on:click={() => dispatch('selectItem',  [detail, summary])}
  >{detail.name}</button>

{/if}
    
  </div>
</section>


<style>



section{
    display: flex;
    flex-direction: column;;
    width: 100%;
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