/** Class implementing the map view. */
class Map {
  /**
   * Creates a Map Object
   */
  constructor() {
    this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);

  }

  /**
   * Function that clears the map
   */
  clearMap() {

    // d3 selection and .classed to set these classes on and off here.
    d3.selectAll('.countries')
      .classed('host', false)
      .classed('team', false)
    ;
    d3.select("#points").selectAll("*").remove();
  }

  /**
   * Update Map with info for a specific FIFA World Cup
   * @param wordcupData the data for one specific world cup
   */
  updateMap(data) {

    //Clear any previous selections;
    this.clearMap();

    // Select the host country and change it's color accordingly.

    let teams = '';
    data.teams_iso.forEach(function(t) {
      teams = teams + '#' + t.trim() + ',';
    });
    teams = teams.substring(0, teams.length-1);
    // console.log(teams)
    d3.selectAll(teams)
      .classed('team', true);

    d3.select(`#${data.hostNOC}`)
      .classed('host', true);

    // Add a marker for the host city
    let radius = 5;
    d3.select("#points")
      .append("circle")
      .attr("cx", this.projection(data.host_pos)[0])
      .attr("cy", this.projection(data.host_pos)[1])
      .attr("r", radius)
      .attr("class", "gold")
    ;
  }

  /**
   * Renders the actual map
   * @param the json data with the shape of all countries
   */
  drawMap(world) {


    let path = d3.geoPath()
      .projection(this.projection);

    let graticule = d3.geoGraticule().step([10, 10]);
    d3.select("#map").selectAll("path")
      .data([graticule()])
      .enter()
      .append("path")
      .attr("d", path)
      .attr('class', 'grat')
      .attr('fill', 'none')
    ;

    // console.log(world);
    let geoJSON = topojson.feature(world, world.objects.countries);

    console.log(geoJSON);

    d3.select("#map").selectAll("path")
      .data(geoJSON.features)
      .enter()
      .append("path")
      .attr("id", d => d.id)
      .attr("d", path)
      .attr('class', 'countries')
    ;

  }


}
