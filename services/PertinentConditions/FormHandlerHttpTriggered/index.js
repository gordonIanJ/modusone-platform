module.exports = function (context, req) {
   
    if (req.body && req.headers) {
        var customer = req.headers.customer 
        var tableBinding = []        
        for (i = 0; i < req.body.length; i++) {
            var uniqueRowKey = req.body[i].medicalRecordId + (((1+Math.random())*0x10000)|0).toString(16).substring(1) 
            var pertinentConditions = {
                PartitionKey: customer,
                RowKey: uniqueRowKey,    
                medicalRecordId: req.body[i].medicalRecordId, 
                email: req.body[i].reviewerEmail, 
                admissionDate: req.body[i].admissionDate,
                dischargeDate: req.body[i].dischargeDate,
                assignedGroup: req.body[i].assignedGroup 
            } 
            if (typeof(req.body[i].assignedHospital) !== 'undefined') {
                pertinentConditions['assignedHospital'] = req.body[i].assignedHospital
            }
            if (typeof(req.body[i].conditionName) !== 'undefined') {
                pertinentConditions['conditionName'] = req.body[i].conditionName
                pertinentConditions['conditionDiagnosisQuality'] = req.body[i].conditionDiagnosisQuality
                pertinentConditions['attendingProvider'] = req.body[i].attendingProvider
            }
            if (typeof(req.body[i].conditionNotes) !== 'undefined') {
                pertinentConditions['conditionNotes'] = req.body[i].conditionNotes
            }
            tableBinding.push(pertinentConditions) 
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
            body: "Please send conditions data as JSON in the body and Customer as JSON in the headers"
        };
    }
    context.done();
} 