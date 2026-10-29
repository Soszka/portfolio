# Dashboard - wygląd i wydajność

## Splash, O mnie i Moja podróż — 22 października 2026

- Splash aktualizuje ruch zgodnie z odświeżaniem monitora na desktopie. Poprzedni sztywny próg 60 Hz potrafił pomijać całe klatki na monitorach 75/120/144 Hz. Zachowano limit 30 Hz na małych ekranach i urządzeniach zgłaszających mało rdzeni lub pamięci. Spoczywające sprężyny ikon nie są integrowane; stan aktywnego kursora nie jest ponownie zapisywany do DOM przy każdym ruchu myszy. Orbity, prędkość, ikony i reakcja na kursor pozostają takie same.
- Smugi w O mnie używają ciaśniej pakowanego atlasu, z zachowaniem rozmiarów poszczególnych smug i kolejności mieszania przezroczystości. Atlas może przygotować się podczas bezczynności, gdy sekcja zbliża się do widoku, przed pierwszą klatką animacji wejścia. Desktop ma docelowo 60 aktualizacji/s, telefon i skromniejsze urządzenia 30, przy tej samej prędkości pulsowania. Harmonogram używa terminów kolejnych klatek, aby nie gubić rytmu na ekranach o innym odświeżaniu. Zachowano pauzowanie poza widokiem, w ukrytej karcie oraz po włączeniu ograniczenia ruchu.
- Karty podróży odczytują geometrię najwyżej raz na klatkę, po zebraniu ostatniego zdarzenia myszy. Transformacje trafiają bezpośrednio do karty, obrazu i refleksu, zamiast zmieniać dziedziczone zmienne CSS całego poddrzewa. Refleks przesuwa i skaluje gotowy gradient; promień nadal odpowiada odległości do najdalszego rogu karty. Poświaty ramki mają dwa statyczne warianty SVG przenikające przez opacity, bez interpolowania trzech filtrów rozmycia przy hover. Wyjście wskaźnika, anulowanie gestu, ukrycie karty przeglądarki i zmiana preferencji ruchu sprzątają oczekującą klatkę.
- Podpisy kart powiększono z clamp(1.375rem, 1.12rem + .5vw, 1.875rem) do clamp(1.5rem, 1.22rem + .55vw, 2rem). Czarny gradient jest mocniejszy od 57% wysokości i osiąga pełną czerń przy 92%.

Walidacja: build produkcyjny i 29 testów w 8 zestawach. Dodano kontrolę aktualizacji ikon przy 120 Hz oraz test 101 zdarzeń myszy łączonych w jeden odczyt geometrii, anulowania klatki po opuszczeniu karty i zmiany ograniczenia ruchu podczas interakcji. Automatyczny pomiar przeglądarkowy wykonano także z czterokrotnym ograniczeniem CPU. W tym środowisku renderowanie bez typowej akceleracji GPU dominuje nad JavaScriptem; próba nie wykazała powtarzalnej poprawy FPS. Z tych pomiarów nie wynika procentowe przyspieszenie ani gwarancja płynności na sprzęcie użytkownika.

## Zachowane widoki w obu kierunkach — 13 września 2026

HomePage pozostaje zamontowany podczas wizyty w Skills. Ukryte pole ikon ma zatrzymaną pętlę i animacje CSS, a kontener jest wyłączony z interakcji i drzewa dostępności. Powrót przygotowuje ten sam widok z przekazanym zegarem jeszcze pod sceną portalu. Ostatnie 330 ms odsłania go przez opacity; zmiana routingu nie tworzy ponownie portretu, gwiazd, ikon ani dalszych sekcji. Docelowe gwiazdy nie uruchamiają ponownie animacji pojawiania przy zmianie adresu.

Skills również pozostaje zamontowany po pierwszym przygotowaniu. W czasie bezczynności ładowane są moduł, obrazy i ukryta struktura widoku. Nieaktywny portal nie rysuje klatek i nie zmienia tytułu dokumentu. Pierwsza widoczna klatka przy wejściu jest rysowana przed wyświetleniem strony, z pozycji przechwyconych z hero. Kolejna wizyta ponownie używa tego samego canvas i elementów ikon, resetując tylko przebieg podróży.

