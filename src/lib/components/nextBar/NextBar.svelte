<script>
  import { fullmemos } from "$lib/stores/fullmemos.js";
  import Card from "../card/Card.svelte";
  export let currentMemoIdx;
</script>

<div class="contaner_nextbar">
  {#if $fullmemos.length > 0}
    {#if currentMemoIdx === 0}
      <Card
        --color={$fullmemos[currentMemoIdx].category.color}
        --width="20%"
        --pading=".8rem"

        memo={$fullmemos[currentMemoIdx]}
      >
        <div>précedent</div>
      </Card>
      <Card
        memo={$fullmemos[currentMemoIdx + 1]}
        --color={$fullmemos[currentMemoIdx + 1].category.color}
        --width="20%"
        --pading="0"
      >
        <div>suivant</div>
      </Card>
    {:else if currentMemoIdx == $fullmemos.length - 1}
      <Card
        memo={$fullmemos[currentMemoIdx - 1]}
        --width="20%"
        --color={$fullmemos[currentMemoIdx - 1].category.color}
      >
        <div>précedent</div>
      </Card>
      <div>suivant</div>
      --width="20%"
      <Card memo={$fullmemos[0]} --color={$fullmemos[0].category.color}></Card>
    {:else}
      <Card
        memo={$fullmemos[currentMemoIdx - 1]}
        --width="20%"
        --color={$fullmemos[currentMemoIdx - 1].category.color}
      >
        <div>précedent</div>
      </Card>
      <Card
        memo={$fullmemos[currentMemoIdx + 1]}
        --width="20%"
        --color={$fullmemos[currentMemoIdx + 1].category.color}
      >
        <div>suivant</div>
      </Card>
    {/if}
  {/if}
</div>

<style>
  .contaner_nextbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: fit-content;
    margin: 2rem;
  }
</style>
