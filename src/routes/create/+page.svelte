<script>
  import { onMount } from 'svelte';
  import {marked} from 'marked';

  let markdownContent = '';
  let markedContent = '';
  let savedContent = '';

  function handleInputChange(event) {
    markdownContent = event.target.value;

  }

  function saveContent() {
    // Save the content (you can replace this with your API call logic)
    savedContent = markdownContent;
    console.log('Content saved:', savedContent);
  }

  onMount(() => {
    // You can perform any initialization or data loading here
  });




</script>

<style>
  /* Add your styles here if needed */
</style>

<div>
  <label for="markdownInput">Enter Markdown text:</label>
  <textarea id="markdownInput" bind:value={markdownContent} on:input={handleInputChange}></textarea>
</div>
  <div>
    <h2>Markdown Preview:</h2>
  
     {@html marked.parse(markdownContent)}

  <button on:click={saveContent}>Save</button>
</div>

