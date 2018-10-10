import pyexcel
import json

Sheets = pyexcel.get_book_dict(file_name="CHI.xlsx")

ReadModel = {
    'Cascaders': { 
        'Hospitals': [],
        'Providers': [],
        'Conditions': [],
    },
    'ProvidersByNpi': []
}

for Hospital in Sheets['Hospitals'][1::]:
    ReadModel['Cascaders']['Hospitals'].append(
    {
        "label": Hospital[0],
        "value": Hospital[0]
    })

for Provider in Sheets['Providers'][1::]:
    ReadModel['Cascaders']['Providers'].append(
    {
        "label": Provider[7],
        "value": Provider[7]
    })
    ReadModel['ProvidersByNpi'].append(
    {
        "npi": Provider[5],
        "reportingName": Provider[7] 
    }
    )

Conditions = set() 
for Condition in Sheets['Conditions'][1::]:
    Conditions.add(Condition[0])

for DiagnosisType in Sheets['DiagnosisTypes'][1::]:
    ConditionsCascaderItem = {
        "label": DiagnosisType[0],
        "value": DiagnosisType[0],
        "children": [],
    }
    for Condition in list(Conditions):
        ConditionsCascaderItem['children'].append(
        { 
            "label": Condition,
            "value": Condition
        }
        )
    ReadModel['Cascaders']['Conditions'].append(ConditionsCascaderItem)


#print(json.dumps(ReadModel))
with open("readmodel.json", "w") as outfile:
    json.dump(ReadModel, outfile, indent=4, sort_keys=True)