import pyexcel
import json
from collections import defaultdict

Sheets = pyexcel.get_book_dict(file_name="CHI.xlsx")

ReadModel = {
    'Hospitals': [],
    'Providers': [],
    'DiagnosisTypes': [], 
    'ConditionsByGroup': {}
}

for Hospital in Sheets['Hospitals'][1::]:
    ReadModel['Hospitals'].append(Hospital[0])

for Provider in Sheets['Providers'][1::]:
    if Provider[7]:  
        ReadModel['Providers'].append(
        {
            "npi": Provider[5],
            "reportingName": Provider[7] 
        }
        )

for Condition in Sheets['Conditions'][1::]: 
    if not Condition[1] in ReadModel['ConditionsByGroup']: 
        ReadModel['ConditionsByGroup'][Condition[1]] = []
    ReadModel['ConditionsByGroup'][Condition[1]].append(Condition[0])   

for DiagnosisType in Sheets['DiagnosisTypes'][1::]:
    ReadModel['DiagnosisTypes'].append(DiagnosisType[0])

#print(json.dumps(ReadModel, indent=4 ))
with open("readmodel.json", "w") as outfile:
    json.dump(ReadModel, outfile, indent=4, sort_keys=True)