<script lang="ts">
  const { data } = $props()
</script>

<div class="mt-4">
  <ul class="flex h-full w-full flex-col gap-10">
    {#each data.projects as { path, tags, title, intro, thumbnail, slug }}
      <li class="group">
        <a
          href={path}
          class="flex flex-col-reverse items-center justify-between gap-6 rounded-xl px-2 pt-3 transition-colors group-hover:bg-white/20 sm:flex-row lg:gap-16"
        >
          <div class="animate-fade-in animate-delay-2 flex flex-col">
            <p class="mt-2 font-title text-4xl font-bold">
              {title}
            </p>
            <p class="mt-1 font-body text-gray-700">
              {intro}
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
            class="!-z-20 bg-white p-3 transition-transform group-hover:-translate-y-2 group-hover:scale-105 group-hover:group-odd:rotate-6 group-hover:group-even:-rotate-6"
          >
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
