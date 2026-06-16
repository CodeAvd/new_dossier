Segmented pill nav with a springy sliding indicator — section nav, view switchers, filters.

```jsx
<PillNav items={["work", "about", "writing", "contact"]} defaultValue="work" />

<PillNav
  items={[{id:"all",label:"all"},{id:"agents",label:"agents"},{id:"quant",label:"quant"}]}
  value={tab}
  onChange={setTab}
/>
```

Accepts plain strings or `{id,label}` objects. Controlled (`value`+`onChange`) or uncontrolled (`defaultValue`).
