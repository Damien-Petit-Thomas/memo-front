<script>
  import { fullmemos } from "$lib/stores/fullmemos.js";
  import NextBar from "../nextBar/NextBar.svelte";
  import Card from "$lib/components/card/Card.svelte";
  export let selectedCategory;
  let currentMemoIdx = 0;

  $: mem = $fullmemos.filter((memo) => memo.category.id === selectedCategory?.id);
  $: if (
    $fullmemos !== null &&
    $fullmemos.filter((memo) => memo.category.id === selectedCategory?.id)
      .length !== 0
  ) {
    currentMemoIdx = $fullmemos.findIndex(
      (memo) => memo.category.id === selectedCategory?.id,
    );
  }
</script>

<div class="container_main">
  {#if !selectedCategory}
  <div class="container_main-header">
      <h2>Accueil</h2>
    </div>
      {#if $fullmemos === undefined}
        <p>Chargement des données</p>
      {:else if $fullmemos === null || $fullmemos.length === 0}
        <p>Il n'y a pas encore de mémo</p>
      {:else}
        {#each $fullmemos as memo}
          <Card {memo} --color={memo.category.color} />
        {/each}
      {/if}
    {:else}
  <div class="container_main-header">
      <h2>{selectedCategory.name}</h2>
      </div>
      {#if mem.length === 0}
        <p>pas de memo dans cette catégorie</p>
      {:else}
        {#each mem as memo}
          <Card {memo} --color={memo.category.color} />
        {/each}
      {/if} 
    {/if}
  <NextBar {currentMemoIdx}/>

  
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

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }


</style>
