<script>
  import { memoItems } from '$lib/stores/Editor.js';
  import Editor from '$lib/components/editor/Editor.svelte';
  import EditorSidebar from '$lib/components/editor/EditorSidebar.svelte';
  import {title} from '$lib/stores/title.js';
  import  EditorSidebarTagNCategory  from '$lib/components/editor/EditorSidebarTagNCategory.svelte';
  export let data; 
  let categoryId;
  let tagsIds = [];
  const contentTypeElem = data.contents
  function handleSelectCategory(e) {
    console.log(e.detail)
    categoryId = e.detail;
  }
  function handleTags(e) {
    console.log(e.detail);
    tagsIds = e.detail;
  }
  function handleSelectItem(e) {
    const count = Math.random()
    const newItem = { ...e.detail, id: count, initialTypeId: e.detail.id }
    memoItems.update(items => [...items, newItem]);
  }



  async function saveMemo() {
    const itemsToSave = $memoItems.map(item => {
      return {
        content: item.content,
        type_id: item.initialTypeId, 
      }
    })
    console.log("title" + $title)
    console.log(itemsToSave)
  console.log(memoItems)
   try{ const response = await fetch('http://localhost:3000/api/memo', {
  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title : $title,
        contents : itemsToSave,
        categoryId ,
        tagsIds
      })
    })
  
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    }
  } catch (err) {
    console.log(err)
  }

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
    {data}
    />
</div>




<style>
  .container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    max-width: 100vw;
  }
 

</style>