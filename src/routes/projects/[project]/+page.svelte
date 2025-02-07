<script lang="ts">
  import type { PageProps } from './$types'

  let { data: project }: PageProps = $props()
</script>

<div class="mt-12">
  <div class="flex h-[500px]">
    <div class="animate-fade-in animate-delay-2 flex-1">
      <p class="font-title text-4xl font-bold">
        {project.name}
      </p>
    </div>
    <a href="/projects" aria-label={project.name} class="flex-1">
      <enhanced:img
        src={project.thumbnailUrl}
        alt="Hello"
        class="page-transition-thumbnail aspect-square rounded object-cover"
        style:--thumbnail="image-{project.slug}"
      />
    </a>
  </div>
</div>

<style>
  .page-transition-thumbnail {
    view-transition-name: var(--thumbnail);
  }
</style>
