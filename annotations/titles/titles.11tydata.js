function scaledRectangle(rectangle, canvas, { imageHeight, imageWidth }) {
  const scale = Math.max((canvas.height / imageHeight), (canvas.width / imageWidth))
  const { x_center, y_center, width, height } = rectangle
  const x = parseInt((x_center - (width / 2)) * scale, 10)
  const y = parseInt((y_center - (height / 2)) * scale, 10)
  const w = parseInt(width * scale, 10)
  const h = parseInt(height * scale, 10)
  return { x, y, w, h }
}
function transformRectangles(annotations, canvas, config, partOf) {
  const drawing = annotations.find(annotation => annotation.task === 'T0')
  const rectangles = drawing.value
  const source = {
    id: canvas['@id'],
    type: 'Canvas',
    partOf
  }
  return rectangles.map((rectangle, index) => {
    const { x, y, w, h } = scaledRectangle(rectangle, canvas, config)
    const selector = {
      type: 'FragmentSelector',
      conformsTo: 'http://www.w3.org/TR/media-frags/',
      value: `xywh=${x},${y},${w},${h}`
    }
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
      target: {
        type: 'SpecificResource',
        source,
        selector
      }
    }
  })
}

function annotations({ config, manifest, titles: classifications }) {
  const partOf = {
    id: manifest[`@id`],
    type: 'Manifest'
  }
  const titles = classifications.map(classification => {
    const { metadata, annotations, subjectMetadata } = classification
    const canvasIndex = subjectMetadata['#priority'] - 1
    const [ sequence ] = manifest.sequences
    const canvas = sequence.canvases[canvasIndex]
    return transformRectangles(annotations, canvas, config, partOf)
  }).flat()
  titles.forEach((title, index) => {
    title.id = `https://zooniverse.github.io/iiif-annotations/bldigital/in-the-spotlight/titles/${index}`
  })
  return titles
}

module.exports = {
  eleventyComputed: {
    annotations
  }
}