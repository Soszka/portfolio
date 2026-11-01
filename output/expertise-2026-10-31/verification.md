# Poprawa uruchamiania i kart — 31 października 2026

## Uruchamianie

Przeglądarka potwierdziła rzeczywisty błąd: `Invalid hook call`, wyjątek przy `useContext` oraz konflikt pluginu ESLint `react`. W `node_modules` znajdowały się jednocześnie zwykłe zależności npm i dowiązania do drzewa `.pnpm`.

Wykonano czystą instalację `npm ci`. React, React DOM, react-i18next, React Redux i MUI rozwiązują teraz Reacta do tego samego pliku. W projekcie wskazano npm jako menedżer pakietów; aktywnym plikiem blokady jest `package-lock.json`. Poprzednie metadane pnpm i Yarn zachowano w `output/dependency-repair-2026-10-31/`.

`npm start` korzysta z `scripts/start.cjs`: sprawdza zależności i tożsamość Reacta, wypisuje adres, rozpoznaje działające już portfolio oraz zgłasza błąd, gdy port zajmuje inna usługa. Sprawdzono start nowego serwera, ponowne uruchomienie przy aktywnym portfolio i przypadek portu zajętego przez obcą aplikację. Serwer developerski pozostawiono pod http://127.0.0.1:3000.

## Końcowy wygląd kart po korekcie

- Obrazy wypełniają całą kartę. Mocniejszy, płynny gradient przyciemnia górną lewą część; opis ma 17 px na szerokim ekranie i 16 px na telefonie.
- Nie ma numerów, kresek, przycisków ze strzałkami, orbit ani kropek. Usunięto także dodatkową warstwę tła sekcji dodaną w pierwszym podejściu.
- Backend: standardowe barwy znaku Javy, większe logo Javy i Springa, grafitowe serwery oraz zielone i ciepłe akcenty.
- Architektura: nowa grafitowo-bursztynowa kompozycja, jasne symbole modułów, ograniczony niebieski.
- Interfejsy: na kolejne zlecenie użytkownika przygotowano wersję bursztynową, spójną z backendem i architekturą. Frontend, testowanie i CI/CD zachowują swoje niebieskie grafiki.
- Układ desktopowy: Frontend / Interfejsy / Testowanie w pierwszym rzędzie, Backend / CI/CD / Architektura w drugim. Kolory tworzą układ niebieski–bursztynowy–niebieski / bursztynowy–niebieski–bursztynowy. Przy dwóch kolumnach również zachowano przemienność kolorów; na telefonie kolory przeplatają się w jednej kolumnie.

## Aktywne obrazy

Grafiki wykonano wbudowanym narzędziem `image_gen` na podstawie dostarczonego mockupu. Finalne zasoby WebP mają po 1536 × 768 px. Oryginały generacji pozostawiono w katalogu obrazów Codex; aplikacja korzysta wyłącznie z plików w projekcie:

- `src/assets/HomePhotos/expertise-v4/interfaces.webp`
- `src/assets/HomePhotos/expertise-v3/frontend.webp`
- `src/assets/HomePhotos/expertise-v4/backend.webp`
- `src/assets/HomePhotos/expertise-v3/testing.webp`
- `src/assets/HomePhotos/expertise-v3/delivery.webp`
- `src/assets/HomePhotos/expertise-v4/architecture.webp`

Pełne prompty, źródła i ścieżki wyników zapisano w `image-prompts.json` (pierwsze sześć grafik), `revision-prompts.json` (poprawki backendu i architektury) oraz `interfaces-amber-prompt.json` (bursztynowe interfejsy i końcowa kolejność), w tym samym katalogu co ten raport.

## Weryfikacja

- Końcowy `CI=true npm run build`: sukces, bez ostrzeżeń kompilatora.
- Końcowe testy: 9 zestawów, 32 testy, wszystkie zaliczone.
- Przeglądarka Chromium: strona renderuje się po naprawie; w czystej karcie brak błędów i ostrzeżeń konsoli.
- Sprawdzone widoki 1920, 1280, 390 i 320 px oraz polskie i angielskie treści. Po korekcie typografii potwierdzono zapas miejsca pod opisami na desktopie i przy szerokości 390 px.
- Wszystkie sześć obrazów ładuje się poprawnie. Sekcja nie zawiera dodatkowych kontrolek ani dekoracyjnego SVG.
- Aktualny zrzut całej sekcji: `expertise-desktop-final.jpg`; zrzut telefonu: `expertise-mobile-final.jpg`. Wcześniejsze zrzuty w tym katalogu dokumentują poprzednie etapy.
