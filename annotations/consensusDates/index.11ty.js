module.exports = class DatesIndex {
  data() {
    return {
      permalink: '/annotations/consensusDates.json'
    }
  }

  render({ collections }) {
    const datePage = collections.all.find(collection => collection.template.filePathStem === '/annotations/consensusDates/dates')
    const datePagination = datePage.data.pagination
    const page = {
      '@context': 'http://iiif.io/api/presentation/3/context.json',
      id: 'https://zooniverse.github.io/iiif-annotations/annotations/consensusDates.json',
      type: 'AnnotationCollection',
      first: {
        id: `https://zooniverse.github.io/iiif-annotations${datePagination.href.first}`,
        type: 'AnnotationPage'
      },
      last: {
        id: `https://zooniverse.github.io/iiif-annotations${datePagination.href.last}`,
        type: 'AnnotationPage'
      }
    }
    return JSON.stringify(page)
  }
}