"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/nl_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (nl)", function () {
            expect(p.parse("Eerste Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1e. Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Beresjiet 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1e Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Genesis 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Mozes 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gn 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EERSTE MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1E. MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("BERESJIET 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1E MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GENESIS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOZES 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (nl)", function () {
            expect(p.parse("Tweede Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2e. Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2e Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mozes 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exodus 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Sjemot 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Ex 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TWEEDE MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2E. MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2E MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOZES 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXODUS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("SJEMOT 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EX 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (nl)", function () {
            expect(p.parse("Bel en de draak 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (nl)", function () {
            expect(p.parse("Derde Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3e. Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Leviticus 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3e Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mozes 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Vajikra 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Wajikra 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lv 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DERDE MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3E. MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITICUS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3E MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOZES 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("VAJIKRA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("WAJIKRA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (nl)", function () {
            expect(p.parse("Vierde Mozes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Mozes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mozes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Bamidbar 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Bemidbar 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Mozes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mozes 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Numberi 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Numeri 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Nu 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("VIERDE MOZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("BAMIDBAR 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("BEMIDBAR 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOZES 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUMBERI 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUMERI 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NU 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (nl)", function () {
            expect(p.parse("Wijsheid van Jozua Ben Sirach 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Wijsheid van Jezus Sirach 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Wijsheid van Ben Sirach 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Ecclesiasticus 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Jezus Sirach 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirach 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (nl)", function () {
            expect(p.parse("De wijsheid van Salomo 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Het boek der wijsheid 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wijsheid van Salomo 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wijsheid 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (nl)", function () {
            expect(p.parse("Klaagliederen 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Klaagl 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kl 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KLAAGLIEDEREN 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KLAAGL 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KL 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (nl)", function () {
            expect(p.parse("Brief van Jeremia 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (nl)", function () {
            expect(p.parse("Openbaring van Johannes 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Openbaringen 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Openbaring 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apocalyps 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Openb 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apc 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apk 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Op 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OPENBARING VAN JOHANNES 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPENBARINGEN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPENBARING 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APOCALYPS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPENB 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APC 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APK 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OP 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (nl)", function () {
            expect(p.parse("Manasse 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Man 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (nl)", function () {
            expect(p.parse("Deuteronomium 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Vijfde Mozes 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mozes 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Dewariem 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Mozes 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mozes 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Mozes 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Dt 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEUTERONOMIUM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("VIJFDE MOZES 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOZES 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEWARIEM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOZES 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOZES 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOZES 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (nl)", function () {
            expect(p.parse("Jozua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Joz 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOZUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOZ 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (nl)", function () {
            expect(p.parse("Richteren 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Rechters 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Richtere 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Recht 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Richt 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Re 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Ri 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RICHTEREN 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("RECHTERS 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("RICHTERE 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("RECHT 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("RICHT 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("RE 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("RI 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (nl)", function () {
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rt 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RT 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (nl)", function () {
            expect(p.parse("Eerste Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Derde Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Eerste Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("III. Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1e. Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3e. Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Derde Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("III Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1e Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3. Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3e Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("III. Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1e. Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3 Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3e. Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Esdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("III Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1e Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3. Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3e Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3 Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (nl)", function () {
            expect(p.parse("Tweede Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Vierde Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Tweede Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Vierde Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2e. Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("IV. Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2e Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("4. Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("IV Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2e. Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("4 Esdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("IV. Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2e Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("4. Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("IV Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("4 Ezra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (nl)", function () {
            expect(p.parse("Jesaja 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Jes 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Js 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JESAJA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JES 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JS 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (nl)", function () {
            expect(p.parse("Tweede Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Tweede Samu??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2e. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2e. Samu??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samu??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Tweede Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samu??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2e Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2e Samu??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samu??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Samuel II 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samu??l 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2e. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2e Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 S 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TWEEDE SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("TWEEDE SAMU??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2E. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2E. SAMU??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMU??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("TWEEDE SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMU??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2E SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2E SAMU??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMU??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("SAMUEL II 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMU??L 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2E. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2E SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 S 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (nl)", function () {
            expect(p.parse("Eerste Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Eerste Samu??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1e. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1e. Samu??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Eerste Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samu??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1e Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1e Samu??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samu??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samu??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samu??l 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Samuel I 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1e. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1e Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 S 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EERSTE SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("EERSTE SAMU??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1E. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1E. SAMU??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("EERSTE SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMU??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1E SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1E SAMU??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMU??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMU??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMU??L 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("SAMUEL I 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1E. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1E SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 S 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (nl)", function () {
            expect(p.parse("Tweede Koningen 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2e. Koningen 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Koningen 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Koningen 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2e Koningen 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Koningen 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Koningen 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Tweede Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Tweede Ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2e. Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2e Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2e. Ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2e Ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TWEEDE KONINGEN 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2E. KONINGEN 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KONINGEN 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KONINGEN 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2E KONINGEN 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KONINGEN 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KONINGEN 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("TWEEDE KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("TWEEDE KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2E. KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2E KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2E. KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2E KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (nl)", function () {
            expect(p.parse("Eerste Koningen 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1e. Koningen 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Koningen 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1e Koningen 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Koningen 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Koningen 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Eerste Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Koningen 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Eerste Ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1e. Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1e Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1e. Ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1e Ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Ko 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EERSTE KONINGEN 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1E. KONINGEN 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KONINGEN 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1E KONINGEN 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KONINGEN 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KONINGEN 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("EERSTE KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KONINGEN 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("EERSTE KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1E. KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1E KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1E. KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1E KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KO 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (nl)", function () {
            expect(p.parse("Tweede Kronieken 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2e. Kronieken 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kronieken 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kronieken 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2e Kronieken 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kronieken 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kronieken 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Tweede Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2e. Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2e Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kr 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TWEEDE KRONIEKEN 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2E. KRONIEKEN 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KRONIEKEN 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRONIEKEN 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2E KRONIEKEN 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KRONIEKEN 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRONIEKEN 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("TWEEDE KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2E. KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2E KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KR 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (nl)", function () {
            expect(p.parse("Eerste Kronieken 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1e. Kronieken 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kronieken 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1e Kronieken 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kronieken 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kronieken 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Eerste Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kronieken 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1e. Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1e Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kr 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EERSTE KRONIEKEN 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1E. KRONIEKEN 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRONIEKEN 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1E KRONIEKEN 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KRONIEKEN 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRONIEKEN 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("EERSTE KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KRONIEKEN 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1E. KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1E KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KR 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (nl)", function () {
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezr 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZR 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (nl)", function () {
            expect(p.parse("Nehemia 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NEHEMIA 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (nl)", function () {
            expect(p.parse("Ester \(Grieks\) 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester (Grieks) 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester (Gr.) 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester (Gr) 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Est gr 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (nl)", function () {
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
    describe("Localized book Job (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (nl)", function () {
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (nl)", function () {
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
    describe("Localized book PrAzar (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (nl)", function () {
            expect(p.parse("Gebed van Azarja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (nl)", function () {
            expect(p.parse("Spreuken 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Spr 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SPREUKEN 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("SPR 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (nl)", function () {
            expect(p.parse("Koheleth 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Prediker 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Qoheleth 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kohelet 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Qohelet 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pred 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pr 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KOHELETH 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PREDIKER 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("QOHELETH 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KOHELET 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("QOHELET 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PRED 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PR 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (nl)", function () {
            expect(p.parse("Gezang der drie mannen in het vuur 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Lied van de drie jongemannen 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (nl)", function () {
            expect(p.parse("Canticum canticorum 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Hooglied 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Hoogl 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Hl 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CANTICUM CANTICORUM 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("HOOGLIED 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("HOOGL 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("HL 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (nl)", function () {
            expect(p.parse("Jeremia 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jr 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JEREMIA 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JR 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (nl)", function () {
            expect(p.parse("Ezechiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezechi??l 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezech 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZECHIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZECHI??L 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZECH 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (nl)", function () {
            expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dani??l 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Da 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DANI??L 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DA 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (nl)", function () {
            expect(p.parse("Hosea 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HOSEA 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (nl)", function () {
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Jo??l 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Jl 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JO??L 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JL 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (nl)", function () {
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (nl)", function () {
            expect(p.parse("Obadja 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Ob 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OBADJA 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OB 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (nl)", function () {
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jona 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jon 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONA 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JON 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (nl)", function () {
            expect(p.parse("Micha 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mica 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mi 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MICHA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MI 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (nl)", function () {
            expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (nl)", function () {
            expect(p.parse("Habakuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HABAKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (nl)", function () {
            expect(p.parse("Sefanja 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zefanja 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sef 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zef 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SEFANJA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEFANJA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SEF 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEF 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (nl)", function () {
            expect(p.parse("Haggai 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hagga?? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hagg 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HAGGAI 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGGA?? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (nl)", function () {
            expect(p.parse("Zacharia 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zach 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZACHARIA 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (nl)", function () {
            expect(p.parse("Maleachi 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MALEACHI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (nl)", function () {
            expect(p.parse("Evangelie volgens Matteus 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Evangelie volgens Matte??s 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mattheus 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matthe??s 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matth??us 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matth????s 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matteus 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matte??s 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matth 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mat 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIE VOLGENS MATTEUS 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("EVANGELIE VOLGENS MATTE??S 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTHEUS 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTHE??S 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTH??US 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTH????S 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTEUS 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTE??S 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTH 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MAT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (nl)", function () {
            expect(p.parse("Evangelie volgens Marcus 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Evangelie volgens Markus 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Marcus 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Markus 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Marc 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mc 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mk 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mr 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIE VOLGENS MARCUS 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("EVANGELIE VOLGENS MARKUS 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARCUS 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKUS 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARC 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MC 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MR 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (nl)", function () {
            expect(p.parse("Evangelie volgens Lucas 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evangelie volgens Lukas 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lucas 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lukas 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luc 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lc 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lk 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIE VOLGENS LUCAS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANGELIE VOLGENS LUKAS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUCAS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKAS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUC 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LC 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LK 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (nl)", function () {
            expect(p.parse("Eerste Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1e. Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1e Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Eerste Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Johannes 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1e. Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1e Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Joh 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EERSTE JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1E. JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1E JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("EERSTE JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JOHANNES 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1E. JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1E JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JOH 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (nl)", function () {
            expect(p.parse("Tweede Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2e. Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2e Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Johannes 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Tweede Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2e. Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2e Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TWEEDE JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2E. JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2E JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOHANNES 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("TWEEDE JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2E. JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2E JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (nl)", function () {
            expect(p.parse("Derde Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3e. Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3e Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Johannes 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Derde Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3e. Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3e Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DERDE JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3E. JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3E JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOHANNES 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("DERDE JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3E. JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3E JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (nl)", function () {
            expect(p.parse("Evangelie volgens Johannes 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Johannes 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Joh 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIE VOLGENS JOHANNES 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHANNES 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOH 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (nl)", function () {
            expect(p.parse("Handelingen van de apostelen 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Handelingen der apostelen 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Handelingen 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Hand 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Hnd 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HANDELINGEN VAN DE APOSTELEN 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("HANDELINGEN DER APOSTELEN 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("HANDELINGEN 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("HAND 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("HND 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (nl)", function () {
            expect(p.parse("Romeinenbrief 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Romeinen 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ROMEINENBRIEF 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMEINEN 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (nl)", function () {
            expect(p.parse("Tweede Corinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Corinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Korinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Korinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Corinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Corinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Corintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Corinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Korinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Korinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Korintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Korinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Corintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Corinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Korintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Korinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Corinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Corinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Korinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Korinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Corinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Corinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Corinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Korinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Corinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Corinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Korinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Korinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Corinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Corinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Corintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Corinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Korinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Korinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Korintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Korinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Corinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Corinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Corintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Corinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinthiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinthi??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Corinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Corinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Corintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Corinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Korinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Korinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Korintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Korinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Corintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Corinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Korintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Korinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Corintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Corinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinthier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinthi??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korintiers 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinti??rs 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Corintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Corinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Korintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Korinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Corinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Korinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Corinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korintier 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinti??r 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Corinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Korinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korinthe 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Tweede Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e. Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2e Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TWEEDE CORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE CORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE KORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE CORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE CORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE CORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE CORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE KORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE KORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE KORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE KORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE CORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE CORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE KORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE KORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. CORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. CORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. KORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE CORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE KORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E CORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E CORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E KORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. CORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. CORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. CORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. CORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. KORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. KORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. KORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. KORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTHI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E CORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E CORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E CORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E CORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E KORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E KORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E KORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E KORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. CORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. CORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. KORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. KORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTHIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTHI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTIERS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTI??RS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E CORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E CORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E KORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E KORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. CORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. KORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTIER 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTI??R 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E CORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E KORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTHE 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("TWEEDE KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E. KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2E KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (nl)", function () {
            expect(p.parse("Eerste Corinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Corinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Korinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Korinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Corinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Corinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Corintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Corinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Korinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Korinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Korintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Korinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Corintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Corinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Korintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Korinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Corinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Corinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Korinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Korinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Corinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Korinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Corinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Corinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Corinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Corinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Korinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Korinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Corinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Corinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Corintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Corinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Korinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Korinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Korintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Korinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Corinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Corinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Corintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Corinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Corinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Corinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Corintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Corinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Korinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Korinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Korintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Korinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Corintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Corinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Korintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Korinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korinthiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korinthi??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Corintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Corinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Corintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Corinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Korintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Korinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Corinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Korinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korinthier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korinthi??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korintiers 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korinti??rs 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Corinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Corinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Korinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korintier 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korinti??r 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Eerste Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korinthe 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1e Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EERSTE CORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE CORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE KORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE CORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE CORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE CORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE CORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE KORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE KORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE KORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE KORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE CORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE CORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE KORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE KORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. CORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. CORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. KORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE CORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE KORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E CORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E CORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E KORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. CORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. CORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. CORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. CORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. KORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. KORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. KORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. KORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E CORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E CORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E CORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E CORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E KORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E KORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E KORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E KORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. CORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. CORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. KORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. KORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTHI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E CORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E CORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E KORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E KORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. CORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. KORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTHIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTHI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTIERS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTI??RS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E CORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E KORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTIER 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTI??R 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("EERSTE KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTHE 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1E KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (nl)", function () {
            expect(p.parse("Galatenbrief 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galaten 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GALATENBRIEF 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATEN 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (nl)", function () {
            expect(p.parse("Efeziers 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efezi??rs 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efez 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EFEZIERS 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFEZI??RS 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFEZ 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (nl)", function () {
            expect(p.parse("Filippenzen 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filip 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Fil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FILIPPENZEN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIP 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (nl)", function () {
            expect(p.parse("Colossenzen 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolossenzen 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("COLOSSENZEN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSENZEN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (nl)", function () {
            expect(p.parse("Tweede Thessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Tweede Tessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2e. Thessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Thessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Thessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2e Thessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2e. Tessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Thessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Thessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2e Tessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tessalonicenzen 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Tweede Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Tweede Tess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Tweede Tes 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2e. Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2e Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2e. Tess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2e Tess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2e. Tes 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tes 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Thes 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tes 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2e Tes 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tes 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tes 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TWEEDE THESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("TWEEDE TESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2E. THESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. THESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. THESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2E THESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2E. TESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II THESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 THESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2E TESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESSALONICENZEN 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("TWEEDE THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("TWEEDE TESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("TWEEDE TES 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2E. THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2E THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2E. TESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2E TESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2E. TES 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TES 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 THES 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TES 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2E TES 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TES 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TES 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (nl)", function () {
            expect(p.parse("Eerste Thessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Eerste Tessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1e. Thessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Thessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1e Thessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1e. Tessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Thessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Thessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1e Tessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Thessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tessalonicenzen 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Eerste Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Eerste Tess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Eerste Tes 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1e. Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1e Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1e. Tess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1e Tess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1e. Tes 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Thes 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tes 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1e Tes 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tes 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tes 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tes 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EERSTE THESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("EERSTE TESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1E. THESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. THESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1E THESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1E. TESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. THESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 THESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1E TESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I THESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESSALONICENZEN 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("EERSTE THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("EERSTE TESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("EERSTE TES 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1E. THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1E THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1E. TESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1E TESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1E. TES 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 THES 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TES 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1E TES 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TES 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TES 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TES 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (nl)", function () {
            expect(p.parse("Tweede Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Tweede Timothe??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Tweede Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Tweede Timote??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2e. Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2e. Timothe??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timothe??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timothe??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2e Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2e Timothe??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2e. Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2e. Timote??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timothe??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timote??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timotheus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timothe??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timote??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2e Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2e Timote??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timote??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timote??s 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Tweede Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2e. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2e Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TWEEDE TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TWEEDE TIMOTHE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TWEEDE TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TWEEDE TIMOTE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2E. TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2E. TIMOTHE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTHE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTHE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2E TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2E TIMOTHE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2E. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2E. TIMOTE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTHE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTHE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2E TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2E TIMOTE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTE??S 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TWEEDE TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2E. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2E TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (nl)", function () {
            expect(p.parse("Eerste Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Eerste Timothe??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Eerste Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Eerste Timote??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1e. Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1e. Timothe??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timothe??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1e Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1e Timothe??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1e. Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1e. Timote??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timothe??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timothe??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timote??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1e Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1e Timote??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timotheus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timothe??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timote??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timote??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Eerste Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timote??s 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1e. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1e Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EERSTE TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("EERSTE TIMOTHE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("EERSTE TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("EERSTE TIMOTE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1E. TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1E. TIMOTHE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTHE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1E TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1E TIMOTHE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1E. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1E. TIMOTE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTHE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTHE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1E TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1E TIMOTE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTHE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("EERSTE TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTE??S 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1E. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1E TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (nl)", function () {
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (nl)", function () {
            expect(p.parse("Filemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Fil??mon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filem 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Film 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FIL??MON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (nl)", function () {
            expect(p.parse("Hebreeen 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebree??n 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebr 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HEBREEEN 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBREE??N 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBR 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (nl)", function () {
            expect(p.parse("Jakobus 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JAKOBUS 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (nl)", function () {
            expect(p.parse("Tweede Petrus 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Tweede Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2e. Petrus 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Petrus 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Tweede Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petrus 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2e Petrus 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Petrus 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petrus 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2e. Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2e Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2e. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2e Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pe 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TWEEDE PETRUS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("TWEEDE PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2E. PETRUS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PETRUS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("TWEEDE PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETRUS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2E PETRUS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PETRUS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETRUS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2E. PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2E PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2E. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2E PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PE 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (nl)", function () {
            expect(p.parse("Eerste Petrus 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Eerste Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1e. Petrus 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Eerste Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petrus 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1e Petrus 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Petrus 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petrus 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1e. Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Petrus 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1e Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1e. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1e Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pe 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EERSTE PETRUS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("EERSTE PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1E. PETRUS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("EERSTE PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETRUS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1E PETRUS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PETRUS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETRUS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1E. PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PETRUS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1E PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1E. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1E PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PE 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (nl)", function () {
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
    describe("Localized book Tob (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (nl)", function () {
            expect(p.parse("Tobias 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob??as 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobia 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobit 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob??a 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (nl)", function () {
            expect(p.parse("Judith 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Judit 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (nl)", function () {
            expect(p.parse("Baruch 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (nl)", function () {
            expect(p.parse("Susanna 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (nl)", function () {
            expect(p.parse("Tweede Makkabeeen 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Tweede Makkabee??n 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2e. Makkabeeen 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2e. Makkabee??n 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Makkabeeen 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Makkabee??n 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makkabeeen 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makkabee??n 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2e Makkabeeen 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2e Makkabee??n 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Makkabeeen 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Makkabee??n 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makkabeeen 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makkabee??n 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Tweede Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2e. Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2e Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (nl)", function () {
            expect(p.parse("Derde Makkabeeen 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Derde Makkabee??n 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Makkabeeen 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Makkabee??n 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3e. Makkabeeen 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3e. Makkabee??n 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Makkabeeen 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Makkabee??n 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makkabeeen 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makkabee??n 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3e Makkabeeen 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3e Makkabee??n 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makkabeeen 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makkabee??n 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Derde Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3e. Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3e Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (nl)", function () {
            expect(p.parse("Vierde Makkabeeen 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Vierde Makkabee??n 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Makkabeeen 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Makkabee??n 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makkabeeen 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makkabee??n 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Makkabeeen 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Makkabee??n 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makkabeeen 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makkabee??n 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Vierde Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (nl)", function () {
            expect(p.parse("Eerste Makkabeeen 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Eerste Makkabee??n 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1e. Makkabeeen 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1e. Makkabee??n 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makkabeeen 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makkabee??n 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1e Makkabeeen 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1e Makkabee??n 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Makkabeeen 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Makkabee??n 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makkabeeen 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makkabee??n 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Makkabeeen 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Makkabee??n 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Eerste Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1e. Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1e Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Mak 1:1").osis()).toEqual("1Macc.1.1");
            return true;
        });
    });
    describe("Localized book Ezek,Ezra (nl)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek,Ezra (nl)", function () {
            expect(p.parse("Ez 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZ 1:1").osis()).toEqual("Ezek.1.1");
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
            return expect(p.languages).toEqual(["nl"]);
        });
        it("should handle ranges (nl)", function () {
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (nl)", function () {
            expect(p.parse("Titus 1:1, hoofdstukken 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 HOOFDSTUKKEN 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, hoofdstuk 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 HOOFDSTUK 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (nl)", function () {
            expect(p.parse("Exod 1:1 verzen 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERZEN 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 vers 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERS 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 vs. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VS. 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 vs 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VS 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 v. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm V. 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 v 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm V 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (nl)", function () {
            expect(p.parse("Exod 1:1 en 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 EN 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 vgl 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 VGL 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 zie ook 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 ZIE OOK 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (nl)", function () {
            expect(p.parse("Ps 3 opschrift, 4:2, 5:opschrift").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 OPSCHRIFT, 4:2, 5:OPSCHRIFT").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (nl)", function () {
            expect(p.parse("Rev 3en volgende verzen, 4:2en volgende verzen").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 EN VOLGENDE VERZEN, 4:2 EN VOLGENDE VERZEN").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (nl)", function () {
            expect(p.parse("Lev 1 (GNB96)").osis_and_translations()).toEqual([["Lev.1", "GNB96"]]);
            expect(p.parse("lev 1 gnb96").osis_and_translations()).toEqual([["Lev.1", "GNB96"]]);
            expect(p.parse("Lev 1 (NB)").osis_and_translations()).toEqual([["Lev.1", "NB"]]);
            expect(p.parse("lev 1 nb").osis_and_translations()).toEqual([["Lev.1", "NB"]]);
            expect(p.parse("Lev 1 (NBG51)").osis_and_translations()).toEqual([["Lev.1", "NBG51"]]);
            expect(p.parse("lev 1 nbg51").osis_and_translations()).toEqual([["Lev.1", "NBG51"]]);
            expect(p.parse("Lev 1 (NBV)").osis_and_translations()).toEqual([["Lev.1", "NBV"]]);
            expect(p.parse("lev 1 nbv").osis_and_translations()).toEqual([["Lev.1", "NBV"]]);
            expect(p.parse("Lev 1 (SV)").osis_and_translations()).toEqual([["Lev.1", "SV"]]);
            expect(p.parse("lev 1 sv").osis_and_translations()).toEqual([["Lev.1", "SV"]]);
            expect(p.parse("Lev 1 (SV77)").osis_and_translations()).toEqual([["Lev.1", "SV77"]]);
            expect(p.parse("lev 1 sv77").osis_and_translations()).toEqual([["Lev.1", "SV77"]]);
            expect(p.parse("Lev 1 (WV95)").osis_and_translations()).toEqual([["Lev.1", "WV95"]]);
            return expect(p.parse("lev 1 wv95").osis_and_translations()).toEqual([["Lev.1", "WV95"]]);
        });
        it("should handle book ranges (nl)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            return expect(p.parse("Eerste - Derde  Joh").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (nl)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=nl.spec.js.map