# Hover i układ mobilny — 2026-10-31

## Zmiany

- Karty „Od interfejsu do systemu”: błysk biegnący po ramce, błękitny lub bursztynowy zależnie od ilustracji. Na hover obraz zbliża się i lekko przyciemnia, a za ilustracją miękko narasta rozproszona poświata. Prostokątna smuga i dodatkowa kopia obrazu zostały usunięte zgodnie z ostatnią uwagą.
- Efekty hover działają od 53rem i tylko dla precyzyjnego wskaźnika obsługującego hover. Preferencja ograniczonego ruchu wyłącza ruch ramki i przejścia.
- Statystyki do 52rem mają dwa wiersze: ikona z nazwą i liczba, następnie opis na całą szerokość. Karty nie mają już wymuszonej dużej wysokości.
- Na mobile animacja wejścia statystyk trwa 550 ms, bez rozmycia. Liczniki nadal uruchamiają się przy wejściu danej karty w widok.
- Odstęp między CTA splasha i pierwszą kartą statystyk wynosi 40 px zamiast 120 px przy szerokości 390 px. Wysokość kart to 157–181 px zamiast około 283 px.
- Jawna szerokość kart ilustracyjnych zapobiega rozpychaniu kolumn przez ich minimalną wysokość i proporcje.

## Weryfikacja

- Przeglądarka, viewporty 320×800, 390×844, 768×1024 i 1440×1000. Jest to weryfikacja responsywności w przeglądarce, bez testu na fizycznym telefonie.
- Polski i angielski układ statystyk przy 320 px: brak poziomego przewijania i kolizji nagłówków z metrykami.
- Przy 390 px wszystkie liczby są w pierwszym wierszu kart; opisy zajmują drugi wiersz. Przewijanie ujawnia kolejne karty i uruchamia liczniki.
- Przy 320 i 390 px wszystkie opisy kart ilustracyjnych mieszczą się wewnątrz kart; przy 768 px karty mieszczą się w kolumnach.
- Na desktopie potwierdzono aktywny hover, animację zmieniającego się kąta błysku ramki, zbliżenie, przyciemnienie i radialną poświatę. Na wąskim ekranie hover nie uruchamia efektów kart ilustracyjnych.
- Brak błędów w konsoli sprawdzanej karty przeglądarki.
- `npm test -- --watchAll=false --runInBand`: 9 zestawów, 32 testy zaliczone. Log: `tests.log`.
- `npm run build`: poprawna kompilacja produkcyjna. Log: `build.log`.
- `git diff --check`: poprawny.

## Podglądy

- `expertise-hover-soft-glow-desktop.jpg` — ostateczny hover po usunięciu smugi.
- `achievements-mobile-390.jpg` — mobilne statystyki i skrócony odstęp pod splashem.
- `expertise-hover-desktop.jpg` — wcześniejszy wariant, sprzed ostatniej uwagi użytkownika.

Serwer deweloperski pozostaje dostępny pod http://127.0.0.1:3000/. Tymczasowy rozmiar viewportu przywrócono do domyślnego.
