<script>
  import CopyOnDragList from './MiniMap.svelte';
  import DragulaCopyOnDragList from './ShadowCopy.svelte';
  const items1 = [
    {id: 101, name: "item101"},
  
  ];
  const items2 = [
    {id: 201, name: "item201"},
    {id: 202, name: "item202"},
    {id: 203, name: "item203"},
    {id: 204, name: "item204"},
    {id: 205, name: "item205"},
    {id: 206, name: "item206"}
  ];
</script>

<style>
  :global(section) {
      width: 50%;
      padding: 0.3em;
      border: 1px solid black;
  }
  :global(div) {
      padding: 0.2em;
      border: 1px solid blue;
      margin: 0.15em 0;
  }
 :global(h3, p) {
  line-height: 1em;
 }
</style>

<main>
<CopyOnDragList items={items1}/>
<DragulaCopyOnDragList items={items2}/>
</main>