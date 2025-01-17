<script>
  import { navbarRoutes } from '$lib/utils/navbarRoutes'

  let { url } = $props()

  const BACKGROUND_CLASS_NAME = 'bg-gradient'
  const gradients = ['#E0D1B8', '#D5C1A1', '#C9B189', '#BEA172', '#D5C1A1', '#E0D1B8']

  const route = $derived(navbarRoutes[url])
  const gradient1 = $derived(gradients[Math.max(route.order, 2) - 2])
  const gradient2 = $derived(gradients[Math.max(route.order, 2) - 1])
</script>

<div
  class="{BACKGROUND_CLASS_NAME} fixed -z-20 h-screen w-screen p-4 transition-all"
  style="--background-gradient-start: {gradient1}; --background-gradient-end: {gradient2};"
>
  <div class="relative h-full w-full">
    <div
      class="absolute left-0 top-4 h-[1px] w-8 -rotate-[40deg] rounded-lg bg-gray-500 sm:top-6 sm:w-12"
    ></div>
    <div
      class="absolute right-0 top-4 h-[1px] w-8 rotate-[40deg] rounded-lg bg-gray-500 sm:top-6 sm:w-12"
    ></div>
    <div
      class="absolute bottom-4 left-0 h-[1px] w-8 rotate-[40deg] rounded-lg bg-gray-500 sm:bottom-6 sm:w-12"
    ></div>
    <div
      class="absolute bottom-4 right-0 h-[1px] w-8 -rotate-[40deg] rounded-lg bg-gray-500 sm:bottom-6 sm:w-12"
    ></div>
  </div>
</div>
