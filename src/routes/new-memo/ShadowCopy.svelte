<script>
  import { flip } from 'svelte/animate';
  import { dndzone, TRIGGERS, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
  export let items;
  const flipDurationMs = 300;
  let shouldIgnoreDndEvents = false;
  function handleDndConsider(e) {
        const {trigger, id} = e.detail.info;
        if (trigger === TRIGGERS.DRAG_STARTED) {

            const idx = items.findIndex(item => item.id === id);
            const newId = `${id}_copy_${Math.round(Math.random()*100000)}`;
          // the line below was added in order to be compatible with version svelte-dnd-action 0.7.4 and above 
          e.detail.items = e.detail.items.filter(item => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
          e.detail.items.splice(idx, 0, {...items[idx], id: newId});
          items = e.detail.items;
          shouldIgnoreDndEvents = true;
      }
      else if (!shouldIgnoreDndEvents) {
          items = e.detail.items;
      }
      else {
          items = [...items];
      }
  }






</script>


<section use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} >
  {#each items as item(item.id)}
      <div 
      animate:flip="{{duration: flipDurationMs}}"
     
      >
          {item.name}
      </div>
  {/each}
</section>


<style>
  section {

    border: 1px solid black;
  
    background-color: #f0f0f0;
    color : #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  section div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

</style>