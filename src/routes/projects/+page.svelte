<script lang="ts">
  import { IconArrowForwardUp, IconExternalLink } from '@tabler/icons-svelte'

  const { data } = $props()
</script>

<div class="mt-4">
  <ul class="flex h-full w-full flex-col gap-6">
    {#each data.projects as { path, title, intro, thumbnail, slug }}
      <li class="group">
        <a
          href={path}
          class="flex flex-col-reverse items-center justify-between gap-6 rounded-xl px-4 py-3 sm:flex-row lg:gap-12"
        >
          <div class="animate-fade-in animate-delay-2 flex flex-col">
            <p class="mt-2 font-title text-4xl font-bold">
              {title}
            </p>
            <p class="mt-1 font-body text-gray-700">
              {intro}
            </p>
            <span class="mt-2 inline-flex items-center gap-x-1 sm:mt-1">
              <p class="text-primary group-hover:underline sm:text-sm">Read more</p>
              <IconArrowForwardUp
                class="w-4 text-primary transition-transform ease-in group-hover:translate-x-1"
              />
            </span>
            <!-- <div class="mt-2 flex gap-2">
              {#each tags as tag}
                <div class="rounded bg-primary px-2 py-1 font-body text-xs text-white">
                  {tag}
                </div>
              {/each}
            </div> -->
          </div>
          <div class="transition-transform ease-in group-hover:scale-110">
            <enhanced:img
              src={thumbnail}
              alt="Hello"
              class="page-transition-thumbnail -z-20 h-52 w-52 rounded object-cover sm:h-36 sm:w-36 sm:min-w-36"
              style:--thumbnail="image-{slug}"
            />
          </div>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .page-transition-thumbnail {
    view-transition-name: var(--thumbnail);
  }
</style>
