"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/mr_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (mr)", function () {
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("utpatti 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("UTPATTI 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (mr)", function () {
            expect(p.parse("nirgam 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NIRGAM 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (mr)", function () {
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (mr)", function () {
            expect(p.parse("lewiy 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("lew??y 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LEWIY 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEW??Y 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (mr)", function () {
            expect(p.parse("ganana 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("ganan?? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("ga???ana 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("ga???an?? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GANANA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("GANAN?? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("GA???ANA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("GA???AN?? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (mr)", function () {
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (mr)", function () {
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (mr)", function () {
            expect(p.parse("wilapgit 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("wilapg??t 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("wil??pgit 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("wil??pg??t 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("WILAPGIT 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("WILAPG??T 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("WIL??PGIT 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("WIL??PG??T 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (mr)", function () {
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (mr)", function () {
            expect(p.parse("yohanala ????alele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ????alele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ????alele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ????alele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ????alele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ????alele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ????alele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ????alele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ??????lele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ??????lele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ??????lele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ??????lele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ??????lele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ??????lele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ??????lele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanala ??????lele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ????alele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ????alele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ????alele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ????alele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ????alele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ????alele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ????alele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ????alele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ??????lele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ??????lele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ??????lele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ??????lele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ??????lele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ??????lele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ??????lele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohanal?? ??????lele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ????alele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ????alele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ????alele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ????alele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ????alele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ????alele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ????alele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ????alele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ??????lele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ??????lele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ??????lele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ??????lele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ??????lele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ??????lele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ??????lele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??la ??????lele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ????alele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ????alele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ????alele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ????alele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ????alele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ????alele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ????alele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ????alele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ??????lele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ??????lele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ??????lele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ??????lele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ??????lele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ??????lele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ??????lele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yohan??l?? ??????lele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ????alele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ????alele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ????alele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ????alele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ????alele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ????alele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ????alele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ????alele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ??????lele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ??????lele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ??????lele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ??????lele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ??????lele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ??????lele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ??????lele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nala ??????lele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ????alele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ????alele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ????alele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ????alele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ????alele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ????alele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ????alele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ????alele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ??????lele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ??????lele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ??????lele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ??????lele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ??????lele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ??????lele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ??????lele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??nal?? ??????lele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ????alele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ????alele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ????alele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ????alele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ????alele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ????alele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ????alele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ????alele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ??????lele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ??????lele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ??????lele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ??????lele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ??????lele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ??????lele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ??????lele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??la ??????lele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ????alele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ????alele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ????alele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ????alele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ????alele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ????alele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ????alele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ????alele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ??????lele prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ??????lele prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ??????lele prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ??????lele prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ??????lele praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ??????lele praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ??????lele praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yoh??n??l?? ??????lele praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("???????????????????????? ?????????????????? ??????????????????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("prakatikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("prakatikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("prakat??karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("prakat??kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("praka???ikaran 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("praka???ikara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("praka?????karan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("praka?????kara??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YOHANALA ????ALELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ????ALELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ????ALELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ????ALELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ????ALELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ????ALELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ????ALELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ????ALELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ??????LELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ??????LELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ??????LELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ??????LELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ??????LELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ??????LELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ??????LELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANALA ??????LELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ????ALELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ????ALELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ????ALELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ????ALELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ????ALELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ????ALELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ????ALELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ????ALELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ??????LELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ??????LELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ??????LELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ??????LELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ??????LELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ??????LELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ??????LELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHANAL?? ??????LELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ????ALELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ????ALELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ????ALELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ????ALELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ????ALELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ????ALELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ????ALELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ????ALELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ??????LELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ??????LELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ??????LELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ??????LELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ??????LELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ??????LELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ??????LELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??LA ??????LELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ????ALELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ????ALELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ????ALELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ????ALELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ????ALELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ????ALELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ????ALELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ????ALELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ??????LELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ??????LELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ??????LELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ??????LELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ??????LELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ??????LELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ??????LELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOHAN??L?? ??????LELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ????ALELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ????ALELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ????ALELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ????ALELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ????ALELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ????ALELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ????ALELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ????ALELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ??????LELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ??????LELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ??????LELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ??????LELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ??????LELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ??????LELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ??????LELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NALA ??????LELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ????ALELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ????ALELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ????ALELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ????ALELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ????ALELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ????ALELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ????ALELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ????ALELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ??????LELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ??????LELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ??????LELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ??????LELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ??????LELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ??????LELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ??????LELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??NAL?? ??????LELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ????ALELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ????ALELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ????ALELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ????ALELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ????ALELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ????ALELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ????ALELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ????ALELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ??????LELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ??????LELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ??????LELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ??????LELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ??????LELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ??????LELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ??????LELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??LA ??????LELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ????ALELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ????ALELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ????ALELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ????ALELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ????ALELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ????ALELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ????ALELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ????ALELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ??????LELE PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ??????LELE PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ??????LELE PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ??????LELE PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ??????LELE PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ??????LELE PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ??????LELE PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YOH??N??L?? ??????LELE PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("???????????????????????? ?????????????????? ??????????????????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("PRAKATIKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("PRAKATIKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("PRAKAT??KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("PRAKAT??KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("PRAKA???IKARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("PRAKA???IKARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("PRAKA?????KARAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("PRAKA?????KARA??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (mr)", function () {
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (mr)", function () {
            expect(p.parse("anuwad 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("anuw??d 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ANUWAD 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("ANUW??D 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (mr)", function () {
            expect(p.parse("yahosawa 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("yahosaw?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("yaho??awa 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("yaho??aw?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAHOSAWA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("YAHOSAW?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("YAHO??AWA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("YAHO??AW?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (mr)", function () {
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("saste 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("s??ste 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("??aste 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("????ste 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("SASTE 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("S??STE 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("??ASTE 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("????STE 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (mr)", function () {
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("rut?? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("r??t?? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT?? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("R??T?? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (mr)", function () {
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (mr)", function () {
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (mr)", function () {
            expect(p.parse("yasaya 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("yasay?? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ya??aya 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ya??ay?? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YASAYA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("YASAY?? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("YA??AYA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("YA??AY?? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (mr)", function () {
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 samuwel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ??amuwel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUWEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ??AMUWEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (mr)", function () {
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 samuwel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ??amuwel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUWEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ??AMUWEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (mr)", function () {
            expect(p.parse("??????????????? ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ra??e 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 r????e 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 RA??E 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 R????E 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (mr)", function () {
            expect(p.parse("??????????????? ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ra??e 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 r????e 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 RA??E 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 R????E 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (mr)", function () {
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 itihas 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 itih??s 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ITIHAS 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ITIH??S 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (mr)", function () {
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 itihas 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 itih??s 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ITIHAS 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ITIH??S 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (mr)", function () {
            expect(p.parse("edzra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("edzr?? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("e??ra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("e??r?? 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EDZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EDZR?? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("E??RA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("E??R?? 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (mr)", function () {
            expect(p.parse("nahemya 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("nahemy?? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHEMYA 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NAHEMY?? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (mr)", function () {
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (mr)", function () {
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ester 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTER 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (mr)", function () {
            expect(p.parse("iyob 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("??yob 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IYOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("??YOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (mr)", function () {
            expect(p.parse("????????????????????????????????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("stotrasamhita 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("stotrasamhit?? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("stotrasa???hita 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("stotrasa???hit?? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??????????????????????????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????????????????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("STOTRASAMHITA 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("STOTRASAMHIT?? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("STOTRASA???HITA 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("STOTRASA???HIT?? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??????????????????????????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (mr)", function () {
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (mr)", function () {
            expect(p.parse("????????????????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("nitisutre 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("nitis??tre 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("n??tisutre 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("n??tis??tre 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("NITISUTRE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("NITIS??TRE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("N??TISUTRE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("N??TIS??TRE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (mr)", function () {
            expect(p.parse("upadesak 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("upade??ak 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("UPADESAK 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("UPADE??AK 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (mr)", function () {
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (mr)", function () {
            expect(p.parse("gitratna 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("g??tratna 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GITRATNA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("G??TRATNA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (mr)", function () {
            expect(p.parse("yirmaya 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("yirmay?? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YIRMAYA 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("YIRMAY?? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (mr)", function () {
            expect(p.parse("yahedzkel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("yahe??kel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAHEDZKEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("YAHE??KEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (mr)", function () {
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("daniel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("dan??el 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("d??niel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("d??n??el 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN??EL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("D??NIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("D??N??EL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (mr)", function () {
            expect(p.parse("hosey 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("ho??ey 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HOSEY 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HO??EY 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (mr)", function () {
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("yoel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("YOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (mr)", function () {
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??mos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??MOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (mr)", function () {
            expect(p.parse("obad??a 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("obad???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OBAD??A 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (mr)", function () {
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("yona 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("yon?? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("YONA 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("YON?? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (mr)", function () {
            expect(p.parse("mik??a 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("mik???? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("m??k??a 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("m??k???? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MIK??A 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIK???? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("M??K??A 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("M??K???? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (mr)", function () {
            expect(p.parse("nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("nah??m 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH??M 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (mr)", function () {
            expect(p.parse("habakkuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("habakk??k 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HABAKKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HABAKK??K 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (mr)", function () {
            expect(p.parse("sap??anya 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("sap??any?? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SAP??ANYA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SAP??ANY?? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (mr)", function () {
            expect(p.parse("haggay 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("h??ggay 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HAGGAY 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("H??GGAY 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (mr)", function () {
            expect(p.parse("jak??arya 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("jak??ary?? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JAK??ARYA 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("JAK??ARY?? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (mr)", function () {
            expect(p.parse("malak??i 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("malak???? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("mal??k??i 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("mal??k???? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MALAK??I 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALAK???? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL??K??I 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL??K???? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (mr)", function () {
            expect(p.parse("mattayane lihilele sub??avartaman 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattayane lihilele sub??avartam??n 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattayane lihilele ??ub??avartaman 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattayane lihilele ??ub??avartam??n 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattay??ne lihilele sub??avartaman 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattay??ne lihilele sub??avartam??n 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattay??ne lihilele ??ub??avartaman 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattay??ne lihilele ??ub??avartam??n 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???????????????????????? ???????????????????????? ?????????????????????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattayane 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattay??ne 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MATTAYANE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTAYANE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTAYANE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTAYANE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTAY??NE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTAY??NE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTAY??NE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTAY??NE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???????????????????????? ???????????????????????? ?????????????????????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTAYANE 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTAY??NE 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (mr)", function () {
            expect(p.parse("markane lihilele sub??avartaman 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("markane lihilele sub??avartam??n 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("markane lihilele ??ub??avartaman 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("markane lihilele ??ub??avartam??n 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("mark??ne lihilele sub??avartaman 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("mark??ne lihilele sub??avartam??n 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("mark??ne lihilele ??ub??avartaman 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("mark??ne lihilele ??ub??avartam??n 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("m??rkane lihilele sub??avartaman 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("m??rkane lihilele sub??avartam??n 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("m??rkane lihilele ??ub??avartaman 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("m??rkane lihilele ??ub??avartam??n 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("m??rk??ne lihilele sub??avartaman 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("m??rk??ne lihilele sub??avartam??n 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("m??rk??ne lihilele ??ub??avartaman 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("m??rk??ne lihilele ??ub??avartam??n 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????????????????? ???????????????????????? ?????????????????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("markane 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("mark??ne 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("m??rkane 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("m??rk??ne 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MARKANE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKANE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKANE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKANE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??NE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??NE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??NE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??NE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RKANE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RKANE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RKANE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RKANE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RK??NE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RK??NE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RK??NE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RK??NE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????????????????? ???????????????????????? ?????????????????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKANE 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??NE 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RKANE 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??RK??NE 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (mr)", function () {
            expect(p.parse("lukane lihilele sub??avartaman 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("lukane lihilele sub??avartam??n 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("lukane lihilele ??ub??avartaman 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("lukane lihilele ??ub??avartam??n 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("luk??ne lihilele sub??avartaman 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("luk??ne lihilele sub??avartam??n 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("luk??ne lihilele ??ub??avartaman 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("luk??ne lihilele ??ub??avartam??n 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??kane lihilele sub??avartaman 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??kane lihilele sub??avartam??n 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??kane lihilele ??ub??avartaman 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??kane lihilele ??ub??avartam??n 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k??ne lihilele sub??avartaman 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k??ne lihilele sub??avartam??n 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k??ne lihilele ??ub??avartaman 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k??ne lihilele ??ub??avartam??n 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????????????????? ???????????????????????? ?????????????????????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("lukane 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("luk??ne 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??kane 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k??ne 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LUKANE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKANE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKANE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKANE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??NE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??NE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??NE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??NE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KANE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KANE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KANE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KANE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K??NE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K??NE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K??NE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K??NE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????????????????? ???????????????????????? ?????????????????????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKANE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??NE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KANE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K??NE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (mr)", function () {
            expect(p.parse("yohanacem pahile patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("yohanace??? pahile patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("yohan??cem pahile patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("yohan??ce??? pahile patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("yoh??nacem pahile patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("yoh??nace??? pahile patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("yoh??n??cem pahile patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("yoh??n??ce??? pahile patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 yohanacem 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 yohanace??? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 yohan??cem 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 yohan??ce??? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 yoh??nacem 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 yoh??nace??? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 yoh??n??cem 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 yoh??n??ce??? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ????????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ??????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YOHANACEM PAHILE PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("YOHANACE??? PAHILE PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("YOHAN??CEM PAHILE PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("YOHAN??CE??? PAHILE PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("YOH??NACEM PAHILE PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("YOH??NACE??? PAHILE PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("YOH??N??CEM PAHILE PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("YOH??N??CE??? PAHILE PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 YOHANACEM 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 YOHANACE??? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 YOHAN??CEM 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 YOHAN??CE??? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 YOH??NACEM 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 YOH??NACE??? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 YOH??N??CEM 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 YOH??N??CE??? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ????????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ??????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (mr)", function () {
            expect(p.parse("yohanacem dusre patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("yohanace??? dusre patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("yohan??cem dusre patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("yohan??ce??? dusre patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("yoh??nacem dusre patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("yoh??nace??? dusre patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("yoh??n??cem dusre patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("yoh??n??ce??? dusre patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 yohanacem 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 yohanace??? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 yohan??cem 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 yohan??ce??? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 yoh??nacem 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 yoh??nace??? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 yoh??n??cem 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 yoh??n??ce??? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ????????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ??????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YOHANACEM DUSRE PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("YOHANACE??? DUSRE PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("YOHAN??CEM DUSRE PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("YOHAN??CE??? DUSRE PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("YOH??NACEM DUSRE PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("YOH??NACE??? DUSRE PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("YOH??N??CEM DUSRE PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("YOH??N??CE??? DUSRE PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 YOHANACEM 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 YOHANACE??? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 YOHAN??CEM 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 YOHAN??CE??? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 YOH??NACEM 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 YOH??NACE??? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 YOH??N??CEM 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 YOH??N??CE??? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ????????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ??????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (mr)", function () {
            expect(p.parse("yohanacem tisre patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("yohanace??? tisre patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("yohan??cem tisre patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("yohan??ce??? tisre patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("yoh??nacem tisre patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("yoh??nace??? tisre patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("yoh??n??cem tisre patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("yoh??n??ce??? tisre patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 yohanacem 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 yohanace??? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 yohan??cem 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 yohan??ce??? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 yoh??nacem 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 yoh??nace??? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 yoh??n??cem 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 yoh??n??ce??? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ????????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ??????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YOHANACEM TISRE PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("YOHANACE??? TISRE PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("YOHAN??CEM TISRE PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("YOHAN??CE??? TISRE PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("YOH??NACEM TISRE PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("YOH??NACE??? TISRE PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("YOH??N??CEM TISRE PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("YOH??N??CE??? TISRE PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 YOHANACEM 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 YOHANACE??? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 YOHAN??CEM 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 YOHAN??CE??? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 YOH??NACEM 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 YOH??NACE??? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 YOH??N??CEM 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 YOH??N??CE??? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ????????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ??????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (mr)", function () {
            expect(p.parse("yohanane lihilele sub??avartaman 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yohanane lihilele sub??avartam??n 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yohanane lihilele ??ub??avartaman 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yohanane lihilele ??ub??avartam??n 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yohan??ne lihilele sub??avartaman 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yohan??ne lihilele sub??avartam??n 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yohan??ne lihilele ??ub??avartaman 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yohan??ne lihilele ??ub??avartam??n 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yoh??nane lihilele sub??avartaman 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yoh??nane lihilele sub??avartam??n 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yoh??nane lihilele ??ub??avartaman 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yoh??nane lihilele ??ub??avartam??n 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yoh??n??ne lihilele sub??avartaman 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yoh??n??ne lihilele sub??avartam??n 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yoh??n??ne lihilele ??ub??avartaman 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yoh??n??ne lihilele ??ub??avartam??n 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("???????????????????????? ???????????????????????? ?????????????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yohanane 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yohan??ne 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yoh??nane 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yoh??n??ne 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YOHANANE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOHANANE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOHANANE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOHANANE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOHAN??NE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOHAN??NE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOHAN??NE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOHAN??NE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOH??NANE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOH??NANE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOH??NANE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOH??NANE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOH??N??NE LIHILELE SUB??AVARTAMAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOH??N??NE LIHILELE SUB??AVARTAM??N 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOH??N??NE LIHILELE ??UB??AVARTAMAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOH??N??NE LIHILELE ??UB??AVARTAM??N 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("???????????????????????? ???????????????????????? ?????????????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOHANANE 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOHAN??NE 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOH??NANE 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YOH??N??NE 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (mr)", function () {
            expect(p.parse("???????????????????????????????????? ????????????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presitamcim kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presitamcim kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presitamci??? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presitamci??? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presitamc??m kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presitamc??m kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presitamc????? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presitamc????? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presita???cim kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presita???cim kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presita???ci??? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presita???ci??? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presita???c??m kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presita???c??m kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presita???c????? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presita???c????? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit??mcim kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit??mcim kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit??mci??? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit??mci??? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit??mc??m kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit??mc??m kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit??mc????? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit??mc????? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit?????cim kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit?????cim kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit?????ci??? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit?????ci??? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit?????c??m kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit?????c??m kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit?????c????? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("presit?????c????? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??itamcim kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??itamcim kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??itamci??? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??itamci??? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??itamc??m kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??itamc??m kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??itamc????? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??itamc????? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??ita???cim kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??ita???cim kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??ita???ci??? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??ita???ci??? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??ita???c??m kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??ita???c??m kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??ita???c????? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??ita???c????? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it??mcim kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it??mcim kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it??mci??? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it??mci??? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it??mc??m kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it??mc??m kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it??mc????? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it??mc????? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it?????cim kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it?????cim kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it?????ci??? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it?????ci??? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it?????c??m kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it?????c??m kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it?????c????? kr??tyem 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("pre??it?????c????? kr??tye??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("????????????????????????????????? ????????????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("???????????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????????????????? ????????????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITAMCIM KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITAMCIM KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITAMCI??? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITAMCI??? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITAMC??M KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITAMC??M KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITAMC????? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITAMC????? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITA???CIM KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITA???CIM KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITA???CI??? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITA???CI??? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITA???C??M KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITA???C??M KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITA???C????? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESITA???C????? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT??MCIM KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT??MCIM KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT??MCI??? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT??MCI??? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT??MC??M KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT??MC??M KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT??MC????? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT??MC????? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT?????CIM KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT?????CIM KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT?????CI??? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT?????CI??? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT?????C??M KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT?????C??M KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT?????C????? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRESIT?????C????? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITAMCIM KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITAMCIM KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITAMCI??? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITAMCI??? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITAMC??M KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITAMC??M KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITAMC????? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITAMC????? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITA???CIM KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITA???CIM KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITA???CI??? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITA???CI??? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITA???C??M KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITA???C??M KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITA???C????? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??ITA???C????? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT??MCIM KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT??MCIM KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT??MCI??? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT??MCI??? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT??MC??M KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT??MC??M KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT??MC????? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT??MC????? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT?????CIM KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT?????CIM KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT?????CI??? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT?????CI??? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT?????C??M KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT?????C??M KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT?????C????? KR??TYEM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRE??IT?????C????? KR??TYE??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("????????????????????????????????? ????????????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("???????????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (mr)", function () {
            expect(p.parse("?????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romkarams patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romkara???s patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romkar??ms patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romkar?????s patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("???????????????????????? ???????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romkarams 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romkara???s 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romkar??ms 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romkar?????s 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMKARAMS PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMKARA???S PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMKAR??MS PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMKAR?????S PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("???????????????????????? ???????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMKARAMS 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMKARA???S 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMKAR??MS 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMKAR?????S 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (mr)", function () {
            expect(p.parse("?????????????????? ?????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("karimt??karams dusre patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("karimt??kara???s dusre patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("karimt??kar??ms dusre patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("karimt??kar?????s dusre patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("kari???t??karams dusre patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("kari???t??kara???s dusre patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("kari???t??kar??ms dusre patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("kari???t??kar?????s dusre patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 karimt??karams 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 karimt??kara???s 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 karimt??kar??ms 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 karimt??kar?????s 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 kari???t??karams 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 kari???t??kara???s 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 kari???t??kar??ms 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 kari???t??kar?????s 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ?????????????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KARIMT??KARAMS DUSRE PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KARIMT??KARA???S DUSRE PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KARIMT??KAR??MS DUSRE PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KARIMT??KAR?????S DUSRE PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KARI???T??KARAMS DUSRE PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KARI???T??KARA???S DUSRE PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KARI???T??KAR??MS DUSRE PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KARI???T??KAR?????S DUSRE PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KARIMT??KARAMS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KARIMT??KARA???S 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KARIMT??KAR??MS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KARIMT??KAR?????S 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KARI???T??KARAMS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KARI???T??KARA???S 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KARI???T??KAR??MS 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KARI???T??KAR?????S 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ?????????????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (mr)", function () {
            expect(p.parse("?????????????????? ?????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("karimt??karams pahile patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("karimt??kara???s pahile patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("karimt??kar??ms pahile patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("karimt??kar?????s pahile patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("kari???t??karams pahile patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("kari???t??kara???s pahile patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("kari???t??kar??ms pahile patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("kari???t??kar?????s pahile patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 karimt??karams 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 karimt??kara???s 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 karimt??kar??ms 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 karimt??kar?????s 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 kari???t??karams 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 kari???t??kara???s 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 kari???t??kar??ms 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 kari???t??kar?????s 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ?????????????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KARIMT??KARAMS PAHILE PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KARIMT??KARA???S PAHILE PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KARIMT??KAR??MS PAHILE PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KARIMT??KAR?????S PAHILE PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KARI???T??KARAMS PAHILE PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KARI???T??KARA???S PAHILE PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KARI???T??KAR??MS PAHILE PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KARI???T??KAR?????S PAHILE PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KARIMT??KARAMS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KARIMT??KARA???S 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KARIMT??KAR??MS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KARIMT??KAR?????S 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KARI???T??KARAMS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KARI???T??KARA???S 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KARI???T??KAR??MS 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KARI???T??KAR?????S 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ?????????????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (mr)", function () {
            expect(p.parse("?????????????????? ??????????????????????????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatikarams patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatikara???s patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatikar??ms patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatikar?????s patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??karams patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??kara???s patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??kar??ms patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??kar?????s patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("??????????????????????????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatikarams 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatikara???s 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatikar??ms 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatikar?????s 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??karams 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??kara???s 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??kar??ms 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??kar?????s 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ??????????????????????????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIKARAMS PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIKARA???S PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIKAR??MS PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIKAR?????S PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??KARAMS PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??KARA???S PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??KAR??MS PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??KAR?????S PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("??????????????????????????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIKARAMS 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIKARA???S 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIKAR??MS 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIKAR?????S 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??KARAMS 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??KARA???S 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??KAR??MS 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??KAR?????S 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (mr)", function () {
            expect(p.parse("?????????????????? ??????????????????????????? ???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ip??iskarams patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ip??iskara???s patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ip??iskar??ms patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ip??iskar?????s patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??????????????????????????? ???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ip??iskarams 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ip??iskara???s 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ip??iskar??ms 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ip??iskar?????s 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ??????????????????????????? ???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("IP??ISKARAMS PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("IP??ISKARA???S PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("IP??ISKAR??MS PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("IP??ISKAR?????S PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??????????????????????????? ???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("IP??ISKARAMS 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("IP??ISKARA???S 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("IP??ISKAR??MS 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("IP??ISKAR?????S 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (mr)", function () {
            expect(p.parse("?????????????????? ??????????????????????????????????????? ???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippaikarams patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippaikara???s patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippaikar??ms patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippaikar?????s patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("??????????????????????????????????????? ???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippaikarams 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippaikara???s 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippaikar??ms 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippaikar?????s 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("??????????????????????????????????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ??????????????????????????????????????? ???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPAIKARAMS PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPAIKARA???S PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPAIKAR??MS PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPAIKAR?????S PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("??????????????????????????????????????? ???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPAIKARAMS 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPAIKARA???S 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPAIKAR??MS 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPAIKAR?????S 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("??????????????????????????????????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (mr)", function () {
            expect(p.parse("?????????????????? ????????????????????????????????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassaikarams patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassaikara???s patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassaikar??ms patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassaikar?????s patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("????????????????????????????????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassaikarams 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassaikara???s 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassaikar??ms 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassaikar?????s 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("????????????????????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ????????????????????????????????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSAIKARAMS PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSAIKARA???S PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSAIKAR??MS PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSAIKAR?????S PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("????????????????????????????????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSAIKARAMS 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSAIKARA???S 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSAIKAR??MS 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSAIKAR?????S 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("????????????????????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (mr)", function () {
            expect(p.parse("?????????????????? ????????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalanikakarams dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalanikakara???s dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalanikakar??ms dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalanikakar?????s dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalanik??karams dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalanik??kara???s dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalanik??kar??ms dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalanik??kar?????s dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalan??kakarams dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalan??kakara???s dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalan??kakar??ms dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalan??kakar?????s dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalan??k??karams dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalan??k??kara???s dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalan??k??kar??ms dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??essalan??k??kar?????s dusre patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("????????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalanikakarams 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalanikakara???s 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalanikakar??ms 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalanikakar?????s 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalanik??karams 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalanik??kara???s 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalanik??kar??ms 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalanik??kar?????s 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalan??kakarams 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalan??kakara???s 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalan??kakar??ms 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalan??kakar?????s 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalan??k??karams 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalan??k??kara???s 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalan??k??kar??ms 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??essalan??k??kar?????s 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ????????????????????????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ????????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALANIKAKARAMS DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALANIKAKARA???S DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALANIKAKAR??MS DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALANIKAKAR?????S DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALANIK??KARAMS DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALANIK??KARA???S DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALANIK??KAR??MS DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALANIK??KAR?????S DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALAN??KAKARAMS DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALAN??KAKARA???S DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALAN??KAKAR??MS DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALAN??KAKAR?????S DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALAN??K??KARAMS DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALAN??K??KARA???S DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALAN??K??KAR??MS DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ESSALAN??K??KAR?????S DUSRE PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("????????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALANIKAKARAMS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALANIKAKARA???S 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALANIKAKAR??MS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALANIKAKAR?????S 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALANIK??KARAMS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALANIK??KARA???S 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALANIK??KAR??MS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALANIK??KAR?????S 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALAN??KAKARAMS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALAN??KAKARA???S 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALAN??KAKAR??MS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALAN??KAKAR?????S 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALAN??K??KARAMS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALAN??K??KARA???S 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALAN??K??KAR??MS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ESSALAN??K??KAR?????S 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ????????????????????????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (mr)", function () {
            expect(p.parse("?????????????????? ????????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalanikakarams pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalanikakara???s pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalanikakar??ms pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalanikakar?????s pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalanik??karams pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalanik??kara???s pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalanik??kar??ms pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalanik??kar?????s pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalan??kakarams pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalan??kakara???s pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalan??kakar??ms pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalan??kakar?????s pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalan??k??karams pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalan??k??kara???s pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalan??k??kar??ms pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??essalan??k??kar?????s pahile patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("????????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalanikakarams 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalanikakara???s 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalanikakar??ms 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalanikakar?????s 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalanik??karams 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalanik??kara???s 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalanik??kar??ms 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalanik??kar?????s 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalan??kakarams 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalan??kakara???s 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalan??kakar??ms 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalan??kakar?????s 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalan??k??karams 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalan??k??kara???s 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalan??k??kar??ms 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??essalan??k??kar?????s 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ????????????????????????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ????????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALANIKAKARAMS PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALANIKAKARA???S PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALANIKAKAR??MS PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALANIKAKAR?????S PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALANIK??KARAMS PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALANIK??KARA???S PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALANIK??KAR??MS PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALANIK??KAR?????S PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALAN??KAKARAMS PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALAN??KAKARA???S PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALAN??KAKAR??MS PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALAN??KAKAR?????S PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALAN??K??KARAMS PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALAN??K??KARA???S PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALAN??K??KAR??MS PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ESSALAN??K??KAR?????S PAHILE PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("????????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALANIKAKARAMS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALANIKAKARA???S 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALANIKAKAR??MS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALANIKAKAR?????S 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALANIK??KARAMS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALANIK??KARA???S 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALANIK??KAR??MS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALANIK??KAR?????S 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALAN??KAKARAMS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALAN??KAKARA???S 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALAN??KAKAR??MS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALAN??KAKAR?????S 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALAN??K??KARAMS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALAN??K??KARA???S 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALAN??K??KAR??MS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ESSALAN??K??KAR?????S 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ????????????????????????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (mr)", function () {
            expect(p.parse("?????????????????? ??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timat??t??ala dusre patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timat??t??al?? dusre patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timat??t????la dusre patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timat??t????l?? dusre patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("t??mat??t??ala dusre patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("t??mat??t??al?? dusre patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("t??mat??t????la dusre patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("t??mat??t????l?? dusre patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timat??t??ala 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timat??t??al?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timat??t????la 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timat??t????l?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 t??mat??t??ala 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 t??mat??t??al?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 t??mat??t????la 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 t??mat??t????l?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMAT??T??ALA DUSRE PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMAT??T??AL?? DUSRE PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMAT??T????LA DUSRE PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMAT??T????L?? DUSRE PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("T??MAT??T??ALA DUSRE PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("T??MAT??T??AL?? DUSRE PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("T??MAT??T????LA DUSRE PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("T??MAT??T????L?? DUSRE PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMAT??T??ALA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMAT??T??AL?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMAT??T????LA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMAT??T????L?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 T??MAT??T??ALA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 T??MAT??T??AL?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 T??MAT??T????LA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 T??MAT??T????L?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (mr)", function () {
            expect(p.parse("?????????????????? ??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timat??t??ala pahile patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timat??t??al?? pahile patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timat??t????la pahile patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timat??t????l?? pahile patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("t??mat??t??ala pahile patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("t??mat??t??al?? pahile patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("t??mat??t????la pahile patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("t??mat??t????l?? pahile patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timat??t??ala 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timat??t??al?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timat??t????la 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timat??t????l?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 t??mat??t??ala 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 t??mat??t??al?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 t??mat??t????la 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 t??mat??t????l?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMAT??T??ALA PAHILE PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMAT??T??AL?? PAHILE PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMAT??T????LA PAHILE PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMAT??T????L?? PAHILE PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("T??MAT??T??ALA PAHILE PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("T??MAT??T??AL?? PAHILE PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("T??MAT??T????LA PAHILE PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("T??MAT??T????L?? PAHILE PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMAT??T??ALA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMAT??T??AL?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMAT??T????LA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMAT??T????L?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 T??MAT??T??ALA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 T??MAT??T??AL?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 T??MAT??T????LA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 T??MAT??T????L?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (mr)", function () {
            expect(p.parse("?????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("titala patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("tital?? patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("tit??la patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("tit??l?? patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tala patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tal?? patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??t??la patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??t??l?? patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("?????????????????? ???????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("titala 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("tital?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("tit??la 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("tit??l?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tala 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tal?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??t??la 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??t??l?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITALA PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITAL?? PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT??LA PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT??L?? PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TALA PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TAL?? PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??T??LA PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??T??L?? PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("?????????????????? ???????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITALA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITAL?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT??LA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT??L?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TALA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TAL?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??T??LA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??T??L?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (mr)", function () {
            expect(p.parse("?????????????????? ?????????????????????????????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonala patra 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonal?? patra 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemon??la patra 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemon??l?? patra 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????????????????????????????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonala 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonal?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemon??la 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemon??l?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????????????????????????????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONALA PATRA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONAL?? PATRA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMON??LA PATRA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMON??L?? PATRA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????????????????????????????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONALA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONAL?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMON??LA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMON??L?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (mr)", function () {
            expect(p.parse("ibri lokams patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibri loka???s patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibri lok??ms patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibri lok?????s patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibr?? lokams patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibr?? loka???s patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibr?? lok??ms patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibr?? lok?????s patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibri lokams 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibri loka???s 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibri lok??ms 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibri lok?????s 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibr?? lokams 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibr?? loka???s 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibr?? lok??ms 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ibr?? lok?????s 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IBRI LOKAMS PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBRI LOKA???S PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBRI LOK??MS PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBRI LOK?????S PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBR?? LOKAMS PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBR?? LOKA???S PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBR?? LOK??MS PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBR?? LOK?????S PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBRI LOKAMS 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBRI LOKA???S 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBRI LOK??MS 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBRI LOK?????S 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBR?? LOKAMS 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBR?? LOKA???S 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBR?? LOK??MS 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("IBR?? LOK?????S 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (mr)", function () {
            expect(p.parse("yakobacem patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("yakobace??? patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("yakob??cem patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("yakob??ce??? patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??kobacem patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??kobace??? patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??kob??cem patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??kob??ce??? patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????????????????? ???????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("yakobacem 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("yakobace??? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("yakob??cem 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("yakob??ce??? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??kobacem 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??kobace??? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??kob??cem 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??kob??ce??? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAKOBACEM PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("YAKOBACE??? PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("YAKOB??CEM PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("YAKOB??CE??? PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??KOBACEM PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??KOBACE??? PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??KOB??CEM PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??KOB??CE??? PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????????????????? ???????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("YAKOBACEM 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("YAKOBACE??? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("YAKOB??CEM 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("YAKOB??CE??? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??KOBACEM 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??KOBACE??? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??KOB??CEM 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??KOB??CE??? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (mr)", function () {
            expect(p.parse("petracem dusre patra 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("petrace??? dusre patra 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("petr??cem dusre patra 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("petr??ce??? dusre patra 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 petracem 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 petrace??? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 petr??cem 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 petr??ce??? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ??????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PETRACEM DUSRE PATRA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("PETRACE??? DUSRE PATRA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("PETR??CEM DUSRE PATRA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("PETR??CE??? DUSRE PATRA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETRACEM 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETRACE??? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETR??CEM 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETR??CE??? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ??????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (mr)", function () {
            expect(p.parse("petracem pahile patra 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("petrace??? pahile patra 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("petr??cem pahile patra 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("petr??ce??? pahile patra 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("???????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 petracem 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 petrace??? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 petr??cem 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 petr??ce??? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ??????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PETRACEM PAHILE PATRA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PETRACE??? PAHILE PATRA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PETR??CEM PAHILE PATRA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PETR??CE??? PAHILE PATRA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("???????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETRACEM 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETRACE??? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETR??CEM 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETR??CE??? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ??????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (mr)", function () {
            expect(p.parse("yahudacem patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yahudace??? patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yahud??cem patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yahud??ce??? patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??dacem patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??dace??? patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??d??cem patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??d??ce??? patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("???????????????????????? ???????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yahudacem 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yahudace??? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yahud??cem 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yahud??ce??? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??dacem 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??dace??? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??d??cem 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??d??ce??? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAHUDACEM PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAHUDACE??? PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAHUD??CEM PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAHUD??CE??? PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??DACEM PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??DACE??? PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??D??CEM PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??D??CE??? PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("???????????????????????? ???????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAHUDACEM 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAHUDACE??? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAHUD??CEM 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAHUD??CE??? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??DACEM 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??DACE??? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??D??CEM 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??D??CE??? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (mr)", function () {
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (mr)", function () {
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (mr)", function () {
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (mr)", function () {
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (mr)", function () {
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (mr)", function () {
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (mr)", function () {
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (mr)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (mr)", function () {
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
            return expect(p.languages).toEqual(["mr"]);
        });
        it("should handle ranges (mr)", function () {
            expect(p.parse("Titus 1:1 to 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1to2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 TO 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (mr)", function () {
            expect(p.parse("Titus 1:1, chapter 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 CHAPTER 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (mr)", function () {
            expect(p.parse("Exod 1:1 verse 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm VERSE 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (mr)", function () {
            expect(p.parse("Exod 1:1 and 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 AND 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (mr)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (mr)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (mr)", function () {
            expect(p.parse("Lev 1 (ERV)").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
            return expect(p.parse("lev 1 erv").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
        });
        return it("should handle boundaries (mr)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=mr.spec.js.map