import pyexcel
import json
from collections import defaultdict

Sheets = pyexcel.get_book_dict(file_name="CHI.xlsx")

ReadModel = {
    'Hospitals': [],
    'DiagnosisTypes': [], 
    'ConditionsByGroup': {},
    'ProvidersByGroup': {}
}

for Hospital in Sheets['Hospitals'][1::]: # for every row in the sheet
    ReadModel['Hospitals'].append(Hospital[0]) # append the contents of the cell at index 0

for Condition in Sheets['Conditions'][1::]: 
    group = Condition[1] 
    if not group in ReadModel['ConditionsByGroup']: 
        ReadModel['ConditionsByGroup'][group] = []
    ReadModel['ConditionsByGroup'][group].append(Condition[0])   

for Provider in Sheets['Providers'][1::]: 
    group = Provider[6] 
    if not group in ReadModel['ProvidersByGroup']: 
        ReadModel['ProvidersByGroup'][group] = []
    ReadModel['ProvidersByGroup'][group].append(
        {
            "npi": Provider[5], # npiNumber
            "reportingName": Provider[7]
        }
    )   


for DiagnosisType in Sheets['DiagnosisTypes'][1::]:
    ReadModel['DiagnosisTypes'].append(DiagnosisType[0])

#print(json.dumps(ReadModel, indent=4 ))
with open("readmodel.json", "w") as outfile:
    json.dump(ReadModel, outfile, indent=4, sort_keys=True)

