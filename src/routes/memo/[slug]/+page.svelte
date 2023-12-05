<script>
  import Paragraphe from '$lib/components/text/Paragraph.svelte';
  import Subtitle from '$lib/components/text/Subtitle.svelte';
  import Blockquote from '$lib/components/text/Blockquote.svelte';
  import { page } from '$app/stores';
  import { fullmemos } from '$lib/stores/fullmemos.js';
  import Sidebar from '$lib/components/sidebar/Sidebar.svelte';

  const components = {
    paragraphe: Paragraphe,
    subtitle: Subtitle,
    blockquote: Blockquote
  };

  let pageSlug;
  let memo;
  let currentComponent;

  page.subscribe(($page) => {
    pageSlug = $page.params.slug;
    memo = $fullmemos.find((m) => m.slug === pageSlug);
  });
</script>



<div class="container">
  <Sidebar />
  <div class="content">
    <h2><strong>{memo.title}</strong></h2>
    {#if memo}
  {#each memo.contents as content (content.id)}
    {#if components[content.type.name]}
      <svelte:component this={components[content.type.name]} value={content.content} css={content.type.css}/>
    {/if}
  {/each}
{/if}
  </div>
  <div class="option">

  </div>
</div>

<style>
  .container {
    display: flex;
    height: 100vh;
    min-width: 100vw;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex-wrap: wrap;
    min-width: 70%;
    widows: 15%;
    background-color: rgb(29, 32, 32);
    

  }


  h2 {
    text-align: center;
  }

  .option {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 15%;
        widows: 15%;
  }



</style>
