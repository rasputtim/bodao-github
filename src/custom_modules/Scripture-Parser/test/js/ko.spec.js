"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/ko_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (ko)", function () {
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (ko)", function () {
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (ko)", function () {
            expect(p.parse("?????? ??? 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("?????? ??? 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Num (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (ko)", function () {
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (ko)", function () {
            expect(p.parse("??????????????? ?????? 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("??????????????? ?????? 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("???????????? ?????? 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("???????????? ?????? 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (ko)", function () {
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (ko)", function () {
            expect(p.parse("???????????? ?????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? ?????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (ko)", function () {
            expect(p.parse("??????????????? ?????? 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (ko)", function () {
            expect(p.parse("?????? ????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????? ????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????? ????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (ko)", function () {
            expect(p.parse("???????????? ?????? 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (ko)", function () {
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (ko)", function () {
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (ko)", function () {
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (ko)", function () {
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (ko)", function () {
            expect(p.parse("???????????? 1??? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (ko)", function () {
            expect(p.parse("???????????? 2??? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (ko)", function () {
            expect(p.parse("???????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (ko)", function () {
            expect(p.parse("???????????? ?????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? ?????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (ko)", function () {
            expect(p.parse("???????????? ?????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? ?????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (ko)", function () {
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (ko)", function () {
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (ko)", function () {
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (ko)", function () {
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("????????? ??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (ko)", function () {
            expect(p.parse("????????? ????????? 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("????????? ????????? 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (ko)", function () {
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Neh (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (ko)", function () {
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book Job (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (ko)", function () {
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (ko)", function () {
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (ko)", function () {
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (ko)", function () {
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Acts (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (ko)", function () {
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (ko)", function () {
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (ko)", function () {
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Jer (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (ko)", function () {
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (ko)", function () {
            expect(p.parse("??????????????? ?????? ?????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? ?????? ?????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Lev (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (ko)", function () {
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (ko)", function () {
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (ko)", function () {
            expect(p.parse("???????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (ko)", function () {
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (ko)", function () {
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (ko)", function () {
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (ko)", function () {
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Obad (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (ko)", function () {
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (ko)", function () {
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (ko)", function () {
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Sus (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (ko)", function () {
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book Nah (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (ko)", function () {
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (ko)", function () {
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (ko)", function () {
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (ko)", function () {
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (ko)", function () {
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (ko)", function () {
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Gal (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (ko)", function () {
            expect(p.parse("???????????? ??????????????? ?????? ?????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? ??????????????? ?????? ?????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Song (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (ko)", function () {
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Matt (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (ko)", function () {
            expect(p.parse("????????? ????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (ko)", function () {
            expect(p.parse("????????? ????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (ko)", function () {
            expect(p.parse("?????? ????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????? ?????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????? ?????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (ko)", function () {
            expect(p.parse("????????? ?????? ?????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("??????1??? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ?????? ?????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("??????1??? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (ko)", function () {
            expect(p.parse("????????? ?????? ?????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("??????2??? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ?????? ?????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("??????2??? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (ko)", function () {
            expect(p.parse("????????? ?????? ?????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??????3??? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3?????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ?????? ?????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??????3??? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3?????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (ko)", function () {
            expect(p.parse("?????? ????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("?????? ?????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("?????? ?????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Rom (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (ko)", function () {
            expect(p.parse("?????? ??????????????? ?????? ?????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ??????????????? ?????? ?????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (ko)", function () {
            expect(p.parse("????????? ??????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????2??? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????2??? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ??????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????2??? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????2??? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (ko)", function () {
            expect(p.parse("????????? ??????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????1??? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????1??? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ??????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????1??? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????1??? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Eph (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (ko)", function () {
            expect(p.parse("????????? ??????????????? ?????? ?????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ??????????????? ?????? ?????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (ko)", function () {
            expect(p.parse("????????? ??????????????? ?????? ?????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ??????????????? ?????? ?????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (ko)", function () {
            expect(p.parse("????????? ??????????????? ?????? ?????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ??????????????? ?????? ?????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (ko)", function () {
            expect(p.parse("??????????????? ??????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("???????????????2??? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("???????????????2??? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? ??????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("???????????????2??? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("???????????????2??? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (ko)", function () {
            expect(p.parse("??????????????? ??????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("???????????????1??? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("???????????????1??? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? ??????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("???????????????1??? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("???????????????1??? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (ko)", function () {
            expect(p.parse("?????????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("????????????2??? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("?????????2??? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("????????????2??? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("?????????2??? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (ko)", function () {
            expect(p.parse("?????????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("????????????1??? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("?????????1??? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????? ?????? ?????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("????????????1??? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("?????????1??? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (ko)", function () {
            expect(p.parse("???????????? ?????? ?????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? ?????? ?????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Heb (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (ko)", function () {
            expect(p.parse("????????????????????? ?????? ?????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????? ?????? ?????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (ko)", function () {
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????? ?????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (ko)", function () {
            expect(p.parse("???????????? ?????? ?????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("?????????2??? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? ?????? ?????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("?????????2??? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (ko)", function () {
            expect(p.parse("???????????? ?????? ?????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("?????????1??? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? ?????? ?????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("?????????1??? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (ko)", function () {
            expect(p.parse("?????? ?????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????? ?????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("??? 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (ko)", function () {
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (ko)", function () {
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (ko)", function () {
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("?????? 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (ko)", function () {
            expect(p.parse("??????????????? ?????? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2?????? 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (ko)", function () {
            expect(p.parse("???????????? 3??? 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3?????? 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (ko)", function () {
            expect(p.parse("???????????? 4??? 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4?????? 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (ko)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (ko)", function () {
            expect(p.parse("??????????????? ?????? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1?????? 1:1").osis()).toEqual("1Macc.1.1");
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
            return expect(p.languages).toEqual(["ko"]);
        });
        it("should handle ranges (ko)", function () {
            expect(p.parse("Titus 1:1 ??? 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1???2").osis()).toEqual("Matt.1-Matt.2");
            expect(p.parse("Phlm 2 ??? 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
            expect(p.parse("Titus 1:1 ~ 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1~2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 ~ 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (ko)", function () {
            expect(p.parse("Titus 1:1, ??? 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 ??? 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (ko)", function () {
            expect(p.parse("Exod 1:1 ??? 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm ??? 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (ko)", function () {
            expect(p.parse("Exod 1:1 and 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 AND 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (ko)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (ko)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (ko)", function () {
            expect(p.parse("Lev 1 (KLB)").osis_and_translations()).toEqual([["Lev.1", "KLB"]]);
            return expect(p.parse("lev 1 klb").osis_and_translations()).toEqual([["Lev.1", "KLB"]]);
        });
        return it("should handle boundaries (ko)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=ko.spec.js.map