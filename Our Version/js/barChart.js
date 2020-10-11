/** Class implementing the bar chart view. */
class BarChart {

  /**
   * Create a bar chart instance and pass the other views in.
   * @param worldMap
   * @param infoPanel
   * @param allData
   */
  constructor(worldMap, infoPanel, allData) {
    this.worldMap = worldMap;
    this.infoPanel = infoPanel;
    this.allData = allData;
    this.selectedElement = null;
    this.selectedDatum = null;
  }

  /**
   * Render and update the bar chart based on the selection of the data type in the drop-down box
   */
  updateBarChart(selectedDimension) {
    // ******* TODO: PART I *******
   // console.log(selectedDimension);

    let min = d3.min(this.allData, d => d[selectedDimension]);
    
    // Changed this because the max was only at 90 for the bar chart.
    let max = d3.max(this.allData, d => d[selectedDimension]);

    
    let width = 550;
    let minYear = d3.min(this.allData, d => d.year);
    let maxYear = d3.max(this.allData, d => d.year);
    let xvals = (maxYear-minYear)/4+1;
    let years = [];
    this.allData.forEach(function(d) {
      years.push(d.year.toString());
    });

    let height = 500;

    // Create the x and y scales; make
    // sure to leave room for the axes
    let xScale = d3.scaleBand()
      .domain(years)
      .range([0, width])
      .padding(0.25)
    ;
    
    let yScale = d3.scaleLinear()
      .domain([0, max])
      .range([height, 0]);
    
    // Create colorScale
    let colorScale = d3.scaleLinear()
      .domain([min, max])
      .range(["darkgray", "steelblue"]);

    let yaxisWidth = 60;

    // Create the axes (hint: use #xAxis and #yAxis)
    let xAxis = d3.axisBottom(xScale);
    d3.select('#xAxis')
      .attr("transform", `translate(${yaxisWidth}, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(90)")
      .attr("x", 9)
      .attr("dy", "-.35em")
      .style("text-anchor", "start")
      
    ;

    let yAxis = d3.axisLeft(yScale);
    d3.select('#yAxis')
      .attr("transform", `translate(${yaxisWidth}, 0)`)
      .call(yAxis)
      .selectAll("text")
    ;

    // Create the bars (hint: use #bars)
    let bars = d3.select('#bars').selectAll('rect')
      .data(this.allData).enter().append('rect')
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('x', (d,i) => yaxisWidth+xScale(d.year))
      .attr('height', 0)
    ;

    d3.select('#bars').selectAll('rect')
      .transition()
      .attr('y', (d,i) => yScale(d[selectedDimension]))
      .attr('height', (d,i) => height-yScale(d[selectedDimension]))
      .attr('fill', (d,i) => colorScale(d[selectedDimension]))
    ;


    // ******* TODO: PART II *******

    let bc = this;

    // Implement how the bars respond to click events
    // Color the selected bar to indicate is has been selected.
    // Make sure only the selected bar has this new color.
    d3.select('#bars').selectAll('rect')
      .on('click', function(d, i) {
        if (bc.selectedElement != null) {
          bc.selectedElement.attr(
            'fill', colorScale(bc.selectedDatum[selectedDimension]));
        }
        bc.selectedElement = d3.select(this);
        bc.selectedDatum = d;
        bc.selectedElement.attr('fill', 'red');

        bc.infoPanel.updateInfo(d);
        bc.worldMap.updateMap(d);
      })
    ;

    // Call the necessary update functions for when a user clicks on a bar.
    // Note: think about what you want to update when a different bar is selected.

  }

  /**
   *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
   *
   *  There are 4 attributes that can be selected:
   *  goals, matches, attendance and teams.
   */
  chooseData() {
    // ******* TODO: PART I *******
    //Changed the selected data when a user selects a different
    // menu item from the drop down.
    this.updateBarChart(document.getElementById('dataset').value);
  }
}
