const { connect, getDatabase } = require('../config/mongo');

const products = [
  {
    name: 'apple',
    price: 5000,
    stock: 12,
    categoryId: 1,
  },
  {
    name: 'orange',
    price: 8000,
    stock: 20,
    categoryId: 1,
  },
  {
    name: 'capcay',
    price: 15000,
    stock: 6,
    categoryId: 2,
  },
  {
    name: 'pinapple',
    price: 3000,
    stock: 12,
    categoryId: 1,
  },
  {
    name: 'kunyit',
    price: 5000,
    stock: 25,
    categoryId: 2,
  },
  {
    name: 'watermelon',
    price: 28000,
    stock: 6,
    categoryId: 1,
  },
  {
    name: 'persimmon',
    price: 30000,
    stock: 5,
    categoryId: 1,
  },
  {
    name: 'garlic',
    price: 1000,
    stock: 50,
    categoryId: 2,
  },
  {
    name: 'tomato',
    price: 1500,
    stock: 30,
    categoryId: 2,
  },
];

const categories = [
  {
    categoryId: 1,
    name: 'Fruits',
  },
  {
    categoryId: 2,
    name: 'Vegetables',
  },
];

const transactions = [
  {
    buyerName: 'Budi',
    qty: 5,
    productName: 'tomato',
    status: 'incomplete',
  },
  {
    buyerName: 'Kosasih',
    qty: 10,
    productName: 'garlic',
    status: 'completed',
  },
  {
    buyerName: 'Ann',
    qty: 1,
    productName: 'orange',
    status: 'completed',
  },
  {
    buyerName: 'Joko',
    qty: 3,
    productName: 'watermelon',
    status: 'completed',
  },
  {
    buyerName: 'Sem',
    qty: 20,
    productName: 'kunyit',
    status: 'incomplete',
  },
];

connect()
  .then(() => {
    const db = getDatabase();
    return db.collection('products').insertMany(products);
  })
  .then(() => {
    const db = getDatabase();
    return db.collection('categories').insertMany(categories);
  })
  .then(() => {
    const db = getDatabase();
    return db.collection('transactions').insertMany(transactions);
  })
  .then(() => {
    console.log('insert success');
  })
  .catch((err) => {
    console.log(err);
  });
