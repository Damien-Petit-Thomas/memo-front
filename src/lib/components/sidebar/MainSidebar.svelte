<!-- Sidebar.svelte -->

<script>
  import { fade } from 'svelte/transition';
  import { categories } from '$lib/stores/category.js';
  import { memos} from '$lib/stores/memo.js';
  import { onMount } from 'svelte';
  let categoryStates = {};





  onMount(() => {
    if ($categories.length === 0) {
      categories.get();
    }
    if ($memos.length === 0) {
      memos.get();
    }
    $categories.forEach((category) => {
      categoryStates[category.id] = false;
    });
  });



  function toggleMemo(categoryId) {
    categoryStates[categoryId] = !categoryStates[categoryId];
  }
</script>
<section class="sidebar">
  {#each $categories as category (category.id)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
    class="category" 
    on:click={() => toggleMemo(category.id)} 
    style="border-left: {category.color} solid 6px;"
    >
      <h2>
        {category.name}
        <button class:expanded={categoryStates[category.id]} >
          ▶
        </button>
        
      </h2>
      {#if categoryStates[category.id]}
      <div transition:fade class="memo" class:expanded={categoryStates[category.id]}  >
        {#each $memos.filter(memo => memo.category_id === category.id) as memo}
          <div>
            <a href="/memo/{memo.slug}">{memo.title}</a>
          </div>
        {/each}
      </div>
      
      {/if}
    </div>
  {/each}
</section>






<style>

  button {
    float: right;
    background-color: transparent;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    transition: transform 0.4s ease-in-out;
  }

  button.expanded {
    transform: rotate(90deg);
  }


  .sidebar {
    min-width: 15%;
    padding-top: 20px;
    overflow-x: hidden;
    border-right : 1px solid #818181;
  }

  .category {
    cursor: pointer;
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 1.2rem;
    color: #818181;
    display: block;
  }


  .category:hover {
    color: #f1f1f1;
  }

  .memo {
    padding-left: 16px;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s ease-in-out;
  }

  .memo.expanded {
    max-height: 1000px; /* Adjust this value based on your content */
  }

  .memo > div {
    margin-bottom: 8px; /* Spacing between memo items */
  }
</style>
