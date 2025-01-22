import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ params }) => {
  if (params.project === 'rdm') {
    return {
      title: 'React Denmark Map',
      content: 'React Denmark Map is a library...'
    }
  }

  error(404, 'Not found')
}
