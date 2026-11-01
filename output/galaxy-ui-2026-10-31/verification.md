# Kontrola zmian — 31.10.2026

- `npm test -- --watchAll=false --runInBand`: 40 testów, 10 zestawów, wszystkie zaliczone.
- `npm run build`: kompilacja produkcyjna zakończona powodzeniem.
- `git diff --check`: bez błędów.
- Przeglądarka: szerokości 320, 390, 768, 1280 i 1920 px; brak poziomego przepełnienia. Kontakt sprawdzony po polsku i angielsku na telefonie.
- Nawigacja „Kontakt” zamyka menu mobilne, czeka na ustabilizowanie wysokości nawigacji i przewija do sekcji. Regresja objęta testem.
- Splash: React usunięty z ikon tego widoku; Angular, TypeScript, Java i Spring większe, na czterech oddalonych pozycjach. Testy sprawdzają hierarchię, odległości i ciągły ruch bez kolizji.
- Przyciski Umiejętności/CV: przezroczyste tło, świetlista ramka, dotychczasowy błysk na hover; etykiety bez zmian i bez nowych strzałek.
- Kafelki statystyk: mocniejsza ramka na hover. Journey/Expertise: dodatkowe lokalne przyciemnienia pod tekstem; pliki zdjęć i ich wybór bez zmian.
- Kontakt: CSS/SVG z istniejącymi ikonami, niezależna animacja wejścia obu kart, unoszenie ikon i animacja obwódki. Przy ograniczeniu ruchu animacje są wyłączane.
- Stopka: imię i nazwisko, rok oraz prawa autorskie mają wspólne 13 px i wagę 400; układ wyśrodkowany.
- Konsola podczas końcowej kontroli: brak ostrzeżeń i błędów.
- Tymczasowa zmiana rozmiaru przeglądarki została zresetowana; serwer lokalny pozostaje uruchomiony.

Podglądy: `splash-desktop-1920.jpg`, `contact-desktop.jpg`, `contact-desktop-1920.jpg`, `contact-tablet-768.jpg`, `contact-mobile-390.jpg`, `contact-mobile-320-en.jpg`.
