# Habesha Learn — Grade 11 (Economics · IT · Geography · History)

A Duolingo-style, offline, gamified study app built from your four Grade 11
textbooks. No frameworks, no build step — plain HTML/CSS/JS so it's easy to
open, edit, and convert to a real Android app.

## What's inside
```
index.html      the app shell
style.css       all styling & animations
app.js          app logic (state, lessons, XP, streaks, sound, confetti…)
content.js      ← all quiz questions live here, organized by subject/unit/lesson
manifest.json   makes it installable as a PWA
sw.js           service worker — caches everything so it works with zero signal
icons/          app icons
```

## What's actually built out right now
To keep quality high, **Unit 1 of every subject is fully built** with real,
accurate questions pulled from your textbooks (Economics: consumer theory;
IT: data/information/knowledge/wisdom & information systems; Geography:
formation of the continents; History: history & historiography) — 12 lessons,
~65 questions total, each with an explanation shown after you answer.

Every other unit (all 30 remaining units across the 4 books) is **already
listed on the learning path** in the correct order from the real table of
contents, marked "Coming soon," so the whole year is visible as a roadmap.
This was a deliberate scope choice: writing accurate, well-explained
questions for all ~900 textbook pages in one pass would mean shallow,
lower-quality content everywhere instead of a genuinely solid start.

**To extend it:** open `content.js` — each lesson is a small, self-contained
object. Copy the shape of an existing lesson, paste it into any unit's empty
`lessons: []` array, and it appears on the path automatically — no other
code changes needed. If you'd like, come back and ask me to generate the
next unit (or all of them) for any subject — I can keep filling this in,
subject by subject, in the same format.

## Try it right now (no install needed)
Just open `index.html` in any browser — it works immediately, fully offline,
no server required.

To test it like a real installable app (recommended before converting to
APK): serve the folder locally, e.g.
```bash
cd habesha-learn
python3 -m http.server 8080
```
then open `http://localhost:8080` on your phone or computer. On Android
Chrome you'll see an "Install app" / "Add to Home screen" prompt — that's
the PWA already working as an app icon.

---

## Converting it to an APK

You have two good options. **Option A (Capacitor)** is the one I'd
recommend for you, because it bundles all the files *inside* the APK itself
— the app never needs to reach a server, ever, not even on first launch.
**Option B (PWABuilder)** is faster and needs no coding tools installed, but
Android's wrapper technology (Trusted Web Activity) expects the app to be
reachable at a real web address, at least the first time.

### Option A — Capacitor (fully offline, most reliable)

Requirements: [Node.js](https://nodejs.org) and
[Android Studio](https://developer.android.com/studio) (both free).

```bash
# 1. From inside the habesha-learn folder:
npm init -y
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli

# 2. Initialize Capacitor (app name + package id — pick your own id)
npx cap init "Habesha Learn" "com.yourname.habeshalearn" --web-dir="."

# 3. Add the Android platform
npx cap add android

# 4. Copy your web files into the native project & open it
npx cap sync android
npx cap open android
```
Android Studio will open the generated project. Then:
1. Let Gradle finish syncing (first time takes a few minutes).
2. Menu: **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
3. Your APK appears under `android/app/build/outputs/apk/debug/app-debug.apk`.
4. Copy that file to your phone (USB, Google Drive, Telegram — anything)
   and tap it to install. You may need to allow "Install unknown apps" for
   that source in Android Settings the first time.

For a Play-Store-ready **signed** release APK/AAB instead of a debug build,
use **Build → Generate Signed Bundle / APK** and follow Android Studio's
wizard to create a signing key (keep that key file safe — you'll need the
same one for every future update).

### Option B — PWABuilder (no coding tools, fastest)

1. Host the folder somewhere public for free — the easiest is
   [Netlify Drop](https://app.netlify.com/drop): just drag the whole
   `habesha-learn` folder onto the page and it gives you a live URL in
   seconds, no account needed. (GitHub Pages or Vercel work too.)
2. Go to [pwabuilder.com](https://www.pwabuilder.com), paste that URL, and
   click **Start**.
3. PWABuilder scans `manifest.json` and `sw.js` (already set up for you) and
   shows a readiness score. Click **Package for stores → Android**.
4. Download the generated package, which includes an installable APK.
5. Copy it to your phone and install it, same as above.

Because this method wraps a live web address, keep the Netlify link (or
wherever you hosted it) online — the service worker will still let the app
run offline after the first launch, but it's the extra safety net Option A
doesn't need.

---

## Notes on the design
- **Kaldi**, the mascot, is a small Ethiopian-wolf-inspired character (drawn
  as inline SVG — no image files, so it's crisp at any size and adds zero
  load time).
- The XP ring on the results screen is styled after a coffee cup filling up
  — a nod to Ethiopia's own coffee-ceremony tradition of pacing, patience,
  and community, which felt more fitting than a generic progress bar.
- All sound effects are synthesized in-browser (Web Audio), so there are no
  audio files to download or bundle — another reason this stays lightweight
  and fully offline.
- Everything (XP, streak, hearts, completed lessons, badges) is saved to
  the device only, in `localStorage` — there's no account and nothing is
  sent anywhere.
