const { parse } = require("csv-parse/sync")

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("csv", (contents) => {
    const records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
    })
    const classifications = records.map(({ annotations, subject_data }) => ({
      annotations: JSON.parse(annotations),
      subjectMetadata: JSON.parse(subject_data)
    }))
    console.log('read', classifications.length, 'classifications')
    return classifications
  });
}