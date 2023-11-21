<script>
  import {onMount} from 'svelte';
  import { tags } from '$lib/stores/tag.js';
  import { categories } from '$lib/stores/category.js';
  import Btn from '$lib/ui/CategoryBtn.svelte';
  import  {memos} from '$lib/stores/memo.js';
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



function selecteCategory(e) {
  console.log(e.detail)
   categoryId = e.detail;
}
function togleSelected(e) {
 
  console.log(e.detail);
  tagsIds.includes(e.detail)
    ? (tagsIds = tagsIds.filter((id) => id !== e.detail))
    : (tagsIds = [...tagsIds, e.detail]);
}

let title = "";
let content = "";
let categoryId =null;
let tagsIds = [];



function saveMemo(){
  console.log(title, content, categoryId, tagsIds);
  const memo = {
    title,
    content,
    categoryId,
    tagsIds
  }
  memos.add(memo);
  title = "";
  content = "";
  categoryId =null;
  tagsIds = [];
  

}  

</script>


  <label for="title">titre du new-memo</label>
  <input type="text" name="title" id="title" placeholder="titre"  bind:value={title}  >
  <h2>catégorie du mémo</h2>
  <div class="categories">
    {#each $categories as category (category.id)}
    {JSON.stringify(category.id)}
    <Btn item={category} on:click={selecteCategory} />
    {/each}
  </div>
  <h2>tag du mémo</h2>
  <div class="tags">
    {#each $tags as tag (tag.id)}
      <Btn item={tag} on:click={togleSelected} />
    {/each}
  </div>
  <label for="content">contenu du new-memo</label>
  <textarea name="content" id="content" cols="30" rows="10" placeholder="contenu du new-memo"bind:value={content}></textarea>
  <button on:click={saveMemo}>Enregistrer</button>
