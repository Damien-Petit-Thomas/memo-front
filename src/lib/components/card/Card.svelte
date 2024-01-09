<script>
export let memo;
</script>



<div class="card">
  <a href="/memo/{memo.slug}">{memo.title}</a>
</div>




<style>
  .card {
    border: 1px solid darkgrey;
    border-radius: 20px;
    width: 30%;
    margin: 1rem;
    padding: 2.5rem;
  }


  .card:hover{
    border: 1px solid var(--color, #ddd);
  }




</style>