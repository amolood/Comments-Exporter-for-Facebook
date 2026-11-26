# Comment Exporter (for Facebook)

A Chrome extension that analyzes the comments of Facebook posts, picks giveaway winners at random from the comments that meet your conditions, and exports comments to **CSV** or **JSON**.

It adds a toolbar to every post on Facebook and shows the analysis in a panel under the post. It reads what Facebook already shows you in the page. It makes no API calls and sends nothing anywhere.

## Install

1. Open `chrome://extensions` and turn on **Developer mode**.
2. Click **Load unpacked** and select this folder.

## Use

### On each post

Every post (in the feed, groups, a post's own page, or the comments dialog) gets a toolbar at its top. Chat windows, message lists and the Messenger pages are left alone.

- **Analyze comments** loads the post's comments (opening them if needed). A progress bar shows how many have loaded, as a percentage of Facebook's own count when the post shows one. **Cancel** stops and discards the run; **Stop and show loaded** keeps what has loaded so far.
- The panel under the post has five tabs:
  - **Overview**: how much of the thread was loaded, the post's reactions, comments and shares, and totals for comments, replies, people and reactions
  - **People**: the most active commenters
  - **Comments**: the most reacted and most replied comments
  - **Words**: the most used words (common English/Arabic filler words are skipped) and emojis
  - **Giveaway**: the winner draw, below
- **CSV / JSON** download that post's comments, analyzing it first if needed.

The options you set in the popup (replies, "See more", "All comments", max comments) apply here too. One analysis runs at a time.

### Giveaway draw

**Pick winners** analyzes the post, then opens the Giveaway tab. Set:

| Setting | Meaning |
| --- | --- |
| Number of winners / backup winners | Backups are drawn in order, for when a winner doesn't respond |
| Comment must contain | Words or hashtags, comma separated; match any or all. Arabic diacritics and alef forms are ignored, so اشتراك matches إشتراك |
| Tagged friends, at least | Profile links tagged in the comment |
| Words in comment, at least | Filters out empty or one-word comments |
| Comments only | Skip replies |
| One entry per person | Off: each qualifying comment is one entry, so more comments mean more chances. A person never wins twice either way |
| Exclude the post author / these people | Names or profile links, one per line |

Winners are drawn with the browser's cryptographic random generator (`crypto.getRandomValues`) and a Fisher–Yates shuffle. The result shows how many entries qualified and why the rest didn't, and you can copy it as text or download the winners or all eligible entries as CSV. Your conditions are remembered.

### From the popup

1. Open a post: its own page, or the post dialog with the comments showing.
2. Click the extension icon, choose your options, and press **Export**.
3. The extension switches to "All comments" and keeps clicking "View more comments" and "View replies" until it has loaded everything, then downloads the file. You can close the popup while it works. Press **Stop** to export what has loaded so far.

### Options

| Option | Meaning |
| --- | --- |
| Format | CSV (with a UTF-8 BOM so Excel shows Arabic correctly), JSON, or both |
| Max comments | Stop after this many comments (0 = all) |
| Include replies | Also load and export replies |
| Expand long comments | Click "See more" so you get the full text |
| Switch to "All comments" | Facebook's default "Most relevant" view hides some comments |

### Output fields

`id, parentId, type (comment/reply), author, authorUrl, authorId, text, mentions, reactions, replies, time, permalink`

The JSON file also has a `summary`: totals, unique authors, top 10 commenters, the top 5 comments by reactions and by replies, and the most used words and emojis.

## Notes

- This reads the page, so a Facebook layout change can break it. The selectors are in [content/scraper.js](content/scraper.js) (comments) and [content/post-tools.js](content/post-tools.js) (finding posts, post counts).
- The button text it looks for is in English and Arabic. If Facebook is set to another language, it can still read the comments that are already loaded, but it may not click the "View more" buttons. Add patterns to `EXPAND` to fix that.
- `time` is the relative label Facebook shows, such as "2h" or "1w".
- `replies` counts only the replies that were loaded and exported.
- `mentions` counts the profiles tagged in the comment.
- The UI font is [Readex Pro](https://github.com/ThomasJockin/readexpro) (SIL Open Font License, see [fonts/OFL.txt](fonts/OFL.txt)), bundled because Facebook blocks font CDNs.

## Development

```sh
npm install
npm test   # runs the scraper and the post toolbar against fixtures in jsdom
```
