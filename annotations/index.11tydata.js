const MAX_SUBJECT_HEIGHT = 2000
const MAX_SUBJECT_WIDTH = 1400

function transformRectangles(annotations, canvas) {
  const scale = Math.max((canvas.height / MAX_SUBJECT_HEIGHT), (canvas.width / MAX_SUBJECT_WIDTH))
  const drawing = annotations.find(annotation => annotation.task === 'T0')
  const rectangles = drawing.value
  return rectangles.map((rectangle, index) => {
    const { x_center, y_center, width, height } = rectangle
    const textAnnotation = annotations.find(annotation => annotation.markIndex === index)
    const label = textAnnotation.value
    const x = x_center - (width / 2)
    const y = y_center - (height / 2)
    return {
      canvas: canvas['@id'],
      x: x * scale,
      y: y * scale,
      width: width * scale,
      height: height * scale,
      label
    }
  })
}

function annotations({ manifest, classifications }) {
  return classifications.map(classification => {
    const { metadata, annotations, subjectMetadata } = classification
    const canvasIndex = subjectMetadata['#priority'] - 1
    const [ sequence ] = manifest.sequences
    const canvas = sequence.canvases[canvasIndex]
    return {
      annotation: transformRectangles(annotations, canvas),
      canvas,
      subjectMetadata
    }
  })
}

module.exports = {
  eleventyComputed: {
    annotations: annotations
  }
}