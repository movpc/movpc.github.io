import csv
import json
import datetime

# NOTE: this requires a headerless tsv file

#0 Timestamp
#1 Organization Name
#2 Region
#3 Date
#4 Street Address
#5 City
#6 Zipcode
#7 Start Time
#8 End Time
#9 Additional Info
#10 Your Email
#11 Your Phone
#12 Volunteer Contact Email
#13 Volunteer Contact Phone

events = []
with open("event-submissions.tsv") as csvDataFile:
    csvReader = csv.reader(csvDataFile, delimiter="\t", quotechar='"')
    for row in csvReader:

        dateArray = row[3].split('/')
        dt = datetime.date(int(dateArray[2]), int(dateArray[0]), int(dateArray[1]))
        now = datetime.date.today()

        if now > dt:
            # print(dt, now)
            continue

        event = {
            "region": row[2],
            "organization": row[1],
            "time": row[7] + " to " + row[8],
            "details" : row[9]
        }
        # some of the data has full address in street field
        street = row[4]
        event['location'] = street if "MO" in street else "{}, {}, MO {}".format(street, row[5], row[6])

        
        event['date'] = {
            "display": row[3],
            "sort": datetime.datetime.combine(dt, datetime.datetime.min.time()).timestamp()
        }
        # apparently not all rows have this data
        if len(row) == 14:
            event['contactInformation'] = row[12] + " " + row[13]
        elif len(row) == 13:
            event['contactInformation'] = row[12]

        events.append(event)

    eventsObject = { "data": events }
    eventsJson = json.dumps(eventsObject)

    # write to file
    f = open("assets/events.json", "w")
    f.write(eventsJson)
    f.close()