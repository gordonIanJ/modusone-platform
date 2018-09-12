create_storage_account () {
    az group create \
    --name $RESOURCE_GROUP_NAME \
    --location $LOCATION
    az storage account create \
    --name $STORAGE_ACCOUNT_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --location $LOCATION \
    --sku Standard_LRS \
    --kind StorageV2
}

create_storage_blob () {
    create_storage_account
    az storage blob service-properties update --account-name $STORAGE_ACCOUNT_NAME --static-website true --404-document 404.html --index-document index.html
}

create_function_app () {
    create_storage_account 
    az functionapp create \
    --name $FUNCTION_APP_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --storage-account $STORAGE_ACCOUNT_NAME \
    --consumption-plan-location $LOCATION 
}

create_cosmos_db () {
    az cosmosdb create \
    --name $FUNCTION_APP_NAME \
    --resource-group $RESOURCE_GROUP_NAME 

}

configure_function_app_for_cosmos_db () {
    # Get the Azure Cosmos DB connection string.
    endpoint=$(az cosmosdb show \
    --name $FUNCTION_APP_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --query documentEndpoint \
    --output tsv)
    key=$(az cosmosdb list-keys \
    --name $FUNCTION_APP_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --query primaryMasterKey \
    --output tsv)
    # Configure function app settings to use the Azure Cosmos DB connection string.
    az functionapp config appsettings set \
    --name $FUNCTION_APP_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --setting CosmosDB_Endpoint=$endpoint CosmosDB_Key=$key
}

deploy_spa () {
    create_storage_blob 
    az storage blob upload-batch -s build -d '$web' \
    --account-name $STORAGE_ACCOUNT_NAME
}

deploy_function_app () {
    create_function_app
    create_cosmos_db
    configure_function_app_for_cosmos_db
}

deploy_function () {
    cd azureFunctions
    func azure functionapp publish $FUNCTION_APP_NAME
    cd ../
}

deploy () {
    deploy_function_app
    deploy_function
    deploy_spa
}

az login
az extension add --name storage-preview

RESOURCE_GROUP_NAME=m1-chart-review
LOCATION=centralus
STORAGE_ACCOUNT_NAME=m1chartreviewspa
FUNCTION_APP_NAME=m1chartreview
STORAGE_ENDPOINT=`az storage account show -n $STORAGE_ACCOUNT_NAME -g $RESOURCE_GROUP_NAME --query "primaryEndpoints.web" --output tsv` 
STORAGE_CONNECTION_STRING=$(cd azureFunctions; func azure storage fetch-connection-string $STORAGE_ACCOUNT_NAME; cd ../)