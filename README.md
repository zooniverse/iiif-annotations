# iiif-annotations
A proof-of-concept, annotating a IIIF manifest with Zooniverse classification data.

Run it locally with
```
npm install
npx eleventy --serve
```

Or browse work in progress at
- https://zooniverse.github.io/iiif-annotations/annotations/dates.json (individual dates entered by volunteers.)
- https://zooniverse.github.io/iiif-annotations/annotations/titles.json (individual titles and rectangles drawn by volunteers.)
- https://zooniverse.github.io/iiif-annotations/annotations/consensusDates.json (consensus dates, one per playbill.)

## Publishing annotations

You will need classifications exports and/or consensus results for subjects that were created from an IIIF manifest (see https://github.com/zooniverse/Panoptes-Front-End/pull/6095.) Currently, only [In The Spotlight](https://frontend.preview.zooniverse.org/projects/bldigital/in-the-spotlight) uses that feature, so the code here is specific to its two workflows.

1. Clone this repo so that you can edit it locally.
2. Edit `_data/config.js` and make sure that the manifest URL points to the correct manifest.
3. Download dates and titles workflow classifications exports from the project builder, strip them of volunteers' personal information and save them to `_data/dates.csv` and`_data/titles.csv`.
4. Run offline aggregation to generate consensus results. Version 2 drawing tools aren't currently supported, but you can aggregate the dates workflow and save the consensus results as `_data/consensusDates.csv`.
5. Commit your changes to the `_data/` directory and push to GitHub.
6. Wait a couple of minutes and your new annotations should have been published as [annotation collections](https://iiif.io/api/presentation/3.0/#58-annotation-collection) at the URLs given above.

## How it works

Builds are run by [Eleventy](https://1ty.dev) and managed by GitHub Actions. Merging a change to the data files in the `_data` directory will build a new collection of JSON files.

`_data` contains the source data files:
- `config.json`: the URL of the source manifest, and the dimensions of the Zooniverse images, which are needed to scale annotations back up to the original canvas.
- `consensusDates.csv`: CSV output from the Caesar text reducer for the Dates workflow.
- `dates.csv`: a workflow classifications export for the Dates workflow, stripped of volunteers' personal data.
- `titles.csv`: a workflow classifications export for the Titles workflow, stripped of volunteers' personal data.

Output templates are in the `annotations` directory:
- `annotations/consensusDates`
  - `index.11ty.js`: publishes an [annotation collection](https://iiif.io/api/presentation/3.0/#58-annotation-collection) at `/annotations/consensusDates.json`
  - `dates.11tydata.js`: parse the CSV text annotations into an array of date annotations, with IDs.
  - `dates.11ty.js`: loops over the default sequence of canvases in the manifest (`manifest.sequences[0].canvases`), printing out a JSON [`AnnotationPage`](https://iiif.io/api/presentation/3.0/#55-annotation-page) with one date annotation item for each canvas.
- `annotations/dates`
  - `index.11ty.js`: publishes an [annotation collection](https://iiif.io/api/presentation/3.0/#58-annotation-collection) at `/annotations/dates.json`
  - `dates.11tydata.js`: parse the CSV classifications into an array of date annotations, with IDs.
  - `dates.11ty.js`: loops over the default sequence of canvases in the manifest (`manifest.sequences[0].canvases`), printing out a JSON [`AnnotationPage`](https://iiif.io/api/presentation/3.0/#55-annotation-page) with date annotation items for each canvas.
- `annotations/titles`
  - `index.11ty.js`: publishes an [annotation collection](https://iiif.io/api/presentation/3.0/#58-annotation-collection) at `/annotations/titles.json`
  - `titles.11tydata.js`: parse the CSV classifications into an array of title annotations, with IDs. Each classification contains multiple drawings, so the final result is flattened into a single array of performance titles.
  - `titles.11ty.js`: loops over the default sequence of canvases in the manifest (`manifest.sequences[0].canvases`), printing out a JSON [`AnnotationPage`](https://iiif.io/api/presentation/3.0/#55-annotation-page) with title annotation items for each canvas.
