<script>
  import { quadIn, quadOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  let { children } = $props()
</script>

<div
  in:fly={{ y: 100, duration: 200, delay: 250, easing: quadOut }}
  out:fly={{ y: -100, duration: 200, easing: quadIn }}
>
  {@render children()}
</div>
