<script>
  import {memos} from '$lib/stores/memo.js';
   import { memoItems } from '$lib/stores/Editor.js';
  import Editor from '$lib/components/editor/Editor.svelte';
  import Lexicon from '$lib/components/editor/Lexicon.svelte'
  import EditorSidebar from '$lib/components/editor/EditorSidebar.svelte';
  import {title} from '$lib/stores/title.js';
  import  EditorSidebarTagNCategory  from '$lib/components/editor/EditorSidebarTagNCategory.svelte';
  let memoId;
  export let data; 

  import { currentMemo } from '$lib/stores/currentMemo.js';
  import { onMount } from 'svelte';

  onMount(() => {
    if ($currentMemo.contents && $currentMemo.contents.length > 0) {
      console.log("====================",$currentMemo)
      memoId = $currentMemo.id
      // on boucle sur la fonction handleSelectItem pour ajouter les items du memo dans le store memoItems
      $currentMemo.contents.forEach(item => {
      
        // on en profite pour passer item.content 
        handleSelectItem({detail : {...item.type, content : item.content}})
        
      })
      currentMemo.set("")

    }
  });




  let categoryId;
  let tagsIds = [];
  const contentTypeElem = data.contents



  function handleSelectCategory(e) {
  
    categoryId = e.detail;
  }
  function handleTags(e) {

    tagsIds = e.detail;
  }
  function handleSelectItem(e) {

    console.log(e.detail)
    const count = Math.random()
    const newItem = { ...e.detail, id: count, initialTypeId: e.detail.id,  }
    memoItems.update(items => [...items, newItem]);
  }



  async function saveMemo() {
    const itemsToSave = $memoItems.map(item => {
      return {
        content: item.content,
        type_id: item.initialTypeId, 
      }
    })
  if(memoId){
    console.log("update memo")
  return  memos.mark({title : $title, contents : itemsToSave, categoryId , tagsIds}, memoId)
  }else
  console.log("create memo")
  memos.add({title : $title, contents : itemsToSave, categoryId , tagsIds})

}


</script>

<div class="container">

    <EditorSidebar 
      items={contentTypeElem}
      on:selectItem={handleSelectItem}

      on:saveMemo={saveMemo}
      />
      <Editor />
    <EditorSidebarTagNCategory
    on:selectedCategory={handleSelectCategory}
    on:selectedTags={handleTags}
    />
    <Lexicon {categoryId} />

</div>




<style>
  .container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    max-width: 100vw;
  }
 

</style>