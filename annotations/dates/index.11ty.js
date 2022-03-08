module.exports = class DatesIndex {
  data() {
    return {
      permalink: '/annotations/dates.json'
    }
  }

  render() {
    const page = {
      '@context': 'http://iiif.io/api/presentation/3/context.json',
      id: 'https://zooniverse.github.io/iiif-annotations/annotations/dates.json',
      type: 'AnnotationCollection',
      first: {
        id: 'https://zooniverse.github.io/iiif-annotations/annotations/dates/0.json',
        type: 'AnnotationPage'
      },
      last: {
        id: 'https://zooniverse.github.io/iiif-annotations/annotations/dates/9.json',
        type: 'AnnotationPage'
      }
    }
    return JSON.stringify(page)
  }
}