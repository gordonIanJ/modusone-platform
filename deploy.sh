create_resource_group () {
    az group create \
    --name $RESOURCE_GROUP_NAME \
    --location $LOCATION
}

create_storage_account () {
    az storage account create \
    --name $STORAGE_ACCOUNT_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --location $LOCATION \
    --sku Standard_LRS \
    --kind StorageV2
}

assign_access_to_storage_account () {
    STORAGE_ACCOUNT_ID=`az storage account show --resource-group modusone --name modusone --output json | jq .id |sed 's/"//g'` 
    az role assignment create --role "Reader and Data Access" --assignee shane@modusonehealth.com --scope $STORAGE_ACCOUNT_ID
}

create_storage_blob () {
    az storage blob service-properties update --account-name $STORAGE_ACCOUNT_NAME --static-website true --404-document 404.html --index-document index.html
}

create_function_app () {
    az functionapp create \
    --name $FUNCTION_APP_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --storage-account $STORAGE_ACCOUNT_NAME \
    --consumption-plan-location $LOCATION 
}

deploy_function_app () {
    create_resource_group 
    create_storage_account
    assign_access_to_storage_account
    create_function_app
}

deploy_functions () {
    cd $BASE_DIRECTORY/services/$FUNCTION_APP_NAME
    func azure functionapp publish $FUNCTION_APP_NAME
    cd $BASE_DIRECTORY 
}

deploy_spa () {
    create_resource_group 
    create_storage_account 
    assign_access_to_storage_account
    create_storage_blob 
    az storage blob upload-batch -s $FUNCTION_APP_ARTIFACT -d '$web' \
    --account-name $STORAGE_ACCOUNT_NAME
}

deploy () {
    deploy_function_app
    deploy_functions
    deploy_spa
}

az login
az extension add --name storage-preview

RESOURCE_GROUP_NAME=modusone
LOCATION=centralus
STORAGE_ACCOUNT_NAME=modusone
FUNCTION_APP_NAME=PertinentConditions
COSMOS_DB_NAME=`echo $FUNCTION_APP_NAME | tr '[:upper:]' '[:lower:]'`
BASE_DIRECTORY=/Users/iangordon/Projects/modusone-platform/
FUNCTION_APP_ARTIFACT=$BASE_DIRECTORY/client/build/

#STORAGE_ENDPOINT=`az storage account show -n $STORAGE_ACCOUNT_NAME -g $RESOURCE_GROUP_NAME --query "primaryEndpoints.web" --output tsv` 
#STORAGE_CONNECTION_STRING=$(cd $BASE_DIRECTORY/services/$FUNCTION_APP_NAME; func azure storage fetch-connection-string $STORAGE_ACCOUNT_NAME; cd ../)

#deploy