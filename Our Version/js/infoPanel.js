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

    // ******* TODO: PART III *******

    // Update the text elements in the infoBox to reflect:
    // World Cup Title, host, winner, runner_up, and all participating teams that year
    d3.select('#edition').html(d.Game);
    d3.select('#host').html(d.City);
    d3.select('#winner').html(d.MaxMedalCountry);
    d3.select('#silver').html(d.RunnerUpMedalCountry);

    var ul = document.createElement("ul");
    d.teams_names.forEach(function(t) {
      var li = document.createElement("li");
      li.innerHTML = t;
      ul.appendChild(li);
    });
    document.getElementById('teams').innerHTML = '';
    document.getElementById('teams').appendChild(ul);

    // Hint: For the list of teams, you can create an list element for each team.
    // Hint: Select the appropriate ids to update the text content.

    //Set Labels

  }

}
