"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/ar_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (ar)", function () {
            expect(p.parse("?????? ?????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (ar)", function () {
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (ar)", function () {
            expect(p.parse("???? ?????????????? 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (ar)", function () {
            expect(p.parse("?????? ???????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("???????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("???????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (ar)", function () {
            expect(p.parse("?????? ?????? ?????????? 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("???????? ???? ?????????? 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (ar)", function () {
            expect(p.parse("???????? ???????????? 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (ar)", function () {
            expect(p.parse("?????? ?????????? ?????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? ?????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (ar)", function () {
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (ar)", function () {
            expect(p.parse("???????? ???????? 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (ar)", function () {
            expect(p.parse("?????????? ???????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????? ?????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("???????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????? ?????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("???????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (ar)", function () {
            expect(p.parse("?????? ???????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (ar)", function () {
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (ar)", function () {
            expect(p.parse("???????????? ?????????? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (ar)", function () {
            expect(p.parse("???????????? ???????????? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (ar)", function () {
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("???????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("???????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (ar)", function () {
            expect(p.parse("?????? ???????????? ???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("?????????????? ???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("???????????? ?????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("???????????? ???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????? ???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("?????????????? ???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("???????????? ?????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("???????????? ???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (ar)", function () {
            expect(p.parse("?????? ???????????? ?????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("?????????????? ?????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("???????????? ?????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("?????????????????? ???????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ???????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????? ?????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("?????????????? ?????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("???????????? ?????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("?????????????????? ???????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ???????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (ar)", function () {
            expect(p.parse("?????? ???????????? ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("?????????????? ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????? ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("?????????????? ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (ar)", function () {
            expect(p.parse("?????? ???????????? ?????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("?????????????? ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("???????????? ?????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("?????????????????? ????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????? ?????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("?????????????? ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("???????????? ?????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("?????????????????? ????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (ar)", function () {
            expect(p.parse("?????? ?????????? ???????????? ???????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("?????????? ???????????? ???????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("??????????????? ??????????????? ??????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("?????????????? 2 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? ???????????? ???????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("?????????? ???????????? ???????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("??????????????? ??????????????? ??????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("?????????????? 2 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (ar)", function () {
            expect(p.parse("?????? ?????????? ???????????? ?????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("?????????? ???????????? ?????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("??????????????? ??????????????? ?????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("?????????????? 1 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? ???????????? ?????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("?????????? ???????????? ?????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("??????????????? ??????????????? ?????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("?????????????? 1 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (ar)", function () {
            expect(p.parse("?????? ???????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (ar)", function () {
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (ar)", function () {
            expect(p.parse("?????? ???????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (ar)", function () {
            expect(p.parse("?????? ???????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("???????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("???????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (ar)", function () {
            expect(p.parse("???????? ?????????? 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (ar)", function () {
            expect(p.parse("?????? ?????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (ar)", function () {
            expect(p.parse("?????? ?????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("?????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (ar)", function () {
            expect(p.parse("???????????? ?????????????? ?????????????? 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (ar)", function () {
            expect(p.parse("?????? ???????? ?????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("???????? ???????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("???????????? ??????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????? ?????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("???????? ???????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("???????????? ??????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (ar)", function () {
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (ar)", function () {
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (ar)", function () {
            expect(p.parse("?????? ???????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (ar)", function () {
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (ar)", function () {
            expect(p.parse("?????? ???????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ???????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (ar)", function () {
            expect(p.parse("?????? ?????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (ar)", function () {
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (ar)", function () {
            expect(p.parse("?????????? ?????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ?????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (ar)", function () {
            expect(p.parse("?????????? ???????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (ar)", function () {
            expect(p.parse("?????????? ???????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (ar)", function () {
            expect(p.parse("?????????? ???????????? ?????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("?????????? ?????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("?????????? ?????????? 1 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("?????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("??????????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????????? ?????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("?????????? ?????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("?????????? ?????????? 1 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("?????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("??????????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (ar)", function () {
            expect(p.parse("?????????? ???????????? ?????????? ?????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("?????????? ?????????? ?????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("?????????? ?????????? 2 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("?????????? ?????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????????? ?????????? ?????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("?????????? ?????????? ?????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("?????????? ?????????? 2 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("?????????? ?????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (ar)", function () {
            expect(p.parse("?????????? ???????????? ?????????? ?????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("?????????? ?????????? ?????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("?????????? ?????????? 3 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("?????????? ?????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ???? 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????????? ?????????? ?????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("?????????? ?????????? ?????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("?????????? ?????????? 3 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("?????????? ?????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ???? 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book Rev (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (ar)", function () {
            expect(p.parse("???????? ?????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??????????????? ???????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("???????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????? ?????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??????????????? ???????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("???????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book John (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (ar)", function () {
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (ar)", function () {
            expect(p.parse("?????? ?????????? ?????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("??????????????? ??????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????????? ?????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("??????????????? ??????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ?????? ?????? ?????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????? ?????? ?????? ?????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????? ???????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ?????? ?????? ?????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????? ?????? ?????? ?????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????? ???????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ?????????????? ?????? ?????? ?????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????????? ?????????????? ?????? ?????? ?????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????????? ?????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ?????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2???? 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ?????????????? ?????? ?????? ?????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????????? ?????????????? ?????? ?????? ?????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????????? ?????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ?????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2???? 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ???????????? ?????? ?????? ?????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????????? ???????????? ?????? ?????? ?????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("????????????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ?????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1???? 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ???????????? ?????? ?????? ?????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????????? ???????????? ?????? ?????? ?????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("????????????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ?????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1???? 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ?????? ?????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("?????????????? ?????? ?????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("?????????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ?????? ?????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("?????????????? ?????? ?????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("?????????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ?????? ?????? ???????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("?????????????? ?????? ?????? ???????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("?????????? ???????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ?????? ?????? ???????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("?????????????? ?????? ?????? ???????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("?????????? ???????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ?????? ?????? ?????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????????? ?????? ?????? ?????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ?????? ?????? ?????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????????? ?????? ?????? ?????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ?????? ?????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????????????? ?????? ?????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ?????? ?????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????????????? ?????? ?????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ?????????????? ?????? ?????? ?????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("?????????????? ?????????????? ?????? ?????? ?????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("?????????? ?????????????????? ?????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("????????????????????? ??????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ?????????????? ?????? ?????? ?????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("?????????????? ?????????????? ?????? ?????? ?????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("?????????? ?????????????????? ?????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("????????????????????? ??????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ???????????? ?????? ?????? ?????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("?????????????? ???????????? ?????? ?????? ?????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("?????????? ?????????????????? ???????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("???????????? ??????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ???????????? ?????? ?????? ?????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("?????????????? ???????????? ?????? ?????? ?????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("?????????? ?????????????????? ???????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("???????????? ??????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ?????????????? ?????? ???????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("?????????????? ?????????????? ?????? ???????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("???????????????? ?????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("????????????????????? ???????????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ?????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ?????????????? ?????? ???????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("?????????????? ?????????????? ?????? ???????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("???????????????? ?????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("????????????????????? ???????????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ?????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ???????????? ?????? ???????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("?????????????? ???????????? ?????? ???????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("???????????????? ???????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("???????????? ???????????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ?????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ???????????? ?????? ???????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("?????????????? ???????????? ?????? ???????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("???????????????? ???????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("???????????? ???????????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ?????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ?????? ???????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("?????????????? ?????? ???????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ?????? ???????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("?????????????? ?????? ???????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("???????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (ar)", function () {
            expect(p.parse("?????????? ???????? ???????????? ?????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????????????? ?????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?? 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????? ???????????? ?????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????????????? ?????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?? 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (ar)", function () {
            expect(p.parse("?????????????? ?????? ???????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("???????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????? ?????? ???????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("???????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (ar)", function () {
            expect(p.parse("?????????? ???????????? ?????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????????? ?????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (ar)", function () {
            expect(p.parse("?????????? ???????????? ???????? ?????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("?????????? ???????? ?????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("???????? ?????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("?????????? ???????? 2 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2???? 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????????? ???????? ?????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("?????????? ???????? ?????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("???????? ?????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("?????????? ???????? 2 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2???? 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (ar)", function () {
            expect(p.parse("?????????? ???????????? ???????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("?????????? ???????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("?????????? ???????? 1 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("???????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1???? 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????????? ???????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("?????????? ???????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("?????????? ???????? 1 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("???????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1???? 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (ar)", function () {
            expect(p.parse("?????????? ???????????? ?????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????? ???????????? ?????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????????? ?????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (ar)", function () {
            expect(p.parse("?????? ???????????? 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (ar)", function () {
            expect(p.parse("?????? ?????????? 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("?????????? 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("???? 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (ar)", function () {
            expect(p.parse("???????? ???????????? 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (ar)", function () {
            expect(p.parse("?????? ???????????????? ???????????? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("???????????????? ???????????? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 ???? 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (ar)", function () {
            expect(p.parse("???????????????? ???????????? 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (ar)", function () {
            expect(p.parse("???????????????? ???????????? 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (ar)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (ar)", function () {
            expect(p.parse("?????? ???????????????? ?????????? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("???????????????? ?????????? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 ???? 1:1").osis()).toEqual("1Macc.1.1");
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
            return expect(p.languages).toEqual(["ar"]);
        });
        it("should handle ranges (ar)", function () {
            expect(p.parse("Titus 1:1 to 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1to2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 TO 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (ar)", function () {
            expect(p.parse("Titus 1:1, ?????? 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 ?????? 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (ar)", function () {
            expect(p.parse("Exod 1:1 ?????? 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm ?????? 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (ar)", function () {
            expect(p.parse("Exod 1:1 ?? 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 ?? 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (ar)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (ar)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (ar)", function () {
            expect(p.parse("Lev 1 (ALAB)").osis_and_translations()).toEqual([["Lev.1", "ALAB"]]);
            expect(p.parse("lev 1 alab").osis_and_translations()).toEqual([["Lev.1", "ALAB"]]);
            expect(p.parse("Lev 1 (VD)").osis_and_translations()).toEqual([["Lev.1", "VD"]]);
            return expect(p.parse("lev 1 vd").osis_and_translations()).toEqual([["Lev.1", "VD"]]);
        });
        return it("should handle boundaries (ar)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=ar.spec.js.map