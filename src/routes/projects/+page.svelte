<script lang="ts">
  import { IconArrowForwardUp } from '@tabler/icons-svelte'

  const { data } = $props()
</script>

<div class="flex flex-col items-center px-8 font-body">
  <ul class="flex h-full w-full flex-col gap-8 sm:gap-4">
    {#each data.projects as { path, title, intro, thumbnail, slug }}
      <li class="group">
        <a
          href={path}
          class="flex flex-col-reverse items-center justify-between gap-6 rounded-xl px-4 py-3 sm:flex-row lg:gap-12"
        >
          <div class="animate-fade-in animate-delay-2 flex flex-col">
            <p class="mt-2 font-title text-2xl font-bold sm:text-3xl">
              {title}
            </p>
            <p class="mt-1 text-sm text-gray-700 sm:text-base">
              {intro}
            </p>
            <span class="mt-2 inline-flex items-center gap-x-1 sm:mt-1">
              <p class="text-primary group-hover:underline sm:text-sm">Read more</p>
              <IconArrowForwardUp
                class="w-4 text-primary transition-transform ease-in group-hover:translate-x-1"
              />
            </span>
          </div>
          <div class="transition-transform ease-in group-hover:scale-105">
            <enhanced:img
              src={thumbnail}
              alt="Thumbnail image of {title}"
              class="page-transition-thumbnail -z-20 h-52 w-full rounded object-cover sm:h-32 sm:w-32 sm:min-w-32"
              style:--thumbnail="image-{slug}"
            />
          </div>
        </a>
      </li>
    {/each}
  </ul>
  <a
    href="/projects/all"
    class="animate-fade-in animate-delay-2 mb-6 mt-8 text-lg text-primary hover:underline sm:mb-3"
  >
    All projects
  </a>
</div>

<style>
  .page-transition-thumbnail {
    view-transition-name: var(--thumbnail);
  }
</style>
