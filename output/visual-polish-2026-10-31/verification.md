# Poprawki animacji, czytelności i routingu — 2026-10-31

## O mnie

Przyczyną ucięcia okręgu był `clip-path` obejmujący cały portret: podczas animacji miał pionowe granice kontenera, a po zakończeniu przechodził na `none`. Na mniejszych ekranach okrąg był wyższy od kontenera.

Maska nadal odsłania portret na boki, ale ma pionowy zapas od pierwszej do ostatniej klatki. Kontener portretu rezerwuje dodatkowo promień okręgu z jego poświatą. Rozmiar twarzy i canvasa pozostał taki sam. Dzięki temu okrąg nie nachodzi na sąsiednią kartę ani nagłówek.

`portrait-geometry.json` zapisuje pomiary w trakcie i po animacji oraz viewporty 320, 390, 768, 1024 i 1920 px. Przy 768 px górna krawędź poświaty wynosiła 258,89 px, dolna 821,44 px zarówno podczas animacji, jak i po niej. Pierścień zachował średnicę 490,55 px. Zmieniała się tylko zamierzona pozycja pozioma.

Usunięto element i style ozdobnych narożników karty.

## Pozostałe zmiany

- Wejście kart kompetencji: naprzemienny ruch poziomy, większy ruch pionowy, głębia 3D, obrót w dwóch osiach i lekkie odbicie. Czas 1,4 s na desktopie / 1 s na mobile. Zachowano osobne wyzwalanie niższych kart, niezależny hover i preferencję ograniczonego ruchu.
- Daty podróży mają własne niewielkie ciemne tło z rozmyciem 6 px oraz mocniejszą czcionkę. Dotychczasowe przesunięcie daty na hover zachowano. W wąskim układzie czterech kart przy 1100 px pozostał dodatni odstęp między datą a opisem (minimum 7,75 px).
- Import lazy i trasa Projects są zakomentowane; pliki komponentów zachowano. Nieobsługiwane trasy, w tym `/projects` i jego podścieżki, przekierowują na `/`. Ręczne wejście do `/projects` w przeglądarce zakończyło się na stronie głównej; nie ma aktywnych linków do tej trasy.
- Stopka ma jeden wyśrodkowany blok: animowany podpis Bartłomiej Socha, bieżący rok i prawa autorskie. Usunięto Software Engineer. Podpis ma większą czcionkę, mocniejszą poświatę i ruchomy refleks; animacje zatrzymują się poza widokiem i przy ograniczonym ruchu. Na mobile blok zawija się do dwóch wyśrodkowanych wierszy.

## Walidacja

- 10 zestawów / 36 testów zaliczone, w tym dwa nowe przypadki wejścia na wyłączone trasy `/projects` i `/projects/legacy`. Log: `tests.log`.
- Końcowy build produkcyjny: poprawny. Log: `build.log`.
- `git diff --check`: poprawny.
- Viewporty 320–1920 px: brak poziomego przewijania; pełny pionowy zasięg poświaty portretu mieści się w przeznaczonym miejscu (z tolerancją zaokrąglenia poniżej 0,01 px).
- Brak błędów w konsoli końcowego podglądu i brak nakładki błędu kompilacji.
- Tymczasowy viewport przywrócono do normalnego rozmiaru; serwer nadal działa pod http://127.0.0.1:3000/.

## Podglądy

- `about-desktop-final.jpg` — cała sekcja, karta bez narożników.
- `about-tablet-entering-fixed.jpg`, `about-tablet-final.jpg` — wejście i końcowy stan portretu.
- `about-mobile-entering-fixed.jpg`, `about-mobile-final.jpg` — analogiczna kontrola na telefonie.
- `journey-dates-final.jpg` — czytelniejsze daty.
- `expertise-entering-desktop.jpg`, `expertise-desktop-final.jpg` — początek i koniec wejścia kart.
- `footer-mobile-390.jpg`, `footer-desktop-final.jpg` — nowa stopka.

Starsze pliki `about-tablet-entering.jpg` i `about-tablet-finished.jpg` pokazują pośredni etap poprawki przed dodaniem miejsca na poświatę.
