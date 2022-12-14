"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/hu_bcv_parser.js").bcv_parser;
    describe("Parsing", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.options.osis_compaction_strategy = "b";
            return p.options.sequence_combination_strategy = "combine";
        });
        it("should round-trip OSIS references", function () {
            var bc, bcv, bcv_range, book, books, i, len, results;
            p.set_options({
                osis_compaction_strategy: "bc"
            });
            books = ["Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1Sam", "2Sam", "1Kgs", "2Kgs", "1Chr", "2Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1Cor", "2Cor", "Gal", "Eph", "Phil", "Col", "1Thess", "2Thess", "1Tim", "2Tim", "Titus", "Phlm", "Heb", "Jas", "1Pet", "2Pet", "1John", "2John", "3John", "Jude", "Rev"];
            results = [];
            for (i = 0, len = books.length; i < len; i++) {
                book = books[i];
                bc = book + ".1";
                bcv = bc + ".1";
                bcv_range = bcv + "-" + bc + ".2";
                expect(p.parse(bc).osis()).toEqual(bc);
                expect(p.parse(bcv).osis()).toEqual(bcv);
                results.push(expect(p.parse(bcv_range).osis()).toEqual(bcv_range));
            }
            return results;
        });
        it("should round-trip OSIS Apocrypha references", function () {
            var bc, bcv, bcv_range, book, books, i, j, len, len1, results;
            p.set_options({
                osis_compaction_strategy: "bc",
                ps151_strategy: "b"
            });
            p.include_apocrypha(true);
            books = ["Tob", "Jdt", "GkEsth", "Wis", "Sir", "Bar", "PrAzar", "Sus", "Bel", "SgThree", "EpJer", "1Macc", "2Macc", "3Macc", "4Macc", "1Esd", "2Esd", "PrMan", "Ps151"];
            for (i = 0, len = books.length; i < len; i++) {
                book = books[i];
                bc = book + ".1";
                bcv = bc + ".1";
                bcv_range = bcv + "-" + bc + ".2";
                expect(p.parse(bc).osis()).toEqual(bc);
                expect(p.parse(bcv).osis()).toEqual(bcv);
                expect(p.parse(bcv_range).osis()).toEqual(bcv_range);
            }
            p.set_options({
                ps151_strategy: "bc"
            });
            expect(p.parse("Ps151.1").osis()).toEqual("Ps.151");
            expect(p.parse("Ps151.1.1").osis()).toEqual("Ps.151.1");
            expect(p.parse("Ps151.1-Ps151.2").osis()).toEqual("Ps.151.1-Ps.151.2");
            p.include_apocrypha(false);
            results = [];
            for (j = 0, len1 = books.length; j < len1; j++) {
                book = books[j];
                bc = book + ".1";
                results.push(expect(p.parse(bc).osis()).toEqual(""));
            }
            return results;
        });
        return it("should handle a preceding character", function () {
            expect(p.parse(" Gen 1").osis()).toEqual("Gen.1");
            expect(p.parse("Matt5John3").osis()).toEqual("Matt.5,John.3");
            expect(p.parse("1Ps 1").osis()).toEqual("");
            return expect(p.parse("11Sam 1").osis()).toEqual("");
        });
    });
    describe("Localized book Gen (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (hu)", function () {
            expect(p.parse("Elso Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Elso M??zes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Els?? Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Els?? M??zes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. M??zes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. M??zes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Teremtes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Teremt??s 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M??zes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I M??zes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Mozes I 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("M??zes I 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Moz 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M??z 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mz 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Ter 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ELSO MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("ELSO M??ZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("ELS?? MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("ELS?? M??ZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. M??ZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. M??ZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("TEREMTES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("TEREMT??S 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M??ZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I M??ZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("MOZES I 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("M??ZES I 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOZ 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M??Z 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MZ 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("TER 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (hu)", function () {
            expect(p.parse("Masodik Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Masodik M??zes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("M??sodik Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("M??sodik M??zes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. M??zes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Kivonulas 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Kivonul??s 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. M??zes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II M??zes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Mozes II 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("M??zes II 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M??zes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Moz 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M??z 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mz 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Kiv 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MASODIK MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("MASODIK M??ZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("M??SODIK MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("M??SODIK M??ZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. M??ZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("KIVONULAS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("KIVONUL??S 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. M??ZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II M??ZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("MOZES II 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("M??ZES II 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M??ZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOZ 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M??Z 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MZ 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("KIV 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (hu)", function () {
            expect(p.parse("Baal es a sarkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Baal es a sark??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Baal es a s??rkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Baal es a s??rk??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Baal ??s a sarkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Baal ??s a sark??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Baal ??s a s??rkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Baal ??s a s??rk??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Ba??l es a sarkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Ba??l es a sark??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Ba??l es a s??rkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Ba??l es a s??rk??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Ba??l ??s a sarkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Ba??l ??s a sark??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Ba??l ??s a s??rkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Ba??l ??s a s??rk??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel es a sarkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel es a sark??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel es a s??rkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel es a s??rk??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel ??s a sarkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel ??s a sark??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel ??s a s??rkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel ??s a s??rk??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l es a sarkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l es a sark??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l es a s??rkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l es a s??rk??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l ??s a sarkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l ??s a sark??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l ??s a s??rkany 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l ??s a s??rk??ny 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (hu)", function () {
            expect(p.parse("Harmadik Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Harmadik M??zes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. M??zes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III M??zes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Mozes III 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("M??zes III 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. M??zes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M??zes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Levitak 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Levit??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Moz 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M??z 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mz 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HARMADIK MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("HARMADIK M??ZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. M??ZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III M??ZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("MOZES III 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("M??ZES III 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. M??ZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M??ZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITAK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVIT??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOZ 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M??Z 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MZ 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (hu)", function () {
            expect(p.parse("IV. Mozes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. M??zes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mozes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. M??zes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Mozes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV M??zes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Mozes IV 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("M??zes IV 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mozes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M??zes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Szamok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Sz??mok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Moz 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M??z 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mz 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Szam 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Sz??m 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IV. MOZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. M??ZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. M??ZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV M??ZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("MOZES IV 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("M??ZES IV 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M??ZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("SZAMOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("SZ??MOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOZ 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M??Z 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MZ 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("SZAM 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("SZ??M 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Wis (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (hu)", function () {
            expect(p.parse("Salamon bolcsessege 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Salamon bolcsess??ge 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Salamon b??lcsessege 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Salamon b??lcsess??ge 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Bolcsesseg 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Bolcsess??g 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("B??lcsesseg 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("B??lcsess??g 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Bolcs 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("B??lcs 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (hu)", function () {
            expect(p.parse("Jeremias siralmai 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Jeremi??s siralmai 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Jeremias sir 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Jeremi??s sir 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Siralmak 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Siralm 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Siral 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JEREMIAS SIRALMAI 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("JEREMI??S SIRALMAI 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("JEREMIAS SIR 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("JEREMI??S SIR 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("SIRALMAK 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("SIRALM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("SIRAL 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book Sir (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (hu)", function () {
            expect(p.parse("Sirak bolcsessege 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirak bolcsess??ge 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirak b??lcsessege 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirak b??lcsess??ge 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir??k bolcsessege 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir??k bolcsess??ge 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir??k b??lcsessege 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir??k b??lcsess??ge 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Ecclesiasticus 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirak fia 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir??k fia 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (hu)", function () {
            expect(p.parse("Jeremias levele 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Jeremi??s levele 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (hu)", function () {
            expect(p.parse("Janos jelenesei 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Janos jelen??sei 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("J??nos jelenesei 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("J??nos jelen??sei 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apokalipszis 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Jelenesek 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Jelen??sek 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Jel 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JANOS JELENESEI 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JANOS JELEN??SEI 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("J??NOS JELENESEI 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("J??NOS JELEN??SEI 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APOKALIPSZIS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JELENESEK 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JELEN??SEK 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JEL 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (hu)", function () {
            expect(p.parse("Manasse imadsaga 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Manasse imads??ga 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Manasse im??dsaga 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Manasse im??ds??ga 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Manass?? imadsaga 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Manass?? imads??ga 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Manass?? im??dsaga 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Manass?? im??ds??ga 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Manassze imaja 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Manassze im??ja 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (hu)", function () {
            expect(p.parse("Masodik torvenykonyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Masodik torvenyk??nyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Masodik torv??nykonyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Masodik torv??nyk??nyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Masodik t??rvenykonyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Masodik t??rvenyk??nyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Masodik t??rv??nykonyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Masodik t??rv??nyk??nyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??sodik torvenykonyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??sodik torvenyk??nyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??sodik torv??nykonyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??sodik torv??nyk??nyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??sodik t??rvenykonyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??sodik t??rvenyk??nyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??sodik t??rv??nykonyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??sodik t??rv??nyk??nyv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Mozes otodik konyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Mozes otodik k??nyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Mozes ot??dik konyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Mozes ot??dik k??nyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Mozes ??todik konyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Mozes ??todik k??nyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Mozes ??t??dik konyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Mozes ??t??dik k??nyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??zes otodik konyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??zes otodik k??nyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??zes ot??dik konyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??zes ot??dik k??nyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??zes ??todik konyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??zes ??todik k??nyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??zes ??t??dik konyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??zes ??t??dik k??nyve 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mozes 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M??zes 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Mozes V 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??zes V 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Moz 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M??z 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MTorv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MT??rv 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mz 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MASODIK TORVENYKONYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MASODIK TORVENYK??NYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MASODIK TORV??NYKONYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MASODIK TORV??NYK??NYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MASODIK T??RVENYKONYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MASODIK T??RVENYK??NYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MASODIK T??RV??NYKONYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MASODIK T??RV??NYK??NYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??SODIK TORVENYKONYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??SODIK TORVENYK??NYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??SODIK TORV??NYKONYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??SODIK TORV??NYK??NYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??SODIK T??RVENYKONYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??SODIK T??RVENYK??NYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??SODIK T??RV??NYKONYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??SODIK T??RV??NYK??NYV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MOZES OTODIK KONYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MOZES OTODIK K??NYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MOZES OT??DIK KONYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MOZES OT??DIK K??NYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MOZES ??TODIK KONYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MOZES ??TODIK K??NYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MOZES ??T??DIK KONYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MOZES ??T??DIK K??NYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??ZES OTODIK KONYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??ZES OTODIK K??NYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??ZES OT??DIK KONYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??ZES OT??DIK K??NYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??ZES ??TODIK KONYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??ZES ??TODIK K??NYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??ZES ??T??DIK KONYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??ZES ??T??DIK K??NYVE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOZES 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M??ZES 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MOZES V 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("M??ZES V 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOZ 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M??Z 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MTORV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("MT??RV 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MZ 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (hu)", function () {
            expect(p.parse("Jozsue 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jozsu?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??zsue 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??zsu?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jozs 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??zs 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOZSUE 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOZSU?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??ZSUE 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??ZSU?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOZS 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??ZS 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (hu)", function () {
            expect(p.parse("Birak 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Bir??k 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("B??rak 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("B??r??k 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Bir 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("B??r 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BIRAK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("BIR??K 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("B??RAK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("B??R??K 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("BIR 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("B??R 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (hu)", function () {
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (hu)", function () {
            expect(p.parse("Elso Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Elso Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Els?? Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Els?? Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Elso Ezd 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Els?? Ezd 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Ezdras I 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Ezdr??s I 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezd 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezd 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezd 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezd 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (hu)", function () {
            expect(p.parse("Masodik Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Masodik Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("M??sodik Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("M??sodik Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Masodik Ezd 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("M??sodik Ezd 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Ezdras II 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Ezdr??s II 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezd 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezd 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezd 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezd 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (hu)", function () {
            expect(p.parse("Ezsaias 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Ezsai??s 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??zsaias 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??zsai??s 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Esaias 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Esai??s 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Izajas 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Izaj??s 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??saias 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??sai??s 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Ezs 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??zs 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Iz 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZSAIAS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("EZSAI??S 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??ZSAIAS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??ZSAI??S 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ESAIAS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ESAI??S 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZAJAS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZAJ??S 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??SAIAS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??SAI??S 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("EZS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??ZS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZ 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (hu)", function () {
            expect(p.parse("Masodik Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Masodik S??muel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("M??sodik Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("M??sodik S??muel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Masodik Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Masodik S??m 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("M??sodik Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("M??sodik S??m 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. S??muel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. S??muel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II S??muel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Samuel II 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("S??muel II 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 S??muel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. S??m 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. S??m 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II S??m 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 S??m 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MASODIK SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("MASODIK S??MUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("M??SODIK SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("M??SODIK S??MUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("MASODIK SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("MASODIK S??M 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("M??SODIK SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("M??SODIK S??M 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. S??MUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. S??MUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II S??MUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("SAMUEL II 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("S??MUEL II 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 S??MUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. S??M 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. S??M 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II S??M 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 S??M 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (hu)", function () {
            expect(p.parse("Elso Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Elso S??muel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Els?? Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Els?? S??muel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. S??muel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. S??muel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 S??muel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Elso Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Elso S??m 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Els?? Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Els?? S??m 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I S??muel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Samuel I 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("S??muel I 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. S??m 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. S??m 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 S??m 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I S??m 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ELSO SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ELSO S??MUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ELS?? SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ELS?? S??MUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. S??MUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. S??MUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 S??MUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ELSO SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ELSO S??M 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ELS?? SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ELS?? S??M 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I S??MUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("SAMUEL I 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("S??MUEL I 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. S??M 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. S??M 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 S??M 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I S??M 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (hu)", function () {
            expect(p.parse("Masodik Kiralyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Masodik Kir??lyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("M??sodik Kiralyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("M??sodik Kir??lyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kiralyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kir??lyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kiralyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kir??lyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kiralyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kir??lyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Kiralyok II 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Kir??lyok II 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Masodik Kir 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("M??sodik Kir 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kiralyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kir??lyok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kir 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kir 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kir 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kir 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MASODIK KIRALYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("MASODIK KIR??LYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("M??SODIK KIRALYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("M??SODIK KIR??LYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KIRALYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KIR??LYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KIRALYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KIR??LYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KIRALYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KIR??LYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("KIRALYOK II 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("KIR??LYOK II 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("MASODIK KIR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("M??SODIK KIR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KIRALYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KIR??LYOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KIR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KIR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KIR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KIR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (hu)", function () {
            expect(p.parse("Elso Kiralyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Elso Kir??lyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Els?? Kiralyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Els?? Kir??lyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kiralyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kir??lyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kiralyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kir??lyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kiralyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kir??lyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kiralyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kir??lyok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Kiralyok I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Kir??lyok I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Elso Kir 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Els?? Kir 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kir 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kir 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kir 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kir 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ELSO KIRALYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ELSO KIR??LYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ELS?? KIRALYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ELS?? KIR??LYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KIRALYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KIR??LYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KIRALYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KIR??LYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KIRALYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KIR??LYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KIRALYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KIR??LYOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("KIRALYOK I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("KIR??LYOK I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ELSO KIR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ELS?? KIR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KIR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KIR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KIR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KIR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (hu)", function () {
            expect(p.parse("Masodik Kronika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Masodik Kr??nika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("M??sodik Kronika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("M??sodik Kr??nika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Masodik Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Masodik Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("M??sodik Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("M??sodik Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kronika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kr??nika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Kronikak II 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Kronik??k II 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Kr??nikak II 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Kr??nik??k II 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kronika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kr??nika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kronika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kr??nika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kronika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kr??nika 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MASODIK KRONIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("MASODIK KR??NIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("M??SODIK KRONIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("M??SODIK KR??NIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("MASODIK KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("MASODIK KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("M??SODIK KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("M??SODIK KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KRONIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KR??NIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("KRONIKAK II 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("KRONIK??K II 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("KR??NIKAK II 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("KR??NIK??K II 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRONIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KR??NIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KRONIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KR??NIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRONIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KR??NIKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (hu)", function () {
            expect(p.parse("Elso Kronika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Elso Kr??nika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Els?? Kronika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Els?? Kr??nika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kronika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kr??nika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kronika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kr??nika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Kronikak I 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Kronik??k I 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Kr??nikak I 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Kr??nik??k I 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kronika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kr??nika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Elso Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Elso Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Els?? Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Els?? Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kronika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kr??nika 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ELSO KRONIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ELSO KR??NIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ELS?? KRONIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ELS?? KR??NIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRONIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KR??NIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KRONIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KR??NIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("KRONIKAK I 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("KRONIK??K I 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("KR??NIKAK I 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("KR??NIK??K I 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRONIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KR??NIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ELSO KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ELSO KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ELS?? KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ELS?? KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KRONIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KR??NIKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (hu)", function () {
            expect(p.parse("Ezsdras 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezsdr??s 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezsd 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezd 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZSDRAS 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZSDR??S 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZSD 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZD 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (hu)", function () {
            expect(p.parse("Nehemias 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemi??s 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NEHEMIAS 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMI??S 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (hu)", function () {
            expect(p.parse("Eszter konyvenek kiegeszitese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyvenek kiegeszit??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyvenek kiegesz??tese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyvenek kiegesz??t??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyvenek kieg??szitese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyvenek kieg??szit??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyvenek kieg??sz??tese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyvenek kieg??sz??t??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyv??nek kiegeszitese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyv??nek kiegeszit??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyv??nek kiegesz??tese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyv??nek kiegesz??t??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyv??nek kieg??szitese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyv??nek kieg??szit??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyv??nek kieg??sz??tese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter konyv??nek kieg??sz??t??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyvenek kiegeszitese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyvenek kiegeszit??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyvenek kiegesz??tese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyvenek kiegesz??t??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyvenek kieg??szitese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyvenek kieg??szit??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyvenek kieg??sz??tese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyvenek kieg??sz??t??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyv??nek kiegeszitese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyv??nek kiegeszit??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyv??nek kiegesz??tese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyv??nek kiegesz??t??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyv??nek kieg??szitese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyv??nek kieg??szit??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyv??nek kieg??sz??tese 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Eszter k??nyv??nek kieg??sz??t??se 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (hu)", function () {
            expect(p.parse("Eszter 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Eszt 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESZTER 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESZT 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (hu)", function () {
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("J??b 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("J??B 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (hu)", function () {
            expect(p.parse("Zsoltarok 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Zsolt??rok 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Zsolt 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZSOLTAROK 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("ZSOLT??ROK 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("ZSOLT 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (hu)", function () {
            expect(p.parse("Azarias imadsaga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarias imads??ga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarias im??dsaga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarias im??ds??ga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azari??s imadsaga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azari??s imads??ga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azari??s im??dsaga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azari??s im??ds??ga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??rias imadsaga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??rias imads??ga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??rias im??dsaga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??rias im??ds??ga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??ri??s imadsaga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??ri??s imads??ga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??ri??s im??dsaga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??ri??s im??ds??ga 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarias imaja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarias im??ja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azari??s imaja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azari??s im??ja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??rias imaja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??rias im??ja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??ri??s imaja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Az??ri??s im??ja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (hu)", function () {
            expect(p.parse("Peldabeszedek 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Peldabesz??dek 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??ldabeszedek 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??ldabesz??dek 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Peld 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??ld 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PELDABESZEDEK 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PELDABESZ??DEK 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??LDABESZEDEK 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??LDABESZ??DEK 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PELD 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??LD 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (hu)", function () {
            expect(p.parse("Predikator 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Predik??tor 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pr??dikator 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pr??dik??tor 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pred 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pr??d 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PREDIKATOR 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PREDIK??TOR 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PR??DIKATOR 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PR??DIK??TOR 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PRED 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PR??D 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (hu)", function () {
            expect(p.parse("Harom fiatalember eneke 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Harom fiatalember ??neke 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("H??rom fiatalember eneke 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("H??rom fiatalember ??neke 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (hu)", function () {
            expect(p.parse("Salamon eneke 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Salamon ??neke 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Enekek eneke 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Enekek ??neke 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("??nekek eneke 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("??nekek ??neke 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("En 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("??n 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SALAMON ENEKE 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SALAMON ??NEKE 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("ENEKEK ENEKE 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("ENEKEK ??NEKE 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("??NEKEK ENEKE 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("??NEKEK ??NEKE 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("EN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("??N 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (hu)", function () {
            expect(p.parse("Jeremias 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremi??s 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JEREMIAS 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMI??S 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (hu)", function () {
            expect(p.parse("Ezekiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ez??kiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ez 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZEKIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZ??KIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZ 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (hu)", function () {
            expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("D??niel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("D??n 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("D??NIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("D??N 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (hu)", function () {
            expect(p.parse("Hoseas 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hose??s 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("H??seas 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("H??se??s 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Ozeas 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Oze??s 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("H??s 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Oz 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HOSEAS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOSE??S 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("H??SEAS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("H??SE??S 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZEAS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZE??S 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("H??S 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZ 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (hu)", function () {
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Jo??l 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("J??el 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("J????l 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Jo 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JO??L 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("J??EL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("J????L 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JO 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (hu)", function () {
            expect(p.parse("Amosz 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??mosz 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am??s 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??mos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??m??s 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??m 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOSZ 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??MOSZ 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM??S 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??MOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??M??S 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??M 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (hu)", function () {
            expect(p.parse("Abdias 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdi??s 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abd 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ABDIAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDI??S 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABD 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (hu)", function () {
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonas 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jon??s 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("J??nas 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("J??n??s 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jon 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("J??n 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAS 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JON??S 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("J??NAS 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("J??N??S 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JON 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("J??N 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (hu)", function () {
            expect(p.parse("Mikeas 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mike??s 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mik 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MIKEAS 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIKE??S 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIK 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (hu)", function () {
            expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("N??hum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("N??h 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("N??HUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("N??H 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (hu)", function () {
            expect(p.parse("Habakkuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Habakuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HABAKKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HABAKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (hu)", function () {
            expect(p.parse("Szefanias 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Szefani??s 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Szofonias 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Szofoni??s 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofonias 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofoni??s 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zofonias 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zofoni??s 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zof??nias 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zof??ni??s 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Szof 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SZEFANIAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SZEFANI??S 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SZOFONIAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SZOFONI??S 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONIAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONI??S 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZOFONIAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZOFONI??S 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZOF??NIAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZOF??NI??S 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SZOF 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (hu)", function () {
            expect(p.parse("Haggeus 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Aggeus 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Haggai 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Ag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HAGGEUS 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AGGEUS 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGGAI 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (hu)", function () {
            expect(p.parse("Zakarias 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zakari??s 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zak 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZAKARIAS 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZAKARI??S 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZAK 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (hu)", function () {
            expect(p.parse("Malakias 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malaki??s 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MALAKIAS 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALAKI??S 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (hu)", function () {
            expect(p.parse("Mate 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mat?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("M??te 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("M??t?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MATE 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MAT?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("M??TE 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("M??T?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (hu)", function () {
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??rk 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mk 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (hu)", function () {
            expect(p.parse("Lukacs 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk??cs 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lk 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LUKACS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??CS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LK 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (hu)", function () {
            expect(p.parse("Elso Janos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Elso J??nos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Els?? Janos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Els?? J??nos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Janos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. J??nos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Janos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. J??nos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Janos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 J??nos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Elso Jn 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Els?? Jn 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Janos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I J??nos 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Janos I 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("J??nos I 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Jn 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Jn 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Jn 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Jn 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ELSO JANOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ELSO J??NOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ELS?? JANOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ELS?? J??NOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JANOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. J??NOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JANOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. J??NOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JANOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 J??NOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ELSO JN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ELS?? JN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JANOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I J??NOS 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("JANOS I 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("J??NOS I 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JN 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (hu)", function () {
            expect(p.parse("Masodik Janos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Masodik J??nos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("M??sodik Janos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("M??sodik J??nos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Masodik Jn 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("M??sodik Jn 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Janos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. J??nos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Janos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. J??nos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Janos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II J??nos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Janos II 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("J??nos II 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Janos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 J??nos 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Jn 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Jn 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Jn 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Jn 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MASODIK JANOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("MASODIK J??NOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("M??SODIK JANOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("M??SODIK J??NOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("MASODIK JN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("M??SODIK JN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JANOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. J??NOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JANOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. J??NOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JANOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II J??NOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("JANOS II 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("J??NOS II 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JANOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 J??NOS 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (hu)", function () {
            expect(p.parse("Harmadik Janos 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Harmadik J??nos 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Harmadik Jn 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Janos 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. J??nos 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Janos 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III J??nos 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Janos III 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("J??nos III 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Janos 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. J??nos 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Janos 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 J??nos 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Jn 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Jn 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Jn 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Jn 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HARMADIK JANOS 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("HARMADIK J??NOS 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("HARMADIK JN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. JANOS 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. J??NOS 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III JANOS 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III J??NOS 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("JANOS III 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("J??NOS III 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JANOS 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. J??NOS 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JANOS 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 J??NOS 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. JN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III JN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (hu)", function () {
            expect(p.parse("Janos 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J??nos 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Jn 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JANOS 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J??NOS 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JN 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (hu)", function () {
            expect(p.parse("Az apostolok cselekedetei 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Apostolok cselekedetei 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Cselekedetek 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Apostolok 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Az ApCsel 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Ap. Csel 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Ap Csel 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ApCsel 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AZ APOSTOLOK CSELEKEDETEI 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("APOSTOLOK CSELEKEDETEI 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("CSELEKEDETEK 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("APOSTOLOK 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("AZ APCSEL 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("AP. CSEL 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("AP CSEL 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("APCSEL 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (hu)", function () {
            expect(p.parse("Romaiakhoz 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??maiakhoz 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Roma 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??ma 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??m 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ROMAIAKHOZ 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??MAIAKHOZ 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??MA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??M 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (hu)", function () {
            expect(p.parse("Masodik Korinthusiakhoz 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("M??sodik Korinthusiakhoz 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korinthusiakhoz 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinthusiakhoz 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korinthusiakhoz 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinthusiakhoz 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Masodik Korinthus 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Masodik Korintusi 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("M??sodik Korinthus 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("M??sodik Korintusi 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korinthus 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korintusi 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinthus 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korintusi 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korinthus 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korintusi 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinthus 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korintusi 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Masodik Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("M??sodik Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MASODIK KORINTHUSIAKHOZ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("M??SODIK KORINTHUSIAKHOZ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTHUSIAKHOZ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTHUSIAKHOZ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTHUSIAKHOZ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTHUSIAKHOZ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("MASODIK KORINTHUS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("MASODIK KORINTUSI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("M??SODIK KORINTHUS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("M??SODIK KORINTUSI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTHUS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTUSI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTHUS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTUSI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTHUS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTUSI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTHUS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTUSI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("MASODIK KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("M??SODIK KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (hu)", function () {
            expect(p.parse("Elso Korinthusiakhoz 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Els?? Korinthusiakhoz 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinthusiakhoz 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korinthusiakhoz 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinthusiakhoz 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korinthusiakhoz 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Elso Korinthus 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Elso Korintusi 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Els?? Korinthus 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Els?? Korintusi 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinthus 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korintusi 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korinthus 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korintusi 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinthus 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korintusi 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korinthus 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korintusi 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Elso Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Els?? Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ELSO KORINTHUSIAKHOZ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ELS?? KORINTHUSIAKHOZ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTHUSIAKHOZ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTHUSIAKHOZ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTHUSIAKHOZ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTHUSIAKHOZ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ELSO KORINTHUS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ELSO KORINTUSI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ELS?? KORINTHUS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ELS?? KORINTUSI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTHUS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTUSI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTHUS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTUSI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTHUS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTUSI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTHUS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTUSI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ELSO KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ELS?? KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (hu)", function () {
            expect(p.parse("Galatakhoz 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galat??khoz 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galata 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GALATAKHOZ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??KHOZ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (hu)", function () {
            expect(p.parse("Epheszosziakhoz 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efezusiakhoz 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef??zusiakhoz 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efezus 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EPHESZOSZIAKHOZ 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFEZUSIAKHOZ 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF??ZUSIAKHOZ 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFEZUS 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (hu)", function () {
            expect(p.parse("Philippibeliekhez 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filippiekhez 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Flippiekhez 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filippi 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Fil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PHILIPPIBELIEKHEZ 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPPIEKHEZ 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FLIPPIEKHEZ 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPPI 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (hu)", function () {
            expect(p.parse("Kolosszebeliekhez 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolossz??beliekhez 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosszeieknek 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosseiakhoz 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Koloss??iakhoz 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosse 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Koloss?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KOLOSSZEBELIEKHEZ 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSZ??BELIEKHEZ 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSZEIEKNEK 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSEIAKHOZ 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSS??IAKHOZ 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSE 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSS?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (hu)", function () {
            expect(p.parse("Masodik Thesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??sodik Thesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Masodik Tesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??sodik Tesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Thesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Thesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Thesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Thesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Masodik Thesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??sodik Thesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesszalonikaiakhoz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Masodik Tesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??sodik Tesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Thesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Thesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Thesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Thesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesszalonika 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Masodik Thessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??sodik Thessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Masodik Tessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??sodik Tessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Thessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Thessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Thessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Thessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tessz 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MASODIK THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??SODIK THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("MASODIK TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??SODIK TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("MASODIK THESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??SODIK THESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("MASODIK TESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??SODIK TESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. THESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. THESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II THESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 THESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESSZALONIKA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("MASODIK THESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??SODIK THESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("MASODIK TESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("M??SODIK TESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. THESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. THESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II THESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 THESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESSZ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (hu)", function () {
            expect(p.parse("Elso Thesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Els?? Thesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Elso Tesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Els?? Tesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Thesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Thesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Thesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Thesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesszalonikaiakhoz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Elso Thesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Els?? Thesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Elso Tesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Els?? Tesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Thesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Thesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Thesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Thesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesszalonika 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Elso Thessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Els?? Thessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Elso Tessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Els?? Tessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Thessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Thessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Thessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Thessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tessz 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ELSO THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELS?? THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELSO TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELS?? TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I THESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESSZALONIKAIAKHOZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELSO THESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELS?? THESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELSO TESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELS?? TESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. THESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. THESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 THESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I THESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESSZALONIKA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELSO THESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELS?? THESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELSO TESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ELS?? TESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. THESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. THESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 THESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I THESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESSZ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (hu)", function () {
            expect(p.parse("Masodik Timoteushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Masodik Timoteusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Masodik Tim??teushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Masodik Tim??teusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??sodik Timoteushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??sodik Timoteusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??sodik Tim??teushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??sodik Tim??teusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Masodik Timotheosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Masodik Tim??theosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??sodik Timotheosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??sodik Tim??theosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Masodik Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Masodik Tim??teus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??sodik Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??sodik Tim??teus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timoteushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timoteusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim??teushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim??teusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim??teushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim??teusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timoteushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timoteusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim??teushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim??teusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timotheosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim??theosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim??teushoz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim??teusnak 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timotheosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim??theosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timotheosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim??theosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timotheosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim??theosz 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim??teus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim??teus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim??teus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Masodik Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??sodik Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim??teus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MASODIK TIMOTEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("MASODIK TIMOTEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("MASODIK TIM??TEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("MASODIK TIM??TEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??SODIK TIMOTEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??SODIK TIMOTEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??SODIK TIM??TEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??SODIK TIM??TEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("MASODIK TIMOTHEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("MASODIK TIM??THEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??SODIK TIMOTHEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??SODIK TIM??THEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("MASODIK TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("MASODIK TIM??TEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??SODIK TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??SODIK TIM??TEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM??TEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM??TEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM??TEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM??TEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM??TEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM??TEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTHEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM??THEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM??TEUSHOZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM??TEUSNAK 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTHEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM??THEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTHEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM??THEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTHEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM??THEOSZ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM??TEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM??TEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM??TEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("MASODIK TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("M??SODIK TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM??TEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (hu)", function () {
            expect(p.parse("Elso Timoteushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Elso Timoteusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Elso Tim??teushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Elso Tim??teusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Els?? Timoteushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Els?? Timoteusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Els?? Tim??teushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Els?? Tim??teusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Elso Timotheosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Elso Tim??theosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Els?? Timotheosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Els?? Tim??theosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timoteushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timoteusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim??teushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim??teusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timoteushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timoteusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim??teushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim??teusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timoteushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timoteusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim??teushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim??teusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timotheosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim??theosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Elso Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Elso Tim??teus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Els?? Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Els?? Tim??teus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timoteushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timoteusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim??teushoz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim??teusnak 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timotheosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim??theosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timotheosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim??theosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timotheosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim??theosz 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim??teus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim??teus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim??teus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim??teus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Elso Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Els?? Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ELSO TIMOTEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELSO TIMOTEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELSO TIM??TEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELSO TIM??TEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELS?? TIMOTEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELS?? TIMOTEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELS?? TIM??TEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELS?? TIM??TEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELSO TIMOTHEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELSO TIM??THEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELS?? TIMOTHEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELS?? TIM??THEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM??TEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM??TEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM??TEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM??TEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM??TEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM??TEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTHEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM??THEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELSO TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELSO TIM??TEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELS?? TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELS?? TIM??TEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM??TEUSHOZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM??TEUSNAK 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTHEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM??THEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTHEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM??THEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTHEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM??THEOSZ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM??TEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM??TEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM??TEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM??TEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELSO TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ELS?? TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (hu)", function () {
            expect(p.parse("Tituszhoz 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titushoz 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titusz 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TITUSZHOZ 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUSHOZ 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUSZ 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (hu)", function () {
            expect(p.parse("Philemonhoz 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemonhoz 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filem 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PHILEMONHOZ 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMONHOZ 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (hu)", function () {
            expect(p.parse("Zsidokhoz irt level 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsidokhoz irt lev??l 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsidokhoz ??rt level 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsidokhoz ??rt lev??l 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsid??khoz irt level 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsid??khoz irt lev??l 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsid??khoz ??rt level 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsid??khoz ??rt lev??l 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heber level 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heber lev??l 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("H??ber level 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("H??ber lev??l 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsidokhoz 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsid??khoz 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsidok 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsid??k 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zsid 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZSIDOKHOZ IRT LEVEL 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSIDOKHOZ IRT LEV??L 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSIDOKHOZ ??RT LEVEL 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSIDOKHOZ ??RT LEV??L 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSID??KHOZ IRT LEVEL 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSID??KHOZ IRT LEV??L 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSID??KHOZ ??RT LEVEL 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSID??KHOZ ??RT LEV??L 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBER LEVEL 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBER LEV??L 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("H??BER LEVEL 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("H??BER LEV??L 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSIDOKHOZ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSID??KHOZ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSIDOK 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSID??K 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZSID 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (hu)", function () {
            expect(p.parse("Jakab 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JAKAB 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (hu)", function () {
            expect(p.parse("Masodik Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Masodik P??ter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("M??sodik Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("M??sodik P??ter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Masodik Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Masodik P??t 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("M??sodik Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("M??sodik P??t 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. P??ter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. P??ter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II P??ter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 P??ter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. P??t 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. P??t 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II P??t 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 P??t 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MASODIK PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("MASODIK P??TER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("M??SODIK PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("M??SODIK P??TER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("MASODIK PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("MASODIK P??T 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("M??SODIK PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("M??SODIK P??T 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. P??TER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. P??TER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II P??TER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 P??TER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. P??T 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. P??T 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II P??T 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 P??T 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (hu)", function () {
            expect(p.parse("Elso Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Elso P??ter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Els?? Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Els?? P??ter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. P??ter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Elso Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Elso P??t 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Els?? Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Els?? P??t 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. P??ter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 P??ter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I P??ter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. P??t 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. P??t 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 P??t 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I P??t 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ELSO PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ELSO P??TER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ELS?? PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ELS?? P??TER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. P??TER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ELSO PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ELSO P??T 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ELS?? PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ELS?? P??T 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. P??TER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 P??TER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I P??TER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. P??T 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. P??T 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 P??T 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I P??T 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (hu)", function () {
            expect(p.parse("Judas 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jud??s 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??das 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??d??s 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jud 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??d 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JUDAS 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUD??S 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??DAS 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??D??S 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUD 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??D 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (hu)", function () {
            expect(p.parse("Tobias 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobi??s 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??bias 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??bi??s 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??b 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (hu)", function () {
            expect(p.parse("Judit 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (hu)", function () {
            expect(p.parse("Baruk 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("B??ruk 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("B??r 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (hu)", function () {
            expect(p.parse("Zsuzsanna es a venek 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Zsuzsanna es a v??nek 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Zsuzsanna ??s a venek 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Zsuzsanna ??s a v??nek 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Zsuzsanna 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Zsuzs 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Zsuz 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (hu)", function () {
            expect(p.parse("Masodik Makkabeusok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("M??sodik Makkabeusok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Makkabeusok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makkabeusok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Makkabeusok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Makkabeusok II 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makkabeusok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Masodik Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("M??sodik Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (hu)", function () {
            expect(p.parse("Harmadik Makkabeusok 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Makkabeusok 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Makkabeusok 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Makkabeusok III 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makkabeusok 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makkabeusok 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Harmadik Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (hu)", function () {
            expect(p.parse("IV. Makkabeusok 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makkabeusok 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Makkabeusok 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Makkabeusok IV 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makkabeusok 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (hu)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (hu)", function () {
            expect(p.parse("Elso Makkabeusok 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Els?? Makkabeusok 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makkabeusok 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Makkabeusok 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makkabeusok 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Makkabeusok 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Makkabeusok I 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Elso Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Els?? Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Mak 1:1").osis()).toEqual("1Macc.1.1");
            return true;
        });
    });
    describe("Miscellaneous tests", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        it("should return the expected language", function () {
            return expect(p.languages).toEqual(["hu"]);
        });
        it("should handle ranges (hu)", function () {
            expect(p.parse("Titus 1:1 k??v 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1k??v2").osis()).toEqual("Matt.1-Matt.2");
            expect(p.parse("Phlm 2 K??V 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
            expect(p.parse("Titus 1:1 kov 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1kov2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 KOV 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (hu)", function () {
            expect(p.parse("Titus 1:1, fejezet??ben 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 FEJEZET??BEN 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, fejezeteben 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 FEJEZETEBEN 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, fejezet 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 FEJEZET 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, fej. 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 FEJ. 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, fej 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 FEJ 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (hu)", function () {
            expect(p.parse("Exod 1:1 versekre 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERSEKRE 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 versek 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERSEK 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 vers. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERS. 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 vers 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm VERS 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (hu)", function () {
            expect(p.parse("Exod 1:1 ??s 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 ??S 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 es 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 ES 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 v?? 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 V?? 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 vo 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 VO 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 vagy 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 VAGY 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (hu)", function () {
            expect(p.parse("Ps 3 c??m, 4:2, 5:c??m").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            expect(p.parse("PS 3 C??M, 4:2, 5:C??M").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            expect(p.parse("Ps 3 cim, 4:2, 5:cim").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 CIM, 4:2, 5:CIM").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (hu)", function () {
            expect(p.parse("Rev 3kk, 4:2kk").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 KK, 4:2 KK").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (hu)", function () {
            expect(p.parse("Lev 1 (ERV)").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
            expect(p.parse("lev 1 erv").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
            expect(p.parse("Lev 1 (KAR)").osis_and_translations()).toEqual([["Lev.1", "KAR"]]);
            return expect(p.parse("lev 1 kar").osis_and_translations()).toEqual([["Lev.1", "KAR"]]);
        });
        it("should handle book ranges (hu)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            expect(p.parse("Els?? k??v Harmadik  Jn").osis()).toEqual("1John.1-3John.1");
            return expect(p.parse("Els?? kov Harmadik  Jn").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (hu)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=hu.spec.js.map