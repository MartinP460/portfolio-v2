<script lang="ts">
  import Socials from '$lib/components/socials.svelte'
  import { createPageTitle } from '$lib/utils/createPageTitle.js'

  const { data } = $props()

  const { thumbnail, content } = data.about
</script>

<svelte:head>
  <title>{createPageTitle('About')}</title>
</svelte:head>

<section class="flex flex-col items-center justify-center px-8 pb-16 md:h-full md:pb-48">
  <div class="flex flex-col-reverse items-center justify-center gap-x-12 gap-y-8 sm:flex-row">
    <div class="flex flex-col items-center">
      <enhanced:img
        src={thumbnail}
        alt="Hello"
        class="h-52 w-52 rounded-full object-cover sm:h-52 sm:w-52 sm:min-w-52"
      />
      <div class="mt-6">
        <Socials />
      </div>
    </div>
    <p class="font-body text-sm text-gray-800 [&>p]:my-2">
      {@html content}
    </p>
  </div>
</section>
