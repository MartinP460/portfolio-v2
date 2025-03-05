<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'
  import type { PageProps } from './$types'
  import { IconArrowBack, IconExternalLink } from '@tabler/icons-svelte'

  let { data }: PageProps = $props()

  const { title, thumbnail, slug, intro, liveUrl, repoUrl, content } = data

  const regexHeaders = /#{1,6}.+/g
  const headers: string[] | null = content.match(regexHeaders)
  const headerObjects = headers?.map((header) => ({
    title: header.replace(/^#+\s*/, ''),
    level: (header.match(/#/g) || []).length,
    id: header
      .replace(/^#+\s*/, '')
      .toLowerCase()
      .replaceAll(' ', '-')
  }))
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
    {#if headerObjects}
      <ul class="absolute right-[-16.5rem] flex flex-col gap-y-2 text-sm text-gray-400">
        {#each headerObjects as header}
          <li
            style="margin-left:{(header.level - 3) * 10}px;"
            class="transition-colors hover:text-gray-700"
          >
            <a href="#{header.id}">{header.title}</a>
          </li>
        {/each}
      </ul>
    {/if}
    <article class="prose mx-auto w-full max-w-xl [&>p>img]:rounded">
      <SvelteMarkdown source={content} />
    </article>
  </div>
</div>

<style>
  .page-transition-thumbnail {
    view-transition-name: var(--thumbnail);
  }
</style>
