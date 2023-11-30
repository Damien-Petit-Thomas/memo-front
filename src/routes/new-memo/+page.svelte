<script>
  import { preview} from '$lib/stores/preview.js'
  import {onMount} from 'svelte';
  import { tags } from '$lib/stores/tag.js';
  import { categories } from '$lib/stores/category.js';
  import MiniMap from './MiniMap.svelte';
  import MemoElemList from './ShadowCopy.svelte';
  import Btn from '$lib/ui/CategoryBtn.svelte';
  import  {memos} from '$lib/stores/memo.js';
  export let data; 
  
  let editor = false;


  function editHandler(e){
    console.log(e.detail)
    editor = true;
    className = e.detail.css
  }

  // si on a pas de catégories, on fetch les catégories
  onMount(() => {
    if ($categories.length === 0) {
      fetchCategories();
    }
    if ($tags.length === 0) {
      fetchTags();
    }
  });
  const contentTypeElem = data.contents
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





let className = "";
let content = "";
let title = "";
let contents = [];
let categoryId =null;
let tagsIds = [];
let currentContent = "";

function updateTitle(e) {
  className = "h1";
  console.log(e.target)
  title = e.target.value;
  preview.add({title})
  const type = "updatePreviewTitle";
  sendUpdateToPreview({title, className}, type); 
}
function updatePreviewCurrentContent(e) {
  currentContent = e.target.value;
  const type = "updatePreviewCurrentContent";
  const formattedContent = currentContent.replace(/\n/g, '<br>'); // Remplacer les sauts de ligne par des balises <br>
  sendUpdateToPreview({  formattedContent }, type);
}





let previewWindow;
function openPreviewWindow() {
   previewWindow = window.open('http://localhost:5173/new-memo/previsualisation', "Preview Window", "width=800,height=600");
}
function sendUpdateToPreview(data, type) {
  previewWindow.postMessage({ data , type }, '*');
}

function saveContent() {
  contents = [...contents, currentContent];
  const formattedContents = contents.join('<br>'); // Join avec des balises <br> pour les sauts de ligne
  preview.add({ contents: formattedContents });
  currentContent = "";
  const type = "updatePreviewContents";
  sendUpdateToPreview({ contents: formattedContents }, type);
}


</script>
{JSON.stringify($preview)}
<h2>preview est {$preview.title}</h2>
    
<a href="/new-memo/previsualisation" >preview</a>
<a href="/new-memo/previsualisation" target="_blank" >preview blank</a>



<div class="container">
  
    <div class="main-wrapper">
      {#if !editor}
      <div class="edit-memo">
        <label for="title">titre du new-memo</label>
        <input type="text" name="title" id="title"
         placeholder="titre"  bind:value={title} 
         on:input={updateTitle}>
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
        <label for="content">Résumé</label>
        <textarea name="content" id="content" cols="30" rows="10" placeholder="Résumé du new-memo"bind:value={content}></textarea>
        <div>
          
          <button on:click={saveMemo}>Enregistrer</button>
        </div>
      </div>
      {/if}
      {#if editor}
      <div class="write-content">
    
          <textarea 
          id="write-content-textarea"  
          bind:value={currentContent}
          placeholder="écrivez votre contenu ici"
          on:input={updatePreviewCurrentContent}
          ></textarea>
          <div>
            <button
            on:click={() => editor = !editor}
            >retour</button>
                    <button
                    on:click={saveContent}
                    >sauvegarder</button>
          </div>
      </div>
      {/if}
      <div class="mini-map">
        <MiniMap on:openEditor={editHandler}/>
        
      </div>
    </div>
    <MemoElemList items={contentTypeElem}/>
    <button on:click={openPreviewWindow}>Ouvrir la prévisualisation dans une nouvelle fenêtre</button>
</div>



<style>

.write-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    background: rgb(136, 90, 90);
    min-width: 50vw;
    min-height: 50vh;
    height: 100%;
  }


  textarea#write-content-textarea {
    background-color: rgb(73, 69, 69);
    color: rgb(100, 113, 119);  
    height: 50vh;
    min-width: 50vw;
    resize: none;
  }
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