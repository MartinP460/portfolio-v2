<script lang="ts">
  import '../app.css'
  import { fly } from 'svelte/transition'
  import Background from '$lib/components/background.svelte'

  let { data, children } = $props()
</script>

<div>
  <Background />
  <main>
    {#key data.url}
      <div in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>
        {@render children()}
      </div>
    {/key}
  </main>
</div>
