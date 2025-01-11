<script lang="ts">
  import { navbarRoutes, navbarRoutesArray, navbarRoutesNames } from '$lib/utils/navbarRoutes'
  import { quadIn, quadOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  type NavbarProps = { url: string }

  let { url }: NavbarProps = $props()
</script>

<header class="flex grid-flow-dense items-center justify-center p-8">
  <nav class="hidden md:block">
    <ul class="grid grid-cols-5 gap-x-12 text-lg text-gray-600">
      {#each navbarRoutesArray as { name, href }}
        <li class="flex flex-col items-center">
          <a {href}>
            {name}
          </a>
        </li>
      {/each}
      {#if navbarRoutesNames.includes(url)}
        <div
          class="absolute top-16 h-2 w-2 rounded-full bg-amber-600 transition-transform duration-[450ms]"
          style="transform: translateX({navbarRoutes[url].offset}px)"
          in:fly={{ y: 20, duration: 200, delay: 250, easing: quadOut }}
          out:fly={{ y: -20, duration: 200, easing: quadIn }}
          aria-hidden={true}
        ></div>
      {/if}
    </ul>
  </nav>
</header>
