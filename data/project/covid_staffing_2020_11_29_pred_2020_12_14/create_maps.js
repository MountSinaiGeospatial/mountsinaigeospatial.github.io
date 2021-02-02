const map = L.map('map').setView([42, -90], 4);

// add basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png', {
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
    c.county_fips as c_geoid,
    c.mobile_unmet_cc_demand_label as label

  FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
  LEFT JOIN cb_2018_us_county_500k AS t
  ON t.geoid = c.county_fips
  WHERE c.name = 'baseline'
`);

const style = new carto.style.CartoCSS(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      ('Met', 'Unmet'),    
      ('='));
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
  }
`);

const layer = new carto.layer.Layer(source, style);

client.addLayer(layer);
client.getLeafletLayer().addTo(map);

// configure and add category dataview
const categoryDataview = new carto.dataview.Category(source, 'label', {
  limit: 10,
  operation: carto.operation.COUNT
});

client.addDataview(categoryDataview);

// add bbox filter
const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);
categoryDataview.addFilter(bboxFilter);

// add legend elements
const legend = $("#legend");

layer.on('metadataChanged', renderCategoryLegend);

function renderCategoryLegend(metadata){
  console.log(metadata);
  legend.html('<h1>LEGEND</h1>');
  metadata.styles.forEach(function (styleMetadata) {
    if (styleMetadata.getProperty() == 'polygon-fill') {
        let categories = styleMetadata.getCategories();
        console.log(categories)
        

        for (var category of categories){
          legend.append(
            `<div id="legend-content"><li><div class="circle" style="background:${category.value}">
            </div>${category.name}</li></div>`)
      }
    }
  });

}





