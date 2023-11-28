<script>
  import {onMount} from 'svelte';
  import { tags } from '$lib/stores/tag.js';
  import { categories } from '$lib/stores/category.js';
  import MiniMap from './MiniMap.svelte';
  import MemoElemList from './ShadowCopy.svelte';
  import Btn from '$lib/ui/CategoryBtn.svelte';
  import  {memos} from '$lib/stores/memo.js';
  export let data; 
  let prevContent = "";
  let style = {};
  const items1 = [
    {id:1 , name: "titre"},
  ]
  const items2 = [
        {id: 1, name: "item1"},
        {id: 2, name: "item2"},
        {id: 3, name: "item3"},
        {id: 4, name: "item4"}
    ];
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

let content = "";
let title = "";
let contents = [];
let categoryId =null;
let tagsIds = [];



function saveMemo(){
  console.log(title, contents, categoryId, tagsIds);
  const memo = {
    title,
    contents,
    categoryId,
    tagsIds
  }
  memos.add(memo);
  title = "";
  contents = "";
  categoryId =null;
  tagsIds = [];
  

}  



function openPreviewWindow() {
  const previewWindow = window.open("", "Preview Window", "width=800,height=600");

  const prev = previewWindow.document;
  prev.body.innerHTML = `<div id="preview-content">${prevContent}</div>`;

  // Accéder au style de la div dans la nouvelle fenêtre et le modifier
  const prevStyle = prev.getElementById("preview-content").style;

  // Exemple de modification du style (vous pouvez adapter selon vos besoins)
  prevStyle.backgroundColor = "blue";
  prevStyle.padding = "20px";
}

  


</script>

    
<div class="container">
  
    <div class="main-wrapper">
      <div class="edit-memo">
        <label for="title">titre du new-memo</label>
        <input type="text" name="title" id="title" placeholder="titre"  bind:value={title}  >
        <h2>catégorie du mémo</h2>
        <div class="categories">
          {#each $categories as category (category.id)}
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
        <button on:click={openPreviewWindow}>Ouvrir la prévisualisation dans une nouvelle fenêtre</button>
      </div>
      <div class="mini-map">
        <MiniMap items={items1}/>
      
      </div>
    </div>
    <MemoElemList items={items2}/>
</div>



<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .main-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
  }
  .edit-memo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rebeccapurple;
     min-width: 50vw;
     height: 100%;
     border-right: black 1px solid;
     }
  .categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .mini-map {
    min-width: 50vw;
    background: rgb(136, 90, 90)
  }
 

</style>