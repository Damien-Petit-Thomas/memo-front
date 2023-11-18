<script>
  export let category;
</script>


<button 
class="btn-category"
style="background-color: {category.color}"
>{category.name}</button>



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
    }

    button:hover{
        color: white;
    }
  
</style>