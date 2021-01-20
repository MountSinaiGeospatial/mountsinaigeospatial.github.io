const map = L.map('map').setView([42, -90], 4);
      map.scrollWheelZoom.disable();

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      const client = new carto.Client({
        apiKey: 'default_public',
        username: 'nygeog'
      });

      const source = new carto.source.SQL(
        `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_unmet_cc_demand_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'baseline'
          `);
      const style = new carto.style.CartoCSS(`
        #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `);
      const layer = new carto.layer.Layer(source, style);

      client.addLayer(layer);
      client.getLeafletLayer().addTo(map);



      // BASELINE 
      function setBaseline_01() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_unmet_cc_demand_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'baseline'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setBaseline_02() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_add_cc_nurse_need_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'baseline'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setBaseline_03() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_add_cc_physician_need_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'baseline'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
       function setBaseline_04() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.nurse_migration_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'baseline'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setBaseline_05() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_cc_nurse_slack_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'baseline'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setBaseline_06() {
         source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.physician_migration_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'baseline'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setBaseline_07() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_cc_physician_slack_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'baseline'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }

      // MODERATE 
      function setModerate_01() {
        source.setQuery(`
          SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_unmet_cc_demand_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'moderate'
        `);
        style.setContent(`
          #layer {
            polygon-fill: [hex];
            line-color: #d3d3d3;
            line-width: 0.2;
            polygon-opacity: 0.9;
          }
      `)
      }
      function setModerate_02() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_add_cc_nurse_need_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'moderate'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setModerate_03() {
         source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_add_cc_physician_need_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'moderate'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setModerate_04() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.nurse_migration_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'moderate'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setModerate_05() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_cc_nurse_slack_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'moderate'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setModerate_06() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.physician_migration_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'moderate'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setModerate_07() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_cc_physician_slack_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'moderate'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }

      // CONTINGENCY 
      function setContingency_01() {
        source.setQuery(`
          SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_unmet_cc_demand_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'contingency'
        `);
        style.setContent(`
         #layer {
            polygon-fill: [hex];
            line-color: #d3d3d3;
            line-width: 0.2;
            polygon-opacity: 0.8;
        }   
      `)
      }
      function setContingency_02() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_add_cc_nurse_need_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'contingency'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setContingency_03() {
         source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_add_cc_physician_need_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'contingency'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setContingency_04() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.nurse_migration_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'contingency'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setContingency_05() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_cc_nurse_slack_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'contingency'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setContingency_06() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.physician_migration_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'contingency'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setContingency_07() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_cc_physician_slack_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'contingency'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }

      // CRISIS 
      function setCrisis_01() {
        source.setQuery(`
          SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_unmet_cc_demand_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'crisis'
        `);
        style.setContent(`
         #layer {
            polygon-fill: [hex];
            line-color: #d3d3d3;
            line-width: 0.2;
            polygon-opacity: 0.8;
        }   
      `)
      }
      
      function setCrisis_02() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_add_cc_nurse_need_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'crisis'
        `);
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setCrisis_03() {
         source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_add_cc_physician_need_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'crisis'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setCrisis_04() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.nurse_migration_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'crisis'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setCrisis_05() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_cc_nurse_slack_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'crisis'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setCrisis_06() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.physician_migration_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'crisis'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }
      function setCrisis_07() {
        source.setQuery(
          `SELECT 
          c.cartodb_id as cartodb_id, 
          t.the_geom as the_geom, 
          t.the_geom_webmercator as the_geom_webmercator,
          t.geoid as geoid,
          c.geoid as c_geoid,
          c.mobile_cc_physician_slack_map_hex as hex

          FROM covid_staffing AS c
          LEFT JOIN tl_2018_us_county AS t
          ON t.geoid = c.geoid
          WHERE c.name = 'crisis'`
        );
        style.setContent(`
         #layer {
          polygon-fill: [hex];
          line-color: #d3d3d3;
          line-width: 0.2;
          polygon-opacity: 0.9;
        }
      `)
      }