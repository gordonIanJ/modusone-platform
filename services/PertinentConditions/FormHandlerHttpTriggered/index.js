module.exports = function (context, req) {
    
    if (req.body) {
        tableBinding = []        
        for (i = 0; i < req.body.length; i++) {
            var uniqueRowKey = req.body[i].medicalRecordId + (((1+Math.random())*0x10000)|0).toString(16).substring(1) 
            tableBinding.push({
                PartitionKey: req.body[i].assignedFacility,
                RowKey: uniqueRowKey,    
                medicalRecordId: req.body[i].medicalRecordId, 
                email: req.body[i].reviewerEmail, 
                assignedProvider: req.body[i].assignedProvider,
                admissionDate: req.body[i].admissionDate,
                dischargeDate: req.body[i].dischargeDate,
                conditionName: req.body[i].conditionName,
                conditionDiagnosisQuality: req.body[i].conditionDiagnosisQuality,
                conditionNotes: req.body[i].conditionNotes,
                attendingHospital: req.body[i].attendingHospital,
                attendingProvider: req.body[i].attendingProvider,
                assignedGroup: req.body[i].assignedGroup 
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