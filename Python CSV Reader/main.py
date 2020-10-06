import sys

gamesFile = open("athlete_events.csv")

#
gamesFile.readline()

gamesDict = dict()
for line in gamesFile:
    # 0     1     2   3   4      5      6     7       8       9       10          11      12      13      14
    # id    Name  Sex Age Height Weight Team  NOC     Games   Year    Season      City    sport   event   medal
    modifiedLine = line
    modifiedLine = modifiedLine.strip()

    lineList = modifiedLine.split(",")
    team = lineList[6]
    noc = lineList[7]
    games = lineList[8]
    city = lineList[11]
    medal = lineList[14]

    print(team + " " + games)
gamesFile.close()