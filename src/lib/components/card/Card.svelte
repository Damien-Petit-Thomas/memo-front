<script>
export let memo = null;
</script>



<div class="card">
  <slot/>
  {#if memo !== null}
  <a href="/memo/{memo.slug}">{memo.title}</a>
  {/if}
</div>




<style>
  .card {
    text-align: center;
    border: 1px solid darkgrey;
    border-radius: 20px;
    width: var(--width, 30%);
    margin: 1rem;
    padding: var(--padding, 2.5rem);
  }
.card > a {
  text-decoration: none;
}

  .card:hover{
    border: 1px solid var(--color, #ddd);
    box-shadow: 0 0 10px var(--color, #ddd);
  }




</style>