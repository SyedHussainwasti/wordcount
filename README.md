# Word Counter

Live text statistics — words, characters (with/without spaces), sentences, paragraphs and estimated reading time, updating as you type.

## How to use

Open `index.html` in any browser. Type or paste text — every stat updates on each keystroke. **Load sample** fills in demo text, **Clear** resets.

## How it works

- **Words**: trimmed text split on any whitespace run.
- **Characters**: raw length; "no spaces" strips all `\s` first.
- **Sentences**: split on `.` `!` `?` `…` runs, empty fragments dropped.
- **Paragraphs**: split on blank lines, empty fragments dropped.
- **Reading time**: words ÷ 200 wpm, shown as seconds or minutes.

Single self-contained file — HTML, CSS and JS inline. No libraries, no network requests, works offline.
