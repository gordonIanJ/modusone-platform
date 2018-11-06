create_resource_group () {
    az group create \
    --name $RESOURCE_GROUP_NAME \
    --location $LOCATION
}

create_storage_account () {
    STORAGE_ACCOUNT_NAME=$1
    az storage account create \
    --name $STORAGE_ACCOUNT_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --location $LOCATION \
    --sku Standard_LRS \
    --kind StorageV2
}

assign_access_to_storage_account () {
    STORAGE_ACCOUNT_NAME=$1 
    STORAGE_ACCOUNT_ID=`az storage account show --resource-group modusone --name $STORAGE_ACCOUNT_NAME --output json | jq .id |sed 's/"//g'` 
    az role assignment create --role "Reader and Data Access" --assignee shane@modusonehealth.com --scope $STORAGE_ACCOUNT_ID
}

enable_static_website () {
    STORAGE_ACCOUNT_NAME=$1 
    az storage blob service-properties update --account-name $STORAGE_ACCOUNT_NAME --static-website true --404-document 404.html --index-document index.html
}

create_function_app () {
    STORAGE_ACCOUNT_NAME=$1 
    az functionapp create \
    --name $FUNCTION_APP_NAME \
    --resource-group $RESOURCE_GROUP_NAME \
    --storage-account $STORAGE_ACCOUNT_NAME \
    --consumption-plan-location $LOCATION 
}

deploy_function_app () {
    STORAGE_ACCOUNT_NAME=$1 
    create_resource_group 
    create_storage_account $STORAGE_ACCOUNT_NAME
    assign_access_to_storage_account $STORAGE_ACCOUNT_NAME
    create_function_app
}

deploy_functions () {
    cd $BASE_DIRECTORY/services/$FUNCTION_APP_NAME
    func azure functionapp publish $FUNCTION_APP_NAME
    cd $BASE_DIRECTORY 
}

deploy_spa () {
    STORAGE_ACCOUNT_NAME=$1
    ARTIFACT=$2  
    create_resource_group 
    create_storage_account $STORAGE_ACCOUNT_NAME 
    assign_access_to_storage_account $STORAGE_ACCOUNT_NAME
    enable_static_website $STORAGE_ACCOUNT_NAME 
    az storage blob upload-batch -s $ARTIFACT -d '$web' \
    --account-name $STORAGE_ACCOUNT_NAME
}

deploy_client () {
    deploy_spa $SPA_STORAGE_ACCOUNT_NAME $SPA_ARTIFACT
}

deploy_excel_addin () {
    deploy_spa $EXCEL_ADDIN_STORAGE_ACCOUNT_NAME $EXCEL_ADDIN_ARTIFACT
}

az login
az extension add --name storage-preview

LOCATION=centralus
BASE_DIRECTORY=/Users/iangordon/Projects/modusone-platform/
RESOURCE_GROUP_NAME=modusone
SPA_STORAGE_ACCOUNT_NAME=modusone
SPA_ARTIFACT=$BASE_DIRECTORY/newClient/build/
EXCEL_ADDIN_STORAGE_ACCOUNT_NAME=modusoneexceladdin
EXCEL_ADDIN_ARTIFACT=$BASE_DIRECTORY/excelAddIn/dist/
FUNCTION_APP_NAME=PertinentConditions

#STORAGE_ENDPOINT=`az storage account show -n $STORAGE_ACCOUNT_NAME -g $RESOURCE_GROUP_NAME --query "primaryEndpoints.web" --output tsv` 
#STORAGE_CONNECTION_STRING=$(cd $BASE_DIRECTORY/services/$FUNCTION_APP_NAME; func azure storage fetch-connection-string $STORAGE_ACCOUNT_NAME; cd ../)