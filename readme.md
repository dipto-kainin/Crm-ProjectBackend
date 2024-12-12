#### **Admin**

-   Full access to all resources and management.

#### **Manager**

-   Manage clients, leads, projects, and tasks. Limited to their assigned resources and analytics.

#### **Team Member**

-   Limited to accessing assigned tasks, tickets, and notifications.

---

### **Access Control Matrix**

| **Endpoint**                         | **Admin** | **Manager** | **Team Member** |
| ------------------------------------ | --------- | ----------- | --------------- |
| **Authentication**                   |           |             |                 |
| `POST /api/auth/register`            | ✅        | ❌          | ❌              |
| `POST /api/auth/login`               | ✅        | ✅          | ✅              |
| `POST /api/auth/logout`              | ✅        | ✅          | ✅              |
| `GET /api/auth/me`                   | ✅        | ✅          | ✅              |
| **Dashboard**                        |           |             |                 |
| `GET /api/dashboard/overview`        | ✅        | ✅          | ❌              |
| `GET /api/dashboard/graphs`          | ✅        | ✅          | ❌              |
| **Client Management**                |           |             |                 |
| `GET /api/clients`                   | ✅        | ✅          | ❌              |
| `GET /api/clients/:id`               | ✅        | ✅          | ❌              |
| `POST /api/clients`                  | ✅        | ✅          | ❌              |
| `PUT /api/clients/:id`               | ✅        | ✅          | ❌              |
| `DELETE /api/clients/:id`            | ✅        | ❌          | ❌              |
| **Contact Management**               |           |             |                 |
| `GET /api/contacts`                  | ✅        | ✅          | ❌              |
| `POST /api/contacts`                 | ✅        | ✅          | ❌              |
| `PUT /api/contacts/:id`              | ✅        | ✅          | ❌              |
| `DELETE /api/contacts/:id`           | ✅        | ❌          | ❌              |
| **Project Management**               |           |             |                 |
| `GET /api/projects`                  | ✅        | ✅          | ✅ (assigned)   |
| `GET /api/projects/:id`              | ✅        | ✅          | ✅ (assigned)   |
| `POST /api/projects`                 | ✅        | ✅          | ❌              |
| `PUT /api/projects/:id`              | ✅        | ✅          | ❌              |
| `DELETE /api/projects/:id`           | ✅        | ❌          | ❌              |
| **Task Management**                  |           |             |                 |
| `GET /api/tasks`                     | ✅        | ✅          | ✅ (assigned)   |
| `GET /api/tasks/:id`                 | ✅        | ✅          | ✅ (assigned)   |
| `POST /api/tasks`                    | ✅        | ✅          | ❌              |
| `PUT /api/tasks/:id`                 | ✅        | ✅          | ❌              |
| `DELETE /api/tasks/:id`              | ✅        | ❌          | ❌              |
| **Lead Management**                  |           |             |                 |
| `GET /api/leads`                     | ✅        | ✅          | ❌              |
| `POST /api/leads`                    | ✅        | ✅          | ❌              |
| `PUT /api/leads/:id`                 | ✅        | ✅          | ❌              |
| `DELETE /api/leads/:id`              | ✅        | ❌          | ❌              |
| **Marketing Campaign Management**    |           |             |                 |
| `GET /api/campaigns`                 | ✅        | ✅          | ❌              |
| `POST /api/campaigns`                | ✅        | ❌          | ❌              |
| `PUT /api/campaigns/:id`             | ✅        | ❌          | ❌              |
| `DELETE /api/campaigns/:id`          | ✅        | ❌          | ❌              |
| **Invoices & Payments**              |           |             |                 |
| `GET /api/invoices`                  | ✅        | ✅          | ❌              |
| `POST /api/invoices`                 | ✅        | ✅          | ❌              |
| `PUT /api/invoices/:id`              | ✅        | ✅          | ❌              |
| `DELETE /api/invoices/:id`           | ✅        | ❌          | ❌              |
| **Notification Management**          |           |             |                 |
| `GET /api/notifications`             | ✅        | ✅          | ✅              |
| `POST /api/notifications/read/:id`   | ✅        | ✅          | ✅              |
| **Support Ticket Management**        |           |             |                 |
| `GET /api/tickets`                   | ✅        | ✅          | ✅ (assigned)   |
| `POST /api/tickets`                  | ✅        | ✅          | ❌              |
| `PUT /api/tickets/:id`               | ✅        | ✅          | ❌              |
| `DELETE /api/tickets/:id`            | ✅        | ❌          | ❌              |
| **Expense Management**               |           |             |                 |
| `GET /api/expenses`                  | ✅        | ✅          | ❌              |
| `POST /api/expenses`                 | ✅        | ✅          | ❌              |
| `PUT /api/expenses/:id`              | ✅        | ✅          | ❌              |
| `DELETE /api/expenses/:id`           | ✅        | ❌          | ❌              |
| **Product and Inventory Management** |           |             |                 |
| `GET /api/products`                  | ✅        | ✅          | ❌              |
| `POST /api/products`                 | ✅        | ❌          | ❌              |
| `PUT /api/products/:id`              | ✅        | ❌          | ❌              |
| `DELETE /api/products/:id`           | ✅        | ❌          | ❌              |
| **Workflow Management**              |           |             |                 |
| `GET /api/workflows`                 | ✅        | ✅          | ❌              |
| `POST /api/workflows`                | ✅        | ❌          | ❌              |
| `PUT /api/workflows/:id`             | ✅        | ❌          | ❌              |
| `DELETE /api/workflows/:id`          | ✅        | ❌          | ❌              |
