# UML-Diagramm: Online-Shop Proxy Pattern

## Grafische Darstellung (einfache Beziehungen)

```
┌─────────────────────────┐       ┌──────────────────────┐       ┌─────────────────────┐
│       Client            │       │   ProductProxy       │       │   ProductService    │
├─────────────────────────┤       ├──────────────────────┤       ├─────────────────────┤
│                         │ uses  │-productService       │ uses  │                     │
├─────────────────────────┤       │-productsCache[]      │       ├─────────────────────┤
│+displayProducts         │──────▶├──────────────────────┤──────▶│+getProducts()       │
│ (products: Product[])   │       │+getProducts()        │creates│                     │
└─────────────────────────┘       └──────────────────────┘──────▶└─────────────────────┘

