<script>
  import Editor from '../../lib/components/editor/Editor.svelte';
  import EditSidebar from '../../lib/components/sidebar/EditSidebar.svelte';
  export let data; 
  const contentTypeElem = data.contents
  let selectItems = []
  let count = 0;
  function handleSelectItem(e) {
    count += 1
    const newItem = { ...e.detail, id: count}
    console.log(e.detail)
    selectItems = [...selectItems, newItem]
  }



</script>

<div class="container">
  
      <EditSidebar 
      items={contentTypeElem}
      on:selectItem={handleSelectItem}
      />
      <Editor items={selectItems} />
      <EditSidebar items={contentTypeElem} />
  
</div>



<style>
  .container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
  }
 

</style>