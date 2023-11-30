<script>
  import Editor from '../../lib/components/editor/Editor.svelte';
  import EditSidebar from '../../lib/components/sidebar/EditSidebar.svelte';
  export let data; 
  const contentTypeElem = data.contents
  let selectItems = []
  function handleSelectItem(e) {
    console.log(e.detail)
    selectItems = [...selectItems, e.detail]
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