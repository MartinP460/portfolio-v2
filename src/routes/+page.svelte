<script>
  import { navbarRoutesArray } from '$lib/utils/navbarRoutes'
</script>

<div
  class="mx-auto flex max-w-screen-lg flex-col justify-between px-6 lg:h-4/6 lg:items-center lg:justify-center"
>
  <div class="animate-fade-in-top lg:text-center">
    <p class="text-gray-600">Hey, I'm</p>
    <h1 class="mt-2 text-4xl font-bold text-primary lg:text-5xl">Martin Polley</h1>
    <h2 class="mt-2 text-xl">Full-stack developer</h2>
  </div>

  <div
    class="animate-fade-in-top animate-delay-4 mt-10 flex flex-col gap-4 text-3xl lg:mt-20 lg:flex-row lg:gap-10 lg:text-lg"
  >
    {#each navbarRoutesArray as { name, href }}
      <a {href}>{name}</a>
    {/each}
  </div>
</div>
