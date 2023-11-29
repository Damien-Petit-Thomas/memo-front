
<script>
import  { preview } from '$lib/stores/preview.js';
console.log(preview)
let title = "";
let contents = [];
let currentContent = "";


function handleMessage(event) {
 
  const data = event.data.data
  const type = event.data.type
  if (type === 'updatePreviewTitle') {
    
    // Mettre à jour la fenêtre de prévisualisation avec les données
    title = data.title

    // Mettez à jour votre store ou effectuez d'autres opérations en fonction des données reçues
  }
  if (type === 'updatePreviewCurrentContent') {
  
   
    // Mettre à jour la fenêtre de prévisualisation avec les données
    currentContent = data.currentContent
 
    // Mettez à jour votre store ou effectuez d'autres opérations en fonction des données reçues
  }
  if (type === 'updatePreviewContents') {
    console.log("message content received")
    // Mettre à jour la fenêtre de prévisualisation avec les données
    contents = data.contents
    currentContent = ""
    // Mettez à jour votre store ou effectuez d'autres opérations en fonction des données reçues
  }
}




</script>
<svelte:window on:message={handleMessage} />

<div>

<h2>{title}</h2>
{#each contents as content}
  <p>{content}</p>
{/each}
<p>{currentContent}</p>
</div>

<style>

</style>
