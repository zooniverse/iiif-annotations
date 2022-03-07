const fetch = require('node-fetch')

const MANIFEST_URL = 'https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589176.0x000002/manifest.json'

async function readManifest(url) {
  if (url) {
    const response = await fetch(url)
    if (!response.ok) {
      const error = new Error(response.statusText)
      error.status = response.status
      throw error
    }
    const body = await response.json()
    return body
  }
  return null
}

module.exports = readManifest(MANIFEST_URL)