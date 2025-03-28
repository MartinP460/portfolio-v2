<script lang="ts">
  import Ucph from '$lib/components/icons/ucph.svelte'
  import { createPageTitle } from '$lib/utils/createPageTitle'

  const { data } = $props()

  const education = data.education[0]
</script>

<svelte:head>
  <title>{createPageTitle('Education')}</title>
</svelte:head>

<section
  class="flex flex-col justify-center px-4 pb-16 font-body text-gray-800 md:h-full md:pb-48 lg:ml-24"
>
  <div class="group">
    <Ucph class="h-16 w-16 transition-transform duration-300 group-hover:scale-110" />
    <h1 class="mt-4 font-title text-2xl font-bold text-black">{education.educationName}</h1>
    <div class="mt-1 flex items-center text-sm font-bold text-primary">
      <p>{education.institutionName}</p>
      <span class="mx-4 h-1 w-1 rounded-full bg-gray-600"></span>
      <p>{education.years}</p>
    </div>
    <div class="relative mt-4">
      <p class="font-bold text-black lg:absolute lg:-left-24">Thesis</p>
      <div class="">{education.thesisTopic} - "{education.thesisTitle}"</div>
    </div>
    <div class="relative mt-4">
      <p class="font-bold text-black lg:absolute lg:-left-24">Courses</p>
      <div class="flex flex-col sm:block">
        {#each education.coursesTaken as courseName}
          <div class="group/courses inline-flex items-center leading-relaxed">
            <p class="first:ml-0">{courseName}</p>
            <span
              class="mx-3 hidden h-1 w-1 rounded-full bg-gray-600 group-last/courses:hidden sm:inline"
            ></span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
