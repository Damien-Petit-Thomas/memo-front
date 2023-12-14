  <!-- if (originalCategoryId !== null) {
    dispatch('selectedCategory', originalCategoryId)
  
  
    const categories = document.querySelectorAll(".category-button")
    categories.forEach(category => {
      if (category.id === originalCategoryId) {
        category.style.width="100%"
      }
    })
  } -->
  <script>
    import { categories } from '$lib/stores/category.js';
    import { tags } from '$lib/stores/tag.js';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
  
    let tagsIds = [];
    const dispatch = createEventDispatcher();
  
    // Fetch categories and tags if not already loaded
    onMount(() => {
      if ($categories.length === 0) {
        categories.get();
      }
      if ($tags.length === 0) {
        tags.get();
      }
    });
  
    let selectedCategoryId = null;
  
    if (selectedCategoryId !== null) {
      dispatch('selectedCategory', selectedCategoryId);
    }
  
    function selectCategory(e, id) {
      const categories = document.querySelectorAll(".category-button");
      categories.forEach(category => {
        category.classList.remove("selected");
      });
      e.target.classList.add("selected");
      selectedCategoryId = id;
      dispatch('selectedCategory', id);
    }
  
    function toggleTags(e, id) {
      e.target.classList.toggle("selected");
  
      $tags = $tags.map(tag => {
        if (tag.id === id) {
          return { ...tag, selected: !tag.selected };
        }
        return tag;
      });
  
      tagsIds = $tags.filter(tag => tag.selected).map(tag => tag.id);
      dispatch('selectedTags', tagsIds);
    }
  </script>
  
  <section>
    <div class="category-section">
      <h2>Choisir une catégorie</h2>
      <div class="container category">
        {#each $categories as category (category.id)}
          <button
            class:selected={selectedCategoryId === category.id}
            on:click={(e) => selectCategory(e, category.id)}
            style="background-color: {category.color};">{category.name}</button>
        {/each}
      </div>
    </div>
    <div class="tag-section">
      <h2>Choisir les tags</h2>
      <div class="container tag">
        {#each $tags as tag (tag.id)}
          <button
            class:selected={tag.selected}
            on:click={(e) => toggleTags(e, tag.id)}
            style="background-color: {tag.color};">{tag.name}</button>
        {/each}
      </div>
    </div>
  </section>
  
  <style>
    /* Your existing styles remain unchanged */
  
    .selected {
      border: 1px solid white;
    }
  </style>
  