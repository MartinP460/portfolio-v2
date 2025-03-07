<script lang="ts">
  import type { PageProps } from './$types'
  import { IconArrowBack, IconExternalLink } from '@tabler/icons-svelte'

  let { data }: PageProps = $props()

  const { title, thumbnail, slug, intro, liveUrl, repoUrl, tags, content, tableOfContents } = data
</script>

<div class="mt-12 flex flex-col items-center justify-center font-body">
  <div class="flex w-[145%] gap-x-20">
    <div class="animate-fade-in animate-delay-2 relative ml-12 flex flex-1 flex-col justify-center">
      <div class="relative flex items-center">
        <a href="/projects" class="absolute -left-12 transition-transform hover:scale-105">
          <IconArrowBack />
        </a>
        <h1 class="font-title text-4xl font-bold">
          {title}
        </h1>
      </div>
      <p class="mt-4 text-gray-600">
        {intro}
      </p>
      <div
        class="mt-4 flex gap-x-3 text-sm text-primary [&>a]:flex [&>a]:items-center [&>a]:gap-1 [&>a]:transition-all"
      >
        <a href={liveUrl} class="hover:underline">Live preview <IconExternalLink class="w-4" /></a>
        <a href={repoUrl} class="hover:underline">Repository <IconExternalLink class="w-4" /></a>
      </div>
    </div>
    <a href="/projects" aria-label={title} class="flex justify-end">
      <enhanced:img
        src={thumbnail}
        alt="Hello"
        class="page-transition-thumbnail aspect-square w-96 rounded object-cover"
        style:--thumbnail="image-{slug}"
      />
    </a>
  </div>
  <div class="animate-fade-in animate-delay-4 relative my-12">
    <div class="absolute right-[-16.5rem] w-[16.5rem] pl-5">
      {#if tableOfContents.length > 0}
        <ul class="flex flex-col gap-y-2 text-sm text-gray-400">
          {#each tableOfContents as header}
            <li
              style="margin-left:{(header.level - 3) * 10}px;"
              class="transition-colors hover:text-gray-700"
            >
              <a href="#{header.id}">{header.title}</a>
            </li>
          {/each}
        </ul>
      {/if}
      <ul class="mt-8 flex flex-wrap items-center gap-y-1">
        {#each tags as tag}
          <div class="group flex items-center">
            <li class="inline rounded-lg text-xs text-gray-400">{tag}</li>
            <span class="mx-2 hidden h-1 w-1 rounded-full bg-gray-300 group-last:hidden sm:inline">
            </span>
          </div>
        {/each}
      </ul>
    </div>
    <article class="prose mx-auto w-full max-w-xl [&>p>img]:rounded">
      {@html content}
    </article>
  </div>
</div>

<style>
  .page-transition-thumbnail {
    view-transition-name: var(--thumbnail);
  }
</style>