20 testów przeszło, w tym zachowanie tożsamości DOM w obu kierunkach, zatrzymanie ukrytych pętli, wznowienie bez resetu ruchu i ponowne wejście do przygotowanego portalu. Sprawdzono także oba kierunki w lokalnej przeglądarce. Opcjonalny pomiar `/?perf=return` zapisuje wynik w ukrytym elemencie `return-performance-audit`; nie działa podczas zwykłych wizyt. Próbka powrotu w podglądzie developerskim: średni odstęp 18,3 ms, p95 33,2 ms, maksymalny 100,1 ms, 2 odstępy powyżej 50 ms, 0 ms zarejestrowanych długich zadań, zachowany ten sam element home. To pomiar dostarczania klatek przez przeglądarkę w tym środowisku, a nie gwarancja stałych 60 FPS na każdym urządzeniu.

## Płynne przejścia i pięć obszarów — 12 września 2026

Moduł Skills, obie wersje galaktycznego tła oraz portret są przygotowywane w czasie bezczynności; najechanie lub fokus przycisku również uruchamia przygotowanie. Kliknięcie czeka na tę samą obietnicę ładowania, zachowując działającą stronę główną. Tekstura pierścienia jest buforowana między wejściami. Uruchamianie aplikacji przez createRoot pozwala wykorzystać startTransition podczas zmiany widoku.

Powrót zachowuje bieżący zegar obiegu, kierunek zgodny z ruchem wskazówek zegara, skalę, kołysanie i przezroczystość ikon. Scena pozostaje animowana podczas przygotowania strony głównej, która rysuje odziedziczone pozycje przed pierwszym wyświetleniem. Tło portalu i jego światło wygasają nad tłem o dopasowanym kadrowaniu i przyciemnieniu; docelowe orbity pojawiają się stopniowo. Portret ma dopasowaną wysokość. Usunięto jasną mgłę z poziomym odcięciem pod sylwetką.

Smugi ikon mają ponownie cienki rdzeń 0,85 px i słabą poświatę 2,5 px, niezależnie od powiększenia ikony. Nie używają rozmywania canvas w każdej klatce. Renderer aktualizuje wyłącznie aktywny zestaw ikon, a ich rozmiary przelicza przy zmianie ekranu. Zachowano jedną pętlę animacji, limit DPR i pauzę ukrytej karty.

Dodano Narzędzia i Umiejętności miękkie, opisy po cztery zdania w PL/EN, krótszy odcinek przewijania przed odlotem oraz magnetyczny kursor we wszystkich rozdziałach. Odbicie jest wygaszane sprężyną i nie zmienia pozycji orbitalnej. Wspólny komponent flagi zapewnia ten sam wygląd na obu stronach; dodatkowy przycisk Strona główna usunięto. Ostatni opis pozostaje czytelny do końca przewijania.

Weryfikacja: 17 testów obejmuje pięć obszarów, skróconą fazę czytania, preload, odbicie i powrót ikon, animowany powrót, widoczność karty i ograniczenie ruchu. Cykl Skills jest sprawdzany również w StrictMode. Sprawdzono widok 1440 × 900 oraz 390 × 844, flagę PL/EN i oba kierunki nawigacji. Są to kontrole zachowania i wyglądu; nie stanowią pomiaru FPS na laptopie użytkownika. Starsze wpisy poniżej opisują historię zmian.

## Portal bez dodatkowych etykiet — 12 września 2026

Usunięto boczne etykiety, przełącznik spokojnego widoku, tekstowy wybór języka, dolne skróty, licznik, pasek postępu, podtytuły i chipsy. Zostały logo, flaga języka, powrót oraz nazwa i krótki opis obszaru. Nagłówki korzystają z refleksu i poświaty w kolorze rozdziału. Systemowe ograniczenie ruchu nadal pokazuje statyczną wersję wszystkich treści, bez dodatkowego sterowania na ekranie.

