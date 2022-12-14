"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/no_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (no)", function () {
            expect(p.parse("F??rste Mosebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mosebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("F??rste Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mosebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Genesis 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("F??RSTE MOSEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOSEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("F??RSTE MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOSEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GENESIS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (no)", function () {
            expect(p.parse("Andre Mosebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Annen Mosebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mosebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mosebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Andre Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ANDRE MOSEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ANNEN MOSEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOSEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOSEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ANDRE MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (no)", function () {
            expect(p.parse("Bel og dragen i Babylon 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel og draken 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (no)", function () {
            expect(p.parse("Tredje Mosebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mosebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tredje Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mosebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Leviticus 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TREDJE MOSEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOSEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TREDJE MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOSEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITICUS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (no)", function () {
            expect(p.parse("Fjerde Mosebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mosebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fjerde Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mosebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FJERDE MOSEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOSEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJERDE MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOSEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (no)", function () {
            expect(p.parse("Jesu Siraks s??nns visdom 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Siraks bok 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirak 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (no)", function () {
            expect(p.parse("Salomos Visdom 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Visdommens bok 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Visd 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (no)", function () {
            expect(p.parse("Klagesangene 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Klag 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KLAGESANGENE 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KLAG 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (no)", function () {
            expect(p.parse("Jeremias brev 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Jerbr 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (no)", function () {
            expect(p.parse("Johannes' apenbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johannes' ??penbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johannes??? apenbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Johannes??? ??penbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apenbaringsboken 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??penbaringsboken 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apenbaringen 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??penbaringen 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apenbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??penbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Ap 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??p 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOHANNES' APENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHANNES' ??PENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHANNES??? APENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("JOHANNES??? ??PENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APENBARINGSBOKEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??PENBARINGSBOKEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APENBARINGEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??PENBARINGEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??PENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("AP 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??P 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (no)", function () {
            expect(p.parse("Manasses b??nn 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Man 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (no)", function () {
            expect(p.parse("Femte Mosebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mosebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mosebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Femte Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FEMTE MOSEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOSEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOSEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FEMTE MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (no)", function () {
            expect(p.parse("Josvas bok 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josvas 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josva 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jos 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOSVAS BOK 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSVAS 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSVA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOS 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (no)", function () {
            expect(p.parse("Dommernes bok 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Dommernes 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Dommerne 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Dom 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DOMMERNES BOK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("DOMMERNES 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("DOMMERNE 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("DOM 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (no)", function () {
            expect(p.parse("Ruts bok 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Ruts 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTS BOK 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUTS 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (no)", function () {
            expect(p.parse("F??rste Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("F??rste Esra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Tredje Esra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Esra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3. Esra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Esra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3 Esra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (no)", function () {
            expect(p.parse("Andre Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Fjerde Esra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Andre Esra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Esra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("4. Esra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Esra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("4 Esra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (no)", function () {
            expect(p.parse("Esaias' bok 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Esaias??? bok 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Jesajaboken 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Jesajas bok 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Jesajaboka 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Esaias 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Jesaja 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Jes 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESAIAS' BOK 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ESAIAS??? BOK 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JESAJABOKEN 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JESAJAS BOK 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JESAJABOKA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ESAIAS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JESAJA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JES 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (no)", function () {
            expect(p.parse("Andre Samuelsbok 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuelsbok 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuelsbok 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Andre Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Andre Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ANDRE SAMUELSBOK 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUELSBOK 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUELSBOK 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ANDRE SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("ANDRE SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (no)", function () {
            expect(p.parse("F??rste Samuelsbok 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??rste Samuels 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuelsbok 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??rste Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuelsbok 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuels 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??rste Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuels 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("F??RSTE SAMUELSBOK 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??RSTE SAMUELS 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUELSBOK 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??RSTE SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUELSBOK 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUELS 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("F??RSTE SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUELS 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (no)", function () {
            expect(p.parse("Andre Kongebok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kongebok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kongebok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Andre Kong 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kong 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kong 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ANDRE KONGEBOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KONGEBOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KONGEBOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("ANDRE KONG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KONG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KONG 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (no)", function () {
            expect(p.parse("F??rste Kongebok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kongebok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("F??rste Kong 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kongebok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kong 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kong 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("F??RSTE KONGEBOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KONGEBOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("F??RSTE KONG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KONGEBOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KONG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KONG 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (no)", function () {
            expect(p.parse("Andre Kr??nikebok 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kr??nikebok 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kr??nikebok 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Andre Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Andre Kr?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kr??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kr?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kr?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ANDRE KR??NIKEBOK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KR??NIKEBOK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KR??NIKEBOK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ANDRE KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("ANDRE KR?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KR??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KR?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KR?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (no)", function () {
            expect(p.parse("F??rste Kr??nikebok 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kr??nikebok 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kr??nikebok 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("F??rste Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("F??rste Kr?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kr??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kr?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kr?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("F??RSTE KR??NIKEBOK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KR??NIKEBOK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KR??NIKEBOK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("F??RSTE KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("F??RSTE KR?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KR??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KR?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KR?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (no)", function () {
            expect(p.parse("Esras bok 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Esras 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Esra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESRAS BOK 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ESRAS 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ESRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (no)", function () {
            expect(p.parse("Nehemjas bok 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemias 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemja 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NEHEMJAS BOK 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMIAS 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMJA 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (no)", function () {
            expect(p.parse("Den greske Ester-boken 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Den greske Ester-boka 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("GrEst 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (no)", function () {
            expect(p.parse("Esters bok 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esters 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Ester 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Est 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESTERS BOK 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTERS 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTER 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("EST 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (no)", function () {
            expect(p.parse("Jobs bok 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Jobs 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOBS BOK 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOBS 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (no)", function () {
            expect(p.parse("Salmenes bok 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Salmenes 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Salmene 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Salme 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Sal 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SALMENES BOK 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("SALMENES 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("SALMENE 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("SALME 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("SAL 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (no)", function () {
            expect(p.parse("Asarjas b??nn 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (no)", function () {
            expect(p.parse("Salomos Ordsprak 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Salomos Ordsprog 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Salomos Ordspr??k 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Ordsprakene 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Ordspr??kene 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Ordsp 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SALOMOS ORDSPRAK 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("SALOMOS ORDSPROG 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("SALOMOS ORDSPR??K 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ORDSPRAKENE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ORDSPR??KENE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("ORDSP 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (no)", function () {
            expect(p.parse("Forkynnerens bok 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Predikantens bok 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Forkynneren 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Predikerens 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Predikeren 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Fork 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FORKYNNERENS BOK 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PREDIKANTENS BOK 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("FORKYNNEREN 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PREDIKERENS 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PREDIKEREN 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("FORK 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (no)", function () {
            expect(p.parse("De tre mennenes sang f??yer 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("De tre menns sang 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (no)", function () {
            expect(p.parse("Salomos H??isang 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Salomos h??ysang 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("H??ysangen 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("H??ys 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SALOMOS H??ISANG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SALOMOS H??YSANG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("H??YSANGEN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("H??YS 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (no)", function () {
            expect(p.parse("Jeremias bok 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremias 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremia 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JEREMIAS BOK 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMIAS 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMIA 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (no)", function () {
            expect(p.parse("Esekiels bok 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Esekiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Esek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESEKIELS BOK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ESEKIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ESEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (no)", function () {
            expect(p.parse("Daniels bok 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DANIELS BOK 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (no)", function () {
            expect(p.parse("Hoseas bok 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hoseas 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hosea 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HOSEAS BOK 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOSEAS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOSEA 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (no)", function () {
            expect(p.parse("Joels bok 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOELS BOK 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (no)", function () {
            expect(p.parse("Amos' bok 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Amos??? bok 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS' BOK 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS??? BOK 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (no)", function () {
            expect(p.parse("Obadjas bok 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadias 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadja 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Ob 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OBADJAS BOK 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADIAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADJA 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OB 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (no)", function () {
            expect(p.parse("Jonas bok 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonas 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jona 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAS BOK 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAS 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONA 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (no)", function () {
            expect(p.parse("Mikas bok 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mika 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mi 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MIKAS BOK 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIKA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MI 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (no)", function () {
            expect(p.parse("Nahums bok 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHUMS BOK 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (no)", function () {
            expect(p.parse("Habakkuks bok 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Habakkuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Habakuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HABAKKUKS BOK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HABAKKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HABAKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (no)", function () {
            expect(p.parse("Sefanjas bok 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sefanias 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sefanja 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sef 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SEFANJAS BOK 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SEFANIAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SEFANJA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SEF 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (no)", function () {
            expect(p.parse("Haggais bok 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Haggai 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HAGGAIS BOK 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGGAI 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (no)", function () {
            expect(p.parse("Sakarjaboken 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Sakarjas bok 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Sakarias 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Sakarja 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Sak 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SAKARJABOKEN 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("SAKARJAS BOK 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("SAKARIAS 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("SAKARJA 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("SAK 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (no)", function () {
            expect(p.parse("Malakis bok 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malakias 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malaki 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MALAKIS BOK 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALAKIAS 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALAKI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (no)", function () {
            expect(p.parse("Evangeliet etter Matteus 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matteusevangeliet 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matteus 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIET ETTER MATTEUS 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTEUSEVANGELIET 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTEUS 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (no)", function () {
            expect(p.parse("Evangeliet etter Markus 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Markusevangeliet 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Markus 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIET ETTER MARKUS 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKUSEVANGELIET 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKUS 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (no)", function () {
            expect(p.parse("Evangeliet etter Lukas 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lukasevangeliet 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lukas 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIET ETTER LUKAS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKASEVANGELIET 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKAS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (no)", function () {
            expect(p.parse("Johannes??? f??rste brev 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??rste Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??rste Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOHANNES??? F??RSTE BREV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??RSTE JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("F??RSTE JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (no)", function () {
            expect(p.parse("Johannes??? andre brev 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Andre Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Andre Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOHANNES??? ANDRE BREV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANDRE JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANDRE JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (no)", function () {
            expect(p.parse("Johannes??? tredje brev 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tredje Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tredje Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOHANNES??? TREDJE BREV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TREDJE JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TREDJE JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (no)", function () {
            expect(p.parse("Evangeliet etter Johannes 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Johannesevangeliet 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Johannes 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Joh 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIET ETTER JOHANNES 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHANNESEVANGELIET 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHANNES 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOH 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (no)", function () {
            expect(p.parse("Apostlenes gjerninger 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Apostlenes-gjerninge 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Apostelgjerningene 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acta 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Apg 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Ac 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("APOSTLENES GJERNINGER 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("APOSTLENES-GJERNINGE 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("APOSTELGJERNINGENE 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTA 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("APG 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("AC 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (no)", function () {
            expect(p.parse("Paulus??? brev til romerne 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Romerbrevet 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Romerne 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? BREV TIL ROMERNE 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMERBREVET 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMERNE 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (no)", function () {
            expect(p.parse("Paulus??? andre brev til korinterne 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Andre korinterbrev 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Andre Korintierne 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korinterbrev 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korinterbrev 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korintierne 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Andre Korinter 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korintierne 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinter 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinter 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Andre Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? ANDRE BREV TIL KORINTERNE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ANDRE KORINTERBREV 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ANDRE KORINTIERNE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTERBREV 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTERBREV 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTIERNE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ANDRE KORINTER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTIERNE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("ANDRE KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (no)", function () {
            expect(p.parse("Paulus??? f??rste brev til korinterne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??rste korinterbrev 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??rste Korintierne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korinterbrev 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??rste Korinter 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korinterbrev 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korintierne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korintierne 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinter 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinter 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??rste Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? F??RSTE BREV TIL KORINTERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??RSTE KORINTERBREV 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??RSTE KORINTIERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTERBREV 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??RSTE KORINTER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTERBREV 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTIERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTIERNE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("F??RSTE KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (no)", function () {
            expect(p.parse("Paulus??? brev til galaterne 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galaterbrevet 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galaterne 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? BREV TIL GALATERNE 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATERBREVET 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATERNE 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (no)", function () {
            expect(p.parse("Paulus??? brev til efeserne 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efeserbrevet 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efeserne 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? BREV TIL EFESERNE 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFESERBREVET 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFESERNE 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (no)", function () {
            expect(p.parse("Paulus??? brev til filipperne 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipperbrevet 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filippenserne 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipperne 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Fil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? BREV TIL FILIPPERNE 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPPERBREVET 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPPENSERNE 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPPERNE 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (no)", function () {
            expect(p.parse("Paulus??? brev til kolosserne 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosserbrevet 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolossenserne 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosserne 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? BREV TIL KOLOSSERNE 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSERBREVET 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSENSERNE 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSERNE 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (no)", function () {
            expect(p.parse("Paulus??? andre brev til tessalonikerne 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Andre tessalonikerbrev 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Andre Tessalonikerne 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. tessalonikerbrev 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 tessalonikerbrev 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Andre Tessaloniker 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tessalonikerne 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tessalonikerne 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tessaloniker 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tessaloniker 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Andre Tess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? ANDRE BREV TIL TESSALONIKERNE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ANDRE TESSALONIKERBREV 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ANDRE TESSALONIKERNE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESSALONIKERBREV 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESSALONIKERBREV 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ANDRE TESSALONIKER 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESSALONIKERNE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESSALONIKERNE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESSALONIKER 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESSALONIKER 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("ANDRE TESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (no)", function () {
            expect(p.parse("Paulus??? f??rste brev til tessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??rste tessalonikerbrev 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??rste Tessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. tessalonikerbrev 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??rste Tessaloniker 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 tessalonikerbrev 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tessalonikerne 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tessaloniker 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tessaloniker 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??rste Tess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? F??RSTE BREV TIL TESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??RSTE TESSALONIKERBREV 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??RSTE TESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESSALONIKERBREV 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??RSTE TESSALONIKER 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESSALONIKERBREV 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESSALONIKERNE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESSALONIKER 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESSALONIKER 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("F??RSTE TESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (no)", function () {
            expect(p.parse("Paulus??? andre brev til Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Andre Timoteusbrev 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteusbrev 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteusbrev 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Andre Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Andre Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? ANDRE BREV TIL TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ANDRE TIMOTEUSBREV 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEUSBREV 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEUSBREV 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ANDRE TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("ANDRE TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (no)", function () {
            expect(p.parse("Paulus??? f??rste brev til Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("F??rste Timoteusbrev 1:1").osis()).toEqual("1Tim.1.1");
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
            expect(p.parse("PAULUS??? F??RSTE BREV TIL TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("F??RSTE TIMOTEUSBREV 1:1").osis()).toEqual("1Tim.1.1");
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
    describe("Localized book Titus (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (no)", function () {
            expect(p.parse("Paulus??? brev til Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Brevet til Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? BREV TIL TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("BREVET TIL TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (no)", function () {
            expect(p.parse("Paulus??? brev til Filemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Brevet til Filemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemonbrevet 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filem 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PAULUS??? BREV TIL FILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("BREVET TIL FILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMONBREVET 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (no)", function () {
            expect(p.parse("Brevet til hebreerne 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebreerbrevet 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebreerne 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebr 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BREVET TIL HEBREERNE 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBREERBREVET 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBREERNE 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBR 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (no)", function () {
            expect(p.parse("Jakobs brev 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakobs 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakob 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JAKOBS BREV 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKOBS 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKOB 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (no)", function () {
            expect(p.parse("Peters andre brev 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Andre Petersbrev 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petersbrev 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petersbrev 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Andre Peters 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Andre Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Peters 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Andre Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Peters 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Peter 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PETERS ANDRE BREV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ANDRE PETERSBREV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETERSBREV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETERSBREV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ANDRE PETERS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ANDRE PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETERS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("ANDRE PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETERS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETER 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (no)", function () {
            expect(p.parse("Peters f??rste brev 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??rste Petersbrev 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petersbrev 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??rste Peters 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petersbrev 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??rste Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??rste Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Peters 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Peters 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Peter 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PETERS F??RSTE BREV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??RSTE PETERSBREV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETERSBREV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??RSTE PETERS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETERSBREV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??RSTE PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("F??RSTE PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETERS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETERS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETER 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (no)", function () {
            expect(p.parse("Judasbrevet 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judas??? brev 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judas 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jud 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JUDASBREVET 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDAS??? BREV 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDAS 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUD 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (no)", function () {
            expect(p.parse("Tobias' bok 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobias??? bok 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobits bok 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobit 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (no)", function () {
            expect(p.parse("Judits bok 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Judit 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (no)", function () {
            expect(p.parse("Baruks bok 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Baruk 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (no)", function () {
            expect(p.parse("Fortellingen om Susanna 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Susanna 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (no)", function () {
            expect(p.parse("Andre Makkabeerbok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makkabeerbok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makkabeerbok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Andre Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (no)", function () {
            expect(p.parse("Tredje Makkabeerbok 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makkabeerbok 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makkabeerbok 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Tredje Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (no)", function () {
            expect(p.parse("Fjerde Makkabeerbok 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makkabeerbok 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makkabeerbok 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Fjerde Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (no)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (no)", function () {
            expect(p.parse("F??rste Makkabeerbok 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makkabeerbok 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makkabeerbok 1:1").osis()).toEqual("1Macc.1.1");
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
            return expect(p.languages).toEqual(["no"]);
        });
        it("should handle ranges (no)", function () {
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (no)", function () {
            expect(p.parse("Titus 1:1, kapittelet 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITTELET 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapittel 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITTEL 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapitler 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITLER 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapitlene 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITLENE 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapitel 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITEL 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kap. 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAP. 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kap 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 KAP 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (no)", function () {
            expect(p.parse("Exod 1:1 vers 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERS 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 v. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm V. 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 v 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm V 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (no)", function () {
            expect(p.parse("Exod 1:1 og 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 OG 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 cf 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 CF 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 jf 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 JF 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (no)", function () {
            expect(p.parse("Ps 3 overskrift, 4:2, 5:overskrift").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 OVERSKRIFT, 4:2, 5:OVERSKRIFT").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (no)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            expect(p.parse("Rev 3f, 4:2f").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 F, 4:2 F").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (no)", function () {
            expect(p.parse("Lev 1 (B1930)").osis_and_translations()).toEqual([["Lev.1", "B1930"]]);
            return expect(p.parse("lev 1 b1930").osis_and_translations()).toEqual([["Lev.1", "B1930"]]);
        });
        it("should handle book ranges (no)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            return expect(p.parse("F??rste - Tredje  Joh").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (no)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=no.spec.js.map