module.exports = class DatesPage {
  data() {
    return {
      permalink: '/annotations/dates.json'
    }
  }

  render(ctx) {
    return JSON.stringify(ctx.annotations)
  }
}