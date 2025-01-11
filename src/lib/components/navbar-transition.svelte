<script lang="ts">
  import { page } from '$app/state'
  import { beforeNavigate } from '$app/navigation'
  import { fly } from 'svelte/transition'
  import { quadIn, quadOut } from 'svelte/easing'
  import { navbarRoutes } from '$lib/utils/navbarRoutes'

  let { url, children } = $props()

  let prevRoute = $state(url)

  beforeNavigate(() => {
    if (page.route.id) {
      prevRoute = page.route.id
    }
  })

  const prevRouteOrder = $derived(navbarRoutes[prevRoute].order)
  const newRouteOrder = $derived(navbarRoutes[url].order)

  const flyTowardsRight = $derived(prevRouteOrder < newRouteOrder)
</script>

<div
  in:fly={{ y: 100, duration: 200, delay: 250, easing: quadOut }}
  out:fly={{ y: -100, duration: 200, easing: quadIn }}
>
  {#key url}
    <div
      in:fly={{ x: flyTowardsRight ? -200 : 200, duration: 200, delay: 250, easing: quadOut }}
      out:fly={{ x: flyTowardsRight ? 200 : -200, duration: 200, easing: quadIn }}
    >
      {@render children()}
    </div>
  {/key}
</div>
