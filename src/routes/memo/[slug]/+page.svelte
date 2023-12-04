<script>
  import {page} from '$app/stores';
  import {memos} from '$lib/stores/memo.js';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
  const memo = $memos.find(memo => memo.slug === $page.params.slug);
const currentContent = $page.data.contents.filter(content => content.memo_id === memo.id);
  page.subscribe(value => {
    console.log(value);
  });
  

</script>




<section class="container">
  <Sidebar />

  <div class="content">
{#each currentContent as content (content.id)}
{JSON.stringify(content)}
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