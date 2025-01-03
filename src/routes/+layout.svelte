<script lang="ts">
  import '../app.css'
  import { fly } from 'svelte/transition'

  let { data, children } = $props()
</script>

{#key data.url}
  <div in:fly={{ x: -200, duration: 300, delay: 300 }} out:fly={{ x: 200, duration: 300 }}>
    {@render children()}
  </div>
{/key}
