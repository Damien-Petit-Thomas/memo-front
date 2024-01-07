<script>
  import { send, receive } from '$lib/utils/transition.js';
  import CategoryBtn from '$lib/ui/CategoryBtn.svelte';
  export let title;
  export let store;
 
  
  let name = '';
  let color = '#413779';
  
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

  <div class="categories">
    {#each $store as item (item.id)}
      <div
        class="item"
        in:receive={{ key: item.id }}
        out:send={{ key: item.id }}
      >
        <CategoryBtn {item} />
        <button class="remove" on:click={() => store.remove(item)} aria-label="Remove" />
        </div>
    {/each}
      </div>
</div>

<style>

  .board {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .categories {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
.item{
  display: flex;
}


form{
  border: 1px solid #4CAF50;
	box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

  input[type="text"] {
    padding: 0.5rem;
    margin-top: 1rem;
    border: 1px solid #098f09;
    color: #4CAF50;
    width: 80%;
  }


  .remove {
    background-image: url($lib/assets/remove.svg);
    background-repeat: no-repeat;
    background-color: transparent;
    width: 20px;
    height: 20px;
  }
</style>
