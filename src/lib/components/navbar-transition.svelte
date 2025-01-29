<script lang="ts">
  import { page } from '$app/state'
  import { beforeNavigate } from '$app/navigation'
  import { fly } from 'svelte/transition'
  import { quadIn, quadOut } from 'svelte/easing'
  import { navbarRoutes } from '$lib/utils/navbarRoutes'
  import { TRANSITION_DELAY, TRANSITION_DURATION } from '$lib/utils/transitions'

  let { path, children } = $props()

  let prevRoute = $state(path)
  let innerWidth = $state<number | null>(null)

  beforeNavigate(() => {
    if (page.route.id) {
      prevRoute = page.route.id
    }
  })

  const isMobile = $derived((innerWidth ?? 601) < 600)

  const prevRouteOrder = $derived(navbarRoutes[prevRoute].order)
  const newRouteOrder = $derived(navbarRoutes[path].order)

  // We negate the direction of the transition on mobile since it feels more natural.
  const flyTowardsRight = $derived(
    isMobile ? prevRouteOrder > newRouteOrder : prevRouteOrder < newRouteOrder
  )
</script>

<svelte:window bind:innerWidth />

<div
  in:fly={{ y: 100, duration: TRANSITION_DURATION, delay: TRANSITION_DELAY, easing: quadOut }}
  out:fly={{ y: -100, duration: TRANSITION_DURATION, easing: quadIn }}
>
  {#key path}
    <div
      in:fly={{
        x: flyTowardsRight ? -200 : 200,
        duration: TRANSITION_DURATION,
        delay: TRANSITION_DELAY,
        easing: quadOut
      }}
      out:fly={{ x: flyTowardsRight ? 200 : -200, duration: TRANSITION_DURATION, easing: quadIn }}
    >
      {@render children()}
    </div>
  {/key}
</div>
