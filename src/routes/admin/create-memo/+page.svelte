<script>
  import { reloadNeeded } from '$lib/stores/reloadNeeded.js';
  import { fullmemos } from '$lib/stores/fullmemos.js';
  import { memos} from '$lib/stores/memo.js';
  import { lexicon } from '$lib/stores/lexicon.js';
  import Lexicon from '$lib/components/editor/Lexicon.svelte';
  import { memoItems } from '$lib/stores/Editor.js';
  import Editor from '$lib/components/editor/Editor.svelte';
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
  let memotitle = "";

  import { link } from '$lib/stores/link.js';
  let linkList = [];
  
  $link.forEach((link) => linkList.push(link.url))







  onMount(() => {
    if ($currentMemo.contents && $currentMemo.contents.length > 0) {
      memotitle = $currentMemo.title
      memoId = $currentMemo.id
      memoCategory = $currentMemo.category.id
      if($currentMemo.tags) memotags = $currentMemo.tags.forEach(tag => memotags.push(tag.id))
      $currentMemo.contents.forEach(item => {
     
let newItem = {...item.type, content : item.content, id : item.id, initialTypeId : item.type.id}
        memoItems.update(items => [...items, newItem]);        
      })
      currentMemo.set({})
    }
  });
onMount(() => {
  return () => {
    memoItems.set([])
  }
})


function handleSelectItem(e, id) {

for (let i= 0; i < e.detail.length; i++){
  const count = Math.random()
  const newItem = { ...e.detail[i], id: count, initialTypeId: e.detail[i].id,  }
  memoItems.update(items => [...items, newItem]);
}
}




  
  let tagsIds = [];
  const contentTypeElem = data.contents
  const styles = data.styles


  function handleSelectCategory(e) {
    categoryId = e.detail;
  }
  function handleTags(e) {

    tagsIds = e.detail;
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
  

  if (itemsToSave.length === 0) return alert('add some content')

  if (memoId) {
    if(categoryId === undefined){
      categoryId = memoCategory
    }if(tagsIds.length === 0){
      tagsIds = memotags
    }if($title === ""){
      $title = memotitle
    }
  const newMemo = await memos.mark({ title : $title , contents: itemsToSave, categoryId, tagsIds }, memoId);
  if (newMemo) { 
  alert(`update${JSON.stringify(newMemo)}`);
  memoCategory = newMemo.category_id;
  memotags = newMemo.tags;
  }
  } else{
    if(categoryId === undefined) return alert('choose a category') 
  const newMemo = await memos.add({ title: $title, contents: itemsToSave, categoryId, tagsIds });
  if (newMemo) {
    alert(`create${JSON.stringify(newMemo)}`);
    memoId = newMemo.id;
    memoCategory = newMemo.category_id;
    memotags = newMemo.tags;
  }
  
  
}
await  fullmemos.get();
itemsToSave.forEach(item => {
  saveLinks(item.content, linkList, memoId, categoryId)
})

reloadNeeded.set(true)
  }



</script>
<div class="container">

  <EditorSidebar 
  {styles}
  items={contentTypeElem}
  on:selectItem={handleSelectItem}
  
  on:saveMemo={saveMemo}
  />
  <Editor 
  {styles}
  />
  <div class="wrapper">
    <EditorSidebarTagNCategory
    on:selectedCategory={handleSelectCategory}
    on:selectedTags={handleTags}
    />
    <Lexicon {categoryId} />
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