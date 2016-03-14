// impedance mismatch - niedopasowanie reprezentacji danych: tabela z kolumnami i rzędami kontra obiekt; trzeba użyć ORM
// mongo - brak schematu, brak tabel i relacji między kolekcjami obiektów
// dokument mongo to obiekt
// dwa dokumenty w jednej kolekcji mogą się różnić, nie ma schematu
// skalowalność, scaling out (horyzontalny): w RDBMS trzeba blokować wiersze i tabele na czas edycji; kosztowna replikacja i sharding (horyzontalny podział danych, fragmenty bazy danych na różnych serwerach)
// rozwiązania w RDBMS: denormalizacja tabeli, relaxed consistency (np. umożliwienie odczytu w sytuacji, gdy zapis nie został jeszcze zakończony)
// rozwiązania mongo:
// 1 - brak schematu
// 2 - zapis (lock) na jednym dokumencie kolekcji - pozostałe nie są zablokowane
// 3 - eventual consistency - przy replikacji zapis w jednym miejscu - serwerze (jedna blokada), replikacja na pozostałe (można wybrać poziom spójności, program może szybciej odzyskać kontrolę kosztem początkowego braku spójności) ma miejsce z opóźnieniem
// 4- capped collection - stały rozmiar kolekcji i nadpisywanie starych dokumentów, insert i retrieve są w kolejności insertion, nie są potrzebne indeksy - jest to rodzaj cyrkularnego bufora
// durability i consistency - dwie różne rzeczy
// durability - czy dane zostały zapisane na trwałym nośniku (np. z pamięci do macierzy) przed odzyskaniem kontroli nad programem
// consistency - czy dane zostały zreplikowane na innych serwerach przed odzyskaniem kontroli nad programem
// fire & forget - przekazanie tylko do pamięci, niemal natychmiastowe odzyskanie kontroli (brak durability); ostatecznie, jeśli wszystko pójdzie dobrze, mongo zapewni durability i consistency
// dane mogą nie zostać zapisane na primary i możemy je stracić - istnieje taka możliwość
// mamy jeszcze modele spójności complete i majority
// serwery mongo mogą się komunikować różnymi kanałami, np. inne połączenie, inna aplikacja, messaging
// poziom spójności (np. opóźnienie replikacji) zależy od aplikacji i jej wymagań
// odpowiedzialność za schemat przechodzi na aplikację

// potrzebujemy folder \data\db w korzeniu
// mongod, baza nasłuchuje na porcie 27017
// jest sporo opcji w linii komend, można przygotować plik konfiguracyjny mongod.conf
// mongod -f mongod.conf
// instalacja jako usługa (ścieżka do konfiguracji musi być absolutna, ścieżki w konfiguracji również; PS lub CMD jako admin; automatyczny start z systemem):
// mongod -f C:\projects\web_projects\plmongo\mongod.conf --install
// net start mongodb
// net start | findstr Mongo
// net stop mongodb

// mongo
// ctrl + c lub exit

// aplikacja zapisuje dane do pamięci, serwer serializuje te dane i zapisuje w tablicy (humongous array) na dysku; mongo wykorzystuje Memory Mapped File
// zapis w formacie BSON
// dokument musi mieć pole _id
// rozmiar dokumentu do 16MB

// local to baza na potrzeby mongodb
// show dbs (-> local)
// db (-> test)
// use foo
// db (-> foo)
// help
// kolekcja definiuje zasięg interakcji z dokumentami
// nie można wykonywać komend do kilku kolekcji
// show collections (bieżącej bazy)
// zapisujemy do kolekcji foo (bieżącej bazy)
// db.foo.save({ _id: 1, x: 10 })
// db.foo.find()
// show dbs pokaże bazy danych, w których są jakieś kolekcje
// usuwa bieżącą bazę
// db.dropDatabase()
// nie ma kolekcji system.indexes
