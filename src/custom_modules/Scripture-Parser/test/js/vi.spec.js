"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/vi_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (vi)", function () {
            expect(p.parse("S??ng th??? k?? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("S??ng Th??? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("S??ng 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("S??NG TH??? K?? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("S??NG TH??? 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("S??NG 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (vi)", function () {
            expect(p.parse("Xu???t ??-d??p-t?? k?? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Xu???t Ai C???p K?? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Xu???t Ai-c???p 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Xu???t H??nh 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Xu???t 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("XU???T ??-D??P-T?? K?? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("XU???T AI C???P K?? 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("XU???T AI-C???P 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("XU???T H??NH 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("XU???T 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (vi)", function () {
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (vi)", function () {
            expect(p.parse("Phi-l??-m??n 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phil??mon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phi-l?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PHI-L??-M??N 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHIL??MON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHI-L?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Lev (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (vi)", function () {
            expect(p.parse("L??-vi k?? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("L?? Vi 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("L??-vi 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("L?? 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("L??-VI K?? 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("L?? VI 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("L??-VI 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("L?? 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (vi)", function () {
            expect(p.parse("D??n s??? k?? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("D??n S??? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("D??n 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("D??N S??? K?? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("D??N S??? 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("D??N 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (vi)", function () {
            expect(p.parse("Hu???n Ca 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (vi)", function () {
            expect(p.parse("Kh??n Ngoan 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (vi)", function () {
            expect(p.parse("Ca th????ng 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Ai Ca 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Ai 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CA TH????NG 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("AI CA 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("AI 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (vi)", function () {
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (vi)", function () {
            expect(p.parse("Kh???i Huy???n c???a John 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Kh???i Huy???n 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Kh???i th??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Kh???i 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KH???I HUY???N C???A JOHN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("KH???I HUY???N 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("KH???I TH??? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("KH???I 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (vi)", function () {
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (vi)", function () {
            expect(p.parse("Ph???c truy???n lu???t l??? k?? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Ph???c Truy???n Lu???t L??? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Ph???c Truy???n 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("????? nh??? lu???t 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Ph???c 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PH???C TRUY???N LU???T L??? K?? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PH???C TRUY???N LU???T L??? 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PH???C TRUY???N 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("????? NH??? LU???T 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PH???C 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Joel (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (vi)", function () {
            expect(p.parse("Gi??-??n 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GI??-??N 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (vi)", function () {
            expect(p.parse("Gi??-na 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GI??-NA 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Nah (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (vi)", function () {
            expect(p.parse("Na-hum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Na-h??m 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Na 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NA-HUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NA-H??M 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NA 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Josh (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (vi)", function () {
            expect(p.parse("Gi??-sua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Gi??-su?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Joshua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Gi??s 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Gsua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Gsu?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Gi?? 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GI??-SUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("GI??-SU?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSHUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("GI??S 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("GSUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("GSU?? 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("GI?? 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (vi)", function () {
            expect(p.parse("C??c Th??? l??nh 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("C??c quan x??t 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Th???m ph??n 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Th??? l??nh 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Quan ??n 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Quan 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Th??? 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("C??C TH??? L??NH 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("C??C QUAN X??T 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("TH???M PH??N 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("TH??? L??NH 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("QUAN ??N 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("QUAN 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("TH??? 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (vi)", function () {
            expect(p.parse("Ru-t?? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Ru 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RU-T?? 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RU 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (vi)", function () {
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (vi)", function () {
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (vi)", function () {
            expect(p.parse("I-sa-gia 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("I-sai-a 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isaiah 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??-sai 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("I-sa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("I-SA-GIA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("I-SAI-A 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISAIAH 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("??-SAI 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("I-SA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (vi)", function () {
            expect(p.parse("II. Sa-mu-??n 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Sa-mu-??n 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Sa-mu-??n 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sa-mu-??n 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Sa 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Sa 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Sa 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sa 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. SA-MU-??N 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SA-MU-??N 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SA-MU-??N 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SA-MU-??N 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (vi)", function () {
            expect(p.parse("1. Sa-mu-??n 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Sa-mu-??n 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sa-mu-??n 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Sa-mu-??n 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Sa 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Sa 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sa 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Sa 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. SA-MU-??N 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SA-MU-??N 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SA-MU-??N 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SA-MU-??N 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SA 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (vi)", function () {
            expect(p.parse("II. C??c Vua 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. C??c Vua 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II C??c Vua 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 C??c Vua 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Vua 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Vua 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Vua 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Vua 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. C??C VUA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. C??C VUA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II C??C VUA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 C??C VUA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. VUA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. VUA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II VUA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 VUA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (vi)", function () {
            expect(p.parse("1. C??c Vua 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. C??c Vua 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 C??c Vua 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I C??c Vua 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Vua 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Vua 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Vua 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Vua 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. C??C VUA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. C??C VUA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 C??C VUA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I C??C VUA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. VUA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. VUA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 VUA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I VUA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (vi)", function () {
            expect(p.parse("II. S??? bi??n ni??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. S??? bi??n ni??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II S??? bi??n ni??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 S??? bi??n ni??n 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. L???ch s??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. L???ch s??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II L???ch s??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II.  S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 L???ch s??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2.  S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II  S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. S??? k?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2  S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. S??? k?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II S??? k?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 S??? k?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. S??? BI??N NI??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. S??? BI??N NI??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II S??? BI??N NI??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 S??? BI??N NI??N 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. L???CH S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. L???CH S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II L???CH S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II.  S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 L???CH S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2.  S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II  S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2  S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 S??? K?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 S??? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (vi)", function () {
            expect(p.parse("1. S??? bi??n ni??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. S??? bi??n ni??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 S??? bi??n ni??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I S??? bi??n ni??n 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. L???ch s??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. L???ch s??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 L???ch s??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I L???ch s??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. S??? k?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. S??? k?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 S??? k?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I S??? k?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. S??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. S??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 S??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I S??? 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. S??? BI??N NI??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. S??? BI??N NI??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 S??? BI??N NI??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I S??? BI??N NI??N 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. L???CH S??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. L???CH S??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 L???CH S??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I L???CH S??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I S??? K?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. S??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. S??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 S??? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I S??? 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (vi)", function () {
            expect(p.parse("E-x??-ra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??-x??-ra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??tra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??xra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??xr 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("E-X??-RA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??-X??-RA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??TRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??XRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("??XR 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (vi)", function () {
            expect(p.parse("N??-h??-mi-a 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("N??-h??-mi 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("N??khemia 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("N?? 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("N??-H??-MI-A 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("N??-H??-MI 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("N??KHEMIA 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("N?? 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (vi)", function () {
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (vi)", function () {
            expect(p.parse("??-x??-t?? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esther 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??-X??-T?? 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTHER 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (vi)", function () {
            expect(p.parse("Gi??p 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GI??P 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Rom (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (vi)", function () {
            expect(p.parse("La-m?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??-ma 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??ma 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LA-M?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??-MA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??MA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book Mal (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (vi)", function () {
            expect(p.parse("Ma-la-chi 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Ma-la-ki 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malachi 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MA-LA-CHI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MA-LA-KI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALACHI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (vi)", function () {
            expect(p.parse("Ma-thi-?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("M??tth??u 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mat 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Ma 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MA-THI-?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("M??TTH??U 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MAT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MA 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Ps (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (vi)", function () {
            expect(p.parse("Th??nh v???nh 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Thi Thi??n 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Th??nh Thi 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Thi 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TH??NH V???NH 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("THI THI??N 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("TH??NH THI 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("THI 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (vi)", function () {
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (vi)", function () {
            expect(p.parse("Ch??m ng??n 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Ch??m 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CH??M NG??N 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("CH??M 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (vi)", function () {
            expect(p.parse("Truy???n ?????o 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Gi??o hu???n 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Gi???ng S?? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Gi??o 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TRUY???N ?????O 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("GI??O HU???N 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("GI???NG S?? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("GI??O 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (vi)", function () {
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (vi)", function () {
            expect(p.parse("Di???m ca 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("T??nh ca 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Nh?? ca 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("T??nh 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DI???M CA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("T??NH CA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("NH?? CA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("T??NH 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (vi)", function () {
            expect(p.parse("Gi??-r??-mi-a 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Gi??-r??-mi 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremiah 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Gi?? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GI??-R??-MI-A 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("GI??-R??-MI 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMIAH 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("GI?? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (vi)", function () {
            expect(p.parse("??-x??-chi-??n 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("??-x??-chi??n 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("??-x??-ki-??n 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezekiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("??-x?? 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??-X??-CHI-??N 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("??-X??-CHI??N 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("??-X??-KI-??N 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEKIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("??-X?? 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (vi)", function () {
            expect(p.parse("??a-ni-??n 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("??a-ni-??n 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("??a-ni??n 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("??anien 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("??a 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??A-NI-??N 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("??A-NI-??N 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("??A-NI??N 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("??ANIEN 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("??A 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (vi)", function () {
            expect(p.parse("H??-s??-a 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hosea 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("??-s?? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("H??-S??-A 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOSEA 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("??-S?? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Amos (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (vi)", function () {
            expect(p.parse("A-m???t 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("A-M???T 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (vi)", function () {
            expect(p.parse("??-ba-??i-a 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadiah 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??p-??ia 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??p 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??-BA-??I-A 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADIAH 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??P-??IA 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??P 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Mic (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (vi)", function () {
            expect(p.parse("Mi-ch?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mi-ca 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Micah 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mi 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MI-CH?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MI-CA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICAH 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MI 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Hag (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (vi)", function () {
            expect(p.parse("Ha-gai 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Haggai 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("A-gai 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("A-gh?? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HA-GAI 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGGAI 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("A-GAI 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("A-GH?? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Hab (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (vi)", function () {
            expect(p.parse("Ha-ba-c??c 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Habakkuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Ha 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HA-BA-C??C 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HABAKKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HA 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (vi)", function () {
            expect(p.parse("S??-ph??-ni-a 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("X??-pha-ni-a 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("S??-ph??-ni 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("X??-ph??-ni 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zephaniah 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("X?? 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("S??-PH??-NI-A 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("X??-PHA-NI-A 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("S??-PH??-NI 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("X??-PH??-NI 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPHANIAH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("X?? 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Zech (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (vi)", function () {
            expect(p.parse("Xa-cha-ri-a 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("X??-ca-ri-a 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Xa-cha-ri 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zechariah 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Xa 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("XA-CHA-RI-A 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("X??-CA-RI-A 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("XA-CHA-RI 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECHARIAH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("XA 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mark (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (vi)", function () {
            expect(p.parse("M??cc?? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??c 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("M??CC?? 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("M??C 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (vi)", function () {
            expect(p.parse("Lu-ca 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luca 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lu 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LU-CA 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUCA 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LU 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (vi)", function () {
            expect(p.parse("1. Gioan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Gi??ng 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Gioan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Gi??ng 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Gioan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Gi??ng 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Gioan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Gi??ng 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Gi 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Gi 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Gi 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Gi 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. GIOAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. GI??NG 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. GIOAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. GI??NG 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 GIOAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 GI??NG 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I GIOAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I GI??NG 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. GI 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. GI 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 GI 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I GI 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (vi)", function () {
            expect(p.parse("II. Gioan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Gi??ng 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Gioan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Gi??ng 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Gioan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Gi??ng 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Gioan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Gi??ng 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Gi 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Gi 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Gi 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Gi 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. GIOAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. GI??NG 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. GIOAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. GI??NG 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II GIOAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II GI??NG 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 GIOAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 GI??NG 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. GI 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. GI 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II GI 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 GI 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (vi)", function () {
            expect(p.parse("III. Gioan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Gi??ng 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Gioan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Gi??ng 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Gioan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Gi??ng 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Gioan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Gi??ng 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Gi 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Gi 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Gi 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Gi 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("III. GIOAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. GI??NG 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III GIOAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III GI??NG 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. GIOAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. GI??NG 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 GIOAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 GI??NG 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. GI 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III GI 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. GI 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 GI 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (vi)", function () {
            expect(p.parse("Gioan 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Gi??ng 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Gg 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Gi 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GIOAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("GI??NG 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("GG 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("GI 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (vi)", function () {
            expect(p.parse("C??ng v??? c??c S??? ????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("C??ng v??? T??ng ????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("C??ng V??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("S??? ????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("C??ng 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("C??NG V??? C??C S??? ????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("C??NG V??? T??NG ????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("C??NG V??? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("S??? ????? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("C??NG 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (vi)", function () {
            expect(p.parse("II. C??-rinh-t?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. C??-rinh-t?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II C??-rinh-t?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 C??-rinh-t?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. C??-rinh 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. C??rint?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. C??-rinh 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. C??rint?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II C??-rinh 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II C??rint?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 C??-rinh 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 C??rint?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. C?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. C?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II C?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 C?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. C??-RINH-T?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. C??-RINH-T?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II C??-RINH-T?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 C??-RINH-T?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. C??-RINH 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. C??RINT?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. C??-RINH 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. C??RINT?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II C??-RINH 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II C??RINT?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 C??-RINH 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 C??RINT?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. C?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. C?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II C?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 C?? 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (vi)", function () {
            expect(p.parse("1. C??-rinh-t?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. C??-rinh-t?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 C??-rinh-t?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I C??-rinh-t?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. C??-rinh 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. C??rint?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. C??-rinh 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. C??rint?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 C??-rinh 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 C??rint?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I C??-rinh 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I C??rint?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. C?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. C?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 C?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I C?? 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. C??-RINH-T?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. C??-RINH-T?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 C??-RINH-T?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I C??-RINH-T?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. C??-RINH 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. C??RINT?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. C??-RINH 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. C??RINT?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 C??-RINH 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 C??RINT?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I C??-RINH 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I C??RINT?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. C?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. C?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 C?? 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I C?? 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (vi)", function () {
            expect(p.parse("Ga-la-ti 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal??t 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GA-LA-TI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL??T 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (vi)", function () {
            expect(p.parse("??-ph??-s?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??ph??s?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??ph 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??-PH??-S?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??PH??S?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("??PH 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (vi)", function () {
            expect(p.parse("Phil??pph?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phi-l??p 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PHIL??PPH?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHI-L??P 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (vi)", function () {
            expect(p.parse("C??-l??-se 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("C??l??x?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("C??l 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("C??-L??-SE 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("C??L??X?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("C??L 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (vi)", function () {
            expect(p.parse("II. Th??-sa-l??-ni-ca 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Th??-sa-l??-ni-ca 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Th??-sa-l??-ni-ca 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. T??-sa-l??-ni-ca 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Th??-sa-l??-ni-ca 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??-sa-l??-ni-ca 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II T??-sa-l??-ni-ca 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??-sa-l??-ni-ca 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Th??xal??nica 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Th??xal??nica 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Th??xal??nica 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Th??xal??nica 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. T?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II T?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T?? 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. TH??-SA-L??-NI-CA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TH??-SA-L??-NI-CA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TH??-SA-L??-NI-CA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. T??-SA-L??-NI-CA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TH??-SA-L??-NI-CA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T??-SA-L??-NI-CA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II T??-SA-L??-NI-CA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T??-SA-L??-NI-CA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TH??XAL??NICA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TH??XAL??NICA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TH??XAL??NICA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TH??XAL??NICA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. T?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. T?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II T?? 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 T?? 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (vi)", function () {
            expect(p.parse("1. Th??-sa-l??-ni-ca 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Th??-sa-l??-ni-ca 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Th??-sa-l??-ni-ca 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??-sa-l??-ni-ca 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Th??-sa-l??-ni-ca 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. T??-sa-l??-ni-ca 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??-sa-l??-ni-ca 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I T??-sa-l??-ni-ca 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Th??xal??nica 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Th??xal??nica 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Th??xal??nica 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Th??xal??nica 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. T?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I T?? 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. TH??-SA-L??-NI-CA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TH??-SA-L??-NI-CA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TH??-SA-L??-NI-CA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T??-SA-L??-NI-CA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TH??-SA-L??-NI-CA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. T??-SA-L??-NI-CA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T??-SA-L??-NI-CA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I T??-SA-L??-NI-CA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TH??XAL??NICA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TH??XAL??NICA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TH??XAL??NICA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TH??XAL??NICA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. T?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. T?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 T?? 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I T?? 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (vi)", function () {
            expect(p.parse("II. Ti-m??-th?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Ti-m??-th?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Ti-m??-th?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Ti-m??-th?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim??th?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim??th?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim??th?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim??th?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. TI-M??-TH?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TI-M??-TH?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TI-M??-TH?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TI-M??-TH?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM??TH?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM??TH?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM??TH?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM??TH?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (vi)", function () {
            expect(p.parse("1. Ti-m??-th?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Ti-m??-th?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Ti-m??-th?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Ti-m??-th?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim??th?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim??th?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim??th?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim??th?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. TI-M??-TH?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TI-M??-TH?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TI-M??-TH?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TI-M??-TH?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM??TH?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM??TH?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM??TH?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM??TH?? 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (vi)", function () {
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??ch 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??t 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??CH 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??T 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Heb (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (vi)", function () {
            expect(p.parse("H??-b??-r?? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Do Th??i 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("H?? 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("H??-B??-R?? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("DO TH??I 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("H?? 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (vi)", function () {
            expect(p.parse("Giac??b?? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Gia-c?? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GIAC??B?? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("GIA-C?? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (vi)", function () {
            expect(p.parse("II. Phi-e-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Phi-e-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Phi-e-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Phia-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Phi-e-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Phia-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Phia-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Phi-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Ph??-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Phia-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Phi-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Ph??-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Phi-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Ph??-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Ph??r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Phi-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Ph??-r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Ph??r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Ph??r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Phia 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Ph??r?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Phia 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Phia 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Phia 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. PHI-E-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PHI-E-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PHI-E-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PHIA-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PHI-E-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PHIA-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PHIA-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PHI-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PH??-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PHIA-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PHI-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PH??-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PHI-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PH??-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PH??R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PHI-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PH??-R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PH??R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PH??R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PHIA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PH??R?? 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PHIA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PHIA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PHIA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (vi)", function () {
            expect(p.parse("1. Phi-e-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Phi-e-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Phi-e-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Phia-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Phi-e-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Phia-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Phia-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Phi-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Ph??-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Phia-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Phi-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Ph??-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Phi-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Ph??-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Ph??r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Phi-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Ph??-r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Ph??r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Ph??r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Phia 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Ph??r?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Phia 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Phia 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Phia 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. PHI-E-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PHI-E-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PHI-E-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PHIA-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PHI-E-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PHIA-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PHIA-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PHI-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PH??-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PHIA-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PHI-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PH??-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PHI-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PH??-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PH??R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PHI-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PH??-R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PH??R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PH??R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PHIA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PH??R?? 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PHIA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PHIA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PHIA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (vi)", function () {
            expect(p.parse("Giu-??e 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Giu??a 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GIU-??E 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("GIU??A 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (vi)", function () {
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (vi)", function () {
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (vi)", function () {
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (vi)", function () {
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (vi)", function () {
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (vi)", function () {
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (vi)", function () {
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (vi)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (vi)", function () {
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
            return expect(p.languages).toEqual(["vi"]);
        });
        it("should handle ranges (vi)", function () {
            expect(p.parse("Titus 1:1 to 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1to2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 TO 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (vi)", function () {
            expect(p.parse("Titus 1:1, ch????ng 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 CH????NG 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (vi)", function () {
            expect(p.parse("Exod 1:1 verse 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm VERSE 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (vi)", function () {
            expect(p.parse("Exod 1:1 v?? 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 V?? 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (vi)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (vi)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (vi)", function () {
            expect(p.parse("Lev 1 (1934)").osis_and_translations()).toEqual([["Lev.1", "1934"]]);
            expect(p.parse("lev 1 1934").osis_and_translations()).toEqual([["Lev.1", "1934"]]);
            expect(p.parse("Lev 1 (ERV)").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
            return expect(p.parse("lev 1 erv").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
        });
        it("should handle book ranges (vi)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            return expect(p.parse("I to III  Gi").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (vi)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=vi.spec.js.map