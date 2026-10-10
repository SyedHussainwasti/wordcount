// A shortcut: $('input') grabs the page element with id="input".
const $ = id => document.getElementById(id);

// analyze() counts everything in the given text and returns the numbers.
function analyze(text){
  // Trim blank space off the start and end of the text.
  const trimmed = text.trim();
  // Count words: split on any whitespace. Empty text means 0 words.
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  // Characters: the full length of the text, spaces included.
  const chars = text.length;
  // Characters with every whitespace removed.
  const charsNoSpaces = text.replace(/\s/g,'').length;
  // Sentences: split on . ! ? … marks and drop the empty pieces.
  const sentences = trimmed
    ? trimmed.split(/[.!?…]+/).map(s=>s.trim()).filter(Boolean).length
    : 0;
  // Paragraphs: split on blank lines and drop the empty pieces.
  const paragraphs = trimmed
    ? trimmed.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean).length
    : 0;
  // If there is text but no blank lines, it is still one paragraph.
  const paras = paragraphs === 0 && trimmed ? 1 : paragraphs;
  // Reading speed: assume 200 words per minute.
  const wpm = 200;
  // Turn the word count into total seconds of reading time.
  const totalSec = Math.round(words / wpm * 60);
  let read;
  // No words at all: show 0s.
  if (words === 0) read = '0s';
  // Under a minute: show seconds, but at least 1s.
  else if (totalSec < 60) read = Math.max(totalSec,1) + 's';
  else {
    // A minute or more: show minutes and seconds, like 2m 15s.
    const m = Math.floor(totalSec/60), s = totalSec % 60;
    read = s ? m + 'm ' + s + 's' : m + 'm';
  }
  // Hand back all the counts together as one bundle.
  return { words, chars, charsNoSpaces, sentences, paragraphs: paras, read };
}

// render() counts the text and writes the numbers into the stat boxes.
function render(){
  // Count everything currently in the text box.
  const a = analyze($('input').value);
  // Write each number into its box (with thousand separators, like 1,234).
  $('s-words').textContent = a.words.toLocaleString();       // words box
  $('s-chars').textContent = a.chars.toLocaleString();       // characters box
  $('s-charsns').textContent = a.charsNoSpaces.toLocaleString(); // no-spaces box
  $('s-sent').textContent = a.sentences.toLocaleString();    // sentences box
  $('s-para').textContent = a.paragraphs.toLocaleString();   // paragraphs box
  $('s-read').textContent = a.read;                           // reading-time box
}

// Re-count every time the text changes.
$('input').addEventListener('input', render);
// Clear button: empty the box, re-count, and put the cursor back in the box.
$('btn-clear').addEventListener('click', ()=>{ $('input').value=''; render(); $('input').focus(); });
// Sample button: fill the box with example text, then re-count.
$('btn-sample').addEventListener('click', ()=>{
  $('input').value =
`The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet!

Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump?

Writing clearly is a skill. Short sentences help. So do concrete examples.`;
  render();
});
// Count once when the page first loads, so the boxes show 0.
render();
