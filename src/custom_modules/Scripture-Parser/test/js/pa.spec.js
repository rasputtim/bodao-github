"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/pa_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (pa)", function () {
            expect(p.parse("utpat 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("UTPAT 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (pa)", function () {
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("k???? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("K???? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (pa)", function () {
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (pa)", function () {
            expect(p.parse("lev??????? d?? pot???? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("lev??????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LEV??????? D?? POT???? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV??????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (pa)", function () {
            expect(p.parse("gi???t?? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GI???T?? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (pa)", function () {
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (pa)", function () {
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (pa)", function () {
            expect(p.parse("virl??p 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("VIRL??P 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (pa)", function () {
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (pa)", function () {
            expect(p.parse("y??h??n?? de prak???? d?? pot???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????????????????? ?????? ?????????????????? ?????? ???????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??h??n?? de prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("Y??H??N?? DE PRAK???? D?? POT???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????????????????? ?????? ?????????????????? ?????? ???????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??H??N?? DE PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (pa)", function () {
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (pa)", function () {
            expect(p.parse("bivast???? s??r 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????????? ????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BIVAST???? S??R 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????????? ????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (pa)", function () {
            expect(p.parse("yaho??u?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAHO??U?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (pa)", function () {
            expect(p.parse("ni????????? d?? pot???? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("????????????????????? ?????? ???????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("ni????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NI????????? D?? POT???? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("????????????????????? ?????? ???????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NI????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (pa)", function () {
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("r??t?? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("R??T?? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (pa)", function () {
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (pa)", function () {
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (pa)", function () {
            expect(p.parse("yas??y??h 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAS??Y??H 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (pa)", function () {
            expect(p.parse("sam??el d?? d??j?? pot???? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("??????????????? ?????? ???????????? ???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 sam??el 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ??????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SAM??EL D?? D??J?? POT???? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("??????????????? ?????? ???????????? ???????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM??EL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ??????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (pa)", function () {
            expect(p.parse("sam??el d?? pahil?? pot???? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("??????????????? ?????? ??????????????? ???????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 sam??el 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ??????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SAM??EL D?? PAHIL?? POT???? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("??????????????? ?????? ??????????????? ???????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM??EL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ??????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (pa)", function () {
            expect(p.parse("r??ji????? d?? d??j?? pot???? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 r??ji????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("R??JI????? D?? D??J?? POT???? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 R??JI????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (pa)", function () {
            expect(p.parse("r??ji????? d?? pahil?? pot???? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("?????????????????? ?????? ??????????????? ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 r??ji????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("R??JI????? D?? PAHIL?? POT???? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("?????????????????? ?????? ??????????????? ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 R??JI????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (pa)", function () {
            expect(p.parse("itah??s d?? d??j?? pot???? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("??????????????? ?????? ???????????? ???????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 itah??s 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ??????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ITAH??S D?? D??J?? POT???? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("??????????????? ?????? ???????????? ???????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ITAH??S 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ??????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (pa)", function () {
            expect(p.parse("itah??s d?? pahil?? pot???? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("??????????????? ?????? ??????????????? ???????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 itah??s 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ??????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ITAH??S D?? PAHIL?? POT???? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("??????????????? ?????? ??????????????? ???????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ITAH??S 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ??????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (pa)", function () {
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("azr?? 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("AZR?? 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (pa)", function () {
            expect(p.parse("nahamy??h 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHAMY??H 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (pa)", function () {
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (pa)", function () {
            expect(p.parse("astar 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ASTAR 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (pa)", function () {
            expect(p.parse("ayy??b 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AYY??B 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (pa)", function () {
            expect(p.parse("zab??r 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZAB??R 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (pa)", function () {
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (pa)", function () {
            expect(p.parse("kah??ut????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KAH??UT????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (pa)", function () {
            expect(p.parse("upade??ak 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("UPADE??AK 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (pa)", function () {
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (pa)", function () {
            expect(p.parse("salem??n d?? g??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("?????????????????? ?????? ????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SALEM??N D?? G??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("?????????????????? ?????? ????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (pa)", function () {
            expect(p.parse("yirmiy??h 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YIRMIY??H 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (pa)", function () {
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("hizk??el 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("HIZK??EL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (pa)", function () {
            expect(p.parse("d??n??el 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("D??N??EL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (pa)", function () {
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("ho??e?? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HO??E?? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (pa)", function () {
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("yoel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("YOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (pa)", function () {
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??mos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??MOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (pa)", function () {
            expect(p.parse("obady??h 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OBADY??H 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (pa)", function () {
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("y??n??h 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Y??N??H 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (pa)", function () {
            expect(p.parse("m??k??h 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("M??K??H 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (pa)", function () {
            expect(p.parse("nah??m 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAH??M 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (pa)", function () {
            expect(p.parse("habakk??k 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HABAKK??K 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (pa)", function () {
            expect(p.parse("safany??h 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SAFANY??H 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (pa)", function () {
            expect(p.parse("hajja?? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HAJJA?? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (pa)", function () {
            expect(p.parse("zakary??h 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZAKARY??H 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (pa)", function () {
            expect(p.parse("mal??k?? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MAL??K?? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (pa)", function () {
            expect(p.parse("matt?? d?? ??j??l 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???????????? ?????? ??????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("matt?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MATT?? D?? ??J??L 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???????????? ?????? ??????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (pa)", function () {
            expect(p.parse("markus d?? ??j??l 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??????????????? ?????? ??????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("markus 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MARKUS D?? ??J??L 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??????????????? ?????? ??????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKUS 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (pa)", function () {
            expect(p.parse("???????????? ?????? ??????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k?? d?? ??j??l 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k?? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????? ?????? ??????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K?? D?? ??J??L 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K?? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (pa)", function () {
            expect(p.parse("y??h??n?? d?? pahil?? pattr?? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("?????????????????? ?????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 y??h??n?? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("Y??H??N?? D?? PAHIL?? PATTR?? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("?????????????????? ?????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Y??H??N?? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (pa)", function () {
            expect(p.parse("y??h??n?? d?? d??j?? pattr?? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? ?????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 y??h??n?? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("Y??H??N?? D?? D??J?? PATTR?? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? ?????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Y??H??N?? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (pa)", function () {
            expect(p.parse("y??h??n?? d?? t??j?? pattr?? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? ?????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 y??h??n?? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ?????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("Y??H??N?? D?? T??J?? PATTR?? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("?????????????????? ?????? ???????????? ?????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Y??H??N?? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ?????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (pa)", function () {
            expect(p.parse("?????????????????? ?????? ??????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??h??n?? d?? ??j??l 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??h??n?? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????? ??????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??H??N?? D?? ??J??L 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??H??N?? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (pa)", function () {
            expect(p.parse("ras??l????? de kartabb 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("?????????????????? ?????? ??????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RAS??L????? DE KARTABB 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("?????????????????? ?????? ??????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (pa)", function () {
            expect(p.parse("rom??????? n???? pattr?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????????? ????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ROM??????? N???? PATTR?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????????? ????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (pa)", function () {
            expect(p.parse("kur??t????????? n???? d??j?? pattr?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("??????????????????????????? ????????? ???????????? ?????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ??????????????????????????? ????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 kur??t????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KUR??T????????? N???? D??J?? PATTR?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("??????????????????????????? ????????? ???????????? ?????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ??????????????????????????? ????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KUR??T????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (pa)", function () {
            expect(p.parse("kur??t????????? n???? pahil?? pattr?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("??????????????????????????? ????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ??????????????????????????? ????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("??????????????????????????? ????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 kur??t????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KUR??T????????? N???? PAHIL?? PATTR?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("??????????????????????????? ????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ??????????????????????????? ????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("??????????????????????????? ????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KUR??T????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (pa)", function () {
            expect(p.parse("gal??t??????? n???? pattr?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("????????????????????? ????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GAL??T??????? N???? PATTR?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("????????????????????? ????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (pa)", function () {
            expect(p.parse("afas??????? n???? pattr?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("????????????????????? ????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("afas??????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AFAS??????? N???? PATTR?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("????????????????????? ????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("AFAS??????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (pa)", function () {
            expect(p.parse("?????????????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("filipp??????? n???? pattr?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????????????????????????? ????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("filipp??????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPP??????? N???? PATTR?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????????????????????????? ????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPP??????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (pa)", function () {
            expect(p.parse("kuluss??????? n???? pattr?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("??????????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("??????????????????????????? ????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kuluss??????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KULUSS??????? N???? PATTR?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("??????????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("??????????????????????????? ????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KULUSS??????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (pa)", function () {
            expect(p.parse("t??assalun??k??????? n???? d??j?? pattr?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("????????????????????????????????? ????????? ???????????? ?????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ????????????????????????????????? ????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??assalun??k??????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("T??ASSALUN??K??????? N???? D??J?? PATTR?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("????????????????????????????????? ????????? ???????????? ?????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ????????????????????????????????? ????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ASSALUN??K??????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (pa)", function () {
            expect(p.parse("t??assalun??k??????? n???? pahil?? pattr?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("????????????????????????????????? ????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("????????????????????????????????? ????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ????????????????????????????????? ????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??assalun??k??????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("T??ASSALUN??K??????? N???? PAHIL?? PATTR?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("????????????????????????????????? ????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("????????????????????????????????? ????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ????????????????????????????????? ????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ASSALUN??K??????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (pa)", function () {
            expect(p.parse("timot??ius n???? d??j?? pattr?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("???????????????????????? ????????? ???????????? ?????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ???????????????????????? ????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timot??ius 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TIMOT??IUS N???? D??J?? PATTR?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("???????????????????????? ????????? ???????????? ?????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ???????????????????????? ????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOT??IUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (pa)", function () {
            expect(p.parse("timot??ius n???? pahil?? pattr?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("???????????????????????? ????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ???????????????????????? ????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timot??ius 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TIMOT??IUS N???? PAHIL?? PATTR?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("???????????????????????? ????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ???????????????????????? ????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOT??IUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (pa)", function () {
            expect(p.parse("t??tus n???? pattr?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("??????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("??????????????? ????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("T??TUS N???? PATTR?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("??????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("??????????????? ????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (pa)", function () {
            expect(p.parse("p??ilemon n???? pattr?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????????????????? ????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("P??ILEMON N???? PATTR?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????????????????? ????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (pa)", function () {
            expect(p.parse("ibr??n??????? n???? pattr?? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("???????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("???????????????????????? ????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibr??n??????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IBR??N??????? N???? PATTR?? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("???????????????????????? ????????? ?????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("???????????????????????? ????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBR??N??????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (pa)", function () {
            expect(p.parse("y??k??b d?? pattr?? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????? ?????? ?????????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??k??b 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("Y??K??B D?? PATTR?? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????? ?????? ?????????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??K??B 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (pa)", function () {
            expect(p.parse("patras d?? d??j?? pattr?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("???????????? ?????? ???????????? ?????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 patras 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ???????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PATRAS D?? D??J?? PATTR?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("???????????? ?????? ???????????? ?????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PATRAS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ???????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (pa)", function () {
            expect(p.parse("patras d?? pahil?? pattr?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("???????????? ?????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 patras 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PATRAS D?? PAHIL?? PATTR?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("???????????? ?????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PATRAS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (pa)", function () {
            expect(p.parse("yah??d??h d?? pattr?? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????????????????? ?????? ?????????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??d??h 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAH??D??H D?? PATTR?? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????????????????? ?????? ?????????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??D??H 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (pa)", function () {
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (pa)", function () {
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (pa)", function () {
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (pa)", function () {
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (pa)", function () {
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (pa)", function () {
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (pa)", function () {
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (pa)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (pa)", function () {
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
            return expect(p.languages).toEqual(["pa"]);
        });
        it("should handle ranges (pa)", function () {
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (pa)", function () {
            expect(p.parse("Titus 1:1, chapter 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 CHAPTER 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (pa)", function () {
            expect(p.parse("Exod 1:1 ?????? 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm ?????? 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (pa)", function () {
            expect(p.parse("Exod 1:1 ????????? 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 ????????? 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (pa)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (pa)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (pa)", function () {
            expect(p.parse("Lev 1 (ERV)").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
            return expect(p.parse("lev 1 erv").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
        });
        return it("should handle boundaries (pa)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=pa.spec.js.map