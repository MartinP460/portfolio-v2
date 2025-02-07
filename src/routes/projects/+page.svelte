<script lang="ts">
  import { getProjects } from '$lib/utils/getProjects'

  const projects = getProjects()
</script>

<div class="mt-4">
  <ul class="flex h-full w-full flex-col gap-8">
    {#each projects as { path, tags, name, description, thumbnailUrl, slug }}
      <li class="group">
        <a
          href={path}
          class="flex justify-between gap-16 rounded-xl px-2 pt-3 transition-colors group-hover:bg-white/20"
        >
          <div class="animate-fade-in animate-delay-2 flex flex-col">
            <p class="mt-2 font-title text-4xl font-bold">
              {name}
            </p>
            <p class="mt-1 font-body text-gray-700">
              {description}
            </p>
            <div class="mt-2 flex gap-6">
              {#each tags as tag}
                <div class="rounded-full font-body text-sm text-primary">
                  {tag}
                </div>
              {/each}
            </div>
          </div>
          <div
            class="border-8 border-white transition-transform group-hover:-translate-y-2 group-hover:scale-105 group-hover:group-odd:rotate-6 group-hover:group-even:-rotate-6"
          >
            <enhanced:img
              src={thumbnailUrl}
              alt="Hello"
              class="page-transition-thumbnail h-36 w-36 min-w-36 rounded object-cover"
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
