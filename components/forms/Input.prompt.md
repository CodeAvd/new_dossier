Warm text field with a mono label and accent focus glow. Use for forms and the contact section.

```jsx
<Input label="email" type="email" placeholder="you@domain.com" />
<Input label="message" multiline placeholder="what are you building?" />
<Input label="handle" error hint="already taken" defaultValue="avdeev" />
```

`multiline` swaps to a textarea. `iconLeft` adds a leading glyph. `error` + `hint` show validation state.
