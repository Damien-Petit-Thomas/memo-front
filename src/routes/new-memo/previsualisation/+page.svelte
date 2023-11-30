
<script>
import  { preview } from '$lib/stores/preview.js';
console.log(preview)
let title = "";
let contents = [];
let currentContent = "";
let className = "";

function handleMessage(event) {
  const data = event.data.data
  const type = event.data.type
  if (type === 'updatePreviewTitle') {
    
    // Mettre à jour la fenêtre de prévisualisation avec les données
    title = data.title

    // Mettez à jour votre store ou effectuez d'autres opérations en fonction des données reçues
    className = data.className

    console.log(data)
  }
  if (type === 'updatePreviewCurrentContent') {
  
   
    // Mettre à jour la fenêtre de prévisualisation avec les données
    currentContent = data.formattedContent
    className = data.className || ""
  }
  if (type === 'updatePreviewContents') {
    console.log("message content received")
   contents =  [...contents, currentContent]

    currentContent = ""
  
  }
}




</script>
<svelte:window on:message={handleMessage} />

<div>

<h1 class={className}>{title}</h1>
{#each contents as content}
  <p >{@html content}</p>
{/each}
<p class={className} >{@html currentContent}</p>
</div>

<style>
.red {
  color: red;
} 

.h1 {
  font-size: 3rem;
  color: teal;
  font-weight: 700;
  text-align: center;
  margin: 0;
  padding: 0;
  position: sticky;
}


</style>
