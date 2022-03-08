const MAX_SUBJECT_HEIGHT = 2000
const MAX_SUBJECT_WIDTH = 1400

function scaledRectangle(rectangle, canvas) {
  const scale = Math.max((canvas.height / MAX_SUBJECT_HEIGHT), (canvas.width / MAX_SUBJECT_WIDTH))
  const { x_center, y_center, width, height } = rectangle
  const x = parseInt((x_center - (width / 2)) * scale, 10)
  const y = parseInt((y_center - (height / 2)) * scale, 10)
  const w = parseInt(width * scale, 10)
  const h = parseInt(height * scale, 10)
  return { x, y, w, h }
}
function transformRectangles(annotations, canvas) {
  const drawing = annotations.find(annotation => annotation.task === 'T0')
  const rectangles = drawing.value
  return rectangles.map((rectangle, index) => {
    const { x, y, w, h } = scaledRectangle(rectangle, canvas)
    const textAnnotation = annotations.find(annotation => annotation.markIndex === index)
    const label = textAnnotation.value
    return {
      type: 'Annotation',
      motivation: 'tagging',
      body: {
        type: 'TextualBody',
        value: label,
        language: 'en',
        format: 'text/plain'
      },
      target: `${canvas['@id']}#xywh=${x},${y},${w},${h}`
    }
  })
}

function annotations({ manifest, titles }) {
  return titles.map(classification => {
    const { metadata, annotations, subjectMetadata } = classification
    const canvasIndex = subjectMetadata['#priority'] - 1
    const [ sequence ] = manifest.sequences
    const canvas = sequence.canvases[canvasIndex]
    return transformRectangles(annotations, canvas)
  }).flat()
}

module.exports = {
  eleventyComputed: {
    annotations: annotations
  }
}