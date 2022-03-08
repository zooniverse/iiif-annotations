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
  return dates.map(classification => {
    const { metadata, annotations, subjectMetadata } = classification
    const canvasIndex = subjectMetadata['#priority'] - 1
    const [ sequence ] = manifest.sequences
    const canvas = sequence.canvases[canvasIndex]
    return transformTextTasks(annotations, canvas)
  })
}

module.exports = {
  eleventyComputed: {
    annotations
  }
}