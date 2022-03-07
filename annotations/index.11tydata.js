function annotations({ manifest, classifications }) {
  const annotations = classifications.map(classification => {
    const { metadata, annotations, subjectMetadata } = classification
    const [ annotation ] = annotations
    
    return { annotation, metadata, subjectMetadata }
  })
  return annotations
}

module.exports = {
  eleventyComputed: {
    annotations: annotations
  }
}