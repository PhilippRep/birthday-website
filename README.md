# Birthday Quest 💜

**Birthday Quest** ist eine interaktive Web-App, die als kleine Geburtstagsüberraschung gestaltet ist.  
Benutzer*innen durchlaufen eine Reihe von Mini-Games, am Ende erscheinen personalisierte Bilder, Musik und eine Nachricht. 

> ⚠️ Hinweis: Diese Version enthält persönliche Dateien (Bilder, Musik, Namen).  
> Andere Benutzer*innen müssen diese ersetzen, um die App für ihre eigenen Zwecke zu verwenden.
> Es gibt eine Laptop / Desktop und eine Mobile Version!

---

## 📂 Projektstruktur

docs/ ← Hauptordner für GitHub Pages
├─ index.html ← Startseite
├─ style.css ← Styling der Webseite
├─ script.js ← Logik für Quiz, Bilder und Musik
├─ [BILDER].jpg ← Platzhalter für eigene Bilder
├─ poster.jpg ← Poster oder Bild für Überraschung
└─ song.mp3 ← Platzhalter für Musik

static/ ← Hauptordner für Desktop Version
├─ style.css ← Styling der Webseite
├─ script.js ← Logik für Quiz, Bilder und Musik
├─ [BILDER].jpg ← Platzhalter für eigene Bilder
├─ poster.jpg ← Poster oder Bild für Überraschung
└─ song.mp3 ← Platzhalter für Musik
templates/
└─index.html ← Startseite
app.py
README.md

---
 
## 🎮 Aufbau und Spiele

- **Begrüßung** mit persönlichem Text
- **Memory Game**
  - Finde alle gleichen Paare (Emoyies können in JS angepasst werden)
- **Speed Challenge**
  - Klicke mind. 50 (eine selbst bestimmte Anzahl von Klicks) Mal innerhalb von 5 Sekunden)
  - Min und Max können in JS festgelegt werden, ebenso die Sekundenanzahl
- **Catch Me Button Challenge**
  - Versuche den Button 4 mal zu treffen
- **Emoyi Catcher**
    - Fange 20 herunterfallende Emoyies
- **Memory Flash Game**
  - Wiederhole eine vorgegebene Reihenfolge von Emoyies
- **Maze Game** (nur auf Desktop Version)
  - Führe die Figur durchs Labyrinth
- **Quiz**
  - Beantworte eine große Anzahl an Fragen
  - Fragen und Anzahl an Fragen können in JS bearbeitet werden
- **Geschenke Übergabe**
  - zeigt Geschenkebezeichnung, ein Bild und eine Verabschiedungszeile

---
 
## ⚙️ Anpassung für eigene Nutzung

1. **Bilder austauschen**  
   - Ersetze die JPG-Dateien im `docs/`-Ordner und oder `static/`-Ordner durch eigene Bilder.  
   - Passe die Arrays `startImages` und `endImages` in `script.js` an, damit die richtigen Bilder angezeigt werden.

2. **Musik austauschen**  
   - Ersetze `song.mp3` durch deine eigene MP3-Datei.  
   - Passe den Pfad in `index.html` an:

```html
<audio id="song" controls>
    <source src="DEINE_DATEI.mp3" type="audio/mpeg">
</audio>
```
3. **Persönliche Texte ändern**

In script.js und index.html gibt es Textstellen wie Julchen, Happy Birthday, Ticket-Texte etc.

Passe diese an, um eigene Namen, Botschaften oder Anweisungen zu verwenden.

4. **Quiz-Fragen bearbeiten**

Öffne script.js und bearbeite das Array questions.

Du kannst Fragen, Antwortmöglichkeiten und die korrekten Antworten beliebig anpassen.

🚀 Lokale Vorschau

Öffne docs/index.html im Browser, um die Webseite lokal zu testen.

Änderungen an Bildern, Musik oder Text werden sofort sichtbar.

🌐 Deployment via GitHub Pages

Wähle im Repository unter Settings → Pages den Branch main und den Ordner /docs als Source.

Nach dem Push ist die Webseite öffentlich erreichbar unter:
https://USERNAME.github.io/REPO_NAME/

⚠️ Hinweise

Sensible Daten: Persönliche Bilder, Musik oder Namen sollten für die öffentliche Version ersetzt werden.

Pfadkontrolle: Achte darauf, dass Pfade in index.html und script.js zu den neuen Dateien passen.

Flask-Nutzung: Wenn du die Seite lokal mit Flask testen willst, nutze den templates/-Ordner für HTML und static/ für CSS/JS.

GitHub Pages funktioniert nur mit statischen Dateien im docs/-Ordner oder Root.

**Viel Spaß beim Personalisieren und Verschenken deiner Birthday Quest! 💜**