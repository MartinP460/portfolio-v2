<script lang="ts">
  const routes = [
    {
      name: 'projects',
      href: '/projects',
      order: 1
    },
    {
      name: 'experience',
      href: '/experience',
      order: 2
    },
    {
      name: 'education',
      href: '/education',
      order: 3
    },
    {
      name: 'skills',
      href: '/skills',
      order: 4
    },
    {
      name: 'about me',
      href: '/about',
      order: 5
    }
  ]
</script>

<header class="flex grid-flow-dense items-center justify-center p-8">
  <nav>
    <ul class="grid grid-cols-5 gap-x-12 text-lg text-gray-600">
      {#each routes as { name, href }}
        <li class="flex flex-col items-center">
          <a {href}>
            {name}
          </a>
        </li>
      {/each}
      <div class="order-last flex items-center justify-center">
        <div class="mt-2 h-2 w-2 rounded-full bg-amber-600"></div>
      </div>
    </ul>
  </nav>
</header>
