const { parse } = require("csv-parse/sync")

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("csv", (contents) => {
    const records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
    })
    const classifications = records.map(({ metadata, annotations, subject_data }) => {
      const [ subjectArray ] = Object.entries(JSON.parse(subject_data))
      const [ subjectID, subjectMetadata ] = subjectArray
      return {
        metadata: JSON.parse(metadata),
        annotations: JSON.parse(annotations),
        subjectID,
        subjectMetadata
      }
    })
    .filter(classification => classification.metadata.classifier_version === '2.0')
    console.log('read', classifications.length, 'classifications')
    return classifications
  });
}