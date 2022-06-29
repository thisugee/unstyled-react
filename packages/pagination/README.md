# Pagination

Unstyled pagination component for React

### Installation

```sh
npm install @unstyled-react/pagination

# or

yarn add @unstyled-react/pagination
```

### Import Component

```tsx
import { Pagination, PaginationItem } from "@unstyled-react/pagination";
```

## Usage

```tsx
<Pagination
  page={page}
  count={20}
  onChange={(page) => setPage(page)}
  itemLabels={{ previous: "Prev.", next: "Next" }}
  style={{ display: "flex", gap: "10px" }}
  renderItem={(item) => (
    <PaginationItem
      {...item}
      style={{
        outline: "none",
        border: "none",
        background: item.active ? "#fa466a" : "black",
        color: "white",
        padding: "8px 12px",
        borderRadius: "4px",
        cursor: "pointer",
        opacity: item.disabled || item.type === "ellipsis" ? "0.5" : "1",
      }}
    />
  )}
/>
```
