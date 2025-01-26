
# Bi-Cycle store B4A2V4

This project is an Express.js application developed with TypeScript that integrates MongoDB using Mongoose to manage a comprehensive Bicycle Store. The application is designed to streamline inventory management, handle customer orders, and calculate revenue while ensuring data integrity through robust schema validation.
#### Live Deployment Link: https://bicycle-store-backend-eight.vercel.app/
#### Video Explanation (Public Link): https://www.loom.com/share/b5bd3614a97f4c3bbe17d6f0d893cc17?sid=06075fcc-e08a-4bff-909b-b2cd108dcc26


## **Features**

### **1. Product(Bicycle) Management**
- Create, read, update, and delete bicycles.
- Store detailed information such as:
  - Name, brand, type, price, quantity, and availability (`inStock`).
- Validate bicycle data using Mongoose schema rules (e.g., positive prices, valid bicycle types).

### **2. Order Management**
- Place orders and automatically update inventory levels.
- Prevent over-ordering with stock validation.
- Automatically set `inStock` to `false` when stock reaches zero.
- Calculate total revenue using MongoDB’s aggregation framework.
- Revenue is computed as the sum of all order quantities multiplied by bicycle prices.

### **3. Error Handling**
- Provide descriptive error messages for validation failures and operational issues.
- Handle errors consistently with centralized middleware.

### **4. Data Integrity**
- Enforce validation rules through Mongoose schemas (e.g., required fields, enum constraints, minimum values).
- Ensure relational consistency between orders and products using `ObjectId` references.

---

## **Technology Stack**

### **Backend:**
- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
  
### **Development Tools:**
- **API Testing:** [Postman](https://www.postman.com/)
- **Code Linting:** [ESLint](https://eslint.org/)
- **Code Prettier:** [Prettier](https://prettier.io/)

---

## **Developer guide**

* Clone the project in your local machine
    ```bash
     git clone https://github.com/nurhossainfarid/Bi-Cycle_store_B4A2V4.git
    ```
* Install all the the dependencies 
    ```bash
     yarn install
    ```
* Run Code 
    ```bash
     yarn start:dev
    ```

## **API END POINT**
#### **Create a Bicycle**
- Endpoint: /api/products
- Method: POST
#### **Get All Bicycles**
- Endpoint: /api/products
- Method: GET
#### **Get a Specific Bicycle**
- Endpoint: /api/products/:productId
- Method: GET
#### **Update a Bicycle**
- Endpoint: /api/products/:productId
- Method: PUT
#### **Delete a Bicycle**
- Endpoint: /api/products/:productId
- Method: DELETE
#### **Order a Bicycle**
- Endpoint: /api/orders
- Method: POST
#### **Calculate Revenue from Orders (Aggregation)**
- Endpoint: /api/orders/revenue
- Method: GET

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributions
Feel free to fork this repository, raise issues, and submit pull requests to contribute to this project.

## Contact
For queries, suggestions, or feedback, please contact:
Nur Hossain Farid
Email: faahsan1516@gmai.com
GitHub: github.com/nurhossainfarid