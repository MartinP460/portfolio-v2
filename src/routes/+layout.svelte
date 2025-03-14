<script lang="ts">
  import '../app.css'
  import { beforeNavigate, onNavigate } from '$app/navigation'
  import Background from '$lib/components/background.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import BodyTransition from '$lib/components/body-transition.svelte'
  import { updatePageTransition } from '$lib/utils/pageTransitions.svelte'
  import NavbarTransition from '$lib/components/navbar-transition.svelte'

  let { children } = $props()

  let innerWidth = $state<number | null>(null)

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })

  beforeNavigate(({ from, to }) =>
    updatePageTransition(from?.route.id ?? '', to?.route.id ?? '', {
      isMobile: (innerWidth ?? 601) < 600
    })
  )
</script>

<svelte:window bind:innerWidth />

<Background />
<div class="h-[var(--navbar-height)]">
  <NavbarTransition>
    <Navbar />
  </NavbarTransition>
</div>
<main class="container mx-auto h-[calc(100%-var(--navbar-height))] max-w-3xl">
  <BodyTransition>{@render children()}</BodyTransition>
</main>
