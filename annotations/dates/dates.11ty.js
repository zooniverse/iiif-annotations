const PAGE_SIZE = 100

module.exports = class DatesPage {
  data() {
    return {
      pagination: {
        data: 'dates',
        size: PAGE_SIZE
      },
      permalink: ctx => `/annotations/dates/${ctx.pagination.pageNumber}.json`
    }
  }

  render({ annotations, pagination }) {
    const start = pagination.pageNumber * PAGE_SIZE
    const finish = start + PAGE_SIZE
    const page = {
      '@context': 'http://iiif.io/api/presentation/3/context.json',
      id: `https://zooniverse.github.io/iiif-annotations/annotations/dates/${pagination.pageNumber}.json`,
      type: 'AnnotationPage',
      partOf: {
        id: 'https://zooniverse.github.io/iiif-annotations/annotations/dates.json',
        type: "AnnotationCollection"
      },
      items: annotations.slice(start, finish)
    }
    return JSON.stringify(page)
  }
}