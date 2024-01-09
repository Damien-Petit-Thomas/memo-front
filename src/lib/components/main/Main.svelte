<script>
  import { memos} from '$lib/stores/memo.js';
  import Card from '$lib/components/card/Card.svelte'
  export let selectedCategory;
 $: console.log("selectedCategorgggggggggggggggggggggy", selectedCategory)

</script>


<div class="container_main">
  {#if selectedCategory}
  <div class="container_main-header">
    <h2>{selectedCategory.name}</h2>
  </div>
  
    <div class="container_memo-card">
    {#each $memos.filter(memo => memo.category_id === selectedCategory.id) as memo}
        <Card 
        {memo}
        --color={selectedCategory.color}
        />
    {/each}
  </div>
  {/if}
</div> 



<style>
  .container_main-header {
    margin: 2rem;
    align-self: flex-start;
    margin-left: 2rem;
  }

.container_main-header > h2 {
  font-size: 4rem;
}

  .container_main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .container_memo-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    height: 100%;
  }
  


  .memo-card:hover{
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
</style>