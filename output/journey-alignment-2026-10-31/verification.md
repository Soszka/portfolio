# Ujednolicenie sekcji i animacji — 2026-10-31

## Końcowe zmiany

- „Moja podróż” ponownie korzysta ze zdjęć `journey-studies-v8.webp`, `journey-courses-v8.webp`, `journey-internship-v8.webp` i `journey-work-v8.webp`.
- Zachowano zaokrąglone narożniki 20 px oraz dotychczasowe bujanie, przechylanie i paralaksę. `useCardTilt.js` nie został zmieniony.
- Usunięto linię wewnątrz kart. W spoczynku obwódka jest stonowana. Na hover/focus pojawia się mocna błękitna poświata na zewnątrz oraz biało-błękitny błysk biegnący po samej krawędzi w cyklu 2,6 s, zgodnie z ostatnią referencją użytkownika.
- Galerie „Moja podróż” i „Od interfejsu do systemu” korzystają z tego samego parametru szerokości 100rem, marginesów i poziomego odstępu 1rem. Na telefonach mają wspólną maksymalną szerokość 38rem.
- Zmniejszono wysokość kart podróży: przy viewport 1920 px mają około 277 px, wobec 261 px kart kompetencji; przy 1100 px mają 248 px. Na telefonie mają 256 px, co pozwala pomieścić opis także w wersji angielskiej.
- Wspólna zmienna `--section-gap: clamp(3rem, 6vw, 7rem)` wyrównuje odstęp od treści poprzedniej sekcji do następnego nagłówka. Ujednolicono również odstęp nagłówków od treści; oś czasu ma dodatkowe miejsce na węzły.
- „Od interfejsu do systemu” ma własną animację wejścia z głębi: wygaszenie rozmycia i perspektywy, osobno dla każdego elementu. Na desktopie trwa 950 ms, na telefonie 550 ms (łagodna zmiana skali bez rozmycia). Niższe karty czekają na wejście do widoku. Warstwa wejścia jest oddzielona od hover, aby efekty nie nadpisywały swoich transformacji.
- Preferencja ograniczonego ruchu pokazuje treść od razu i zatrzymuje ruch obramowań.

## Pomiary

`measurements.json` zawiera pomiary z przeglądarki. Cztery przerwy — statystyki → O mnie, O mnie → Moja podróż, Moja podróż → Od interfejsu do systemu i kompetencje → kontakt — mają odpowiednio:

| Viewport | Każda przerwa |
| --- | --- |
| 320, 390, 768 px | 48 px |
| 1100 px | 66 px |
| 1920 px | 112 px |

Różnice lewej i prawej krawędzi obu galerii wynoszą 0 px przy wszystkich sprawdzonych szerokościach. Brak poziomego przewijania. Opisy i daty mieszczą się bez kolizji w wersji polskiej i angielskiej. Kontrola odbyła się w viewportach przeglądarki, nie na fizycznym telefonie.

## Walidacja

- 10 zestawów / 34 testy zaliczone. Dodano 2 testy wejścia kart kompetencji: oczekiwanie elementów poza widokiem oraz natychmiastowe ujawnienie przy ograniczeniu ruchu. Log: `tests.log`.
- Końcowy build produkcyjny z mocniejszą poświatą: poprawny. Log: `build.log`.
- `git diff --check`: poprawny.
- W przeglądarce potwierdzono oddzielne wejście niższych kart po przewinięciu, animację obramowania i zachowaną rotację obu osi w karcie „Praca” (próbka: rotateX 7,54°, rotateY 9,01°).
- Brak nakładki błędu kompilacji w końcowym podglądzie.

Ostateczny podgląd: `journey-galactic-hover-final.jpg`. Mobilne wejście: `expertise-mobile-reveal.jpg`. Wcześniejsze zrzuty w tym katalogu dokumentują warianty pośrednie.
Serwer pozostaje pod http://127.0.0.1:3000/. Tymczasowy viewport przywrócono do domyślnego.
