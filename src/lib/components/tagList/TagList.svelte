<script>
  import { send, receive } from '$lib/utils/transition.js';

  import CategoryBtn from '$lib/ui/CategoryBtn.svelte';

  export let store;

  let name = '';
  let color = '#ff0000';

  const addTag = () => {
    if (name && color) {
      const data = {
        name,
        color
      };
      store.add(data);
      name = '';
      color = '#ff0000';
    }
  };
</script>

<div class="board">
  <form on:submit|preventDefault={addTag}>
    <label for="name">Nom du tag</label><br>
     <input type="text" id="name" bind:value={name}><br>
    <label for="color">Choix de la couleur</label><br>
    <input type="color" id="color" bind:value={color}><br>
    <button type="submit">Valider</button>
  </form>

  <ul class="tags">
    {#each $store as tag (tag.id)}
      <li
        class="tag"
        in:receive={{ key: tag.id }}
        out:send={{ key: tag.id }}
      >
      <CategoryBtn item={tag} />
        <button class="remove" on:click={() => store.remove(tag)} aria-label="Remove" />
      </li>
    {/each}
  </ul>
</div>

<style>
  .remove {
    background-image: url($lib/assets/remove.svg);
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
  }
</style>
