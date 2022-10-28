"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/uk_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (uk)", function () {
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
        return it("should handle book: Gen (uk)", function () {
            expect(p.parse("1-ше. книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-ше. книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Перша книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Перша книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Перше книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Перше книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-а. книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-а. книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-е. книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-е. книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-ше книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-ше книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-а книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-а книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-е книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-е книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I книга Моисеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I книга Мойсеева 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Buttja 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Буття 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 М 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Буг 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Бут 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1-ШЕ. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-ШЕ. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("ПЕРША КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("ПЕРША КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("ПЕРШЕ КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("ПЕРШЕ КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-А. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-А. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-Е. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-Е. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-ШЕ КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-ШЕ КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-А КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-А КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-Е КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1-Е КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("BUTTJA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("БУТТЯ 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 М 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("БУГ 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("БУТ 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (uk)", function () {
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
        return it("should handle book: Exod (uk)", function () {
            expect(p.parse("2-ге. книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-ге. книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Друга книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Друга книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Друге книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Друге книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-а. книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-а. книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-ге книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-ге книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-е. книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-е. книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-а книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-а книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-е книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-е книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 книга Моисеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 книга Мойсеева 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Vyhid 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Vyȟid 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Вихід 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 М 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Вих 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("2-ГЕ. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-ГЕ. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ДРУГА КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ДРУГА КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ДРУГЕ КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ДРУГЕ КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-А. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-А. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-ГЕ КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-ГЕ КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-Е. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-Е. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-А КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-А КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-Е КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2-Е КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("VYHID 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("VYȞID 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ВИХІД 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 М 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ВИХ 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (uk)", function () {
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
        return it("should handle book: Bel (uk)", function () {
            expect(p.parse("Бел і дракон 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Бел 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (uk)", function () {
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
        return it("should handle book: Lev (uk)", function () {
            expect(p.parse("3-тє. книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-тє. книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Третя книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Третя книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Третє книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Третє книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-а. книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-а. книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-е. книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-е. книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-тє книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-тє книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-а книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-а книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-е книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-е книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 книга Моисеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 книга Мойсеева 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Levyt 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Левит 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 М 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("3-ТЄ. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-ТЄ. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("ТРЕТЯ КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("ТРЕТЯ КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("ТРЕТЄ КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("ТРЕТЄ КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-А. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-А. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-Е. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-Е. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-ТЄ КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-ТЄ КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-А КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-А КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-Е КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3-Е КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVYT 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("ЛЕВИТ 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 М 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (uk)", function () {
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
        return it("should handle book: Num (uk)", function () {
            expect(p.parse("Четверта книга Моисеева 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Четверта книга Мойсеева 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. книга Моисеева 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. книга Мойсеева 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. книга Моисеева 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. книга Мойсеева 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV книга Моисеева 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV книга Мойсеева 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 книга Моисеева 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 книга Мойсеева 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Cysla 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Čysla 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Числа 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 М 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Чис 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ЧЕТВЕРТА КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("ЧЕТВЕРТА КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CYSLA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("ČYSLA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("ЧИСЛА 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 М 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("ЧИС 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (uk)", function () {
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
        return it("should handle book: Sir (uk)", function () {
            expect(p.parse("Премудрість Ісуса, сина Сирахова 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Книга Сираха 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Бен Сираха 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Еклесіаст 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Сираха 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Сир 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (uk)", function () {
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
        return it("should handle book: Wis (uk)", function () {
            expect(p.parse("Книга Премудрості Соломона 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Премудрість Соломона 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Книга Мудрости 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Мудрости 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Прем 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Муд 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (uk)", function () {
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
        return it("should handle book: Lam (uk)", function () {
            expect(p.parse("Plac Jeremii 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremiï 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plač Jeremii 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plač Jeremiï 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Плач Єреміі 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Плач Єремії 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Плач 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PLAC JEREMII 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMIÏ 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAČ JEREMII 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAČ JEREMIÏ 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("ПЛАЧ ЄРЕМІІ 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("ПЛАЧ ЄРЕМІЇ 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("ПЛАЧ 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (uk)", function () {
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
        return it("should handle book: EpJer (uk)", function () {
            expect(p.parse("Послання Єреміі 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Послання Єремії 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Лист Єреміі 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Лист Єремії 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (uk)", function () {
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
        return it("should handle book: Rev (uk)", function () {
            expect(p.parse("Об'явлення св. Івана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об'явлення св. Иоана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об'явлення св. Йоана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об’явлення св. Івана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об’явлення св. Иоана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об’явлення св. Йоана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об'явлення св Івана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об'явлення св Иоана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об'явлення св Йоана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об’явлення св Івана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об’явлення св Иоана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об’явлення св Йоана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Ob'javlennja Ivana Bohoslova 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Ob’javlennja Ivana Bohoslova 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об'явлення Івана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об’явлення Івана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Одкровення Івана Богослова 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Відкриття Івана 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Апока́ліпсис 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Апокaліпсис 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Апокáліпсис 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Апокалiпсис 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Апокалíпсис 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Апокаліпсис 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об'явлення 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об’явлення 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Одкриттє 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Об 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ОБ'ЯВЛЕННЯ СВ. ІВАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ'ЯВЛЕННЯ СВ. ИОАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ'ЯВЛЕННЯ СВ. ЙОАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ’ЯВЛЕННЯ СВ. ІВАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ’ЯВЛЕННЯ СВ. ИОАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ’ЯВЛЕННЯ СВ. ЙОАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ'ЯВЛЕННЯ СВ ІВАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ'ЯВЛЕННЯ СВ ИОАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ'ЯВЛЕННЯ СВ ЙОАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ’ЯВЛЕННЯ СВ ІВАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ’ЯВЛЕННЯ СВ ИОАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ’ЯВЛЕННЯ СВ ЙОАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OB'JAVLENNJA IVANA BOHOSLOVA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OB’JAVLENNJA IVANA BOHOSLOVA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ'ЯВЛЕННЯ ІВАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ’ЯВЛЕННЯ ІВАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОДКРОВЕННЯ ІВАНА БОГОСЛОВА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ВІДКРИТТЯ ІВАНА 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("АПОКА́ЛІПСИС 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("АПОКAЛІПСИС 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("АПОКÁЛІПСИС 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("АПОКАЛIПСИС 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("АПОКАЛÍПСИС 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("АПОКАЛІПСИС 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ'ЯВЛЕННЯ 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ’ЯВЛЕННЯ 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОДКРИТТЄ 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ОБ 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (uk)", function () {
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
        return it("should handle book: PrMan (uk)", function () {
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (uk)", function () {
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
        return it("should handle book: Deut (uk)", function () {
            expect(p.parse("П'ята книга Моисеева 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("П'ята книга Мойсеева 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("П’ята книга Моисеева 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("П’ята книга Мойсеева 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Povtorennja Zakonu 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Повторення Закону 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Второзаконня 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Повт. Закону 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Повт Закону 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Втор 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Повт 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 М 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("П'ЯТА КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("П'ЯТА КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("П’ЯТА КНИГА МОИСЕЕВА 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("П’ЯТА КНИГА МОЙСЕЕВА 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("POVTORENNJA ZAKONU 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("ПОВТОРЕННЯ ЗАКОНУ 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("ВТОРОЗАКОННЯ 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("ПОВТ. ЗАКОНУ 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("ПОВТ ЗАКОНУ 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("ВТОР 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("ПОВТ 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 М 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (uk)", function () {
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
        return it("should handle book: Josh (uk)", function () {
            expect(p.parse("Книга Ісуса Навина 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Ісуса Навина 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Книга Єгошуі 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Книга Єгошуї 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Isus Navyn 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Ісус Навин 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Єгошуі 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Єгошуї 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("І. Нав 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("І Нав 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Нав 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Єг 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ІСУСА НАВИНА 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("ІСУСА НАВИНА 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("КНИГА ЄГОШУІ 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("КНИГА ЄГОШУЇ 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("ISUS NAVYN 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("ІСУС НАВИН 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("ЄГОШУІ 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("ЄГОШУЇ 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("І. НАВ 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("І НАВ 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("НАВ 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("ЄГ 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (uk)", function () {
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
        return it("should handle book: Judg (uk)", function () {
            expect(p.parse("Knyha Suddiv 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Книга Суддів 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Суддів 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Суд 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KNYHA SUDDIV 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("КНИГА СУДДІВ 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("СУДДІВ 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("СУД 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (uk)", function () {
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
        return it("should handle book: Ruth (uk)", function () {
            expect(p.parse("Книга Рут 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Рут 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА РУТ 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("РУТ 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (uk)", function () {
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
        return it("should handle book: 1Esd (uk)", function () {
            expect(p.parse("1-ше. Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-ше. Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Перша Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Перша Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Перше Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Перше Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-а. Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-а. Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-е. Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-е. Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-ше Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-ше Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-а Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-а Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-е Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1-е Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ездра 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ездри 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Езд 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (uk)", function () {
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
        return it("should handle book: 2Esd (uk)", function () {
            expect(p.parse("2-ге. книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Друга книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Друге книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-а. книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-ге книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-е. книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-а книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-е книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 книга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-ге. Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-ге. Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Друга Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Друга Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Друге Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Друге Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-а. Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-а. Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-ге Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-ге Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-е. Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-е. Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-а Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-а Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-е Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2-е Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ездра 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ездри 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Езд 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (uk)", function () {
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
        return it("should handle book: Isa (uk)", function () {
            expect(p.parse("Книга пророка Ісаі 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Книга пророка Ісаї 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Книга Ісаиі 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Книга Ісаиї 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Книга Ісайі 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Книга Ісайї 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isaja 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Ісая 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Ісаі 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Ісаї 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Іс 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА ІСАІ 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("КНИГА ПРОРОКА ІСАЇ 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("КНИГА ІСАИІ 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("КНИГА ІСАИЇ 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("КНИГА ІСАЙІ 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("КНИГА ІСАЙЇ 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISAJA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ІСАЯ 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ІСАІ 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ІСАЇ 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ІС 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (uk)", function () {
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
        return it("should handle book: 2Sam (uk)", function () {
            expect(p.parse("2-ге. книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге. книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друга книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друга книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друге книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друге книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а. книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а. книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е. книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е. книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 книга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 книга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге. Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге. Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друга Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друга Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друге Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друге Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а. Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а. Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е. Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е. Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге. Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге. Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге. Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге. Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друга Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друга Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друга Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друга Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друге Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друге Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друге Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Друге Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Самуілова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Самуїлова 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а. Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а. Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а. Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а. Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ге Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е. Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е. Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е. Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е. Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-а Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-е Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuil 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuïl 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Самуіл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Самуїл 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Сам 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("2-ГЕ. КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ. КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГА КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГА КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГЕ КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГЕ КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А. КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А. КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е. КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е. КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 КНИГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 КНИГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ. САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ. САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГА САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГА САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГЕ САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГЕ САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А. САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А. САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е. САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е. САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ. SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ. SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ. САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ. САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГА SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГА SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГА САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГА САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГЕ SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГЕ SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГЕ САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ДРУГЕ САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 САМУІЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 САМУЇЛОВА 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А. SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А. SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А. САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А. САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-ГЕ САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е. SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е. SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е. САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е. САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-А САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2-Е САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUIL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUÏL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 САМУІЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 САМУЇЛ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 САМ 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (uk)", function () {
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
        return it("should handle book: 1Sam (uk)", function () {
            expect(p.parse("1-ше. книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше. книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перша книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перша книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перше книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перше книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а. книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а. книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е. книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е. книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I книга Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I книга Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше. Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше. Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перша Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перша Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перше Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перше Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а. Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а. Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е. Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е. Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше. Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше. Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше. Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше. Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перша Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перша Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перша Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перша Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перше Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перше Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перше Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Перше Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а. Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а. Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а. Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а. Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е. Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е. Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е. Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е. Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ше Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Самуілова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Самуїлова 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-а Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-е Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samuil 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samuïl 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Самуіл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Самуїл 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Сам 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1-ШЕ. КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ. КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРША КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРША КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРШЕ КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРШЕ КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А. КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А. КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е. КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е. КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I КНИГА САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I КНИГА САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ. САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ. САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРША САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРША САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРШЕ САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРШЕ САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А. САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А. САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е. САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е. САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ. SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ. SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ. САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ. САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРША SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРША SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРША САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРША САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРШЕ SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРШЕ SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРШЕ САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("ПЕРШЕ САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А. SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А. SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А. САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А. САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е. SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е. SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е. САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е. САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-ШЕ САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I САМУІЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I САМУЇЛОВА 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-А САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1-Е САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMUIL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMUÏL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I САМУІЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I САМУЇЛ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 САМ 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (uk)", function () {
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
        return it("should handle book: 2Kgs (uk)", function () {
            expect(p.parse("2-ге. книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Друга книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Друге книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-а. книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-ге книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-е. книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-а книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-е книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Четверта Царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 книга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-ге. Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-ге. царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Друга Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Друга царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Друге Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Друге царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-а. Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-а. царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-ге Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-ге царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-е. Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-е. царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-а Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-а царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-е Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-е царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. Царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. Царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV Царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Cariv 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 Царів 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Цар 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("2-ГЕ. КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ДРУГА КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ДРУГЕ КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-А. КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-ГЕ КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-Е. КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-А КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-Е КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ЧЕТВЕРТА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 КНИГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-ГЕ. CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-ГЕ. ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ДРУГА CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ДРУГА ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ДРУГЕ CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ДРУГЕ ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-А. CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-А. ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-ГЕ CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-ГЕ ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-Е. CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-Е. ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-А CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-А ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-Е CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2-Е ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 CARIV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 ЦАРІВ 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ЦАР 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (uk)", function () {
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
        return it("should handle book: 1Kgs (uk)", function () {
            expect(p.parse("1-ше. книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Перша книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Перше книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-а. книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-е. книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-ше книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-а книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-е книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I книга царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-ше. Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-ше. царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-тє. Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Перша Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Перша царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Перше Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Перше царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Третя Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Третє Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-а. Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-а. царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-е. Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-е. царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-ше Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-ше царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-а. Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-е. Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-тє Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-а Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-а царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-е Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-е царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-а Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-е Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 Царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Cariv 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I царів 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Цар 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1-ШЕ. КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ПЕРША КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ПЕРШЕ КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-А. КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-Е. КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-ШЕ КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-А КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-Е КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I КНИГА ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-ШЕ. CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-ШЕ. ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-ТЄ. ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ПЕРША CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ПЕРША ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ПЕРШЕ CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ПЕРШЕ ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ТРЕТЯ ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ТРЕТЄ ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-А. CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-А. ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-Е. CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-Е. ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-ШЕ CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-ШЕ ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-А. ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-Е. ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-ТЄ ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-А CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-А ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-Е CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1-Е ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-А ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3-Е ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I CARIV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ЦАРІВ 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ЦАР 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (uk)", function () {
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
        return it("should handle book: 2Chr (uk)", function () {
            expect(p.parse("2-ге. книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друга книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друге книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а. книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге. книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е. книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друга книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друге книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а. книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е. книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 книга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 книга хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге. Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друга Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друге Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а. Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге. Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге. Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге. Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге. хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е. Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друга Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друга Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друга Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друга хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друге Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друге Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друге Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друге хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а. Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а. Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а. Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а. хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге. Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е. Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е. Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е. Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е. хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друга Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Друге Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а. Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ге Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е. Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Літопису 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-а Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-е Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Hroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Ȟroniky 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Хроніка 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 хроніки 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Хронік 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Хр 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("2-ГЕ. КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГА КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГЕ КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А. КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ. КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е. КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГА КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГЕ КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А. КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е. КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 КНИГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 КНИГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ. ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГА ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГЕ ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А. ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ. HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ. ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ. ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ. ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е. ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГА HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГА ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГА ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГА ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГЕ HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГЕ ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГЕ ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГЕ ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А. HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А. ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А. ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А. ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ. ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е. HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е. ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е. ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е. ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГА ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ДРУГЕ ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А. ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-ГЕ ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е. ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ЛІТОПИСУ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-А ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2-Е ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 HRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ȞRONIKY 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ХРОНІКА 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ХРОНІКИ 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ХРОНІК 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ХР 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (uk)", function () {
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
        return it("should handle book: 1Chr (uk)", function () {
            expect(p.parse("1-ше. книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перша книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перше книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а. книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е. книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше. книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перша книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перше книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а. книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е. книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I книга хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше. Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I книга хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перша Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перше Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а. Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е. Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше. Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше. Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше. Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше. хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перша Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перша Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перша Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перша хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перше Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перше Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перше Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перше хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а. Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а. Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а. Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а. хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е. Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е. Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е. Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е. хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше. Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перша Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Перше Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а. Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е. Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ше Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-а Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-е Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Літопису 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Hroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Ȟroniky 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Хроніка 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I хроніки 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Хронік 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Хр 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1-ШЕ. КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРША КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРШЕ КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А. КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е. КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ. КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРША КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРШЕ КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А. КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е. КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I КНИГА ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ. ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I КНИГА ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРША ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРШЕ ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А. ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е. ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ. HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ. ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ. ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ. ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРША HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРША ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРША ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРША ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРШЕ HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРШЕ ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРШЕ ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРШЕ ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А. HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А. ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А. ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А. ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е. HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е. ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е. ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е. ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ. ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРША ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ПЕРШЕ ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А. ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е. ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-ШЕ ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-А ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1-Е ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I ЛІТОПИСУ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I HRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I ȞRONIKY 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I ХРОНІКА 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I ХРОНІКИ 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I ХРОНІК 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ХР 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (uk)", function () {
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
        return it("should handle book: Ezra (uk)", function () {
            expect(p.parse("Книга Ездри 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezdra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Єздри 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ездра 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ездри 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Єзд 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Езд 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ЕЗДРИ 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZDRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ЄЗДРИ 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ЕЗДРА 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ЕЗДРИ 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ЄЗД 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ЕЗД 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (uk)", function () {
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
        return it("should handle book: Neh (uk)", function () {
            expect(p.parse("Книга Нееміі 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Книга Неемії 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neemija 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Неемія 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Нееміі 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Неемії 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Неєміі 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Неємії 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Неем 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Неєм 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА НЕЕМІІ 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("КНИГА НЕЕМІЇ 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEEMIJA 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("НЕЕМІЯ 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("НЕЕМІІ 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("НЕЕМІЇ 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("НЕЄМІІ 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("НЕЄМІЇ 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("НЕЕМ 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("НЕЄМ 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (uk)", function () {
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
        return it("should handle book: GkEsth (uk)", function () {
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (uk)", function () {
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
        return it("should handle book: Esth (uk)", function () {
            expect(p.parse("Книга Естер 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Книга Есфір 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Ester 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Естер 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Есфір 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Ест 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ЕСТЕР 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("КНИГА ЕСФІР 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTER 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ЕСТЕР 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ЕСФІР 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ЕСТ 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (uk)", function () {
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
        return it("should handle book: Job (uk)", function () {
            expect(p.parse("Книга Іова 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Книга Иова 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Книга Йова 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Іова 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Иова 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Йова 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Jov 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Иов 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Йов 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ІОВА 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("КНИГА ИОВА 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("КНИГА ЙОВА 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("ІОВА 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("ИОВА 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("ЙОВА 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOV 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("ИОВ 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("ЙОВ 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (uk)", function () {
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
        return it("should handle book: Ps (uk)", function () {
            expect(p.parse("Книга Псалмів 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Псалти́р 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Псалмів 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Psalmy 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Псалми 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Пс 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПСАЛМІВ 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("ПСАЛТИ́Р 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("ПСАЛМІВ 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PSALMY 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("ПСАЛМИ 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("ПС 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (uk)", function () {
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
        return it("should handle book: PrAzar (uk)", function () {
            expect(p.parse("Молитва Азаріі 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Молитва Азарії 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (uk)", function () {
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
        return it("should handle book: Prov (uk)", function () {
            expect(p.parse("Книга Приповістеи Соломонових 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Книга Приповістей Соломонових 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Книга Приказок Соломонових 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Приповістеи соломонових 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Приповістей соломонових 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Притчі Соломона 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Приповістеи 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Приповістей 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prypovisti 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Приповідок 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Приповісті 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Приказки 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Приказок 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Притчі 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Притч 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Пр 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРИПОВІСТЕИ СОЛОМОНОВИХ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("КНИГА ПРИПОВІСТЕЙ СОЛОМОНОВИХ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("КНИГА ПРИКАЗОК СОЛОМОНОВИХ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИПОВІСТЕИ СОЛОМОНОВИХ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИПОВІСТЕЙ СОЛОМОНОВИХ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИТЧІ СОЛОМОНА 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИПОВІСТЕИ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИПОВІСТЕЙ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PRYPOVISTI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИПОВІДОК 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИПОВІСТІ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИКАЗКИ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИКАЗОК 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИТЧІ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПРИТЧ 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ПР 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (uk)", function () {
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
        return it("should handle book: Eccl (uk)", function () {
            expect(p.parse("Книга Екклезіястова 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Книга Еклезіястова 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Екклезіястова 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Еклезіястова 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Проповідника 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Ekklezijast 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Екклезіяста 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Екклезіяст 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Коге́лет 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Еккл 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Екл 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ЕККЛЕЗІЯСТОВА 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("КНИГА ЕКЛЕЗІЯСТОВА 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ЕККЛЕЗІЯСТОВА 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ЕКЛЕЗІЯСТОВА 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ПРОПОВІДНИКА 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("EKKLEZIJAST 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ЕККЛЕЗІЯСТА 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ЕККЛЕЗІЯСТ 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("КОГЕ́ЛЕТ 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ЕККЛ 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ЕКЛ 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (uk)", function () {
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
        return it("should handle book: SgThree (uk)", function () {
            expect(p.parse("Пісня трьох отроків 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (uk)", function () {
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
        return it("should handle book: Song (uk)", function () {
            expect(p.parse("Книга Пісні Пісень Соломона 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Пісня над піснями Соломона 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pisnja nad pisnjamy 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Пісня над піснями 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Пісня Піснеи 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Пісня Пісней 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Пісні Пісень 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("П. П. 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("П П. 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("П. П 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Пісн 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("П П 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПІСНІ ПІСЕНЬ СОЛОМОНА 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("ПІСНЯ НАД ПІСНЯМИ СОЛОМОНА 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISNJA NAD PISNJAMY 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("ПІСНЯ НАД ПІСНЯМИ 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("ПІСНЯ ПІСНЕИ 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("ПІСНЯ ПІСНЕЙ 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("ПІСНІ ПІСЕНЬ 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("П. П. 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("П П. 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("П. П 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("ПІСН 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("П П 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (uk)", function () {
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
        return it("should handle book: Jer (uk)", function () {
            expect(p.parse("Книга пророка Єреміі 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Книга пророка Єремії 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremija 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Єремія 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Єреміі 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Єремії 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Єр 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА ЄРЕМІІ 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("КНИГА ПРОРОКА ЄРЕМІЇ 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMIJA 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("ЄРЕМІЯ 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("ЄРЕМІІ 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("ЄРЕМІЇ 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("ЄР 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (uk)", function () {
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
        return it("should handle book: Ezek (uk)", function () {
            expect(p.parse("Книга пророка Єзекііля 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Книга пророка Єзекіїля 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Jezekiil' 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Jezekiil’ 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Jezekiïl' 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Jezekiïl’ 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Єзекііла 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Єзекііль 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Єзекііля 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Єзекіїла 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Єзекіїль 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Єзекіїля 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Єз 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА ЄЗЕКІІЛЯ 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("КНИГА ПРОРОКА ЄЗЕКІЇЛЯ 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("JEZEKIIL' 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("JEZEKIIL’ 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("JEZEKIÏL' 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("JEZEKIÏL’ 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ЄЗЕКІІЛА 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ЄЗЕКІІЛЬ 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ЄЗЕКІІЛЯ 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ЄЗЕКІЇЛА 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ЄЗЕКІЇЛЬ 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ЄЗЕКІЇЛЯ 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ЄЗ 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (uk)", function () {
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
        return it("should handle book: Dan (uk)", function () {
            expect(p.parse("Книга пророка Даниіла 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Книга пророка Даниїла 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Даниіла 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Даниїла 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Danyil 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Danyïl 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Даниіл 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Даниїл 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Дан 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА ДАНИІЛА 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("КНИГА ПРОРОКА ДАНИЇЛА 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("ДАНИІЛА 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("ДАНИЇЛА 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DANYIL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DANYÏL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("ДАНИІЛ 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("ДАНИЇЛ 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("ДАН 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (uk)", function () {
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
        return it("should handle book: Hos (uk)", function () {
            expect(p.parse("Книга пророка Осіі 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Книга пророка Осії 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Osija 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Осія 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Осіі 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Осії 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Ос 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА ОСІІ 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("КНИГА ПРОРОКА ОСІЇ 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OSIJA 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("ОСІЯ 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("ОСІІ 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("ОСІЇ 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("ОС 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (uk)", function () {
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
        return it("should handle book: Joel (uk)", function () {
            expect(p.parse("Книга пророка Иоіла 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Книга пророка Йоіла 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Книга Иоіла 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Книга Йоіла 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Иоіла 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Йоіла 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Joil 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Joïl 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Иоіл 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Иоін 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Иоїл 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Иоїн 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Йоіл 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Йоін 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Йоїл 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Йоїн 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА ИОІЛА 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("КНИГА ПРОРОКА ЙОІЛА 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("КНИГА ИОІЛА 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("КНИГА ЙОІЛА 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("ИОІЛА 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("ЙОІЛА 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOIL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOÏL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("ИОІЛ 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("ИОІН 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("ИОЇЛ 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("ИОЇН 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("ЙОІЛ 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("ЙОІН 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("ЙОЇЛ 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("ЙОЇН 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (uk)", function () {
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
        return it("should handle book: Amos (uk)", function () {
            expect(p.parse("Книга пророка Амоса 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Амоса 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Амос 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Ам 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА АМОСА 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("АМОСА 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("АМОС 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("АМ 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (uk)", function () {
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
        return it("should handle book: Obad (uk)", function () {
            expect(p.parse("Книга пророка Авдія 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Книга пророка Овдія 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Ovdij 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Авдія 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Овдіи 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Овдій 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Овдія 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Овд 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Ов 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА АВДІЯ 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("КНИГА ПРОРОКА ОВДІЯ 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OVDIJ 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("АВДІЯ 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ОВДІИ 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ОВДІЙ 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ОВДІЯ 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ОВД 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ОВ 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (uk)", function () {
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
        return it("should handle book: Jonah (uk)", function () {
            expect(p.parse("Книга пророка Иони 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Книга пророка Йони 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jona 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Иона 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Иони 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Йона 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Йони 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА ИОНИ 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("КНИГА ПРОРОКА ЙОНИ 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONA 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("ИОНА 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("ИОНИ 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("ЙОНА 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("ЙОНИ 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (uk)", function () {
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
        return it("should handle book: Mic (uk)", function () {
            expect(p.parse("Книга пророка Михея 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Книга пророка Міхея 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Myhej 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Myȟej 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Михеи 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Михей 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Михея 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Міхея 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Мих 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Міх 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА МИХЕЯ 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("КНИГА ПРОРОКА МІХЕЯ 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MYHEJ 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MYȞEJ 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("МИХЕИ 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("МИХЕЙ 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("МИХЕЯ 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("МІХЕЯ 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("МИХ 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("МІХ 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (uk)", function () {
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
        return it("should handle book: Nah (uk)", function () {
            expect(p.parse("Книга пророка Наума 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Наума 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Naum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Наум 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА НАУМА 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("НАУМА 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("НАУМ 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (uk)", function () {
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
        return it("should handle book: Hab (uk)", function () {
            expect(p.parse("Книга пророка Авакума 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Авакума 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Avakum 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Авакум 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Ав 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА АВАКУМА 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("АВАКУМА 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("AVAKUM 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("АВАКУМ 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("АВ 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (uk)", function () {
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
        return it("should handle book: Zeph (uk)", function () {
            expect(p.parse("Книга пророка Софоніі 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Книга пророка Софонії 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofonija 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Софонія 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Софоніі 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Софонії 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Соф 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА СОФОНІІ 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("КНИГА ПРОРОКА СОФОНІЇ 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONIJA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("СОФОНІЯ 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("СОФОНІІ 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("СОФОНІЇ 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("СОФ 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (uk)", function () {
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
        return it("should handle book: Hag (uk)", function () {
            expect(p.parse("Книга пророка Огія 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Книга Огія 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Аггея 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Ohij 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Огіи 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Огій 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Огія 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Ог 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА ОГІЯ 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("КНИГА ОГІЯ 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("АГГЕЯ 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("OHIJ 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("ОГІИ 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("ОГІЙ 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("ОГІЯ 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("ОГ 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (uk)", function () {
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
        return it("should handle book: Zech (uk)", function () {
            expect(p.parse("Книга пророка Захарія 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Книга Захаріі 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Книга Захарії 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zaharij 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zaȟarij 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Захаріи 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Захарій 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Захарія 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Захаріі 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Захарії 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Зах 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА ЗАХАРІЯ 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("КНИГА ЗАХАРІІ 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("КНИГА ЗАХАРІЇ 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZAHARIJ 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZAȞARIJ 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ЗАХАРІИ 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ЗАХАРІЙ 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ЗАХАРІЯ 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ЗАХАРІІ 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ЗАХАРІЇ 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ЗАХ 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (uk)", function () {
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
        return it("should handle book: Mal (uk)", function () {
            expect(p.parse("Книга пророка Малахіі 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Книга пророка Малахії 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Книга Малахіі 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Книга Малахії 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malahija 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malaȟija 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Малахія 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Малахіі 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Малахії 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Мал 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("КНИГА ПРОРОКА МАЛАХІІ 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("КНИГА ПРОРОКА МАЛАХІЇ 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("КНИГА МАЛАХІІ 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("КНИГА МАЛАХІЇ 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALAHIJA 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALAȞIJA 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("МАЛАХІЯ 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("МАЛАХІІ 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("МАЛАХІЇ 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("МАЛ 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (uk)", function () {
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
        return it("should handle book: Matt (uk)", function () {
            expect(p.parse("Євангелія від св. Матвія 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Євангеліє від св. Матвія 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Jevanhelije vid Matvija 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Євангелія від св Матвія 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Євангеліє від св Матвія 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Євангелія від Матвія 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Євангеліє від Матвія 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Євангеліє від Матея 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Від Матвія 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Матвія 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Матеи 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Матей 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Мат 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Мт 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ЄВАНГЕЛІЯ ВІД СВ. МАТВІЯ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД СВ. МАТВІЯ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("JEVANHELIJE VID MATVIJA 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("ЄВАНГЕЛІЯ ВІД СВ МАТВІЯ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД СВ МАТВІЯ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("ЄВАНГЕЛІЯ ВІД МАТВІЯ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД МАТВІЯ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД МАТЕЯ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("ВІД МАТВІЯ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("МАТВІЯ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("МАТЕИ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("МАТЕЙ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("МАТ 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("МТ 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (uk)", function () {
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
        return it("should handle book: 2Macc (uk)", function () {
            expect(p.parse("2-ге. книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-ге. книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Друга книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Друга книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Друге книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Друге книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-а. книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-а. книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-ге книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-ге книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-е. книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-е. книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-а книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-а книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-е книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-е книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 книга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 книга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-ге. Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-ге. Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Друга Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Друга Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Друге Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Друге Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-а. Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-а. Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-ге Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-ге Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-е. Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-е. Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-а Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-а Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-е Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2-е Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Макавеів 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Макавеїв 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Мак 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Мк 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (uk)", function () {
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
        return it("should handle book: 3Macc (uk)", function () {
            expect(p.parse("3-тє. книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-тє. книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Третя книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Третя книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Третє книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Третє книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-а. книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-а. книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-е. книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-е. книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-тє книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-тє книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-а книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-а книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-е книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-е книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 книга Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 книга Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-тє. Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-тє. Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Третя Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Третя Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Третє Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Третє Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-а. Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-а. Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-е. Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-е. Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-тє Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-тє Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-а Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-а Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-е Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3-е Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Макавеів 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Макавеїв 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Мак 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Мк 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (uk)", function () {
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
        return it("should handle book: 4Macc (uk)", function () {
            expect(p.parse("Четверта книга Макавеів 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Четверта книга Макавеїв 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. книга Макавеів 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. книга Макавеїв 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. книга Макавеів 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. книга Макавеїв 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV книга Макавеів 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV книга Макавеїв 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Четверта Макавеів 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Четверта Макавеїв 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 книга Макавеів 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 книга Макавеїв 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Макавеів 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Макавеїв 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Макавеів 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Макавеїв 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Макавеів 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Макавеїв 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Макавеів 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Макавеїв 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Мак 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Мк 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (uk)", function () {
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
        return it("should handle book: 1Macc (uk)", function () {
            expect(p.parse("1-ше. книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-ше. книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Перша книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Перша книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Перше книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Перше книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-а. книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-а. книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-е. книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-е. книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-ше книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-ше книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-а книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-а книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-е книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-е книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I книга Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I книга Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-ше. Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-ше. Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Перша Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Перша Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Перше Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Перше Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-а. Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-а. Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-е. Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-е. Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-ше Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-ше Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-а Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-а Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-е Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1-е Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Макавеів 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Макавеїв 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Мак 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Мк 1:1").osis()).toEqual("1Macc.1.1");
            return true;
        });
    });
    describe("Localized book Mark (uk)", function () {
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
        return it("should handle book: Mark (uk)", function () {
            expect(p.parse("Євангелія від св. Марка 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Євангеліє від св. Марка 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Євангелія від св Марка 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Євангеліє від св Марка 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Jevanhelije vid Marka 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Євангелія від Марка 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Євангеліє від Марка 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Від Марка 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Марка 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Марко 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Мк 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Мр 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ЄВАНГЕЛІЯ ВІД СВ. МАРКА 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД СВ. МАРКА 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("ЄВАНГЕЛІЯ ВІД СВ МАРКА 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД СВ МАРКА 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("JEVANHELIJE VID MARKA 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("ЄВАНГЕЛІЯ ВІД МАРКА 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД МАРКА 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("ВІД МАРКА 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("МАРКА 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("МАРКО 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("МК 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("МР 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (uk)", function () {
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
        return it("should handle book: Luke (uk)", function () {
            expect(p.parse("Євангелія від св. Луки 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Євангеліє від св. Луки 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Євангелія від св Луки 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Євангеліє від св Луки 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Jevanhelije vid Luky 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Євангеліє від Лу ки 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Євангелія від Луки 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Євангеліє від Луки 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Від Луки 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Лука 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Луки 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Лк 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ЄВАНГЕЛІЯ ВІД СВ. ЛУКИ 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД СВ. ЛУКИ 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("ЄВАНГЕЛІЯ ВІД СВ ЛУКИ 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД СВ ЛУКИ 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("JEVANHELIJE VID LUKY 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД ЛУ КИ 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("ЄВАНГЕЛІЯ ВІД ЛУКИ 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД ЛУКИ 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("ВІД ЛУКИ 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("ЛУКА 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("ЛУКИ 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("ЛК 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (uk)", function () {
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
        return it("should handle book: 1John (uk)", function () {
            expect(p.parse("1-ше. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перша соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перше соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше. соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перша соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перше соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а. соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е. соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I соборне послання св. апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I соборне послання св апостола Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Perse poslannja apostola Ivana 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Perše poslannja apostola Ivana 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше. послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перша послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перше послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а. послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е. послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I послання апостола Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше. Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перша Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перше Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а. Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е. Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Послання Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше. Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше. Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перша Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перша Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перше Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перше Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а. Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а. Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е. Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е. Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше. Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перша Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перше Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а. Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е. Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше. Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перша Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Перше Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а. Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е. Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ше Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-а Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-е Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Иоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Йоаново 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Іоанна 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Івана 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Ів 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1-ШЕ. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРША СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРШЕ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРША СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРШЕ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PERSE POSLANNJA APOSTOLA IVANA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PERŠE POSLANNJA APOSTOLA IVANA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ. ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ. ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРША ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРША ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРШЕ ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРШЕ ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А. ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А. ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е. ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е. ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ. ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРША ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРШЕ ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А. ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е. ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ. ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРША ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("ПЕРШЕ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А. ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е. ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-ШЕ ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-А ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1-Е ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I ИОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I ЙОАНОВО 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I ІОАННА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I ІВАНА 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ІВ 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (uk)", function () {
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
        return it("should handle book: 2John (uk)", function () {
            expect(p.parse("2-ге. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друга соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друге соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге. соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друга соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друге соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а. соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е. соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 соборне послання св. апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 соборне послання св апостола Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhe poslannja apostola Ivana 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге. послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друга послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друге послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а. послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е. послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 послання апостола Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге. Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друга Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друге Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а. Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е. Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Послання Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Послання до Тита 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге. Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге. Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друга Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друга Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друге Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друге Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а. Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а. Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге. Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е. Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е. Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друга Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друге Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а. Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге. Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е. Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друга Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Друге Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а. Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ге Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е. Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Иоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Йоаново 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-а Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-е Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Іоанна 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Івана 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Ів 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("2-ГЕ. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГА СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГЕ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГА СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГЕ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHE POSLANNJA APOSTOLA IVANA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ТИТА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ. ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ. ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГА ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГА ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГЕ ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГЕ ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А. ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А. ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ. ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е. ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е. ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГА ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГЕ ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А. ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ. ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е. ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГА ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ДРУГЕ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А. ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-ГЕ ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е. ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ИОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ЙОАНОВО 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-А ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2-Е ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ІОАННА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ІВАНА 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ІВ 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (uk)", function () {
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
        return it("should handle book: 3John (uk)", function () {
            expect(p.parse("3-тє. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третя соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третє соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє. соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третя соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третє соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а. соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е. соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 соборне послання св. апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 соборне послання св апостола Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tretje poslannja apostola Ivana 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє. послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третя послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третє послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а. послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е. послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 послання апостола Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє. Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третя Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третє Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а. Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е. Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Послання Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє. Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє. Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третя Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третя Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третє Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третє Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а. Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а. Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е. Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е. Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє. Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третя Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третє Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а. Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е. Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє. Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третя Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Третє Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а. Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е. Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-тє Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Иоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Йоаново 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-а Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-е Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Іоанна 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Івана 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Ів 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("3-ТЄ. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЯ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЄ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЯ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЄ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETJE POSLANNJA APOSTOLA IVANA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЯ ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЄ ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ПОСЛАННЯ АПОСТОЛА ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЯ ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЄ ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ПОСЛАННЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ. ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ. ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЯ ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЯ ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЄ ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЄ ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А. ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А. ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е. ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е. ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ. ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЯ ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЄ ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А. ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е. ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ. ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЯ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("ТРЕТЄ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А. ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е. ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-ТЄ ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ИОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ЙОАНОВО 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-А ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3-Е ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ІОАННА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ІВАНА 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ІВ 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (uk)", function () {
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
        return it("should handle book: John (uk)", function () {
            expect(p.parse("Євангелія від св. Івана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Євангеліє від св. Иоана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Євангеліє від св. Йоана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Євангелія від св Івана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Євангеліє від св Иоана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Євангеліє від св Йоана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Jevanhelije vid Ivana 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Євангелія від Івана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Євангеліє від Івана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Від Івана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Івана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Иоана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Йоана 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Иоан 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Йоан 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Ів 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Ін 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ЄВАНГЕЛІЯ ВІД СВ. ІВАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД СВ. ИОАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД СВ. ЙОАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ЄВАНГЕЛІЯ ВІД СВ ІВАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД СВ ИОАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД СВ ЙОАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JEVANHELIJE VID IVANA 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ЄВАНГЕЛІЯ ВІД ІВАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ЄВАНГЕЛІЄ ВІД ІВАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ВІД ІВАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ІВАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ИОАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ЙОАНА 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ИОАН 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ЙОАН 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ІВ 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("ІН 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (uk)", function () {
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
        return it("should handle book: Acts (uk)", function () {
            expect(p.parse("Dijannja svjatyh apostoliv 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Dijannja svjatyȟ apostoliv 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Діяння Святих Апостолів 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Діі святих апостолів 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Дії святих апостолів 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Діі Апостолів 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Дії Апостолів 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Діяння 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Діян 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Діі 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Дії 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DIJANNJA SVJATYH APOSTOLIV 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("DIJANNJA SVJATYȞ APOSTOLIV 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ДІЯННЯ СВЯТИХ АПОСТОЛІВ 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ДІІ СВЯТИХ АПОСТОЛІВ 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ДІЇ СВЯТИХ АПОСТОЛІВ 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ДІІ АПОСТОЛІВ 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ДІЇ АПОСТОЛІВ 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ДІЯННЯ 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ДІЯН 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ДІІ 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ДІЇ 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (uk)", function () {
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
        return it("should handle book: Rom (uk)", function () {
            expect(p.parse("Послання св. апостола Павла до римлян 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Послання св апостола Павла до римлян 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Poslannja apostola Pavla do rymljan 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Послання апостола Павла до римлян 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Послання до римлян 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("До римлян 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Римляни 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Римлян 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Рим 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО РИМЛЯН 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО РИМЛЯН 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("POSLANNJA APOSTOLA PAVLA DO RYMLJAN 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО РИМЛЯН 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ПОСЛАННЯ ДО РИМЛЯН 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ДО РИМЛЯН 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("РИМЛЯНИ 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("РИМЛЯН 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("РИМ 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (uk)", function () {
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
        return it("should handle book: 2Cor (uk)", function () {
            expect(p.parse("Druhe poslannja apostola Pavla do korynfjan 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге. послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друга послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друге послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а. послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е. послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 послання апостола Павла до коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге. Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друга Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друге Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а. Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е. Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Послання до Коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге. до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друга до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друге до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а. до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е. до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге. Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друга Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друге Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а. Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге. Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге. коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е. Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друга Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друга коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друге Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Друге коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 до коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а. Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а. коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ге коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е. Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е. коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-а коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-е коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Коринтяни 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Коринфян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 коринтян 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Кор 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHE POSLANNJA APOSTOLA PAVLA DO KORYNFJAN 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ. ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГА ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГЕ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А. ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е. ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ. КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГА КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГЕ КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А. КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ. КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ. КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е. КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГА КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГА КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГЕ КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ДРУГЕ КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ДО КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А. КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А. КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-ГЕ КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е. КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е. КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-А КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2-Е КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 КОРИНТЯНИ 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 КОРИНФЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 КОРИНТЯН 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 КОР 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (uk)", function () {
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
        return it("should handle book: 1Cor (uk)", function () {
            expect(p.parse("Perse poslannja apostola Pavla do korynfjan 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Perše poslannja apostola Pavla do korynfjan 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше. послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перша послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перше послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а. послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е. послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I послання апостола Павла до коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше. Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перша Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перше Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а. Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е. Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Послання до Коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше. до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перша до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перше до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а. до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е. до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше. Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перша Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перше Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а. Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е. Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше. Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше. коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перша Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перша коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перше Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Перше коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а. Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а. коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е. Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е. коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ше коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I до коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-а коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-е коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Коринтяни 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Коринфян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I коринтян 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Кор 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PERSE POSLANNJA APOSTOLA PAVLA DO KORYNFJAN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PERŠE POSLANNJA APOSTOLA PAVLA DO KORYNFJAN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I ПОСЛАННЯ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ. ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРША ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРШЕ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А. ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е. ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ. КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРША КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРШЕ КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А. КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е. КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ. КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ. КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРША КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРША КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРШЕ КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("ПЕРШЕ КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А. КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А. КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е. КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е. КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-ШЕ КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I ДО КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-А КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1-Е КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I КОРИНТЯНИ 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I КОРИНФЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I КОРИНТЯН 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 КОР 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (uk)", function () {
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
        return it("should handle book: Gal (uk)", function () {
            expect(p.parse("Послання св. апостола Павла до галатів 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Послання св апостола Павла до галатів 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Poslannja apostola Pavla do halativ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Послання апостола Павла до галатів 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("По слання до Галатів 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Послання до галатів 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("До галатів 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Галатяни 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Галатів 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Гал 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ГАЛАТІВ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ГАЛАТІВ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("POSLANNJA APOSTOLA PAVLA DO HALATIV 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ГАЛАТІВ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("ПО СЛАННЯ ДО ГАЛАТІВ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ГАЛАТІВ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("ДО ГАЛАТІВ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("ГАЛАТЯНИ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("ГАЛАТІВ 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("ГАЛ 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (uk)", function () {
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
        return it("should handle book: Eph (uk)", function () {
            expect(p.parse("Послання св. апостола Павла до ефесян 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Послання св апостола Павла до ефесян 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Poslannja apostola Pavla do efesjan 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Послання апостола Павла до ефесян 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("По слан ня до Єфесян 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Послання до ефесян 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("До ефесян 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ефесяни 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ефесян 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Єф 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Еф 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ЕФЕСЯН 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ЕФЕСЯН 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("POSLANNJA APOSTOLA PAVLA DO EFESJAN 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ЕФЕСЯН 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ПО СЛАН НЯ ДО ЄФЕСЯН 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ЕФЕСЯН 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ДО ЕФЕСЯН 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ЕФЕСЯНИ 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ЕФЕСЯН 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ЄФ 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ЕФ 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (uk)", function () {
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
        return it("should handle book: Phil (uk)", function () {
            expect(p.parse("Послання св. апостола Павла до филип'ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Послання св. апостола Павла до филип’ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Послання св апостола Павла до филип'ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Послання св апостола Павла до филип’ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Poslannja apostola Pavla do fylyp'jan 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Poslannja apostola Pavla do fylyp’jan 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Послання апостола Павла до филип'ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Послання апостола Павла до филип’ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Послання до Філіп'ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Послання до Філіп’ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Послання до филип'ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Послання до филип’ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("До филип'ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("До филип’ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Филип'яни 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Филип’яни 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Филип'ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Филипяни 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Филип’ян 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Фил 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Флп 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ФИЛИП'ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ФИЛИП’ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ФИЛИП'ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ФИЛИП’ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("POSLANNJA APOSTOLA PAVLA DO FYLYP'JAN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("POSLANNJA APOSTOLA PAVLA DO FYLYP’JAN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ФИЛИП'ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ФИЛИП’ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ФІЛІП'ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ФІЛІП’ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ФИЛИП'ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ФИЛИП’ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ДО ФИЛИП'ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ДО ФИЛИП’ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ФИЛИП'ЯНИ 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ФИЛИП’ЯНИ 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ФИЛИП'ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ФИЛИПЯНИ 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ФИЛИП’ЯН 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ФИЛ 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("ФЛП 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (uk)", function () {
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
        return it("should handle book: Col (uk)", function () {
            expect(p.parse("Послання св. апостола Павла до колосян 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Послання св апостола Павла до колосян 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Poslannja apostola Pavla do kolosjan 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Послання апостола Павла до колосян 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Послання до Колосян 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("До колоссян 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Колоссян 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Колосяни 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Колосян 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Кол 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО КОЛОСЯН 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО КОЛОСЯН 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("POSLANNJA APOSTOLA PAVLA DO KOLOSJAN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО КОЛОСЯН 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("ПОСЛАННЯ ДО КОЛОСЯН 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("ДО КОЛОССЯН 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("КОЛОССЯН 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("КОЛОСЯНИ 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("КОЛОСЯН 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("КОЛ 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (uk)", function () {
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
        return it("should handle book: 2Thess (uk)", function () {
            expect(p.parse("2-ге. послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhe poslannja apostola Pavla do solunjan 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 послання св. апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 послання св апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 послання апостола Павла до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 послання до фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 послання до фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 послання до салонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 послання до салонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 послання до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 фессалонікіиців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 фессалонікійців 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге. Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друга Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Друге Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 до солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а. Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ге Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е. Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-а Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-е Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Солуньці 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Солунян 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Сол 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("2-ГЕ. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHE POSLANNJA APOSTOLA PAVLA DO SOLUNJAN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ. СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГА СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ДРУГЕ СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ДО СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А. СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-ГЕ СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е. СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-А СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2-Е СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 СОЛУНЬЦІ 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 СОЛУНЯН 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 СОЛ 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (uk)", function () {
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
        return it("should handle book: 1Thess (uk)", function () {
            expect(p.parse("1-ше. послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Perse poslannja apostola Pavla do solunjan 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Perše poslannja apostola Pavla do solunjan 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I послання св. апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I послання св апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I послання апостола Павла до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I послання до фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I послання до фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I послання до салонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I послання до салонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I послання до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I фессалонікіиців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I фессалонікійців 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше. Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перша Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Перше Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а. Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е. Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ше Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I до солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-а Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-е Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Солуньці 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Солунян 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Сол 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1-ШЕ. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PERSE POSLANNJA APOSTOLA PAVLA DO SOLUNJAN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PERŠE POSLANNJA APOSTOLA PAVLA DO SOLUNJAN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ПОСЛАННЯ ДО ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ПОСЛАННЯ ДО ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ПОСЛАННЯ ДО САЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ПОСЛАННЯ ДО САЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ПОСЛАННЯ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ФЕССАЛОНІКІИЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ФЕССАЛОНІКІЙЦІВ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ. СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРША СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("ПЕРШЕ СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А. СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е. СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-ШЕ СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ДО СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-А СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1-Е СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I СОЛУНЬЦІ 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I СОЛУНЯН 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 СОЛ 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (uk)", function () {
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
        return it("should handle book: 2Tim (uk)", function () {
            expect(p.parse("2-ге. послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друга послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друге послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а. послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге. послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е. послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друга послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друге послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а. послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е. послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhe poslannja apostola Pavla do Tymofija 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге. послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друга послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друге послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а. послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е. послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 послання апостола Павла до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге. послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге. послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друга послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друга послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друге послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друге послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а. послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а. послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е. послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е. послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге. послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друга послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друге послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 послання до Тимотея 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 послання до Тимофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а. послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е. послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 послання Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге. Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друга Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друге Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а. Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге. Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге. Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге. Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е. Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друга Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друга Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друга Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друге Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друге Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Друге Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а. Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а. Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а. Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ге Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е. Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е. Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е. Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-а Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-е Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Ти­мофія 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Тимотеи 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Тимотей 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Тимофію 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Тим 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("2-ГЕ. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHE POSLANNJA APOSTOLA PAVLA DO TYMOFIJA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ. ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГА ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГЕ ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А. ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ. ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ. ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ. ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е. ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГА ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГА ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГА ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГЕ ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГЕ ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ДРУГЕ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А. ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А. ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А. ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-ГЕ ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е. ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е. ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е. ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-А ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2-Е ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ТИ­МОФІЯ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ТИМОТЕИ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ТИМОТЕЙ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ТИМОФІЮ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ТИМ 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (uk)", function () {
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
        return it("should handle book: 1Tim (uk)", function () {
            expect(p.parse("1-ше. послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перша послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перше послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а. послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е. послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше. послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перша послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перше послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а. послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е. послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Perse poslannja apostola Pavla do Tymofija 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Perše poslannja apostola Pavla do Tymofija 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I послання св. апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше. послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I послання св апостола Павла до Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перша послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перше послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а. послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е. послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I послання апостола Павла до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше. послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше. послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перша послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перша послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перше послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перше послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а. послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а. послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е. послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е. послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше. послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перша послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перше послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а. послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е. послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I послання до Тимотея 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I послання до Тимофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I послання Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше. Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перша Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перше Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а. Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е. Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше. Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше. Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше. Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перша Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перша Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перша Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перше Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перше Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Перше Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а. Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а. Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а. Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е. Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е. Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е. Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ше Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-а Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-е Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Ти­мофія 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Тимотеи 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Тимотей 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Тимофію 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Тим 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1-ШЕ. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PERSE POSLANNJA APOSTOLA PAVLA DO TYMOFIJA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PERŠE POSLANNJA APOSTOLA PAVLA DO TYMOFIJA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I ПОСЛАННЯ ДО ТИМОТЕЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I ПОСЛАННЯ ДО ТИМОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I ПОСЛАННЯ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ. ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРША ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРШЕ ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А. ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е. ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ. ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ. ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ. ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРША ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРША ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРША ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРШЕ ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРШЕ ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("ПЕРШЕ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А. ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А. ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А. ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е. ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е. ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е. ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-ШЕ ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-А ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1-Е ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I ТИ­МОФІЯ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I ТИМОТЕИ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I ТИМОТЕЙ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I ТИМОФІЮ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ТИМ 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (uk)", function () {
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
        return it("should handle book: Titus (uk)", function () {
            expect(p.parse("Послання св. апостола Павла до Тита 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Послання св апостола Павла до Тита 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Poslannja apostola Pavla do Tyta 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Послання апостола Павла до Тита 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Послан ня до Тита 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("До Тита 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Тита 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Тит 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ТИТА 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ТИТА 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("POSLANNJA APOSTOLA PAVLA DO TYTA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ТИТА 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("ПОСЛАН НЯ ДО ТИТА 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("ДО ТИТА 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("ТИТА 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("ТИТ 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (uk)", function () {
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
        return it("should handle book: Phlm (uk)", function () {
            expect(p.parse("Послання св. апостола Павла до Филимона 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Послання св апостола Павла до Филимона 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Poslannja apostola Pavla do Fylymona 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Послання апостола Павла до Филимона 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Послання до Филипіиців 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Послання до Филипійців 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Послання до Филимона 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("До Филимона 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Филимона 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Филимон 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Филим 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Флм 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ПОСЛАННЯ СВ. АПОСТОЛА ПАВЛА ДО ФИЛИМОНА 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("ПОСЛАННЯ СВ АПОСТОЛА ПАВЛА ДО ФИЛИМОНА 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("POSLANNJA APOSTOLA PAVLA DO FYLYMONA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("ПОСЛАННЯ АПОСТОЛА ПАВЛА ДО ФИЛИМОНА 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ФИЛИПІИЦІВ 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ФИЛИПІЙЦІВ 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ФИЛИМОНА 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("ДО ФИЛИМОНА 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("ФИЛИМОНА 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("ФИЛИМОН 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("ФИЛИМ 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("ФЛМ 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (uk)", function () {
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
        return it("should handle book: Heb (uk)", function () {
            expect(p.parse("Poslannja do jevreiv 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Poslannja do jevreïv 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Послан ня до Євреів 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Послан ня до Євреїв 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Послання до євреів 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Послання до євреїв 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("До євреів 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("До євреїв 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Євреів 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Євреїв 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Євреі 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Євреї 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Євр 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("POSLANNJA DO JEVREIV 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("POSLANNJA DO JEVREÏV 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ПОСЛАН НЯ ДО ЄВРЕІВ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ПОСЛАН НЯ ДО ЄВРЕЇВ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ЄВРЕІВ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ПОСЛАННЯ ДО ЄВРЕЇВ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ДО ЄВРЕІВ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ДО ЄВРЕЇВ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ЄВРЕІВ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ЄВРЕЇВ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ЄВРЕІ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ЄВРЕЇ 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ЄВР 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (uk)", function () {
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
        return it("should handle book: Jas (uk)", function () {
            expect(p.parse("Соборне послання св. апостола Якова 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Соборне послання св апостола Якова 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Poslannja apostola Jakova 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Послання апостола Якова 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Соборне послання Якова 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Послання Якова 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Якова 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Яков 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Як 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ЯКОВА 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ЯКОВА 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("POSLANNJA APOSTOLA JAKOVA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("ПОСЛАННЯ АПОСТОЛА ЯКОВА 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("СОБОРНЕ ПОСЛАННЯ ЯКОВА 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("ПОСЛАННЯ ЯКОВА 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("ЯКОВА 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("ЯКОВ 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("ЯК 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (uk)", function () {
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
        return it("should handle book: 2Pet (uk)", function () {
            expect(p.parse("2-ге. соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друга соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друге соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а. соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге. соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е. соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друга соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друге соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а. соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е. соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 соборне послання св. апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге. соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друга соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друге соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 соборне послання св апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а. соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е. соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 соборне послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhe poslannja apostola Petra 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге. послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друга послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друге послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а. послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге. соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е. послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друга соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друге соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а. соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е. соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 послання апостола Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 соборне послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге. послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друга послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друге послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а. послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е. послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 послання Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге. Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друга Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друге Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а. Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е. Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге. Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друга Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Друге Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а. Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ге Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е. Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Петрово 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-а Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-е Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Петра 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Петр 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Пет 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("2-ГЕ. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГА СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГЕ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГА СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГЕ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ. СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГА СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГЕ СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А. СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е. СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHE POSLANNJA APOSTOLA PETRA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ. СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГА СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГЕ СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А. СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е. СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ. ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГА ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А. ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е. ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ. ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГА ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГЕ ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А. ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е. ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ. ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГА ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ДРУГЕ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А. ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-ГЕ ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е. ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ПЕТРОВО 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-А ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2-Е ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ПЕТРА 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ПЕТР 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ПЕТ 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (uk)", function () {
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
        return it("should handle book: 1Pet (uk)", function () {
            expect(p.parse("1-ше. соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перша соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перше соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а. соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е. соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше. соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перша соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перше соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а. соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е. соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше. соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I соборне послання св. апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перша соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перше соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а. соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е. соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I соборне послання св апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I соборне послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Perse poslannja apostola Petra 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Perše poslannja apostola Petra 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше. послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перша послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перше послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а. послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е. послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше. соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перша соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перше соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а. соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е. соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I послання апостола Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I соборне послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше. послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перша послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перше послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а. послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е. послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I послання Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше. Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перша Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перше Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а. Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е. Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше. Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перша Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Перше Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а. Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е. Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ше Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-а Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-е Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Петрово 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Петра 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Петр 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Пет 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1-ШЕ. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРША СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРШЕ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРША СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРШЕ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ. СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРША СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРШЕ СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А. СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е. СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I СОБОРНЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PERSE POSLANNJA APOSTOLA PETRA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PERŠE POSLANNJA APOSTOLA PETRA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ. СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРША СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРШЕ СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А. СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е. СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I ПОСЛАННЯ АПОСТОЛА ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I СОБОРНЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ. ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРША ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРШЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А. ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е. ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I ПОСЛАННЯ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ. ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРША ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРШЕ ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А. ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е. ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ. ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРША ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("ПЕРШЕ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А. ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е. ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-ШЕ ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-А ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1-Е ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I ПЕТРОВО 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I ПЕТРА 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ПЕТР 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ПЕТ 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (uk)", function () {
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
        return it("should handle book: Jude (uk)", function () {
            expect(p.parse("Соборне послання св. апостола Юди 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Соборне послання св апостола Юди 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Poslannja apostola Judy 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Послання апостола Юди 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Соборне послання Юди 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Послання Іуди 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Послання Юди 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Іуд 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Юда 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Юди 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Юд 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("СОБОРНЕ ПОСЛАННЯ СВ. АПОСТОЛА ЮДИ 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("СОБОРНЕ ПОСЛАННЯ СВ АПОСТОЛА ЮДИ 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("POSLANNJA APOSTOLA JUDY 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("ПОСЛАННЯ АПОСТОЛА ЮДИ 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("СОБОРНЕ ПОСЛАННЯ ЮДИ 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("ПОСЛАННЯ ІУДИ 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("ПОСЛАННЯ ЮДИ 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("ІУД 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("ЮДА 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("ЮДИ 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("ЮД 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (uk)", function () {
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
        return it("should handle book: Tob (uk)", function () {
            expect(p.parse("Книга Товита 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Товита 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Товит 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Тов 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (uk)", function () {
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
        return it("should handle book: Jdt (uk)", function () {
            expect(p.parse("Книга Юдити 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Юдити 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (uk)", function () {
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
        return it("should handle book: Bar (uk)", function () {
            expect(p.parse("Варуха 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Вар 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (uk)", function () {
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
        return it("should handle book: Sus (uk)", function () {
            expect(p.parse("Сусанна 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Сус 1:1").osis()).toEqual("Sus.1.1");
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
            return expect(p.languages).toEqual(["uk"]);
        });
        it("should handle ranges (uk)", function () {
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (uk)", function () {
            expect(p.parse("Titus 1:1, глави 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 ГЛАВИ 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, глава 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 ГЛАВА 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, гл 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 ГЛ 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, розділ 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 РОЗДІЛ 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, розд 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 РОЗД 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (uk)", function () {
            expect(p.parse("Exod 1:1 вірші 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm ВІРШІ 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 вірш 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm ВІРШ 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (uk)", function () {
            expect(p.parse("Exod 1:1 і 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 І 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (uk)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (uk)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (uk)", function () {
            expect(p.parse("Lev 1 (ERV)").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
            return expect(p.parse("lev 1 erv").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
        });
        it("should handle book ranges (uk)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            return expect(p.parse("Перша - Третя  Івана").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (uk)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=uk.spec.js.map