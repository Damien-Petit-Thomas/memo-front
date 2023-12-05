<script>

  import {page} from '$app/stores';
  import {memos} from '$lib/stores/memo.js';
  import {fullmemos} from '$lib/stores/fullmemos.js';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
  
  let pageSlug;
  let memo 
  page.subscribe(($page) => {
    pageSlug = $page.params.slug;

    memo = $fullmemos.filter((memo) => memo.slug === pageSlug)[0];
  });
  
</script>




<section class="container">
  
  <Sidebar />
  <div class="content">
    {memo.title}
{#each memo.contents as content (content.id)}

<p>{content.content}</p>
    {/each}
  </div>



</section>


<style>
  .container {
    display: flex;
 
    height: 100vh;
    width: 100vw;
  }

  .content {
    display: block;
    margin-bottom: 20px;
  }
</style>