<script lang="ts">
  import { page } from '$app/state'
  import { navbarTransitionFuncs } from '$lib/utils/pageTransitions.svelte'

  let { children } = $props()

  const hiddenRoutes = ['/', '/projects/[project]']
</script>

{#if !hiddenRoutes.includes(page.route.id ?? '')}
  <div in:navbarTransitionFuncs.in out:navbarTransitionFuncs.out class="h-full">
    {@render children()}
  </div>
{/if}