Współdzielony zestaw technologii zapewnia komplet 27 ikon na wejściu. Pozycje i rozmiary ikon są przechwytywane przy kliknięciu Umiejętności, dzięki czemu scena startuje od ich położenia w hero. Początkowy tytuł i ikony kurczą się w kierunku portalu; kolejne obszary wyłaniają się z głębi, pokazują opis po zbliżeniu i krążą w fazie czytania. Ikony mają osobne opóźnienia i kierunki rozlotu przy wyjściu. Powrót przez logo lub przycisk Strona główna najpierw wykonuje animację wyłaniania ikon, przesunięcia portalu i pojawienia portretu, a dopiero potem zmienia routing.

Tekstura świetlnego pierścienia jest rysowana jednorazowo i ponownie wykorzystywana. Utrzymano jedną pętlę, limit rozdzielczości canvas i pauzę w ukrytej karcie. 12 testów przeszło; obejmują komplet ikon, wciąganie intro, przylot i rozlot, opóźnienie opisu, ciągły obieg, scroll wstecz, animowany powrót i ograniczenie ruchu. Zweryfikowano również kompilację oraz podgląd desktopowy i mobilny.

## Podróż przez umiejętności — 11 września 2026

Weryfikacja końcowa: 12 testów przeszło, kompilacja produkcyjna zakończona poprawnie. Nowy moduł podróży: 6,55 kB JavaScript i 3,33 kB CSS po gzip, ładowane przy wejściu na routing.

Routing /skills zastępuje dawną karuzelę podróżą sterowaną natywnym przewijaniem. Wejście z hero lub nawigacji przekazuje położenie portalu; środek sceny przesuwa się do centrum, a portret zanika. Trzy etapy (Frontend, Backend, DevOps) mają opisy PL/EN, własne kolory i ikony projektowane perspektywicznie. Dostępne są skróty etapów, ponowne rozpoczęcie i powrót na stronę główną. Przycisk hero prowadzi teraz do umiejętności, a link Projektów usunięto z nawigacji.

Brak nowych zależności. Moduł pozostaje ładowany na żądanie. Jedna pętla requestAnimationFrame aktualizuje kamerę i transformacje 21 ikon; stan React zmienia się wyłącznie przy zmianie etapu. Gwiazdy korzystają ze wspólnego, buforowanego obrazu poświaty. Rozdzielczość canvas ograniczono do DPR 1–1,5, liczbę gwiazd do 95/160, a renderowanie do 30 klatek na małych ekranach lub słabszych urządzeniach (60 na pozostałych). Po ukryciu karty pętla jest zatrzymywana, a po opuszczeniu routingu usuwane są obserwatory zdarzeń i zaplanowana klatka.

Preferencja ograniczonego ruchu, przełącznik „Spokojny widok” oraz niedostępny kontekst canvas prowadzą do zwykłej, przewijanej prezentacji wszystkich umiejętności. Testy obejmują przejście przez etapy i finał, przewijanie wstecz, wzrost ikon, wyjście z routingu, ukrycie karty i tryb spokojny. Ręcznie sprawdzono podgląd desktopowy, ekran 390 × 844, PL/EN, przycisk wejścia oraz powrót. Nie wykonano nowego pomiaru FPS na urządzeniu użytkownika.

## Bieżąca wersja — 11 września 2026

Ostatnia korekta: trzy uporządkowane ścieżki po dziewięć ikon, z równymi odstępami fazowymi i wspólnym tempem 0,14 rad/s (obieg około 45 s). Kursor nadaje teraz wyraźny impuls z lekkim obrotem; tłumiona sprężyna przywraca ikonę do jej ruchomego miejsca, nie zmieniając fazy obiegu. Odstęp między impulsami wynosi minimum 280 ms, a krawędzie pola odbijają ikony do środka. Siła skaluje się z wielkością ikony. Całość korzysta z dotychczasowej pętli animacji, z małymi krokami integracji dla stabilności przy niższej liczbie klatek. Nie ma wzajemnych kolizji ani parowych porównań ikon. Zostaje subtelne kołysanie, różnica rozmiarów i przelatywanie za postacią. Wspólny zegar jest wstrzymywany poza widokiem.

