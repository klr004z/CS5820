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
  
   // console.log(selectedDimension);

    let min = d3.min(this.allData, d => d[selectedDimension]);
    let max = d3.max(this.allData, d => d[selectedDimension]);


    let width = 1100;
    let minYear = d3.min(this.allData, d => d.year);
    let maxYear = d3.max(this.allData, d => d.year);
    let xvals = (maxYear-minYear)/4+1;
    let years = [];
    this.allData.forEach(function(d) {
      years.push(d.year.toString());
    });

    let height = 500;

    // Create the x and y scales; make sure to leave room for the axes
    let xScale = d3.scaleBand()
      .domain(years)
      .range([0, width])
      .padding(0.25)
    ;

    let yScale = d3.scaleLinear()
      .domain([0, max])
      .range([height, 0]);

    // Create colorScale -- we used the same color for min and max for consistency
    let colorScale = d3.scaleLinear()
      .domain([min, max])
      .range(["#0085c7", "#0085c7"]);

    let yaxisWidth = 60;

    // Create the axes 
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

    // Create the bars
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

    let bc = this;

    // Implement how the bars respond to click events
    // Color the selected bar olympic yellow to indicate is has been selected.
    d3.select('#bars').selectAll('rect')
      .on('click', function(d, i) {
        if (bc.selectedElement != null) {
          bc.selectedElement.attr(
            'fill', colorScale(bc.selectedDatum[selectedDimension]));
        }
        bc.selectedElement = d3.select(this);
        bc.selectedDatum = d;
        bc.selectedElement.attr('fill', ' #DF0042');

        bc.worldMap.updateMap(d);
        bc.infoPanel.updateInfo(d);
      })
    ;

  }

  /**
   *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
   *  There are 4 attributes that can be selected: Total Countries, Gold Medals, and Silver Medals.
   */
  chooseData() {
   
    //Changed the selected data when a user selects a different menu item from the drop down.
    
    this.updateBarChart(document.getElementById('dataset').value);
  }
}
