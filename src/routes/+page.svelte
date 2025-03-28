<script>
  import Socials from '$lib/components/socials.svelte'
  import { createPageTitle } from '$lib/utils/createPageTitle'
  import { navbarRoutesArray } from '$lib/utils/navbarRoutes'
</script>

<svelte:head>
  <title>{createPageTitle('Portfolio')}</title>
</svelte:head>

<div
  class="mx-auto flex max-w-screen-lg flex-col justify-between px-6 font-body lg:h-4/6 lg:items-center lg:justify-center"
>
  <div class="animate-fade-in-top lg:text-center">
    <p class="text-gray-600">Hey, I'm</p>
    <h1 class="mt-2 font-title text-4xl font-bold text-primary lg:text-5xl">Martin Polley</h1>
    <h2 class="mt-2 text-xl">Full-stack developer</h2>
  </div>

  <div
    class="animate-fade-in-top animate-delay-2 mt-10 flex flex-col gap-8 text-3xl lg:mt-20 lg:flex-row lg:gap-14 lg:text-lg"
  >
    {#each navbarRoutesArray as { name, href }}
      <a {href} class="font-body text-gray-700 transition-transform ease-in lg:hover:scale-105">
        {name}
      </a>
    {/each}
  </div>
  <Socials class="animate-fade-in-top animate-delay-4 mt-16" />
</div>
