"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/ro_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (ro)", function () {
            expect(p.parse("Facerea 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Genesa 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Geneza 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FACEREA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GENESA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GENEZA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (ro)", function () {
            expect(p.parse("Iesirea 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Ie??irea 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Ie??irea 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exodul 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Ex 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IESIREA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("IE??IREA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("IE??IREA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXODUL 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EX 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (ro)", function () {
            expect(p.parse("Istoria omorarii balaurului si a sfaramarii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului si a sfaram??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului si a sfar??marii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului si a sfar??m??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului si a sf??ramarii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului si a sf??ram??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului si a sf??r??marii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului si a sf??r??m??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului ??i a sfaramarii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului ??i a sfaram??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului ??i a sfar??marii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului ??i a sfar??m??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului ??i a sf??ramarii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului ??i a sf??ram??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului ??i a sf??r??marii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omorarii balaurului ??i a sf??r??m??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului si a sfaramarii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului si a sfaram??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului si a sfar??marii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului si a sfar??m??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului si a sf??ramarii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului si a sf??ram??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului si a sf??r??marii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului si a sf??r??m??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului ??i a sfaramarii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului ??i a sfaram??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului ??i a sfar??marii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului ??i a sfar??m??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului ??i a sf??ramarii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului ??i a sf??ram??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului ??i a sf??r??marii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria omor??rii balaurului ??i a sf??r??m??rii lui Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Istoria Balaurului 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel si dragonul 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel ??i dragonul 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (ro)", function () {
            expect(p.parse("Leviticul 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Levitic 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LEVITICUL 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITIC 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (ro)", function () {
            expect(p.parse("Numerii 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Numeri 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NUMERII 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUMERI 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (ro)", function () {
            expect(p.parse("Cartea intelepciunii lui Isus, fiul lui Sirah 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Cartea in??elepciunii lui Isus, fiul lui Sirah 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Cartea ??ntelepciunii lui Isus, fiul lui Sirah 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Cartea ??n??elepciunii lui Isus, fiul lui Sirah 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Ecclesiasticul 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Ecleziastic 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirach 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Lam (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (ro)", function () {
            expect(p.parse("Plangerile profetului Ieremia 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??ngerile profetului Ieremia 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plangerile lui Ieremia 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??ngerile lui Ieremia 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plangeri 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??ngeri 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plang 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??ng 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PLANGERILE PROFETULUI IEREMIA 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??NGERILE PROFETULUI IEREMIA 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLANGERILE LUI IEREMIA 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??NGERILE LUI IEREMIA 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLANGERI 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??NGERI 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLANG 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??NG 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (ro)", function () {
            expect(p.parse("Epistola lui Ieremia 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (ro)", function () {
            expect(p.parse("Rugaciunea regelui Manase 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Rug??ciunea regelui Manase 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Rugaciunea lui Manase 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Rug??ciunea lui Manase 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("Manase 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (ro)", function () {
            expect(p.parse("Deuteronomul 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deuteronom 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DEUTERONOMUL 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUTERONOM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (ro)", function () {
            expect(p.parse("Iosua Navi 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Iosua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Ios 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IOSUA NAVI 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("IOSUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("IOS 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (ro)", function () {
            expect(p.parse("Judecatorii 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judecatori 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judec??tori 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Jud 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JUDECATORII 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDECATORI 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDEC??TORI 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUD 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (ro)", function () {
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (ro)", function () {
            expect(p.parse("III. Ezdra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("III Ezdra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3. Ezdra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("3 Ezdra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdra 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (ro)", function () {
            expect(p.parse("II. Ezdra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("IV. Ezdra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("4. Ezdra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("IV Ezdra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("4 Ezdra 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (ro)", function () {
            expect(p.parse("Isaia 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Is 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ISAIA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IS 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (ro)", function () {
            expect(p.parse("Cartea a doua a Regilor 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Cartea II a lui Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Cartea II a Regilor 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Regilor 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Regilor 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Regilor 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Regilor 1:1").osis()).toEqual("2Sam.1.1");
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
            expect(p.parse("CARTEA A DOUA A REGILOR 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("CARTEA II A LUI SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("CARTEA II A REGILOR 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. REGILOR 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. REGILOR 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II REGILOR 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 REGILOR 1:1").osis()).toEqual("2Sam.1.1");
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
    describe("Localized book 1Sam (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (ro)", function () {
            expect(p.parse("Cartea intai a Regilor 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Cartea int??i a Regilor 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Cartea ??ntai a Regilor 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Cartea ??nt??i a Regilor 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Cartea I a lui Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Cartea I a Regilor 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Regilor 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Regilor 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Regilor 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Regilor 1:1").osis()).toEqual("1Sam.1.1");
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
            expect(p.parse("CARTEA INTAI A REGILOR 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("CARTEA INT??I A REGILOR 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("CARTEA ??NTAI A REGILOR 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("CARTEA ??NT??I A REGILOR 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("CARTEA I A LUI SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("CARTEA I A REGILOR 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. REGILOR 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. REGILOR 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 REGILOR 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I REGILOR 1:1").osis()).toEqual("1Sam.1.1");
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
    describe("Localized book 2Kgs (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (ro)", function () {
            expect(p.parse("Cartea a patra a Regilor 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Cartea IV a Regilor 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II a Imparatilor 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II a Impara??ilor 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II a Imp??ratilor 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II a Imp??ra??ilor 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II a ??mparatilor 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II a ??mpara??ilor 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II a ??mp??ratilor 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II a ??mp??ra??ilor 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Imparati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Impara??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Imp??rati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Imp??ra??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ??mparati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ??mpara??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ??mp??rati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ??mp??ra??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Imparati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Impara??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Imp??rati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Imp??ra??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??mparati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??mpara??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??mp??rati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??mp??ra??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Imparati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Impara??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Imp??rati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Imp??ra??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ??mparati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ??mpara??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ??mp??rati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ??mp??ra??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Imparati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Impara??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Imp??rati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Imp??ra??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??mparati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??mpara??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??mp??rati 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??mp??ra??i 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Regi 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. Regi 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Regi 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. Regi 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Regi 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Imp 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ??mp 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV Regi 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Regi 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Imp 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??mp 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 Regi 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Imp 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ??mp 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Imp 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??mp 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CARTEA A PATRA A REGILOR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("CARTEA IV A REGILOR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II A IMPARATILOR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II A IMPARA??ILOR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II A IMP??RATILOR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II A IMP??RA??ILOR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II A ??MPARATILOR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II A ??MPARA??ILOR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II A ??MP??RATILOR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II A ??MP??RA??ILOR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. IMPARATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. IMPARA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. IMP??RATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. IMP??RA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ??MPARATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ??MPARA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ??MP??RATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ??MP??RA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. IMPARATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. IMPARA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. IMP??RATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. IMP??RA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??MPARATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??MPARA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??MP??RATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??MP??RA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II IMPARATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II IMPARA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II IMP??RATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II IMP??RA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ??MPARATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ??MPARA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ??MP??RATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ??MP??RA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 IMPARATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 IMPARA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 IMP??RATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 IMP??RA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??MPARATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??MPARA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??MP??RATI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??MP??RA??I 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. REGI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. REGI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. REGI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. REGI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II REGI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. IMP 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. ??MP 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV REGI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 REGI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. IMP 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. ??MP 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 REGI 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II IMP 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II ??MP 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 IMP 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 ??MP 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (ro)", function () {
            expect(p.parse("Cartea a treia a Regilor 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Cartea III a Regilor 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I a Imparatilor 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I a Impara??ilor 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I a Imp??ratilor 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I a Imp??ra??ilor 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I a ??mparatilor 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I a ??mpara??ilor 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I a ??mp??ratilor 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I a ??mp??ra??ilor 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Imparati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Impara??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Imp??rati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Imp??ra??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??mparati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??mpara??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??mp??rati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??mp??ra??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Imparati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Impara??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Imp??rati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Imp??ra??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ??mparati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ??mpara??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ??mp??rati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ??mp??ra??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Imparati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Impara??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Imp??rati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Imp??ra??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??mparati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??mpara??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??mp??rati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??mp??ra??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Imparati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Impara??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Imp??rati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Imp??ra??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ??mparati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ??mpara??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ??mp??rati 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ??mp??ra??i 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. Regi 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III Regi 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Regi 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. Regi 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Regi 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Regi 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Imp 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??mp 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 Regi 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Regi 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Imp 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ??mp 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Imp 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??mp 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Imp 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ??mp 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CARTEA A TREIA A REGILOR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("CARTEA III A REGILOR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I A IMPARATILOR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I A IMPARA??ILOR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I A IMP??RATILOR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I A IMP??RA??ILOR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I A ??MPARATILOR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I A ??MPARA??ILOR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I A ??MP??RATILOR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I A ??MP??RA??ILOR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. IMPARATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. IMPARA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. IMP??RATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. IMP??RA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??MPARATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??MPARA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??MP??RATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??MP??RA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. IMPARATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. IMPARA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. IMP??RATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. IMP??RA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ??MPARATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ??MPARA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ??MP??RATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ??MP??RA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 IMPARATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 IMPARA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 IMP??RATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 IMP??RA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??MPARATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??MPARA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??MP??RATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??MP??RA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I IMPARATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I IMPARA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I IMP??RATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I IMP??RA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ??MPARATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ??MPARA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ??MP??RATI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ??MP??RA??I 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. REGI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III REGI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. REGI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. REGI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. REGI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 REGI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. IMP 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. ??MP 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 REGI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I REGI 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. IMP 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. ??MP 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 IMP 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 ??MP 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I IMP 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I ??MP 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (ro)", function () {
            expect(p.parse("Cartea a doua Paralipomena 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Paralipomena 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Paralipomena 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Paralipomena 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Paralipomena 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Cronicilor 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Cronicilor 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Cronicilor 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Cronicilor 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Cronici 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Cronici 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Cronici 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Cronici 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Cron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Cron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Cron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Cron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CARTEA A DOUA PARALIPOMENA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. PARALIPOMENA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. PARALIPOMENA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II PARALIPOMENA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 PARALIPOMENA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. CRONICILOR 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. CRONICILOR 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II CRONICILOR 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 CRONICILOR 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. CRONICI 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. CRONICI 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II CRONICI 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 CRONICI 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. CRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. CRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II CRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 CRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (ro)", function () {
            expect(p.parse("Cartea intai Paralipomena 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Cartea int??i Paralipomena 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Cartea ??ntai Paralipomena 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Cartea ??nt??i Paralipomena 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Paralipomena 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Paralipomena 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Paralipomena 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Paralipomena 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Cronicilor 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Cronicilor 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Cronicilor 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Cronicilor 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Cronici 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Cronici 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Cronici 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Cronici 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Cron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Cron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Cron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Cron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CARTEA INTAI PARALIPOMENA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("CARTEA INT??I PARALIPOMENA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("CARTEA ??NTAI PARALIPOMENA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("CARTEA ??NT??I PARALIPOMENA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. PARALIPOMENA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. PARALIPOMENA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 PARALIPOMENA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I PARALIPOMENA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. CRONICILOR 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. CRONICILOR 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 CRONICILOR 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I CRONICILOR 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. CRONICI 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. CRONICI 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 CRONICI 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I CRONICI 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. CRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. CRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 CRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I CRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (ro)", function () {
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (ro)", function () {
            expect(p.parse("Neemia 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neem 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NEEMIA 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEEM 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (ro)", function () {
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (ro)", function () {
            expect(p.parse("Esterei 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Estera 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Est 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESTEREI 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTERA 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("EST 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (ro)", function () {
            expect(p.parse("Iov 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IOV 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (ro)", function () {
            expect(p.parse("Cartea Psalmilor 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Psalmii 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Psalmul 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Psalmi 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Psalm 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CARTEA PSALMILOR 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PSALMII 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PSALMUL 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PSALMI 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PSALM 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (ro)", function () {
            expect(p.parse("Rugaciunea lui Azaria 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Rug??ciunea lui Azaria 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (ro)", function () {
            expect(p.parse("Proverbele lui Solomon 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pildele lui Solomon 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Proverbele 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Proverbe 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PROVERBELE LUI SOLOMON 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PILDELE LUI SOLOMON 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROVERBELE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROVERBE 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (ro)", function () {
            expect(p.parse("Ecclesiastul 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eclesiastul 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Ecleziastul 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Ecleziast 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Ecl 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ECCLESIASTUL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECLESIASTUL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECLEZIASTUL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECLEZIAST 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECL 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (ro)", function () {
            expect(p.parse("Cantarea celor trei tineri 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("C??ntarea celor trei tineri 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Cantarea celor trei evrei 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("C??ntarea celor trei evrei 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Trei tineri 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("3 tineri 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (ro)", function () {
            expect(p.parse("Cantarea lui Solomon 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??ntarea lui Solomon 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Cantarea Cantarilor 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Cantarea Cant??rilor 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Cantarea C??ntarilor 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Cantarea C??nt??rilor 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Cantarea cantarilor 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??ntarea Cantarilor 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??ntarea Cant??rilor 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??ntarea C??ntarilor 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??ntarea C??nt??rilor 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Cantari 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Cant??ri 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??ntari 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??nt??ri 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Cant 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??nt 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CANTAREA LUI SOLOMON 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??NTAREA LUI SOLOMON 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("CANTAREA CANTARILOR 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("CANTAREA CANT??RILOR 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("CANTAREA C??NTARILOR 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("CANTAREA C??NT??RILOR 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("CANTAREA CANTARILOR 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??NTAREA CANTARILOR 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??NTAREA CANT??RILOR 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??NTAREA C??NTARILOR 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??NTAREA C??NT??RILOR 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("CANTARI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("CANT??RI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??NTARI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??NT??RI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("CANT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("C??NT 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Wis (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (ro)", function () {
            expect(p.parse("Cartea intelepciunii lui Solomon 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Cartea in??elepciunii lui Solomon 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Cartea ??ntelepciunii lui Solomon 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Cartea ??n??elepciunii lui Solomon 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Intelepciunea lui Solomon 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("In??elepciunea lui Solomon 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("??ntelepciunea lui Solomon 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("??n??elepciunea lui Solomon 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Cartea Intelepciunii 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Cartea In??elepciunii 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Cartea ??ntelepciunii 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Cartea ??n??elepciunii 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Solomon 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Jer (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (ro)", function () {
            expect(p.parse("Ieremia 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Ier 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IEREMIA 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("IER 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (ro)", function () {
            expect(p.parse("Iezechiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezechiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezech 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezec 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Eze 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ez 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IEZECHIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZECHIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZECH 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEC 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZE 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZ 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (ro)", function () {
            expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (ro)", function () {
            expect(p.parse("Osea 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Os 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OSEA 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OS 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (ro)", function () {
            expect(p.parse("Ioel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Ioil 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("IOIL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (ro)", function () {
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (ro)", function () {
            expect(p.parse("Obadia 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Avdie 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OBADIA 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("AVDIE 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (ro)", function () {
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Iona 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("IONA 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (ro)", function () {
            expect(p.parse("Miheia 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mica 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MIHEIA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (ro)", function () {
            expect(p.parse("Naum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (ro)", function () {
            expect(p.parse("Habacuc 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Avacum 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HABACUC 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("AVACUM 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (ro)", function () {
            expect(p.parse("Sofonie 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Tefania 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("??efania 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("??efania 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Tef 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("??ef 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("??ef 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SOFONIE 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("TEFANIA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("??EFANIA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("??EFANIA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("TEF 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("??EF 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("??EF 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (ro)", function () {
            expect(p.parse("Agheu 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hagai 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AGHEU 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGAI 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (ro)", function () {
            expect(p.parse("Zaharia 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zah 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZAHARIA 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZAH 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (ro)", function () {
            expect(p.parse("Maleahi 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MALEAHI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (ro)", function () {
            expect(p.parse("Matei 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mat 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MATEI 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MAT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (ro)", function () {
            expect(p.parse("Marcu 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Marc 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mc 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MARCU 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARC 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MC 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (ro)", function () {
            expect(p.parse("Luca 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luc 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lc 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LUCA 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUC 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LC 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (ro)", function () {
            expect(p.parse("1. Ioan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Ioan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Ioan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Ioan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 In 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. IOAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. IOAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 IOAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I IOAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 IN 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (ro)", function () {
            expect(p.parse("II. Ioan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Ioan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Ioan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Ioan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 In 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. IOAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. IOAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II IOAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 IOAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 IN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (ro)", function () {
            expect(p.parse("III. Ioan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Ioan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Ioan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Ioan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 In 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("III. IOAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III IOAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. IOAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 IOAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 IN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (ro)", function () {
            expect(p.parse("Faptele Apostolilor 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Fapte Apostolilor 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Faptele 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F. Ap. 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F Ap. 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F. Ap 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Fapte 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F Ap 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F.A. 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Fapt 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F.A 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("FA. 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Fap 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("FA 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FAPTELE APOSTOLILOR 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("FAPTE APOSTOLILOR 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("FAPTELE 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F. AP. 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F AP. 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F. AP 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("FAPTE 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F AP 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F.A. 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("FAPT 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("F.A 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("FA. 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("FAP 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("FA 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rev (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (ro)", function () {
            expect(p.parse("Apocalipsa lui Ioan 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apocalipsa 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apoc 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Ap 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("APOCALIPSA LUI IOAN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APOCALIPSA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APOC 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("AP 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book John (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (ro)", function () {
            expect(p.parse("Ioan 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("In 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IOAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("IN 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Rom (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (ro)", function () {
            expect(p.parse("Romani 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ROMANI 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (ro)", function () {
            expect(p.parse("II. Corintieni 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corintieni 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corintieni 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Corinteni 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corintieni 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Corinteni 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Corinteni 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Corinteni 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Cor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Cor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Cor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Co 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Cor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Co 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Co 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Co 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. CORINTIENI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTIENI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTIENI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CORINTENI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTIENI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CORINTENI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CORINTENI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CORINTENI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. COR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. COR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II COR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. CO 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 COR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. CO 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II CO 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 CO 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (ro)", function () {
            expect(p.parse("1. Corintieni 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corintieni 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corintieni 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Corinteni 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corintieni 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Corinteni 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Corinteni 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Corinteni 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Cor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Cor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Cor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Co 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Cor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Co 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Co 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Co 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. CORINTIENI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTIENI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTIENI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CORINTENI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTIENI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CORINTENI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CORINTENI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CORINTENI 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. COR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. COR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 COR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. CO 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I COR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. CO 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 CO 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I CO 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (ro)", function () {
            expect(p.parse("Galateni 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("GALATENI 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (ro)", function () {
            expect(p.parse("Efeseni 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efes 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EFESENI 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFES 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (ro)", function () {
            expect(p.parse("Filipeni 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filip 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Fil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Flp 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FILIPENI 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIP 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FLP 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (ro)", function () {
            expect(p.parse("Coloseni 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("COLOSENI 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (ro)", function () {
            expect(p.parse("II. Tesaloniceni 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesaloniceni 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesaloniceni 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesaloniceni 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tes 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tes 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tes 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tes 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. TESALONICENI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESALONICENI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESALONICENI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESALONICENI 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TES 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TES 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TES 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TES 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (ro)", function () {
            expect(p.parse("1. Tesaloniceni 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesaloniceni 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesaloniceni 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesaloniceni 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tes 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tes 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tes 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tes 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. TESALONICENI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESALONICENI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESALONICENI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESALONICENI 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TES 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TES 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TES 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TES 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (ro)", function () {
            expect(p.parse("II. Timotei 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timotei 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timotei 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timotei 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. TIMOTEI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTEI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (ro)", function () {
            expect(p.parse("1. Timotei 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timotei 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timotei 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timotei 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. TIMOTEI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTEI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTEI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (ro)", function () {
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (ro)", function () {
            expect(p.parse("Filimon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filim 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FILIMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILIM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (ro)", function () {
            expect(p.parse("Evrei 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Evr 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVREI 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("EVR 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (ro)", function () {
            expect(p.parse("Iacob 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Iacov 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Iac 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IACOB 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("IACOV 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("IAC 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (ro)", function () {
            expect(p.parse("II. Petru 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petru 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Petru 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petru 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("II. PETRU 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETRU 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PETRU 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETRU 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (ro)", function () {
            expect(p.parse("1. Petru 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Petru 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petru 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Petru 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pt 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Pt 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pt 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Pt 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("1. PETRU 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PETRU 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETRU 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PETRU 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PT 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PT 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PT 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PT 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (ro)", function () {
            expect(p.parse("Iuda 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IUDA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (ro)", function () {
            expect(p.parse("Cartea lui Tobit 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobit 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (ro)", function () {
            expect(p.parse("Iudita 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (ro)", function () {
            expect(p.parse("Baruh 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (ro)", function () {
            expect(p.parse("Istoria Susanei 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Susanei 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Susana 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (ro)", function () {
            expect(p.parse("II. Macabei 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Macabei 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Macabei 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Macabei 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (ro)", function () {
            expect(p.parse("III. Macabei 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Macabei 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Macabei 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Macabei 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (ro)", function () {
            expect(p.parse("IV. Macabei 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Macabei 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Macabei 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Macabei 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (ro)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (ro)", function () {
            expect(p.parse("1. Macabei 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Macabei 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Macabei 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Macabei 1:1").osis()).toEqual("1Macc.1.1");
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
            return expect(p.languages).toEqual(["ro"]);
        });
        it("should handle ranges (ro)", function () {
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (ro)", function () {
            expect(p.parse("Titus 1:1, capitolele 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 CAPITOLELE 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, capitolul 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 CAPITOLUL 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, cap. 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 CAP. 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, cap 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 CAP 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (ro)", function () {
            expect(p.parse("Exod 1:1 versetul 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERSETUL 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 versetele 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERSETELE 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 versete 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERSETE 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 vers. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VERS. 6").osis()).toEqual("Phlm.1.6");
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
        it("should handle 'and' (ro)", function () {
            expect(p.parse("Exod 1:1 ??i 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 ??I 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 si 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 SI 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 cf. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 CF. 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 cf 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 CF 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 cp. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 CP. 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 cp 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 CP 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (ro)", function () {
            expect(p.parse("Ps 3 titlu, 4:2, 5:titlu").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLU, 4:2, 5:TITLU").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (ro)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (ro)", function () {
            expect(p.parse("Lev 1 (NTLR)").osis_and_translations()).toEqual([["Lev.1", "NTLR"]]);
            return expect(p.parse("lev 1 ntlr").osis_and_translations()).toEqual([["Lev.1", "NTLR"]]);
        });
        it("should handle book ranges (ro)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            return expect(p.parse("1 - 3  Ioan").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (ro)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=ro.spec.js.map