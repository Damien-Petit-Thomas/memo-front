<script>
  import { fullmemos } from '$lib/stores/fullmemos.js';
  import { memos} from '$lib/stores/memo.js';
  import { memoItems } from '$lib/stores/Editor.js';
  import Editor from '$lib/components/editor/Editor.svelte';
  import Lexicon from '$lib/components/editor/Lexicon.svelte'
  import EditorSidebar from '$lib/components/editor/EditorSidebar.svelte';
  import {title} from '$lib/stores/title.js';
  import  EditorSidebarTagNCategory  from '$lib/components/editor/EditorSidebarTagNCategory.svelte';
  let memoId;
  export let data; 
  import { saveLinks } from '$lib/utils/saveLinks.js';
  import { currentMemo } from '$lib/stores/currentMemo.js';
  import { onMount } from 'svelte';
  let memoCategory;
  let categoryId;
  let memotags = [];

  import { link } from '$lib/stores/link.js';
  let linkList = [];
  
  $link.forEach((link) => linkList.push(link.url))
  console.log(linkList)







  onMount(() => {
    if ($currentMemo.contents && $currentMemo.contents.length > 0) {
      console.log($currentMemo)
      memoId = $currentMemo.id
      memoCategory = $currentMemo.category.id
    
  
      title.set($currentMemo.title)
     
      $currentMemo.contents.forEach(item => {
      
        // on en profite pour passer item.content 
        handleSelectItem({detail : {...item.type, content : item.content}})
        
      })
      currentMemo.set("")

    }
  });
onMount(() => {
  return () => {
    memoItems.set([])
  }
})






  
  let tagsIds = [];
  const contentTypeElem = data.contents



  function handleSelectCategory(e) {
    categoryId = e.detail;
  }
  function handleTags(e) {

    tagsIds = e.detail;
  }
  function handleSelectItem(e) {

    const count = Math.random()
    const newItem = { ...e.detail, id: count, initialTypeId: e.detail.id,  }
    memoItems.update(items => [...items, newItem]);
  }



  async function saveMemo() {
  console.log("save memo");
  let count = 0;
  categoryId = categoryId !== undefined ? categoryId : memoCategory;

  const itemsToSave = $memoItems.map(item => {
    const position = count++;
    return {
      position,
      content: item.content,
      type_id: item.initialTypeId,
    };
  });
  
  if (memoId) {
    if(categoryId === undefined){
      categoryId = memoCategory
    }if(tagsIds.length === 0){
      tagsIds = memotags
    }
  await memos.mark({ title: $title, contents: itemsToSave, categoryId, tagsIds }, memoId);
  } else {
  await memos.add({ title: $title, contents: itemsToSave, categoryId, tagsIds });
    const lastMemo = $memos[$memos.length - 1];
    memoId = lastMemo.id;
    memoCategory = lastMemo.category.id;
    memotags = lastMemo.tags.map(tag => tag.id);
  }
  await  fullmemos.get();
  console.log($fullmemos.find(memo => memo.id === memoId))
// le console.log me montre bien que le store est mis à jour pourtant le memo n'est pas mis à jour dans la page d'acceuil
  itemsToSave.forEach(item => {
    saveLinks(item.content, linkList, memoId, categoryId)
  })
  
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