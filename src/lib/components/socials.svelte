<script lang="ts">
  import { EMAIL_ADDRESS, GITHUB_URL, GITHUB_USERNAME, LINKEDIN_URL } from '$lib/utils/socials'
  import { IconBrandGithub, IconBrandLinkedin, IconFileCv, IconMail } from '@tabler/icons-svelte'

  let { class: className = '' } = $props()
</script>

<div
  class="flex gap-x-4 [&>a]:rounded-full [&>a]:bg-primary/60 [&>a]:p-1 [&>a]:text-white [&>a]:transition-all [&>a]:duration-300 {className}"
>
  <a href={GITHUB_URL} title="CV/resumé" class="hover:scale-105 hover:bg-primary">
    <IconFileCv class="h-6 w-6 sm:h-5 sm:w-5" />
  </a>
  <a
    href="mailto:{EMAIL_ADDRESS}"
    title="Email: {EMAIL_ADDRESS}"
    class="hover:scale-105 hover:bg-primary"
  >
    <IconMail class="h-6 w-6 sm:h-5 sm:w-5" />
  </a>
  <a href={GITHUB_URL} title="Github: {GITHUB_USERNAME}" class="hover:scale-105 hover:bg-primary">
    <IconBrandGithub class="h-6 w-6 sm:h-5 sm:w-5" />
  </a>
  <a href={LINKEDIN_URL} title="LinkedIn: Martin Polley" class="hover:scale-105 hover:bg-primary">
    <IconBrandLinkedin class="h-6 w-6 sm:h-5 sm:w-5" />
  </a>
</div>
