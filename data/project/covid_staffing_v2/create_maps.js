const map = L.map('map').setView([42, -90], 4);

// add basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// declare CARTO client
const client = new carto.Client({
        apiKey: 'default_public',
        username: 'nygeog'
      });

// configure and add layer
const source = new carto.source.SQL(`
  SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_unmet_cc_demand_map_hex as hex,
    c.mobile_unmet_cc_demand_map_bucket as map_bucket,
    c.mobile_unmet_cc_demand as map_value,
    c.mobile_unmet_cc_demand_range as map_range

  FROM covid_staffing AS c
  LEFT JOIN tl_2018_us_county AS t
  ON t.geoid = c.geoid
  WHERE c.name = 'baseline'
`);

const style = new carto.style.CartoCSS(`
  #layer {
    polygon-fill: ramp(
      [map_range], 
      (#fff5f0, #fedbcb, #fcaf94, #fc8161, #f44f39, #d52221, #aa1016, #67000d), 
      ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'),    
      '=');
    polygon-opacity: .9;
    line-color: #d3d3d3;
    line-width: 0.1; 
  }
`);

const layer = new carto.layer.Layer(source, style);

client.addLayer(layer);
client.getLeafletLayer().addTo(map);

// configure and add category dataview
const categoryDataview = new carto.dataview.Category(source, 'map_range', {
  limit: 10,
  operation: carto.operation.COUNT
});

client.addDataview(categoryDataview);

// // add bbox filter
// const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);
// categoryDataview.addFilter(bboxFilter);

// add legend elements
const legend = $("#legend-content");

layer.on('metadataChanged', renderCategoryLegend);

function renderCategoryLegend(metadata){
  console.log(metadata);
  legend.html('');
  metadata.styles.forEach(function (styleMetadata) {
    if (styleMetadata.getProperty() == 'polygon-fill') {
        let categories = styleMetadata.getCategories();
        console.log(categories)
        
        for (var category of categories){
          legend.append(`<li><div class="circle" style="background:${category.value}"></div> ${category.name}</li>`)
      }
    }
  });
}





// SCENARIOS 
function setBaseline_01() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_unmet_cc_demand_map_hex as hex,
    c.mobile_unmet_cc_demand_map_bucket as map_bucket,
    c.mobile_unmet_cc_demand as map_value,
    c.mobile_unmet_cc_demand_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'baseline'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5f0, #fedbcb, #fcaf94, #fc8161, #f44f39, #d52221, #aa1016, #67000d), 
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setModerate_01() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_unmet_cc_demand_map_hex as hex,
    c.mobile_unmet_cc_demand_map_bucket as map_bucket,
    c.mobile_unmet_cc_demand as map_value,
    c.mobile_unmet_cc_demand_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'moderate'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5f0, #fedbcb, #fcaf94, #fc8161, #f44f39, #d52221, #aa1016, #67000d), 
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setContingency_01() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_unmet_cc_demand_map_hex as hex,
    c.mobile_unmet_cc_demand_map_bucket as map_bucket,
    c.mobile_unmet_cc_demand as map_value,
    c.mobile_unmet_cc_demand_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'contingency'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5f0, #fedbcb, #fcaf94, #fc8161, #f44f39, #d52221, #aa1016, #67000d), 
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setCrisis_01() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_unmet_cc_demand_map_hex as hex,
    c.mobile_unmet_cc_demand_map_bucket as map_bucket,
    c.mobile_unmet_cc_demand as map_value,
    c.mobile_unmet_cc_demand_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'crisis'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5f0, #fedbcb, #fcaf94, #fc8161, #f44f39, #d52221, #aa1016, #67000d), 
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}





