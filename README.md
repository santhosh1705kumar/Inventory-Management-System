#  Inventory Management System

We build an advanced inventory and supplier management platform powered by **Angular**, **MySQL**, and **ZOHO Catalyst's Appsail**. We’ve also integrated a **Retrieval-Based AI Agent** using **GROUNDX**, capable of extracting intelligent insights from top inventory management literature.

## Live API Base URL

we deployed the backend in cloud using clever cloud MySQL and Zoho's Catalyst hosting ,It can be fetched using  
`https://appsail-50025767379.development.catalystappsail.in/api/ ` as mentioned in `environment.ts` file

> You **do not need to run the backend locally** — it's already deployed and ready to use.

---

## 🔧 Backend API Endpoints

### Inventory Operations

| Method | Endpoint                                             | Description                    |
|--------|------------------------------------------------------|--------------------------------|
| GET    | `/inventory`                                         | Get all inventory items        |
| POST   | `/inventory`                                         | Create a new inventory item    |
| GET    | `/inventory/:id`                                     | Get a specific inventory item  |
| PUT    | `/inventory/:id`                                     | Update inventory item details  |
| DELETE | `/inventory/:id`                                     | Delete an inventory item       |

### Supplier Operations

| Method | Endpoint                                             | Description                    |
|--------|------------------------------------------------------|--------------------------------|
| GET    | `/suppliers`                                         | Get all suppliers              |
| POST   | `/suppliers`                                         | Create a new supplier          |
| GET    | `/suppliers/:id`                                     | Get a specific supplier        |
| PUT    | `/suppliers/:id`                                     | Update supplier details        |
| DELETE | `/suppliers/:id`                                     | Delete a supplier              |

---

## Retrieval AI Guide

Our AI agent is capable of fetching answers from well-known inventory and supply chain management books.
-------------------------------------------------------------------------------------------------------------
|  Book Title                                                 |          Author and Publisher               |  
|-------------------------------------------------------------|---------------------------------------------|
| **Supply Chain Management For Dummies**                     | John Wiley & Sons, Inc.                     | 
| **Inventory Management**                                    | National Institute of Open Schooling        | 
| **Demand-Driven Inventory Optimization and Replenishment**  | Robert Davis                                | 
| **Essentials of Inventory Management**                      | Max Muller                                  | 
| **Logistics and Supply Chain Management**                   | Martin Christopher                          | 
-------------------------------------------------------------------------------------------------------------


> The AI agent is integrated into the backend and can be accessed from the frontend UI.

---

## Technologies Used

- **Frontend**: Angular, Angular Material
- **Backend**: Node.js (Express), MySQL
- **Cloud Hosting**: ZOHO Catalyst (Appsail), Clever Cloud
- **AI Retrieval**: GROUNDX
- **Database**: MySQL with two tables:
  - `Suppliers`: Name, contact details
  - `Inventory`: Name, category, linked supplier ID

---


---

##  How to Run the Angular App

```bash
# Step 1: Navigate to the project
cd Inventory-Management-System

# Step 2: Install dependencies
npm install

# Step 3: Start the development server
ng serve

