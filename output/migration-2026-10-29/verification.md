# Weryfikacja po migracji — 29 października 2026

- Środowisko: Windows, Node.js 26.13.0, npm 11.20.0.
- React i React DOM: 19.3.1, zgodnie z tagiem `latest` w rejestrze npm w dniu aktualizacji.
- Zainstalowane zależności; zaktualizowane pliki blokad npm i Yarn.
- Material UI 4 zastąpione przez MUI 9.5.0; React Redux 9.3.1 i Redux 5.0.1.
- Usunięte nieużywane zależności blokujące aktualizację Reacta. `react-transition-group` zadeklarowane bezpośrednio; animacje korzystają z jawnych referencji DOM.
- `CI=true npm run build`: sukces, bez ostrzeżeń kompilatora.
- `npm test -- --watchAll=false --runInBand --silent`: 9 zestawów, 32 testy, wszystkie zaliczone. Trzy nowe testy sprawdzają opisy projektów, okno mobilne i przejścia karuzeli na React 19.
- Przeglądarka Chromium: sprawdzone widoki 1280 × 720, 1920 × 1080 i 390 × 844; bez poziomego przepełnienia strony i brakujących załadowanych obrazów.
- Sprawdzone PL/EN, menu mobilne, wejście do umiejętności, przewijanie rozdziałów, animowany powrót, filtry projektów, zakładki mobilne, otwieranie/zamykanie szczegółów, kontakt i stopka.
- Oba lokalne pliki CV odpowiadają HTTP 200 jako `application/pdf`; podstrony developerskie odpowiadają HTTP 200 przy żądaniach przeglądarkowych z `Accept: text/html`.
- Gotowy build sprawdzony również przez osobny lokalny serwer statyczny: strona główna oraz bezpośrednie wejście na `/projects` i `/skills`, włącznie z ładowaniem osobnych paczek kodu. Bez błędów konsoli w sprawdzonych widokach.
- Serwer developerski pozostawiony pod `http://127.0.0.1:3001`; tymczasowy serwer produkcyjny na 4173 zatrzymany po weryfikacji. Port 3000 był zajęty przed uruchomieniem podglądu.

## Pozostałe ograniczenia

Po zastosowaniu zgodnych poprawek `npm audit` zgłasza 33 pozycje: 16 low, 7 moderate, 10 high, bez critical. Audyt produkcyjny (`--omit=dev`) zgłasza tylko dwie pozycje moderate: `react-router` i `react-router-dom` 6.30.6. Pozostałe dotyczą drzewa narzędzi developerskich Create React App 5. Ich pełne usunięcie wymaga osobnej migracji konfiguratora/testów i Routera. Nie zastosowano niszczącej narzędzia propozycji `npm audit fix --force`.

Testy przeglądarkowe obejmowały lokalną przeglądarkę Chromium. Nie wykonano testów Firefox/Safari, porównania piksel po pikselu ani pomiaru FPS na sprzęcie użytkownika. Fonty Lato i Roboto korzystają z Google Fonts i mają zastępcze fonty lokalne.

Zrzuty: `home-desktop-production.jpg`, `home-mobile.jpg`, `skills-mobile.jpg`, `contact-mobile.jpg`.
