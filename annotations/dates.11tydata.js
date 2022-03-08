function transformTextTasks(annotations, canvas) {
  const text = annotations.find(annotation => annotation.task === 'T0')
  return {
    type: 'Annotation',
    motivation: 'tagging',
    body: {
      type: 'TextualBody',
      value: text.value,
      language: 'en',
      format: 'text/plain'
    },
    target: canvas['@id']
  }
}

function annotations({ manifest, dates }) {
  const items = dates.map(classification => {
    const { metadata, annotations, subjectMetadata } = classification
    const canvasIndex = subjectMetadata['#priority'] - 1
    const [ sequence ] = manifest.sequences
    const canvas = sequence.canvases[canvasIndex]
    return transformTextTasks(annotations, canvas)
  })
  return {
    '@context': 'http://iiif.io/api/presentation/3/context.json',
    id: 'https://zooniverse.github.io/iiif-annotations/annotations/dates.json',
    type: 'AnnotationPage',
    items
  }
}

module.exports = {
  eleventyComputed: {
    annotations: annotations
  }
}