function setBaseline_02() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_add_cc_nurse_need_map_hex as hex,
    c.mobile_add_cc_nurse_need_map_bucket as map_bucket,
    c.mobile_add_cc_nurse_need as map_value,
    c.mobile_add_cc_nurse_need_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'baseline'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fcfbfd, #eceaf4, #d1d2e7, #afaed3, #8d89c0, #705eaa, #572d92, #3f007d), 
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
    }
  `);
}
function setModerate_02() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_add_cc_nurse_need_map_hex as hex,
    c.mobile_add_cc_nurse_need_map_bucket as map_bucket,
    c.mobile_add_cc_nurse_need as map_value,
    c.mobile_add_cc_nurse_need_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'moderate'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fcfbfd, #eceaf4, #d1d2e7, #afaed3, #8d89c0, #705eaa, #572d92, #3f007d), 
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setContingency_02() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_add_cc_nurse_need_map_hex as hex,
    c.mobile_add_cc_nurse_need_map_bucket as map_bucket,
    c.mobile_add_cc_nurse_need as map_value,
    c.mobile_add_cc_nurse_need_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'contingency'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fcfbfd, #eceaf4, #d1d2e7, #afaed3, #8d89c0, #705eaa, #572d92, #3f007d), 
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setCrisis_02() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_add_cc_nurse_need_map_hex as hex,
    c.mobile_add_cc_nurse_need_map_bucket as map_bucket,
    c.mobile_add_cc_nurse_need as map_value,
    c.mobile_add_cc_nurse_need_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'crisis'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fcfbfd, #eceaf4, #d1d2e7, #afaed3, #8d89c0, #705eaa, #572d92, #3f007d), 
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}




function setBaseline_03() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_add_cc_physician_need_map_hex as hex,
    c.mobile_add_cc_physician_need_map_bucket as map_bucket,
    c.mobile_add_cc_physician_need as map_value,
    c.mobile_add_cc_physician_need_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'baseline'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5eb, #fee3c8, #fdc692, #fda057, #f67825, #e05106, #ad3903, #7f2704),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setModerate_03() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_add_cc_physician_need_map_hex as hex,
    c.mobile_add_cc_physician_need_map_bucket as map_bucket,
    c.mobile_add_cc_physician_need as map_value,
    c.mobile_add_cc_physician_need_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'moderate'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5eb, #fee3c8, #fdc692, #fda057, #f67825, #e05106, #ad3903, #7f2704),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setContingency_03() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_add_cc_physician_need_map_hex as hex,
    c.mobile_add_cc_physician_need_map_bucket as map_bucket,
    c.mobile_add_cc_physician_need as map_value,
    c.mobile_add_cc_physician_need_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'contingency'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5eb, #fee3c8, #fdc692, #fda057, #f67825, #e05106, #ad3903, #7f2704),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setCrisis_03() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_add_cc_physician_need_map_hex as hex,
    c.mobile_add_cc_physician_need_map_bucket as map_bucket,
    c.mobile_add_cc_physician_need as map_value,
    c.mobile_add_cc_physician_need_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'crisis'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5eb, #fee3c8, #fdc692, #fda057, #f67825, #e05106, #ad3903, #7f2704),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 500'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}





function setBaseline_04() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.nurse_migration_map_hex as hex,
    c.nurse_migration_map_bucket as map_bucket,
    c.nurse_migration as map_value,
    c.nurse_migration_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'baseline'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#67001f, #a51429, #ca4842, #e58267, #f7b799, #fce0cf, #f7f7f7, #d7e8f1, #a7d0e4, #6bacd1, #3884bb, #1c5da0, #053061)
        ('-246.0 - -20', '-20 - -10', '-10 - -5', '-5 - -1', '-1 - -0.5', '-0.5 - -0.1', '-0.1 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 67.2'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setModerate_04() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.nurse_migration_map_hex as hex,
    c.nurse_migration_map_bucket as map_bucket,
    c.nurse_migration as map_value,
    c.nurse_migration_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'moderate'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#67001f, #a51429, #ca4842, #e58267, #f7b799, #fce0cf, #f7f7f7, #d7e8f1, #a7d0e4, #6bacd1, #3884bb, #1c5da0, #053061)
        ('-246.0 - -20', '-20 - -10', '-10 - -5', '-5 - -1', '-1 - -0.5', '-0.5 - -0.1', '-0.1 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 67.2'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setContingency_04() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.nurse_migration_map_hex as hex,
    c.nurse_migration_map_bucket as map_bucket,
    c.nurse_migration as map_value,
    c.nurse_migration_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'contingency'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#67001f, #a51429, #ca4842, #e58267, #f7b799, #fce0cf, #f7f7f7, #d7e8f1, #a7d0e4, #6bacd1, #3884bb, #1c5da0, #053061)
        ('-246.0 - -20', '-20 - -10', '-10 - -5', '-5 - -1', '-1 - -0.5', '-0.5 - -0.1', '-0.1 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 67.2'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setCrisis_04() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.nurse_migration_map_hex as hex,
    c.nurse_migration_map_bucket as map_bucket,
    c.nurse_migration as map_value,
    c.nurse_migration_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'crisis'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#67001f, #a51429, #ca4842, #e58267, #f7b799, #fce0cf, #f7f7f7, #d7e8f1, #a7d0e4, #6bacd1, #3884bb, #1c5da0, #053061)
        ('-246.0 - -20', '-20 - -10', '-10 - -5', '-5 - -1', '-1 - -0.5', '-0.5 - -0.1', '-0.1 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 67.2'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}





function setBaseline_05() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_cc_nurse_slack_map_hex as hex,
    c.mobile_cc_nurse_slack_map_bucket as map_bucket,
    c.mobile_cc_nurse_slack as map_value,
    c.mobile_cc_nurse_slack_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'baseline'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fcfbfd, #f0eff6, #dfdeed, #c6c7e1, #abaad1, #918dc2, #796eb2, #65489f, #52238d, #3f007d),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 100', '100 - 1000', '1000 - 4000'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setModerate_05() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_cc_nurse_slack_map_hex as hex,
    c.mobile_cc_nurse_slack_map_bucket as map_bucket,
    c.mobile_cc_nurse_slack as map_value,
    c.mobile_cc_nurse_slack_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'moderate'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fcfbfd, #f0eff6, #dfdeed, #c6c7e1, #abaad1, #918dc2, #796eb2, #65489f, #52238d, #3f007d),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 100', '100 - 1000', '1000 - 4000'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setContingency_05() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_cc_nurse_slack_map_hex as hex,
    c.mobile_cc_nurse_slack_map_bucket as map_bucket,
    c.mobile_cc_nurse_slack as map_value,
    c.mobile_cc_nurse_slack_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'contingency'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fcfbfd, #f0eff6, #dfdeed, #c6c7e1, #abaad1, #918dc2, #796eb2, #65489f, #52238d, #3f007d),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 100', '100 - 1000', '1000 - 4000'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setCrisis_05() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_cc_nurse_slack_map_hex as hex,
    c.mobile_cc_nurse_slack_map_bucket as map_bucket,
    c.mobile_cc_nurse_slack as map_value,
    c.mobile_cc_nurse_slack_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'crisis'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fcfbfd, #f0eff6, #dfdeed, #c6c7e1, #abaad1, #918dc2, #796eb2, #65489f, #52238d, #3f007d),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 100', '100 - 1000', '1000 - 4000'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}





function setBaseline_06() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.physician_migration_map_hex as hex,
    c.physician_migration_map_bucket as map_bucket,
    c.physician_migration as map_value,
    c.physician_migration_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'baseline'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#67001f, #b2182b, #d6604d, #f4a582, #fddbc7, #f7f7f7, #d1e5f0, #92c5de, #4393c3, #2166ac, #053061),
        ('-33.3 - -10', '-10 - -5', '-5 - -1', '-1 - -0.5', '-0.5 - -0.1', '-0.1 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 14.4'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setModerate_06() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.physician_migration_map_hex as hex,
    c.physician_migration_map_bucket as map_bucket,
    c.physician_migration as map_value,
    c.physician_migration_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'moderate'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#67001f, #b2182b, #d6604d, #f4a582, #fddbc7, #f7f7f7, #d1e5f0, #92c5de, #4393c3, #2166ac, #053061),
        ('-33.3 - -10', '-10 - -5', '-5 - -1', '-1 - -0.5', '-0.5 - -0.1', '-0.1 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 14.4'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setContingency_06() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.physician_migration_map_hex as hex,
    c.physician_migration_map_bucket as map_bucket,
    c.physician_migration as map_value,
    c.physician_migration_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'contingency'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#67001f, #b2182b, #d6604d, #f4a582, #fddbc7, #f7f7f7, #d1e5f0, #92c5de, #4393c3, #2166ac, #053061),
        ('-33.3 - -10', '-10 - -5', '-5 - -1', '-1 - -0.5', '-0.5 - -0.1', '-0.1 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 14.4'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setCrisis_06() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.physician_migration_map_hex as hex,
    c.physician_migration_map_bucket as map_bucket,
    c.physician_migration as map_value,
    c.physician_migration_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'crisis'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#67001f, #b2182b, #d6604d, #f4a582, #fddbc7, #f7f7f7, #d1e5f0, #92c5de, #4393c3, #2166ac, #053061),
        ('-33.3 - -10', '-10 - -5', '-5 - -1', '-1 - -0.5', '-0.5 - -0.1', '-0.1 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 14.4'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}





function setBaseline_07() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_cc_physician_slack_map_hex as hex,
    c.mobile_cc_physician_slack_map_bucket as map_bucket,
    c.mobile_cc_physician_slack as map_value,
    c.mobile_cc_physician_slack_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'baseline'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5eb, #fee8d1, #fdd5ac, #fdb97d, #fd9c51, #f87d2a, #e95e0d, #ce4401, #a23403, #7f2704),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 100', '100 - 1000', '1000 - 4000'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setModerate_07() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_cc_physician_slack_map_hex as hex,
    c.mobile_cc_physician_slack_map_bucket as map_bucket,
    c.mobile_cc_physician_slack as map_value,
    c.mobile_cc_physician_slack_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'moderate'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5eb, #fee8d1, #fdd5ac, #fdb97d, #fd9c51, #f87d2a, #e95e0d, #ce4401, #a23403, #7f2704),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 100', '100 - 1000', '1000 - 4000'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setContingency_07() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_cc_physician_slack_map_hex as hex,
    c.mobile_cc_physician_slack_map_bucket as map_bucket,
    c.mobile_cc_physician_slack as map_value,
    c.mobile_cc_physician_slack_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'contingency'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5eb, #fee8d1, #fdd5ac, #fdb97d, #fd9c51, #f87d2a, #e95e0d, #ce4401, #a23403, #7f2704),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 100', '100 - 1000', '1000 - 4000'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}
function setCrisis_07() {
  source.setQuery(
    `SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.geoid as c_geoid,
    c.mobile_cc_physician_slack_map_hex as hex,
    c.mobile_cc_physician_slack_map_bucket as map_bucket,
    c.mobile_cc_physician_slack as map_value,
    c.mobile_cc_physician_slack_range as map_range

    FROM covid_staffing AS c
    LEFT JOIN tl_2018_us_county AS t
    ON t.geoid = c.geoid
    WHERE c.name = 'crisis'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [map_range], 
        (#fff5eb, #fee8d1, #fdd5ac, #fdb97d, #fd9c51, #f87d2a, #e95e0d, #ce4401, #a23403, #7f2704),
        ('0 - 0.1', '0.1 - 0.5', '0.5 - 1', '1 - 5', '5 - 10', '10 - 20', '20 - 50', '50 - 100', '100 - 1000', '1000 - 4000'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}