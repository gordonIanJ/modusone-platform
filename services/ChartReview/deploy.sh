#!/usr/bin/env bash

# https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function-azure-cli

RESOURCE_GROUP=ijgmodusone
STORAGE_ACCOUNT=ijgchartreview
LOCATION=centralus
APP_NAME=IjgChartReview

echo "Creating resource group $RESOURCE_GROUP...\n"
az group create --name $RESOURCE_GROUP --location $LOCATION 

echo "Creating storage account $STORAGE_ACCOUNT...\n"
az storage account create --name $STORAGE_ACCOUNT --location $LOCATION --resource-group $RESOURCE_GROUP --sku Standard_LRS

echo "Creating function app $APP_NAME...\n"
az functionapp create --resource-group $RESOURCE_GROUP --consumption-plan-location $LOCATION \
--name $APP_NAME --storage-account $STORAGE_ACCOUNT 

echo "Configuring app $APP_NAME...\n"
az functionapp config appsettings set --name $APP_NAME \
--resource-group $RESOURCE_GROUP \
--settings WEBSITE_NODE_DEFAULT_VERSION=8.11.1

echo "Publishing app $APP_NAME...\n"
func azure functionapp publish $APP_NAME 

# az group delete --name $RESOURCE_GROUP 
