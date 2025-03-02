<script lang="ts">
  import Socials from '$lib/components/socials.svelte'
  import SvelteMarkdown from '@humanspeak/svelte-markdown'

  const { data } = $props()

  const { thumbnail, content } = data.about
</script>

<section class="flex h-full flex-col items-center justify-center px-4 md:pb-48">
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
    <p class="font-body leading-6 [&>p]:my-2">
      <SvelteMarkdown source={content} />
    </p>
  </div>
</section>
