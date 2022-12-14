"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/sk_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (sk)", function () {
            expect(p.parse("Prva kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prva kniha Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prva kniha Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prva kniha Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? kniha Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? kniha Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? kniha Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvy list Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvy list Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvy list Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvy list Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? list Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? list Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? list Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? list Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Kniha stvorenia 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 k. Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 k. Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 k. Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 k. Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prva Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prva Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prva Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prva Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvy Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvy Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvy Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvy Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prv?? Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 k Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 k Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 k Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 k Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K. stvorenia 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Kniha povodu 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Kniha p??vodu 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K stvorenia 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K. povodu 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K. p??vodu 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K povodu 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K p??vodu 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Genezis 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gn 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVA KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVY LIST MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVY LIST MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVY LIST MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVY LIST MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? LIST MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? LIST MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? LIST MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? LIST MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("KNIHA STVORENIA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 K. MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 K. MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 K. MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 K. MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVA MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVA MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVA MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVY MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVY MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVY MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVY MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRV?? MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 K MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 K MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 K MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 K MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K. STVORENIA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("KNIHA POVODU 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("KNIHA P??VODU 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K STVORENIA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K. POVODU 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K. P??VODU 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K POVODU 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("K P??VODU 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GENEZIS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 M 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (sk)", function () {
            expect(p.parse("Druha kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha kniha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha kniha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha kniha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy list Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy list Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy list Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy list Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? list Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? list Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? list Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? list Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 k. Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 k. Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 k. Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 k. Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 k Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 k Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 k Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 k Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exodus 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Ex 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY LIST MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY LIST MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY LIST MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY LIST MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? LIST MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? LIST MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? LIST MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? LIST MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 K. MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 K. MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 K. MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 K. MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 K MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 K MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 K MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 K MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXODUS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 M 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EX 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (sk)", function () {
            expect(p.parse("Bel a drak 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l a drak 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (sk)", function () {
            expect(p.parse("Tretia kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tretia kniha Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tretia kniha Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tretia kniha Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tretia Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tretia Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tretia Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tretia Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 k. Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 k. Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 k. Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 k. Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 k Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 k Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 k Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 k Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Levitikus 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lv 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TRETIA KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETIA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETIA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETIA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETIA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETIA MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETIA MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETIA MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 K. MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 K. MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 K. MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 K. MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 K MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 K MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 K MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 K MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITIKUS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 M 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (sk)", function () {
            expect(p.parse("Stvrta kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrta kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrta kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrta kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrt?? kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrt?? kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrt?? kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrt?? kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrta Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrta Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrta Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrta Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrt?? Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrt?? Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrt?? Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Stvrt?? Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 k. Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 k. Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 k. Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 k. Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 k Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 k Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 k Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 k Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Numeri 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Nm 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("STVRTA KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRTA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRTA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRTA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRT?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRT?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRT?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRT?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRTA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRTA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRTA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRTA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRT?? MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRT?? MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRT?? MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("STVRT?? MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 K. MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 K. MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 K. MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 K. MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 K MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 K MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 K MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 K MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUMERI 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 M 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NM 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (sk)", function () {
            expect(p.parse("Kniha Sirachovho syna 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Kniha Ekleziastikus 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("K. Sirachovho syna 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Kniha Sirachovcova 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("K Sirachovho syna 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("K. Ekleziastikus 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Kniha Sirachovca 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("K Ekleziastikus 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("K. Sirachovcova 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("K Sirachovcova 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("K. Sirachovca 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("K Sirachovca 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirachovcova 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirachovec 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (sk)", function () {
            expect(p.parse("Mudrosti 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("M??drosti 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Mudrost 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Mudros?? 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("M??drost 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("M??dros?? 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Mud 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("M??d 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (sk)", function () {
            expect(p.parse("Jeremiasov Plac 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Jeremiasov Pla?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Jeremia??ov Plac 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Jeremia??ov Pla?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Jeremi??sov Plac 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Jeremi??sov Pla?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Jeremi????ov Plac 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Jeremi????ov Pla?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremiasov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremia??ov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremi??sov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremi????ov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremiasov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremia??ov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremi??sov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremi????ov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kniha narekov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kniha n??rekov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("K. narekov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("K. n??rekov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("K narekov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("K n??rekov 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Zalospevy 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("??alospevy 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Nareky 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("N??reky 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Zalosp 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("??alosp 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Nar 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("N??r 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JEREMIASOV PLAC 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("JEREMIASOV PLA?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("JEREMIA??OV PLAC 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("JEREMIA??OV PLA?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("JEREMI??SOV PLAC 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("JEREMI??SOV PLA?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("JEREMI????OV PLAC 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("JEREMI????OV PLA?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMIASOV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMIA??OV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMI??SOV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMI????OV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMIASOV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMIA??OV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMI??SOV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMI????OV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KNIHA NAREKOV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KNIHA N??REKOV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("K. NAREKOV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("K. N??REKOV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("K NAREKOV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("K N??REKOV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("ZALOSPEVY 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("??ALOSPEVY 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("NAREKY 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("N??REKY 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("ZALOSP 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("??ALOSP 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("NAR 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("N??R 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (sk)", function () {
            expect(p.parse("Jeremiasov list 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Jeremia??ov list 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Jeremi??sov list 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("Jeremi????ov list 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (sk)", function () {
            expect(p.parse("Zjavenie Apostola Jana 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie Apostola J??na 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie Apo??tola Jana 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie Apo??tola J??na 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie svateho Jana 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie svateho J??na 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie svat??ho Jana 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie svat??ho J??na 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie sv??teho Jana 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie sv??teho J??na 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie sv??t??ho Jana 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie sv??t??ho J??na 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie Jana 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie J??na 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apokalypsa 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjavenie 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjav 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjv 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zj 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZJAVENIE APOSTOLA JANA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE APOSTOLA J??NA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE APO??TOLA JANA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE APO??TOLA J??NA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE SVATEHO JANA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE SVATEHO J??NA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE SVAT??HO JANA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE SVAT??HO J??NA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE SV??TEHO JANA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE SV??TEHO J??NA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE SV??T??HO JANA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE SV??T??HO J??NA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE JANA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE J??NA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APOKALYPSA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAVENIE 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJAV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJ 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (sk)", function () {
            expect(p.parse("Manasesova modlitba 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (sk)", function () {
            expect(p.parse("Piata kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Piata kniha Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Piata kniha Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Piata kniha Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Piata Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Piata Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Piata Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Piata Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 k. Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 k. Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 k. Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 k. Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 k Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 k Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 k Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 k Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deuteronomium 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deuteron??mium 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Dt 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PIATA KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PIATA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PIATA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PIATA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PIATA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PIATA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PIATA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PIATA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 K. MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 K. MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 K. MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 K. MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 K MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 K MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 K MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 K MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUTERONOMIUM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUTERON??MIUM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 M 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (sk)", function () {
            expect(p.parse("Josuova 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jozuova 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jo??uova 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??zuova 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Iosua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jozua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jozue 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jo??ua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??zua 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Joz 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOSUOVA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOZUOVA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JO??UOVA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??ZUOVA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("IOSUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOZUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOZUE 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JO??UA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("J??ZUA 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOZ 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (sk)", function () {
            expect(p.parse("K. sudcov 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("K sudcov 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Sudcovia 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Sudcov 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Sdc 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Sud 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("K. SUDCOV 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("K SUDCOV 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("SUDCOVIA 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("SUDCOV 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("SDC 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("SUD 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (sk)", function () {
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("R??t 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("R??T 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (sk)", function () {
            expect(p.parse("Prva kniha Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva kniha Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva kniha Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva kniha Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? kniha Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? kniha Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? kniha Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? kniha Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy list Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy list Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy list Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy list Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? list Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? list Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? list Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? list Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva kniha Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva kniha Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva kniha Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva kniha Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? kniha Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? kniha Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? kniha Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? kniha Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy list Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy list Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy list Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy list Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? list Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? list Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? list Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? list Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k. Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k. Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k. Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k. Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k. Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k. Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k. Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k. Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdrasova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdra??ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdr??sova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdr????ova 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prva Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvy Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prv?? Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 k Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1. Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I. Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1 Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("I Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1");
            return true;
        });
    });
    describe("Localized book 2Esd (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (sk)", function () {
            expect(p.parse("Druha kniha Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha kniha Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha kniha Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha kniha Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? kniha Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? kniha Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? kniha Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? kniha Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy list Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy list Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy list Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy list Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? list Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? list Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? list Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? list Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha kniha Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha kniha Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha kniha Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha kniha Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? kniha Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? kniha Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? kniha Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? kniha Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy list Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy list Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy list Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy list Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? list Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? list Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? list Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? list Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k. Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k. Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k. Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k. Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druha Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druhy Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("Druh?? Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdrasova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdra??ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdr??sova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdr????ova 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k. Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k. Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k. Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k. Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 k Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II. Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2. Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("II Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdras 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdra?? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdr??s 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2 Ezdr???? 1:1").osis()).toEqual("2Esd.1.1");
            expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1");
            return true;
        });
    });
    describe("Localized book Isa (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (sk)", function () {
            expect(p.parse("Izaias 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Izaia?? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Izai??s 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Izai???? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Izajas 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Izaja?? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Izaj??s 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Izaj???? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("Iz 1:1").osis()).toEqual("Isa.1.1");
            p.include_apocrypha(false);
            expect(p.parse("IZAIAS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZAIA?? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZAI??S 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZAI???? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZAJAS 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZAJA?? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZAJ??S 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZAJ???? 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1");
            expect(p.parse("IZ 1:1").osis()).toEqual("Isa.1.1");
            return true;
        });
    });
    describe("Localized book 2Sam (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (sk)", function () {
            expect(p.parse("Druha kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druhy list Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? list Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druhy Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 k. Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 k Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 S 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHY LIST SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? LIST SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHY SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 K. SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 K SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 S 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (sk)", function () {
            expect(p.parse("Prva kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prv?? kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvy list Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prv?? list Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 k. Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prva Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvy Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prv?? Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prv?? Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 k Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 S 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVA KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRV?? KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVY LIST SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRV?? LIST SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 K. SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVY SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRV?? SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRV?? SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 K SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 S 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (sk)", function () {
            expect(p.parse("Stvrta kniha Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrta kniha Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrta kniha Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrta kniha Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrt?? kniha Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrt?? kniha Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrt?? kniha Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrt?? kniha Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrta kniha Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrta kniha Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrta kniha Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrta kniha Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrt?? kniha Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrt?? kniha Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrt?? kniha Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrt?? kniha Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha kniha Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha kniha Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha kniha Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha kniha Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy list Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy list Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy list Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy list Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? list Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? list Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? list Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? list Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrta Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrta Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrta Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrta Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrt?? Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrt?? Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrt?? Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Stvrt?? Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrta Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrta Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrta Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrta Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrt?? Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrt?? Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrt?? Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??tvrt?? Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 k. Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 k. Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 k. Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 k. Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 k. Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 k. Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 k. Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 k. Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 k Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 k Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 k Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 k Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 k Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 k Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 k Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 k Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 Kralov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 Kra??ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 Kr??lov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 Kr????ov 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Krl 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kr?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kr 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("STVRTA KNIHA KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRTA KNIHA KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRTA KNIHA KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRTA KNIHA KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRT?? KNIHA KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRT?? KNIHA KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRT?? KNIHA KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRT?? KNIHA KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRTA KNIHA KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRTA KNIHA KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRTA KNIHA KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRTA KNIHA KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRT?? KNIHA KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRT?? KNIHA KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRT?? KNIHA KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRT?? KNIHA KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KNIHA KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KNIHA KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KNIHA KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KNIHA KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY LIST KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY LIST KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY LIST KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY LIST KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? LIST KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? LIST KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? LIST KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? LIST KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRTA KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRTA KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRTA KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRTA KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRT?? KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRT?? KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRT?? KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("STVRT?? KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRTA KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRTA KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRTA KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRTA KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRT?? KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRT?? KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRT?? KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("??TVRT?? KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K. KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K. KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K. KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K. KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 K. KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 K. KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 K. KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 K. KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 K KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 K KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 K KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 K KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 K KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV. KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4. KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("IV KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 KRALOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 KRA??OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 KR??LOV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("4 KR????OV 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KRL 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KR?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (sk)", function () {
            expect(p.parse("Tretia kniha Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tretia kniha Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tretia kniha Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tretia kniha Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prva kniha Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prva kniha Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prva kniha Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prva kniha Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? kniha Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? kniha Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? kniha Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? kniha Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvy list Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvy list Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvy list Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvy list Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? list Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? list Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? list Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? list Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tretia Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tretia Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tretia Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tretia Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Treti Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Treti Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Treti Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Treti Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tret?? Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tret?? Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tret?? Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Tret?? Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 k. Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 k. Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 k. Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 k. Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 k. Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 k. Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 k. Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 k. Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prva Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prva Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prva Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prva Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvy Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvy Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvy Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvy Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prv?? Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 k Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 k Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 k Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 k Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 k Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 k Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 k Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 k Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kralov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kra??ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kr??lov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kr????ov 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Krl 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kr?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kr 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TRETIA KNIHA KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETIA KNIHA KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETIA KNIHA KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETIA KNIHA KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVA KNIHA KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVA KNIHA KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVA KNIHA KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVA KNIHA KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KNIHA KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KNIHA KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KNIHA KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KNIHA KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVY LIST KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVY LIST KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVY LIST KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVY LIST KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? LIST KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? LIST KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? LIST KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? LIST KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETIA KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETIA KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETIA KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETIA KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETI KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETI KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETI KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRETI KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRET?? KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRET?? KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRET?? KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("TRET?? KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K. KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K. KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K. KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K. KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 K. KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 K. KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 K. KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 K. KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III. KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVA KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVA KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVA KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVA KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVY KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVY KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVY KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVY KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRV?? KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 K KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 K KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 K KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 K KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 K KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("III KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3. KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("3 KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KRALOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KRA??OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KR??LOV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KR????OV 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KRL 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KR?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (sk)", function () {
            expect(p.parse("Druha kniha Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? kniha Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy list Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? list Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha kniha Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha kniha Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? kniha Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? kniha Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy list Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy list Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? list Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? list Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 k. Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha kniha Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha kniha Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? kniha Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? kniha Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 k Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy list Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy list Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? list Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? list Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 k. Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 k. Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 k Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 k Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 k. Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 k. Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kronicka 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kronick?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 k Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 k Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kron??k 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kron 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Krn 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KNIHA PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY LIST PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? LIST PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA KNIHA KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA KNIHA KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KNIHA KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KNIHA KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY LIST KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY LIST KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? LIST KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? LIST KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 K. PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA KNIHA KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KNIHA KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 K PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY LIST KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY LIST KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? LIST KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? LIST KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 K. KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 K. KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 K KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 K KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 K. KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 K. KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRONICKA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRONICK?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 K KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 K KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRON??K 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRN 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (sk)", function () {
            expect(p.parse("Prva kniha Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? kniha Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvy list Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? list Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prva kniha Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prva kniha Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? kniha Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? kniha Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 k. Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prva Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvy Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvy list Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvy list Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? list Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? list Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 k Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prva kniha Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prva kniha Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? kniha Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? kniha Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvy list Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvy list Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? list Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? list Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 k. Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 k. Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prva Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prva Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvy Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvy Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 k Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 k Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 k. Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 k. Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prva Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prva Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvy Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvy Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prv?? Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 k Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 k Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kronicka 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kronick?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kron??k 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kron 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Krn 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVA KNIHA PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KNIHA PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVY LIST PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? LIST PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVA KNIHA KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVA KNIHA KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KNIHA KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KNIHA KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 K. PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVA PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVY PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVY LIST KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVY LIST KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? LIST KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? LIST KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 K PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVA KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVA KNIHA KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KNIHA KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVY LIST KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVY LIST KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? LIST KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? LIST KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 K. KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 K. KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVA KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVA KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVY KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVY KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 K KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 K KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 K. KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 K. KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVA KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVA KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVY KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVY KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRV?? KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 K KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 K KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KRONICKA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KRONICK?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KRON??K 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRN 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (sk)", function () {
            expect(p.parse("Ezdras 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezdra?? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezdr??s 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezdr???? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("Ezd 1:1").osis()).toEqual("Ezra.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZDRAS 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZDRA?? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZDR??S 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZDR???? 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1");
            expect(p.parse("EZD 1:1").osis()).toEqual("Ezra.1.1");
            return true;
        });
    });
    describe("Localized book Neh (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (sk)", function () {
            expect(p.parse("Nehemias 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemia?? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemi??s 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemi???? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NEHEMIAS 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMIA?? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMI??S 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMI???? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (sk)", function () {
            expect(p.parse("Grecke casti knihy Ester 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Grecke ??asti knihy Ester 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Gr??cke casti knihy Ester 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Gr??cke ??asti knihy Ester 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester gr. 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester gr 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (sk)", function () {
            expect(p.parse("Ester 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("Est 1:1").osis()).toEqual("Esth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ESTER 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1");
            expect(p.parse("EST 1:1").osis()).toEqual("Esth.1.1");
            return true;
        });
    });
    describe("Localized book Job (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (sk)", function () {
            expect(p.parse("Kniha Jobova 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Kniha J??bova 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("K. Jobova 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("K. J??bova 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("K Jobova 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("K J??bova 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("J??b 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KNIHA JOBOVA 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("KNIHA J??BOVA 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("K. JOBOVA 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("K. J??BOVA 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("K JOBOVA 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("K J??BOVA 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("J??B 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (sk)", function () {
            expect(p.parse("Kniha zalmov 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Kniha ??almov 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("K. zalmov 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("K. ??almov 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("K zalmov 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("K ??almov 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Zaltar 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Zalt??r 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??altar 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??alt??r 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Zalmy 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??almy 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Zalm 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??alm 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Z 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?? 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KNIHA ZALMOV 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("KNIHA ??ALMOV 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("K. ZALMOV 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("K. ??ALMOV 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("K ZALMOV 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("K ??ALMOV 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("ZALTAR 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("ZALT??R 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??ALTAR 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??ALT??R 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("ZALMY 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??ALMY 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("ZALM 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??ALM 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Z 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?? 1:1").osis()).toEqual("Ps.1.1");
            return true;
        });
    });
    describe("Localized book PrAzar (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (sk)", function () {
            expect(p.parse("Azarjasova modlitba 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarja??ova modlitba 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarj??sova modlitba 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarj????ova modlitba 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (sk)", function () {
            expect(p.parse("Kniha prislovi 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Kniha prislov?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Kniha pr??slovi 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Kniha pr??slov?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K. prislovi 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K. prislov?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K. pr??slovi 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K. pr??slov?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K prislovi 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K prislov?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K pr??slovi 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K pr??slov?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prislovia 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr??slovia 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pris 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr??s 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KNIHA PRISLOVI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("KNIHA PRISLOV?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("KNIHA PR??SLOVI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("KNIHA PR??SLOV?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K. PRISLOVI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K. PRISLOV?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K. PR??SLOVI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K. PR??SLOV?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K PRISLOVI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K PRISLOV?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K PR??SLOVI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("K PR??SLOV?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PRISLOVIA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR??SLOVIA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PRIS 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR??S 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (sk)", function () {
            expect(p.parse("Kohelet ??? Kazatel 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kohelet ??? Kazate?? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kniha kazatelova 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kniha kazate??ova 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("K. kazatelova 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("K. kazate??ova 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("K kazatelova 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("K kazate??ova 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Ekleziastes 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kazatel 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kazate?? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kohelet 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kaz 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Koh 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KOHELET ??? KAZATEL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KOHELET ??? KAZATE?? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KNIHA KAZATELOVA 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KNIHA KAZATE??OVA 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("K. KAZATELOVA 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("K. KAZATE??OVA 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("K KAZATELOVA 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("K KAZATE??OVA 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("EKLEZIASTES 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KAZATEL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KAZATE?? 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KOHELET 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KAZ 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KOH 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (sk)", function () {
            expect(p.parse("Traja mladenci v rozpalenej peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Traja mladenci v rozp??lenej peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Traja ml??denci v rozpalenej peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Traja ml??denci v rozp??lenej peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Piesen mladencov v ohnivej peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Piesen ml??dencov v ohnivej peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Piese?? mladencov v ohnivej peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Piese?? ml??dencov v ohnivej peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (sk)", function () {
            expect(p.parse("Velpiesen Salamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Velpiesen Salam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Velpiesen ??alamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Velpiesen ??alam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Velpiese?? Salamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Velpiese?? Salam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Velpiese?? ??alamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Velpiese?? ??alam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??piesen Salamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??piesen Salam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??piesen ??alamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??piesen ??alam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??piese?? Salamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??piese?? Salam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??piese?? ??alamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??piese?? ??alam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piesen Salamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piesen Salam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piesen ??alamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piesen ??alam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piese?? Salamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piese?? Salam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piese?? ??alamunova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piese?? ??alam??nova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piesen piesni 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piesen piesn?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piese?? piesni 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piese?? piesn?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Velpiesen 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Velpiese?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??piesen 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??piese?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piesen 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Piese?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pies 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Velp 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Ve??p 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Vlp 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("V??p 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P?? 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("VELPIESEN SALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VELPIESEN SALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VELPIESEN ??ALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VELPIESEN ??ALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VELPIESE?? SALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VELPIESE?? SALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VELPIESE?? ??ALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VELPIESE?? ??ALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??PIESEN SALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??PIESEN SALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??PIESEN ??ALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??PIESEN ??ALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??PIESE?? SALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??PIESE?? SALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??PIESE?? ??ALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??PIESE?? ??ALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESEN SALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESEN SALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESEN ??ALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESEN ??ALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESE?? SALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESE?? SALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESE?? ??ALAMUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESE?? ??ALAM??NOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESEN PIESNI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESEN PIESN?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESE?? PIESNI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESE?? PIESN?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VELPIESEN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VELPIESE?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??PIESEN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??PIESE?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESEN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIESE?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIES 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VELP 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VE??P 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("VLP 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("V??P 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P?? 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (sk)", function () {
            expect(p.parse("Jeremias 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremia?? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremi??s 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremi???? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JEREMIAS 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMIA?? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMI??S 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMI???? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (sk)", function () {
            expect(p.parse("Ezechiel 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("Ez 1:1").osis()).toEqual("Ezek.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EZECHIEL 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1");
            expect(p.parse("EZ 1:1").osis()).toEqual("Ezek.1.1");
            return true;
        });
    });
    describe("Localized book Dan (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (sk)", function () {
            expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (sk)", function () {
            expect(p.parse("Hozeas 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hozea?? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hoze??s 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hoze???? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Ozeas 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Ozea?? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Oze??s 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Oze???? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Oz 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HOZEAS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOZEA?? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOZE??S 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOZE???? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZEAS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZEA?? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZE??S 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZE???? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZ 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (sk)", function () {
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (sk)", function () {
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??mos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??m 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??MOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??M 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (sk)", function () {
            expect(p.parse("Obadias 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadia?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadi??s 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadi???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obedias 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obedia?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obedi??s 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obedi???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdias 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdia?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdi??s 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdi???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abd 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OBADIAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADIA?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADI??S 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADI???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBEDIAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBEDIA?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBEDI??S 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBEDI???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDIAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDIA?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDI??S 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDI???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABD 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (sk)", function () {
            expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jonas 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jona?? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jon??s 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jon???? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("Jon 1:1").osis()).toEqual("Jonah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONAS 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JONA?? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JON??S 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JON???? 1:1").osis()).toEqual("Jonah.1.1");
            expect(p.parse("JON 1:1").osis()).toEqual("Jonah.1.1");
            return true;
        });
    });
    describe("Localized book Mic (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (sk)", function () {
            expect(p.parse("Micheas 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Michea?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Miche??s 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Miche???? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mich 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MICHEAS 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHEA?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHE??S 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHE???? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICH 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (sk)", function () {
            expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("N??hum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("N??HUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (sk)", function () {
            expect(p.parse("Habakuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Abakuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Ab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HABAKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("ABAKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("AB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (sk)", function () {
            expect(p.parse("Sofonias 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofonia?? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofoni??s 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofoni???? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sof 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SOFONIAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONIA?? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONI??S 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONI???? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOF 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (sk)", function () {
            expect(p.parse("Haggeus 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Aggeus 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Ageus 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Ag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("HAGGEUS 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AGGEUS 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AGEUS 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (sk)", function () {
            expect(p.parse("Zacharias 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zacharia?? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zachari??s 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zachari???? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zach 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZACHARIAS 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACHARIA?? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACHARI??S 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACHARI???? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (sk)", function () {
            expect(p.parse("Malachias 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malachia?? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malachi??s 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Malachi???? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MALACHIAS 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALACHIA?? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALACHI??S 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MALACHI???? 1:1").osis()).toEqual("Mal.1.1");
            expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1");
            return true;
        });
    });
    describe("Localized book Matt (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (sk)", function () {
            expect(p.parse("Evanjelium Podla Matusa 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Evanjelium Podla Matu??a 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Evanjelium Podla Mat??sa 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Evanjelium Podla Mat????a 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Evanjelium Pod??a Matusa 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Evanjelium Pod??a Matu??a 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Evanjelium Pod??a Mat??sa 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Evanjelium Pod??a Mat????a 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matusa 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matu??a 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mat??sa 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mat????a 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matus 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matu?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mat??s 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mat???? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANJELIUM PODLA MATUSA 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("EVANJELIUM PODLA MATU??A 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("EVANJELIUM PODLA MAT??SA 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("EVANJELIUM PODLA MAT????A 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("EVANJELIUM POD??A MATUSA 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("EVANJELIUM POD??A MATU??A 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("EVANJELIUM POD??A MAT??SA 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("EVANJELIUM POD??A MAT????A 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATUSA 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATU??A 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MAT??SA 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MAT????A 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATUS 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATU?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MAT??S 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MAT???? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (sk)", function () {
            expect(p.parse("Evanjelium Podla Marka 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Evanjelium Pod??a Marka 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Marek 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Marka 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mk 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANJELIUM PODLA MARKA 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("EVANJELIUM POD??A MARKA 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MAREK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKA 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (sk)", function () {
            expect(p.parse("Evanjelium Podla Lukasa 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evanjelium Podla Luka??a 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evanjelium Podla Luk??sa 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evanjelium Podla Luk????a 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evanjelium Pod??a Lukasa 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evanjelium Pod??a Luka??a 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evanjelium Pod??a Luk??sa 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evanjelium Pod??a Luk????a 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lukasa 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luka??a 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk??sa 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk????a 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lukas 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luka?? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk??s 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk???? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lk 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANJELIUM PODLA LUKASA 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANJELIUM PODLA LUKA??A 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANJELIUM PODLA LUK??SA 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANJELIUM PODLA LUK????A 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANJELIUM POD??A LUKASA 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANJELIUM POD??A LUKA??A 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANJELIUM POD??A LUK??SA 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANJELIUM POD??A LUK????A 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKASA 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKA??A 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??SA 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK????A 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKAS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKA?? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??S 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK???? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LK 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (sk)", function () {
            expect(p.parse("Prva kniha Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prva kniha J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prv?? kniha Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prv?? kniha J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvy Janov list 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvy J??nov list 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvy list Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvy list J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prv?? Janov list 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prv?? J??nov list 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prv?? list Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prv?? list J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 k. Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 k. J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prva Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prva J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvy Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvy J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prv?? Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prv?? J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prv?? Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prv?? J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 k Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 k J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Janov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I J??nov 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Jn 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 J 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVA KNIHA JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVA KNIHA J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRV?? KNIHA JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRV?? KNIHA J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVY JANOV LIST 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVY J??NOV LIST 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVY LIST JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVY LIST J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRV?? JANOV LIST 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRV?? J??NOV LIST 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRV?? LIST JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRV?? LIST J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 K. JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 K. J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVA JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVA J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVY JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVY J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRV?? JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRV?? J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRV?? JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRV?? J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 K JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 K J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JANOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I J??NOV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 J 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (sk)", function () {
            expect(p.parse("Druha kniha Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druha kniha J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? kniha Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? kniha J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy Janov list 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy J??nov list 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy list Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy list J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Janov list 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? J??nov list 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? list Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? list J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druha Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druha J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 k. Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 k. J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 k Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 k J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Janov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 J??nov 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Jn 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 J 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHA KNIHA J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? KNIHA JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? KNIHA J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY JANOV LIST 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY J??NOV LIST 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY LIST JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY LIST J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JANOV LIST 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? J??NOV LIST 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? LIST JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? LIST J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHA JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHA J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 K. JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 K. J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 K JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 K J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JANOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 J??NOV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 J 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (sk)", function () {
            expect(p.parse("Tretia kniha Janov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tretia kniha J??nov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Treti Janov list 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Treti J??nov list 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? Janov list 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? J??nov list 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tretia Janov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tretia J??nov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Treti Janov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Treti J??nov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? Janov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? J??nov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 k. Janov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 k. J??nov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Janov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. J??nov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 k Janov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 k J??nov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Janov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III J??nov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Janov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. J??nov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Janov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 J??nov 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Jn 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 J 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TRETIA KNIHA JANOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETIA KNIHA J??NOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETI JANOV LIST 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETI J??NOV LIST 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? JANOV LIST 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? J??NOV LIST 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETIA JANOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETIA J??NOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETI JANOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETI J??NOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? JANOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? J??NOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 K. JANOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 K. J??NOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. JANOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. J??NOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 K JANOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 K J??NOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III JANOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III J??NOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JANOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. J??NOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JANOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 J??NOV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 J 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (sk)", function () {
            expect(p.parse("Evanjelium Podla Jana 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Evanjelium Podla J??na 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Evanjelium Pod??a Jana 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Evanjelium Pod??a J??na 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Jana 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J??na 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Jan 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J??n 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Jn 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANJELIUM PODLA JANA 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("EVANJELIUM PODLA J??NA 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("EVANJELIUM POD??A JANA 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("EVANJELIUM POD??A J??NA 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JANA 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J??NA 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J??N 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JN 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (sk)", function () {
            expect(p.parse("Skutky apostolov 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky apo??tolov 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Sk 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SKUTKY APOSTOLOV 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY APO??TOLOV 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SK 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (sk)", function () {
            expect(p.parse("List Rimanom 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rimanom 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rimskym 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??mskym 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rim 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST RIMANOM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("RIMANOM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("RIMSKYM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??MSKYM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("RIM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (sk)", function () {
            expect(p.parse("Druha kniha Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha kniha Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha kniha Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha kniha Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? kniha Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? kniha Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? kniha Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? kniha Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy list Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy list Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy list Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy list Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 k. Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 k. Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 k. Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 k. Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 k Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 k Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 k Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 k Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korintanom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korin??anom 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA KNIHA KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA KNIHA KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA KNIHA KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KNIHA KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KNIHA KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KNIHA KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KNIHA KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY LIST KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY LIST KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY LIST KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 K. KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 K. KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 K. KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 K. KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 K KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 K KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 K KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 K KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORIN??ANOM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (sk)", function () {
            expect(p.parse("Prva kniha Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prva kniha Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prva kniha Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prva kniha Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? kniha Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? kniha Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? kniha Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? kniha Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvy list Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvy list Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvy list Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvy list Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? list Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? list Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? list Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? list Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 k. Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 k. Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 k. Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 k. Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prva Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prva Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prva Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prva Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvy Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvy Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvy Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvy Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prv?? Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 k Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 k Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 k Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 k Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korintanom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korin??anom 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVA KNIHA KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVA KNIHA KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVA KNIHA KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVA KNIHA KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KNIHA KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KNIHA KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KNIHA KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KNIHA KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVY LIST KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVY LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVY LIST KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVY LIST KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? LIST KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? LIST KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? LIST KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 K. KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 K. KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 K. KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 K. KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVA KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVA KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVA KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVA KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVY KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVY KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVY KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVY KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRV?? KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 K KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 K KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 K KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 K KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORIN??ANOM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (sk)", function () {
            expect(p.parse("List Galatanom 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("List Gala??anom 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galatanom 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galatskym 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galatsk??m 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gala??anom 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Ga 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST GALATANOM 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("LIST GALA??ANOM 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATANOM 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATSKYM 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATSK??M 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALA??ANOM 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GA 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (sk)", function () {
            expect(p.parse("List Efezanom 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efezanom 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efezskym 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efezsk??m 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST EFEZANOM 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFEZANOM 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFEZSKYM 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFEZSK??M 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (sk)", function () {
            expect(p.parse("List Filipanom 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipanom 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipskym 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipsk??m 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Flp 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST FILIPANOM 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPANOM 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPSKYM 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPSK??M 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FLP 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (sk)", function () {
            expect(p.parse("List Kolosanom 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosenskym 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosensk??m 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosanom 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST KOLOSANOM 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSENSKYM 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSENSK??M 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSANOM 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (sk)", function () {
            expect(p.parse("Druha kniha Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha kniha Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? kniha Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? kniha Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha kniha Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha kniha Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? kniha Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? kniha Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha kniha Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha kniha Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha kniha Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha kniha Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? kniha Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? kniha Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? kniha Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? kniha Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha kniha Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha kniha Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? kniha Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? kniha Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k. Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k. Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k. Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k. Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesalonicanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesaloni??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k. Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k. Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k. Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k. Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k. Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k. Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 k Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Soluncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Solun??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Sol??ncanom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Sol??n??anom 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Sol??nskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Sol 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tes 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA KNIHA TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? KNIHA TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? KNIHA TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA KNIHA TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA KNIHA TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? KNIHA TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? KNIHA TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA KNIHA SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA KNIHA SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA KNIHA SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA KNIHA SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? KNIHA SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? KNIHA SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? KNIHA SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? KNIHA SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA KNIHA SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA KNIHA SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? KNIHA SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? KNIHA SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K. TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K. TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K. TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K. TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESALONICANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESALONI??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K. SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K. SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K. SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K. SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K. SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K. SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 K SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOLUNCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOLUN??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOL??NCANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOL??N??ANOM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOL??NSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOL 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TES 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (sk)", function () {
            expect(p.parse("Prva kniha Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva kniha Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? kniha Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? kniha Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva kniha Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva kniha Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy list Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy list Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? kniha Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? kniha Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? list Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? list Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy list Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? list Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva kniha Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva kniha Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva kniha Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva kniha Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? kniha Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? kniha Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? kniha Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? kniha Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva kniha Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva kniha Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy list Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy list Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy list Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy list Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? kniha Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? kniha Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? list Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? list Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? list Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? list Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy list Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy list Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? list Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? list Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k. Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k. Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k. Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k. Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k. Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k. Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k. Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k. Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesalonicanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesaloni??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k. Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k. Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prva Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvy Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prv?? Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 k Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Soluncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Solun??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Sol??ncanom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Sol??n??anom 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Sol??nskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Sol 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tes 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVA KNIHA TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA KNIHA TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? KNIHA TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? KNIHA TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA KNIHA TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA KNIHA TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY LIST TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY LIST TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? KNIHA TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? KNIHA TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? LIST TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? LIST TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY LIST TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? LIST TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA KNIHA SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA KNIHA SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA KNIHA SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA KNIHA SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? KNIHA SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? KNIHA SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? KNIHA SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? KNIHA SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA KNIHA SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA KNIHA SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY LIST SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY LIST SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY LIST SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY LIST SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? KNIHA SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? KNIHA SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? LIST SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? LIST SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? LIST SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? LIST SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY LIST SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? LIST SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K. TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K. TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K. TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K. TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K. SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K. SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K. SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K. SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESALONICANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESALONI??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K. SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K. SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVA SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVY SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRV?? SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 K SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOLUNCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOLUN??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOL??NCANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOL??N??ANOM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOL??NSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOL 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TES 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (sk)", function () {
            expect(p.parse("Druha kniha Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? kniha Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druha kniha Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy list Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? kniha Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? list Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy list Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? list Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druha Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 k. Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druha Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 k Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 k. Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 k Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? KNIHA TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHA KNIHA TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? KNIHA TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHA TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 K. TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHA TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 K TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 K. TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 K TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (sk)", function () {
            expect(p.parse("Prva kniha Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prv?? kniha Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prva kniha Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvy list Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prv?? kniha Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prv?? list Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvy list Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prv?? list Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 k. Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prva Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvy Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prv?? Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prv?? Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 k Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 k. Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prva Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvy Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prv?? Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prv?? Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 k Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVA KNIHA TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRV?? KNIHA TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVA KNIHA TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVY LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRV?? KNIHA TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRV?? LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVY LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRV?? LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 K. TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVA TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVY TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRV?? TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRV?? TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 K TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 K. TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVA TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVY TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRV?? TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRV?? TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 K TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (sk)", function () {
            expect(p.parse("List Titovi 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("List T??tovi 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titovi 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??tovi 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??t 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST TITOVI 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("LIST T??TOVI 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITOVI 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??TOVI 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("T??T 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (sk)", function () {
            expect(p.parse("List Filemonovi 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("List Filem??novi 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemonovi 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filem 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Flm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST FILEMONOVI 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("LIST FILEM??NOVI 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMONOVI 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FLM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (sk)", function () {
            expect(p.parse("List Hebrejom 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebrejom 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zidom 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??idom 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebr 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zid 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??id 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST HEBREJOM 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBREJOM 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZIDOM 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??IDOM 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBR 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZID 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??ID 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (sk)", function () {
            expect(p.parse("Jakubov List 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakubov 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jk 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JAKUBOV LIST 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKUBOV 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JK 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (sk)", function () {
            expect(p.parse("Druha kniha Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? kniha Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy Petrov list 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy list Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petrov list 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? list Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druha Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 k. Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 k Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petrov 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? KNIHA PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY PETROV LIST 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY LIST PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETROV LIST 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? LIST PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHA PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 K. PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 K PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETROV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (sk)", function () {
            expect(p.parse("Prva kniha Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prv?? kniha Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvy Petrov list 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvy list Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prv?? Petrov list 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prv?? list Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 k. Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prva Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvy Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prv?? Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prv?? Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 k Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Petrov 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pt 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVA KNIHA PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRV?? KNIHA PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVY PETROV LIST 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVY LIST PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRV?? PETROV LIST 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRV?? LIST PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 K. PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVA PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVY PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRV?? PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRV?? PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 K PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PETROV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PT 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (sk)", function () {
            expect(p.parse("Judov List 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??dov List 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judov 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??dov 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jud 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??d 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JUDOV LIST 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??DOV LIST 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDOV 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??DOV 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUD 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("J??D 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (sk)", function () {
            expect(p.parse("Tobias 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobia?? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobi??s 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobi???? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (sk)", function () {
            expect(p.parse("Kniha Juditina 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("K. Juditina 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("K Juditina 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Judita 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Judit 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (sk)", function () {
            expect(p.parse("Proroctvo Baruchovo 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Baruch 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (sk)", function () {
            expect(p.parse("Zuzana 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Zuzane 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (sk)", function () {
            expect(p.parse("Druha kniha Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? kniha Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druha kniha Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druhy list Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? kniha Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? list Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druhy list Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? list Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druha Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druhy Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 k. Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druha Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druhy Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 k Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 k. Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 k Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Machabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makabejcov 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Mach 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (sk)", function () {
            expect(p.parse("Tretia kniha Machabejcov 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Tretia Machabejcov 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Treti Machabejcov 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Tret?? Machabejcov 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 k. Machabejcov 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Machabejcov 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 k Machabejcov 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Machabejcov 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Machabejcov 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Machabejcov 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Mach 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (sk)", function () {
            expect(p.parse("Stvrta kniha Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Stvrt?? kniha Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("??tvrta kniha Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("??tvrt?? kniha Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Stvrta Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Stvrt?? Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("??tvrta Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("??tvrt?? Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 k. Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 k Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Machabejcov 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Mach 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (sk)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (sk)", function () {
            expect(p.parse("Prva kniha Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prv?? kniha Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prvy list Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prv?? list Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 k. Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prva Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prvy Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prv?? Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prv?? Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 k Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prva Makabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prv?? Makabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Machabejcov 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Mach 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Mak 1:1").osis()).toEqual("1Macc.1.1");
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
            return expect(p.languages).toEqual(["sk"]);
        });
        it("should handle ranges (sk)", function () {
            expect(p.parse("Titus 1:1 a?? 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1a??2").osis()).toEqual("Matt.1-Matt.2");
            expect(p.parse("Phlm 2 A?? 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
            expect(p.parse("Titus 1:1 az 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1az2").osis()).toEqual("Matt.1-Matt.2");
            expect(p.parse("Phlm 2 AZ 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (sk)", function () {
            expect(p.parse("Titus 1:1, kapitoly 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITOLY 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapitole 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITOLE 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapitolu 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITOLU 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapitol 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITOL 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, hlavy 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 HLAVY 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kap. 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAP. 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kap 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 KAP 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (sk)", function () {
            expect(p.parse("Exod 1:1 ver??ov 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VER??OV 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 versov 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm VERSOV 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (sk)", function () {
            expect(p.parse("Exod 1:1 porov 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 POROV 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 pozri 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 POZRI 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 alebo 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 ALEBO 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 a 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 A 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (sk)", function () {
            expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (sk)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (sk)", function () {
            expect(p.parse("Lev 1 (SEB)").osis_and_translations()).toEqual([["Lev.1", "SEB"]]);
            return expect(p.parse("lev 1 seb").osis_and_translations()).toEqual([["Lev.1", "SEB"]]);
        });
        it("should handle book ranges (sk)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            expect(p.parse("Prv?? kniha a?? Tretia kniha  Janov").osis()).toEqual("1John.1-3John.1");
            expect(p.parse("Prv?? kniha az Tretia kniha  Janov").osis()).toEqual("1John.1-3John.1");
            expect(p.parse("Prv?? kniha - Tretia kniha  Janov").osis()).toEqual("1John.1-3John.1");
            expect(p.parse("Prv?? kniha a?? Tretia kniha  J??nov").osis()).toEqual("1John.1-3John.1");
            expect(p.parse("Prv?? kniha az Tretia kniha  J??nov").osis()).toEqual("1John.1-3John.1");
            return expect(p.parse("Prv?? kniha - Tretia kniha  J??nov").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (sk)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=sk.spec.js.map