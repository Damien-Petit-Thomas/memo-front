<script>
  import { flip } from 'svelte/animate';
  import { dndzone} from 'svelte-dnd-action';
  export let items;
  const flipDurationMs = 300;
  function handleSort(e) {

		items = e.detail.items;
	}

</script>


<section use:dndzone={{items, flipDurationMs}} on:consider={handleSort} on:finalize={handleSort}>
  {#each items as item(item.id)}
      <div animate:flip="{{duration: flipDurationMs}}">
          {item.name}
      </div>
  {/each}
</section>