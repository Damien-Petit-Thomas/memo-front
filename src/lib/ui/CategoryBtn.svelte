<script>
    import { createEventDispatcher } from "svelte";
 export let item;
  const dispatch = createEventDispatcher();

</script>


<button 
class="category-btn"
style="background-color: {item.color}"
on:click|preventDefault={(e) => dispatch("click", e)}
>{item.name}
</button>



<style>
    button{
        border: none;
        border-radius: 5px;
        padding: 5px;
        margin: 5px;
        color: rgb(151, 135, 135);
        font-weight: bold;
        font-size: 1.2rem;
        cursor: pointer;
        display: inline;
    }

    button:hover{
        color: white;
    }
  
</style>