Nagłówek ma teraz miękką, jasną falę światła przez całe imię i nazwisko oraz osobną, delikatnie pulsującą poświatę. Cykl trwa 5,4 s. Ograniczenie ruchu wyłącza oba efekty.

Osiem testów przeszło. Testy interakcji dla odstępów klatek 20 i 40 ms potwierdzają odskok większy od średnicy ikony i powrót do bieżącej pozycji orbitalnej z błędem poniżej 1 px po sześciu sekundach. Test 30 sekund symulacji sprawdza ciągły obieg, przejścia przez środek oraz zachowanie odstępów bez nachodzenia ikon na siebie przy referencyjnym polu 720 × 620. Pozostałe opisy niżej dotyczą wcześniejszych etapów.

Portret jest stale nad warstwą ikon (z-index 3 wobec 2). Usunięto maskę alfa i wszystkie obliczenia kolizji z sylwetką. Cztery orbitalne ścieżki mają różne spłaszczenie i pochylenie, w tym ścieżki przecinające obszar za postacią. Pozostają lokalny dryf, drobne zmiany dystansu i prędkości, kolizje między ikonami oraz reakcja na kursor. Nie dodano nowej pętli animacji.

Refleks całego imienia i nazwiska trwa teraz około 4,9 sekundy w cyklu 5,2 sekundy. Na imieniu ma odcień jasnego cyjanu, żeby był widoczny również na jasnych literach. Kontakt ma wysokość 50 px na desktopie (poprzednio 66), a CV 44 px. Oba korzystają z tego samego gradientu, koloru tekstu i błysku hover/focus-visible.

Kompilacja i sześć testów przeszły; w przeglądarce potwierdzono kolejność warstw, identyczne gradienty obu przycisków i animację refleksu na imieniu. Wcześniejsze sekcje poniżej są historią zmian, nie opisem bieżącej fizyki.

## Bieżąca wersja — 10 września 2026

Najnowsza zmiana ruchu: hybryda orbitalna zamiast swobodnego chaosu. Prędkość docelowa łączy kierunek po orbicie (waga 0,7) z lokalnym dryfem (waga 0,3), uzupełniona miękką korektą odległości od ścieżki. Cztery pasy ruchu mają różne promienie i prędkości; po uderzeniu kursora powrót jest łagodniejszy przez 650 ms. Przy kolizji z sylwetką ikony odbijają się i omijają jej krawędź, aby nie blokować obiegu. Trzy mnożniki rozmiaru 0,82 / 0,96 / 1,12 tworzą głębię bez rozmycia i zachowują skalowanie z polem. Całość działa w dotychczasowej pętli z pauzowaniem; nie dodano timerów.

Dodano test 30 sekund symulacji, który sprawdza postęp ikon wokół środka i zapobiega powrotowi do niemal nieruchomych punktów. Poniższe opisy i pomiary zachowano jako historię wcześniejszych wersji.

Najnowsza korekta: ikony skalują się proporcjonalnie do mniejszego z wymiarów pola odniesionych do 720 × 620, bez wcześniejszego limitu 1,28. W przeglądarce pole 688 × 605 dawało ikonę Sass 51,6 px, a 2053 × 1805 — 153,975 px. Test potwierdza podwojenie rozmiaru ikony po podwojeniu wymiarów pola.

Orbity są nieruchome. Każdy okrąg ma własny gradient widoczności i grubość, z miejscami niemal niewidocznymi. Gwiazdy mają stałe pozycje rozproszone poza promieniami orbit; pulsuje wyłącznie przezroczystość pięciu grup, z różnymi okresami i przesunięciami czasu. Nagłówek ma refleks przechodzący od lewej do prawej co 7 sekund, a ciemniejszy Kontakt — pojedynczy błysk przy hover lub focus-visible. Logo reaguje kolorem i poświatą. Nowe animacje respektują ograniczenie ruchu i istniejące pauzowanie sekcji.

Kompilacja i pięć testów przeszły. Zweryfikowano szerokości 1280, 3787 oraz 390 px; bez poziomego przepełnienia. Pomiary płynności poniżej pochodzą sprzed tej korekty i nie są pomiarem nowych efektów.

