module.exports = class TitlesPage {
  data() {
    return {
      pagination: {
        data: 'manifest.sequences[0].canvases',
        size: 1
      },
      permalink: ctx => `/annotations/titles/${ctx.pagination.pageNumber}.json`
    }
  }

  render({ annotations, pagination }) {
    const [canvas] = pagination.items
    const items = annotations.filter(annotation => annotation.target.startsWith(canvas['@id']))
    const page = {
      '@context': 'http://iiif.io/api/presentation/3/context.json',
      id: `https://zooniverse.github.io/iiif-annotations/annotations/titles/${pagination.pageNumber}.json`,
      type: 'AnnotationPage',
      partOf: {
        id: 'https://zooniverse.github.io/iiif-annotations/annotations/titles.json',
        type: "AnnotationCollection"
      },
      items
    }
    const { href } = pagination
    if (href.previous) {
      page.previous = {
        id: `https://zooniverse.github.io/iiif-annotations${href.previous}`,
        type: 'AnnotationPage'
      }
    }
    if (href.next) {
      page.next = {
        id: `https://zooniverse.github.io/iiif-annotations${href.next}`,
        type: 'AnnotationPage'
      }
    }
    return JSON.stringify(page)
  }
}