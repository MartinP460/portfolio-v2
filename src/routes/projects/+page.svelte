<script lang="ts">
  import { getProjects } from '$lib/utils/getProjects'

  const projects = getProjects()
</script>

<div class="mt-12">
  <ul class="flex h-full w-full flex-col gap-12">
    {#each projects as project}
      <li>
        <a href={project.path} class="flex justify-between">
          <p class="text-xl">
            {project.name}
          </p>
          <enhanced:img
            src={project.thumbnailUrl}
            alt="Hello"
            class="page-transition-thumbnail h-40 w-40 rounded object-cover"
            style:--thumbnail="image-{project.slug}"
          />
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
