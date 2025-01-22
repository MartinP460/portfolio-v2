<script lang="ts">
  import '../app.css'
  import { page } from '$app/state'
  import { navbarRoutesNames } from '$lib/utils/navbarRoutes'
  import Background from '$lib/components/background.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import NavbarTransition from '$lib/components/navbar-transition.svelte'
  import HomeTransition from '$lib/components/home-transition.svelte'

  let { data, children } = $props()
</script>

<Background />
<div class="min-h-24">
  {#if page.route.id !== '/'}
    <HomeTransition>
      <Navbar url={data.url} />
    </HomeTransition>
  {/if}
</div>
<main class="container mx-auto h-full max-w-3xl">
  {#if page.route.id === '/'}
    <HomeTransition>{@render children()}</HomeTransition>
  {:else if navbarRoutesNames.includes(page.route.id ?? '')}
    <NavbarTransition url={data.url}>{@render children()}</NavbarTransition>
  {/if}
</main>
