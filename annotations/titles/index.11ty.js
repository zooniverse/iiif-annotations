module.exports = class TitlesIndex {
  data() {
    return {
      permalink: '/annotations/titles.json'
    }
  }

  render({ collections }) {
    const titlePage = collections.all.find(collection => collection.template.filePathStem === '/annotations/titles/titles')
    const titlePagination = titlePage.data.pagination
    const page = {
      '@context': 'http://iiif.io/api/presentation/3/context.json',
      id: 'https://zooniverse.github.io/iiif-annotations/annotations/titles.json',
      type: 'AnnotationCollection',
      first: {
        id: `https://zooniverse.github.io/iiif-annotations${titlePagination.href.first}`,
        type: 'AnnotationPage'
      },
      last: {
        id: `https://zooniverse.github.io/iiif-annotations${titlePagination.href.last}`,
        type: 'AnnotationPage'
      }
    }
    return JSON.stringify(page)
  }
}