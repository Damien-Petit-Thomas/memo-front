<script>
  import { link } from '$lib/stores/link.js';
  import { onMount } from 'svelte';

  let sortedLink = [];
  let groupeLink = {};

  onMount(async () => {
    if ($link.length === 0) {
      await link.get();
    }

    sortedLink = $link.slice().sort((a, b) => a.name.localeCompare(b.name));

    sortedLink.forEach(( link ) => {
      const firstLetter = link.name.charAt(0).toUpperCase();
      groupeLink[firstLetter] = groupeLink[firstLetter] || [];
      groupeLink[firstLetter].push(link);
    });
  });
</script>

<div class="lexicon">
  {#if $link.length === 0}
    <p>Loading...</p>
  {:else}
    {#each Object.keys(groupeLink).sort() as firstLetter}
      <h2>{firstLetter}</h2>
      {#each groupeLink[firstLetter] as link (link.id)}
        <div class="word">
          <div class="word-word"><a href="{link.url}">{link.name}</a></div>
          <div class="word-word">{link.category_name}</div>
          <div class="word-word">{link.group}</div>
          <div class="word-word">{link.memo_title}</div>


        </div>
      {/each}
    {/each}
  {/if}
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