<script lang="ts">
  import { createPageTitle } from '$lib/utils/createPageTitle'
  import { IconArrowForwardUp, IconExternalLink } from '@tabler/icons-svelte'

  const { data } = $props()
</script>

<svelte:head>
  <title>{createPageTitle('Projects')}</title>
</svelte:head>

<section class="flex items-center pb-16 md:h-full md:pb-48 2xl:pb-64">
  <div class="mt-4 flex flex-col items-center px-8 font-body">
    <a href="/projects" class="mt-4 text-lg text-primary hover:underline">Highlighted projects</a>
    <ul class="mt-6 grid w-full gap-x-4 gap-y-8 sm:grid-cols-2">
      {#each data.projects as { title, path, liveUrl, repoUrl, intro }}
        <li class="flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-x-4">
              <p class="font-title text-xl">
                {title}
              </p>
              <a href={path} class="group inline-flex items-center gap-x-1">
                <p class="text-primary group-hover:underline sm:text-sm">Read more</p>
                <IconArrowForwardUp
                  class="w-4 text-primary transition-transform ease-in group-hover:translate-x-1"
                />
              </a>
            </div>
            <p class="mt-2 text-sm text-gray-700">
              {intro}
            </p>
          </div>
          <div class="mt-2 flex gap-x-4">
            <div
              class="flex gap-x-4 text-sm text-primary [&>a]:flex [&>a]:items-center [&>a]:gap-1"
            >
              <a href={liveUrl} class="hover:underline">
                Live preview
                <IconExternalLink class="w-4" />
              </a>
              <a href={repoUrl} class="hover:underline">
                Repository
                <IconExternalLink class="w-4" />
              </a>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>
