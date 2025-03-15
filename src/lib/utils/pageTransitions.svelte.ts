import { quadIn, quadOut } from 'svelte/easing'
import { fly, type FlyParams } from 'svelte/transition'

/** Updates the current page transition. Should be run before navigation.
 * @param from The route which is being navigated from.
 * @param to The route which is being navigated to.
 * @param options Extra options that programatically modify the behaviour of the transition.
 */
export const updatePageTransition = (from: string, to: string, options: { isMobile: boolean }) => {
  const { isMobile } = options

  const transitionKey = `${from} ${to}`

  // We use this "global" switch statement for all page transitions.
  switch (transitionKey) {
    case '/projects /experience':
    case '/projects /education':
    case '/projects /about':
    case '/projects/all /experience':
    case '/projects/all /education':
    case '/projects/all /about':
    case '/experience /education':
    case '/experience /about':
    case '/education /about':
      setBodyTransition(isMobile ? 'flyInRight' : 'flyInLeft')
      break
    case '/about /education':
    case '/about /experience':
    case '/about /projects':
    case '/education /experience':
    case '/education /projects':
    case '/experience /projects':
      setBodyTransition(isMobile ? 'flyInLeft' : 'flyInRight')
      break
    case '/ /projects':
    case '/ /experience':
    case '/ /education':
    case '/ /about':
      setNavbarTransition('flyInTop')
      setBodyTransition('flyInTop')
      break
    case '/projects /projects/all':
      setNavbarTransition(isMobile ? 'disabled' : 'flyInTop')
      setBodyTransition(isMobile ? 'disabled' : 'flyInTop')
      break
    case '/projects /':
    case '/experience /':
    case '/education /':
    case '/about /':
    case '/projects/all /projects':
      setNavbarTransition('flyInBottom')
      setBodyTransition('flyInBottom')
      break
    case '/projects /projects/[project]':
      setNavbarTransition('flyInTop')
      setBodyTransition('disabled')
      break
    case '/projects/[project] /projects':
      setNavbarTransition('flyInBottom')
      setBodyTransition('disabled')
      break
  }
}

/** Object containing Svelte transition functions for the navbar. */
export const navbarTransitionFuncs = $state({
  in: (node: Element) => fly(node),
  out: (node: Element) => fly(node)
})

/** Object containing Svelte transition functions for the body of the page. */
export const bodyTransitionFuncs = $state({
  in: (node: Element) => fly(node),
  out: (node: Element) => fly(node)
})

const setNavbarTransition = (transitionName: keyof typeof TRANSITIONS) => {
  navbarTransitionFuncs.in = (node: Element) =>
    fly(node, { ...TRANSITION_IN_DEFAULT, ...TRANSITIONS[transitionName].in })
  navbarTransitionFuncs.out = (node: Element) =>
    fly(node, { ...TRANSITION_OUT_DEFAULT, ...TRANSITIONS[transitionName].out })
}

const setBodyTransition = (transitionName: keyof typeof TRANSITIONS) => {
  bodyTransitionFuncs.in = (node: Element) =>
    fly(node, { ...TRANSITION_IN_DEFAULT, ...TRANSITIONS[transitionName].in })
  bodyTransitionFuncs.out = (node: Element) =>
    fly(node, { ...TRANSITION_OUT_DEFAULT, ...TRANSITIONS[transitionName].out })
}

export const TRANSITION_DURATION = 200
export const TRANSITION_DELAY = 250

const TRANSITION_IN_DEFAULT = {
  x: 0,
  y: 0,
  delay: TRANSITION_DELAY,
  duration: TRANSITION_DURATION,
  easing: quadOut
}

const TRANSITION_OUT_DEFAULT = {
  x: 0,
  y: 0,
  duration: TRANSITION_DURATION,
  easing: quadIn
}

/** All available transition configs for the "fly" transition. */
const TRANSITIONS = {
  flyInLeft: {
    in: {
      x: -200,
      y: 0
    },
    out: {
      x: 200,
      y: 0
    }
  },
  flyInRight: {
    in: {
      x: 200,
      y: 0
    },
    out: {
      x: -200,
      y: 0
    }
  },
  flyInTop: {
    in: {
      x: 0,
      y: 100
    },
    out: {
      x: 0,
      y: -100
    }
  },
  flyInBottom: {
    in: {
      x: 0,
      y: -100
    },
    out: {
      x: 0,
      y: 100
    }
  },
  disabled: {
    in: {
      duration: 0
    },
    out: {
      duration: 0
    }
  }
} satisfies Record<string, { in: FlyParams; out: FlyParams }>
