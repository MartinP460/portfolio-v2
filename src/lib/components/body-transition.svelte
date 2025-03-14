<script lang="ts">
  import { page } from '$app/state'
  import { bodyTransitionFuncs } from '$lib/utils/pageTransitions.svelte'

  let { children } = $props()
</script>

{#key page.route.id}
  <div class="h-full" in:bodyTransitionFuncs.in out:bodyTransitionFuncs.out>
    {@render children()}
  </div>
{/key}
