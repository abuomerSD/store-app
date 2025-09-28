Store System
Perfect! Adding comprehensive operation tracking is essential for audit trails and accountability. Here's the enhanced database design with full operation logging:

## **Enhanced MongoDB Database Design with Operation Tracking**

### **1. Operations/Audit Log Collection**

```javascript
{
  _id: ObjectId,
  operationId: String, // Unique operation identifier
  action: String, // "CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT", "STOCK_IN", "STOCK_OUT"
  entity: String, // "PRODUCT", "CATEGORY", "USER", "STOCK_MOVEMENT"
  entityId: ObjectId, // Reference to the affected document
  description: {
    en: String,
    ar: String
  },
  changes: [ // Detailed changes for updates
    {
      field: String,
      oldValue: Mixed,
      newValue: Mixed,
      dataType: String // "string", "number", "boolean", "object", "array"
    }
  ],
  user: ObjectId, // Reference to Users collection
  userIp: String,
  userAgent: String,
  timestamp: Date,
  metadata: Object // Additional context-specific data
}
```

### **2. Enhanced Users Collection**

```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String,
  role: String, // "admin", "user", "auditor"
  profile: {
    firstName: String,
    lastName: String,
    phone: String
  },
  isActive: Boolean,
  lastLogin: Date,
  loginHistory: [
    {
      timestamp: Date,
      ipAddress: String,
      userAgent: String,
      success: Boolean
    }
  ],
  permissions: [String], // Specific permissions if needed
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId // Who created this user
}
```

### **3. Enhanced Products Collection**

```javascript
{
  _id: ObjectId,
  name: { en: String, ar: String },
  description: { en: String, ar: String },
  sku: String,
  category: ObjectId,
  baseUnit: String,
  units: [
    {
      unitType: String,
      unitName: { en: String, ar: String },
      conversionFactor: Number,
      isDefault: Boolean,
      addedBy: ObjectId, // Who added this unit
      addedAt: Date
    }
  ],
  images: [String],
  minStockLevel: Number,
  maxStockLevel: Number,
  currentStock: Number,
  costPrice: Number,
  sellingPrice: Number,
  isActive: Boolean,
  auditTrail: [
    {
      operationId: ObjectId, // Reference to Operations collection
      timestamp: Date,
      performedBy: ObjectId
    }
  ],
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId,
  lastModifiedBy: ObjectId,
  lastModifiedAt: Date
}
```

### **4. Enhanced Categories Collection**

```javascript
{
  _id: ObjectId,
  name: { en: String, ar: String },
  description: { en: String, ar: String },
  parentCategory: ObjectId,
  isActive: Boolean,
  auditTrail: [
    {
      operationId: ObjectId,
      timestamp: Date,
      performedBy: ObjectId
    }
  ],
  createdAt: Date,
  updatedAt: Date,
  createdBy: ObjectId,
  lastModifiedBy: ObjectId,
  lastModifiedAt: Date
}
```

### **5. Enhanced Stock Movements Collection**

```javascript
{
  _id: ObjectId,
  product: ObjectId,
  movementType: String, // "IN", "OUT", "ADJUSTMENT", "TRANSFER"
  quantity: Number,
  unitType: String,
  inputQuantity: Number,
  inputUnit: String,
  reference: String,
  notes: String,
  date: Date,
  operationId: ObjectId, // Reference to main operation log
  createdBy: ObjectId,
  createdAt: Date,
  verifiedBy: ObjectId, // Optional: for approvals
  verifiedAt: Date
}
```

---

## **New Backlog Items for Operation Tracking**

### **New US-18: Comprehensive Operation Logging**

**Priority:** High
**As an admin,** I want to track all operations performed in the system
**Acceptance Criteria:**

- All CRUD operations are logged with user details
- Stock movements include user information
- Login/logout activities are recorded
- Each log includes timestamp, IP address, and user agent
- Operation descriptions in both English and Arabic

### **New US-19: Audit Trail Reports**

**Priority:** Medium
**As an admin/auditor,** I want to view and export audit trails
**Acceptance Criteria:**

- Filter operations by user, date range, action type, entity
- View detailed change history for each operation
- Export audit logs to PDF/Excel
- Search operations by description or entity ID

### **New US-20: User Activity Monitoring**

**Priority:** Medium
**As an admin,** I want to monitor user activity and login history
**Acceptance Criteria:**

- View user login history with success/failure status
- See active users and their last activities
- Monitor suspicious activities (multiple failed logins)
- User session management

---

## **Operation Types & Examples**

### **Operation Types:**