Nowy galaktyczny mockup zastępuje skaliste wybrzeże. Tło WebP zajmuje 65 166 B (desktop) / 19 672 B (mobile). Usunięto kod w tle, dopiski, strzałkę przy przycisku oraz kropkę przy logo. Przywrócono flagę języka i link Projekty.

27 ikon ponownie porusza się swobodnie z odbiciami; nie ma sprężyny ani powrotu do stałych pozycji. Prędkość początkowa wynosi 44–64 px/s, dolny limit 38 px/s. Zmniejszono ikony i portret, pozostawiając przejście nad nim i pod nim. Każda ikona ma tę samą oprawę i żadna nie ma rozmycia. Pięć współśrodkowych okręgów i 65 gwiazd tworzy jeden element SVG.

Nowy kursor ma dwa obracające się pierścienie. Jego pozycja aktualizuje się w istniejącej pętli ikon, najwyżej raz na klatkę; nie ma osobnej pętli ani globalnego listenera ruchu. Po opuszczeniu pola pierścienie znikają i przestają się obracać. Przy ograniczeniu ruchu oraz na ekranach dotykowych pozostaje zwykły wskaźnik. Zachowano zatrzymywanie animacji poza ekranem, w ukrytej karcie i przy otwartym menu.

Kompilacja produkcyjna oraz cztery testy przeszły, w tym nowy test współdzielenia klatki przez kursor i ikonki oraz wyjścia kursora z pola. Widoki 1920 × 1080, 1280 × 720 i 390 × 844 nie mają poziomego przepełnienia.

Lokalna próbka produkcyjna z aktywnymi pierścieniami kursora, 1280 × 720, 11 sekund (klatki liczone od 3. sekundy): 464 klatki, średnio 17,2 ms, p95 17,1 ms, dwa odstępy ponad 34 ms. Po rozruchu nie było długich zadań głównego wątku. Load: 2313 ms. LCP nie został zarejestrowany w tej próbie z wczesną interakcją i nie jest raportowany jako zero. Nie ograniczano CPU ani sieci; jest to jedna próbka requestAnimationFrame, nie pełny profil GPU ani gwarancja płynności na każdym komputerze.

Dalsza część dokumentu opisuje wcześniejsze etapy; ich pomiary nie są pomiarami bieżącej wersji.

Aktualizacja: 9 września 2026 r. Na nowe zlecenie użytkownika hero odwzorowuje dostarczony mockup: większy portret i imię, bez „Hello World”, z niebieską kreską, kodem Angulara, przestrzennymi ikonami i skalistym wybrzeżem. Hero ma minimum pełną wysokość widoku; na telefonie rośnie, aby pomieścić tekst i przycisk. Zachowano 27 odbijających się ikon i wcześniejsze optymalizacje.

Nowe tło WebP zajmuje 81 772 B na komputerze i 22 930 B na telefonie. Głębię ikon tworzą statyczne cienie i transformacje CSS. Orbity to pojedynczy element SVG animowany transformacją, bez nowej pętli JavaScript. Dekoracje hero są wstrzymywane razem z polem ikon.

## Zachowany wygląd i poprawki

- Mgła zachowuje niebieską poświatę i płynne przejście między kolumnami. Jest zakotwiczona w połowie wysokości całej siatki kart. Przy 1280 × 720 siatka miała 408,70 px wysokości, a środek mgły wypadał na 204,35 px.
- „O mnie” nadal ma zdjęcie, gęste, pulsujące niebieskie smugi oraz przesuwającą się siatkę. Wygaszanie siatki pozostaje nieruchome przy krawędziach.
- Na odwrocie czterech kart „Moja podróż” nagłówek, opis i przycisk są wyśrodkowane. Przyciski mają biały tekst, niebieski gradient i zaokrąglenie 999 px.
- Tylko nad polem ikon mysz zmienia się w biało-niebieski celownik z poświatą, nawiązujący do poprzedniego kursora. Jest to natywny kursor SVG, bez pętli JavaScript, ruchomych elementów DOM ani obsługi ruchu myszy poza polem. W pozostałych sekcjach kursor pozostaje zwykły. Celownik jest statyczny i działa również przy ograniczeniu ruchu.

