function annotations({ manifest, classifications }) {
  return classifications.map(classification => {
    const { metadata, annotations, subjectMetadata } = classification
    const canvasIndex = subjectMetadata['#priority'] - 1
    const [ sequence ] = manifest.sequences
    const canvas = sequence.canvases[canvasIndex]
    return { annotations, canvas, subjectMetadata }
  })
}

module.exports = {
  eleventyComputed: {
    annotations: annotations
  }
}