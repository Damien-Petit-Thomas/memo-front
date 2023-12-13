<script>
  import { send, receive } from '$lib/utils/transition.js';
  import CategoryBtn from '$lib/ui/CategoryBtn.svelte';
  export let title;
  export let store;
 
  console.log($store)
  
  let name = '';
  let color = '#413779';
  
  const addCategory = () => {
    if (name && color) {
      const data = {
        name,
        color
      };
    
      store.add(data);
      console.log(store)
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
    {#each $store as item (item.id)}
      <li
        class="categorie"
        in:receive={{ key: item.id }}
        out:send={{ key: item.id }}
      >
        <CategoryBtn {item} />
        <button class="remove" on:click={() => store.remove(item)} aria-label="Remove" />
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
