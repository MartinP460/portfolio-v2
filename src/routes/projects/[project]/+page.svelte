<script lang="ts">
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()

  const { title, thumbnail, slug } = data
</script>

<div class="mt-12">
  <div class="flex h-[500px]">
    <div class="animate-fade-in animate-delay-2 flex-1">
      <p class="font-title text-4xl font-bold">
        {title}
      </p>
    </div>
    <a href="/projects" aria-label={title} class="flex-1">
      <enhanced:img
        src={thumbnail}
        alt="Hello"
        class="page-transition-thumbnail aspect-square rounded object-cover"
        style:--thumbnail="image-{slug}"
      />
    </a>
  </div>
</div>

<style>
  .page-transition-thumbnail {
    view-transition-name: var(--thumbnail);
  }
</style>