## Optymalizacje

Dodatkowo 9 września: ruchy myszy nad ikonami są łączone w jeden odczyt geometrii na renderowaną klatkę, z uwzględnieniem skali animacji wejścia. Próbki kolizji są przygotowane raz zamiast tworzenia nowych tablic przy każdym sprawdzeniu. Poniższe pomiary czasowe wykonano 8 września, przed tymi dodatkowymi zmianami; nie przypisujemy im niezmierzonego przyspieszenia.

Animacja „O mnie” wcześniej tworzyła gradient dla każdej smugi oraz rozmywała cały canvas w każdej klatce, również poza ekranem. Teraz przygotowuje warianty smug razem z poświatą w pamięci, a kolejne klatki tylko je nakładają. Canvas ma rozmiar widocznego elementu: w sprawdzanym układzie 620 × 528 zamiast 1280 × 720. Odświeżanie smug jest ograniczone do 30 klatek/s, przy zachowaniu czasu pulsowania. Pętla zatrzymuje się poza widokiem i w ukrytej karcie; ograniczenie ruchu pozostawia pojedynczy statyczny obraz.

Siatka w „O mnie” przesuwa gotową warstwę przez transformację zamiast zmieniać położenie tła i wymuszać ponowne rysowanie wzoru. Jej wygląd, kierunek i czas ruchu zostały zachowane.

Ikony zachowały pulsowanie, poświatę oraz odbicia od portretu, siebie i wskaźnika. Pętla jest anulowana poza ekranem, w ukrytej karcie oraz przy otwartym menu mobilnym. Obowiązuje limit 60 aktualizacji/s, a na małych ekranach i urządzeniach zgłaszających do 4 rdzeni lub do 4 GB pamięci — 30. Dane sprzętowe służą jako przybliżenie. Maska kolizji portretu ma 256 px wysokości; obliczenia najpierw odrzucają odległe obiekty, a geometria portretu jest zapamiętana.

Dekoracyjne animacje CSS w pozostałych sekcjach są wstrzymywane poza widokiem i przy ograniczeniu ruchu. Mgła przesuwa się przez transformację po wejściu w kartę, a lokalne podświetlenie karty aktualizuje się najwyżej raz na klatkę bez zmiany stanu Reacta przy każdym ruchu myszy.

Zachowano lżejsze warianty obrazów WebP i leniwe ładowanie zdjęć poniżej pierwszego widoku. Portret zajmuje 35 004 B zamiast 635 674 B; 17 ikon — 157 656 B zamiast 547 565 B; obraz „O mnie” — 66 294 B zamiast 110 277 B. Oryginalne pliki pozostają w projekcie. Kod podstron „Projekty” i „Umiejętności” jest ładowany dopiero przy wejściu na nie.

## Korekta kompozycji według drugiego porównania

Portret i kolumny dopasowano ponownie do referencji. Ikony mają ustalone miejsca wokół portretu i delikatny ruch z powrotem do tych miejsc po reakcji na kursor. Sprężyna z tłumieniem działa w istniejącej pętli, bez dodatkowego timera. Zachowano zatrzymanie animacji poza ekranem oraz preferencję ograniczenia ruchu. Zmieniono powierzchnie głównych ikon na kolorowe, a siedem ikon w tle ma stałe rozmycie. Nawigacja hero ma przełącznik PL / EN; dotychczasowa nawigacja podstron pozostaje dostępna.

Testy zatrzymywania i wznawiania animacji przeszły po zmianie ruchu. Sprawdzono 1920 × 1080 i 390 × 844 bez poziomego przepełnienia. Poniższy pomiar dotyczy poprzedniej kompozycji hero, przed tą korektą; nie przypisujemy nowej wersji niezmierzonego wyniku.

## Pomiar poprzedniej kompozycji hero — 9 września

