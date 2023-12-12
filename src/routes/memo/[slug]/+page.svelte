<script>
  // import { detectLinks } from '$lib/utils/textToMarkdown.js';
  // import { link } from '$lib/stores/link.js';
  // import { onMount } from 'svelte';
  // $link.forEach((link) => linkList.push(link.url))
  // console.log(linkList)
  // let linkList = [];
  // let originalMemo = null;
  
  import MarkdownIt from 'markdown-it';
  import MainSidebar from '$lib/components/sidebar/MainSidebar.svelte';
  import ReadMemoSidebar from '$lib/components/sidebar/ReadMemoSidebar.svelte';
  import Paragraphe from '$lib/components/text/Paragraph.svelte';
  import Subtitle from '$lib/components/text/Subtitle.svelte';
  import Blockquote from '$lib/components/text/Blockquote.svelte';

  import { page } from '$app/stores';
  import { fullmemos } from '$lib/stores/fullmemos.js';
  import  {currentMemo} from '$lib/stores/currentMemo.js';
  
  const md = MarkdownIt()
  
    const components = {
      paragraphe: Paragraphe,
      subtitle: Subtitle,
      blockquote: Blockquote  
    };
  
let copyMemo;
let pageSlug;
let memo;
let lexicon;
let isDataReady = false;
 
page.subscribe(async ($page) => {

    if ($fullmemos.length === 0) {
      console.log("fetching")
      await fullmemos.get();
     
    }

    pageSlug = $page.params.slug;
    console.log(pageSlug)
    memo = $fullmemos.find((m) => m.slug === pageSlug);
console.log(memo)
    if (memo) {
      copyMemo = JSON.parse(JSON.stringify(memo));
      if (copyMemo.contents){
        copyMemo.contents.forEach((item) => {
          parseText(item);
        });
    isDataReady = true;
  }
} else {
  console.log("no memo")
}
});


function parseText(item) {
  lexicon = $page.data.lexicon;
  item.content = md.render(item.content);

  lexicon.forEach(wordObj => {
    const word = wordObj.word;
    const regex = new RegExp(`\\b${word}\\b`, 'g'); 
    if (item.content.match(regex)) {
      item.content = item.content.replace(regex, `<span style="color:red">${word}</span>`);
    }
  });
}

  

$: currentMemo.set(memo)




</script>

<div class="container">
  
  <MainSidebar />
  <div class="content">
    {#if isDataReady}

      <h2><strong>{copyMemo.title}</strong></h2>
      {#if copyMemo}
      {#if copyMemo.contents}
        {#each copyMemo.contents as content (content.id)}
          {#if components[content.type.name]}
            <svelte:component this={components[content.type.name]} value={content.content} css={content.type.css}/>
          {:else}
            {JSON.stringify(content.type.name)}
            <p>{content.content}</p>
          {/if}
          
        {/each}
        {/if}
      {/if}
    {/if}
  </div>
  <ReadMemoSidebar />
</div>

<style>
  a {
    color: rgb(34, 33, 33);
  }


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
    height: 1000vh;
    background-color: rgb(29, 32, 32);
  }

  h2 {
    text-align: center;
  }
</style>
