<script>
  import { send, receive } from '$lib/utils/transition.js';
  import CategoryBtn from '$lib/ui/CategoryBtn.svelte';
  
  export let title;
  export let store;
 

  let name = '';
  let color = '#ff0000';

  const addCategory = () => {
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
  <form on:submit|preventDefault={addCategory}>
    <label for="name">{title}</label><br>
    <input type="text" id="name" bind:value={name}><br>
    <label for="color">Choix de la couleur</label><br>
    <input type="color" id="color" bind:value={color}><br>
    <button type="submit">Valider</button>
  </form>

  <ul class="categories">
    {#each $store as category (category.id)}
      <li
        class="categorie"
        in:receive={{ key: category.id }}
        out:send={{ key: category.id }}
      >
        <CategoryBtn item={category} />
        <button class="remove" on:click={() => store.remove(category)} aria-label="Remove" />
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
