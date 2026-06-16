Playful sun/moon dark-mode switch with a springy sliding knob. Uncontrolled by default — flips `[data-theme]` on `<html>` and remembers the choice.

```jsx
<ThemeToggle />
// controlled:
<ThemeToggle checked={dark} onChange={setDark} />
```

Drop it in the header. Toggling is instant; the warm-dark palette is already wired in the tokens.
