"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/ne_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (ne)", function () {
            expect(p.parse("?????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("utpattiko pustak 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("utpattiko 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("UTPATTIKO PUSTAK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("UTPATTIKO 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (ne)", function () {
            expect(p.parse("prast??anko pustak 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("prast????nko pustak 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("?????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("prast??anko 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("prast????nko 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRAST??ANKO PUSTAK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("PRAST????NKO PUSTAK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("?????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("PRAST??ANKO 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("PRAST????NKO 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (ne)", function () {
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (ne)", function () {
            expect(p.parse("leviharuko pustak 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("levihar??ko pustak 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("lev??haruko pustak 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("lev??har??ko pustak 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??????????????????????????? ?????????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("leviharuko 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("levihar??ko 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("lev??haruko 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("lev??har??ko 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LEVIHARUKO PUSTAK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVIHAR??KO PUSTAK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV??HARUKO PUSTAK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV??HAR??KO PUSTAK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??????????????????????????? ?????????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVIHARUKO 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVIHAR??KO 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV??HARUKO 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV??HAR??KO 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (ne)", function () {
            expect(p.parse("gantiko pustak 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("gant??ko pustak 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("gantiko 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("gant??ko 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GANTIKO PUSTAK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("GANT??KO PUSTAK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("GANTIKO 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("GANT??KO 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (ne)", function () {
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (ne)", function () {
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (ne)", function () {
            expect(p.parse("yarmiyako vilap 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("yarmiyako vil??p 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("yarmiy??ko vilap 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("yarmiy??ko vil??p 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("??????????????????????????? ??????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YARMIYAKO VILAP 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("YARMIYAKO VIL??P 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("YARMIY??KO VILAP 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("YARMIY??KO VIL??P 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("??????????????????????????? ??????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (ne)", function () {
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (ne)", function () {
            expect(p.parse("yuhannalai b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannalai b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannalai b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannalai b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannala?? b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannala?? b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannala?? b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannala?? b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannal??i b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannal??i b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannal??i b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannal??i b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannal???? b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannal???? b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannal???? b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhannal???? b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??lai b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??lai b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??lai b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??lai b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??la?? b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??la?? b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??la?? b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??la?? b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??l??i b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??l??i b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??l??i b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??l??i b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??l???? b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??l???? b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??l???? b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("yuhann??l???? b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannalai b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannalai b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannalai b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannalai b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannala?? b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannala?? b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannala?? b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannala?? b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannal??i b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannal??i b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannal??i b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannal??i b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannal???? b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannal???? b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannal???? b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hannal???? b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??lai b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??lai b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??lai b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??lai b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??la?? b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??la?? b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??la?? b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??la?? b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??l??i b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??l??i b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??l??i b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??l??i b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??l???? b??aeko prakas 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??l???? b??aeko praka?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??l???? b??aeko prak??s 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("y??hann??l???? b??aeko prak???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????????????????????????????? ???????????? ?????????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YUHANNALAI B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNALAI B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNALAI B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNALAI B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNALA?? B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNALA?? B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNALA?? B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNALA?? B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNAL??I B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNAL??I B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNAL??I B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNAL??I B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNAL???? B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNAL???? B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNAL???? B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANNAL???? B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??LAI B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??LAI B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??LAI B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??LAI B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??LA?? B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??LA?? B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??LA?? B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??LA?? B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??L??I B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??L??I B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??L??I B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??L??I B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??L???? B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??L???? B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??L???? B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("YUHANN??L???? B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNALAI B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNALAI B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNALAI B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNALAI B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNALA?? B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNALA?? B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNALA?? B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNALA?? B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNAL??I B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNAL??I B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNAL??I B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNAL??I B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNAL???? B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNAL???? B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNAL???? B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANNAL???? B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??LAI B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??LAI B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??LAI B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??LAI B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??LA?? B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??LA?? B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??LA?? B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??LA?? B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??L??I B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??L??I B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??L??I B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??L??I B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??L???? B??AEKO PRAKAS 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??L???? B??AEKO PRAKA?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??L???? B??AEKO PRAK??S 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Y??HANN??L???? B??AEKO PRAK???? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????????????????????????????? ???????????? ?????????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (ne)", function () {
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (ne)", function () {
            expect(p.parse("vyavast??ako pustak 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("vyavast????ko pustak 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("vyavast??ako 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("vyavast????ko 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("VYAVAST??AKO PUSTAK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("VYAVAST????KO PUSTAK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("VYAVAST??AKO 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("VYAVAST????KO 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (ne)", function () {
            expect(p.parse("yahosuko pustak 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("yahos??ko pustak 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("yaho??uko pustak 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("yaho????ko pustak 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("yahosuko 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("yahos??ko 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("yaho??uko 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("yaho????ko 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAHOSUKO PUSTAK 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("YAHOS??KO PUSTAK 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("YAHO??UKO PUSTAK 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("YAHO????KO PUSTAK 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("YAHOSUKO 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("YAHOS??KO 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("YAHO??UKO 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("YAHO????KO 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (ne)", function () {
            expect(p.parse("nyayakarttaharuko pustak 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("nyayakarttahar??ko pustak 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("nyayakartt??haruko pustak 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("nyayakartt??har??ko pustak 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("ny??yakarttaharuko pustak 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("ny??yakarttahar??ko pustak 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("ny??yakartt??haruko pustak 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("ny??yakartt??har??ko pustak 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("??????????????????????????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("????????????????????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("nyayakarttaharuko 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("nyayakarttahar??ko 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("nyayakartt??haruko 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("nyayakartt??har??ko 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("ny??yakarttaharuko 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("ny??yakarttahar??ko 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("ny??yakartt??haruko 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("ny??yakartt??har??ko 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("??????????????????????????????????????????????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NYAYAKARTTAHARUKO PUSTAK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NYAYAKARTTAHAR??KO PUSTAK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NYAYAKARTT??HARUKO PUSTAK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NYAYAKARTT??HAR??KO PUSTAK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NY??YAKARTTAHARUKO PUSTAK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NY??YAKARTTAHAR??KO PUSTAK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NY??YAKARTT??HARUKO PUSTAK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NY??YAKARTT??HAR??KO PUSTAK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("??????????????????????????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("????????????????????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NYAYAKARTTAHARUKO 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NYAYAKARTTAHAR??KO 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NYAYAKARTT??HARUKO 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NYAYAKARTT??HAR??KO 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NY??YAKARTTAHARUKO 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NY??YAKARTTAHAR??KO 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NY??YAKARTT??HARUKO 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("NY??YAKARTT??HAR??KO 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("??????????????????????????????????????????????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (ne)", function () {
            expect(p.parse("rut??ko pustak 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("r??t??ko pustak 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("rut??ko 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("r??t??ko 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUT??KO PUSTAK 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("R??T??KO PUSTAK 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("??????????????? ?????????????????? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT??KO 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("R??T??KO 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (ne)", function () {
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (ne)", function () {
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (ne)", function () {
            expect(p.parse("yas??iyako pustak 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("yas??iy??ko pustak 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ya????iyako pustak 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ya????iy??ko pustak 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("yas??iyako 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("yas??iy??ko 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ya????iyako 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ya????iy??ko 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAS??IYAKO PUSTAK 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("YAS??IY??KO PUSTAK 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("YA????IYAKO PUSTAK 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("YA????IY??KO PUSTAK 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("YAS??IYAKO 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("YAS??IY??KO 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("YA????IYAKO 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("YA????IY??KO 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (ne)", function () {
            expect(p.parse("????????????????????? ?????????????????? ?????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. samuelko 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. sam??elko 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. ??amuelko 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. ??am??elko 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 samuelko 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 sam??elko 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ??amuelko 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ??am??elko 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. ????????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ????????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. ?????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. ??????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ??????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????? ?????????????????? ?????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUELKO 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAM??ELKO 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. ??AMUELKO 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. ??AM??ELKO 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUELKO 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM??ELKO 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ??AMUELKO 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ??AM??ELKO 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. ????????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ????????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. ?????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. ??????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 ??????????????? 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (ne)", function () {
            expect(p.parse("????????????????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("samuelko pustak 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("sam??elko pustak 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("??amuelko pustak 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("??am??elko pustak 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. samuelko 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. sam??elko 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. ??amuelko 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. ??am??elko 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 samuelko 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 sam??elko 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ??amuelko 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ??am??elko 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. ????????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ????????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. ?????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. ??????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ??????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("SAMUELKO PUSTAK 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("SAM??ELKO PUSTAK 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("??AMUELKO PUSTAK 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("??AM??ELKO PUSTAK 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUELKO 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAM??ELKO 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. ??AMUELKO 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. ??AM??ELKO 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUELKO 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM??ELKO 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ??AMUELKO 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ??AM??ELKO 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. ????????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ????????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. ?????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. ??????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 ??????????????? 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (ne)", function () {
            expect(p.parse("??????????????????????????? ?????????????????? ?????????????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ra??aharuko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ra??ahar??ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ra????haruko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ra????har??ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. r????aharuko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. r????ahar??ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. r??????haruko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. r??????har??ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ra??aharuko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ra??ahar??ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ra????haruko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ra????har??ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 r????aharuko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 r????ahar??ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 r??????haruko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 r??????har??ko 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??????????????????????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????????????????? ?????????????????? ?????????????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. RA??AHARUKO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. RA??AHAR??KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. RA????HARUKO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. RA????HAR??KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. R????AHARUKO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. R????AHAR??KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. R??????HARUKO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. R??????HAR??KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 RA??AHARUKO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 RA??AHAR??KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 RA????HARUKO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 RA????HAR??KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 R????AHARUKO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 R????AHAR??KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 R??????HARUKO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 R??????HAR??KO 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??????????????????????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ???????????? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (ne)", function () {
            expect(p.parse("???????????????????????? ???????????? ?????????????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ra??aharuko pustak 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ra??ahar??ko pustak 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ra????haruko pustak 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("ra????har??ko pustak 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("r????aharuko pustak 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("r????ahar??ko pustak 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("r??????haruko pustak 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("r??????har??ko pustak 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ra??aharuko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ra??ahar??ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ra????haruko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ra????har??ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. r????aharuko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. r????ahar??ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. r??????haruko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. r??????har??ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ra??aharuko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ra??ahar??ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ra????haruko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ra????har??ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 r????aharuko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 r????ahar??ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 r??????haruko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 r??????har??ko 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??????????????????????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? ???????????? ?????????????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("RA??AHARUKO PUSTAK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("RA??AHAR??KO PUSTAK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("RA????HARUKO PUSTAK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("RA????HAR??KO PUSTAK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("R????AHARUKO PUSTAK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("R????AHAR??KO PUSTAK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("R??????HARUKO PUSTAK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("R??????HAR??KO PUSTAK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. RA??AHARUKO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. RA??AHAR??KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. RA????HARUKO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. RA????HAR??KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. R????AHARUKO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. R????AHAR??KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. R??????HARUKO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. R??????HAR??KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 RA??AHARUKO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 RA??AHAR??KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 RA????HARUKO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 RA????HAR??KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 R????AHARUKO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 R????AHAR??KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 R??????HARUKO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 R??????HAR??KO 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??????????????????????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ???????????? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (ne)", function () {
            expect(p.parse("???????????????????????? ?????????????????? ?????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. itihasko 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. itih??sko 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ???????????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 itihasko 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 itih??sko 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ???????????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ?????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? ?????????????????? ?????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ITIHASKO 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ITIH??SKO 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ???????????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ITIHASKO 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ITIH??SKO 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ???????????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. ?????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (ne)", function () {
            expect(p.parse("???????????????????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("itihasko pustak 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("itih??sko pustak 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. itihasko 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. itih??sko 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ???????????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 itihasko 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 itih??sko 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ???????????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ?????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? ??????????????? ?????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ITIHASKO PUSTAK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("ITIH??SKO PUSTAK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ITIHASKO 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ITIH??SKO 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ???????????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ITIHASKO 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ITIH??SKO 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ???????????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. ?????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (ne)", function () {
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("e??rako 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("e??r??ko 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("E??RAKO 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("E??R??KO 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (ne)", function () {
            expect(p.parse("nahemyahko pustak 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("nahemy??hko pustak 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("?????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("nahemyahko 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("nahemy??hko 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHEMYAHKO PUSTAK 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NAHEMY??HKO PUSTAK 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("?????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NAHEMYAHKO 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NAHEMY??HKO 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (ne)", function () {
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (ne)", function () {
            expect(p.parse("estarko pustak 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("estarko 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESTARKO PUSTAK 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTARKO 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (ne)", function () {
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("ayyubko pustak 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("ayy??bko pustak 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("ayyubko 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("ayy??bko 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("AYYUBKO PUSTAK 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("AYY??BKO PUSTAK 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("AYYUBKO 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("AYY??BKO 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (ne)", function () {
            expect(p.parse("b??a??ansamgrah 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("b??a??ansa???grah 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("B??A??ANSAMGRAH 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("B??A??ANSA???GRAH 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("????????? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (ne)", function () {
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (ne)", function () {
            expect(p.parse("hitopadesko pustak 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("hitopade??ko pustak 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("hitopadesko 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("hitopade??ko 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HITOPADESKO PUSTAK 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("HITOPADE??KO PUSTAK 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("HITOPADESKO 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("HITOPADE??KO 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (ne)", function () {
            expect(p.parse("upadesakko pustak 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("upade??akko pustak 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("upadesakko 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("upade??akko 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("UPADESAKKO PUSTAK 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("UPADE??AKKO PUSTAK 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("UPADESAKKO 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("UPADE??AKKO 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (ne)", function () {
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (ne)", function () {
            expect(p.parse("sulemanko srest??agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko srest??ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko sres?????agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko sres?????ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko sre???t??agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko sre???t??ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko sre????????agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko sre????????ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko ??rest??agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko ??rest??ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko ??res?????agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko ??res?????ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko ??re???t??agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko ??re???t??ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko ??re????????agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulemanko ??re????????ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko srest??agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko srest??ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko sres?????agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko sres?????ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko sre???t??agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko sre???t??ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko sre????????agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko sre????????ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko ??rest??agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko ??rest??ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko ??res?????agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko ??res?????ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko ??re???t??agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko ??re???t??ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko ??re????????agit 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("sulem??nko ??re????????ag??t 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("??????????????????????????? ?????????????????????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SULEMANKO SREST??AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO SREST??AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO SRES?????AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO SRES?????AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO SRE???T??AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO SRE???T??AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO SRE????????AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO SRE????????AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO ??REST??AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO ??REST??AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO ??RES?????AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO ??RES?????AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO ??RE???T??AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO ??RE???T??AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO ??RE????????AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEMANKO ??RE????????AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO SREST??AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO SREST??AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO SRES?????AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO SRES?????AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO SRE???T??AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO SRE???T??AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO SRE????????AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO SRE????????AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO ??REST??AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO ??REST??AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO ??RES?????AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO ??RES?????AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO ??RE???T??AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO ??RE???T??AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO ??RE????????AGIT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SULEM??NKO ??RE????????AG??T 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("??????????????????????????? ?????????????????????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (ne)", function () {
            expect(p.parse("yarmiyako pustak 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("yarmiy??ko pustak 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("??????????????????????????? ?????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("yarmiyako 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("yarmiy??ko 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YARMIYAKO PUSTAK 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("YARMIY??KO PUSTAK 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("??????????????????????????? ?????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("YARMIYAKO 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("YARMIY??KO 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (ne)", function () {
            expect(p.parse("i??akielko pustak 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("i??akielko 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("I??AKIELKO PUSTAK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("I??AKIELKO 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (ne)", function () {
            expect(p.parse("daniyalko pustak 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("d??niyalko pustak 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("daniyalko 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("d??niyalko 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DANIYALKO PUSTAK 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("D??NIYALKO PUSTAK 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DANIYALKO 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("D??NIYALKO 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (ne)", function () {
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("hose 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("ho??e 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOSE 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HO??E 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (ne)", function () {
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("yoel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("YOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (ne)", function () {
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??mos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??MOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (ne)", function () {
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("obadiya 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("obadiy?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADIYA 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADIY?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (ne)", function () {
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("yona 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("yon?? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("YONA 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("YON?? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (ne)", function () {
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("mika 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("mik?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("m??ka 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("m??k?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIKA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIK?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("M??KA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("M??K?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (ne)", function () {
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("nah??m 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????? ?????????????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH??M 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (ne)", function () {
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("habakuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("habak??k 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HABAKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HABAK??K 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (ne)", function () {
            expect(p.parse("??????????????????????????? ?????????????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("sapanyah 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("sapany??h 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????????????????? ?????????????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SAPANYAH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SAPANY??H 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (ne)", function () {
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("hagg??i 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("h??gg??i 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGG??I 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("H??GG??I 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (ne)", function () {
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("jakariya 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("jakariy?? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? ?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("JAKARIYA 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("JAKARIY?? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (ne)", function () {
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("malaki 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("malak?? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("mal??ki 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("mal??k?? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????? ?????????????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALAKI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALAK?? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL??KI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL??K?? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (ne)", function () {
            expect(p.parse("mattile lek??eko susmacar 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattile lek??eko susmac??r 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattile lek??eko susm??car 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattile lek??eko susm??c??r 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("matt??le lek??eko susmacar 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("matt??le lek??eko susmac??r 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("matt??le lek??eko susm??car 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("matt??le lek??eko susm??c??r 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("????????????????????? ?????????????????? ???????????????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("????????????????????? ???????????????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("mattile 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("matt??le 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MATTILE LEK??EKO SUSMACAR 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTILE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTILE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTILE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT??LE LEK??EKO SUSMACAR 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT??LE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT??LE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT??LE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("????????????????????? ?????????????????? ???????????????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("????????????????????? ???????????????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATTILE 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT??LE 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (ne)", function () {
            expect(p.parse("markusle lek??eko susmacar 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("markusle lek??eko susmac??r 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("markusle lek??eko susm??car 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("markusle lek??eko susm??c??r 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("mark??sle lek??eko susmacar 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("mark??sle lek??eko susmac??r 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("mark??sle lek??eko susm??car 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("mark??sle lek??eko susm??c??r 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????????????????? ?????????????????? ???????????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????????????????? ???????????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("markusle 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("mark??sle 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MARKUSLE LEK??EKO SUSMACAR 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKUSLE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKUSLE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKUSLE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??SLE LEK??EKO SUSMACAR 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??SLE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??SLE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??SLE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????????????????? ?????????????????? ???????????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????????????????? ???????????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKUSLE 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??SLE 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (ne)", function () {
            expect(p.parse("lukale lek??eko susmacar 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("lukale lek??eko susmac??r 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("lukale lek??eko susm??car 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("lukale lek??eko susm??c??r 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("luk??le lek??eko susmacar 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("luk??le lek??eko susmac??r 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("luk??le lek??eko susm??car 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("luk??le lek??eko susm??c??r 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??kale lek??eko susmacar 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??kale lek??eko susmac??r 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??kale lek??eko susm??car 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??kale lek??eko susm??c??r 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k??le lek??eko susmacar 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k??le lek??eko susmac??r 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k??le lek??eko susm??car 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k??le lek??eko susm??c??r 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????????????????? ?????????????????? ???????????????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????????????????? ???????????????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("lukale 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("luk??le 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??kale 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("l??k??le 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LUKALE LEK??EKO SUSMACAR 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKALE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKALE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKALE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??LE LEK??EKO SUSMACAR 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??LE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??LE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??LE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KALE LEK??EKO SUSMACAR 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KALE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KALE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KALE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K??LE LEK??EKO SUSMACAR 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K??LE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K??LE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K??LE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????????????????? ?????????????????? ???????????????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????????????????? ???????????????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKALE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??LE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KALE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K??LE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (ne)", function () {
            expect(p.parse("yuhannako pahilo patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("yuhann??ko pahilo patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("y??hannako pahilo patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("y??hann??ko pahilo patra 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. yuhannako 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. yuhann??ko 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. y??hannako 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. y??hann??ko 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. ??????????????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 yuhannako 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 yuhann??ko 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 y??hannako 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 y??hann??ko 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. ????????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ????????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YUHANNAKO PAHILO PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("YUHANN??KO PAHILO PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Y??HANNAKO PAHILO PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Y??HANN??KO PAHILO PATRA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. YUHANNAKO 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. YUHANN??KO 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Y??HANNAKO 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Y??HANN??KO 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. ??????????????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 YUHANNAKO 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 YUHANN??KO 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Y??HANNAKO 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Y??HANN??KO 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. ????????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 ????????????????????? 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (ne)", function () {
            expect(p.parse("??????????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("yuhannako dostro patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("yuhann??ko dostro patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("y??hannako dostro patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("y??hann??ko dostro patra 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("??????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. yuhannako 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. yuhann??ko 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. y??hannako 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. y??hann??ko 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. ??????????????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 yuhannako 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 yuhann??ko 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 y??hannako 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 y??hann??ko 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. ????????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ????????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("YUHANNAKO DOSTRO PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("YUHANN??KO DOSTRO PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Y??HANNAKO DOSTRO PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Y??HANN??KO DOSTRO PATRA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("??????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. YUHANNAKO 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. YUHANN??KO 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Y??HANNAKO 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Y??HANN??KO 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. ??????????????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 YUHANNAKO 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 YUHANN??KO 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Y??HANNAKO 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Y??HANN??KO 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. ????????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 ????????????????????? 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (ne)", function () {
            expect(p.parse("??????????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("yuhannako testro patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("yuhann??ko testro patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("y??hannako testro patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("y??hann??ko testro patra 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. yuhannako 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. yuhann??ko 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. y??hannako 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. y??hann??ko 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. ??????????????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 yuhannako 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 yuhann??ko 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 y??hannako 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 y??hann??ko 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ??????????????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. ????????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ????????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("YUHANNAKO TESTRO PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("YUHANN??KO TESTRO PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Y??HANNAKO TESTRO PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Y??HANN??KO TESTRO PATRA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. YUHANNAKO 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. YUHANN??KO 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Y??HANNAKO 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Y??HANN??KO 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. ??????????????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 YUHANNAKO 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 YUHANN??KO 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Y??HANNAKO 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Y??HANN??KO 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ??????????????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. ????????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 ????????????????????? 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (ne)", function () {
            expect(p.parse("yuhannale lek??eko susmacar 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yuhannale lek??eko susmac??r 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yuhannale lek??eko susm??car 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yuhannale lek??eko susm??c??r 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yuhann??le lek??eko susmacar 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yuhann??le lek??eko susmac??r 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yuhann??le lek??eko susm??car 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yuhann??le lek??eko susm??c??r 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??hannale lek??eko susmacar 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??hannale lek??eko susmac??r 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??hannale lek??eko susm??car 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??hannale lek??eko susm??c??r 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??hann??le lek??eko susmacar 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??hann??le lek??eko susmac??r 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??hann??le lek??eko susm??car 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??hann??le lek??eko susm??c??r 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????????????????? ?????????????????? ???????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????????????????? ???????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yuhannale 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("yuhann??le 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??hannale 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("y??hann??le 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YUHANNALE LEK??EKO SUSMACAR 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YUHANNALE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YUHANNALE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YUHANNALE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YUHANN??LE LEK??EKO SUSMACAR 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YUHANN??LE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YUHANN??LE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YUHANN??LE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??HANNALE LEK??EKO SUSMACAR 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??HANNALE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??HANNALE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??HANNALE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??HANN??LE LEK??EKO SUSMACAR 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??HANN??LE LEK??EKO SUSMAC??R 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??HANN??LE LEK??EKO SUSM??CAR 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??HANN??LE LEK??EKO SUSM??C??R 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????????????????? ?????????????????? ???????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????????????????? ???????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YUHANNALE 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("YUHANN??LE 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??HANNALE 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Y??HANN??LE 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (ne)", function () {
            expect(p.parse("preritharuka kam 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("preritharuka k??m 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("preritharuk?? kam 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("preritharuk?? k??m 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("prerithar??ka kam 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("prerithar??ka k??m 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("prerithar??k?? kam 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("prerithar??k?? k??m 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("???????????????????????????????????? ????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRERITHARUKA KAM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRERITHARUKA K??M 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRERITHARUK?? KAM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRERITHARUK?? K??M 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRERITHAR??KA KAM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRERITHAR??KA K??M 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRERITHAR??K?? KAM 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("PRERITHAR??K?? K??M 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("???????????????????????????????????? ????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (ne)", function () {
            expect(p.parse("?????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romiharulai patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romiharula?? patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romiharul??i patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romiharul???? patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romihar??lai patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romihar??la?? patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romihar??l??i patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romihar??l???? patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??harulai patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??harula?? patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??harul??i patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??harul???? patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??har??lai patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??har??la?? patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??har??l??i patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??har??l???? patra 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????????????????????? ???????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romiharulai 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romiharula?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romiharul??i 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romiharul???? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romihar??lai 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romihar??la?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romihar??l??i 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("romihar??l???? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??harulai 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??harula?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??harul??i 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??harul???? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??har??lai 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??har??la?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??har??l??i 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("rom??har??l???? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHARULAI PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHARULA?? PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHARUL??I PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHARUL???? PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHAR??LAI PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHAR??LA?? PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHAR??L??I PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHAR??L???? PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HARULAI PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HARULA?? PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HARUL??I PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HARUL???? PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HAR??LAI PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HAR??LA?? PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HAR??L??I PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HAR??L???? PATRA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????????????????????? ???????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHARULAI 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHARULA?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHARUL??I 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHARUL???? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHAR??LAI 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHAR??LA?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHAR??L??I 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMIHAR??L???? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HARULAI 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HARULA?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HARUL??I 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HARUL???? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HAR??LAI 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HAR??LA?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HAR??L??I 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM??HAR??L???? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (ne)", function () {
            expect(p.parse("?????????????????????????????????????????? ?????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint??iharulai dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint??iharula?? dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint??iharul??i dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint??iharul???? dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint??ihar??lai dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint??ihar??la?? dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint??ihar??l??i dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint??ihar??l???? dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint????harulai dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint????harula?? dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint????harul??i dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint????harul???? dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint????har??lai dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint????har??la?? dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint????har??l??i dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("korint????har??l???? dostro patra 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????????????????????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint??iharulai 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint??iharula?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint??iharul??i 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint??iharul???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint??ihar??lai 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint??ihar??la?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint??ihar??l??i 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint??ihar??l???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint????harulai 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint????harula?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint????harul??i 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint????harul???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint????har??lai 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint????har??la?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint????har??l??i 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. korint????har??l???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint??iharulai 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint??iharula?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint??iharul??i 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint??iharul???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint??ihar??lai 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint??ihar??la?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint??ihar??l??i 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint??ihar??l???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint????harulai 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint????harula?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint????harul??i 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint????harul???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint????har??lai 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint????har??la?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint????har??l??i 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 korint????har??l???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. ?????????????????????????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ?????????????????????????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. ???????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ???????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????????????????????????????? ?????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT??IHARULAI DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT??IHARULA?? DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT??IHARUL??I DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT??IHARUL???? DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT??IHAR??LAI DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT??IHAR??LA?? DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT??IHAR??L??I DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT??IHAR??L???? DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT????HARULAI DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT????HARULA?? DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT????HARUL??I DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT????HARUL???? DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT????HAR??LAI DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT????HAR??LA?? DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT????HAR??L??I DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("KORINT????HAR??L???? DOSTRO PATRA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("?????????????????????????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT??IHARULAI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT??IHARULA?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT??IHARUL??I 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT??IHARUL???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT??IHAR??LAI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT??IHAR??LA?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT??IHAR??L??I 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT??IHAR??L???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT????HARULAI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT????HARULA?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT????HARUL??I 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT????HARUL???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT????HAR??LAI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT????HAR??LA?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT????HAR??L??I 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINT????HAR??L???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT??IHARULAI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT??IHARULA?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT??IHARUL??I 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT??IHARUL???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT??IHAR??LAI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT??IHAR??LA?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT??IHAR??L??I 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT??IHAR??L???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT????HARULAI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT????HARULA?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT????HARUL??I 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT????HARUL???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT????HAR??LAI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT????HAR??LA?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT????HAR??L??I 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINT????HAR??L???? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. ?????????????????????????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ?????????????????????????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. ???????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 ???????????????????????? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (ne)", function () {
            expect(p.parse("?????????????????????????????????????????? ?????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint??iharulai pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint??iharula?? pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint??iharul??i pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint??iharul???? pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint??ihar??lai pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint??ihar??la?? pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint??ihar??l??i pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint??ihar??l???? pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint????harulai pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint????harula?? pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint????harul??i pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint????harul???? pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint????har??lai pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint????har??la?? pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint????har??l??i pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("korint????har??l???? pahilo patra 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint??iharulai 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint??iharula?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint??iharul??i 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint??iharul???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint??ihar??lai 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint??ihar??la?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint??ihar??l??i 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint??ihar??l???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint????harulai 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint????harula?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint????harul??i 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint????harul???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint????har??lai 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint????har??la?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint????har??l??i 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. korint????har??l???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint??iharulai 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint??iharula?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint??iharul??i 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint??iharul???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint??ihar??lai 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint??ihar??la?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint??ihar??l??i 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint??ihar??l???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint????harulai 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint????harula?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint????harul??i 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint????harul???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint????har??lai 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint????har??la?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint????har??l??i 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 korint????har??l???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. ?????????????????????????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ?????????????????????????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. ???????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ???????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????????????????????????????? ?????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT??IHARULAI PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT??IHARULA?? PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT??IHARUL??I PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT??IHARUL???? PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT??IHAR??LAI PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT??IHAR??LA?? PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT??IHAR??L??I PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT??IHAR??L???? PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT????HARULAI PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT????HARULA?? PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT????HARUL??I PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT????HARUL???? PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT????HAR??LAI PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT????HAR??LA?? PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT????HAR??L??I PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("KORINT????HAR??L???? PAHILO PATRA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("?????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT??IHARULAI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT??IHARULA?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT??IHARUL??I 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT??IHARUL???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT??IHAR??LAI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT??IHAR??LA?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT??IHAR??L??I 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT??IHAR??L???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT????HARULAI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT????HARULA?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT????HARUL??I 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT????HARUL???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT????HAR??LAI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT????HAR??LA?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT????HAR??L??I 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINT????HAR??L???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT??IHARULAI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT??IHARULA?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT??IHARUL??I 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT??IHARUL???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT??IHAR??LAI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT??IHAR??LA?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT??IHAR??L??I 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT??IHAR??L???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT????HARULAI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT????HARULA?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT????HARUL??I 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT????HARUL???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT????HAR??LAI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT????HAR??LA?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT????HAR??L??I 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINT????HAR??L???? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. ?????????????????????????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ?????????????????????????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. ???????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 ???????????????????????? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (ne)", function () {
            expect(p.parse("????????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatiharulai patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatiharula?? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatiharul??i patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatiharul???? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatihar??lai patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatihar??la?? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatihar??l??i patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatihar??l???? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??harulai patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??harula?? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??harul??i patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??harul???? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??har??lai patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??har??la?? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??har??l??i patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??har??l???? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tiharulai patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tiharula?? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tiharul??i patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tiharul???? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tihar??lai patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tihar??la?? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tihar??l??i patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tihar??l???? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??harulai patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??harula?? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??harul??i patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??harul???? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??har??lai patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??har??la?? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??har??l??i patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??har??l???? patra 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("????????????????????????????????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatiharulai 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatiharula?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatiharul??i 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatiharul???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatihar??lai 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatihar??la?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatihar??l??i 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galatihar??l???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??harulai 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??harula?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??harul??i 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??harul???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??har??lai 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??har??la?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??har??l??i 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("galat??har??l???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tiharulai 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tiharula?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tiharul??i 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tiharul???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tihar??lai 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tihar??la?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tihar??l??i 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??tihar??l???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??harulai 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??harula?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??harul??i 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??harul???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??har??lai 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??har??la?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??har??l??i 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("gal??t??har??l???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("????????????????????????????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHARULAI PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHARULA?? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHARUL??I PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHARUL???? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHAR??LAI PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHAR??LA?? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHAR??L??I PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHAR??L???? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HARULAI PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HARULA?? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HARUL??I PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HARUL???? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HAR??LAI PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HAR??LA?? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HAR??L??I PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HAR??L???? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHARULAI PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHARULA?? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHARUL??I PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHARUL???? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHAR??LAI PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHAR??LA?? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHAR??L??I PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHAR??L???? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HARULAI PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HARULA?? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HARUL??I PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HARUL???? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HAR??LAI PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HAR??LA?? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HAR??L??I PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HAR??L???? PATRA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("????????????????????????????????? ???????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHARULAI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHARULA?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHARUL??I 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHARUL???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHAR??LAI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHAR??LA?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHAR??L??I 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATIHAR??L???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HARULAI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HARULA?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HARUL??I 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HARUL???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HAR??LAI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HAR??LA?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HAR??L??I 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALAT??HAR??L???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHARULAI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHARULA?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHARUL??I 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHARUL???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHAR??LAI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHAR??LA?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHAR??L??I 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??TIHAR??L???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HARULAI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HARULA?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HARUL??I 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HARUL???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HAR??LAI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HAR??LA?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HAR??L??I 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T??HAR??L???? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("????????????????????????????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (ne)", function () {
            expect(p.parse("????????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isiharulai patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isiharula?? patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isiharul??i patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isiharul???? patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isihar??lai patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isihar??la?? patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isihar??l??i patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isihar??l???? patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??harulai patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??harula?? patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??harul??i patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??harul???? patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??har??lai patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??har??la?? patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??har??l??i patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??har??l???? patra 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("????????????????????????????????? ???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isiharulai 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isiharula?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isiharul??i 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isiharul???? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isihar??lai 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isihar??la?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isihar??l??i 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??isihar??l???? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??harulai 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??harula?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??harul??i 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??harul???? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??har??lai 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??har??la?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??har??l??i 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("ep??is??har??l???? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("????????????????????????????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHARULAI PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHARULA?? PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHARUL??I PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHARUL???? PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHAR??LAI PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHAR??LA?? PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHAR??L??I PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHAR??L???? PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HARULAI PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HARULA?? PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HARUL??I PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HARUL???? PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HAR??LAI PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HAR??LA?? PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HAR??L??I PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HAR??L???? PATRA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("????????????????????????????????? ???????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHARULAI 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHARULA?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHARUL??I 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHARUL???? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHAR??LAI 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHAR??LA?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHAR??L??I 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??ISIHAR??L???? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HARULAI 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HARULA?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HARUL??I 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HARUL???? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HAR??LAI 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HAR??LA?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HAR??L??I 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EP??IS??HAR??L???? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("????????????????????????????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (ne)", function () {
            expect(p.parse("?????????????????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippiharulai patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippiharula?? patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippiharul??i patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippiharul???? patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippihar??lai patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippihar??la?? patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippihar??l??i patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippihar??l???? patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??harulai patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??harula?? patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??harul??i patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??harul???? patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??har??lai patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??har??la?? patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??har??l??i patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??har??l???? patra 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????????????????????????????????????? ???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippiharulai 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippiharula?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippiharul??i 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippiharul???? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippihar??lai 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippihar??la?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippihar??l??i 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilippihar??l???? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??harulai 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??harula?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??harul??i 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??harul???? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??har??lai 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??har??la?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??har??l??i 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("p??ilipp??har??l???? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????????????????????????????????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHARULAI PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHARULA?? PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHARUL??I PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHARUL???? PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHAR??LAI PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHAR??LA?? PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHAR??L??I PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHAR??L???? PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HARULAI PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HARULA?? PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HARUL??I PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HARUL???? PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HAR??LAI PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HAR??LA?? PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HAR??L??I PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HAR??L???? PATRA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????????????????????????????????????? ???????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHARULAI 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHARULA?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHARUL??I 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHARUL???? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHAR??LAI 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHAR??LA?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHAR??L??I 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPPIHAR??L???? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HARULAI 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HARULA?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HARUL??I 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HARUL???? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HAR??LAI 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HAR??LA?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HAR??L??I 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("P??ILIPP??HAR??L???? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("?????????????????????????????????????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("???????????????????????? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (ne)", function () {
            expect(p.parse("???????????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassiharulai patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassiharula?? patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassiharul??i patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassiharul???? patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassihar??lai patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassihar??la?? patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassihar??l??i patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassihar??l???? patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??harulai patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??harula?? patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??harul??i patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??harul???? patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??har??lai patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??har??la?? patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??har??l??i patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??har??l???? patra 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("???????????????????????????????????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassiharulai 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassiharula?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassiharul??i 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassiharul???? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassihar??lai 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassihar??la?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassihar??l??i 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalassihar??l???? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??harulai 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??harula?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??harul??i 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??harul???? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??har??lai 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??har??la?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??har??l??i 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("kalass??har??l???? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("???????????????????????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHARULAI PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHARULA?? PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHARUL??I PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHARUL???? PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHAR??LAI PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHAR??LA?? PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHAR??L??I PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHAR??L???? PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HARULAI PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HARULA?? PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HARUL??I PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HARUL???? PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HAR??LAI PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HAR??LA?? PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HAR??L??I PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HAR??L???? PATRA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("???????????????????????????????????? ???????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHARULAI 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHARULA?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHARUL??I 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHARUL???? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHAR??LAI 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHAR??LA?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHAR??L??I 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASSIHAR??L???? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HARULAI 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HARULA?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HARUL??I 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HARUL???? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HAR??LAI 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HAR??LA?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HAR??L??I 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KALASS??HAR??L???? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("???????????????????????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (ne)", function () {
            expect(p.parse("??????????????????????????????????????????????????? ?????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonikiharulai dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonikiharula?? dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonikiharul??i dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonikiharul???? dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonikihar??lai dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonikihar??la?? dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonikihar??l??i dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonikihar??l???? dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonik??harulai dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonik??harula?? dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonik??harul??i dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonik??harul???? dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonik??har??lai dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonik??har??la?? dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonik??har??l??i dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("t??issalonik??har??l???? dostro patra 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("??????????????????????????????????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonikiharulai 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonikiharula?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonikiharul??i 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonikiharul???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonikihar??lai 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonikihar??la?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonikihar??l??i 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonikihar??l???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonik??harulai 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonik??harula?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonik??harul??i 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonik??harul???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonik??har??lai 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonik??har??la?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonik??har??l??i 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. t??issalonik??har??l???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonikiharulai 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonikiharula?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonikiharul??i 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonikiharul???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonikihar??lai 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonikihar??la?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonikihar??l??i 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonikihar??l???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonik??harulai 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonik??harula?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonik??harul??i 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonik??harul???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonik??har??lai 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonik??har??la?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonik??har??l??i 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 t??issalonik??har??l???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ??????????????????????????????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ??????????????????????????????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ????????????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ????????????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????????????????????????????????????????? ?????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIKIHARULAI DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIKIHARULA?? DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIKIHARUL??I DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIKIHARUL???? DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIKIHAR??LAI DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIKIHAR??LA?? DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIKIHAR??L??I DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIKIHAR??L???? DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIK??HARULAI DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIK??HARULA?? DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIK??HARUL??I DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIK??HARUL???? DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIK??HAR??LAI DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIK??HAR??LA?? DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIK??HAR??L??I DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("T??ISSALONIK??HAR??L???? DOSTRO PATRA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("??????????????????????????????????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIKIHARULAI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIKIHARULA?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIKIHARUL??I 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIKIHARUL???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIKIHAR??LAI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIKIHAR??LA?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIKIHAR??L??I 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIKIHAR??L???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIK??HARULAI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIK??HARULA?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIK??HARUL??I 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIK??HARUL???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIK??HAR??LAI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIK??HAR??LA?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIK??HAR??L??I 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??ISSALONIK??HAR??L???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIKIHARULAI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIKIHARULA?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIKIHARUL??I 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIKIHARUL???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIKIHAR??LAI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIKIHAR??LA?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIKIHAR??L??I 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIKIHAR??L???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIK??HARULAI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIK??HARULA?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIK??HARUL??I 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIK??HARUL???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIK??HAR??LAI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIK??HAR??LA?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIK??HAR??L??I 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??ISSALONIK??HAR??L???? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ??????????????????????????????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ??????????????????????????????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ????????????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ????????????????????????????????? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (ne)", function () {
            expect(p.parse("??????????????????????????????????????????????????? ?????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonikiharulai pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonikiharula?? pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonikiharul??i pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonikiharul???? pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonikihar??lai pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonikihar??la?? pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonikihar??l??i pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonikihar??l???? pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonik??harulai pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonik??harula?? pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonik??harul??i pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonik??harul???? pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonik??har??lai pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonik??har??la?? pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonik??har??l??i pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("t??issalonik??har??l???? pahilo patra 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("??????????????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonikiharulai 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonikiharula?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonikiharul??i 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonikiharul???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonikihar??lai 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonikihar??la?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonikihar??l??i 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonikihar??l???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonik??harulai 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonik??harula?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonik??harul??i 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonik??harul???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonik??har??lai 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonik??har??la?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonik??har??l??i 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. t??issalonik??har??l???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonikiharulai 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonikiharula?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonikiharul??i 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonikiharul???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonikihar??lai 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonikihar??la?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonikihar??l??i 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonikihar??l???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonik??harulai 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonik??harula?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonik??harul??i 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonik??harul???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonik??har??lai 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonik??har??la?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonik??har??l??i 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 t??issalonik??har??l???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ??????????????????????????????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ??????????????????????????????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ????????????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ????????????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????????????????????????????????????????? ?????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIKIHARULAI PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIKIHARULA?? PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIKIHARUL??I PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIKIHARUL???? PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIKIHAR??LAI PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIKIHAR??LA?? PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIKIHAR??L??I PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIKIHAR??L???? PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIK??HARULAI PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIK??HARULA?? PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIK??HARUL??I PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIK??HARUL???? PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIK??HAR??LAI PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIK??HAR??LA?? PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIK??HAR??L??I PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("T??ISSALONIK??HAR??L???? PAHILO PATRA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("??????????????????????????????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIKIHARULAI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIKIHARULA?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIKIHARUL??I 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIKIHARUL???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIKIHAR??LAI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIKIHAR??LA?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIKIHAR??L??I 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIKIHAR??L???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIK??HARULAI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIK??HARULA?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIK??HARUL??I 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIK??HARUL???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIK??HAR??LAI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIK??HAR??LA?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIK??HAR??L??I 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??ISSALONIK??HAR??L???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIKIHARULAI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIKIHARULA?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIKIHARUL??I 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIKIHARUL???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIKIHAR??LAI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIKIHAR??LA?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIKIHAR??L??I 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIKIHAR??L???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIK??HARULAI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIK??HARULA?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIK??HARUL??I 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIK??HARUL???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIK??HAR??LAI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIK??HAR??LA?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIK??HAR??L??I 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??ISSALONIK??HAR??L???? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ??????????????????????????????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ??????????????????????????????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ????????????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ????????????????????????????????? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (ne)", function () {
            expect(p.parse("??????????????????????????? ?????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timot??ilai dostro patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timot??ila?? dostro patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timot??il??i dostro patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timot??il???? dostro patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timot????lai dostro patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timot????la?? dostro patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timot????l??i dostro patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("timot????l???? dostro patra 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("??????????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. timot??ilai 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. timot??ila?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. timot??il??i 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. timot??il???? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. timot????lai 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. timot????la?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. timot????l??i 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. timot????l???? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timot??ilai 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timot??ila?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timot??il??i 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timot??il???? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timot????lai 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timot????la?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timot????l??i 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 timot????l???? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ??????????????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ?????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??????????????????????????? ?????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMOT??ILAI DOSTRO PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMOT??ILA?? DOSTRO PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMOT??IL??I DOSTRO PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMOT??IL???? DOSTRO PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMOT????LAI DOSTRO PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMOT????LA?? DOSTRO PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMOT????L??I DOSTRO PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("TIMOT????L???? DOSTRO PATRA 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("??????????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOT??ILAI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOT??ILA?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOT??IL??I 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOT??IL???? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOT????LAI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOT????LA?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOT????L??I 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOT????L???? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOT??ILAI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOT??ILA?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOT??IL??I 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOT??IL???? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOT????LAI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOT????LA?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOT????L??I 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOT????L???? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ??????????????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ??????????????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. ?????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (ne)", function () {
            expect(p.parse("????????????????????????????????? ?????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timot??ilai pahilo patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timot??ila?? pahilo patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timot??il??i pahilo patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timot??il???? pahilo patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timot????lai pahilo patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timot????la?? pahilo patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timot????l??i pahilo patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("timot????l???? pahilo patra 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. timot??ilai 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. timot??ila?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. timot??il??i 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. timot??il???? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. timot????lai 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. timot????la?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. timot????l??i 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. timot????l???? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timot??ilai 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timot??ila?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timot??il??i 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timot??il???? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timot????lai 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timot????la?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timot????l??i 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 timot????l???? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ??????????????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ?????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????????????????? ?????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMOT??ILAI PAHILO PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMOT??ILA?? PAHILO PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMOT??IL??I PAHILO PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMOT??IL???? PAHILO PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMOT????LAI PAHILO PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMOT????LA?? PAHILO PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMOT????L??I PAHILO PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("TIMOT????L???? PAHILO PATRA 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("??????????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOT??ILAI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOT??ILA?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOT??IL??I 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOT??IL???? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOT????LAI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOT????LA?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOT????L??I 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOT????L???? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOT??ILAI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOT??ILA?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOT??IL??I 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOT??IL???? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOT????LAI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOT????LA?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOT????L??I 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOT????L???? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ??????????????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ??????????????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. ?????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (ne)", function () {
            expect(p.parse("????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("titaslai patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("titasla?? patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("titasl??i patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("titasl???? patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??taslai patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tasla?? patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tasl??i patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tasl???? patra 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("????????????????????? ???????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("titaslai 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("titasla?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("titasl??i 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("titasl???? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??taslai 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tasla?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tasl??i 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("t??tasl???? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITASLAI PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITASLA?? PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITASL??I PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITASL???? PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TASLAI PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TASLA?? PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TASL??I PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TASL???? PATRA 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("????????????????????? ???????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITASLAI 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITASLA?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITASL??I 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITASL???? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TASLAI 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TASLA?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TASL??I 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TASL???? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("???????????? 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (ne)", function () {
            expect(p.parse("?????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonlai patra 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonla?? patra 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonl??i patra 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonl???? patra 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????????????????????????????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonlai 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonla?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonl??i 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("p??ilemonl???? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("?????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONLAI PATRA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONLA?? PATRA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONL??I PATRA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONL???? PATRA 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????????????????????????????? ???????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONLAI 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONLA?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONL??I 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("P??ILEMONL???? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("?????????????????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (ne)", function () {
            expect(p.parse("hibruharuko nimti patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("hibruhar??ko nimti patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("hibr??haruko nimti patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("hibr??har??ko nimti patra 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("????????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("????????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("hibruharuko nimti 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("hibruhar??ko nimti 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("hibr??haruko nimti 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("hibr??har??ko nimti 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HIBRUHARUKO NIMTI PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HIBRUHAR??KO NIMTI PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HIBR??HARUKO NIMTI PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HIBR??HAR??KO NIMTI PATRA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("????????????????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("????????????????????????????????? ?????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HIBRUHARUKO NIMTI 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HIBRUHAR??KO NIMTI 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HIBR??HARUKO NIMTI 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HIBR??HAR??KO NIMTI 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("?????????????????? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (ne)", function () {
            expect(p.parse("yakubko patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("yak??bko patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??kubko patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??k??bko patra 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("????????????????????? ???????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("yakubko 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("yak??bko 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??kubko 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("y??k??bko 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAKUBKO PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("YAK??BKO PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??KUBKO PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??K??BKO PATRA 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("????????????????????? ???????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("YAKUBKO 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("YAK??BKO 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??KUBKO 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Y??K??BKO 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (ne)", function () {
            expect(p.parse("???????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("patrusko dostro patra 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("???????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. patrusko 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. ???????????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 patrusko 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ???????????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. ?????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("???????????????????????? ???????????????????????? ???????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("PATRUSKO DOSTRO PATRA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("???????????????????????? ?????????????????? ???????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PATRUSKO 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. ???????????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PATRUSKO 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ???????????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. ?????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 ?????????????????? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (ne)", function () {
            expect(p.parse("patrusko pahilo patra 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("???????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. patrusko 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. ???????????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 patrusko 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ???????????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. ?????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PATRUSKO PAHILO PATRA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("???????????????????????? ??????????????? ???????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PATRUSKO 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. ???????????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PATRUSKO 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ???????????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. ?????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 ?????????????????? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (ne)", function () {
            expect(p.parse("yahudako patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yahud??ko patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??dako patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??d??ko patra 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("????????????????????? ???????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yahudako 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yahud??ko 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??dako 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("yah??d??ko 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("YAHUDAKO PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAHUD??KO PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??DAKO PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??D??KO PATRA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("????????????????????? ???????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAHUDAKO 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAHUD??KO 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??DAKO 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("YAH??D??KO 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("????????????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("??????????????? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (ne)", function () {
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (ne)", function () {
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (ne)", function () {
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (ne)", function () {
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (ne)", function () {
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (ne)", function () {
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (ne)", function () {
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (ne)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (ne)", function () {
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
            return expect(p.languages).toEqual(["ne"]);
        });
        it("should handle ranges (ne)", function () {
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (ne)", function () {
            expect(p.parse("Titus 1:1, chapter 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 CHAPTER 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (ne)", function () {
            expect(p.parse("Exod 1:1 verse 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm VERSE 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (ne)", function () {
            expect(p.parse("Exod 1:1 and 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 AND 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (ne)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (ne)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (ne)", function () {
            expect(p.parse("Lev 1 (ERV)").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
            return expect(p.parse("lev 1 erv").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
        });
        it("should handle book ranges (ne)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            expect(p.parse("1 - 3  yuhannako").osis()).toEqual("1John.1-3John.1");
            expect(p.parse("1 - 3  yuhann??ko").osis()).toEqual("1John.1-3John.1");
            expect(p.parse("1 - 3  y??hannako").osis()).toEqual("1John.1-3John.1");
            return expect(p.parse("1 - 3  y??hann??ko").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (ne)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=ne.spec.js.map