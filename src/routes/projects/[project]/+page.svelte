<script lang="ts">
  import { createPageTitle } from '$lib/utils/createPageTitle'
  import type { PageProps } from './$types'
  import { IconArrowBack, IconExternalLink } from '@tabler/icons-svelte'

  let { data }: PageProps = $props()

  const { title, thumbnail, slug, intro, liveUrl, repoUrl, tags, content, tableOfContents } = data
</script>

<svelte:head>
  <title>{createPageTitle(title)}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center font-body lg:mt-12">
  <div
    class="flex flex-col-reverse justify-between gap-x-8 px-8 lg:w-[130%] lg:flex-row lg:px-16 xl:w-[145%] xl:px-0"
  >
    <div
      class="animate-fade-in animate-delay-2 relative mt-6 flex flex-col justify-center lg:ml-12"
    >
      <div class="relative flex flex-col lg:flex-row lg:items-center">
        <a
          href="/projects"
          class="flex gap-x-2 text-primary transition-transform hover:underline lg:absolute lg:-left-12 lg:hover:scale-105"
        >
          <IconArrowBack />
          <p class="lg:hidden">Projects</p>
        </a>
        <h1 class="mt-2 font-title text-4xl font-bold lg:mt-0">
          {title}
        </h1>
      </div>
      <p class="mt-4 text-gray-600 lg:max-w-[500px]">
        {intro}
      </p>
      <div class="mt-4 flex gap-x-3 text-sm text-primary [&>a]:flex [&>a]:items-center [&>a]:gap-1">
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" class="hover:underline"
          >Live preview <IconExternalLink class="w-4" /></a
        >
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" class="hover:underline"
          >Repository <IconExternalLink class="w-4" /></a
        >
      </div>
    </div>
    {#if thumbnail}
      <a href="/projects" aria-label={title} class="flex justify-center lg:justify-end">
        <enhanced:img
          src={thumbnail}
          alt="Hello"
          class="page-transition-thumbnail aspect-[16/12] rounded object-cover brightness-95 lg:aspect-square lg:h-96 lg:w-96"
          style:--thumbnail="image-{slug}"
        />
      </a>
    {/if}
  </div>
  {#if tableOfContents}
    <div class="animate-fade-in animate-delay-4 relative my-12">
      <div class="px-8 sm:px-0 xl:absolute xl:right-[-16.5rem] xl:w-[16.5rem] xl:pl-5">
        {#if tableOfContents.length > 0}
          <ul
            class="flex flex-col gap-y-2 text-base text-gray-500 md:gap-y-1.5 lg:text-sm xl:gap-y-2 xl:text-gray-400"
          >
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
              <li class="inline rounded-lg text-sm text-gray-400 xl:text-xs">{tag}</li>
              <span class="mx-2 h-1 w-1 rounded-full bg-gray-300 group-last:hidden"> </span>
            </div>
          {/each}
        </ul>
      </div>
      <article
        class="prose mx-auto mt-8 w-full max-w-xl px-6 sm:px-0 xl:mt-0 [&>p>img]:rounded [&>pre>code]:block [&>pre>code]:overflow-x-auto [&>pre>code]:px-4 [&>pre]:w-[calc(100vw-3rem)] [&>pre]:sm:max-w-xl"
      >
        {@html content}
      </article>
    </div>
  {/if}
</div>

<style>
  .page-transition-thumbnail {
    view-transition-name: var(--thumbnail);
  }
</style>