```javascript
const OPERATION_TYPES = {
  // User Management
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  USER_CREATE: "USER_CREATE",
  USER_UPDATE: "USER_UPDATE",
  USER_DELETE: "USER_DELETE",

  // Product Management
  PRODUCT_CREATE: "PRODUCT_CREATE",
  PRODUCT_UPDATE: "PRODUCT_UPDATE",
  PRODUCT_DELETE: "PRODUCT_DELETE",

  // Category Management
  CATEGORY_CREATE: "CATEGORY_CREATE",
  CATEGORY_UPDATE: "CATEGORY_UPDATE",
  CATEGORY_DELETE: "CATEGORY_DELETE",

  // Stock Operations
  STOCK_IN: "STOCK_IN",
  STOCK_OUT: "STOCK_OUT",
  STOCK_ADJUST: "STOCK_ADJUST",
  STOCK_TRANSFER: "STOCK_TRANSFER",

  // System Operations
  EXPORT_REPORT: "EXPORT_REPORT",
  BACKUP_SYSTEM: "BACKUP_SYSTEM",
};
```

### **Example Operation Logs:**

#### **1. Product Creation:**

```javascript
{
  operationId: "OP-2024-001",
  action: "CREATE",
  entity: "PRODUCT",
  entityId: ObjectId("..."),
  description: {
    en: "Created new product: Coca-Cola Can (SKU: BEV-COL-330)",
    ar: "تم إنشاء منتج جديد: علبة كوكا كولا (رمز: BEV-COL-330)"
  },
  changes: [
    {
      field: "name",
      oldValue: null,
      newValue: { en: "Coca-Cola Can", ar: "علبة كوكا كولا" },
      dataType: "object"
    },
    {
      field: "sku",
      oldValue: null,
      newValue: "BEV-COL-330",
      dataType: "string"
    }
  ],
  user: ObjectId("..."),
  userIp: "192.168.1.100",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  timestamp: ISODate("2024-01-15T10:30:00Z"),
  metadata: {
    category: "Beverages",
    initialStock: 0
  }
}
```

#### **2. Stock In Operation:**

```javascript
{
  operationId: "OP-2024-002",
  action: "STOCK_IN",
  entity: "STOCK_MOVEMENT",
  entityId: ObjectId("..."),
  description: {
    en: "Added 24 pieces of Coca-Cola Can via Case purchase",
    ar: "تم إضافة 24 علبة من كوكا كولا عبر شراء كرتون"
  },
  changes: [
    {
      field: "stock_quantity",
      oldValue: 96,
      newValue: 120,
      dataType: "number"
    }
  ],
  user: ObjectId("..."),
  userIp: "192.168.1.101",
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
  timestamp: ISODate("2024-01-15T14:20:00Z"),
  metadata: {
    product: "Coca-Cola Can",
    productId: ObjectId("..."),
    movementType: "IN",
    quantity: 24,
    reference: "PO-12345"
  }
}
```

#### **3. User Login:**

```javascript
{
  operationId: "OP-2024-003",
  action: "USER_LOGIN",
  entity: "USER",
  entityId: ObjectId("..."),
  description: {
    en: "User admin logged in successfully",
    ar: "تم تسجيل دخول المستخدم admin بنجاح"
  },
  changes: [],
  user: ObjectId("..."),
  userIp: "192.168.1.150",
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  timestamp: ISODate("2024-01-15T08:15:00Z"),
  metadata: {
    loginMethod: "password",
    sessionDuration: 3600000
  }
}
```

---

## **Enhanced Sprint Plan**

### **Sprint 2.5: Operation Tracking Foundation**

- Create operations/audit log collection schema
- Implement operation logging middleware
- Add user context to all requests
- Log login/logout activities

### **Sprint 4.5: Enhanced CRUD Operations**

- Add operation logging to all product/category CRUD
- Implement change tracking for updates
- Add audit trail references to main collections

### **Sprint 6.5: Audit Reports**

- Build audit trail reporting interface
- Implement operation filtering and search
- Add export functionality for audit logs
- Create user activity monitoring dashboard

---

## **Implementation Approach**

### **1. Middleware for Operation Logging**

```javascript
// Express middleware
const operationLogger = (req, res, next) => {
  const originalSend = res.send;
  res.send = function (data) {
    // Log operation after response is sent
    if (req.user && shouldLogOperation(req)) {
      logOperation(req, res, data);
    }
    originalSend.call(this, data);
  };
  next();
};
```

### **2. Operation Service**

```javascript
class OperationService {
  async logOperation(action, entity, entityId, changes, user, metadata = {}) {
    const operation = {
      operationId: generateOperationId(),
      action,
      entity,
      entityId,
      description: generateDescription(action, entity, changes),
      changes,
      user: user._id,
      userIp: user.ipAddress,
      userAgent: user.userAgent,
      timestamp: new Date(),
      metadata,
    };

    return await OperationLog.create(operation);
  }
}
```

### **3. Database Indexes for Performance**

```javascript
// Create indexes for efficient querying
db.operations.createIndex({ timestamp: -1 });
db.operations.createIndex({ user: 1, timestamp: -1 });
db.operations.createIndex({ entity: 1, entityId: 1 });
db.operations.createIndex({ action: 1, timestamp: -1 });
db.operations.createIndex({ description: "text" });
```

This comprehensive operation tracking system provides:

- **Complete audit trail** for compliance and accountability
- **User activity monitoring** for security
- **Change history** for troubleshooting
- **Performance optimization** with proper indexing
- **Multi-language support** for international teams

The system will know exactly who did what, when, and from where for every operation!