Build produkcyjny, 1280 × 720, lokalna przeglądarka, próbka 11 s (odstępy klatek od 3. sekundy): 481 klatek, średnio 16,7 ms, p95 16,8 ms, zero odstępów ponad 34 ms. W rozruchu wystąpiły dwa długie zadania łącznie 417 ms; po 3. sekundzie zero. LCP 1888 ms, zdarzenie load 2147 ms. Bez ograniczenia CPU lub sieci i bez wymuszonego czyszczenia cache. Jest to jedna próbka requestAnimationFrame, nie gwarancja 60 FPS na słabym sprzęcie ani pełny profil GPU.

Nowy układ sprawdzono przy 1920 × 1080, 1280 × 720, 1000 × 900 i 390 × 844. Nie występuje poziome przepełnienie. Kompilacja produkcyjna, ESLint oraz trzy testy cyklu życia animacji przeszły.

## Historyczne pomiary i ich ograniczenia

Poniższe historyczne pomiary wykonano przed wdrożeniem nowego mockupu i nie opisują jego wydajności. Lokalne próby wykonano w przeglądarce aplikacji, na buildzie produkcyjnym, przy 1280 × 720. Próbka trwa 11 sekund, a odstępy między klatkami są liczone po pierwszych 3 sekundach.

Pierwsza próba dashboardu: średnio 17,1 ms, 95. percentyl 17,0 ms, jeden odstęp powyżej 34 ms. Powtórna próba z pamięcią podręczną: 17,4 ms, 95. percentyl 17,2 ms, zero odstępów powyżej 34 ms. W obu próbach po pierwszych 3 sekundach nie było długich zadań głównego wątku. LCP wyniósł odpowiednio 1700 i 636 ms — pokazuje to wpływ warunków ładowania; nie jest to dowód na konkretny procent przyspieszenia startu względem oryginału.

Pierwszy pomiar zasobów dashboardu wykazał około 1,33 MB lokalnych odpowiedzi po rozpakowaniu. Odczyty zasobów z pamięci podręcznej zwracają tu również zera, więc nie służą do porównywania wielkości aplikacji.

W „O mnie”, po optymalizacji canvas, ale jeszcze ze starym sposobem przesuwania siatki, próbka miała średnio 33,0 ms i 45 odstępów powyżej 34 ms. Po zmianie siatki i zachowaniu jej maski końcowa próbka dała 21,2 ms, 95. percentyl 33,5 ms i 6 odstępów powyżej 34 ms. Nie było długich zadań po rozruchu. To porównanie etapów tej pracy, nie pomiar względem niezmienionego oryginału. Nadal występują pojedyncze wolniejsze klatki; nie deklarujemy stałych 60 FPS.

To pomiary odstępów requestAnimationFrame, a nie kompletny profil GPU, wynik Lighthouse czy gwarancja płynności na każdym komputerze. Nie ograniczano procesora ani łącza i nie wymuszano pustej pamięci podręcznej. Podczas prób nie działał build ani testy. Wersja developerska na porcie 3000 zawiera dodatkowe narzędzia i nie ma takiej samej charakterystyki jak produkcja.

## Weryfikacja

- Kompilacja produkcyjna i ESLint przeszły.
- Trzy testy potwierdzają zatrzymanie i wznowienie ikon, zmianę preferencji ograniczenia ruchu oraz pamięć podręczną smug, limit odświeżania, zatrzymanie w ukrytej karcie i sprzątanie pętli „O mnie”.
- Sprawdzono widoki 1280 × 720, 1000 × 900 i 390 × 844. Opisy i przyciski mieszczą się na kartach; nie ma poziomego przepełnienia strony na telefonie.
- Sprawdzono polskie i angielskie opisy kart oraz przejście na podstronę projektów.

Aby powtórzyć pomiar, uruchom build produkcyjny i otwórz stronę z `?perf=1` dla dashboardu lub `?perf=about` dla automatycznego przewinięcia do „O mnie”. Po 11 sekundach wynik znajduje się w ukrytym elemencie `#performance-audit`. Bez parametru `perf` skrypt nie jest pobierany ani uruchamiany. Wyniki pozostają lokalnie.
