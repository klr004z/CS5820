/** Class implementing the infoPanel view. */
class InfoPanel {
  /**
   * Creates a infoPanel Object
   */
  constructor() {
  }

  /**
   * Update the info panel to show info about the currently selected world cup
   * @param oneWorldCup the currently selected world cup
   */
  updateInfo(d) {

    // Update the text elements in the infoBox to reflect: Olympic Games, Host City, Most Gold Medals, Second Most Gold Medals, and Teams
    d3.select('#edition').html(d.Game);
    d3.select('#host').html(d.City);
    console.log(d);
    d3.select('#winner').html(d.MaxMedalCountry);
    d3.select('#winnercount').html(d.MaxMedalCount);
    d3.select('#silver').html(d.RunnerUpMedalCountry);
    d3.select('#silvercount').html(d.RunnerUpMedalCount);
   // d3.select('#teams').html(d.RunnerUpMedalCountry);

    var ul = document.createElement("ul");
    d.teams_names.forEach(function(t) {
      var li = document.createElement("li");
      li.innerHTML = t;
      ul.appendChild(li);
    });
    document.getElementById('teams').innerHTML = '';
    document.getElementById('teams').appendChild(ul);

  }

}
