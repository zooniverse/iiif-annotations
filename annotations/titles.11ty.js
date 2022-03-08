module.exports = class TitlesPage {
  data() {
    return {
      permalink: '/annotations/titles.json'
    }
  }

  render(ctx) {
    return JSON.stringify(ctx.annotations)
  }
}