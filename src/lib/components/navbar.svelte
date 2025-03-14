<script lang="ts">
  import { page } from '$app/state'
  import { quadIn, quadOut } from 'svelte/easing'
  import { fade, fly } from 'svelte/transition'
  import { Dialog } from 'bits-ui'
  import { IconChevronDown } from '@tabler/icons-svelte'
  import { navbarRoutes, navbarRoutesArray, navbarRoutesNames } from '$lib/utils/navbarRoutes'
  import { TRANSITION_DELAY, TRANSITION_DURATION } from '$lib/utils/pageTransitions.svelte'

  let path = $derived(`/${page.route.id?.split('/')[1]}`)

  let isNavbarDialogOpen = $state(false)

  $effect(() => {
    if (path) isNavbarDialogOpen = false
  })
</script>

<header class="flex grid-flow-dense items-center justify-center p-8">
  <div class="lg:hidden">
    <Dialog.Root bind:open={isNavbarDialogOpen}>
      <Dialog.Trigger class="flex items-center gap-2">
        <p class="font-title text-lg">{navbarRoutes[path]?.name}</p>
        <IconChevronDown size="20" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay forceMount class="h-screen w-screen">
          {#snippet child({ props, open })}
            {#if open}
              <div
                {...props}
                in:fade={{ duration: TRANSITION_DURATION }}
                class="fixed inset-0 z-40 backdrop-blur-md"
              ></div>
            {/if}
          {/snippet}
        </Dialog.Overlay>
        <Dialog.Content forceMount>
          {#snippet child({ props, open })}
            {#if open}
              <div
                {...props}
                in:fade={{ duration: TRANSITION_DURATION }}
                class="fixed inset-0 z-50 h-full w-full"
              >
                <div
                  class="flex h-full w-full flex-col justify-center bg-white/20 font-body shadow-sm backdrop-blur-md"
                >
                  <nav class="mx-16 flex flex-col gap-5">
                    <a href="/" class="inline-flex w-full items-center justify-between text-xl">
                      Home
                    </a>
                    {#each navbarRoutesArray as { name, href }}
                      <a {href} class="inline-flex w-full items-center justify-between text-xl">
                        {name}
                        {#if navbarRoutes[path]?.name === name}
                          <div class="h-2 w-2 rounded-full bg-primary"></div>
                        {/if}
                      </a>
                    {/each}
                  </nav>
                  <Dialog.Close class="mt-24 flex w-full justify-center">
                    <div class="h-12 w-12 rounded-full bg-stone-700/50"></div>
                  </Dialog.Close>
                </div>
              </div>
            {/if}
          {/snippet}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </div>

  <nav class="hidden lg:block">
    <ul class="flex font-body text-gray-600 [&>li]:px-8 [&>li]:transition-transform [&>li]:ease-in">
      <li class="hover:scale-105">
        <a href="/">home</a>
      </li>
      {#each navbarRoutesArray as { name, href }}
        <li class="hover:scale-105">
          <a {href}>
            {name}
          </a>
        </li>
      {/each}
      {#if navbarRoutesNames.includes(path)}
        <div
          class="absolute top-16 h-2 w-2 rounded-full bg-primary transition-transform duration-[450ms]"
          style="transform: translateX({navbarRoutes[path].offset}px)"
          in:fly={{
            y: 20,
            duration: TRANSITION_DURATION,
            delay: TRANSITION_DELAY,
            easing: quadOut
          }}
          out:fly={{ y: -20, duration: TRANSITION_DURATION, easing: quadIn }}
          aria-hidden={true}
        ></div>
      {/if}
    </ul>
  </nav>
</header>
