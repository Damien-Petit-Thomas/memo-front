<script>
  import Code from '$lib/components/text/Code.svelte';
  import { memoItems} from '$lib/stores/Editor.js'
  import {title} from '$lib/stores/title.js'
  import Detail from '$lib/components/text/Detail.svelte';
  import { onMount } from 'svelte'
  import Paragraphe from '$lib/components/text/Paragraph.svelte';
  import Title from '$lib/components/text/Title.svelte';
  import Blockquote from '$lib/components/text/Blockquote.svelte';
  import DOMPurity from 'dompurify'
  import Summary from '$lib/components/text/Summary.svelte';
  import NoteCard from '$lib/components/text/NoteCard.svelte';
  export let item, value
  let original
  

console.log(item.style)
const css = item.style !== undefined ? item.style : ''
let content = item.content !== undefined ? item.content : item.name

const components = {
  noteCard : NoteCard,
    summary: Summary,
    title: Title,
    detail: Detail,
    paragraphe: Paragraphe,
    blockquote: Blockquote,
    code: Code
  };

  onMount(() => {

    original = value
  })
  



  function saveContent(e) {
    console.log("saveContent", e)
  let content = e.detail




    if (content === '') {
 
      content = original
    }
    if (content !== original) {
      if(item.name === 'title'){
        title.update(() => content);
      }
      else{
      memoItems.update(items => {
        const index = items.findIndex(memItem => memItem.id === item.id)
        if (index !== -1) {
          items[index].content = DOMPurity.sanitize(content)
        }
        console.log(items)
        return items
      })
    }}
  }


  
    
  


</script>






<div  role="button" tabindex="0">
  {#if components[item.name]}
  <svelte:component 
  this={components[item.name]} 
  value={content}
  {css}
  on:contentEdited={saveContent}

/>

  {:else }
  <p>{content}</p>

  
  {/if}
</div>
<style>
  
p {
    color: rgb(255, 255, 255);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-align: left;
}








</style>