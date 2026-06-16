Warm pill action button with a springy hover lift — use for any clickable action, primary by default.

```jsx
<Button variant="primary" size="md" onClick={ship}>ship it</Button>
<Button variant="secondary" iconRight={<ArrowIcon />}>view the case study</Button>
<Button variant="ghost" size="sm">skip</Button>
<Button as="a" href="/cv" variant="outline">download cv</Button>
```

Variants: `primary` (terracotta fill), `secondary` (cream surface + border), `ghost` (transparent, tints on hover), `outline` (hairline → accent on hover). Sizes: `sm` / `md` / `lg`. Pass `iconLeft` / `iconRight` as nodes. All native button/anchor props pass through.
