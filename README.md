# Inventory Management System
## we approach this problem in different angle as we build a Inventory management is shopping templete of stocks and also we build an retrival based AI using GROUNDX that will help to retrive the information from the great books of inventory management namely 
-> Supply Chain Management For Dummies® Published by: John Wiley & Sons, Inc.,
-> INVENTORY MANAGEMENT Published by the Secretary, National Institute of Open Schooling A-24/25,
-> Demand-Driven Inventory Optimization and Replenishment by Robert Davis
-> ESSENTIALS OF INVENTORY MANAGEMENT by max muller
-> LOGISTICS ANDSUPPLY CHAIN MANAGEMENT by MARTIN CHRISTOPHER
try our AI

# Backend
## we also build our backend using cloud database[MySQL] using clever cloud and deployed that backend using the ZOHO's catalyst engine called Appsail as shown in environement is path URL API which help to retrive the datas from cloud DB and our Angular front end `https://appsail-50025767379.development.catalystappsail.in/api/` 
which is the API we used in our Inventory management application
# INVENTORY TABLE OPERATIONS

## Methods                                                      Endpoint                                                          Description

GET                                `https://appsail-50025767379.development.catalystappsail.in/api/inventory`           Get all inventory items
POST                               `https://appsail-50025767379.development.catalystappsail.in/api/inventory`           Create a new inventory item
GET                                `https://appsail-50025767379.development.catalystappsail.in/api/inventory/:id`       Get a specific inventory item
PUT                                `https://appsail-50025767379.development.catalystappsail.in/api/inventory/:id`      Update inventory item details
DELETE                            ` https://appsail-50025767379.development.catalystappsail.in/api/inventory/:id`       Delete an inventory item                                                     FOR 


# Similarly for Supplier table operation

## Methods                                                         Endpoint                                                          Description                                                                                         

GET                               `https://appsail-50025767379.development.catalystappsail.in/api/suppliers`                        Get all suppliers
POST                              `https://appsail-50025767379.development.catalystappsail.in/api/suppliers`                        Create a new supplier
GET                               `https://appsail-50025767379.development.catalystappsail.in/api/suppliers/:id`                   Get a specific supplier
PUT                               `https://appsail-50025767379.development.catalystappsail.in/api/suppliers/:id`                    Update supplier details
DELETE                            `https://appsail-50025767379.development.catalystappsail.in/api/suppliers/:id`                    Delete a supplier


## we designed the cloud database MySQL as
TWO Tables namely
->Suppliers table, which contains name of the supplier and contact details
->Inventory table, which contains the supplier id , name of the inventory and catagory

## Backend Deployment
Appsail is zoho's hosting tools used to deploy both our backend and Retrival Agent AI

# Note
Its is not Mandatory to run our backend because we hosted the backend it can fetched using the routes As Mentioned above


# FrontEnd
-> Angular
-> Angular Material for UI 

# How to Run the Application
First run `cd Inventory-Management-System` and then start run the cmd `npm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.




