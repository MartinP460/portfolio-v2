<script lang="ts">
  import { IconArrowForwardUp, IconExternalLink } from '@tabler/icons-svelte'

  const { data } = $props()
</script>

<div class="mt-4 px-3 font-body">
  <ul class="flex flex-col gap-y-4">
    {#each data.projects as { title, path, thumbnail, liveUrl, repoUrl }}
      <li class="flex items-center justify-between">
        <div class="flex gap-x-2">
          <p class="font-title text-xl">
            {title}
          </p>
          <a href={path} class="group mt-2 inline-flex items-center gap-x-1 sm:mt-1">
            <p class="text-primary group-hover:underline sm:text-sm">Read more</p>
            <IconArrowForwardUp
              class="w-4 text-primary transition-transform ease-in group-hover:translate-x-1"
            />
          </a>
        </div>
        <div class="flex gap-x-4">
          <div class="flex gap-x-3 text-sm text-primary [&>a]:flex [&>a]:items-center [&>a]:gap-1">
            <a href={liveUrl} class="hover:underline">
              Live preview
              <IconExternalLink class="w-4" />
            </a>
            <a href={repoUrl} class="hover:underline">
              Repository
              <IconExternalLink class="w-4" />
            </a>
          </div>
          <enhanced:img
            src={thumbnail}
            alt="Hello"
            class="h-12 w-12 min-w-12 rounded-full object-cover"
          />
        </div>
      </li>
    {/each}
  </ul>
</div>
