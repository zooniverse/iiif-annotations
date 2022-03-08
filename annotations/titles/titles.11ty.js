const PAGE_SIZE = 100

module.exports = class TitlesPage {
  data() {
    return {
      pagination: {
        data: 'titles',
        size: PAGE_SIZE
      },
      permalink: ctx => `/annotations/titles/${ctx.pagination.pageNumber}.json`
    }
  }

  render({ annotations, pagination }) {
    const start = pagination.pageNumber * PAGE_SIZE
    const finish = start + PAGE_SIZE
    const page = {
      '@context': 'http://iiif.io/api/presentation/3/context.json',
      id: `https://zooniverse.github.io/iiif-annotations/annotations/titles/${pagination.pageNumber}.json`,
      type: 'AnnotationPage',
      partOf: {
        id: 'https://zooniverse.github.io/iiif-annotations/annotations/titles.json',
        type: "AnnotationCollection"
      },
      items: annotations.slice(start, finish).flat()
    }
    return JSON.stringify(page)
  }
}