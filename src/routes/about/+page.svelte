<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown'

  const { data } = $props()

  const { thumbnail, content } = data.about
</script>

<section
  class="flex h-full flex-col-reverse items-center justify-center gap-x-12 gap-y-8 px-4 sm:flex-row md:pb-48"
>
  <enhanced:img
    src={thumbnail}
    alt="Hello"
    class="h-52 w-52 rounded-2xl object-cover sm:h-52 sm:w-52 sm:min-w-52"
  />
  <p class="font-body leading-6 [&>p]:my-2">
    <SvelteMarkdown source={content} />
  </p>
</section>
