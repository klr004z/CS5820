
// Load CSV file
d3.csv("data/TheOlympicData.csv", function (d) {
  // Convert numeric values to 'numbers'
  d.year = +d.Year;
  d.teams = d.AttendingCountriesNOC.split(" ").length;
  d.maxMedalCountry = d.MaxMedalCountry;
  d.maxMedalCount = d.MaxMedalCount;
  d.runnerUpMedalCountry = d.RunnerUpMedalCountry;
  d.runnerUpMedalCount = d.RunnerUpMedalCount;

 
  // Lat and Lons of gold and silver medals teams
  d.hostNOC = d.GameCountryNOC;
  d.hostCity = d.City;
  d.host_pos = [+d.CityLon, +d.Citylat];

  //Break up lists into javascript arrays
 // d.teams_iso = d3.csvParse(d.AttendingCountriesNOC).columns;
 // d.teams_names = d3.csvParse(d.AttendingCountriesNOC).columns;

  //console.log(d)
  return d;
}).then(function(allData) {

  allData = allData;

  /* Create infoPanel, barChart and Map objects  */
  let infoPanel = new InfoPanel();
  let worldMap = new Map();

  /* DATA LOADING */
  //Load in json data to make map
  d3.json("data/world.json")
    .then(function(world) {
      worldMap.drawMap(world);
    });
  // let world = d3.json("data/world.json");
  // console.log(world);
  // worldMap.drawMap(world);

  // Define this as a global variable
  window.barChart = new BarChart(worldMap, infoPanel, allData);

  // Draw the Bar chart for the first time to show the number of attending counties
  barChart.updateBarChart('teams');
});

/**
 *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
 *
 *  There are 2 attributes that can be selected:
 *  attendance and countries.
 */
function chooseData() {
  // ******* TODO: PART I *******
  // Changed the selected data when a user selects a different
  // menu item from the drop down.
  barChart.chooseData();
  

}
