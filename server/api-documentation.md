## Products Endpoint

### GET /products (joined with category)

> get all products with or without category ID

_request body_:

```
  none
```

_request params (optional)_:

```
  "categoryId": "<category_id>"
```

_response (200)_:

```
[
  {
      "_id": "619cf25cf8caff1184cd59d5",
      "name": "persimmon",
      "price": 30000,
      "stock": 5,
      "categoryId": 1,
      "category": [
          {
              "_id": "619cf25cf8caff1184cd59d8",
              "categoryId": 1,
              "name": "Fruits"
          }
      ]
  },
  {
      "_id": "619cf25cf8caff1184cd59d1",
      "name": "capcay",
      "price": 15000,
      "stock": 6,
      "categoryId": 2,
      "category": [
          {
              "_id": "619cf25cf8caff1184cd59d9",
              "categoryId": 2,
              "name": "Vegetables"
          }
      ]
  },
  {
      "_id": "619cf25cf8caff1184cd59d4",
      "name": "watermelon",
      "price": 28000,
      "stock": 6,
      "categoryId": 1,
      "category": [
          {
              "_id": "619cf25cf8caff1184cd59d8",
              "categoryId": 1,
              "name": "Fruits"
          }
      ]
  },
  {
      "_id": "619cf25cf8caff1184cd59cf",
      "name": "apple",
      "price": 5000,
      "stock": 12,
      "categoryId": 1,
      "category": [
          {
              "_id": "619cf25cf8caff1184cd59d8",
              "categoryId": 1,
              "name": "Fruits"
          }
      ]
  }
]
```

### GET /products/summary

> generate product summary with or without category ID

_request body_:

```
  none
```

_request params_:

```
  "categoryId": <desired category_id>
```

_response (200)_:

```
[
    {
        "_id": null,
        "totalStock": 166,
        "averageStock": 18.444444444444443,
        "maxStock": 50,
        "min": 5
    }
]
```

### GET /transactions

> get and group transactions by status

_request body_:

```
{
  "status": "incomplete"
}
```

_response (200)_:

```
  [
    {
        "_id": "619cf25cf8caff1184cd59de",
        "totalQuantity": 20
    },
    {
        "_id": "619cf25cf8caff1184cd59da",
        "totalQuantity": 5
    }
]
```

### GET /transactions/revenue

> get revenues for each transaction

_request body_:

```
  none
```

_response (200)_:

```
[
    {
        "_id": "619cf25cf8caff1184cd59da",
        "revenue": 25000,
        "buyer": "Budi"
    },
    {
        "_id": "619cf25cf8caff1184cd59db",
        "revenue": 50000,
        "buyer": "Kosasih"
    },
    {
        "_id": "619cf25cf8caff1184cd59dc",
        "revenue": 5000,
        "buyer": "Ann"
    },
    {
        "_id": "619cf25cf8caff1184cd59dd",
        "revenue": 15000,
        "buyer": "Joko"
    },
    {
        "_id": "619cf25cf8caff1184cd59de",
        "revenue": 100000,
        "buyer": "Sem"
    }
]
```

### GET /transactions/summary

> generate transactions summary

_request body_:

```
  none
```

_response (200)_:

```
{
    "summary": [
        {
            "_id": null,
            "bestSellingProduct": 20,
            "averageRevenue": 39000,
            "maxRevenue": 100000,
            "minRevenue": 5000
        }
    ],
    "bestSellingItem": [
        {
            "_id": "619cf25cf8caff1184cd59de",
            "product": "kunyit",
            "amount": 20
        }
    ]
}
```
