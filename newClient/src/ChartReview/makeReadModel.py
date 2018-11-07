import pyexcel
import json
from collections import defaultdict

Customers = ['CHI', 'Piedmont']
ReadModel = {}

for Customer in Customers:

    ReadModel[Customer] = {
        'diagnosisCategorySelectOptions': [],
        'groups': {},
    }

    Sheets = pyexcel.get_book_dict(file_name='%s.xlsx' % (Customer))

    # Get the union of the groups from all sheets
    Groups = []
    NamesOfSheetsWithGroups = ['Hospitals', 'Conditions', 'Providers']
    for Name in NamesOfSheetsWithGroups:
        for Row in Sheets[Name][1::]:
            if Name == 'Providers':
                Group = Row[6]
            else: Group = Row[1]
            Groups.append(Group)
    GroupsSet = set(Groups)
    Groups = list(GroupsSet)

    # Make the groups node of ReadModel
    for Group in Groups:
        if not Group in ReadModel[Customer]['groups'] and Group != '':
            ReadModel[Customer]['groups'][Group] = {}
        if not 'selectOptions' in ReadModel[Customer]['groups'][Group]:
            ReadModel[Customer]['groups'][Group]['selectOptions'] = {
                'conditions': [],
                'hospitals': [],
                'providers': []
            }

    #print(json.dumps(ReadModel, indent=4 ))

    for Hospital in Sheets['Hospitals'][1::]: # for every row in the sheet
        group = Hospital[1] 
        ReadModel[Customer]['groups'][group]['selectOptions']['hospitals'].append(Hospital[0])

    for Condition in Sheets['Conditions'][1::]: 
        group = Condition[1] 
        ReadModel[Customer]['groups'][group]['selectOptions']['conditions'].append(Condition[0])

    for Provider in Sheets['Providers'][1::]: 
        group = Provider[6] 
        ReadModel[Customer]['groups'][group]['selectOptions']['providers'].append(Provider[7])

    for diagnosisType in Sheets['DiagnosisTypes'][1::]:
        ReadModel[Customer]['diagnosisCategorySelectOptions'].append(diagnosisType[0])

    with open("readmodel.js", "w") as outfile:
        outfile.write("export const readModel = ")
        json.dump(ReadModel, outfile, indent=4, sort_keys=True)