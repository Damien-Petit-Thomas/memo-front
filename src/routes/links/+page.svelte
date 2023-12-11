<script>
  import { link } from '$lib/stores/link.js';

  // Tri du lexicon par ordre alphabétique
  let sortedLink = $link.slice().sort((a, b) => a.name.localeCompare(b.name));

  // Grouper les mots par la première lettre
  let groupeLink = {};
  sortedLink.forEach(({ name, url }) => {
    const firstLetter = name.charAt(0).toUpperCase();
    groupeLink[firstLetter] = groupeLink[firstLetter] || [];
    groupeLink[firstLetter].push({ name, url });
  });
</script>

<div class="lexicon">
  
    {#each Object.keys(groupeLink).sort() as firstLetter}
          <h2>{firstLetter}</h2>
        {#each groupeLink[firstLetter] as { name, url }}
            <div class="word">
              <div class="word-word">{name}</div>
              <div class="definition">{url}</div>
            </div>
        {/each}
    {/each}
</div>  
  




    <style>

    .lexicon {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
    }

    .word {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      gap: 20px;
    }

    .word-word {
      font-size: 1.5rem;
      font-weight: bold;
      padding-left: 1rem;
      border-left: 3px solid black;
       }

    .definition {
      font-size: 1.2rem;
    }

    h2 {
      display: inline-block;
      width: 80%;
      border-bottom: 3px solid black;
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 20px;
    }








   </style>