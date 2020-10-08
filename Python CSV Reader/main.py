import sys
import csv

gamesFile = open("athlete_events.csv")

#
gamesFile.readline()

gamesDict = dict()
for line in gamesFile:
    # 0     1     2   3   4      5      6     7       8       9       10          11      12      13      14
    # id    Name  Sex Age Height Weight Team  NOC     Games   Year    Season      City    sport   event   medal
    modifiedLine = line
    modifiedLine = modifiedLine.strip()

    # one possible issue is that the csv file cell contains a , so I removed them
    lineList = modifiedLine.split(",")
    team = lineList[6]
    noc = lineList[7]
    games = lineList[8]
    year = lineList[9]
    city = lineList[11]
    medal = lineList[14]

    if not(year in gamesDict):
        # the games dict should include
        #0          1       2
        #GameName   Year    CountryDict, holding medal count
        gamesDict[year] = [games, year, dict()]

    curGamesDict = gamesDict.get(year)
    curGamesDictCompleteNOCMedals = curGamesDict[2]
    if not(noc in curGamesDictCompleteNOCMedals):
        curGamesDictCompleteNOCMedals[noc] = 0

    if(medal == "Gold"):
        curGamesDictCompleteNOCMedals[noc] += 1
    curGamesDict[2] = curGamesDictCompleteNOCMedals
    gamesDict[year] = curGamesDict
gamesFile.close()

dictKeysSorted = sorted(gamesDict.keys())

print(len(dictKeysSorted))
with open('output2.csv', mode='w') as outputFile:
    csvOutWriter = csv.writer(outputFile, delimiter=',')
    csvOutWriter.writerow(["Game", "Year",  "NumberOfCountries", "AttendingCountriesNOC", "MaxMedalCountry","MaxMedalCount", "RunnerUpMedalCountry", "RunnerUpMedalCount", "GameCountryNOC"])
    for key in dictKeysSorted:
        curElement = gamesDict[key]
        countryMedalDict = curElement[2]

        maxVal = 0
        maxCountry = ""
        secondaryMaxVal = 0
        secondMaxCountry = ""

        for key in countryMedalDict.keys():
            curVal = countryMedalDict[key]
            if(curVal > maxVal):
                maxVal = curVal
                maxCountry = key
            elif(curVal > secondaryMaxVal):
                secondaryMaxVal = curVal
                secondMaxCountry = key


        # 0          1       2
        # GameName   Year    CountryDict, holding medal count
        keylistOfCountries =  str(sorted(countryMedalDict.keys())).replace("[", "").replace("]","").replace("'","")
        csvOutWriter.writerow([curElement[0], curElement[1], countryMedalDict.keys().__len__(), keylistOfCountries , maxCountry, maxVal, secondMaxCountry, secondaryMaxVal])