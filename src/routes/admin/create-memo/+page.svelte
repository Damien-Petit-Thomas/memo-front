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
      memoId = $currentMemo.id
      memoCategory = $currentMemo.category.id
    
  
      title.set($currentMemo.title)
     
      $currentMemo.contents.forEach(item => {
      

        handleSelectItem({detail : {...item.type, content : item.content}})
        
      })
      currentMemo.set({})

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
  const newMemo = await memos.add({ title: $title, contents: itemsToSave, categoryId, tagsIds });
  console.log(newMemo)
    memoId = newMemo.id;
    memoCategory = newMemo.category.id;
    memotags = newMemo.tags.map(tag => tag.id);
  }
  await  fullmemos.get();

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
    <div class="wrapper">
      <EditorSidebarTagNCategory
      on:selectedCategory={handleSelectCategory}
      on:selectedTags={handleTags}
      />
      <!-- <Lexicon {categoryId} /> -->
    </div>

</div>




<style>




  .container {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;



    /* display: flex;
    flex-direction: row; */
    height: 100vh;
    max-width: 100vw;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    min-width: 15%;
  }


</style>