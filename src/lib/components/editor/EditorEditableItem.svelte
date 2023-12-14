<script>
  import { memoItems} from '$lib/stores/Editor.js'
  import {title} from '$lib/stores/title.js'
  import { onMount } from 'svelte'
  import Paragraphe from '$lib/components/text/Paragraph.svelte';
  import Subtitle from '$lib/components/text/Subtitle.svelte';
  import Title from '$lib/components/text/Title.svelte';
  import Blockquote from '$lib/components/text/Blockquote.svelte';
  import DOMPurity from 'dompurify'
  export let item, value
  let original
  

let content = item.content !== undefined ? item.content : item.name

const components = {
    title: Title,
    paragraphe: Paragraphe,
    subtitle: Subtitle,
    blockquote: Blockquote
  };

  onMount(() => {

    original = value
  })
  
 
  function saveContent(e) {
  let content = e.detail

    content = DOMPurity.sanitize(content)

    if (content === '') {
      content = original
    }
    if (content !== original) {
      if(item.name === 'title'){
        title.update(() => content);
      }else{
      memoItems.update(items => {
        const index = items.findIndex(memItem => memItem.id === item.id)
        if (index !== -1) {
          items[index].content = content
        }
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
  css={item.css}
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



#blockquote {
	background: rgb(53, 48, 48);
	border-left: 4px solid var(--color-orange);
	border-right: 4px solid var(--color-orange);
	font-family: Roboto Slab;
	padding: 2.4rem;
  width: 100%;
	border-radius: 0.4rem;
	color: var(--color-preview-qoute-body) !important;
	font-weight: bold !important;
}




</style>