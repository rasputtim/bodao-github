"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/ht_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (ht)", function () {
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
        return it("should handle book: Gen (ht)", function () {
            expect(p.parse("liv Konmansman an 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Konmansman 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Jenez 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Jen??z 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Jen 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV KONMANSMAN AN 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("KONMANSMAN 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("JENEZ 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("JEN??Z 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("JEN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (ht)", function () {
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
        return it("should handle book: Exod (ht)", function () {
            expect(p.parse("liv delivrans lan 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Delivrans 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Egzod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Egz??d 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Egz 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV DELIVRANS LAN 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DELIVRANS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EGZOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EGZ??D 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EGZ 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Lev (ht)", function () {
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
        return it("should handle book: Lev (ht)", function () {
            expect(p.parse("liv Prensip lavi nan Bondye 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Levitik 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV PRENSIP LAVI NAN BONDYE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITIK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (ht)", function () {
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
        return it("should handle book: Num (ht)", function () {
            expect(p.parse("liv Resansman an 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Resansman 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Nonb 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Res 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV RESANSMAN AN 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("RESANSMAN 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NONB 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("RES 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (ht)", function () {
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
        return it("should handle book: Sir (ht)", function () {
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (ht)", function () {
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
        return it("should handle book: Wis (ht)", function () {
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (ht)", function () {
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
        return it("should handle book: Lam (ht)", function () {
            expect(p.parse("Chante pou plenn So lavil Jerizalem 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Chante pou plenn So lavil Jerizal??m 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Chante pou plenn S?? lavil Jerizalem 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Chante pou plenn S?? lavil Jerizal??m 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lamantasyon 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plenn 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CHANTE POU PLENN SO LAVIL JERIZALEM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("CHANTE POU PLENN SO LAVIL JERIZAL??M 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("CHANTE POU PLENN S?? LAVIL JERIZALEM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("CHANTE POU PLENN S?? LAVIL JERIZAL??M 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAMANTASYON 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLENN 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (ht)", function () {
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
        return it("should handle book: EpJer (ht)", function () {
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (ht)", function () {
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
        return it("should handle book: Rev (ht)", function () {
            expect(p.parse("Revelasyon 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apokalips 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("REVELASYON 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APOKALIPS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (ht)", function () {
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
        return it("should handle book: PrMan (ht)", function () {
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (ht)", function () {
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
        return it("should handle book: Deut (ht)", function () {
            expect(p.parse("Dezyem liv Lalwa a 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Dezy??m liv Lalwa a 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deteronom 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deteron??m 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Detewonom 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Detewon??m 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Det 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEZYEM LIV LALWA A 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEZY??M LIV LALWA A 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DETERONOM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DETERON??M 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DETEWONOM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DETEWON??M 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DET 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (ht)", function () {
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
        return it("should handle book: Josh (ht)", function () {
            expect(p.parse("Liv Jozye a 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jozye 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Joz 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV JOZYE A 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOZYE 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOZ 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (ht)", function () {
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
        return it("should handle book: Judg (ht)", function () {
            expect(p.parse("Liv Chef yo 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Liv Ch??f yo 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Jij 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV CHEF YO 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("LIV CH??F YO 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JIJ 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (ht)", function () {
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
        return it("should handle book: Ruth (ht)", function () {
            expect(p.parse("Liv Rit la 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rit 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV RIT LA 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RIT 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (ht)", function () {
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
        return it("should handle book: 1Esd (ht)", function () {
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (ht)", function () {
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
        return it("should handle book: 2Esd (ht)", function () {
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (ht)", function () {
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
        return it("should handle book: Isa (ht)", function () {
            expect(p.parse("Liv Ezayi a 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Ezayi 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Ez 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV EZAYI A 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("EZAYI 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("EZ 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (ht)", function () {
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
        return it("should handle book: 2Sam (ht)", function () {
            expect(p.parse("Dezyem liv Samyel la 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Dezyem liv Samy??l la 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Dezy??m liv Samyel la 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Dezy??m liv Samy??l la 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Dezyem Samyel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Dezyem Samy??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Dezy??m Samyel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Dezy??m Samy??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samyel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samy??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samyel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samy??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samyel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samy??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samyel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samy??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEZYEM LIV SAMYEL LA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DEZYEM LIV SAMY??L LA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DEZY??M LIV SAMYEL LA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DEZY??M LIV SAMY??L LA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DEZYEM SAMYEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DEZYEM SAMY??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DEZY??M SAMYEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DEZY??M SAMY??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMYEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMY??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMYEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMY??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMYEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMY??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMYEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMY??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (ht)", function () {
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
        return it("should handle book: 1Sam (ht)", function () {
            expect(p.parse("Premye liv Samyel la 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Premye liv Samy??l la 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Premye Samyel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Premye Samy??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samyel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samy??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samyel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samy??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samyel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samy??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samyel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samy??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PREMYE LIV SAMYEL LA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PREMYE LIV SAMY??L LA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PREMYE SAMYEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PREMYE SAMY??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMYEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMY??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMYEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMY??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMYEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMY??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMYEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMY??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (ht)", function () {
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
        return it("should handle book: 2Kgs (ht)", function () {
            expect(p.parse("Dezyem liv Wa yo 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Dezy??m liv Wa yo 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Dezyem Wa 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Dezy??m Wa 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Wa 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Wa 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Wa 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Wa 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEZYEM LIV WA YO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DEZY??M LIV WA YO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DEZYEM WA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DEZY??M WA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. WA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. WA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II WA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 WA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (ht)", function () {
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
        return it("should handle book: 1Kgs (ht)", function () {
            expect(p.parse("Premye liv Wa yo 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Premye Wa 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Wa 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Wa 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Wa 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Wa 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PREMYE LIV WA YO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PREMYE WA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. WA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. WA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 WA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I WA 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (ht)", function () {
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
        return it("should handle book: 2Chr (ht)", function () {
            expect(p.parse("Dezyem liv Kwonik la 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Dezy??m liv Kwonik la 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Dezyem Kwonik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Dezy??m Kwonik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Dezyem Istwa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Dezy??m Istwa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kwonik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kwonik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kwonik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Istwa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kwonik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Istwa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Istwa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Istwa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Ist 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEZYEM LIV KWONIK LA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DEZY??M LIV KWONIK LA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DEZYEM KWONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DEZY??M KWONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DEZYEM ISTWA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DEZY??M ISTWA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KWONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KWONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KWONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. ISTWA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KWONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ISTWA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II ISTWA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ISTWA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 IST 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (ht)", function () {
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
        return it("should handle book: 1Chr (ht)", function () {
            expect(p.parse("Premye liv Kwonik la 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Premye Kwonik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Premye Istwa 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kwonik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kwonik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kwonik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Istwa 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kwonik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Istwa 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Istwa 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Istwa 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Ist 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PREMYE LIV KWONIK LA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PREMYE KWONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PREMYE ISTWA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KWONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KWONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KWONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ISTWA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KWONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. ISTWA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ISTWA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I ISTWA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 IST 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (ht)", function () {
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
        return it("should handle book: Ezra (ht)", function () {
            expect(p.parse("Liv Esdras la 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Esdras 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Esd 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV ESDRAS LA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ESDRAS 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ESD 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (ht)", function () {
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
        return it("should handle book: Neh (ht)", function () {
            expect(p.parse("Liv Neyemi an 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neyemi 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neemi 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Ne 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV NEYEMI AN 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEYEMI 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEEMI 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NE 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (ht)", function () {
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
        return it("should handle book: GkEsth (ht)", function () {
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (ht)", function () {
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
        return it("should handle book: Esth (ht)", function () {
            expect(p.parse("Liv Este a 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Liv Est?? a 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Este 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Est?? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Est 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV ESTE A 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("LIV EST?? A 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTE 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("EST?? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("EST 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (ht)", function () {
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
        return it("should handle book: Job (ht)", function () {
            expect(p.parse("Liv Job la 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Liv J??b la 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("J??b 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV JOB LA 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("LIV J??B LA 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("J??B 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (ht)", function () {
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
        return it("should handle book: Ps (ht)", function () {
            expect(p.parse("Liv Som yo 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Liv S??m yo 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Som 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("S??m 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV SOM YO 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("LIV S??M YO 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("SOM 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("S??M 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (ht)", function () {
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
        return it("should handle book: PrAzar (ht)", function () {
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (ht)", function () {
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
        return it("should handle book: Prov (ht)", function () {
            expect(p.parse("Liv Pwoveb yo 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Liv Pwov??b yo 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pwoveb 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pwov??b 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pw 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV PWOVEB YO 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("LIV PWOV??B YO 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PWOVEB 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PWOV??B 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PW 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (ht)", function () {
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
        return it("should handle book: Eccl (ht)", function () {
            expect(p.parse("Eklezyas - Liv Filozof la 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eklezyas - Liv Filoz??f la 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Liv Filozof la 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Liv Filoz??f la 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eklezyas 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Filozof 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Filoz??f 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Ekl 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EKLEZYAS - LIV FILOZOF LA 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("EKLEZYAS - LIV FILOZ??F LA 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("LIV FILOZOF LA 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("LIV FILOZ??F LA 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("EKLEZYAS 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("FILOZOF 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("FILOZ??F 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("EKL 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (ht)", function () {
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
        return it("should handle book: SgThree (ht)", function () {
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (ht)", function () {
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
        return it("should handle book: Song (ht)", function () {
            expect(p.parse("Kantid de Kantik 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pi bel Chante a 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pi b??l Chante a 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Chante Salomon 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Chante 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KANTID DE KANTIK 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PI BEL CHANTE A 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PI B??L CHANTE A 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("CHANTE SALOMON 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("CHANTE 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (ht)", function () {
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
        return it("should handle book: Jer (ht)", function () {
            expect(p.parse("Liv Jeremi an 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremi 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV JEREMI AN 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMI 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (ht)", function () {
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
        return it("should handle book: Ezek (ht)", function () {
            expect(p.parse("Liv Ezekyel la 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Liv Ezeky??l la 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezekyel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezeky??l 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Eze 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV EZEKYEL LA 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("LIV EZEKY??L LA 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEKYEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEKY??L 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZE 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (ht)", function () {
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
        return it("should handle book: Dan (ht)", function () {
            expect(p.parse("Liv Danyel la 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Liv Dany??l la 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Danyel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dany??l 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV DANYEL LA 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("LIV DANY??L LA 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DANYEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DANY??L 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (ht)", function () {
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
        return it("should handle book: Hos (ht)", function () {
            expect(p.parse("Liv Oze a 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Oze 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV OZE A 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZE 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (ht)", function () {
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
        return it("should handle book: Joel (ht)", function () {
            expect(p.parse("Liv Jowel la 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Liv Jow??l la 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Jowel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Jow??l 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV JOWEL LA 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("LIV JOW??L LA 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOWEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOW??L 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (ht)", function () {
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
        return it("should handle book: Amos (ht)", function () {
            expect(p.parse("Liv Amos la 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Liv Am??s la 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am??s 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV AMOS LA 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("LIV AM??S LA 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM??S 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (ht)", function () {
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
        return it("should handle book: Obad (ht)", function () {
            expect(p.parse("Liv Abdyas la 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdias 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdyas 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abd 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV ABDYAS LA 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDIAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDYAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABD 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (ht)", function () {
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
        return it("should handle book: Jonah (ht)", function () {
            expect(p.parse("Liv Jonas la 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonas 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV JONAS LA 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAS 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (ht)", function () {
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
        return it("should handle book: Mic (ht)", function () {
            expect(p.parse("Liv Miche a 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Miche 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV MICHE A 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHE 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (ht)", function () {
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
        return it("should handle book: Nah (ht)", function () {
            expect(p.parse("Liv Nawoum lan 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nawoum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nawoun 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Naw 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV NAWOUM LAN 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAWOUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAWOUN 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAW 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (ht)", function () {
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
        return it("should handle book: Hab (ht)", function () {
            expect(p.parse("Liv Abakik la 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Abakouk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Abakik 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Abak 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV ABAKIK LA 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("ABAKOUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("ABAKIK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("ABAK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (ht)", function () {
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
        return it("should handle book: Zeph (ht)", function () {
            expect(p.parse("Liv Sofoni an 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofoni 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sof 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV SOFONI AN 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONI 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOF 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (ht)", function () {
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
        return it("should handle book: Hag (ht)", function () {
            expect(p.parse("Liv Aje a 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Aje 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV AJE A 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AJE 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (ht)", function () {
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
        return it("should handle book: Zech (ht)", function () {
            expect(p.parse("Liv Zakari a 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zakari 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zak 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV ZAKARI A 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZAKARI 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZAK 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (ht)", function () {
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
        return it("should handle book: Mal (ht)", function () {
            expect(p.parse("Liv Malachi a 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malachi 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIV MALACHI A 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALACHI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (ht)", function () {
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
        return it("should handle book: Matt (ht)", function () {
            expect(p.parse("Matye 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mat 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MATYE 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MAT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (ht)", function () {
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
        return it("should handle book: Mark (ht)", function () {
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mak 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mk 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MAK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (ht)", function () {
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
        return it("should handle book: Luke (ht)", function () {
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lik 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lk 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LIK 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LK 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (ht)", function () {
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
        return it("should handle book: 1John (ht)", function () {
            expect(p.parse("Premye Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Jn 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PREMYE JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JN 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (ht)", function () {
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
        return it("should handle book: 2John (ht)", function () {
            expect(p.parse("Dezyem Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Dezy??m Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Jn 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEZYEM JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DEZY??M JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (ht)", function () {
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
        return it("should handle book: 3John (ht)", function () {
            expect(p.parse("III Jan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Jan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Jn 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("III JAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (ht)", function () {
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
        return it("should handle book: John (ht)", function () {
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Jan 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Jn 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JN 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (ht)", function () {
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
        return it("should handle book: Acts (ht)", function () {
            expect(p.parse("Aksyon apot yo 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Aksyon ap??t yo 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Travay apot yo 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Travay ap??t yo 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Akdezapot 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Akd??zapot 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Travay 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Tr 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AKSYON APOT YO 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("AKSYON AP??T YO 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("TRAVAY APOT YO 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("TRAVAY AP??T YO 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("AKDEZAPOT 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("AKD??ZAPOT 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("TRAVAY 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("TR 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (ht)", function () {
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
        return it("should handle book: Rom (ht)", function () {
            expect(p.parse("Romen 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??m 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ROMEN 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??M 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (ht)", function () {
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
        return it("should handle book: 2Cor (ht)", function () {
            expect(p.parse("Dezyem Korentyen 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Dezy??m Korentyen 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Dezyem Korint 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Dezy??m Korint 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korentyen 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korentyen 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korentyen 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korentyen 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korint 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korint 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korint 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korint 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEZYEM KORENTYEN 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DEZY??M KORENTYEN 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DEZYEM KORINT 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DEZY??M KORINT 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORENTYEN 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORENTYEN 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORENTYEN 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORENTYEN 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINT 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINT 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (ht)", function () {
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
        return it("should handle book: 1Cor (ht)", function () {
            expect(p.parse("Premye Korentyen 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Premye Korint 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korentyen 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korentyen 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korentyen 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korentyen 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korint 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korint 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korint 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korint 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PREMYE KORENTYEN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PREMYE KORINT 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORENTYEN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORENTYEN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORENTYEN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORENTYEN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINT 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINT 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (ht)", function () {
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
        return it("should handle book: Gal (ht)", function () {
            expect(p.parse("Galasyen 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galasi 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GALASYEN 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALASI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (ht)", function () {
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
        return it("should handle book: Eph (ht)", function () {
            expect(p.parse("Efezyen 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efez 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef??z 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EFEZYEN 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFEZ 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF??Z 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (ht)", function () {
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
        return it("should handle book: Phil (ht)", function () {
            expect(p.parse("Filipyen 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filip 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Fil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FILIPYEN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIP 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (ht)", function () {
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
        return it("should handle book: Col (ht)", function () {
            expect(p.parse("Kolosyen 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolos 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kol??s 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KOLOSYEN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOS 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOL??S 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (ht)", function () {
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
        return it("should handle book: 2Thess (ht)", function () {
            expect(p.parse("Dezyem Tesalonikyen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Dezy??m Tesalonikyen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Dezyem Tesalonik 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Dezy??m Tesalonik 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tesalonikyen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesalonikyen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesalonikyen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesalonikyen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tesalonik 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesalonik 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesalonik 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesalonik 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tes 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEZYEM TESALONIKYEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DEZY??M TESALONIKYEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DEZYEM TESALONIK 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DEZY??M TESALONIK 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESALONIKYEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESALONIKYEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESALONIKYEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESALONIKYEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESALONIK 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESALONIK 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESALONIK 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESALONIK 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TES 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (ht)", function () {
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
        return it("should handle book: 1Thess (ht)", function () {
            expect(p.parse("Premye Tesalonikyen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Premye Tesalonik 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tesalonikyen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesalonikyen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesalonikyen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesalonikyen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tesalonik 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesalonik 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesalonik 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesalonik 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tes 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PREMYE TESALONIKYEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PREMYE TESALONIK 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESALONIKYEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESALONIKYEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESALONIKYEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESALONIKYEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESALONIK 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESALONIK 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESALONIK 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESALONIK 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TES 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (ht)", function () {
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
        return it("should handle book: 2Tim (ht)", function () {
            expect(p.parse("Dezyem Timote 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Dezy??m Timote 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timote 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timote 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timote 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timote 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEZYEM TIMOTE 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DEZY??M TIMOTE 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTE 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTE 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTE 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTE 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (ht)", function () {
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
        return it("should handle book: 1Tim (ht)", function () {
            expect(p.parse("Premye Timote 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timote 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timote 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timote 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timote 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PREMYE TIMOTE 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTE 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTE 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTE 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTE 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (ht)", function () {
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
        return it("should handle book: Titus (ht)", function () {
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (ht)", function () {
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
        return it("should handle book: Phlm (ht)", function () {
            expect(p.parse("Filemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filem 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (ht)", function () {
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
        return it("should handle book: Heb (ht)", function () {
            expect(p.parse("Ebre 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Eb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EBRE 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("EB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (ht)", function () {
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
        return it("should handle book: Jas (ht)", function () {
            expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (ht)", function () {
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
        return it("should handle book: 2Pet (ht)", function () {
            expect(p.parse("Dezyem Pie 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Dezyem Pi?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Dezyem Pye 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Dezyem Py?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Dezy??m Pie 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Dezy??m Pi?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Dezy??m Pye 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Dezy??m Py?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Pie 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Pi?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Pye 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Py?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pie 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pi?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pye 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Py?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Pie 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Pi?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Pye 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Py?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pie 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pi?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pye 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Py?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEZYEM PIE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DEZYEM PI?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DEZYEM PYE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DEZYEM PY?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DEZY??M PIE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DEZY??M PI?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DEZY??M PYE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DEZY??M PY?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PIE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PI?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PYE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PY?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PIE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PI?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PYE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PY?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PIE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PI?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PYE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PY?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PIE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PI?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PYE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PY?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (ht)", function () {
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
        return it("should handle book: 1Pet (ht)", function () {
            expect(p.parse("Premye Pie 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Premye Pi?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Premye Pye 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Premye Py?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pie 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pi?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pye 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Py?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Pie 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Pi?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Pye 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Py?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pie 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pi?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pye 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Py?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Pie 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Pi?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Pye 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Py?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PREMYE PIE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PREMYE PI?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PREMYE PYE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PREMYE PY?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PIE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PI?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PYE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PY?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PIE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PI?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PYE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PY?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PIE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PI?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PYE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PY?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PIE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PI?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PYE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PY?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (ht)", function () {
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
        return it("should handle book: Jude (ht)", function () {
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jid 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JID 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (ht)", function () {
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
        return it("should handle book: Tob (ht)", function () {
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (ht)", function () {
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
        return it("should handle book: Jdt (ht)", function () {
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (ht)", function () {
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
        return it("should handle book: Bar (ht)", function () {
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (ht)", function () {
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
        return it("should handle book: Sus (ht)", function () {
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book Bel (ht)", function () {
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
        return it("should handle book: Bel (ht)", function () {
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (ht)", function () {
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
        return it("should handle book: 2Macc (ht)", function () {
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (ht)", function () {
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
        return it("should handle book: 3Macc (ht)", function () {
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (ht)", function () {
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
        return it("should handle book: 4Macc (ht)", function () {
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (ht)", function () {
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
        return it("should handle book: 1Macc (ht)", function () {
            expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1");
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
            return expect(p.languages).toEqual(["ht"]);
        });
        it("should handle ranges (ht)", function () {
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (ht)", function () {
            expect(p.parse("Titus 1:1, chapter 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 CHAPTER 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (ht)", function () {
            expect(p.parse("Exod 1:1 v??s?? 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm V??S?? 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 v??se 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm V??SE 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 ves?? 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VES?? 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 vese 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm VESE 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (ht)", function () {
            expect(p.parse("Exod 1:1 and 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 AND 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (ht)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (ht)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (ht)", function () {
            expect(p.parse("Lev 1 (HCV)").osis_and_translations()).toEqual([["Lev.1", "HCV"]]);
            return expect(p.parse("lev 1 hcv").osis_and_translations()).toEqual([["Lev.1", "HCV"]]);
        });
        it("should handle book ranges (ht)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            return expect(p.parse("Premye - 3  Jan").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (ht)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=ht.spec.js.map