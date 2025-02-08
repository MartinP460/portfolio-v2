<script lang="ts">
  import Lenus from '$lib/components/icons/lenus.svelte'

  const { data } = $props()
</script>

<section class="flex h-full items-center px-3 pb-16 md:pb-48">
  <div class="flex w-full flex-col">
    {#each data.experience as { companyName, position, timePeriod, logo, content }}
      <div class="group flex items-center gap-4 text-gray-600 sm:gap-6">
        <div class="flex h-full flex-col items-center">
          <div class="mb-1 hidden h-0.5 w-2 rounded bg-primary group-first:block"></div>
          <div class="mb-1 hidden h-1 w-2 rounded bg-primary group-first:block"></div>
          <div class="mb-1.5 hidden h-2 w-2 rounded-sm bg-primary group-first:block"></div>
          <div class="mb-2 h-20 w-2 rounded-b bg-primary group-first:rounded-t-sm"></div>
          <div
            class="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary font-bold text-white"
          >
            {#if logo === 'lenus'}
              <Lenus class="ml-1 h-6 w-6 fill-white" />
            {/if}
          </div>
          <div class="mt-2 h-28 w-2 rounded-t bg-primary group-last:rounded-b-lg"></div>
        </div>
        <div>
          <h3 class="font-title text-xl font-bold text-black">{companyName}</h3>
          <div
            class="mt-1 flex flex-col items-center font-body text-sm font-semibold text-primary sm:flex-row"
          >
            <p>{position}</p>
            <div class="mx-4 h-1 w-1 rounded-full bg-gray-600"></div>
            <p>{timePeriod}</p>
          </div>
          <p class="mt-2 font-body text-gray-700">
            {content}
          </p>
        </div>
      </div>
    {/each}
  </div>
</section>
