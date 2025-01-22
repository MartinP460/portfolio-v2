<script lang="ts">
  import '../app.css'
  import { navbarRoutesNames } from '$lib/utils/navbarRoutes'
  import Background from '$lib/components/background.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import NavbarTransition from '$lib/components/navbar-transition.svelte'
  import HomeTransition from '$lib/components/home-transition.svelte'

  let { data, children } = $props()

  let paths = $derived(data.url.split('/'))

  let firstLevelRoute = $derived(`/${paths[1]}`)
  let secondLevelRoute = $derived(paths.length > 2 ? `/${paths[2]}` : null)
</script>

<Background />
<div class="min-h-24">
  {#if firstLevelRoute !== '/' && !secondLevelRoute}
    <HomeTransition>
      <Navbar url={firstLevelRoute} />
    </HomeTransition>
  {/if}
</div>
<main class="container mx-auto h-full max-w-3xl">
  {#if firstLevelRoute === '/'}
    <HomeTransition>{@render children()}</HomeTransition>
  {:else if navbarRoutesNames.includes(firstLevelRoute)}
    <NavbarTransition url={firstLevelRoute}>{@render children()}</NavbarTransition>
  {/if}
</main>
