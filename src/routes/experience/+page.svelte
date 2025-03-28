<script lang="ts">
  import Lenus from '$lib/components/icons/lenus.svelte'
  import { createPageTitle } from '$lib/utils/createPageTitle'

  const { data } = $props()
</script>

<svelte:head>
  <title>{createPageTitle('Experience')}</title>
</svelte:head>

<section class="flex h-full items-center px-4 pb-16 md:pb-48">
  <div class="flex w-full flex-col">
    {#each data.experience as { companyName, position, timePeriod, logo, content }}
      <div class="group flex items-center gap-4 text-gray-600 sm:gap-6">
        <div class="flex h-full flex-col items-center [&>div]:bg-primary">
          <div class="mb-1 hidden h-0.5 w-2 rounded-sm group-first:block"></div>
          <div class="mb-1 hidden h-1 w-2 rounded-sm group-first:block"></div>
          <div class="mb-1.5 hidden h-2 w-2 rounded-sm group-first:block"></div>
          <div
            class="mb-2 h-20 w-2 rounded-b-sm transition-all duration-300 group-first:rounded-t-sm group-hover:mb-3 group-hover:h-[4.5rem]"
          ></div>
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110"
          >
            {#if logo === 'lenus'}
              <Lenus class="ml-1 h-6 w-6 fill-white" />
            {/if}
          </div>
          <div
            class="mt-2 h-28 w-2 rounded-t-sm transition-all duration-300 group-last:rounded-b-sm group-hover:mt-3 group-hover:h-[7.5rem]"
          ></div>
        </div>
        <div>
          <h3 class="font-title text-xl font-bold text-black">{companyName}</h3>
          <div
            class="mt-1 flex flex-col gap-y-1 font-body text-sm font-semibold text-primary sm:flex-row sm:items-center"
          >
            <p>{position}</p>
            <div class="mx-4 hidden h-1 w-1 rounded-full bg-gray-600 sm:block"></div>
            <p>{timePeriod}</p>
          </div>
          <p class="mt-2 font-body text-gray-800">
            {@html content}
          </p>
        </div>
      </div>
    {/each}
  </div>
</section>
