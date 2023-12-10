 
<script>
  import {categories} from '$lib/stores/category.js';
  import {tags} from '$lib/stores/tag.js'
  import {onMount} from 'svelte';
  import {createEventDispatcher} from 'svelte';
  export let originalCategoryId = null;
  const dispatch = createEventDispatcher();

  let tagsIds = [];
   // si on a pas de catégories, on fetch les catégories
onMount(() => {
  if ($categories.length === 0) {
    categories.get()
  }
  if ($tags.length === 0) {
    tags.get()
  }

  // si originalCategoryId est défini, on le met dans le store
});


if (originalCategoryId !== null) {
  console.log(originalCategoryId)
  dispatch('selectedCategory', originalCategoryId)
}
  

    function selecteCategory(e, id) {
      const categories = document.querySelectorAll(".category-button")
      categories.forEach(category => {
        category.style.border = "none"
        
      })
      e.target.style.border = "red solid 6px"
      dispatch('selectedCategory', id)
      }

      function togleTags(e, id){
        e.target.classList.toggle("selected")
        if (tagsIds.includes(id)) {
          tagsIds = tagsIds.filter((tagId) => tagId !== id)
        } else {
          tagsIds = [...tagsIds, id]
        }
        dispatch('selectedTags', tagsIds)
      }


</script>


<section>
  <h2>Choisir une catégorie</h2>
  <div class="container category"> 
    {#each $categories  as category (category.id)}
      
        <button
        class="category-button"
          on:click={(e) => selecteCategory(e, category.id)}
          style="background-color: {category.color};">{category.name}</button>
    {/each}
  </div>
  <h2>Choisir les tags </h2>
  <div class="container tag">
    {#each $tags  as tag (tag.id)}
          <button
          class="tag-button"
          on:click={(e) => togleTags(e, tag.id)}
          style="background-color: {tag.color};">{tag.name}</button>
    {/each}
  </div>
  
</section> 

<style>

section {
  width: 15%;
}

 button {
    margin: 0.5rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    transform: scale(1.1);
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-width: 15%;
    widows: 15%;
  }



</style> 