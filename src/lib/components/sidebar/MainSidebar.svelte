<!-- Sidebar.svelte -->

<script>
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
      <div class="category" style="border-left: {category.color} solid 6px;">
        <h2>{category.name} 
          <button on:click={() => toggleMemo(category.id)}> {categoryStates[category.id] ? '<<' : '>>'}</button>
        </h2>
        {#if categoryStates[category.id]}
          <div class="memo">
            {#each $memos.filter(memo => memo.category_id === category.id) as memo}
              <div>
                <a href="/memo/{memo.slug}"
                >{memo.title}</a></div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </section>


<style>

  .sidebar {
    min-width: 15%;
    padding-top: 20px;
    overflow-x: hidden;
  }

  .category {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 1.2rem;
    color: #818181;
    display: block;
  }

  button {
    float: right;
    background-color: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .category:hover {
    color: #f1f1f1;
  }

  .memo {
    padding-left: 16px;
  }
</style>
