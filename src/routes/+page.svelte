<script lang="ts">
  import { navigating } from '$app/state'
  import { createPageTitle } from '$lib/utils/createPageTitle'
  import { navbarRoutesArray } from '$lib/utils/navbarRoutes'
  import Socials from '$lib/components/socials.svelte'

  let innerWidth = $state<number | null>(null)
  let isMobile = $derived((innerWidth ?? 1025) < 1024)

  let hasLoaded = $state(Boolean(navigating.from))

  const shouldAnimate = $derived(!hasLoaded && !isMobile)
</script>

<svelte:head>
  <title>{createPageTitle('Portfolio')}</title>
</svelte:head>

<svelte:window bind:innerWidth />

<span class={shouldAnimate ? 'animate-logo' : 'hidden'}>
  <span>m</span>
  <span>pol</span>
</span>
<div
  class="mx-auto flex max-w-screen-lg flex-col justify-between px-6 font-body lg:h-4/6 lg:items-center lg:justify-center {shouldAnimate &&
    'animate-logo-bg'}"
>
  <div class="lg:text-center">
    <p class="text-gray-600">Hey, I'm</p>
    <h1 class="mt-2 font-title text-4xl font-bold text-primary lg:text-5xl">martin polley</h1>
    <h2 class="mt-2 text-xl">Full-stack developer</h2>
  </div>

  <div class="mt-10 flex flex-col gap-8 text-3xl lg:mt-20 lg:flex-row lg:gap-14 lg:text-lg">
    {#each navbarRoutesArray as { name, href }}
      <a {href} class="font-body text-gray-700 transition-transform ease-in lg:hover:scale-105">
        {name}
      </a>
    {/each}
  </div>
  <Socials class="mt-16" />
</div>
