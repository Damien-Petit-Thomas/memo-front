<script>
  import {onMount} from 'svelte';
  import { tags } from '$lib/stores/tag.js';
  import { categories } from '$lib/stores/category.js';
  import Btn from '$lib/ui/CategoryBtn.svelte';
  export let data; 
  // si on a pas de catégories, on fetch les catégories
  onMount(() => {
    console.log($categories.length)
    if ($categories.length === 0) {
      fetchCategories();
    }
    if ($tags.length === 0) {
      fetchTags();
    }
  });
function fetchTags() {
  const tagDB = data.tags.map((tag) => {
    return {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      color: tag.color
    };
  });
  tags.update(() => tagDB);
};

 function  fetchCategories() {
	
  const categoriesDB = data.categories.map((category) => {
				return {
					id: category.id,
					name: category.name,
					slug: category.slug,
					color : category.color
				};
			});
      categories.update(() => categoriesDB);
    };



function coucou(e) {
  e.target.style.backgroundColor = "blue";
}

  function handleSubmit() {
    console.log("submit");
  }

  let selected;
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="title">titre du new-memo</label>
  <input type="text" name="title" id="title" placeholder="titre ">
  <h2>catégorie du mémo</h2>
  <div class="categories">
    {#each $categories as category (category.id)}
    
    <button class="categorie" on:click={coucou}>{category.name}</button>
    <Btn item={category} on:click={coucou} />
    {/each}
  </div>
  <h2>tag du mémo</h2>
  <div class="tags">
    {#each $tags as tag (tag.id)}
      <Btn item={tag} />
    {/each}
  </div>
  <label for="content">contenu du new-memo</label>
  <textarea name="content" id="content" cols="30" rows="10" placeholder="contenu du new-memo"></textarea>
</form>
