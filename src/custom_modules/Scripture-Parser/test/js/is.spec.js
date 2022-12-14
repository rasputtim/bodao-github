"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/is_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (is)", function () {
            expect(p.parse("Fyrsta bok Mose 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Fyrsta bok M??se 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Fyrsta b??k Mose 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Fyrsta b??k M??se 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Fyrsta Mosebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Fyrsta Moseb??k 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Fyrsta M??sebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Fyrsta M??seb??k 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mosebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Moseb??k 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. M??sebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. M??seb??k 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Mosebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Moseb??k 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. M??sebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. M??seb??k 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mosebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Moseb??k 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M??sebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M??seb??k 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Mosebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Moseb??k 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I M??sebok 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I M??seb??k 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Genesis 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. M??s 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. M??s 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M??s 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Mos 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I M??s 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1M??s 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FYRSTA BOK MOSE 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("FYRSTA BOK M??SE 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("FYRSTA B??K MOSE 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("FYRSTA B??K M??SE 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("FYRSTA MOSEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("FYRSTA MOSEB??K 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("FYRSTA M??SEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("FYRSTA M??SEB??K 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOSEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOSEB??K 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. M??SEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. M??SEB??K 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOSEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOSEB??K 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. M??SEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. M??SEB??K 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOSEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOSEB??K 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M??SEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M??SEB??K 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOSEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOSEB??K 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I M??SEBOK 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I M??SEB??K 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GENESIS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. M??S 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. M??S 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M??S 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I M??S 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1M??S 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (is)", function () {
            expect(p.parse("Onnur bok Mose 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Onnur bok M??se 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Onnur b??k Mose 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Onnur b??k M??se 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??nnur bok Mose 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??nnur bok M??se 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??nnur b??k Mose 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??nnur b??k M??se 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Onnur Mosebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Onnur Moseb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Onnur M??sebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Onnur M??seb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??nnur Mosebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??nnur Moseb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??nnur M??sebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??nnur M??seb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Mosebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Moseb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. M??sebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. M??seb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mosebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Moseb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. M??sebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. M??seb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Mosebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Moseb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II M??sebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II M??seb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mosebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Moseb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M??sebok 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M??seb??k 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. M??s 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. M??s 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exodus 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II M??s 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mos 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M??s 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2M??s 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ONNUR BOK MOSE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ONNUR BOK M??SE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ONNUR B??K MOSE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ONNUR B??K M??SE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??NNUR BOK MOSE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??NNUR BOK M??SE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??NNUR B??K MOSE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??NNUR B??K M??SE 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ONNUR MOSEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ONNUR MOSEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ONNUR M??SEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("ONNUR M??SEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??NNUR MOSEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??NNUR MOSEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??NNUR M??SEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("??NNUR M??SEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOSEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOSEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. M??SEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. M??SEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOSEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOSEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. M??SEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. M??SEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOSEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOSEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II M??SEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II M??SEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOSEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOSEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M??SEBOK 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M??SEB??K 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. M??S 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. M??S 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXODUS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II M??S 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M??S 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2M??S 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (is)", function () {
            expect(p.parse("Bel og drekinn 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (is)", function () {
            expect(p.parse("??ri??ja bok Mose 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??ri??ja bok M??se 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??ri??ja b??k Mose 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??ri??ja b??k M??se 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??ri??ja Mosebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??ri??ja Moseb??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??ri??ja M??sebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??ri??ja M??seb??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Mosebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Moseb??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. M??sebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. M??seb??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Mosebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Moseb??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III M??sebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III M??seb??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mosebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Moseb??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. M??sebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. M??seb??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mosebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Moseb??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M??sebok 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M??seb??k 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Leviticus 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. M??s 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III M??s 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. M??s 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mos 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M??s 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3M??s 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??RI??JA BOK MOSE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??RI??JA BOK M??SE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??RI??JA B??K MOSE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??RI??JA B??K M??SE 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??RI??JA MOSEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??RI??JA MOSEB??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??RI??JA M??SEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("??RI??JA M??SEB??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOSEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOSEB??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. M??SEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. M??SEB??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOSEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOSEB??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III M??SEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III M??SEB??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOSEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOSEB??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. M??SEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. M??SEB??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOSEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOSEB??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M??SEBOK 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M??SEB??K 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITICUS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. M??S 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III M??S 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. M??S 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M??S 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3M??S 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (is)", function () {
            expect(p.parse("Fjor??a bok Mose 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fjor??a bok M??se 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fjor??a b??k Mose 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fjor??a b??k M??se 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fj??r??a bok Mose 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fj??r??a bok M??se 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fj??r??a b??k Mose 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fj??r??a b??k M??se 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fjor??a Mosebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fjor??a Moseb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fjor??a M??sebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fjor??a M??seb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fj??r??a Mosebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fj??r??a Moseb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fj??r??a M??sebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Fj??r??a M??seb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Mosebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Moseb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. M??sebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. M??seb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mosebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Moseb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. M??sebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. M??seb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Mosebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Moseb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV M??sebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV M??seb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mosebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Moseb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M??sebok 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M??seb??k 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. M??s 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. M??s 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV M??s 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Numeri 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mos 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M??s 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4M??s 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FJOR??A BOK MOSE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJOR??A BOK M??SE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJOR??A B??K MOSE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJOR??A B??K M??SE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJ??R??A BOK MOSE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJ??R??A BOK M??SE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJ??R??A B??K MOSE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJ??R??A B??K M??SE 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJOR??A MOSEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJOR??A MOSEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJOR??A M??SEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJOR??A M??SEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJ??R??A MOSEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJ??R??A MOSEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJ??R??A M??SEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("FJ??R??A M??SEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOSEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOSEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. M??SEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. M??SEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOSEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOSEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. M??SEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. M??SEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOSEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOSEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV M??SEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV M??SEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOSEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOSEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M??SEBOK 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M??SEB??K 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. M??S 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. M??S 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV M??S 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUMERI 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOS 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M??S 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4M??S 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (is)", function () {
            expect(p.parse("Siraksbok 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Siraksb??k 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("S??raksbok 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("S??raksb??k 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("S??r 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (is)", function () {
            expect(p.parse("Speki Salomons 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Speki Sal??mons 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("SSal 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (is)", function () {
            expect(p.parse("Harmljo??in 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Harmlj????in 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Hlj 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HARMLJO??IN 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("HARMLJ????IN 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("HLJ 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (is)", function () {
            expect(p.parse("Bref Jeremia 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Bref Jerem??a 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Br??f Jeremia 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Br??f Jerem??a 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("BJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (is)", function () {
            expect(p.parse("Opinberunarbok Johannesar 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Opinberunarbok J??hannesar 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Opinberunarb??k Johannesar 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Opinberunarb??k J??hannesar 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Opinberun Johannesar 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Opinberun J??hannesar 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Opinberunarbokin 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Opinberunarb??kin 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Opb 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OPINBERUNARBOK JOHANNESAR 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPINBERUNARBOK J??HANNESAR 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPINBERUNARB??K JOHANNESAR 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPINBERUNARB??K J??HANNESAR 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPINBERUN JOHANNESAR 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPINBERUN J??HANNESAR 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPINBERUNARBOKIN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPINBERUNARB??KIN 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("OPB 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (is)", function () {
            expect(p.parse("B??n Manasse 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("BMn 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (is)", function () {
            expect(p.parse("Fimmta bok Mose 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Fimmta bok M??se 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Fimmta b??k Mose 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Fimmta b??k M??se 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Fimmta Mosebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Fimmta Moseb??k 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Fimmta M??sebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Fimmta M??seb??k 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deuteronomium 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mosebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Moseb??k 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. M??sebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. M??seb??k 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Mosebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Moseb??k 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. M??sebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. M??seb??k 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mosebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Moseb??k 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M??sebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M??seb??k 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Mosebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Moseb??k 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V M??sebok 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V M??seb??k 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. M??s 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. M??s 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M??s 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Mos 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V M??s 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5M??s 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FIMMTA BOK MOSE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FIMMTA BOK M??SE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FIMMTA B??K MOSE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FIMMTA B??K M??SE 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FIMMTA MOSEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FIMMTA MOSEB??K 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FIMMTA M??SEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("FIMMTA M??SEB??K 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUTERONOMIUM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOSEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOSEB??K 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. M??SEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. M??SEB??K 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOSEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOSEB??K 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. M??SEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. M??SEB??K 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOSEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOSEB??K 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M??SEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M??SEB??K 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOSEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOSEB??K 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V M??SEBOK 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V M??SEB??K 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. M??S 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. M??S 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M??S 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOS 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V M??S 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5M??S 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (is)", function () {
            expect(p.parse("Josuabok 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josuab??k 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jos??abok 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jos??ab??k 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??suabok 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??suab??k 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??s??abok 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??s??ab??k 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jos 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??s 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOSUABOK 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSUAB??K 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOS??ABOK 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOS??AB??K 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??SUABOK 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??SUAB??K 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??S??ABOK 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??S??AB??K 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOS 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??S 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (is)", function () {
            expect(p.parse("Domarabokin 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Domarab??kin 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("D??marabokin 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("D??marab??kin 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Domarabok 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Domarab??k 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("D??marabok 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("D??marab??k 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Dom 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("D??m 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DOMARABOKIN 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("DOMARAB??KIN 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("D??MARABOKIN 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("D??MARAB??KIN 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("DOMARABOK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("DOMARAB??K 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("D??MARABOK 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("D??MARAB??K 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("DOM 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("D??M 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (is)", function () {
            expect(p.parse("Rutarbok 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rutarb??k 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTARBOK 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUTARB??K 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (is)", function () {
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (is)", function () {
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (is)", function () {
            expect(p.parse("Jesaja 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Jes 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JESAJA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("JES 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (is)", function () {
            expect(p.parse("Si??ari Samuelsbok 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Si??ari Samuelsb??k 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Si??ari Sam??elsbok 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Si??ari Sam??elsb??k 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("S????ari Samuelsbok 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("S????ari Samuelsb??k 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("S????ari Sam??elsbok 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("S????ari Sam??elsb??k 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SI??ARI SAMUELSBOK 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("SI??ARI SAMUELSB??K 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("SI??ARI SAM??ELSBOK 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("SI??ARI SAM??ELSB??K 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("S????ARI SAMUELSBOK 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("S????ARI SAMUELSB??K 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("S????ARI SAM??ELSBOK 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("S????ARI SAM??ELSB??K 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (is)", function () {
            expect(p.parse("Fyrri Samuelsbok 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Fyrri Samuelsb??k 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Fyrri Sam??elsbok 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Fyrri Sam??elsb??k 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FYRRI SAMUELSBOK 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("FYRRI SAMUELSB??K 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("FYRRI SAM??ELSBOK 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("FYRRI SAM??ELSB??K 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (is)", function () {
            expect(p.parse("Si??ari bok konunganna 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Si??ari b??k konunganna 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("S????ari bok konunganna 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("S????ari b??k konunganna 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Si??ari Konungabok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Si??ari Konungab??k 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("S????ari Konungabok 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("S????ari Konungab??k 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("S????ari konungab??k 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kon 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SI??ARI BOK KONUNGANNA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("SI??ARI B??K KONUNGANNA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("S????ARI BOK KONUNGANNA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("S????ARI B??K KONUNGANNA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("SI??ARI KONUNGABOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("SI??ARI KONUNGAB??K 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("S????ARI KONUNGABOK 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("S????ARI KONUNGAB??K 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("S????ARI KONUNGAB??K 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KON 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (is)", function () {
            expect(p.parse("Fyrri bok konunganna 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Fyrri b??k konunganna 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Fyrri Konungabok 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Fyrri Konungab??k 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Fyrri konungab??k 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kon 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FYRRI BOK KONUNGANNA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("FYRRI B??K KONUNGANNA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("FYRRI KONUNGABOK 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("FYRRI KONUNGAB??K 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("FYRRI KONUNGAB??K 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KON 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (is)", function () {
            expect(p.parse("Si??ari Kronikubok 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Si??ari Kronikub??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Si??ari Kron??kubok 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Si??ari Kron??kub??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("S????ari Kronikubok 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("S????ari Kronikub??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("S????ari Kron??kubok 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("S????ari Kron??kub??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("S????ari kron??kub??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kro 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kro 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kro 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kro 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SI??ARI KRONIKUBOK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("SI??ARI KRONIKUB??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("SI??ARI KRON??KUBOK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("SI??ARI KRON??KUB??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("S????ARI KRONIKUBOK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("S????ARI KRONIKUB??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("S????ARI KRON??KUBOK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("S????ARI KRON??KUB??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("S????ARI KRON??KUB??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KRO 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRO 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KRO 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRO 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (is)", function () {
            expect(p.parse("Fyrri Kronikubok 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Fyrri Kronikub??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Fyrri Kron??kubok 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Fyrri Kron??kub??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Fyrri kron??kub??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kro 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kro 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kro 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kro 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FYRRI KRONIKUBOK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("FYRRI KRONIKUB??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("FYRRI KRON??KUBOK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("FYRRI KRON??KUB??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("FYRRI KRON??KUB??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRO 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KRO 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRO 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KRO 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (is)", function () {
            expect(p.parse("Esrabok 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Esrab??k 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Esr 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESRABOK 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ESRAB??K 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("ESR 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (is)", function () {
            expect(p.parse("Nehemiabok 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemiab??k 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehem??abok 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehem??ab??k 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NEHEMIABOK 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMIAB??K 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEM??ABOK 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEM??AB??K 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (is)", function () {
            expect(p.parse("Esterarbok hin griska 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Esterarbok hin gr??ska 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Esterarb??k hin griska 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Esterarb??k hin gr??ska 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (is)", function () {
            expect(p.parse("Esterarbok 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esterarb??k 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Est 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESTERARBOK 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTERARB??K 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("EST 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (is)", function () {
            expect(p.parse("Jobsbok 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Jobsb??k 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOBSBOK 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOBSB??K 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (is)", function () {
            expect(p.parse("Salmarnir 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("S??lmarnir 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Slm 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SALMARNIR 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("S??LMARNIR 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("SLM 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (is)", function () {
            expect(p.parse("B??n Asarja 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (is)", function () {
            expect(p.parse("Or??skvi??irnir 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Okv 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OR??SKVI??IRNIR 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("OKV 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (is)", function () {
            expect(p.parse("Predikarinn 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pr??dikarinn 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pred 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Pr??d 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PREDIKARINN 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PR??DIKARINN 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PRED 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("PR??D 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (is)", function () {
            expect(p.parse("Lofsongur ungmennanna ??riggja 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Lofs??ngur ungmennanna ??riggja 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (is)", function () {
            expect(p.parse("Ljo??aljo??in 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ljo??alj????in 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Lj????aljo??in 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Lj????alj????in 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ljl 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LJO??ALJO??IN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("LJO??ALJ????IN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("LJ????ALJO??IN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("LJ????ALJ????IN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("LJL 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (is)", function () {
            expect(p.parse("Jeremia 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jerem??a 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JEREMIA 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREM??A 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (is)", function () {
            expect(p.parse("Esekiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Esek??el 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Esk 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESEKIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ESEK??EL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("ESK 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (is)", function () {
            expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan??el 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN??EL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (is)", function () {
            expect(p.parse("Hosea 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("H??sea 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("H??s 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HOSEA 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("H??SEA 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("H??S 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (is)", function () {
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("J??el 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Jl 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("J??EL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JL 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (is)", function () {
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (is)", function () {
            expect(p.parse("Obadia 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad??a 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??badia 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??bad??a 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Ob 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??b 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OBADIA 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD??A 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??BADIA 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??BAD??A 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OB 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("??B 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (is)", function () {
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonas 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("J??nas 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jon 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("J??n 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAS 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("J??NAS 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JON 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("J??N 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (is)", function () {
            expect(p.parse("Mika 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("M??ka 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mik 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("M??k 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MIKA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("M??KA 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIK 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("M??K 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (is)", function () {
            expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah??m 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH??M 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (is)", function () {
            expect(p.parse("Habakkuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HABAKKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (is)", function () {
            expect(p.parse("Sefania 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sefan??a 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sef 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SEFANIA 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SEFAN??A 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SEF 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (is)", function () {
            expect(p.parse("Haggai 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hagga?? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HAGGAI 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAGGA?? 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (is)", function () {
            expect(p.parse("Sakaria 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Sakar??a 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Sak 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SAKARIA 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("SAKAR??A 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("SAK 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (is)", function () {
            expect(p.parse("Malaki 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malak?? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MALAKI 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALAK?? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (is)", function () {
            expect(p.parse("Matteusargu??spjall 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MATTEUSARGU??SPJALL 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (is)", function () {
            expect(p.parse("Markusargu??spjall 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark??sargu??spjall 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mrk 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MARKUSARGU??SPJALL 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK??SARGU??SPJALL 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MRK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (is)", function () {
            expect(p.parse("Lukasargu??spjall 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??kasargu??spjall 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??k 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LUKASARGU??SPJALL 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??KASARGU??SPJALL 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L??K 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (is)", function () {
            expect(p.parse("Fyrsta bref Johannesar hi?? almenna 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta bref J??hannesar hi?? almenna 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta br??f Johannesar hi?? almenna 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta br??f J??hannesar hi?? almenna 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta bref Johannesar 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta bref J??hannesar 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta br??f Johannesar 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta br??f J??hannesar 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta Johannesarbref 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta Johannesarbr??f 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta J??hannesarbref 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Fyrsta J??hannesarbr??f 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. J??h 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. J??h 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 J??h 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Joh 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I J??h 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FYRSTA BREF JOHANNESAR HI?? ALMENNA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA BREF J??HANNESAR HI?? ALMENNA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA BR??F JOHANNESAR HI?? ALMENNA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA BR??F J??HANNESAR HI?? ALMENNA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA BREF JOHANNESAR 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA BREF J??HANNESAR 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA BR??F JOHANNESAR 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA BR??F J??HANNESAR 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA JOHANNESARBREF 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA JOHANNESARBR??F 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA J??HANNESARBREF 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("FYRSTA J??HANNESARBR??F 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. J??H 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. J??H 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 J??H 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JOH 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I J??H 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (is)", function () {
            expect(p.parse("Anna?? bref Johannesar 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anna?? bref J??hannesar 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anna?? br??f Johannesar 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anna?? br??f J??hannesar 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anna?? Johannesarbref 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anna?? Johannesarbr??f 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anna?? J??hannesarbref 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Anna?? J??hannesarbr??f 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. J??h 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. J??h 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II J??h 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Joh 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 J??h 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ANNA?? BREF JOHANNESAR 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANNA?? BREF J??HANNESAR 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANNA?? BR??F JOHANNESAR 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANNA?? BR??F J??HANNESAR 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANNA?? JOHANNESARBREF 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANNA?? JOHANNESARBR??F 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANNA?? J??HANNESARBREF 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("ANNA?? J??HANNESARBR??F 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. J??H 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. J??H 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II J??H 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JOH 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 J??H 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (is)", function () {
            expect(p.parse("??ri??ja bref Johannesar 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??ri??ja bref J??hannesar 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??ri??ja br??f Johannesar 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??ri??ja br??f J??hannesar 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??ri??ja Johannesarbref 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??ri??ja Johannesarbr??f 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??ri??ja J??hannesarbref 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??ri??ja J??hannesarbr??f 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. J??h 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III J??h 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. J??h 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Joh 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 J??h 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("??RI??JA BREF JOHANNESAR 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??RI??JA BREF J??HANNESAR 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??RI??JA BR??F JOHANNESAR 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??RI??JA BR??F J??HANNESAR 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??RI??JA JOHANNESARBREF 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??RI??JA JOHANNESARBR??F 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??RI??JA J??HANNESARBREF 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("??RI??JA J??HANNESARBR??F 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. J??H 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III J??H 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. J??H 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JOH 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 J??H 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (is)", function () {
            expect(p.parse("Johannesargu??spjall 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J??hannesargu??spjall 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Joh 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J??h 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOHANNESARGU??SPJALL 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J??HANNESARGU??SPJALL 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOH 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J??H 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (is)", function () {
            expect(p.parse("Postulasagan 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Post 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("POSTULASAGAN 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("POST 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (is)", function () {
            expect(p.parse("Bref Pals til Romverja 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Bref Pals til R??mverja 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Bref P??ls til Romverja 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Bref P??ls til R??mverja 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Br??f Pals til Romverja 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Br??f Pals til R??mverja 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Br??f P??ls til Romverja 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Br??f P??ls til R??mverja 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Romverjabrefi?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Romverjabr??fi?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??mverjabrefi?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??mverjabr??fi?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??m 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BREF PALS TIL ROMVERJA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("BREF PALS TIL R??MVERJA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("BREF P??LS TIL ROMVERJA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("BREF P??LS TIL R??MVERJA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("BR??F PALS TIL ROMVERJA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("BR??F PALS TIL R??MVERJA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("BR??F P??LS TIL ROMVERJA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("BR??F P??LS TIL R??MVERJA 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMVERJABREFI?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROMVERJABR??FI?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??MVERJABREFI?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??MVERJABR??FI?? 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??M 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (is)", function () {
            expect(p.parse("Si??ara bref Pals til Korintumanna 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara bref P??ls til Korintumanna 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara br??f Pals til Korintumanna 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara br??f P??ls til Korintumanna 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara bref Pals til Korintumanna 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara bref P??ls til Korintumanna 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara br??f Pals til Korintumanna 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara br??f P??ls til Korintumanna 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara bref Pals til Kori 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara bref P??ls til Kori 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara br??f Pals til Kori 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara br??f P??ls til Kori 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara bref Pals til Kori 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara bref P??ls til Kori 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara br??f Pals til Kori 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara br??f P??ls til Kori 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara Korintubref 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara Korintubr??f 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara K??rintubref 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Si??ara K??rintubr??f 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara Korintubref 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara Korintubr??f 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara K??rintubref 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ara K??rintubr??f 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SI??ARA BREF PALS TIL KORINTUMANNA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL KORINTUMANNA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL KORINTUMANNA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL KORINTUMANNA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA BREF PALS TIL KORINTUMANNA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL KORINTUMANNA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL KORINTUMANNA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL KORINTUMANNA 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA BREF PALS TIL KORI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL KORI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL KORI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL KORI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA BREF PALS TIL KORI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL KORI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL KORI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL KORI 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA KORINTUBREF 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA KORINTUBR??F 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA K??RINTUBREF 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("SI??ARA K??RINTUBR??F 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA KORINTUBREF 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA KORINTUBR??F 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA K??RINTUBREF 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("S????ARA K??RINTUBR??F 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (is)", function () {
            expect(p.parse("Fyrra bref Pals til Korintumanna 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Fyrra bref P??ls til Korintumanna 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Fyrra br??f Pals til Korintumanna 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Fyrra br??f P??ls til Korintumanna 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Fyrra bref Pals til Korin 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Fyrra bref P??ls til Korin 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Fyrra br??f Pals til Korin 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Fyrra br??f P??ls til Korin 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Fyrra Korintubref 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Fyrra Korintubr??f 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FYRRA BREF PALS TIL KORINTUMANNA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL KORINTUMANNA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL KORINTUMANNA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL KORINTUMANNA 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("FYRRA BREF PALS TIL KORIN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL KORIN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL KORIN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL KORIN 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("FYRRA KORINTUBREF 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("FYRRA KORINTUBR??F 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (is)", function () {
            expect(p.parse("Bref Pals til Galatamanna 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Bref P??ls til Galatamanna 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Br??f Pals til Galatamanna 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Br??f P??ls til Galatamanna 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galatabrefi?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galatabr??fi?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BREF PALS TIL GALATAMANNA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("BREF P??LS TIL GALATAMANNA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("BR??F PALS TIL GALATAMANNA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("BR??F P??LS TIL GALATAMANNA 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATABREFI?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATABR??FI?? 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (is)", function () {
            expect(p.parse("Bref Pals til Efesusmanna 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Bref P??ls til Efesusmanna 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Br??f Pals til Efesusmanna 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Br??f P??ls til Efesusmanna 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efesusbrefi?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efesusbr??fi?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BREF PALS TIL EFESUSMANNA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("BREF P??LS TIL EFESUSMANNA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("BR??F PALS TIL EFESUSMANNA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("BR??F P??LS TIL EFESUSMANNA 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFESUSBREFI?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFESUSBR??FI?? 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (is)", function () {
            expect(p.parse("Bref Pals til Filippimanna 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Bref Pals til Filipp??manna 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Bref P??ls til Filippimanna 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Bref P??ls til Filipp??manna 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Br??f Pals til Filippimanna 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Br??f Pals til Filipp??manna 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Br??f P??ls til Filippimanna 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Br??f P??ls til Filipp??manna 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Bref Pals til Filippimann 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Bref Pals til Filipp??mann 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Bref P??ls til Filippimann 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Bref P??ls til Filipp??mann 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Br??f Pals til Filippimann 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Br??f Pals til Filipp??mann 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Br??f P??ls til Filippimann 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Br??f P??ls til Filipp??mann 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filippibrefi?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filippibr??fi?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipp??brefi?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipp??br??fi?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Fil 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BREF PALS TIL FILIPPIMANNA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BREF PALS TIL FILIPP??MANNA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BREF P??LS TIL FILIPPIMANNA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BREF P??LS TIL FILIPP??MANNA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BR??F PALS TIL FILIPPIMANNA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BR??F PALS TIL FILIPP??MANNA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BR??F P??LS TIL FILIPPIMANNA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BR??F P??LS TIL FILIPP??MANNA 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BREF PALS TIL FILIPPIMANN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BREF PALS TIL FILIPP??MANN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BREF P??LS TIL FILIPPIMANN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BREF P??LS TIL FILIPP??MANN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BR??F PALS TIL FILIPPIMANN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BR??F PALS TIL FILIPP??MANN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BR??F P??LS TIL FILIPPIMANN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("BR??F P??LS TIL FILIPP??MANN 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPPIBREFI?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPPIBR??FI?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPP??BREFI?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPP??BR??FI?? 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FIL 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (is)", function () {
            expect(p.parse("Bref Pals til Kolossumanna 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Bref Pals til K??lossumanna 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Bref P??ls til Kolossumanna 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Bref P??ls til K??lossumanna 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Br??f Pals til Kolossumanna 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Br??f Pals til K??lossumanna 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Br??f P??ls til Kolossumanna 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Br??f P??ls til K??lossumanna 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Bref Pals til Kolossumann 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Bref Pals til K??lossumann 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Bref P??ls til Kolossumann 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Bref P??ls til K??lossumann 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Br??f Pals til Kolossumann 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Br??f Pals til K??lossumann 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Br??f P??ls til Kolossumann 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Br??f P??ls til K??lossumann 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolossubrefi?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolossubr??fi?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolussubrefi?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolussubr??fi?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("K??lossubrefi?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("K??lossubr??fi?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("K??lussubrefi?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("K??lussubr??fi?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("K??l 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BREF PALS TIL KOLOSSUMANNA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BREF PALS TIL K??LOSSUMANNA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BREF P??LS TIL KOLOSSUMANNA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BREF P??LS TIL K??LOSSUMANNA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BR??F PALS TIL KOLOSSUMANNA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BR??F PALS TIL K??LOSSUMANNA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BR??F P??LS TIL KOLOSSUMANNA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BR??F P??LS TIL K??LOSSUMANNA 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BREF PALS TIL KOLOSSUMANN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BREF PALS TIL K??LOSSUMANN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BREF P??LS TIL KOLOSSUMANN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BREF P??LS TIL K??LOSSUMANN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BR??F PALS TIL KOLOSSUMANN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BR??F PALS TIL K??LOSSUMANN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BR??F P??LS TIL KOLOSSUMANN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("BR??F P??LS TIL K??LOSSUMANN 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSUBREFI?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSUBR??FI?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLUSSUBREFI?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLUSSUBR??FI?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("K??LOSSUBREFI?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("K??LOSSUBR??FI?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("K??LUSSUBREFI?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("K??LUSSUBR??FI?? 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("K??L 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (is)", function () {
            expect(p.parse("Si??ara bref Pals til ??essalonikumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara bref Pals til ??essalon??kumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara bref P??ls til ??essalonikumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara bref P??ls til ??essalon??kumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara br??f Pals til ??essalonikumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara br??f Pals til ??essalon??kumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara br??f P??ls til ??essalonikumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara br??f P??ls til ??essalon??kumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara bref Pals til ??essalonikumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara bref Pals til ??essalon??kumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara bref P??ls til ??essalonikumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara bref P??ls til ??essalon??kumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara br??f Pals til ??essalonikumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara br??f Pals til ??essalon??kumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara br??f P??ls til ??essalonikumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara br??f P??ls til ??essalon??kumanna 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara bref Pals til ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara bref P??ls til ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara br??f Pals til ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara br??f P??ls til ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara bref Pals til ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara bref P??ls til ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara br??f Pals til ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara br??f P??ls til ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara ??essalonikubref 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara ??essalonikubr??f 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara ??essalon??kubref 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Si??ara ??essalon??kubr??f 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara ??essalonikubref 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara ??essalonikubr??f 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara ??essalon??kubref 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ara ??essalon??kubr??f 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ??ess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SI??ARA BREF PALS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BREF PALS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BREF PALS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BREF PALS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BREF PALS TIL ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BREF PALS TIL ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA ??ESSALONIKUBREF 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA ??ESSALONIKUBR??F 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA ??ESSALON??KUBREF 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("SI??ARA ??ESSALON??KUBR??F 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA ??ESSALONIKUBREF 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA ??ESSALONIKUBR??F 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA ??ESSALON??KUBREF 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("S????ARA ??ESSALON??KUBR??F 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 ??ESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (is)", function () {
            expect(p.parse("Fyrra bref Pals til ??essalonikumanna 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra bref Pals til ??essalon??kumanna 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra bref P??ls til ??essalonikumanna 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra bref P??ls til ??essalon??kumanna 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra br??f Pals til ??essalonikumanna 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra br??f Pals til ??essalon??kumanna 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra br??f P??ls til ??essalonikumanna 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra br??f P??ls til ??essalon??kumanna 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra bref Pals til ??essa 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra bref P??ls til ??essa 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra br??f Pals til ??essa 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra br??f P??ls til ??essa 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra ??essalonikubref 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra ??essalonikubr??f 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra ??essalon??kubref 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Fyrra ??essalon??kubr??f 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ??ess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ??ess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ??ess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ??ess 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FYRRA BREF PALS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BREF PALS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL ??ESSALONIKUMANNA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL ??ESSALON??KUMANNA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BREF PALS TIL ??ESSA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL ??ESSA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL ??ESSA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL ??ESSA 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA ??ESSALONIKUBREF 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA ??ESSALONIKUBR??F 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA ??ESSALON??KUBREF 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("FYRRA ??ESSALON??KUBR??F 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. ??ESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. ??ESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 ??ESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I ??ESS 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (is)", function () {
            expect(p.parse("Si??ara bref Pals til Timoteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref Pals til Tim??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref Pals til T??moteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref Pals til T??m??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref P??ls til Timoteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref P??ls til Tim??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref P??ls til T??moteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref P??ls til T??m??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f Pals til Timoteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f Pals til Tim??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f Pals til T??moteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f Pals til T??m??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f P??ls til Timoteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f P??ls til Tim??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f P??ls til T??moteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f P??ls til T??m??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref Pals til Timoteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref Pals til Tim??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref Pals til T??moteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref Pals til T??m??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref P??ls til Timoteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref P??ls til Tim??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref P??ls til T??moteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref P??ls til T??m??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f Pals til Timoteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f Pals til Tim??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f Pals til T??moteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f Pals til T??m??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f P??ls til Timoteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f P??ls til Tim??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f P??ls til T??moteusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f P??ls til T??m??teusar 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref Pals til Timo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref Pals til Tim?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref Pals til T??mo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref Pals til T??m?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref P??ls til Timo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref P??ls til Tim?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref P??ls til T??mo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara bref P??ls til T??m?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f Pals til Timo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f Pals til Tim?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f Pals til T??mo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f Pals til T??m?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f P??ls til Timo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f P??ls til Tim?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f P??ls til T??mo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara br??f P??ls til T??m?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref Pals til Timo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref Pals til Tim?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref Pals til T??mo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref Pals til T??m?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref P??ls til Timo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref P??ls til Tim?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref P??ls til T??mo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara bref P??ls til T??m?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f Pals til Timo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f Pals til Tim?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f Pals til T??mo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f Pals til T??m?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f P??ls til Timo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f P??ls til Tim?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f P??ls til T??mo 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara br??f P??ls til T??m?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara Timoteusarbref 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara Timoteusarbr??f 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara Tim??teusarbref 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara Tim??teusarbr??f 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara T??moteusarbref 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara T??moteusarbr??f 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara T??m??teusarbref 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Si??ara T??m??teusarbr??f 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara Timoteusarbref 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara Timoteusarbr??f 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara Tim??teusarbref 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara Tim??teusarbr??f 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara T??moteusarbref 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara T??moteusarbr??f 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara T??m??teusarbref 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ara T??m??teusarbr??f 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. T??m 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. T??m 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II T??m 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 T??m 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SI??ARA BREF PALS TIL TIMOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF PALS TIL TIM??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF PALS TIL T??MOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF PALS TIL T??M??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL TIMOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL TIM??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL T??MOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL T??M??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL TIMOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL TIM??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL T??MOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL T??M??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL TIMOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL TIM??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL T??MOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL T??M??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF PALS TIL TIMOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF PALS TIL TIM??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF PALS TIL T??MOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF PALS TIL T??M??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL TIMOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL TIM??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL T??MOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL T??M??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL TIMOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL TIM??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL T??MOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL T??M??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL TIMOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL TIM??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL T??MOTEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL T??M??TEUSAR 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF PALS TIL TIMO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF PALS TIL TIM?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF PALS TIL T??MO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF PALS TIL T??M?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL TIMO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL TIM?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL T??MO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BREF P??LS TIL T??M?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL TIMO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL TIM?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL T??MO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F PALS TIL T??M?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL TIMO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL TIM?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL T??MO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA BR??F P??LS TIL T??M?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF PALS TIL TIMO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF PALS TIL TIM?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF PALS TIL T??MO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF PALS TIL T??M?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL TIMO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL TIM?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL T??MO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BREF P??LS TIL T??M?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL TIMO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL TIM?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL T??MO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F PALS TIL T??M?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL TIMO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL TIM?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL T??MO 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA BR??F P??LS TIL T??M?? 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA TIMOTEUSARBREF 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA TIMOTEUSARBR??F 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA TIM??TEUSARBREF 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA TIM??TEUSARBR??F 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA T??MOTEUSARBREF 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA T??MOTEUSARBR??F 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA T??M??TEUSARBREF 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("SI??ARA T??M??TEUSARBR??F 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA TIMOTEUSARBREF 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA TIMOTEUSARBR??F 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA TIM??TEUSARBREF 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA TIM??TEUSARBR??F 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA T??MOTEUSARBREF 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA T??MOTEUSARBR??F 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA T??M??TEUSARBREF 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("S????ARA T??M??TEUSARBR??F 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. T??M 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. T??M 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II T??M 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 T??M 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (is)", function () {
            expect(p.parse("Fyrra bref Pals til Timoteusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref Pals til Tim??teusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref Pals til T??moteusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref Pals til T??m??teusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref P??ls til Timoteusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref P??ls til Tim??teusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref P??ls til T??moteusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref P??ls til T??m??teusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f Pals til Timoteusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f Pals til Tim??teusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f Pals til T??moteusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f Pals til T??m??teusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f P??ls til Timoteusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f P??ls til Tim??teusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f P??ls til T??moteusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f P??ls til T??m??teusar 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref Pals til Timot 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref Pals til Tim??t 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref Pals til T??mot 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref Pals til T??m??t 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref P??ls til Timot 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref P??ls til Tim??t 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref P??ls til T??mot 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra bref P??ls til T??m??t 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f Pals til Timot 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f Pals til Tim??t 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f Pals til T??mot 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f Pals til T??m??t 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f P??ls til Timot 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f P??ls til Tim??t 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f P??ls til T??mot 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra br??f P??ls til T??m??t 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra Timoteusarbref 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra Timoteusarbr??f 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra Tim??teusarbref 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra Tim??teusarbr??f 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra T??moteusarbref 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra T??moteusarbr??f 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra T??m??teusarbref 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Fyrra T??m??teusarbr??f 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. T??m 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. T??m 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 T??m 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I T??m 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FYRRA BREF PALS TIL TIMOTEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF PALS TIL TIM??TEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF PALS TIL T??MOTEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF PALS TIL T??M??TEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL TIMOTEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL TIM??TEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL T??MOTEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL T??M??TEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL TIMOTEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL TIM??TEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL T??MOTEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL T??M??TEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL TIMOTEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL TIM??TEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL T??MOTEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL T??M??TEUSAR 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF PALS TIL TIMOT 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF PALS TIL TIM??T 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF PALS TIL T??MOT 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF PALS TIL T??M??T 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL TIMOT 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL TIM??T 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL T??MOT 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BREF P??LS TIL T??M??T 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL TIMOT 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL TIM??T 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL T??MOT 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F PALS TIL T??M??T 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL TIMOT 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL TIM??T 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL T??MOT 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA BR??F P??LS TIL T??M??T 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA TIMOTEUSARBREF 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA TIMOTEUSARBR??F 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA TIM??TEUSARBREF 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA TIM??TEUSARBR??F 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA T??MOTEUSARBREF 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA T??MOTEUSARBR??F 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA T??M??TEUSARBREF 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("FYRRA T??M??TEUSARBR??F 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. T??M 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. T??M 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 T??M 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I T??M 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (is)", function () {
            expect(p.parse("Bref Pals til Titusar 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Bref Pals til T??tusar 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Bref P??ls til Titusar 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Bref P??ls til T??tusar 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Br??f Pals til Titusar 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Br??f Pals til T??tusar 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Br??f P??ls til Titusar 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Br??f P??ls til T??tusar 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titusarbrefi?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titusarbr??fi?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??tusarbrefi?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??tusarbr??fi?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titusarbref 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titusarbr??f 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??tusarbref 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??tusarbr??f 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??t 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BREF PALS TIL TITUSAR 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("BREF PALS TIL T??TUSAR 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("BREF P??LS TIL TITUSAR 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("BREF P??LS TIL T??TUSAR 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("BR??F PALS TIL TITUSAR 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("BR??F PALS TIL T??TUSAR 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("BR??F P??LS TIL TITUSAR 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("BR??F P??LS TIL T??TUSAR 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUSARBREFI?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUSARBR??FI?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TUSARBREFI?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TUSARBR??FI?? 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUSARBREF 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUSARBR??F 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TUSARBREF 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TUSARBR??F 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??T 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (is)", function () {
            expect(p.parse("Bref Pals til Filemons 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Bref Pals til F??lemons 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Bref P??ls til Filemons 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Bref P??ls til F??lemons 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Br??f Pals til Filemons 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Br??f Pals til F??lemons 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Br??f P??ls til Filemons 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Br??f P??ls til F??lemons 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemonsbrefi?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemonsbr??fi?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("F??lemonsbrefi?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("F??lemonsbr??fi?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Film 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("F??lm 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BREF PALS TIL FILEMONS 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("BREF PALS TIL F??LEMONS 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("BREF P??LS TIL FILEMONS 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("BREF P??LS TIL F??LEMONS 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("BR??F PALS TIL FILEMONS 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("BR??F PALS TIL F??LEMONS 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("BR??F P??LS TIL FILEMONS 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("BR??F P??LS TIL F??LEMONS 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMONSBREFI?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMONSBR??FI?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("F??LEMONSBREFI?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("F??LEMONSBR??FI?? 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("F??LM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (is)", function () {
            expect(p.parse("Brefi?? til Hebrea 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Br??fi?? til Hebrea 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebreabrefi?? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebreabr??fi?? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("BREFI?? TIL HEBREA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("BR??FI?? TIL HEBREA 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBREABREFI?? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBREABR??FI?? 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (is)", function () {
            expect(p.parse("Hi?? almenna bref Jakobs 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Hi?? almenna br??f Jakobs 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakobsbrefi?? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakobsbr??fi?? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HI?? ALMENNA BREF JAKOBS 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("HI?? ALMENNA BR??F JAKOBS 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKOBSBREFI?? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKOBSBR??FI?? 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (is)", function () {
            expect(p.parse("Si??ara almenna bref Peturs 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Si??ara almenna bref P??turs 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Si??ara almenna br??f Peturs 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Si??ara almenna br??f P??turs 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ara almenna bref Peturs 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ara almenna bref P??turs 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ara almenna br??f Peturs 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ara almenna br??f P??turs 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Si??ara Petursbref 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Si??ara Petursbr??f 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Si??ara P??tursbref 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Si??ara P??tursbr??f 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ara Petursbref 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ara Petursbr??f 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ara P??tursbref 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ara P??tursbr??f 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. P??t 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. P??t 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II P??t 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 P??t 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SI??ARA ALMENNA BREF PETURS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("SI??ARA ALMENNA BREF P??TURS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("SI??ARA ALMENNA BR??F PETURS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("SI??ARA ALMENNA BR??F P??TURS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ARA ALMENNA BREF PETURS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ARA ALMENNA BREF P??TURS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ARA ALMENNA BR??F PETURS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ARA ALMENNA BR??F P??TURS 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("SI??ARA PETURSBREF 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("SI??ARA PETURSBR??F 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("SI??ARA P??TURSBREF 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("SI??ARA P??TURSBR??F 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ARA PETURSBREF 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ARA PETURSBR??F 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ARA P??TURSBREF 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("S????ARA P??TURSBR??F 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. P??T 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. P??T 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II P??T 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 P??T 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (is)", function () {
            expect(p.parse("Fyrra almenna bref Peturs 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Fyrra almenna bref P??turs 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Fyrra almenna br??f Peturs 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Fyrra almenna br??f P??turs 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Fyrra Petursbref 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Fyrra Petursbr??f 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Fyrra P??tursbref 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Fyrra P??tursbr??f 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. P??t 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. P??t 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 P??t 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I P??t 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("FYRRA ALMENNA BREF PETURS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("FYRRA ALMENNA BREF P??TURS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("FYRRA ALMENNA BR??F PETURS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("FYRRA ALMENNA BR??F P??TURS 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("FYRRA PETURSBREF 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("FYRRA PETURSBR??F 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("FYRRA P??TURSBREF 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("FYRRA P??TURSBR??F 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. P??T 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. P??T 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 P??T 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I P??T 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (is)", function () {
            expect(p.parse("Hi?? almenna bref Judasar 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Hi?? almenna bref J??dasar 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Hi?? almenna br??f Judasar 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Hi?? almenna br??f J??dasar 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judasarbrefi?? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judasarbr??fi?? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??dasarbrefi?? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??dasarbr??fi?? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judasarbref 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judasarbr??f 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??dasarbref 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??dasarbr??f 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jud 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??d 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HI?? ALMENNA BREF JUDASAR 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("HI?? ALMENNA BREF J??DASAR 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("HI?? ALMENNA BR??F JUDASAR 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("HI?? ALMENNA BR??F J??DASAR 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDASARBREFI?? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDASARBR??FI?? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??DASARBREFI?? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??DASARBR??FI?? 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDASARBREF 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDASARBR??F 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??DASARBREF 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??DASARBR??F 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUD 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??D 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (is)", function () {
            expect(p.parse("Tobitsbok 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobitsb??k 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob??tsbok 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob??tsb??k 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??bitsbok 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??bitsb??k 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??b??tsbok 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??b??tsb??k 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (is)", function () {
            expect(p.parse("Juditarbok 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Juditarb??k 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jud??tarbok 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jud??tarb??k 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("J??ditarbok 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("J??ditarb??k 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("J??d??tarbok 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("J??d??tarb??k 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Judt 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("J??dt 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (is)", function () {
            expect(p.parse("Baruksbok 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Baruksb??k 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar??ksbok 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar??ksb??k 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (is)", function () {
            expect(p.parse("Susanna 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("S??sanna 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (is)", function () {
            expect(p.parse("Onnur Makkabeabok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Onnur Makkabeab??k 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("??nnur Makkabeabok 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("??nnur Makkabeab??k 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makk 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (is)", function () {
            expect(p.parse("??ri??ja Makkabeabok 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("??ri??ja Makkabeab??k 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makk 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (is)", function () {
            expect(p.parse("Fjor??a Makkabeabok 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Fjor??a Makkabeab??k 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Fj??r??a Makkabeabok 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Fj??r??a Makkabeab??k 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makk 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (is)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (is)", function () {
            expect(p.parse("Fyrsta Makkabeabok 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Fyrsta Makkabeab??k 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makk 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Makk 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makk 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Makk 1:1").osis()).toEqual("1Macc.1.1");
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
            return expect(p.languages).toEqual(["is"]);
        });
        it("should handle ranges (is)", function () {
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (is)", function () {
            expect(p.parse("Titus 1:1, kafli 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAFLI 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kafla 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAFLA 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kap??tuli 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAP??TULI 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapituli 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 KAPITULI 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (is)", function () {
            expect(p.parse("Exod 1:1 vers 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm VERS 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (is)", function () {
            expect(p.parse("Exod 1:1 og 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 OG 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (is)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (is)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (is)", function () {
            expect(p.parse("Lev 1 (B20)").osis_and_translations()).toEqual([["Lev.1", "B20"]]);
            return expect(p.parse("lev 1 b20").osis_and_translations()).toEqual([["Lev.1", "B20"]]);
        });
        it("should handle book ranges (is)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            expect(p.parse("1 - 3  Joh").osis()).toEqual("1John.1-3John.1");
            return expect(p.parse("1 - 3  J??h").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (is)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=is.spec.js.map