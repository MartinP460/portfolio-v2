---
title: Optal.dk
intro: A website that displays historical admission figures across Danish universities and business schools. Made with Svelte and SvelteKit.
tags:
  - Typescript
  - Svelte
  - SvelteKit
  - TailwindCSS
  - shadcn/ui
slug: optal
path: /projects/optal
thumbnail: 'optal-logo'
liveUrl: https://www.optal.dk/
priority: 1
---

Many Danes will likely know that at the end of July admission figures for universities and business schools are published. It's also, not-so-surprisingly, the point where students who applied are notified of whether they've been accepted. The figures include the number of students who applied and were accepted at each course and institution, but also more niche figures such as the distribution of students on gender, age and secondary education. They always get a lot of media attention since the figures, and in particular the number of applicants, will, all other things being equal, affect the number of graduates with a particular education which in turn affects the labor market. For example, across all courses in [nursing](https://www.optal.dk/educations/nurse?category=applied), there's been a 34% decline in first-priority applicants from 5,110 in 2020 to 3,347 in 2025. [Optal.dk](https://www.optal.dk/), a play on the Danish words "optag" meaning admission and "tal" meaning numbers or figures, displays such admission figures across all registered courses. What you are about to read is a broad technical description of optal.dk and the process that I went through to create it.

### Motivation

The historical development in these figures is of particular interest and the [media does report on interesting trends](https://www.dr.dk/nyheder/indland/faerre-og-faerre-vil-vaere-sygeplejerske-laerer-og-paedagog-tre-studerende-giver) in these data. But if you are looking for a quick overview of the historical development across all institutions and courses, you'll be disappointed to find that the closest you can get to that is a [collection of Excel and PDF-files on the Danish Ministry of Higher Education and Science's website](https://ufm.dk/uddannelse/statistik-og-analyser/sogning-og-optag-pa-videregaende-uddannelser/grundtal-om-sogning-og-optag/kot-hovedtal). Optal.dk does exactly that - gives you a quick overview of the historical development in admission figures. It uses some nice charts to display the data.

The Danish ministry of Higher Education and Science, and more specifically KOT ("den koordinerede tilmelding"), are responsible for publishing these figures and optal.dk essentially takes the data, transforms it slightly, and displays it on the frontend.

### Architecture

Optal.dk is mainly comprised of the actual frontend. The project, however, also includes a very small backend app, and a "reader" package that reads and transforms the data from KOT. The main architechtural decisions have therefore focused on providing the frontend with the means to be performant, scalable and reliable.

Achieving performance on the frontend firstly means mitigating load and cross-page navigation times and secondly ensuring rendering performance. One of the fastest ways to mitigate load times on a web application is to purely serve static files, i.e. avoiding per-request server-side computation and expensive data-fetching requests invoked after the initial load like traditional single-page applications (SPA's). With this in mind, two top-level decisions were made:

1. Using Svelte and SvelteKit with the [static adapter](https://svelte.dev/docs/kit/adapter-static). This renders the entire site as static files while still taking advantage of SvelteKit's built-in performance optimizations such as [prerendering and link preloading](https://svelte.dev/docs/kit/performance). Moreover, [Svelte regularly scores high on performance comparisons between frameworks](https://medium.com/@jessicajournal/react-vs-vue-vs-svelte-the-ultimate-2025-frontend-performance-comparison-5b5ce68614e2) which lowers rendering times compared to e.g. React, although choice of framework is rarely a performance bottleneck in my experience.
2. Serving all data at build-time. The data only changes once a year when the admission figures are released in July so it makes sense to rebuild the frontend every time the data updates. This means that we can avoid data-fetching requests at load time entirely.

The main downside to this approach is that the build time can be long due to the fact that a potentially large number of pages need to be prerendered.

You may be wondering why the project includes a backend app then. This is to allow people to post feedback. The feedback is sent from the frontend's feedback form to the backend's only endpoint which in turn sends the data through to optal.dk's Supabase project. It uses Node.js and Fastify. It's possible to expand the backend with more functionality if the need should arise but feedback is the only thing the backend is used for at the time of writing.

The entire project sits in a monorepo with the structure shown below. The `reader` package reads and transforms the data from KOT as previously mentioned and we'll see how that ties in the frontend next. Note that the repo also includes a custom ESLint configuration package.

```js
optal.dk
├── apps
│   ├── api                    // Backend.
│   └── web                    // Frontend.
└── packages
    ├── eslint-config-custom   // Custom ESLint config.
    └── reader                 // Reader service.
```

The simple diagram below illustrates the main idea behind the architecture.

![Diagram showing flow of data from raw CSV files to the frontend.](/images/optal-diagram.webp)

To expand on the diagram above, the data is downloaded in Excel spreadsheets from [KOT](https://ufm.dk/uddannelse/statistik-og-analyser/sogning-og-optag-pa-videregaende-uddannelser/grundtal-om-sogning-og-optag/kot-hovedtal), small manual modifications are made to the spreadsheets, the data is converted to the CSV file format and put into the `reader` package which further modifies it and transforms it into a number of JSON files which the frontend can consume directly.

The result of these decisions are quite clear - pages score high in performance on Google Lighthouse. Below are the results for the page showing admission figures for a single course on mobile. The main thing preventing a score of 100 is the Javascript bundle size.

![Google Lighthouse scores for a the page showing admission figures for a single course.](/images/optal-lighthouse.webp)

I also mentioned that build times could be a problem and indeed it takes around 2.5 minutes for the server to build the ~1,500 pages that are prerendered. Larger production systems can obviously take a lot longer but this is still significant when accounting for the relatively small number of routes. At an increase in the number of pages by a few factors, a new deployment would take too long to build and a new approach would need to be considered such as server-side rendering with an aggresive caching strategy. This approach will do for now though.

### Development process

In order to develop anything effectively, it's important to at least have an idea of a software development process. In developing optal.dk, I defined a number of agile-inspired phases that I could use for continuous development.

1. **Planning** - planning the pages and top-level architectural decisions for each feature.
2. **Designing** - creating low-to-medium-fidelity designs each page and the interactive elements in Figma.
3. **Developing** - writing the code for the feature from the designs.
4. **Testing** - testing each feature by writing automated tests or doing manual QA sessions on the frontend.
5. **Feedback** - gathering feedback from users to identify bugs, missing features or poor user experiences.

User feedback would then restart the process. To illustrate how I used this process, let's have a look at how I developed the initial version of optal.dk. Since I didn't have a functioning website at this stage, the user feedback phase was skipped and I went back to the planning phase after testing.

Firstly, I did some initial planning to identify the main features. I knew there needed to be some way to show an overview of all courses and institutions. When viewing a course or institution, the data should be shown in an intuitive way and there should be a way to select which type of data should be displayed (this was initially confined to data related to admittances, applicants and quotient) and how. There should also be a way to download all data, an FAQ, an about section, and a "feedback button" that would be available on all pages. In addition, the functionality for reading and transforming the KOT data into JSON format needed to be implemented.

These seven seperate features could then be individually planned. For the feature concerning the overview of all courses specifically, I decided that the overview should be shown on the homepage and you should be able to search for institutions and courses.

Designing the overview/homepage was simple. I used the UI library [shadcn-ui for Svelte](https://www.shadcn-svelte.com/) to reduce the amount of designing for smaller interactive elements, meaning I could focus on the interaction design at a more top-level. I then made a medium fidelity prototype of the page in Figma as shown below. It was heavily inspired by existing designs showing admission figures such as on [UG.dk](https://web.archive.org/web/20240227065537/https://www.ug.dk/kot-tal) or [dr.dk](https://www.dr.dk/feature/gaa-paa-opdagelse-i-studieoptaget-2025/). You may also notice that optal.dk was originally called unioptag.dk but I changed the name before release.

![Medium fidelity prototype of the homepage of optal.dk.](/images/optal-design.webp)

Before having developed this page, the functionality of reading the data and transforming it to JSON was finished so the development part was a matter of creating the route, displaying the data in the accordions from the UI library and implementing the search functionality (which runs locally, powered by the [Fuse.js](https://www.fusejs.io/) library).

Only limited testing was required for the homepage mainly due to its simplicity, but testing of the search input revealed that certain courses didn't show up in the results and the search settings were tweaked as a result.

I kept track of the development state of the different features by using a kanban board in Notion, and repeated phase 1-4 in developing the remaining features.

### Reception and feedback

The goal of optal.dk was to provide a quick historical overview of admission figures, but I never thought about how many people are interested in these figures or set a goal for the number of visitors I would like each month or year. Regardless, I knew at least one person would be interested in the website so I focused on SEO to promote optal.dk and posting on a little on forums. As of mid 2025, optal.dk gets ~100 visitors a month except in July and August when new figures are released and the number of visitors jumps to ~2000 and ~500 respectively. As far as I can see, it's also one of top search results on Google in Denmark if you search for "optal".

In general, optal.dk was well-received and people seemed to like it (judging by comments on Reddit). I also got some constructive feedback that I used that in the development process. For example, admission data related to age and education were displayed as "stacked bar charts" but after feedback from users I added a pie chart instead as the default view. You can compare the difference between these two by navigating to any course (for example ["Biomedicin"](https://www.optal.dk/syddansk-universitet/biomedicin-17015?category=age)), selecting "Age" as the category, and then switching between the "Donut" and "Bar" display types. The "Donut" chart is significantly more user friendly in my opinion despite the fact that it only displays data for one year at a time.

I'm not planning on expanding the website with anymore larger features, especially since they might take away from its simplicity which I believe is one of its strenghts. I'll continue to maintain it and update it with fresh admission figures each year, however.
