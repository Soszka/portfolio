# „Moja podróż” — wariant próbny, 2026-10-31

Zakres: nowe zdjęcia i uproszczenie kształtu kart. Cztery karty, ich kolejność, treść, daty, animacje wejścia, przechylanie pod kursorem i ruch tła zachowano. Hook `src/hooks/useCardTilt.js` nie został zmieniony.

Wycinane ramki SVG zastąpiono zaokrąglonymi narożnikami 20 px, cienką obwódką i delikatną linią wewnątrz karty. Focus klawiatury nadal ma wyraźny obrys.

## Zdjęcia

Wygenerowane wbudowanym narzędziem image_gen. Prompty i ścieżki oryginałów: `images.json`. Finalne pliki projektu:

- `src/assets/HomePhotos/journey-v9/studies.webp` — notatki techniczne i książki w bibliotece.
- `src/assets/HomePhotos/journey-v9/courses.webp` — nauka programowania przy laptopie.
- `src/assets/HomePhotos/journey-v9/internship.webp` — wspólna analiza schematu aplikacji.
- `src/assets/HomePhotos/journey-v9/work.webp` — stanowisko z gotowym produktem na ekranie.

Wszystkie mają 1024×1280 px; łącznie około 397 KiB. Poprzednie obrazy v8 pozostają w repozytorium. Kadry są ilustracjami etapów, nie dokumentacją rzeczywistych miejsc czy projektów użytkownika.

## Weryfikacja

- Browser: desktop 1280 px oraz mobile 390 i 320 px; brak poziomego przewijania, tytuły mieszczą się w kartach. Jest to kontrola viewportów, nie fizycznego telefonu.
- Wszystkie cztery zdjęcia załadowane w widoku desktopowym.
- Ruch kursora w karcie „Kursy” daje obrót w obu osiach (w próbce rotateX 7.98°, rotateY 9.27°), przesunięcie zdjęcia i pojawienie się opisu. Wyjście przywraca kartę do neutralnego stanu.
- Brak błędów w konsoli sprawdzanej karty przeglądarki.
- 9 zestawów testów / 32 testy zaliczone, w tym 3 testy Journey: hover, klawiatura/Escape i przechylanie wraz z obsługą ograniczonego ruchu. Log: `tests.log`.
- `npm run build`: poprawna kompilacja. Log: `build.log`.
- `git diff --check`: poprawny.

Podglądy: `journey-desktop.jpg`, `journey-hover-desktop.jpg`, `journey-mobile-390.jpg`.
Serwer nadal działa pod http://127.0.0.1:3000/. Tymczasowy viewport przywrócono.
