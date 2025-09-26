# Store API

A RESTful API for managing and filtering product data with advanced search, sorting, and filtering capabilities.

## Features

- **Product Filtering**: Filter products by featured status, company, and name
- **Dynamic Sorting**: Sort products by any field (price, name, createdAt, etc.)
- **Search Functionality**: Case-insensitive product name search using regex
- **Numeric Filters**: Advanced filtering with comparison operators (>, >=, =, <, <=)
- **Field Selection**: Choose specific fields to return in response
- **Pagination**: Limit results and navigate through pages
- **Static Product Queries**: Pre-configured queries for common use cases


## API Endpoints

### Get All Products (Filtered)
```
GET /api/v1/products
```

**Query Parameters:**
- `featured`: Filter by featured status (true/false)
- `company`: Filter by company name
- `name`: Search products by name (case-insensitive)
- `sort`: Sort by fields (comma-separated for multiple fields)
- `fields`: Select specific fields to return (comma-separated)
- `numericFilters`: Filter by numeric values using operators
- `page`: Page number for pagination (default: 1)
- `limit`: Number of results per page (default: 10)

**Examples:**
```bash
# Get all featured products
GET /api/v1/products?featured=true

# Get products from specific company
GET /api/v1/products?company=apple

# Search products by name
GET /api/v1/products?name=phone

# Sort by price (descending) then by name
GET /api/v1/products?sort=-price,name

# Get only name and price fields
GET /api/v1/products?fields=name,price

# Filter products with price greater than 100
GET /api/v1/products?numericFilters=price>100

# Filter products with price between 50 and 200
GET /api/v1/products?numericFilters=price>=50,price<=200

# Filter by rating and price
GET /api/v1/products?numericFilters=rating>=4,price<500

# Pagination - Get page 2 with 5 results per page
GET /api/v1/products?page=2&limit=5

# Combined filters with pagination
GET /api/v1/products?featured=true&company=samsung&sort=price&fields=name,price&page=1&limit=10
```

### Get Static Products
```
GET /api/v1/products/static
```
Returns all products sorted by price (descending).

## Response Format

```json
{
  "nbHits": 5,
  "products": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "price": 999,
      "featured": true,
      "company": "Company Name",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Product Schema

```javascript
{
  name: String,
  price: Number,
  featured: Boolean,
  rating: Number,
  company: String,
  createdAt: Date
}
```

## Sorting Options

- **Single field**: `?sort=price` (ascending) or `?sort=-price` (descending)
- **Multiple fields**: `?sort=price,name` or `?sort=-price,name`
- **Default**: Sorted by `createdAt` if no sort parameter provided

## Numeric Filtering

Filter products using comparison operators on numeric fields (price, rating):

**Operators:**
- `>`: Greater than
- `>=`: Greater than or equal to
- `=`: Equal to
- `<`: Less than
- `<=`: Less than or equal to

**Examples:**
- `?numericFilters=price>100` - Products with price greater than 100
- `?numericFilters=price>=50,price<=200` - Products with price between 50 and 200
- `?numericFilters=rating>=4` - Products with rating 4 or higher

## Field Selection

Choose which fields to include in the response:
- `?fields=name,price` - Only return name and price
- `?fields=name,price,company` - Return name, price, and company
- Default: Returns all fields

## Pagination

Navigate through large datasets:
- `?page=1&limit=10` - First 10 results
- `?page=2&limit=5` - Results 6-10 (5 per page)
- Default: Page 1 with 10 results per page

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB