function transformTextTasks(annotations, canvas, partOf) {
  const text = annotations.find(annotation => annotation.task === 'T0')
  const source = {
    id: canvas['@id'],
    type: 'Canvas',
    partOf
  }
  return {
    type: 'Annotation',
    motivation: 'tagging',
    body: {
      type: 'TextualBody',
      value: text.value,
      language: 'en',
      format: 'text/plain'
    },
    target: {
      source
    }
  }
}

function annotations({ manifest, dates: classifications }) {
  const partOf = {
    id: manifest[`@id`],
    type: 'Manifest'
  }
  const dates = classifications.map(classification => {
    const { metadata, annotations, subjectMetadata } = classification
    const canvasIndex = subjectMetadata['#priority'] - 1
    const [ sequence ] = manifest.sequences
    const canvas = sequence.canvases[canvasIndex]
    return transformTextTasks(annotations, canvas, partOf)
  })
  dates.forEach((date, index) => {
    date.id = `https://zooniverse.github.io/iiif-annotations/bldigital/in-the-spotlight/dates/${index}`
  })
  return dates
}

module.exports = {
  eleventyComputed: {
    annotations
  }
}