// SCENARIOS 
function setBaseline_01() {
  source.setQuery(`
  SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.county_fips as c_geoid,
    c.mobile_unmet_cc_demand_label as label

  FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
  LEFT JOIN cb_2018_us_county_500k AS t
  ON t.geoid = c.county_fips
  WHERE c.name = 'baseline'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      ('Met', 'Unmet'),    
      ('='));
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
  }
`);
}
function setModerate_01() {
  source.setQuery(`
  SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.county_fips as c_geoid,
    c.mobile_unmet_cc_demand_label as label

  FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
  LEFT JOIN cb_2018_us_county_500k AS t
  ON t.geoid = c.county_fips
    WHERE c.name = 'moderate' 
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      ('Met', 'Unmet'),    
      ('='));
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
  }
`);
}
function setContingency_01() {
  source.setQuery(`
  SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.county_fips as c_geoid,
    c.mobile_unmet_cc_demand_label as label

  FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
  LEFT JOIN cb_2018_us_county_500k AS t
  ON t.geoid = c.county_fips
    WHERE c.name = 'contingency'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      ('Met', 'Unmet'),    
      ('='));
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
  }
`);
}
function setCrisis_01() {
  source.setQuery(`
  SELECT 
    c.cartodb_id as cartodb_id, 
    t.the_geom as the_geom, 
    t.the_geom_webmercator as the_geom_webmercator,
    t.geoid as geoid,
    c.county_fips as c_geoid,
    c.mobile_unmet_cc_demand_label as label

  FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
  LEFT JOIN cb_2018_us_county_500k AS t
  ON t.geoid = c.county_fips
    WHERE c.name = 'crisis'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      ('Met', 'Unmet'),    
      ('='));
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.mobile_add_cc_nurse_need_label as label

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'baseline'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      ('Met', 'Unmet'),    
      ('='));
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.mobile_add_cc_nurse_need_label as label

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'moderate'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      ('Met', 'Unmet'),    
      ('='));
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.mobile_add_cc_nurse_need_label as label

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'contingency'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      ('Met', 'Unmet'),    
      ('='));
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.mobile_add_cc_nurse_need_label as label

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'crisis'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      ('Met', 'Unmet'),    
      ('='));
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.mobile_add_cc_physician_need_label as label 
   
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'baseline'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      category(2),    
      );
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.mobile_add_cc_physician_need_label as label 
   
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'moderate'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      category(2),    
      );
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.mobile_add_cc_physician_need_label as label 
   
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'contingency'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      category(2),    
      );
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.mobile_add_cc_physician_need_label as label 
   
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'crisis'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#dcdcdc, #ff0000), 
      category(2),    
      );
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.nurse_migration_label as label 

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'baseline' AND c.nurse_migration_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#FF0000, #0000FF), 
      ('Sent', 'Received'),    
      '=');
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.nurse_migration_label as label 

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'moderate' AND c.nurse_migration_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#FF0000, #0000FF), 
      ('Sent', 'Received'),    
      '=');
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.nurse_migration_label as label 

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'contingency' AND c.nurse_migration_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#FF0000, #0000FF), 
      ('Sent', 'Received'),    
      '=');
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.nurse_migration_label as label 

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'crisis' AND c.nurse_migration_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#FF0000, #0000FF), 
      ('Sent', 'Received'),    
      '=');
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.mobile_cc_nurse_slack_label as label 

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'baseline' AND c.mobile_cc_nurse_slack_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [label], 
        (#90ee90, #013220),
        ('1 - 10', '10+'), 
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
      c.county_fips as c_geoid,
      c.mobile_cc_nurse_slack_label as label 
    
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'moderate' AND c.mobile_cc_nurse_slack_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [label], 
        (#90ee90, #013220),
        ('1 - 10', '10+'), 
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
      c.county_fips as c_geoid,
      c.mobile_cc_nurse_slack_label as label 
    
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'contingency' AND c.mobile_cc_nurse_slack_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [label], 
        (#90ee90, #013220),
        ('1 - 10', '10+'), 
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
      c.county_fips as c_geoid,
      c.mobile_cc_nurse_slack_label as label 
    
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'crisis' AND c.mobile_cc_nurse_slack_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [label], 
        (#90ee90, #013220),
        ('1 - 10', '10+'), 
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
      c.county_fips as c_geoid,
      c.physician_migration_label as label 

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'baseline' AND c.physician_migration_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#FF0000, #0000FF), 
      ('Sent', 'Received'),    
      '=');
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.physician_migration_label as label 

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'moderate' AND c.physician_migration_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#FF0000, #0000FF), 
      ('Sent', 'Received'),    
      '=');
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.physician_migration_label as label 

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'contingency' AND c.physician_migration_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#FF0000, #0000FF), 
      ('Sent', 'Received'),    
      '=');
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.physician_migration_label as label 

    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'crisis' AND c.physician_migration_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
    polygon-fill: ramp(
      [label], 
      (#FF0000, #0000FF), 
      ('Sent', 'Received'),    
      '=');
    polygon-opacity: .9;
    line-color: #ffffff;
    line-width: 0.4; 
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
      c.county_fips as c_geoid,
      c.mobile_cc_physician_slack_label as label 
    
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'baseline' AND c.mobile_cc_physician_slack_label <> 'Static'
  `
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [label], 
        (#90ee90, #013220),
        ('1 - 10', '10+'), 
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
      c.county_fips as c_geoid,
      c.mobile_cc_physician_slack_label as label 
    
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'moderate' AND c.mobile_cc_physician_slack_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [label], 
        (#90ee90, #013220),
        ('1 - 10', '10+'), 
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
      c.county_fips as c_geoid,
      c.mobile_cc_physician_slack_label as label 
    
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'contingency' AND c.mobile_cc_physician_slack_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [label], 
        (#90ee90, #013220),
        ('1 - 10', '10+'), 
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
      c.county_fips as c_geoid,
      c.mobile_cc_physician_slack_label as label 
    
    FROM covid_staffing_2020_11_29_pred_2020_12_14 AS c
    LEFT JOIN cb_2018_us_county_500k AS t
    ON t.geoid = c.county_fips
    WHERE c.name = 'crisis' AND c.mobile_cc_physician_slack_label <> 'Static'
`
  );
  style.setContent(`
  #layer {
      polygon-fill: ramp(
        [label], 
        (#90ee90, #013220),
        ('1 - 10', '10+'), 
        '=');
      polygon-opacity: .9;
      line-color: #d3d3d3;
      line-width: 0.1; 
    }
  `);
}