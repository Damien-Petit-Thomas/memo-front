<script>
  import { textToMarkdown } from '$lib/utils/textToMarkdown.js';
  import { onMount } from 'svelte';
  import Paragraphe from '$lib/components/text/Paragraph.svelte';
  import Subtitle from '$lib/components/text/Subtitle.svelte';
  import Blockquote from '$lib/components/text/Blockquote.svelte';
  import { page } from '$app/stores';
  import { fullmemos } from '$lib/stores/fullmemos.js';
  import MainSidebar from '$lib/components/sidebar/MainSidebar.svelte';
  import ReadMemoSidebar from '$lib/components/sidebar/ReadMemoSidebar.svelte';
  import  {currentMemo} from '$lib/stores/currentMemo.js';
  // import  



  const components = {
    paragraphe: Paragraphe,
    subtitle: Subtitle,
    blockquote: Blockquote
  };

  let pageSlug;
  let memo;
  let lexicon;
  let isDataReady = false;

  page.subscribe(async ($page) => {
    if ($fullmemos.length === 0) {
      await fullmemos.get();
    }

    pageSlug = $page.params.slug;
    memo = $fullmemos.find((m) => m.slug === pageSlug);

    if (memo) {
      formatText(memo);
      isDataReady = true;
    }

  });
  
  function formatText(memo) {
    lexicon = $page.data.lexicon;
    memo.contents.forEach(item => {
      item.content = textToMarkdown(item.content);

      lexicon.forEach(wordObj => {
        const word = wordObj.word;
        if (item.content.includes(word)) {
          item.content = item.content.replaceAll(word, `<span style="color:red">${word}</span>`);
        }
      });
    });
  }

$: currentMemo.set(memo)




</script>

<div class="container">
  
  <MainSidebar />
  <div class="content">
    {#if isDataReady}
      <h2><strong>{memo.title}</strong></h2>
      {#if memo}
        {#each memo.contents as content (content.id)}
          {#if components[content.type.name]}
            <svelte:component this={components[content.type.name]} value={content.content} css={content.type.css}/>
          {/if}
        {/each}
      {/if}
    {/if}
  </div>
  <ReadMemoSidebar />
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
    min-width: 70%;
    widows: 15%;
    background-color: rgb(29, 32, 32);
  }

  h2 {
    text-align: center;
  }
</style>
