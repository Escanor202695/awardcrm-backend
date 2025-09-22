db = db.getSiblingDB("handymench");

db.createUser({
  user: "handymench_user",
  pwd: "handymench_password",
  roles: [
    {
      role: "readWrite",
      db: "handymench",
    },
  ],
});

// Create indexes for better performance
db.projects.createIndex({ projectId: 1 }, { unique: true });
db.projects.createIndex({ status: 1 });
db.projects.createIndex({ manager: 1 });

db.tasks.createIndex({ project: 1 });
db.tasks.createIndex({ status: 1 });
db.tasks.createIndex({ startDate: 1 });

db.expenses.createIndex({ project: 1 });
db.expenses.createIndex({ status: 1 });
db.expenses.createIndex({ invoiceDate: -1 });

db.invoices.createIndex({ project: 1 });
db.invoices.createIndex({ invoiceNumber: 1 }, { unique: true });
db.invoices.createIndex({ status: 1 });

db.contacts.createIndex({ contactType: 1 });
db.contacts.createIndex({ tradeSpecialty: 1 });
db.contacts.createIndex({ company: 1 });

db.materials.createIndex({ project: 1 });
db.materials.createIndex({ deliveryDate: 1 });
db.materials.createIndex({ status: 1 });

db.dailyreports.createIndex({ project: 1, date: 1 }, { unique: true });
db.dailyreports.createIndex({ date: -1 });

db.changeorders.createIndex({ project: 1 });
db.changeorders.createIndex({ status: 1 });
db.changeorders.createIndex({ number: 1 }, { unique: true });

db.rfis.createIndex({ project: 1 });
db.rfis.createIndex({ status: 1 });
db.rfis.createIndex({ rfiNumber: 1 }, { unique: true });

db.punchlists.createIndex({ project: 1 });
db.punchlists.createIndex({ status: 1 });
db.punchlists.createIndex({ itemNumber: 1 }, { unique: true });
