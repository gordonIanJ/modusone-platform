module.exports = function (context, req) {
    
    if (req.body) {
        tableBinding = []        
        for (i = 0; i < req.body.length; i++) {
            var uniqueRowKey = req.body[i].mrn + (((1+Math.random())*0x10000)|0).toString(16).substring(1) 
            tableBinding.push({
                PartitionKey: req.body[i].assignedHospital,
                RowKey: uniqueRowKey,    
                MedicalRecordId: req.body[i].mrn, 
                Email: req.body[i].email, 
                AssignedProvider: req.body[i].assignedProvider,
                AdmissionDate: req.body[i].admissionDate,
                DischargeDate: req.body[i].dischargeDate,
                ConditionName: req.body[i].conditionName,
                ConditionDiagnosisQuality: req.body[i].conditionDiagnosisQuality,
                ConditionNotes: req.body[i].conditionNotes,
                attendingHospital: req.body[i].attendingHospital,
                AttendingProvider: req.body[i].attendingProvider 
            }) 
        } 
        context.bindings.tableBinding = tableBinding
        
        context.res = {
            status: 201,
            body: 'Written to Azure Table Storage: ' + JSON.stringify(tableBinding) 
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please send JSON in the body"
        };
    }
    context.done();
} 