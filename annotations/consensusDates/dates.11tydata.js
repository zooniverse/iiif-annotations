function transformConsensusText(consensus, canvas, partOf) {
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
      value: consensus['data.consensus_text'],
      language: 'en',
      format: 'text/plain'
    },
    target: {
      source
    }
  }
}

function annotations({ manifest, consensusDates, dates: classifications }) {
  const partOf = {
    id: manifest[`@id`],
    type: 'Manifest'
  }
  const dates = consensusDates.map(consensusDate => {
    const subjectID = consensusDate.subject_id
    const { subjectMetadata } = classifications.find(classification => classification.subjectID === subjectID)
    const canvasIndex = subjectMetadata['#priority'] - 1
    const [ sequence ] = manifest.sequences
    const canvas = sequence.canvases[canvasIndex]
    return transformConsensusText(consensusDate, canvas, partOf)
  })
  dates.forEach((date, index) => {
    date.id = `https://zooniverse.github.io/iiif-annotations/bldigital/in-the-spotlight/consensusDates/${index}`
  })
  return dates
}

module.exports = {
  eleventyComputed: {
    annotations
  }
}