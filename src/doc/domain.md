# Business Domain: Chart Review

## Entities
 
- Client 
    - has Name
    - has Facilities
- Facilities
    - has Name
    - serve Groups
- Conditions
    - have Name
- Groups
    - have Name
    - diagnose and treat Conditions
- Providers
    - are people
    - have Name
    - reside at at Facility(s)
    - are members of Group(s)
- Medical Record 
    - is a table 
    - has columns
        - Provider
        - Patient

## Processes

### Chart Selection

Every month: From a table of records for a Client and having columns Patient, Provider, and Facility: 

1. Filter for Provider1
1. Filter for Provider1's facility
1. If facility is inpatient, filter for stay less than N days 
1. If the number of records in the result set is less than the desired number N 
    1. Save the result set as ResultSetA
    1. Select at random another Provider with facility same as that of Provider1, "Provider2" 
    1. Remove the filter for Provider1
    1. Add a filter Provider2
    1. If the sum of "the number of records in the result set" and "the number of records in SetA" is greater than or equal to N
        1. Save the result set as ResultSetB
        1. Save the union of ResultSetA and ResultSetB as ResultSetFinal
    1. Else repeat the process beginning with "Select at random another Provider with facility same as that of Provider(2)"  

### Review Process

Note: Values from form submission will include the Provider's Facility 