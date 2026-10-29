# Refaktor portfolio — 20.09.2026

Wdrożono wspólną skalę typografii i odstępów, ciągłe tła galaktyczne oraz poprawki wszystkich sekcji strony głównej. Zachowano polską i angielską wersję oraz istniejące przejście do umiejętności.

## Zasady UI/UX i ich zastosowanie

Nie ma jednej obowiązkowej wielkości karty dla wszystkich ekranów. Przyjęta skala wynika z długości treści, czytelności i relacji między sekcjami. Wartości rosną płynnie, ale mają górne ograniczenia.

| Element | Zastosowana skala przy domyślnym rozmiarze tekstu |
| --- | --- |
| Opisy kart | 16–18 px, interlinia 1,6–1,65 |
| Tekst „O mnie”, opis hero i rozwinięta podróż | 17–20 px |
| Tytuły kart | 18–24 px; najwęższe karty kompetencji: 17 px |
| Tytuły sekcji | 28–52 px, interlinia 1,2 |
| Nazwisko w hero | do 72 px, osobne ustawienia dla telefonu |
| Daty i krótkie informacje pomocnicze | 13–15 px |
| Główny obszar kart | do 112 rem / 1792 px |
| Obszar kontaktu | do 80 rem / 1280 px |
| Odstępy wewnątrz kart | 20–32 px |
| Odstępy między kartami | 16–28 px |
| Odstępy pionowe sekcji | zwykle 56–96 px |

**Czytelność.** USWDS zaleca dla większości tekstu podstawowego co najmniej 16 px, odpowiednią interlinię i kontrolowaną długość wiersza. Dłuższa treść „O mnie” ma ograniczenie szerokości do 66 ch. Krótkie opisy kart mają krótsze wiersze, zgodnie z ich rolą w układzie. Źródło: [USWDS — Typography](https://designsystem.digital.gov/components/typography/).

**Skalowanie i reflow.** Rozmiary liter łączą jednostki rem z szerokością okna i ograniczeniami `clamp()`. Siatki przechodzą do mniejszej liczby kolumn, a wysokość kart z tekstem może rosnąć. Marginesy nie powiększają się bez końca wraz z tekstem. Zasady sprawdzono także przy szerokości 320 CSS px i dwukrotnie zwiększonym bazowym tekście. Źródła: [WCAG — Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [WCAG 2.2 — Resize Text](https://www.w3.org/TR/WCAG22/#resize-text).

**Interakcje.** Podróż nie wymaga myszy: karty są przyciskami, reagują na fokus i dotyk. Escape zamyka opis, również otwarty samym najechaniem. Stan jest przekazywany przez `aria-expanded`, a opis przez `aria-describedby`. Menu ma obszar 44 × 44 px, główne CTA co najmniej 46 px wysokości. Jest to przyjęty komfortowy rozmiar, większy od podstawowego minimum 24 CSS px w WCAG 2.2. Źródła: [Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html), [Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

**Kontrast i ruch.** Tekst ma własną ciemną powierzchnię lub przyciemnienie zdjęcia. Wygaszono nadmierną jaskrawość przycisków, zachowując jasne napisy. Preferencja ograniczenia ruchu wyłącza tilt i przemieszczające się błyski; treści nadal można otworzyć. Dla zwykłego tekstu punktem odniesienia jest kontrast 4,5:1. Źródło: [WCAG 2.2 — Contrast Minimum](https://www.w3.org/TR/WCAG22/#contrast-minimum).

## Zmiany wizualne

- Hero i sześć kafelków mają wspólne tło. Warstwa przyciemniająca hero wygasa stopniowo.
- Podróż, kompetencje, kontakt i stopka korzystają z jednej powierzchni galaktycznej. Siatka „O mnie” ma miękkie krawędzie.
- Sześć kafelków: pionowe duże ikony, mocniejszy dolny blask, przesuwający się zgodnie z ruchem zegara fragment obramowania oraz błysk po najechaniu.
- „O mnie”: mniejszy portret, delikatny hover statystyk, „Angularem i Springiem”, backend „komercyjnie od 2028”.
- Podróż: różne sceny zdjęć, spokojne punkty osi i rozświetlenie aktywnego etapu. Domyślnie data oraz wyśrodkowany tytuł; po otwarciu wyśrodkowana data i opis u dołu, z zachowanym tiltem 3D.
- Kompetencje: usunięty podtytuł, dolne hasło i kreski w kartach. Tekst zajmuje osobną lewą kolumnę. Testowanie ma zielony panel, CI/CD zielony Build, bursztynowy Test i fioletowy Deploy.
- Kontakt: ciemniejszy LinkedIn, ikony po prawej, opis wykorzystujący dostępną przestrzeń. Przy bardzo dużym tekście układ przechodzi do pionowego. Stopka pozostaje na wspólnym tle.

## Sprawdzenie

- Build produkcyjny zakończył się powodzeniem.
- 20 testów w 5 istniejących zestawach: poprawne.
- Polska i angielska wersja: 320, 390, 768, 1024, 1280, 1440, 1920, 2560 i 3840 px.
- Tekst bazowy 200%: 320, 390 i 1280 px, oba języki.
- Zwiększone odstępy liter, słów, wierszy i akapitów: 320 i 1280 px w wersji angielskiej.
- Brak wykrytych wyjść kart i tekstu poza obszar, brak brakujących grafik i surowych kluczy tłumaczeń. Tekst kompetencji nie wchodzi do kolumny obrazu.
- Sprawdzone: tilt, zamiana tytułu na opis, aktywny punkt osi, Escape, fokus, Enter, dotyk, ograniczenie ruchu, ruch obramowania, oba adresy kontaktowe i widoczny fokus kontaktu.
- 27 próbek zwykłego tekstu na tle wyrenderowanym w przeglądarce: najniższy stosunek kontrastu 7,26:1. Pomiar uwzględniał najjaśniejszy piksel pod obszarem tekstu po jego chwilowym ukryciu. Nie obejmuje całej palety gradientów i wszystkich stanów strony. Najciemniejszy kolor akcentu dodatkowo zmieniono z `#007bdc` na `#159cdf`.
- Obejrzano zrzuty sekcji mobilnych, desktopowych i przejść między sekcjami.

Pomiary wykonano w Microsoft Edge przez Playwright, z emulacją dotyku i preferencji ruchu. Powiększenie tekstu sprawdzono zmianą bazowej wielkości fontu do 200%, nie systemowym skalowaniem Windows. To weryfikacja tego zakresu zmian, a nie pełny audyt zgodności WCAG ani test fizycznych urządzeń.

Wyniki: `validation.json`, `contrast.json`, `validation.log`, `build.log`. Powtarzalne skrypty: `validate.cjs`, `contrast.cjs`, `inspect.cjs`. Zrzuty znajdują się w tym katalogu.

## Wygenerowane grafiki

Gotowe, zoptymalizowane pliki w `src/assets/HomePhotos/`:

- `journey-courses-v3.webp` — nauka z książkami, notatkami i tabletem.
- `journey-internship-v3.webp` — współpraca przy tablicy architektonicznej.
- `journey-work-v3.webp` — przestrzeń inżynierska i praca z systemami.
- `expertise-testing-v2.webp` — miętowy panel wyników testów.
- `expertise-delivery-v2.webp` — trzy etapy procesu w różnych kolorach.

Łączny rozmiar pięciu plików: około 442 KiB. Pełne prompty użyte do wygenerowania każdej grafiki zapisano w `image-prompts.json` obok tego raportu. Napisy wewnątrz ilustracji są dekoracją; właściwe opisy pozostają tekstem HTML.
