<script lang="ts">
  import { quadIn, quadOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { DropdownMenu } from 'bits-ui'
  import { IconChevronDown } from '@tabler/icons-svelte'
  import { navbarRoutes, navbarRoutesArray, navbarRoutesNames } from '$lib/utils/navbarRoutes'
  import { TRANSITION_DELAY, TRANSITION_DURATION } from '$lib/utils/transitions'

  type NavbarProps = { path: string }

  let { path }: NavbarProps = $props()
</script>

<header class="flex grid-flow-dense items-center justify-center p-8">
  <div class="lg:hidden">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class="flex items-center gap-2">
        <p class="font-title text-lg">{navbarRoutes[path]?.name}</p>
        <IconChevronDown size="20" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content class="fixed !left-0 !top-0 z-10 !mt-0 h-full w-full">
        <div
          class="flex h-full w-full flex-col justify-center bg-white/20 shadow-sm backdrop-blur-md"
          transition:fly
        >
          <nav class="mx-16 flex flex-col gap-5">
            <a href="/" class="inline-flex w-full items-center justify-between font-title text-xl">
              Home
            </a>
            {#each navbarRoutesArray as { name, href }}
              <DropdownMenu.Item>
                <a
                  {href}
                  class="inline-flex w-full items-center justify-between font-title text-xl"
                >
                  {name}
                  {#if navbarRoutes[path]?.name === name}
                    <div class="h-2 w-2 rounded-full bg-primary"></div>
                  {/if}
                </a>
              </DropdownMenu.Item>
            {/each}
          </nav>
          <DropdownMenu.Trigger class="mt-24 flex w-full justify-center">
            <div class="h-12 w-12 rounded-full bg-stone-700/50"></div>
          </DropdownMenu.Trigger>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>

  <nav class="hidden lg:block">
    <ul class="flex text-lg text-gray-600">
      <li class="px-8 font-title transition-[font-size] hover:text-xl">
        <a href="/">home</a>
      </li>
      {#each navbarRoutesArray as { name, href }}
        <li class="px-8 font-title transition-[font-size] hover:text-xl">
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
