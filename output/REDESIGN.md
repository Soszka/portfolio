# Przebudowa sekcji portfolio — 14 września 2026

Wszystkie wskazane sekcje otrzymały nowe proporcje, tła i styl oparty na mockupach. Kafelki rosną płynnie do limitu 2200 px dla całej siatki (2320 px w sekcji kompetencji). Na małych ekranach układ przechodzi do dwóch lub jednej kolumny.

- Sześć kafelków: granatowe powierzchnie, cyjanowe obramowanie ikon, stałe mocne światło od dołu, wzmocnienie po najechaniu. Usunięto mgłę podążającą za kursorem w tej sekcji.
- O mnie: krótszy opis, animowane nazwy Angular i Spring, trzy kafelki w karcie, portret z animacją i siatka w tle.
- Moja podróż: cztery etapy z datami, nowe ilustracje, reakcja 3D z takimi samymi zakresami obrotu jak w dawnych kartach projektów. Na hover opis zanika, data rośnie i jest centrowana, nazwa zostaje przy dolnej krawędzi.
- Od interfejsu do systemu: sześć nowych ilustracji, treści według mockupu, animacja powiększenia obrazu i światła na hover.
- Kontakt: dwa rozszerzone kafelki LinkedIn i GitHub oraz kosmiczne tło ze świetlistym horyzontem.
- Nagłówki: wspólny połysk inspirowany animacją nazwiska w hero. Zachowano animację imienia i nazwiska w hero.

Przyjęto nazwy „Angular” i „Spring” zgodnie z mockupem. Kafelek backendu ma opis „Java i Spring”, bez niepewnego roku 2027. Daty podróży pochodzą z mockupu.

## Weryfikacja

- Kompilacja produkcyjna zakończona poprawnie.
- 20 istniejących testów w 5 zestawach zakończonych poprawnie.
- Przeglądarka Edge/Chromium: PL i EN przy 320, 390, 768, 1024, 1280, 1920, 2560 i 3840 px.
- Sprawdzone granice kart, brak brakujących grafik i nieprzetłumaczonych kluczy, brak błędów wykonania strony.
- Sprawdzony przechył kart, powrót po opuszczeniu kursora, ograniczenie ruchu, adresy kontaktowe i fokus klawiatury.
- [Raport kontroli przeglądarkowej](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/output/sections-final-validation.json)

## Grafiki i prompty

Wykorzystano wbudowane narzędzie imagegen. Wszystkie 10 grafik zapisano w projekcie jako WebP; łącznie 994 932 bajty. Obrazy podróży są ilustracjami koncepcyjnymi, a nie dokumentacją konkretnych miejsc pracy lub uczelni.

Pełne finalne prompty:
- [Sześć ilustracji kompetencji](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/output/imagegen/expertise-prompts.json)
- [Cztery ilustracje podróży](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/output/imagegen/journey-prompts.json)

Finalne pliki:
- [expertise-interfaces.webp](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/src/assets/HomePhotos/expertise-interfaces.webp)
- [expertise-frontend.webp](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/src/assets/HomePhotos/expertise-frontend.webp)
- [expertise-backend.webp](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/src/assets/HomePhotos/expertise-backend.webp)
- [expertise-testing.webp](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/src/assets/HomePhotos/expertise-testing.webp)
- [expertise-delivery.webp](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/src/assets/HomePhotos/expertise-delivery.webp)
- [expertise-architecture.webp](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/src/assets/HomePhotos/expertise-architecture.webp)
- [journey-studies-v2.webp](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/src/assets/HomePhotos/journey-studies-v2.webp)
- [journey-courses-v2.webp](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/src/assets/HomePhotos/journey-courses-v2.webp)
- [journey-internship-v2.webp](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/src/assets/HomePhotos/journey-internship-v2.webp)
- [journey-work-v2.webp](C:/Users/bsoch/OneDrive/Dokumenty/PROGRAMOWANIE/PROJEKTY/PORTFOLIO_PROJECT/portfolio/src/assets/HomePhotos/journey-work-v2.webp)

