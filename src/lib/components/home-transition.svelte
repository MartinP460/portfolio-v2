<script>
  import { TRANSITION_DELAY, TRANSITION_DURATION } from '$lib/utils/transitions'
  import { quadIn, quadOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  let { children } = $props()
</script>

<div
  in:fly={{ y: 100, duration: TRANSITION_DURATION, delay: TRANSITION_DELAY, easing: quadOut }}
  out:fly={{ y: -100, duration: TRANSITION_DURATION, easing: quadIn }}
>
  {@render children()}
</div>
