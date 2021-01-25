// add Leaflet map to map container
const map = L.map('map').setView([30, 0], 3);

// add basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// declare CARTO client
const client = new carto.Client({
  apiKey: 'default_public',
  username: 'cartojs-test'
});

// configure and add layer
const source = new carto.source.Dataset(`
  ne_10m_populated_places_simple
`);

const style = new carto.style.CartoCSS(`
  #layer {
    marker-width: 4;
    marker-fill: ramp([featurecla], cartocolor(Bold), category);
    marker-opacity: 0.7;
    marker-line-color: ramp([featurecla], cartocolor(Bold), category);
    marker-line-opacity: 0.9;
  }
`);

const layer = new carto.layer.Layer(source, style);

client.addLayer(layer);
client.getLeafletLayer().addTo(map);

// configure and add category dataview
const categoryDataview = new carto.dataview.Category(source, 'featurecla', {
  limit: 5,
  operation: carto.operation.COUNT
});

client.addDataview(categoryDataview);

// add bbox filter
const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);
categoryDataview.addFilter(bboxFilter);

// add legend elements
const legend = $("#legend-content");

layer.on('metadataChanged', renderCategoryLegend);

function renderCategoryLegend(metadata){
  console.log(metadata);
  metadata.styles.forEach(function (styleMetadata) {
    if (styleMetadata.getProperty() == 'marker-fill') {
        let categories = styleMetadata.getCategories();
        console.log(categories)
        for (category of categories){
          legend.append(`<li><div class="circle" style="background:${category.value}"></div> ${category.name}</li>`)
      }
    }
  });
}