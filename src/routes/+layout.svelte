<script lang="ts">
  import '../app.css'
  import { onNavigate } from '$app/navigation'

  import { navbarRoutesNames } from '$lib/utils/navbarRoutes'
  import Background from '$lib/components/background.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import NavbarTransition from '$lib/components/navbar-transition.svelte'
  import HomeTransition from '$lib/components/home-transition.svelte'

  let { data, children } = $props()

  let paths = $derived(data.path.split('/'))

  let firstLevelRoute = $derived(`/${paths[1]}`)
  let secondLevelRoute = $derived(paths.length > 2 ? `/${paths[2]}` : null)

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })
</script>

<Background />
<div class="h-[var(--navbar-height)]">
  {#if firstLevelRoute !== '/' && !secondLevelRoute}
    <HomeTransition>
      <Navbar path={firstLevelRoute} />
    </HomeTransition>
  {/if}
</div>
<main class="container mx-auto h-full max-w-3xl">
  {#if firstLevelRoute === '/'}
    <HomeTransition>{@render children()}</HomeTransition>
  {:else if navbarRoutesNames.includes(firstLevelRoute)}
    <NavbarTransition path={firstLevelRoute}>{@render children()}</NavbarTransition>
  {/if}
</main>
