"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/de_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (de)", function () {
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
        return it("should handle book: Gen (de)", function () {
            expect(p.parse("Erste Buch Mose 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Buch Mose 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Buch Mose 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Erste Mose 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mose 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Genesis 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mose 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mo 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mo 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ERSTE BUCH MOSE 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. BUCH MOSE 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 BUCH MOSE 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("ERSTE MOSE 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOSE 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GENESIS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOSE 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MO 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MO 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (de)", function () {
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
        return it("should handle book: Exod (de)", function () {
            expect(p.parse("Zweite Buch Mose 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Buch Mose 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Buch Mose 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Zweite Mose 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mose 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mose 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exodus 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mo 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mo 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Ex 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZWEITE BUCH MOSE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. BUCH MOSE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 BUCH MOSE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ZWEITE MOSE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOSE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOSE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXODUS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MO 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MO 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EX 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (de)", function () {
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
        return it("should handle book: Bel (de)", function () {
            expect(p.parse("Bel und Vom Drachen 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (de)", function () {
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
        return it("should handle book: Lev (de)", function () {
            expect(p.parse("Dritte Buch Mose 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Buch Mose 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Buch Mose 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Dritte Mose 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Levitikus 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mose 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mose 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mo 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mo 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRITTE BUCH MOSE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. BUCH MOSE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 BUCH MOSE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("DRITTE MOSE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITIKUS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOSE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOSE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MO 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MO 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (de)", function () {
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
        return it("should handle book: Num (de)", function () {
            expect(p.parse("Vierte Buch Mose 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Buch Mose 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Buch Mose 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Vierte Mose 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mose 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mose 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Numeri 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mo 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mo 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("VIERTE BUCH MOSE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. BUCH MOSE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 BUCH MOSE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("VIERTE MOSE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOSE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOSE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUMERI 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MO 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MO 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (de)", function () {
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
        return it("should handle book: Sir (de)", function () {
            expect(p.parse("Ecclesiasticus 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Jesus Sirach 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (de)", function () {
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
        return it("should handle book: Wis (de)", function () {
            expect(p.parse("Weisheit Salomos 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Weisheit 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Weish 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (de)", function () {
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
        return it("should handle book: Lam (de)", function () {
            expect(p.parse("Klagelieder Jeremias 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Klagelieder 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Klag 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Klgl 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KLAGELIEDER JEREMIAS 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KLAGELIEDER 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KLAG 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KLGL 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (de)", function () {
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
        return it("should handle book: EpJer (de)", function () {
            expect(p.parse("Brief des Jeremia 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Br Jer 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (de)", function () {
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
        return it("should handle book: Rev (de)", function () {
            expect(p.parse("Offenbarung 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Offb 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OFFENBARUNG 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OFFB 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (de)", function () {
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
        return it("should handle book: PrMan (de)", function () {
            expect(p.parse("Gebet des Manasse 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Gebet Manasses 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Gebet Manasse 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Geb Man 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Or Man 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (de)", function () {
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
        return it("should handle book: Deut (de)", function () {
            expect(p.parse("Funfte Buch Mose 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("F??nfte Buch Mose 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deuteronomium 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Buch Mose 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Buch Mose 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Funfte Mose 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("F??nfte Mose 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mose 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mose 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mo 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mo 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Dtn 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FUNFTE BUCH MOSE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("F??NFTE BUCH MOSE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUTERONOMIUM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. BUCH MOSE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 BUCH MOSE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FUNFTE MOSE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("F??NFTE MOSE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOSE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOSE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MO 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MO 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DTN 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (de)", function () {
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
        return it("should handle book: Josh (de)", function () {
            expect(p.parse("Josua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jos 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOSUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOS 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (de)", function () {
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
        return it("should handle book: Judg (de)", function () {
            expect(p.parse("Richter 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Ri 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RICHTER 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("RI 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (de)", function () {
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
        return it("should handle book: Ruth (de)", function () {
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (de)", function () {
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
        return it("should handle book: 1Esd (de)", function () {
            expect(p.parse("Erste Esra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Esra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Esra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Esr 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Esr 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Es 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Es 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (de)", function () {
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
        return it("should handle book: 2Esd (de)", function () {
            expect(p.parse("Zweite Esra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Esra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Esra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Esr 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Esr 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Es 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Es 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (de)", function () {
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
        return it("should handle book: Isa (de)", function () {
            expect(p.parse("Isaias 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Jesaja 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Jes 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ISAIAS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JESAJA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JES 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (de)", function () {
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
        return it("should handle book: 2Sam (de)", function () {
            expect(p.parse("Zweite Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZWEITE SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (de)", function () {
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
        return it("should handle book: 1Sam (de)", function () {
            expect(p.parse("Erste Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ERSTE SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (de)", function () {
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
        return it("should handle book: 2Kgs (de)", function () {
            expect(p.parse("Zweite Koenige 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Zweite Konige 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Zweite K??nige 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Koenige 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Koenige 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Konige 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. K??nige 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Konige 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K??nige 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. K??n 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K??n 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZWEITE KOENIGE 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ZWEITE KONIGE 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ZWEITE K??NIGE 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KOENIGE 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KOENIGE 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KONIGE 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. K??NIGE 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KONIGE 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K??NIGE 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. K??N 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K??N 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (de)", function () {
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
        return it("should handle book: 1Kgs (de)", function () {
            expect(p.parse("Erste Koenige 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Erste Konige 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Erste K??nige 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Koenige 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Koenige 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Konige 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. K??nige 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Konige 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K??nige 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. K??n 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K??n 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ERSTE KOENIGE 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ERSTE KONIGE 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ERSTE K??NIGE 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KOENIGE 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KOENIGE 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KONIGE 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. K??NIGE 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KONIGE 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K??NIGE 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. K??N 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K??N 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (de)", function () {
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
        return it("should handle book: 2Chr (de)", function () {
            expect(p.parse("Zweite Chronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Chronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Chronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Chr 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Chr 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZWEITE CHRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. CHRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 CHRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. CHR 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 CHR 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (de)", function () {
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
        return it("should handle book: 1Chr (de)", function () {
            expect(p.parse("Erste Chronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Chronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Chronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Chr 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Chr 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ERSTE CHRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. CHRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 CHRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. CHR 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 CHR 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (de)", function () {
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
        return it("should handle book: Ezra (de)", function () {
            expect(p.parse("Esra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Esr 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ESR 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (de)", function () {
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
        return it("should handle book: Neh (de)", function () {
            expect(p.parse("Nehemia 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NEHEMIA 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (de)", function () {
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
        return it("should handle book: GkEsth (de)", function () {
            expect(p.parse("Ester \(Griechisch\) 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester (Griechisch) 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Gr Est 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (de)", function () {
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
        return it("should handle book: Esth (de)", function () {
            expect(p.parse("Esther 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Ester 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Est 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESTHER 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTER 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("EST 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (de)", function () {
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
        return it("should handle book: Job (de)", function () {
            expect(p.parse("Hiob 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Ijob 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Hi 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HIOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("IJOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("HI 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (de)", function () {
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
        return it("should handle book: Ps (de)", function () {
            expect(p.parse("Psalmen 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Psalm 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PSALMEN 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PSALM 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (de)", function () {
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
        return it("should handle book: PrAzar (de)", function () {
            expect(p.parse("Gebet des Asarja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Geb As 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (de)", function () {
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
        return it("should handle book: Prov (de)", function () {
            expect(p.parse("Sprichworter 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Sprichw??rter 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Sprueche 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Spruche 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Spr??che 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Spr 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SPRICHWORTER 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("SPRICHW??RTER 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("SPRUECHE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("SPRUCHE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("SPR??CHE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("SPR 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (de)", function () {
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
        return it("should handle book: Eccl (de)", function () {
            expect(p.parse("Ecclesiastes 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Ekklesiastes 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Prediger 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kohelet 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pred 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Koh 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ECCLESIASTES 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("EKKLESIASTES 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PREDIGER 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KOHELET 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PRED 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KOH 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (de)", function () {
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
        return it("should handle book: SgThree (de)", function () {
            expect(p.parse("Lobgesang der drei jungen Manner im Feuerofen 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Lobgesang der drei jungen M??nner im Feuerofen 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Der Gesang der Drei Manner im feurigen Ofen 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Der Gesang der Drei M??nner im feurigen Ofen 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Lobgesang der drei jungen Manner 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Lobgesang der drei jungen M??nner 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Lobgesang der 3 jungen Manner 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Lobgesang der 3 jungen M??nner 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Der Gesang der Drei 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Gesang der Drei 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("L3J 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (de)", function () {
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
        return it("should handle book: Song (de)", function () {
            expect(p.parse("Hohelied Salomonis 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Hoheslied Salomos 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Hohes Lied 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Hoheslied 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Hohelied 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Hld 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HOHELIED SALOMONIS 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("HOHESLIED SALOMOS 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("HOHES LIED 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("HOHESLIED 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("HOHELIED 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("HLD 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (de)", function () {
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
        return it("should handle book: Jer (de)", function () {
            expect(p.parse("Jeremias 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremia 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JEREMIAS 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMIA 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (de)", function () {
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
        return it("should handle book: Ezek (de)", function () {
            expect(p.parse("Ezechiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Hesekiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Hes 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ez 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZECHIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("HESEKIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("HES 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZ 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (de)", function () {
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
        return it("should handle book: Dan (de)", function () {
            expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (de)", function () {
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
        return it("should handle book: Hos (de)", function () {
            expect(p.parse("Hosea 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Osee 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HOSEA 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OSEE 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (de)", function () {
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
        return it("should handle book: Joel (de)", function () {
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (de)", function () {
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
        return it("should handle book: Amos (de)", function () {
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (de)", function () {
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
        return it("should handle book: Obad (de)", function () {
            expect(p.parse("Abdias 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadja 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obd 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ABDIAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADJA 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBD 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (de)", function () {
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
        return it("should handle book: Jonah (de)", function () {
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonas 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jona 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAS 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONA 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (de)", function () {
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
        return it("should handle book: Mic (de)", function () {
            expect(p.parse("Michaas 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mich??as 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Micha 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mi 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MICHAAS 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICH??AS 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MI 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (de)", function () {
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
        return it("should handle book: Nah (de)", function () {
            expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (de)", function () {
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
        return it("should handle book: Hab (de)", function () {
            expect(p.parse("Habakuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HABAKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (de)", function () {
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
        return it("should handle book: Zeph (de)", function () {
            expect(p.parse("Sophonias 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zephanja 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zefanja 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Soph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zef 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SOPHONIAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPHANJA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEFANJA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEF 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (de)", function () {
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
        return it("should handle book: Hag (de)", function () {
            expect(p.parse("Aggaus 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Agg??us 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Haggai 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Agg 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Ag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AGGAUS 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AGG??US 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGGAI 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AGG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (de)", function () {
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
        return it("should handle book: Zech (de)", function () {
            expect(p.parse("Zacharias 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Sacharja 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Sach 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZACHARIAS 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("SACHARJA 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("SACH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (de)", function () {
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
        return it("should handle book: Mal (de)", function () {
            expect(p.parse("Malachias 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Maleachi 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MALACHIAS 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALEACHI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (de)", function () {
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
        return it("should handle book: Matt (de)", function () {
            expect(p.parse("Matthaus 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matth??us 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MATTHAUS 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTH??US 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (de)", function () {
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
        return it("should handle book: Mark (de)", function () {
            expect(p.parse("Markus 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mk 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MARKUS 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (de)", function () {
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
        return it("should handle book: Luke (de)", function () {
            expect(p.parse("Lukas 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lk 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LUKAS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LK 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (de)", function () {
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
        return it("should handle book: 1John (de)", function () {
            expect(p.parse("Erste Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ERSTE JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (de)", function () {
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
        return it("should handle book: 2John (de)", function () {
            expect(p.parse("Zweite Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZWEITE JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (de)", function () {
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
        return it("should handle book: 3John (de)", function () {
            expect(p.parse("Dritte Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRITTE JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (de)", function () {
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
        return it("should handle book: John (de)", function () {
            expect(p.parse("Johannes 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Joh 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOHANNES 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOH 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (de)", function () {
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
        return it("should handle book: Acts (de)", function () {
            expect(p.parse("Apostelgeschichte 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Apg 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("APOSTELGESCHICHTE 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("APG 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (de)", function () {
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
        return it("should handle book: Rom (de)", function () {
            expect(p.parse("Roemer 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Romer 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??mer 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??m 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ROEMER 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMER 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??MER 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??M 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (de)", function () {
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
        return it("should handle book: 2Cor (de)", function () {
            expect(p.parse("Zweite Korinther 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinther 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinther 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZWEITE KORINTHER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTHER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTHER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (de)", function () {
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
        return it("should handle book: 1Cor (de)", function () {
            expect(p.parse("Erste Korinther 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinther 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinther 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ERSTE KORINTHER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTHER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTHER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (de)", function () {
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
        return it("should handle book: Gal (de)", function () {
            expect(p.parse("Galater 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GALATER 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (de)", function () {
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
        return it("should handle book: Eph (de)", function () {
            expect(p.parse("Epheser 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EPHESER 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (de)", function () {
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
        return it("should handle book: Phil (de)", function () {
            expect(p.parse("Philipper 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PHILIPPER 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (de)", function () {
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
        return it("should handle book: Col (de)", function () {
            expect(p.parse("Kolosser 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KOLOSSER 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (de)", function () {
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
        return it("should handle book: 2Thess (de)", function () {
            expect(p.parse("Zweite Thessalonicher 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Thessalonicher 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Thessalonicher 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZWEITE THESSALONICHER 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. THESSALONICHER 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 THESSALONICHER 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (de)", function () {
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
        return it("should handle book: 1Thess (de)", function () {
            expect(p.parse("Erste Thessalonicher 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Thessalonicher 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Thessalonicher 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ERSTE THESSALONICHER 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. THESSALONICHER 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 THESSALONICHER 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (de)", function () {
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
        return it("should handle book: 2Tim (de)", function () {
            expect(p.parse("Zweite Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZWEITE TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (de)", function () {
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
        return it("should handle book: 1Tim (de)", function () {
            expect(p.parse("Erste Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ERSTE TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (de)", function () {
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
        return it("should handle book: Titus (de)", function () {
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (de)", function () {
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
        return it("should handle book: Phlm (de)", function () {
            expect(p.parse("Philemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PHILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (de)", function () {
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
        return it("should handle book: Heb (de)", function () {
            expect(p.parse("Hebraeer 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebraer 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebr??er 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebr 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HEBRAEER 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBRAER 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBR??ER 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBR 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (de)", function () {
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
        return it("should handle book: Jas (de)", function () {
            expect(p.parse("Jakobusbrief 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakobus 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JAKOBUSBRIEF 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKOBUS 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (de)", function () {
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
        return it("should handle book: 2Pet (de)", function () {
            expect(p.parse("Zweite Petrus 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petrus 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petrus 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZWEITE PETRUS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETRUS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETRUS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (de)", function () {
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
        return it("should handle book: 1Pet (de)", function () {
            expect(p.parse("Erste Petrus 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petrus 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petrus 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ERSTE PETRUS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETRUS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETRUS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (de)", function () {
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
        return it("should handle book: Jude (de)", function () {
            expect(p.parse("Judas 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jud 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JUDAS 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUD 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (de)", function () {
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
        return it("should handle book: Tob (de)", function () {
            expect(p.parse("Tobias 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobit 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (de)", function () {
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
        return it("should handle book: Jdt (de)", function () {
            expect(p.parse("Judit 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (de)", function () {
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
        return it("should handle book: Bar (de)", function () {
            expect(p.parse("Baruch 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (de)", function () {
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
        return it("should handle book: Sus (de)", function () {
            expect(p.parse("Susanna und die Alten 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Susanna im Bade 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Susanna 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (de)", function () {
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
        return it("should handle book: 2Macc (de)", function () {
            expect(p.parse("Zweite Makkabaer 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Zweite Makkab??er 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makkabaer 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makkab??er 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makkabaer 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makkab??er 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (de)", function () {
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
        return it("should handle book: 3Macc (de)", function () {
            expect(p.parse("Dritte Makkabaer 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Dritte Makkab??er 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makkabaer 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makkab??er 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makkabaer 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makkab??er 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (de)", function () {
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
        return it("should handle book: 4Macc (de)", function () {
            expect(p.parse("Vierte Makkabaer 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Vierte Makkab??er 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makkabaer 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makkab??er 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makkabaer 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makkab??er 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (de)", function () {
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
        return it("should handle book: 1Macc (de)", function () {
            expect(p.parse("Erste Makkabaer 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Erste Makkab??er 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makkabaer 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makkab??er 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makkabaer 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makkab??er 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makk 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makk 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1");
            return true;
        });
    });
    describe("Localized book Ezra,Esth (de)", function () {
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
        return it("should handle book: Ezra,Esth (de)", function () {
            expect(p.parse("Es 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ES 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Phil,Phlm (de)", function () {
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
        return it("should handle book: Phil,Phlm (de)", function () {
            expect(p.parse("Ph 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PH 1:1").osis()).toEqual("Phil.1.1");
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
            return expect(p.languages).toEqual(["de"]);
        });
        it("should handle ranges (de)", function () {
            expect(p.parse("Titus 1:1 bis 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1bis2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 BIS 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (de)", function () {
            expect(p.parse("Titus 1:1, Kapitel 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITEL 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, Kap. 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAP. 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, Kap 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 KAP 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (de)", function () {
            expect(p.parse("Exod 1:1 Verse 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERSE 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 Vers. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERS. 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 Vers 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERS 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 Ver. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VER. 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 Ver 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VER 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 Vs. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VS. 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 Vs 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm VS 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (de)", function () {
            expect(p.parse("Exod 1:1 und 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 UND 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 vgl. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 VGL. 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 vgl 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 VGL 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (de)", function () {
            expect(p.parse("Ps 3 Titel, 4:2, 5:Titel").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITEL, 4:2, 5:TITEL").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (de)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (de)", function () {
            expect(p.parse("Lev 1 (ELB)").osis_and_translations()).toEqual([["Lev.1", "ELB"]]);
            expect(p.parse("lev 1 elb").osis_and_translations()).toEqual([["Lev.1", "ELB"]]);
            expect(p.parse("Lev 1 (HFA)").osis_and_translations()).toEqual([["Lev.1", "HFA"]]);
            expect(p.parse("lev 1 hfa").osis_and_translations()).toEqual([["Lev.1", "HFA"]]);
            expect(p.parse("Lev 1 (LUTH1545)").osis_and_translations()).toEqual([["Lev.1", "LUTH1545"]]);
            expect(p.parse("lev 1 luth1545").osis_and_translations()).toEqual([["Lev.1", "LUTH1545"]]);
            expect(p.parse("Lev 1 (LUTHER)").osis_and_translations()).toEqual([["Lev.1", "LUTHER"]]);
            expect(p.parse("lev 1 luther").osis_and_translations()).toEqual([["Lev.1", "LUTHER"]]);
            expect(p.parse("Lev 1 (SCH1950)").osis_and_translations()).toEqual([["Lev.1", "SCH1950"]]);
            expect(p.parse("lev 1 sch1950").osis_and_translations()).toEqual([["Lev.1", "SCH1950"]]);
            expect(p.parse("Lev 1 (SCH2000)").osis_and_translations()).toEqual([["Lev.1", "SCH2000"]]);
            return expect(p.parse("lev 1 sch2000").osis_and_translations()).toEqual([["Lev.1", "SCH2000"]]);
        });
        it("should handle book ranges (de)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            return expect(p.parse("Erste bis Dritte  Johannes").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (de)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=de.spec.js.map