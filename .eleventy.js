const { parse } = require("csv-parse/sync")

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("csv", (contents) => {
    const records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
    })
    const classifications = records.map(({ metadata, annotations, subject_data }) => ({
      metadata: JSON.parse(metadata),
      annotations: JSON.parse(annotations),
      subjectMetadata: JSON.parse(subject_data)
    }))
    .filter(classification => classification.metadata.classifier_version === '2.0')
    console.log('read', classifications.length, 'classifications')
    return classifications
  });
}