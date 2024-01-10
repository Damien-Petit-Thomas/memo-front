<script>
	import {onMount} from 'svelte';
  import { memos } from "$lib/stores/memo.js";
  import { fullmemos } from "$lib/stores/fullmemos.js";
  import { categories } from "$lib/stores/category.js";
  import NextBar from "../nextBar/NextBar.svelte";
  import Card from "$lib/components/card/Card.svelte";
  export let selectedCategory; 
  let currentMemoIdx = 0;
  let dataAvalaible = false


  $: mem = $memos.filter((memo) => memo.category_id === selectedCategory?.id)
  $: if ($fullmemos !== null && $fullmemos.filter((memo) => memo.category.id === selectedCategory?.id).length !== 0){
    currentMemoIdx = $fullmemos.findIndex((memo) => memo.category.id === selectedCategory?.id)
  }
  




</script>

<div class="container_main">
  {#if (!selectedCategory)}
    <div class="container_main-header">
      <h2>Accueil</h2>
    </div>
    {#if $fullmemos === undefined}
      <p>Chargement des données</p>
    {/if}
      {#if $memos.length === 0}
      <p>Il n'y a pas encore de mémo</p>
    {/if}
    <div class="container_memo-card">
      {#each $fullmemos as memo}
        <Card {memo} 
        --color={memo.category.color}
        />
      {/each}
    </div>
  {/if}
  {#if selectedCategory}
    <div class="container_main-header">
      <h2>{selectedCategory.name}</h2>
    </div>
    {#if (mem.length === 0)}
      <p>Il n'y a pas encore de mémo dans cette catégorie</p>
    {/if}
    {#if selectedCategory === undefined}
      <p>Il n'y a pas encore de catégorie</p>
    {/if}
    <div class="container_memo-card">
      {#each mem as memo}
        <Card {memo} --color={selectedCategory.color} />
      {/each} 
    </div> 
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
  .container_memo-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    height: 100%;
  }

  .memo-card:hover {
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
</style>
