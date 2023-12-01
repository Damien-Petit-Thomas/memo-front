<script>
  import InPlaceEdit from "../InPlaceEdit.svelte";
  import HeaderBar from "./HeaderBar.svelte";
  export let items;
  function submit(field) {
		return ({detail: newValue}) => {
			// IRL: POST value to server here
			console.log(`updated ${field}, new value is: "${newValue}"`)
		}
	}
</script>


<HeaderBar />
<div class="editor">

 {#each items as item(item.id)}

    <InPlaceEdit
       {item}
      value={item.name}
      on:submit={submit(item.name)}
    />
    
  {/each}


</div>



<style>
    .editor {
        display: flex;
        flex-direction: column;
        min-width: 70%;
        widows: 15%;
        background-color: rgb(29, 32, 32);
    }

h1 {
    color: rgb(255, 255, 255);
    font-size: 2rem;
    font-weight: 700;
    line-height: 2.5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-align: center;
}

</style>