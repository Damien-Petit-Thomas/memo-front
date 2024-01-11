<script>
  import { fullmemos } from "$lib/stores/fullmemos.js";
  import Card from "$lib/components/card/Card.svelte";
  export let currentMemoIdx;
</script>
<div class="container_nextbar">
  {#if $fullmemos !== null && $fullmemos.length > 0}
    {#if $fullmemos.length === 1}
      <Card
        --width="20%"
        --padding=".8rem"
      >
        <div>pas de memo précédant</div>
      </Card>
      <Card
        --width="20%"
        --padding=".8rem"
      >
        <div>pas de memo suivant</div>
      </Card>
    {:else}
      {#if $fullmemos.length === 2}
        {#if currentMemoIdx === 0}
          <Card
            memo={$fullmemos[1]}
            --color={$fullmemos[1].category.color}
            --width="20%"
            --padding="1.8rem"
          >
            <div>suivant</div>
          </Card>
        {:else}
          <Card
            memo={$fullmemos[0]}
            --color={$fullmemos[0].category.color}
            --width="20%"
            --padding=".8rem"
          >
            <div>précédent</div>
          </Card>
        {/if}
      {:else}
        {#if currentMemoIdx === 0}
          <Card
            memo={$fullmemos[$fullmemos.length - 1]}
            --color={$fullmemos[$fullmemos.length - 1].category.color}
            --width="20%"
            --padding=".8rem"
          >
            <div>précédent</div>
          </Card>
          <Card
            memo={$fullmemos[currentMemoIdx + 1]}
            --color={$fullmemos[currentMemoIdx + 1].category.color}
            --width="20%"
            --padding=".8rem"
          >
            <div>suivant</div>
          </Card>
        {:else if currentMemoIdx === $fullmemos.length - 1}
          <Card
            memo={$fullmemos[currentMemoIdx - 1]}
            --color={$fullmemos[currentMemoIdx - 1].category.color}
            --width="20%"
            --padding=".8rem"
          >
            <div>précédent</div>
          </Card>
          <Card
            memo={$fullmemos[0]}
            --color={$fullmemos[0].category.color}
            --width="20%"
            --padding=".8rem"
          >
            <div>suivant</div>
          </Card>
        {:else}
          <Card
            memo={$fullmemos[currentMemoIdx - 1]}
            --color={$fullmemos[currentMemoIdx - 1].category.color}
            --width="20%"
            --padding=".8rem"
          >
            <div>précédent</div>
          </Card>
          <Card
            memo={$fullmemos[currentMemoIdx + 1]}
            --color={$fullmemos[currentMemoIdx + 1].category.color}
            --width="20%"
            --padding=".8rem"
          >
            <div>suivant</div>
          </Card>
        {/if}
      {/if}
    {/if}
  {/if}
</div>


<style>
  .container_nextbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: fit-content;
    margin: 2rem;
  }
</style>
