"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/da_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (da)", function () {
            expect(p.parse("F??rste Mosebog 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mosebog 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("F??rste Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mosebog 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Genesis 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("F??RSTE MOSEBOG 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOSEBOG 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("F??RSTE MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOSEBOG 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GENESIS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (da)", function () {
            expect(p.parse("Anden Mosebog 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mosebog 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mosebog 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Anden Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exodus 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ANDEN MOSEBOG 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOSEBOG 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOSEBOG 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ANDEN MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXODUS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (da)", function () {
            expect(p.parse("Bel og Dragen 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (da)", function () {
            expect(p.parse("Tredje Mosebog 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mosebog 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tredje Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mosebog 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Leviticus 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TREDJE MOSEBOG 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOSEBOG 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TREDJE MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOSEBOG 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITICUS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (da)", function () {
            expect(p.parse("Fjerde Mosebog 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mosebog 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fjerde Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mosebog 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Numeri 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FJERDE MOSEBOG 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOSEBOG 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJERDE MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOSEBOG 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUMERI 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (da)", function () {
            expect(p.parse("Siraks Bog 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirak 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (da)", function () {
            expect(p.parse("Visdommens Bog 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Visdommen 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (da)", function () {
            expect(p.parse("Klagesangene 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Klages 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Klag 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KLAGESANGENE 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KLAGES 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KLAG 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (da)", function () {
            expect(p.parse("Jeremias' Brev 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Jeremias??? Brev 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (da)", function () {
            expect(p.parse("Johannes' Abenbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johannes' ??benbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johannes??? Abenbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johannes??? ??benbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johannesapokalypsen 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Abenbaringsbogen 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johs. Abenbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johs. ??benbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??benbaringsbogen 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johs Abenbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johs ??benbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Aabenbaringen 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Abenbaringen 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??benbaringen 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apokalypsen 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Ab 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??b 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOHANNES' ABENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHANNES' ??BENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHANNES??? ABENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHANNES??? ??BENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHANNESAPOKALYPSEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ABENBARINGSBOGEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHS. ABENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHS. ??BENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??BENBARINGSBOGEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHS ABENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHS ??BENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("AABENBARINGEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ABENBARINGEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??BENBARINGEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APOKALYPSEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("AB 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??B 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (da)", function () {
            expect(p.parse("Manasses B??n 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (da)", function () {
            expect(p.parse("Deuteronomium 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Femte Mosebog 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mosebog 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mosebog 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Femte Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEUTERONOMIUM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FEMTE MOSEBOG 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOSEBOG 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOSEBOG 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FEMTE MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (da)", function () {
            expect(p.parse("Josvabogen 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josvas Bog 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josvabog 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jos 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOSVABOGEN 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSVAS BOG 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSVABOG 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOS 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (da)", function () {
            expect(p.parse("Dommerbogen 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Dommer 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Dom 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DOMMERBOGEN 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("DOMMER 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("DOM 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (da)", function () {
            expect(p.parse("Ruths Bog 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTHS BOG 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (da)", function () {
            expect(p.parse("F??rste Esdrasbog 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Tredje Esdrasbog 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Esdrasbog 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3. Esdrasbog 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Esdrasbog 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3 Esdrasbog 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (da)", function () {
            expect(p.parse("Fjerde Esdrasbog 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Anden Esdrasbog 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Esdrasbog 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("4. Esdrasbog 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Esdrasbog 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("4 Esdrasbog 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (da)", function () {
            expect(p.parse("Esajas' Bog 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Esajas??? Bog 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Esajas 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Jesaia 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Es 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESAJAS' BOG 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ESAJAS??? BOG 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ESAJAS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JESAIA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ES 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (da)", function () {
            expect(p.parse("Anden Kongerigernes Bog 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Kongerigernes Bog 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Kongerigernes Bog 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Anden Samuelsbog 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuelsbog 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuelsbog 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Anden Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Anden Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ANDEN KONGERIGERNES BOG 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. KONGERIGERNES BOG 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 KONGERIGERNES BOG 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ANDEN SAMUELSBOG 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUELSBOG 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUELSBOG 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ANDEN SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ANDEN SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (da)", function () {
            expect(p.parse("F??rste Kongerigernes Bog 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Kongerigernes Bog 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Kongerigernes Bog 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??rste Samuelsbog 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuelsbog 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??rste Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuelsbog 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??rste Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("F??RSTE KONGERIGERNES BOG 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. KONGERIGERNES BOG 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 KONGERIGERNES BOG 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??RSTE SAMUELSBOG 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUELSBOG 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??RSTE SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUELSBOG 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??RSTE SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (da)", function () {
            expect(p.parse("Fjerde Kongerigernes Bog 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. Kongerigernes Bog 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 Kongerigernes Bog 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Anden Kongebog 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kongebog 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kongebog 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Anden Kong 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kong 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kong 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FJERDE KONGERIGERNES BOG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. KONGERIGERNES BOG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 KONGERIGERNES BOG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ANDEN KONGEBOG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KONGEBOG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KONGEBOG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ANDEN KONG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KONG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KONG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (da)", function () {
            expect(p.parse("Tredje Kongerigernes Bog 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. Kongerigernes Bog 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 Kongerigernes Bog 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("F??rste Kongebog 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kongebog 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("F??rste Kong 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kongebog 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kong 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kong 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TREDJE KONGERIGERNES BOG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. KONGERIGERNES BOG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 KONGERIGERNES BOG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("F??RSTE KONGEBOG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KONGEBOG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("F??RSTE KONG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KONGEBOG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KONG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KONG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (da)", function () {
            expect(p.parse("Anden Kr??nikebog 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kr??nikebog 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kr??nikebog 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Anden Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Anden Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ANDEN KR??NIKEBOG 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KR??NIKEBOG 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KR??NIKEBOG 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ANDEN KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ANDEN KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (da)", function () {
            expect(p.parse("F??rste Kr??nikebog 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kr??nikebog 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kr??nikebog 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("F??rste Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("F??rste Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("F??RSTE KR??NIKEBOG 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KR??NIKEBOG 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KR??NIKEBOG 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("F??RSTE KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("F??RSTE KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (da)", function () {
            expect(p.parse("Ezras Bog 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZRAS BOG 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (da)", function () {
            expect(p.parse("Nehemias??? Bog 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemias 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NEHEMIAS??? BOG 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMIAS 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (da)", function () {
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (da)", function () {
            expect(p.parse("Esters Bog 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Ester 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Est 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESTERS BOG 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTER 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("EST 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (da)", function () {
            expect(p.parse("Jobs Bog 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Hiob 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOBS BOG 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("HIOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (da)", function () {
            expect(p.parse("Salmernes Bog 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Salmerne 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Salme 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Sl 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SALMERNES BOG 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("SALMERNE 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("SALME 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("SL 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (da)", function () {
            expect(p.parse("Azarjas B??n 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarjas b??n 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (da)", function () {
            expect(p.parse("Ordsprogenes Bog 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Ordsprogene 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Ordsp 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ORDSPROGENES BOG 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ORDSPROGENE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ORDSP 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (da)", function () {
            expect(p.parse("Pr??dikerens Bog 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pr??dikeren 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Prad 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pr??d 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PR??DIKERENS BOG 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PR??DIKEREN 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PRAD 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PR??D 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (da)", function () {
            expect(p.parse("De Tre M??nds Lovsang 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("De tre m??nds lovsang 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (da)", function () {
            expect(p.parse("Salomons H??jsang 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("H??jsangen 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Hojs 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("H??js 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SALOMONS H??JSANG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("H??JSANGEN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("HOJS 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("H??JS 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (da)", function () {
            expect(p.parse("Jeremias' Bog 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremias??? Bog 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremias 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JEREMIAS' BOG 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMIAS??? BOG 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMIAS 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (da)", function () {
            expect(p.parse("Ezekiels??? Bog 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezekiels Bog 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Hezechiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezekiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ez 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZEKIELS??? BOG 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEKIELS BOG 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("HEZECHIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEKIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZ 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (da)", function () {
            expect(p.parse("Daniels Bog 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DANIELS BOG 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (da)", function () {
            expect(p.parse("Hoseas??? Bog 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hoseas 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HOSEAS??? BOG 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOSEAS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (da)", function () {
            expect(p.parse("Joels Bog 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOELS BOG 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (da)", function () {
            expect(p.parse("Amos' Bog 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Amos??? Bog 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS' BOG 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS??? BOG 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (da)", function () {
            expect(p.parse("Obadias' Bog 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadias??? Bog 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadias 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OBADIAS' BOG 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADIAS??? BOG 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADIAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (da)", function () {
            expect(p.parse("Jonas' Bog 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonas??? Bog 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonas 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jon 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAS' BOG 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAS??? BOG 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAS 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JON 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (da)", function () {
            expect(p.parse("Mikas Bog 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mikas 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mika 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MIKAS BOG 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIKAS 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIKA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (da)", function () {
            expect(p.parse("Nahums Bog 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHUMS BOG 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (da)", function () {
            expect(p.parse("Habakkuks Bog 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Habakkuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HABAKKUKS BOG 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HABAKKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (da)", function () {
            expect(p.parse("Sefanias' Bog 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sefanias??? Bog 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zefanias??? Bog 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zefanias 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sef 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zef 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SEFANIAS' BOG 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SEFANIAS??? BOG 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEFANIAS??? BOG 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEFANIAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SEF 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEF 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (da)", function () {
            expect(p.parse("Haggajs Bog 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Haggaj 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hagg 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HAGGAJS BOG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGGAJ 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (da)", function () {
            expect(p.parse("Zakarias' Bog 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zakarias??? Bog 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zakarias 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zak 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZAKARIAS' BOG 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZAKARIAS??? BOG 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZAKARIAS 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZAK 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (da)", function () {
            expect(p.parse("Malakias??? Bog 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malakias 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MALAKIAS??? BOG 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALAKIAS 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (da)", function () {
            expect(p.parse("Matth??usevangeliet 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt??usevangeliet 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matth??us 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MATTH??USEVANGELIET 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT??USEVANGELIET 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTH??US 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (da)", function () {
            expect(p.parse("Markusevangeliet 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Markus 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MARKUSEVANGELIET 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKUS 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (da)", function () {
            expect(p.parse("Lukasevangeliet 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lukas 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lk 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LUKASEVANGELIET 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKAS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LK 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (da)", function () {
            expect(p.parse("F??rste Johannes' Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??rste Johannes??? Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Johannes' F??rste Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Johannes??? F??rste Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??rste Johannesbrev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Johannes' Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Johannes??? Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Johannes' 1. Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Johannes??? 1. Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Johannes' Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Johannes??? Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Johannes' 1 Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Johannes??? 1 Brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Johannesbrev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??rste Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Johannesbrev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??rste Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("F??RSTE JOHANNES' BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??RSTE JOHANNES??? BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("JOHANNES' F??RSTE BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("JOHANNES??? F??RSTE BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??RSTE JOHANNESBREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOHANNES' BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOHANNES??? BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("JOHANNES' 1. BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("JOHANNES??? 1. BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOHANNES' BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOHANNES??? BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("JOHANNES' 1 BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("JOHANNES??? 1 BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOHANNESBREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??RSTE JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOHANNESBREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??RSTE JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (da)", function () {
            expect(p.parse("Anden Johannes' Brev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anden Johannes??? Brev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Johannes' Andet Brev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Johannes??? Andet Brev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anden Johannesbrev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Andet Johannesbrev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Johannes' Brev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Johannes??? Brev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Johannes' Brev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Johannes??? Brev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Johannesbrev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Johannesbrev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anden Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anden Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ANDEN JOHANNES' BREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANDEN JOHANNES??? BREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("JOHANNES' ANDET BREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("JOHANNES??? ANDET BREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANDEN JOHANNESBREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANDET JOHANNESBREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOHANNES' BREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOHANNES??? BREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOHANNES' BREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOHANNES??? BREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOHANNESBREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOHANNESBREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANDEN JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANDEN JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (da)", function () {
            expect(p.parse("Johannes' Tredje Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Johannes??? Tredje Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tredje Johannes' Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tredje Johannes??? Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tredje Johannesbrev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Johannes' Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Johannes??? Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Johannes' 3. Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Johannes??? 3. Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Johannes' Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Johannes??? Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Johannes' 3 Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Johannes??? 3 Brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Johannesbrev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tredje Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Johannesbrev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tredje Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOHANNES' TREDJE BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("JOHANNES??? TREDJE BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TREDJE JOHANNES' BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TREDJE JOHANNES??? BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TREDJE JOHANNESBREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOHANNES' BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOHANNES??? BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("JOHANNES' 3. BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("JOHANNES??? 3. BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOHANNES' BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOHANNES??? BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("JOHANNES' 3 BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("JOHANNES??? 3 BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOHANNESBREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TREDJE JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOHANNESBREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TREDJE JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (da)", function () {
            expect(p.parse("Johannesevangeliet 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Johannes 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Joh 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOHANNESEVANGELIET 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHANNES 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOH 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (da)", function () {
            expect(p.parse("Apostlenes Gerninger 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Gerninger 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Ap.G 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ApG 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Apg 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("APOSTLENES GERNINGER 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("GERNINGER 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("AP.G 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("APG 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("APG 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (da)", function () {
            expect(p.parse("Paulus' Brev til Romerne 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Paulus??? Brev til Romerne 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Romerbrevet 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Romerne 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' BREV TIL ROMERNE 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("PAULUS??? BREV TIL ROMERNE 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMERBREVET 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMERNE 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (da)", function () {
            expect(p.parse("Paulus' Andet Brev til Korintherne 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Paulus??? Andet Brev til Korintherne 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Anden Korintherbrev 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Andet Korintherbrev 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Anden Korinterbrev 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korintherbrev 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Anden Korinterne 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korintherbrev 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinterbrev 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinterbrev 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinterne 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinterne 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Anden Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' ANDET BREV TIL KORINTHERNE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("PAULUS??? ANDET BREV TIL KORINTHERNE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ANDEN KORINTHERBREV 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ANDET KORINTHERBREV 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ANDEN KORINTERBREV 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTHERBREV 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ANDEN KORINTERNE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTHERBREV 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTERBREV 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTERBREV 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTERNE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTERNE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ANDEN KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (da)", function () {
            expect(p.parse("Paulus' F??rste Brev til Korintherne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Paulus??? F??rste Brev til Korintherne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Paulus' 1. Brev til Korintherne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Paulus??? 1. Brev til Korintherne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Paulus' 1 Brev til Korintherne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Paulus??? 1 Brev til Korintherne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??rste Korintherbrev 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??rste Korinterbrev 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??rste Korinterne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korintherbrev 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korintherbrev 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinterbrev 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinterbrev 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinterne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinterne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??rste Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' F??RSTE BREV TIL KORINTHERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PAULUS??? F??RSTE BREV TIL KORINTHERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PAULUS' 1. BREV TIL KORINTHERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PAULUS??? 1. BREV TIL KORINTHERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PAULUS' 1 BREV TIL KORINTHERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PAULUS??? 1 BREV TIL KORINTHERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??RSTE KORINTHERBREV 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??RSTE KORINTERBREV 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??RSTE KORINTERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTHERBREV 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTHERBREV 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTERBREV 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTERBREV 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??RSTE KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (da)", function () {
            expect(p.parse("Paulus' Brev til Galaterne 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Paulus??? Brev til Galaterne 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Brevet til Galaterne 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galaterbrevet 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galaterne 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' BREV TIL GALATERNE 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("PAULUS??? BREV TIL GALATERNE 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("BREVET TIL GALATERNE 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATERBREVET 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATERNE 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (da)", function () {
            expect(p.parse("Paulus' Brev til Efeserne 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Paulus??? Brev til Efeserne 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efeserbrevet 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efeserne 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' BREV TIL EFESERNE 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("PAULUS??? BREV TIL EFESERNE 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFESERBREVET 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFESERNE 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (da)", function () {
            expect(p.parse("Paulus' Brev til Filipperne 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Paulus??? Brev til Filipperne 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipperbrevet 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipperne 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Fil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' BREV TIL FILIPPERNE 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PAULUS??? BREV TIL FILIPPERNE 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPPERBREVET 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPPERNE 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (da)", function () {
            expect(p.parse("Paulus' Brev til Kolossenserne 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Paulus??? Brev til Kolossenserne 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolossenserbrevet 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolossensern 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' BREV TIL KOLOSSENSERNE 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("PAULUS??? BREV TIL KOLOSSENSERNE 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSENSERBREVET 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSENSERN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (da)", function () {
            expect(p.parse("Paulus' Andet Brev til Thessalonikerne 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Paulus??? Andet Brev til Thessalonikerne 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Anden Thessalonikerbrev 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Andet Thessalonikerbrev 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Thessalonikerbrev 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Anden Tessalonikerne 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Thessalonikerbrev 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tessalonikerne 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tessalonikerne 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Anden Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' ANDET BREV TIL THESSALONIKERNE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("PAULUS??? ANDET BREV TIL THESSALONIKERNE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ANDEN THESSALONIKERBREV 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ANDET THESSALONIKERBREV 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. THESSALONIKERBREV 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ANDEN TESSALONIKERNE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 THESSALONIKERBREV 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESSALONIKERNE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESSALONIKERNE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ANDEN THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (da)", function () {
            expect(p.parse("Paulus' F??rste Brev til Thessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Paulus??? F??rste Brev til Thessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Paulus' 1. Brev til Thessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Paulus??? 1. Brev til Thessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Paulus' 1 Brev til Thessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Paulus??? 1 Brev til Thessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??rste Thessalonikerbrev 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??rste Tessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Thessalonikerbrev 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Thessalonikerbrev 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??rste Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' F??RSTE BREV TIL THESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PAULUS??? F??RSTE BREV TIL THESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PAULUS' 1. BREV TIL THESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PAULUS??? 1. BREV TIL THESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PAULUS' 1 BREV TIL THESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PAULUS??? 1 BREV TIL THESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??RSTE THESSALONIKERBREV 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??RSTE TESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. THESSALONIKERBREV 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 THESSALONIKERBREV 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??RSTE THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (da)", function () {
            expect(p.parse("Paulus' Andet Brev til Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Paulus??? Andet Brev til Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Anden Timotheusbrev 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Andet Timotheusbrev 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Anden Timoteusbrev 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timotheusbrev 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timotheusbrev 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteusbrev 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteusbrev 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Anden Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Anden Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' ANDET BREV TIL TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("PAULUS??? ANDET BREV TIL TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ANDEN TIMOTHEUSBREV 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ANDET TIMOTHEUSBREV 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ANDEN TIMOTEUSBREV 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTHEUSBREV 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTHEUSBREV 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEUSBREV 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEUSBREV 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ANDEN TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ANDEN TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (da)", function () {
            expect(p.parse("Paulus' F??rste Brev til Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Paulus??? F??rste Brev til Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Paulus' 1. Brev til Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Paulus??? 1. Brev til Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Paulus' 1 Brev til Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Paulus??? 1 Brev til Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("F??rste Timotheusbrev 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("F??rste Timoteusbrev 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timotheusbrev 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timotheusbrev 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timoteusbrev 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("F??rste Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timoteusbrev 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("F??rste Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' F??RSTE BREV TIL TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PAULUS??? F??RSTE BREV TIL TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PAULUS' 1. BREV TIL TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PAULUS??? 1. BREV TIL TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PAULUS' 1 BREV TIL TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PAULUS??? 1 BREV TIL TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("F??RSTE TIMOTHEUSBREV 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("F??RSTE TIMOTEUSBREV 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTHEUSBREV 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTHEUSBREV 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEUSBREV 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("F??RSTE TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEUSBREV 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("F??RSTE TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (da)", function () {
            expect(p.parse("Paulus' Brev til Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Paulus??? Brev til Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titusbrevet 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' BREV TIL TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("PAULUS??? BREV TIL TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUSBREVET 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (da)", function () {
            expect(p.parse("Paulus' Brev til Filemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Paulus??? Brev til Filemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemonbrevet 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filem 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Flm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS' BREV TIL FILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PAULUS??? BREV TIL FILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMONBREVET 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (da)", function () {
            expect(p.parse("Brevet til Hebr??erne 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebr??erbrevet 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebr??erne 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebr 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BREVET TIL HEBR??ERNE 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBR??ERBREVET 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBR??ERNE 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBR 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (da)", function () {
            expect(p.parse("Jakobsbrevet 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakobs Brev 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakob 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JAKOBSBREVET 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKOBS BREV 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKOB 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (da)", function () {
            expect(p.parse("Peters Andet Brev 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Anden Petersbrev 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Andet Petersbrev 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petersbrev 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petersbrev 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Anden Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Anden Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PETERS ANDET BREV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ANDEN PETERSBREV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ANDET PETERSBREV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETERSBREV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETERSBREV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ANDEN PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ANDEN PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (da)", function () {
            expect(p.parse("Peters F??rste Brev 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??rste Petersbrev 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Peters 1. Brev 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petersbrev 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Peters 1 Brev 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petersbrev 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??rste Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??rste Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PETERS F??RSTE BREV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??RSTE PETERSBREV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PETERS 1. BREV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETERSBREV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PETERS 1 BREV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETERSBREV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??RSTE PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??RSTE PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (da)", function () {
            expect(p.parse("Judas' Brev 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judasbrevet 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judas??? Brev 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judas 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jud 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JUDAS' BREV 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDASBREVET 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDAS??? BREV 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDAS 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUD 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (da)", function () {
            expect(p.parse("Tobits Bog 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobit 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (da)", function () {
            expect(p.parse("Judits Bog 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Judit 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (da)", function () {
            expect(p.parse("Baruks Bog 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Baruk 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (da)", function () {
            expect(p.parse("Susanna 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (da)", function () {
            expect(p.parse("Anden Makkab??erbog 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makkab??erbog 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makkab??erbog 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Anden Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (da)", function () {
            expect(p.parse("Tredje Makkab??erbog 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makkab??erbog 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makkab??erbog 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Tredje Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (da)", function () {
            expect(p.parse("Fjerde Makkab??erbog 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makkab??erbog 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makkab??erbog 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Fjerde Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (da)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (da)", function () {
            expect(p.parse("F??rste Makkab??erbog 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makkab??erbog 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makkab??erbog 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("F??rste Makk 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makk 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makk 1:1").osis()).toEqual("1Macc.1.1");
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
            return expect(p.languages).toEqual(["da"]);
        });
        it("should handle ranges (da)", function () {
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (da)", function () {
            expect(p.parse("Titus 1:1, kapitlerne 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITLERNE 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapitel 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITEL 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kap. 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAP. 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kap 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 KAP 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (da)", function () {
            expect(p.parse("Exod 1:1 vers 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERS 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 v. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm V. 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 v 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm V 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (da)", function () {
            expect(p.parse("Exod 1:1 og 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 OG 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 jf 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 JF 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (da)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (da)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (da)", function () {
            expect(p.parse("Lev 1 (BPH)").osis_and_translations()).toEqual([["Lev.1", "BPH"]]);
            expect(p.parse("lev 1 bph").osis_and_translations()).toEqual([["Lev.1", "BPH"]]);
            expect(p.parse("Lev 1 (DO33)").osis_and_translations()).toEqual([["Lev.1", "DO33"]]);
            expect(p.parse("lev 1 do33").osis_and_translations()).toEqual([["Lev.1", "DO33"]]);
            expect(p.parse("Lev 1 (DO92)").osis_and_translations()).toEqual([["Lev.1", "DO92"]]);
            return expect(p.parse("lev 1 do92").osis_and_translations()).toEqual([["Lev.1", "DO92"]]);
        });
        it("should handle book ranges (da)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            return expect(p.parse("F??rste - Tredje  Joh").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (da)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=da.spec.js.map