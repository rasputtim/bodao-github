"use strict";
(function () {
    var bcv_parser;
    bcv_parser = require("../../js/cs_bcv_parser.js").bcv_parser;
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
    describe("Localized book Gen (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gen (cs)", function () {
            expect(p.parse("Prvni kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni kniha Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni kniha Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni kniha Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni kniha Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni kniha Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni kniha Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni kniha Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? kniha Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? kniha Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? kniha Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? kniha Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? kniha Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? kniha Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? kniha Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. kniha Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. kniha Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. kniha Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. kniha Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. kniha Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. kniha Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. kniha Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. kniha Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. kniha Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. kniha Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. kniha Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. kniha Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. kniha Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. kniha Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 kniha Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 kniha Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 kniha Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 kniha Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 kniha Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 kniha Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 kniha Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I kniha Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I kniha Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I kniha Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I kniha Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I kniha Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I kniha Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I kniha Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I kniha Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvni Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Prvn?? Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Mojzisova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Mojzi??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Mojz??sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Mojz????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Moj??isova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Moj??i??ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Moj????sova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I Moj??????ova 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Genesis 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("Gn 1:1").osis()).toEqual("Gen.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVNI KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI KNIHA MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI KNIHA MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI KNIHA MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI KNIHA MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? KNIHA MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? KNIHA MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? KNIHA MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. KNIHA MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. KNIHA MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. KNIHA MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. KNIHA MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. KNIHA MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. KNIHA MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. KNIHA MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. KNIHA MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 KNIHA MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 KNIHA MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 KNIHA MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 KNIHA MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I KNIHA MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I KNIHA MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I KNIHA MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I KNIHA MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I KNIHA MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVNI MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("PRVN?? MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1. MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I. MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("1 MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJZISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJZI??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJZ??SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJZ????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJ??ISOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJ??I??OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJ????SOVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("I MOJ??????OVA 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GENESIS 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1");
            expect(p.parse("GN 1:1").osis()).toEqual("Gen.1.1");
            return true;
        });
    });
    describe("Localized book Exod (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Exod (cs)", function () {
            expect(p.parse("Druha kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha kniha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha kniha Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha kniha Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha kniha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha kniha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha kniha Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha kniha Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy kniha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy kniha Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy kniha Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy kniha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy kniha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy kniha Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy kniha Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? kniha Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. kniha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. kniha Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. kniha Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. kniha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. kniha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. kniha Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. kniha Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. kniha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. kniha Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. kniha Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. kniha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. kniha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. kniha Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. kniha Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II kniha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II kniha Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II kniha Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II kniha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II kniha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II kniha Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II kniha Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 kniha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 kniha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 kniha Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 kniha Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 kniha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 kniha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 kniha Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 kniha Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druha Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druhy Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Druh?? Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mojzisova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mojzi??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mojz??sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Mojz????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Moj??isova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Moj??i??ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Moj????sova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 Moj??????ova 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exodus 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("Ex 1:1").osis()).toEqual("Exod.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA KNIHA MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA KNIHA MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA KNIHA MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY KNIHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY KNIHA MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY KNIHA MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY KNIHA MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? KNIHA MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. KNIHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. KNIHA MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. KNIHA MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. KNIHA MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. KNIHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. KNIHA MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. KNIHA MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. KNIHA MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II KNIHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II KNIHA MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II KNIHA MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II KNIHA MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 KNIHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 KNIHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 KNIHA MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 KNIHA MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 KNIHA MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHA MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUHY MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("DRUH?? MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II. MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2. MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("II MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJZISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJZI??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJZ??SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJZ????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJ??ISOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJ??I??OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJ????SOVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("2 MOJ??????OVA 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXODUS 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1");
            expect(p.parse("EX 1:1").osis()).toEqual("Exod.1.1");
            return true;
        });
    });
    describe("Localized book Bel (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bel (cs)", function () {
            expect(p.parse("Bel a drak 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l a drak 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1");
            expect(p.parse("B??l 1:1").osis()).toEqual("Bel.1.1");
            return true;
        });
    });
    describe("Localized book Lev (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lev (cs)", function () {
            expect(p.parse("Treti kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti kniha Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti kniha Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti kniha Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti kniha Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti kniha Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti kniha Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti kniha Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? kniha Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? kniha Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? kniha Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? kniha Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? kniha Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? kniha Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? kniha Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti kniha Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti kniha Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti kniha Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti kniha Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti kniha Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti kniha Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti kniha Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? kniha Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? kniha Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? kniha Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? kniha Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? kniha Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? kniha Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? kniha Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. kniha Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. kniha Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. kniha Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. kniha Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. kniha Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. kniha Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. kniha Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III kniha Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III kniha Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III kniha Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III kniha Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III kniha Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III kniha Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III kniha Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. kniha Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. kniha Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. kniha Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. kniha Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. kniha Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. kniha Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. kniha Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 kniha Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 kniha Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 kniha Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 kniha Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 kniha Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 kniha Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 kniha Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 kniha Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Treti Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Tret?? Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??eti Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??et?? Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mojzisova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mojzi??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mojz??sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Mojz????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Moj??isova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Moj??i??ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Moj????sova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 Moj??????ova 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Leviticusi 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Leviticus 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Levitikus 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("Lv 1:1").osis()).toEqual("Lev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TRETI KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI KNIHA MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI KNIHA MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI KNIHA MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI KNIHA MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? KNIHA MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? KNIHA MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? KNIHA MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI KNIHA MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI KNIHA MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI KNIHA MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI KNIHA MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? KNIHA MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? KNIHA MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? KNIHA MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. KNIHA MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. KNIHA MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. KNIHA MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. KNIHA MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III KNIHA MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III KNIHA MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III KNIHA MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III KNIHA MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. KNIHA MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. KNIHA MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. KNIHA MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. KNIHA MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 KNIHA MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 KNIHA MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 KNIHA MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 KNIHA MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 KNIHA MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRETI MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("TRET?? MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ETI MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("T??ET?? MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III. MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("III MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3. MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJZISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJZI??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJZ??SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJZ????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJ??ISOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJ??I??OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJ????SOVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("3 MOJ??????OVA 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITICUSI 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITICUS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEVITIKUS 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1");
            expect(p.parse("LV 1:1").osis()).toEqual("Lev.1.1");
            return true;
        });
    });
    describe("Localized book Num (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Num (cs)", function () {
            expect(p.parse("Ctvrta kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta kniha Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta kniha Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta kniha Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta kniha Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? kniha Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? kniha Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? kniha Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? kniha Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta kniha Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? kniha Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. kniha Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. kniha Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. kniha Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. kniha Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. kniha Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. kniha Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. kniha Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. kniha Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV kniha Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV kniha Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV kniha Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV kniha Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 kniha Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 kniha Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 kniha Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 kniha Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 kniha Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 kniha Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 kniha Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 kniha Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrta Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Ctvrt?? Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrta Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??tvrt?? Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mojzisova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mojzi??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mojz??sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Mojz????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Moj??isova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Moj??i??ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Moj????sova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 Moj??????ova 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Numeri 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("Nu 1:1").osis()).toEqual("Num.1.1");
            p.include_apocrypha(false);
            expect(p.parse("CTVRTA KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA KNIHA MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA KNIHA MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA KNIHA MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? KNIHA MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? KNIHA MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? KNIHA MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA KNIHA MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? KNIHA MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. KNIHA MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. KNIHA MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. KNIHA MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. KNIHA MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. KNIHA MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. KNIHA MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV KNIHA MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV KNIHA MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV KNIHA MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 KNIHA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 KNIHA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 KNIHA MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 KNIHA MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 KNIHA MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRTA MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("CTVRT?? MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRTA MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("??TVRT?? MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV. MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4. MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("IV MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJZISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJZI??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJZ??SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJZ????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJ??ISOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJ??I??OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJ????SOVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("4 MOJ??????OVA 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUMERI 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1");
            expect(p.parse("NU 1:1").osis()).toEqual("Num.1.1");
            return true;
        });
    });
    describe("Localized book Sir (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sir (cs)", function () {
            expect(p.parse("Kniha Sirachovcova 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Kniha S??rachovcova 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Ecclesiasticus 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sirachovec 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("S??rachovec 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1");
            expect(p.parse("S??r 1:1").osis()).toEqual("Sir.1.1");
            return true;
        });
    });
    describe("Localized book Wis (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Wis (cs)", function () {
            expect(p.parse("Moudrost Salomounova 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Moudrost ??alomounova 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Kniha Moudrosti 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Kniha moudrosti 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Kniha moudrost?? 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Moudrost 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Mdr 1:1").osis()).toEqual("Wis.1.1");
            expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1");
            return true;
        });
    });
    describe("Localized book Lam (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Lam (cs)", function () {
            expect(p.parse("Plac Jeremiasuv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremias??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremia??uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremia????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremi??suv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremi??s??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremi????uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremi??????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremjasuv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremjas??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremja??uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremja????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremj??suv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremj??s??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremj????uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac Jeremj??????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremiasuv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremias??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremia??uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremia????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremi??suv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremi??s??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremi????uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremi??????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremjasuv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremjas??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremja??uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremja????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremj??suv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremj??s??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremj????uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? Jeremj??????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremiasuv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremias??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremia??uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremia????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremi??suv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremi??s??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremi????uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremi??????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremjasuv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremjas??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremja??uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremja????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremj??suv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremj??s??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremj????uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c Jeremj??????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremiasuv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremias??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremia??uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremia????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremi??suv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremi??s??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremi????uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremi??????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremjasuv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremjas??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremja??uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremja????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremj??suv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremj??s??v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremj????uv 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? Jeremj??????v 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kniha narku 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kniha nark?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kniha na??ku 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kniha na??k?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kniha n??rku 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kniha n??rk?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kniha n????ku 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Kniha n????k?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Plac 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pla?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl??c 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl???? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("Pl 1:1").osis()).toEqual("Lam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PLAC JEREMIASUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMIAS??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMIA??UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMIA????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMI??SUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMI??S??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMI????UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMI??????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMJASUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMJAS??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMJA??UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMJA????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMJ??SUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMJ??S??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMJ????UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC JEREMJ??????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMIASUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMIAS??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMIA??UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMIA????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMI??SUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMI??S??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMI????UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMI??????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMJASUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMJAS??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMJA??UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMJA????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMJ??SUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMJ??S??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMJ????UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? JEREMJ??????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMIASUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMIAS??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMIA??UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMIA????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMI??SUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMI??S??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMI????UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMI??????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMJASUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMJAS??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMJA??UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMJA????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMJ??SUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMJ??S??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMJ????UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C JEREMJ??????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMIASUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMIAS??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMIA??UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMIA????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMI??SUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMI??S??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMI????UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMI??????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMJASUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMJAS??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMJA??UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMJA????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMJ??SUV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMJ??S??V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMJ????UV 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? JEREMJ??????V 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KNIHA NARKU 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KNIHA NARK?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KNIHA NA??KU 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KNIHA NA??K?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KNIHA N??RKU 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KNIHA N??RK?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KNIHA N????KU 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("KNIHA N????K?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLAC 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PLA?? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL??C 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL???? 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1");
            expect(p.parse("PL 1:1").osis()).toEqual("Lam.1.1");
            return true;
        });
    });
    describe("Localized book EpJer (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: EpJer (cs)", function () {
            expect(p.parse("List Jeremjasuv 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("List Jeremjas??v 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("List Jeremja??uv 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("List Jeremja????v 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("List Jeremj??suv 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("List Jeremj??s??v 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("List Jeremj????uv 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("List Jeremj??????v 1:1").osis()).toEqual("EpJer.1.1");
            expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1");
            return true;
        });
    });
    describe("Localized book Rev (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rev (cs)", function () {
            expect(p.parse("Zjeveni svateho Jana 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjeveni svat??ho Jana 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjeveni Janovo 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjeven?? Janovo 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Kniha Zjeveni 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Kniha Zjeven?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Apokalypsa 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjeveni 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zjeven?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("Zj 1:1").osis()).toEqual("Rev.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZJEVENI SVATEHO JANA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJEVENI SVAT??HO JANA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJEVENI JANOVO 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJEVEN?? JANOVO 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("KNIHA ZJEVENI 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("KNIHA ZJEVEN?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("APOKALYPSA 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJEVENI 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJEVEN?? 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1");
            expect(p.parse("ZJ 1:1").osis()).toEqual("Rev.1.1");
            return true;
        });
    });
    describe("Localized book PrMan (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrMan (cs)", function () {
            expect(p.parse("Modlitbu Manasse 1:1").osis()).toEqual("PrMan.1.1");
            expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1");
            return true;
        });
    });
    describe("Localized book Deut (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Deut (cs)", function () {
            expect(p.parse("Pata kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata kniha Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata kniha Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata kniha Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata kniha Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata kniha Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata kniha Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata kniha Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? kniha Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? kniha Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? kniha Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? kniha Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? kniha Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? kniha Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? kniha Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta kniha Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta kniha Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta kniha Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta kniha Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta kniha Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta kniha Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta kniha Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? kniha Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? kniha Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? kniha Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? kniha Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? kniha Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? kniha Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? kniha Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. kniha Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. kniha Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. kniha Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. kniha Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. kniha Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. kniha Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. kniha Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. kniha Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. kniha Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. kniha Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. kniha Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. kniha Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. kniha Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. kniha Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 kniha Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 kniha Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 kniha Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 kniha Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 kniha Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 kniha Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 kniha Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V kniha Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V kniha Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V kniha Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V kniha Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V kniha Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V kniha Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V kniha Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V kniha Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pata Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Pat?? Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??ta Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??t?? Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deuteronomium 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Mojzisova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Mojzi??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Mojz??sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Mojz????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Moj??isova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Moj??i??ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Moj????sova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V Moj??????ova 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("Dt 1:1").osis()).toEqual("Deut.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PATA KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA KNIHA MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA KNIHA MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA KNIHA MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? KNIHA MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? KNIHA MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? KNIHA MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA KNIHA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA KNIHA MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA KNIHA MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA KNIHA MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? KNIHA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? KNIHA MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? KNIHA MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? KNIHA MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. KNIHA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. KNIHA MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. KNIHA MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. KNIHA MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. KNIHA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. KNIHA MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. KNIHA MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. KNIHA MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 KNIHA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 KNIHA MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 KNIHA MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 KNIHA MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V KNIHA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V KNIHA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V KNIHA MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V KNIHA MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V KNIHA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V KNIHA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V KNIHA MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V KNIHA MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PATA MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("PAT?? MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??TA MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("P??T?? MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUTERONOMIUM 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5. MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V. MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("5 MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJZISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJZI??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJZ??SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJZ????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJ??ISOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJ??I??OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJ????SOVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("V MOJ??????OVA 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1");
            expect(p.parse("DT 1:1").osis()).toEqual("Deut.1.1");
            return true;
        });
    });
    describe("Localized book Josh (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Josh (cs)", function () {
            expect(p.parse("Jozue 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Joz 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("Jz 1:1").osis()).toEqual("Josh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOZUE 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JOZ 1:1").osis()).toEqual("Josh.1.1");
            expect(p.parse("JZ 1:1").osis()).toEqual("Josh.1.1");
            return true;
        });
    });
    describe("Localized book Judg (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Judg (cs)", function () {
            expect(p.parse("Soudcu 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Soudc?? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Sdc 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("Sd 1:1").osis()).toEqual("Judg.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SOUDCU 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("SOUDC?? 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("SDC 1:1").osis()).toEqual("Judg.1.1");
            expect(p.parse("SD 1:1").osis()).toEqual("Judg.1.1");
            return true;
        });
    });
    describe("Localized book Ruth (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ruth (cs)", function () {
            expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("R??t 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("Rt 1:1").osis()).toEqual("Ruth.1.1");
            p.include_apocrypha(false);
            expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("R??T 1:1").osis()).toEqual("Ruth.1.1");
            expect(p.parse("RT 1:1").osis()).toEqual("Ruth.1.1");
            return true;
        });
    });
    describe("Localized book 1Esd (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Esd (cs)", function () {
            expect(p.parse("Prvni Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvni Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvni Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvni Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvn?? Ezdras 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvn?? Ezdra?? 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvn?? Ezdr??s 1:1").osis()).toEqual("1Esd.1.1");
            expect(p.parse("Prvn?? Ezdr???? 1:1").osis()).toEqual("1Esd.1.1");
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
    describe("Localized book 2Esd (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Esd (cs)", function () {
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
    describe("Localized book Isa (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Isa (cs)", function () {
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
    describe("Localized book 2Sam (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Sam (cs)", function () {
            expect(p.parse("Druha kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druhy kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 kniha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druha Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druhy Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druha Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druhy Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuelova 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druha Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druhy Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Samuel 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druha S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druhy S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("Druh?? S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 S 1:1").osis()).toEqual("2Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHY KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 KNIHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHA SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHY SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHA SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHY SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUELOVA 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHA SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHY SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAMUEL 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHA S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUHY S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("DRUH?? S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II. S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2. S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("II S 1:1").osis()).toEqual("2Sam.1.1");
            expect(p.parse("2 S 1:1").osis()).toEqual("2Sam.1.1");
            return true;
        });
    });
    describe("Localized book 1Sam (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Sam (cs)", function () {
            expect(p.parse("Prvni kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvn?? kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I kniha Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvni Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvn?? Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvni Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvn?? Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samuelova 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvni Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvn?? Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Samuel 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvni S 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("Prvn?? S 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. S 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. S 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 S 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I S 1:1").osis()).toEqual("1Sam.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVNI KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVN?? KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I KNIHA SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVNI SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVN?? SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVNI SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVN?? SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMUELOVA 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVNI SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVN?? SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAMUEL 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVNI S 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("PRVN?? S 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1. S 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I. S 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("1 S 1:1").osis()).toEqual("1Sam.1.1");
            expect(p.parse("I S 1:1").osis()).toEqual("1Sam.1.1");
            return true;
        });
    });
    describe("Localized book 2Kgs (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Kgs (cs)", function () {
            expect(p.parse("Druha kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha kniha kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha kniha kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha kniha kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy kniha kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy kniha kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy kniha kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? kniha kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. kniha kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. kniha kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. kniha kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. kniha kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. kniha kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. kniha kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II kniha kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II kniha kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II kniha kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 kniha kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 kniha kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 kniha kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 kniha kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kralovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kralovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kr??lovska 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kr??lovsk?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kral 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kr??l 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kral 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kr??l 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kral 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr??l 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kral 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr??l 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druha Kr 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druhy Kr 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("Druh?? Kr 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kral 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kr??l 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kral 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kr??l 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kral 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kr??l 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kral 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kr??l 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. Kr 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. Kr 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II Kr 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 Kr 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KNIHA KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KNIHA KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KNIHA KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KNIHA KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KNIHA KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KNIHA KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KNIHA KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KNIHA KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KNIHA KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KNIHA KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KNIHA KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KNIHA KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KNIHA KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KNIHA KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KNIHA KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KNIHA KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KNIHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KNIHA KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KNIHA KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KNIHA KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KRALOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KRALOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KR??LOVSKA 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KR??LOVSK?? 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KRAL 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KR??L 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KRAL 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KR??L 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KRAL 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR??L 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KRAL 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR??L 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHA KR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUHY KR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("DRUH?? KR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KRAL 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KR??L 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KRAL 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KR??L 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KRAL 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KR??L 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KRAL 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KR??L 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II. KR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2. KR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("II KR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2 KR 1:1").osis()).toEqual("2Kgs.1.1");
            expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 1Kgs (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Kgs (cs)", function () {
            expect(p.parse("Prvni kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvni kniha kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvni kniha kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvni kniha kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? kniha kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? kniha kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? kniha kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. kniha kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. kniha kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. kniha kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. kniha kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. kniha kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. kniha kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 kniha kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 kniha kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 kniha kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I kniha kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I kniha kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I kniha kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I kniha kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvni Kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvni Kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvni Kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvni Kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? Kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? Kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? Kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? Kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kralovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kralovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kr??lovska 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kr??lovsk?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvni Kral 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvni Kr??l 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? Kral 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? Kr??l 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvni Kr 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("Prvn?? Kr 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kral 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kr??l 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kral 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kr??l 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kral 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kr??l 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kral 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kr??l 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. Kr 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. Kr 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 Kr 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I Kr 1:1").osis()).toEqual("1Kgs.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVNI KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVNI KNIHA KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVNI KNIHA KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVNI KNIHA KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KNIHA KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KNIHA KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KNIHA KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KNIHA KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KNIHA KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KNIHA KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KNIHA KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KNIHA KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KNIHA KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KNIHA KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KNIHA KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KNIHA KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KNIHA KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KNIHA KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KNIHA KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KNIHA KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVNI KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVNI KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVNI KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVNI KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KRALOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KRALOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KR??LOVSKA 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KR??LOVSK?? 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVNI KRAL 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVNI KR??L 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KRAL 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KR??L 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVNI KR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("PRVN?? KR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KRAL 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KR??L 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KRAL 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KR??L 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KRAL 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KR??L 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KRAL 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KR??L 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1. KR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I. KR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1 KR 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1");
            expect(p.parse("I KR 1:1").osis()).toEqual("1Kgs.1.1");
            return true;
        });
    });
    describe("Localized book 2Chr (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Chr (cs)", function () {
            expect(p.parse("Druha Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha kniha kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy kniha kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? kniha kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? kniha kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. kniha kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Paralipomenon 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. kniha kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II kniha kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 kniha kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha Letopisu 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha Letopis?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy Letopisu 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy Letopis?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Letopisu 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Letopis?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Letopisu 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Letopis?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Letopisu 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Letopis?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Letopisu 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Letopis?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Letopisu 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Letopis?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Letopisu 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Letopis?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Kronik 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druha Pa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druhy Pa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Pa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("Druh?? Pa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. Pa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. Pa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II Pa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 Pa 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 PARALIPOMENON 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KNIHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA LETOPISU 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA LETOPIS?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY LETOPISU 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY LETOPIS?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? LETOPISU 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? LETOPIS?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? LETOPISU 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? LETOPIS?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. LETOPISU 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. LETOPIS?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. LETOPISU 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. LETOPIS?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II LETOPISU 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II LETOPIS?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 LETOPISU 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 LETOPIS?? 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 KRONIK 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHA PA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUHY PA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? PA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("DRUH?? PA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II. PA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2. PA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("II PA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2 PA 1:1").osis()).toEqual("2Chr.1.1");
            expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1");
            return true;
        });
    });
    describe("Localized book 1Chr (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Chr (cs)", function () {
            expect(p.parse("Prvni Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvn?? Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvni kniha kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvn?? kniha kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. kniha kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Paralipomenon 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. kniha kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 kniha kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I kniha kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvni Letopisu 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvni Letopis?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvn?? Letopisu 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvn?? Letopis?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvni Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvn?? Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Letopisu 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Letopis?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Letopisu 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Letopis?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Letopisu 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Letopis?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Letopisu 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Letopis?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Kronik 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvni Pa 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("Prvn?? Pa 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. Pa 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. Pa 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 Pa 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I Pa 1:1").osis()).toEqual("1Chr.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVNI PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVN?? PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVNI KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVN?? KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I PARALIPOMENON 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KNIHA KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVNI LETOPISU 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVNI LETOPIS?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVN?? LETOPISU 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVN?? LETOPIS?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVNI KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVN?? KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. LETOPISU 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. LETOPIS?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. LETOPISU 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. LETOPIS?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 LETOPISU 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 LETOPIS?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I LETOPISU 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I LETOPIS?? 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I KRONIK 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVNI PA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("PRVN?? PA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1. PA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I. PA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1 PA 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1");
            expect(p.parse("I PA 1:1").osis()).toEqual("1Chr.1.1");
            return true;
        });
    });
    describe("Localized book Ezra (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezra (cs)", function () {
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
    describe("Localized book Neh (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Neh (cs)", function () {
            expect(p.parse("Nehemias 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemia?? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemi??s 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemi???? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemjas 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemja?? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemj??s 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Nehemj???? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NEHEMIAS 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMIA?? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMI??S 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMI???? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMJAS 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMJA?? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMJ??S 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEHEMJ???? 1:1").osis()).toEqual("Neh.1.1");
            expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1");
            return true;
        });
    });
    describe("Localized book GkEsth (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: GkEsth (cs)", function () {
            expect(p.parse("Ester (??eck?? dodatky) 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester (??eck?? ????sti) 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester recke dodatky 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester reck?? dodatky 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester ??ecke dodatky 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester ??eck?? dodatky 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester recke casti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester recke c??sti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester recke ??asti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester recke ????sti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester reck?? casti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester reck?? c??sti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester reck?? ??asti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester reck?? ????sti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester ??ecke casti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester ??ecke c??sti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester ??ecke ??asti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester ??ecke ????sti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester ??eck?? casti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester ??eck?? c??sti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester ??eck?? ??asti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("Ester ??eck?? ????sti 1:1").osis()).toEqual("GkEsth.1.1");
            expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1");
            return true;
        });
    });
    describe("Localized book Esth (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Esth (cs)", function () {
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
    describe("Localized book Job (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Job (cs)", function () {
            expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("J??b 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("Jb 1:1").osis()).toEqual("Job.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("J??B 1:1").osis()).toEqual("Job.1.1");
            expect(p.parse("JB 1:1").osis()).toEqual("Job.1.1");
            return true;
        });
    });
    describe("Localized book Ps (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ps (cs)", function () {
            expect(p.parse("Kniha zalmu 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Kniha zalm?? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Kniha ??almu 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Kniha ??alm?? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Zalmy 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??almy 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Zalm 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("??alm 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("Z 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("?? 1:1").osis()).toEqual("Ps.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KNIHA ZALMU 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("KNIHA ZALM?? 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("KNIHA ??ALMU 1:1").osis()).toEqual("Ps.1.1");
            expect(p.parse("KNIHA ??ALM?? 1:1").osis()).toEqual("Ps.1.1");
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
    describe("Localized book PrAzar (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: PrAzar (cs)", function () {
            expect(p.parse("Azarjasova modlitba 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarja??ova modlitba 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarj??sova modlitba 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("Azarj????ova modlitba 1:1").osis()).toEqual("PrAzar.1.1");
            expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1");
            return true;
        });
    });
    describe("Localized book Prov (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Prov (cs)", function () {
            expect(p.parse("Prislovi Salomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prislovi ??alomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prislov?? Salomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prislov?? ??alomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr??slovi Salomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr??slovi ??alomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr??slov?? Salomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr??slov?? ??alomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??islovi Salomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??islovi ??alomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??islov?? Salomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??islov?? ??alomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????slovi Salomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????slovi ??alomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????slov?? Salomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????slov?? ??alomounova 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prislovi 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prislov?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr??slovi 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr??slov?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??islovi 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??islov?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????slovi 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????slov?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pris 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr??s 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??is 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????s 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("Pr 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P?? 1:1").osis()).toEqual("Prov.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRISLOVI SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PRISLOVI ??ALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PRISLOV?? SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PRISLOV?? ??ALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR??SLOVI SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR??SLOVI ??ALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR??SLOV?? SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR??SLOV?? ??ALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??ISLOVI SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??ISLOVI ??ALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??ISLOV?? SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??ISLOV?? ??ALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????SLOVI SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????SLOVI ??ALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????SLOV?? SALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????SLOV?? ??ALOMOUNOVA 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PRISLOVI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PRISLOV?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR??SLOVI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR??SLOV?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??ISLOVI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??ISLOV?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????SLOVI 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????SLOV?? 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PRIS 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR??S 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P??IS 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P????S 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("PR 1:1").osis()).toEqual("Prov.1.1");
            expect(p.parse("P?? 1:1").osis()).toEqual("Prov.1.1");
            return true;
        });
    });
    describe("Localized book Eccl (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eccl (cs)", function () {
            expect(p.parse("Kazatel 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kohelet 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("Kaz 1:1").osis()).toEqual("Eccl.1.1");
            p.include_apocrypha(false);
            expect(p.parse("KAZATEL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KOHELET 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1");
            expect(p.parse("KAZ 1:1").osis()).toEqual("Eccl.1.1");
            return true;
        });
    });
    describe("Localized book SgThree (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: SgThree (cs)", function () {
            expect(p.parse("Pisen mladencu v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladencu v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladencu v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladencu v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladencu v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladencu v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladencu v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladencu v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladenc?? v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladenc?? v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladenc?? v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladenc?? v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladenc?? v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladenc?? v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladenc?? v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen mladenc?? v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??dencu v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??dencu v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??dencu v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??dencu v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??dencu v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??dencu v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??dencu v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??dencu v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??denc?? v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??denc?? v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??denc?? v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??denc?? v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??denc?? v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??denc?? v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??denc?? v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pisen ml??denc?? v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladencu v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladencu v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladencu v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladencu v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladencu v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladencu v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladencu v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladencu v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladenc?? v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladenc?? v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladenc?? v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladenc?? v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladenc?? v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladenc?? v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladenc?? v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? mladenc?? v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??dencu v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??dencu v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??dencu v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??dencu v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??dencu v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??dencu v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??dencu v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??dencu v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??denc?? v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??denc?? v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??denc?? v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??denc?? v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??denc?? v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??denc?? v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??denc?? v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Pise?? ml??denc?? v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladencu v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladencu v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladencu v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladencu v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladencu v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladencu v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladencu v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladencu v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladenc?? v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladenc?? v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladenc?? v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladenc?? v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladenc?? v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladenc?? v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladenc?? v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen mladenc?? v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??dencu v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??dencu v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??dencu v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??dencu v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??dencu v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??dencu v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??dencu v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??dencu v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??denc?? v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??denc?? v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??denc?? v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??denc?? v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??denc?? v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??denc?? v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??denc?? v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??sen ml??denc?? v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladencu v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladencu v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladencu v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladencu v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladencu v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladencu v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladencu v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladencu v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladenc?? v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladenc?? v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladenc?? v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladenc?? v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladenc?? v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladenc?? v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladenc?? v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? mladenc?? v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??dencu v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??dencu v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??dencu v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??dencu v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??dencu v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??dencu v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??dencu v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??dencu v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??denc?? v horici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??denc?? v horic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??denc?? v hor??ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??denc?? v hor??c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??denc?? v ho??ici peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??denc?? v ho??ic?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??denc?? v ho????ci peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("P??se?? ml??denc?? v ho????c?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Tri muzi v rozpalene peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Tri muzi v rozpalen?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Tri muzi v rozp??lene peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Tri muzi v rozp??len?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Tri mu??i v rozpalene peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Tri mu??i v rozpalen?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Tri mu??i v rozp??lene peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("Tri mu??i v rozp??len?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("T??i muzi v rozpalene peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("T??i muzi v rozpalen?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("T??i muzi v rozp??lene peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("T??i muzi v rozp??len?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("T??i mu??i v rozpalene peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("T??i mu??i v rozpalen?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("T??i mu??i v rozp??lene peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("T??i mu??i v rozp??len?? peci 1:1").osis()).toEqual("SgThree.1.1");
            expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1");
            return true;
        });
    });
    describe("Localized book Song (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Song (cs)", function () {
            expect(p.parse("Pisen Salamounova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pisen ??alamounova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pise?? Salamounova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pise?? ??alamounova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??sen Salamounova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??sen ??alamounova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??se?? Salamounova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??se?? ??alamounova 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pisen pisni 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pisen pisn?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pisen p??sni 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pisen p??sn?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pise?? pisni 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pise?? pisn?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pise?? p??sni 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pise?? p??sn?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??sen pisni 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??sen pisn?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??sen p??sni 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??sen p??sn?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??se?? pisni 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??se?? pisn?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??se?? p??sni 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??se?? p??sn?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pisen 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pise?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??sen 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??se?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("Pis 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??s 1:1").osis()).toEqual("Song.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PISEN SALAMOUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISEN ??ALAMOUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISE?? SALAMOUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISE?? ??ALAMOUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SEN SALAMOUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SEN ??ALAMOUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SE?? SALAMOUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SE?? ??ALAMOUNOVA 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISEN PISNI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISEN PISN?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISEN P??SNI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISEN P??SN?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISE?? PISNI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISE?? PISN?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISE?? P??SNI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISE?? P??SN?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SEN PISNI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SEN PISN?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SEN P??SNI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SEN P??SN?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SE?? PISNI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SE?? PISN?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SE?? P??SNI 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SE?? P??SN?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISEN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PISE?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SEN 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??SE?? 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("PIS 1:1").osis()).toEqual("Song.1.1");
            expect(p.parse("P??S 1:1").osis()).toEqual("Song.1.1");
            return true;
        });
    });
    describe("Localized book Jer (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jer (cs)", function () {
            expect(p.parse("Jeremias 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremia?? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremi??s 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremi???? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremjas 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremja?? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremj??s 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jeremj???? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("Jr 1:1").osis()).toEqual("Jer.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JEREMIAS 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMIA?? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMI??S 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMI???? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMJAS 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMJA?? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMJ??S 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JEREMJ???? 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1");
            expect(p.parse("JR 1:1").osis()).toEqual("Jer.1.1");
            return true;
        });
    });
    describe("Localized book Ezek (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Ezek (cs)", function () {
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
    describe("Localized book Dan (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Dan (cs)", function () {
            expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("Da 1:1").osis()).toEqual("Dan.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1");
            expect(p.parse("DA 1:1").osis()).toEqual("Dan.1.1");
            return true;
        });
    });
    describe("Localized book Hos (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hos (cs)", function () {
            expect(p.parse("Ozeas 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Ozea?? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Oze??s 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Oze???? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("Oz 1:1").osis()).toEqual("Hos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("OZEAS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZEA?? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZE??S 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZE???? 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1");
            expect(p.parse("OZ 1:1").osis()).toEqual("Hos.1.1");
            return true;
        });
    });
    describe("Localized book Joel (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Joel (cs)", function () {
            expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("J??el 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Jl 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("Jo 1:1").osis()).toEqual("Joel.1.1");
            p.include_apocrypha(false);
            expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("J??EL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JL 1:1").osis()).toEqual("Joel.1.1");
            expect(p.parse("JO 1:1").osis()).toEqual("Joel.1.1");
            return true;
        });
    });
    describe("Localized book Amos (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Amos (cs)", function () {
            expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??mos 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("??MOS 1:1").osis()).toEqual("Amos.1.1");
            expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1");
            return true;
        });
    });
    describe("Localized book Obad (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Obad (cs)", function () {
            expect(p.parse("Abdijas 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdija?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdij??s 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdij???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadjas 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadja?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadj??s 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadj???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdias 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdia?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdi??s 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abdi???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadja 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obadj?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("Abd 1:1").osis()).toEqual("Obad.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ABDIJAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDIJA?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDIJ??S 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDIJ???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADJAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADJA?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADJ??S 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADJ???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDIAS 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDIA?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDI??S 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABDI???? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADJA 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBADJ?? 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1");
            expect(p.parse("ABD 1:1").osis()).toEqual("Obad.1.1");
            return true;
        });
    });
    describe("Localized book Jonah (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jonah (cs)", function () {
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
    describe("Localized book Mic (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mic (cs)", function () {
            expect(p.parse("Michaas 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Michaa?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Micha??s 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Micha???? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Micheas 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Michea?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Miche??s 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Miche???? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mich 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("Mi 1:1").osis()).toEqual("Mic.1.1");
            p.include_apocrypha(false);
            expect(p.parse("MICHAAS 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHAA?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHA??S 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHA???? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHEAS 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHEA?? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHE??S 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICHE???? 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MICH 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1");
            expect(p.parse("MI 1:1").osis()).toEqual("Mic.1.1");
            return true;
        });
    });
    describe("Localized book Nah (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Nah (cs)", function () {
            expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("Na 1:1").osis()).toEqual("Nah.1.1");
            p.include_apocrypha(false);
            expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1");
            expect(p.parse("NA 1:1").osis()).toEqual("Nah.1.1");
            return true;
        });
    });
    describe("Localized book Hab (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hab (cs)", function () {
            expect(p.parse("Abakuk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Abk 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ABAKUK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("ABK 1:1").osis()).toEqual("Hab.1.1");
            expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1");
            return true;
        });
    });
    describe("Localized book Zeph (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zeph (cs)", function () {
            expect(p.parse("Sofonias 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofonia?? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofoni??s 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofoni???? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofonjas 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofonja?? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofonj??s 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sofonj???? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("Sf 1:1").osis()).toEqual("Zeph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SOFONIAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONIA?? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONI??S 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONI???? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONJAS 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONJA?? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONJ??S 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SOFONJ???? 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1");
            expect(p.parse("SF 1:1").osis()).toEqual("Zeph.1.1");
            return true;
        });
    });
    describe("Localized book Hag (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Hag (cs)", function () {
            expect(p.parse("Aggeus 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Ageus 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("Ag 1:1").osis()).toEqual("Hag.1.1");
            p.include_apocrypha(false);
            expect(p.parse("AGGEUS 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AGEUS 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1");
            expect(p.parse("AG 1:1").osis()).toEqual("Hag.1.1");
            return true;
        });
    });
    describe("Localized book Zech (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Zech (cs)", function () {
            expect(p.parse("Zacharias 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zacharia?? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zachari??s 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zachari???? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zacharjas 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zacharja?? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zacharj??s 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zacharj???? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("Za 1:1").osis()).toEqual("Zech.1.1");
            p.include_apocrypha(false);
            expect(p.parse("ZACHARIAS 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACHARIA?? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACHARI??S 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACHARI???? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACHARJAS 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACHARJA?? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACHARJ??S 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZACHARJ???? 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1");
            expect(p.parse("ZA 1:1").osis()).toEqual("Zech.1.1");
            return true;
        });
    });
    describe("Localized book Mal (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mal (cs)", function () {
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
    describe("Localized book Matt (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Matt (cs)", function () {
            expect(p.parse("Evangelium podle Matouse 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Evangelium podle Matou??e 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matousovo evangelium 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matou??ovo evangelium 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matous 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matou?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mat 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("Mt 1:1").osis()).toEqual("Matt.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIUM PODLE MATOUSE 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("EVANGELIUM PODLE MATOU??E 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATOUSOVO EVANGELIUM 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATOU??OVO EVANGELIUM 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATOUS 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATOU?? 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MAT 1:1").osis()).toEqual("Matt.1.1");
            expect(p.parse("MT 1:1").osis()).toEqual("Matt.1.1");
            return true;
        });
    });
    describe("Localized book Mark (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Mark (cs)", function () {
            expect(p.parse("Evangelium podle Marka 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Markovo evangelium 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Marek 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("Mk 1:1").osis()).toEqual("Mark.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIUM PODLE MARKA 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARKOVO EVANGELIUM 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MAREK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1");
            expect(p.parse("MK 1:1").osis()).toEqual("Mark.1.1");
            return true;
        });
    });
    describe("Localized book Luke (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Luke (cs)", function () {
            expect(p.parse("Evangelium podle Lukase 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evangelium podle Luka??e 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evangelium podle Luk??se 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Evangelium podle Luk????e 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lukasovo evangelium 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luka??ovo evangelium 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk??sovo evangelium 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk????ovo evangelium 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lukas 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luka?? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk??s 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luk???? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("Lk 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L 1:1").osis()).toEqual("Luke.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIUM PODLE LUKASE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANGELIUM PODLE LUKA??E 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANGELIUM PODLE LUK??SE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("EVANGELIUM PODLE LUK????E 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKASOVO EVANGELIUM 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKA??OVO EVANGELIUM 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??SOVO EVANGELIUM 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK????OVO EVANGELIUM 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKAS 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKA?? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK??S 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUK???? 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("LK 1:1").osis()).toEqual("Luke.1.1");
            expect(p.parse("L 1:1").osis()).toEqual("Luke.1.1");
            return true;
        });
    });
    describe("Localized book 1John (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1John (cs)", function () {
            expect(p.parse("Prvni list Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvni list Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvn?? list Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvn?? list Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. list Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. list Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. list Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. list Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 list Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 list Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I list Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I list Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvni Janova 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvn?? Janova 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvni Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvni Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvn?? Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvn?? Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Janova 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Janova 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvni Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvn?? Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Janova 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Janova 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Januv 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Jan??v 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvni J 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("Prvn?? J 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I Jan 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. J 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. J 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 J 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I J 1:1").osis()).toEqual("1John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVNI LIST JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVNI LIST JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVN?? LIST JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVN?? LIST JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. LIST JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. LIST JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. LIST JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. LIST JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 LIST JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 LIST JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I LIST JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I LIST JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVNI JANOVA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVN?? JANOVA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVNI JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVNI JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVN?? JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVN?? JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JANOVA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JANOVA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVNI JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVN?? JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JANOVA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JANOVA 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JANUV 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JAN??V 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVNI J 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("PRVN?? J 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I JAN 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1. J 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I. J 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("1 J 1:1").osis()).toEqual("1John.1.1");
            expect(p.parse("I J 1:1").osis()).toEqual("1John.1.1");
            return true;
        });
    });
    describe("Localized book 2John (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2John (cs)", function () {
            expect(p.parse("Druha list Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druha list Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy list Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy list Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? list Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? list Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? list Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? list Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. list Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. list Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. list Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. list Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II list Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II list Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 list Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 list Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druha Janova 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy Janova 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Janova 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Janova 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druha Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druha Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Janova 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Janova 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druha Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Janova 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Janova 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Januv 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Jan??v 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druha J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druhy J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("Druh?? J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 Jan 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 J 1:1").osis()).toEqual("2John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA LIST JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHA LIST JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY LIST JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY LIST JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? LIST JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? LIST JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? LIST JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? LIST JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. LIST JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. LIST JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. LIST JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. LIST JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II LIST JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II LIST JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 LIST JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 LIST JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHA JANOVA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY JANOVA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JANOVA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JANOVA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHA JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHA JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JANOVA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JANOVA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHA JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JANOVA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JANOVA 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JANUV 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JAN??V 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHA J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUHY J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("DRUH?? J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 JAN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II. J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2. J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("II J 1:1").osis()).toEqual("2John.1.1");
            expect(p.parse("2 J 1:1").osis()).toEqual("2John.1.1");
            return true;
        });
    });
    describe("Localized book 3John (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3John (cs)", function () {
            expect(p.parse("Treti list Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Treti list Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? list Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? list Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??eti list Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??eti list Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??et?? list Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??et?? list Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. list Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. list Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III list Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III list Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. list Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. list Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 list Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 list Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Treti Janova 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? Janova 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??eti Janova 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??et?? Janova 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Janova 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Treti Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Treti Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??eti Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??eti Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??et?? Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??et?? Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Janova 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Janova 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Treti Jan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? Jan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??eti Jan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??et?? Jan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Janova 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. Jan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Januv 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Jan??v 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III Jan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Treti J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("Tret?? J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??eti J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??et?? J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. Jan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 Jan 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 J 1:1").osis()).toEqual("3John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("TRETI LIST JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETI LIST JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? LIST JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? LIST JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ETI LIST JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ETI LIST JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ET?? LIST JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ET?? LIST JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. LIST JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. LIST JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III LIST JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III LIST JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. LIST JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. LIST JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 LIST JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 LIST JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETI JANOVA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? JANOVA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ETI JANOVA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ET?? JANOVA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. JANOVA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETI JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETI JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ETI JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ETI JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ET?? JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ET?? JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III JANOVA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JANOVA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETI JAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? JAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ETI JAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ET?? JAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JANOVA 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. JAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JANUV 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JAN??V 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III JAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRETI J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("TRET?? J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ETI J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("T??ET?? J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. JAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III. J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 JAN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("III J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3. J 1:1").osis()).toEqual("3John.1.1");
            expect(p.parse("3 J 1:1").osis()).toEqual("3John.1.1");
            return true;
        });
    });
    describe("Localized book John (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: John (cs)", function () {
            expect(p.parse("Evangelium podle Jana 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Janovo evangelium 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("John 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("Jan 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J 1:1").osis()).toEqual("John.1.1");
            p.include_apocrypha(false);
            expect(p.parse("EVANGELIUM PODLE JANA 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JANOVO EVANGELIUM 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("JAN 1:1").osis()).toEqual("John.1.1");
            expect(p.parse("J 1:1").osis()).toEqual("John.1.1");
            return true;
        });
    });
    describe("Localized book Acts (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Acts (cs)", function () {
            expect(p.parse("Skutky apostolske 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky apostolsk?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky apo??tolske 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky apo??tolsk?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky apostolu 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky apostol?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky apostol?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky apo??tolu 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky apo??tol?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky apo??tol?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Skutky 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("Sk 1:1").osis()).toEqual("Acts.1.1");
            p.include_apocrypha(false);
            expect(p.parse("SKUTKY APOSTOLSKE 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY APOSTOLSK?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY APO??TOLSKE 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY APO??TOLSK?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY APOSTOLU 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY APOSTOL?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY APOSTOL?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY APO??TOLU 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY APO??TOL?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY APO??TOL?? 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SKUTKY 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1");
            expect(p.parse("SK 1:1").osis()).toEqual("Acts.1.1");
            return true;
        });
    });
    describe("Localized book Rom (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Rom (cs)", function () {
            expect(p.parse("List Rimanum 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("List Riman??m 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("List R??manum 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("List R??man??m 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("List ??imanum 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("List ??iman??m 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("List ????manum 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("List ????man??m 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rimanum 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Riman??m 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??manum 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??man??m 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("??imanum 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("??iman??m 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("????manum 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("????man??m 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rim 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??m 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("??im 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("????m 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?? 1:1").osis()).toEqual("Rom.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST RIMANUM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("LIST RIMAN??M 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("LIST R??MANUM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("LIST R??MAN??M 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("LIST ??IMANUM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("LIST ??IMAN??M 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("LIST ????MANUM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("LIST ????MAN??M 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("RIMANUM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("RIMAN??M 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??MANUM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??MAN??M 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("??IMANUM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("??IMAN??M 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("????MANUM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("????MAN??M 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("RIM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R??M 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("??IM 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("????M 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("R 1:1").osis()).toEqual("Rom.1.1");
            expect(p.parse("?? 1:1").osis()).toEqual("Rom.1.1");
            return true;
        });
    });
    describe("Localized book 2Cor (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Cor (cs)", function () {
            expect(p.parse("Druha list Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha list Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy list Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy list Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha list Korinskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha list Korinsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy list Korinskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy list Korinsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korinskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korinsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korinskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? list Korinsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. list Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. list Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. list Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. list Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II list Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II list Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. list Korinskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. list Korinsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 list Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 list Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. list Korinskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. list Korinsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II list Korinskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II list Korinsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 list Korinskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 list Korinsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korintskym 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Korintsk??m 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druha K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druhy K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh?? K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DruhaK 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DruhyK 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh??K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("Druh??K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2Kor 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II.K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2.K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("IIK 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2K 1:1").osis()).toEqual("2Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA LIST KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY LIST KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA LIST KORINSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY LIST KORINSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? LIST KORINSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. LIST KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. LIST KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II LIST KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. LIST KORINSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 LIST KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 LIST KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. LIST KORINSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II LIST KORINSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 LIST KORINSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 LIST KORINSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTSKYM 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KORINTSK??M 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHA K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHY K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH?? K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHAK 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUHYK 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH??K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("DRUH??K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II. K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2. K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2KOR 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("II.K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2 K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2.K 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("IIK 1:1").osis()).toEqual("2Cor.1.1");
            expect(p.parse("2K 1:1").osis()).toEqual("2Cor.1.1");
            return true;
        });
    });
    describe("Localized book 1Cor (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Cor (cs)", function () {
            expect(p.parse("Prvni list Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvni list Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvn?? list Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvn?? list Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvni list Korinskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvni list Korinsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvn?? list Korinskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvn?? list Korinsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. list Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. list Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. list Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. list Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 list Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 list Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. list Korinskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. list Korinsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I list Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I list Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. list Korinskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. list Korinsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 list Korinskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 list Korinsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I list Korinskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I list Korinsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvni Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvni Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvn?? Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvn?? Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korintskym 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Korintsk??m 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvni Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvn?? Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvni K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvn?? K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PrvniK 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("Prvn??K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I Kor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1.K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I.K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("IK 1:1").osis()).toEqual("1Cor.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVNI LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVNI LIST KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVN?? LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVN?? LIST KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVNI LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVNI LIST KORINSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVN?? LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVN?? LIST KORINSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. LIST KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. LIST KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 LIST KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. LIST KORINSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I LIST KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I LIST KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. LIST KORINSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 LIST KORINSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I LIST KORINSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I LIST KORINSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVNI KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVNI KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVN?? KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVN?? KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTSKYM 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KORINTSK??M 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVNI KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVN?? KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVNI K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVN?? K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVNIK 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("PRVN??K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I KOR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1. K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I. K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1 K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1.K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("I.K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("1K 1:1").osis()).toEqual("1Cor.1.1");
            expect(p.parse("IK 1:1").osis()).toEqual("1Cor.1.1");
            return true;
        });
    });
    describe("Localized book Gal (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Gal (cs)", function () {
            expect(p.parse("List Galatskym 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("List Galatsk??m 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galatskym 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Galatsk??m 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("Ga 1:1").osis()).toEqual("Gal.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST GALATSKYM 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("LIST GALATSK??M 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATSKYM 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GALATSK??M 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1");
            expect(p.parse("GA 1:1").osis()).toEqual("Gal.1.1");
            return true;
        });
    });
    describe("Localized book Eph (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Eph (cs)", function () {
            expect(p.parse("List Efezanum 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("List Efezan??m 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("List Efezskym 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("List Efezsk??m 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("List Ef??zskym 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("List Ef??zsk??m 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efezskym 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efezsk??m 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efeskym 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Efesk??m 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST EFEZANUM 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("LIST EFEZAN??M 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("LIST EFEZSKYM 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("LIST EFEZSK??M 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("LIST EF??ZSKYM 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("LIST EF??ZSK??M 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFEZSKYM 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFEZSK??M 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFESKYM 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EFESK??M 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1");
            expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1");
            return true;
        });
    });
    describe("Localized book Phil (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phil (cs)", function () {
            expect(p.parse("List Filipskym 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("List Filipsk??m 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipenskym 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipensk??m 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipskym 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Filipsk??m 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("Fp 1:1").osis()).toEqual("Phil.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST FILIPSKYM 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("LIST FILIPSK??M 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPENSKYM 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPENSK??M 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPSKYM 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FILIPSK??M 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1");
            expect(p.parse("FP 1:1").osis()).toEqual("Phil.1.1");
            return true;
        });
    });
    describe("Localized book Col (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Col (cs)", function () {
            expect(p.parse("List Kolosanum 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("List Kolosan??m 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("List Koloskym 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("List Kolosk??m 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolossenskym 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolossensk??m 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosenskym 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosensk??m 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosanum 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosan??m 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Koloskym 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kolosk??m 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("Ko 1:1").osis()).toEqual("Col.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST KOLOSANUM 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("LIST KOLOSAN??M 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("LIST KOLOSKYM 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("LIST KOLOSK??M 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSENSKYM 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSSENSK??M 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSENSKYM 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSENSK??M 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSANUM 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSAN??M 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSKYM 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOLOSK??M 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1");
            expect(p.parse("KO 1:1").osis()).toEqual("Col.1.1");
            return true;
        });
    });
    describe("Localized book 2Thess (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Thess (cs)", function () {
            expect(p.parse("Druha list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha list Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Tessalonicensk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Tessalonicensk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tessalonicensk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tessalonicensk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. list Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. list Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha list Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha list Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha list Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha list Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy list Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? list Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II list Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tessalonicensk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 list Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 list Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tessalonicensk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tessalonicensk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tessalonicenskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tessalonicensk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. list Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. list Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. list Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. list Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. list Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. list Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. list Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. list Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II list Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II list Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II list Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II list Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 list Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 list Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 list Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 list Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesalonickym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Tesalonick??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Solunskym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Solunsk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Solu??skym 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Solu??sk??m 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Sol 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Sol 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Sol 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Sol 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druha Te 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druhy Te 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Te 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("Druh?? Te 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Sol 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Sol 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Sol 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. Te 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Sol 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. Te 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II Te 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 Te 1:1").osis()).toEqual("2Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA LIST TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA TESSALONICENSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY TESSALONICENSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESSALONICENSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESSALONICENSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. LIST TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. LIST TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA LIST SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA LIST SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA LIST SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY LIST SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? LIST SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II LIST TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESSALONICENSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 LIST TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 LIST TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESSALONICENSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESSALONICENSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESSALONICENSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESSALONICENSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. LIST SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. LIST SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. LIST SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. LIST SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. LIST SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. LIST SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II LIST SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II LIST SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II LIST SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 LIST SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 LIST SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 LIST SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 LIST SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESALONICKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TESALONICK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOLUNSKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOLUNSK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOLU??SKYM 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOLU??SK??M 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA SOL 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY SOL 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOL 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? SOL 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHA TE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUHY TE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("DRUH?? TE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. SOL 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. SOL 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II SOL 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II. TE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 SOL 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2. TE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("II TE 1:1").osis()).toEqual("2Thess.1.1");
            expect(p.parse("2 TE 1:1").osis()).toEqual("2Thess.1.1");
            return true;
        });
    });
    describe("Localized book 1Thess (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Thess (cs)", function () {
            expect(p.parse("Prvni list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni list Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? list Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni Tessalonicensk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? Tessalonicensk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. list Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. list Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni list Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni list Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni list Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni list Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? list Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? list Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? list Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? list Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 list Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tessalonicensk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I list Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I list Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tessalonicensk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tessalonicensk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tessalonicenskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tessalonicensk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. list Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. list Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. list Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. list Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. list Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. list Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. list Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. list Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 list Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 list Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 list Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 list Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I list Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I list Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I list Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I list Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesalonickym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Tesalonick??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Solunskym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Solunsk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Solu??skym 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Solu??sk??m 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni Sol 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? Sol 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvni Te 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("Prvn?? Te 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Sol 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Sol 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Sol 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. Te 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Sol 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. Te 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 Te 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I Te 1:1").osis()).toEqual("1Thess.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVNI LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI LIST TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? LIST TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI TESSALONICENSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? TESSALONICENSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. LIST TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. LIST TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI LIST SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI LIST SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI LIST SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? LIST SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? LIST SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? LIST SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 LIST TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESSALONICENSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I LIST TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I LIST TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESSALONICENSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESSALONICENSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESSALONICENSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESSALONICENSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. LIST SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. LIST SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. LIST SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. LIST SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. LIST SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. LIST SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 LIST SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 LIST SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 LIST SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I LIST SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I LIST SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I LIST SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I LIST SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESALONICKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TESALONICK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOLUNSKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOLUNSK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOLU??SKYM 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOLU??SK??M 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI SOL 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? SOL 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVNI TE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("PRVN?? TE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. SOL 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. SOL 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 SOL 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1. TE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I SOL 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I. TE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("1 TE 1:1").osis()).toEqual("1Thess.1.1");
            expect(p.parse("I TE 1:1").osis()).toEqual("1Thess.1.1");
            return true;
        });
    });
    describe("Localized book 2Tim (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Tim (cs)", function () {
            expect(p.parse("Druha list Timetejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druha list Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy list Timetejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy list Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? list Timetejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? list Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? list Timetejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? list Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druha list Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy list Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? list Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? list Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. list Timetejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. list Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. list Timetejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. list Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II list Timetejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II list Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. list Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 list Timetejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 list Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. list Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II list Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 list Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druha Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druha Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druha Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timotejovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteovi 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Timoteus 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druha Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druha Tm 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druhy Tm 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Tm 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("Druh?? Tm 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. Tm 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. Tm 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II Tm 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 Tm 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHA LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHA LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 LIST TIMETEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 LIST TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 LIST TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHA TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHA TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHA TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEJOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEOVI 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHA TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHA TM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUHY TM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("DRUH?? TM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II. TM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2. TM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("II TM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2 TM 1:1").osis()).toEqual("2Tim.1.1");
            expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1");
            return true;
        });
    });
    describe("Localized book 1Tim (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Tim (cs)", function () {
            expect(p.parse("Prvni list Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvn?? list Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvni list Timeteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvni list Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvn?? list Timeteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvn?? list Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. list Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. list Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 list Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. list Timeteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. list Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I list Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. list Timeteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. list Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 list Timeteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 list Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I list Timeteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I list Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvni Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvn?? Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvni Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvn?? Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvni Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvn?? Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timotejovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timoteovi 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Timoteus 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvni Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvn?? Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvni Tm 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("Prvn?? Tm 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. Tm 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. Tm 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 Tm 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I Tm 1:1").osis()).toEqual("1Tim.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVNI LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVN?? LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVNI LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVNI LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVN?? LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVN?? LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I LIST TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I LIST TIMETEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I LIST TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVNI TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVN?? TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVNI TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVN?? TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVNI TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVN?? TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTEJOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTEOVI 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVNI TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVN?? TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVNI TM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("PRVN?? TM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1. TM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I. TM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1 TM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1");
            expect(p.parse("I TM 1:1").osis()).toEqual("1Tim.1.1");
            return true;
        });
    });
    describe("Localized book Titus (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Titus (cs)", function () {
            expect(p.parse("List Titovi 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titovi 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("Tt 1:1").osis()).toEqual("Titus.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST TITOVI 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITOVI 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1");
            expect(p.parse("TT 1:1").osis()).toEqual("Titus.1.1");
            return true;
        });
    });
    describe("Localized book Phlm (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Phlm (cs)", function () {
            expect(p.parse("List Filemonovi 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemonovi 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Filemon 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Flm 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("Fm 1:1").osis()).toEqual("Phlm.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST FILEMONOVI 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMONOVI 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FILEMON 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FLM 1:1").osis()).toEqual("Phlm.1.1");
            expect(p.parse("FM 1:1").osis()).toEqual("Phlm.1.1");
            return true;
        });
    });
    describe("Localized book Heb (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Heb (cs)", function () {
            expect(p.parse("List Hebrejum 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("List Hebrej??m 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("List Zidum 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("List Zid??m 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("List ??idum 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("List ??id??m 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebrejum 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Hebrej??m 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zidum 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zid??m 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??idum 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??id??m 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("Zd 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??d 1:1").osis()).toEqual("Heb.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST HEBREJUM 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("LIST HEBREJ??M 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("LIST ZIDUM 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("LIST ZID??M 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("LIST ??IDUM 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("LIST ??ID??M 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBREJUM 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEBREJ??M 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZIDUM 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZID??M 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??IDUM 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??ID??M 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("ZD 1:1").osis()).toEqual("Heb.1.1");
            expect(p.parse("??D 1:1").osis()).toEqual("Heb.1.1");
            return true;
        });
    });
    describe("Localized book Jas (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jas (cs)", function () {
            expect(p.parse("List Jakubuv 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("List Jakub??v 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakubuv 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakub??v 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jakub 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("Jk 1:1").osis()).toEqual("Jas.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST JAKUBUV 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("LIST JAKUB??V 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKUBUV 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKUB??V 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAKUB 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1");
            expect(p.parse("JK 1:1").osis()).toEqual("Jas.1.1");
            return true;
        });
    });
    describe("Localized book 2Pet (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Pet (cs)", function () {
            expect(p.parse("Druha list Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druha list Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy list Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy list Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? list Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? list Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? list Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? list Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. list Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. list Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. list Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. list Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II list Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II list Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 list Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 list Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druha Petrova 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy Petrova 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petrova 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petrova 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druha Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druha Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Petrova 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petrova 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druha Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Petrova 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petrova 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petruv 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petr??v 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druha Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druha P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druhy P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("Druh?? P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Petr 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 Pt 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 P 1:1").osis()).toEqual("2Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("DRUHA LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHA LIST PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY LIST PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? LIST PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? LIST PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. LIST PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. LIST PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II LIST PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 LIST PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 LIST PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHA PETROVA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY PETROVA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETROVA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETROVA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHA PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHA PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PETROVA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETROVA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHA PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PETROVA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETROVA 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETRUV 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETR??V 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHA PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHA P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUHY P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("DRUH?? P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PETR 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II. P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 PT 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2. P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("II P 1:1").osis()).toEqual("2Pet.1.1");
            expect(p.parse("2 P 1:1").osis()).toEqual("2Pet.1.1");
            return true;
        });
    });
    describe("Localized book 1Pet (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Pet (cs)", function () {
            expect(p.parse("Prvni list Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvni list Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvn?? list Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvn?? list Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. list Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. list Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. list Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. list Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 list Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 list Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I list Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I list Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvni Petrova 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvn?? Petrova 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvni Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvni Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvn?? Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvn?? Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petrova 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Petrova 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvni Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvn?? Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petrova 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Petrova 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Petruv 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Petr??v 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvni Pt 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvn?? Pt 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvni P 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("Prvn?? P 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Petr 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. Pt 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. Pt 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 Pt 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. P 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I Pt 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. P 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 P 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I P 1:1").osis()).toEqual("1Pet.1.1");
            p.include_apocrypha(false);
            expect(p.parse("PRVNI LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVNI LIST PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVN?? LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVN?? LIST PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. LIST PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. LIST PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 LIST PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I LIST PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I LIST PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVNI PETROVA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVN?? PETROVA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVNI PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVNI PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVN?? PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVN?? PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETROVA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PETROVA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVNI PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVN?? PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETROVA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PETROVA 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PETRUV 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PETR??V 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVNI PT 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVN?? PT 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVNI P 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("PRVN?? P 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PETR 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. PT 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. PT 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 PT 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1. P 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I PT 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I. P 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("1 P 1:1").osis()).toEqual("1Pet.1.1");
            expect(p.parse("I P 1:1").osis()).toEqual("1Pet.1.1");
            return true;
        });
    });
    describe("Localized book Jude (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jude (cs)", function () {
            expect(p.parse("List Juduv 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("List Jud??v 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Judova 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Juduv 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jud??v 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Juda 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Jd 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("Ju 1:1").osis()).toEqual("Jude.1.1");
            p.include_apocrypha(false);
            expect(p.parse("LIST JUDUV 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("LIST JUD??V 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDOVA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDUV 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUD??V 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDA 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JD 1:1").osis()).toEqual("Jude.1.1");
            expect(p.parse("JU 1:1").osis()).toEqual("Jude.1.1");
            return true;
        });
    });
    describe("Localized book Tob (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Tob (cs)", function () {
            expect(p.parse("Tobijas 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobija?? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobij??s 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobij???? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??bijas 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??bija?? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??bij??s 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??bij???? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobias 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobia?? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobi??s 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobi???? 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tobit 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("T??bit 1:1").osis()).toEqual("Tob.1.1");
            expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1");
            return true;
        });
    });
    describe("Localized book Jdt (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Jdt (cs)", function () {
            expect(p.parse("Judit 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("J??dit 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("Jud 1:1").osis()).toEqual("Jdt.1.1");
            expect(p.parse("J??d 1:1").osis()).toEqual("Jdt.1.1");
            return true;
        });
    });
    describe("Localized book Bar (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Bar (cs)", function () {
            expect(p.parse("Kniha Baruchova 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Kniha B??ruchova 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Kniha Barukova 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Kniha B??rukova 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Baruch 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("B??ruch 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Baruk 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("B??ruk 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1");
            expect(p.parse("B??r 1:1").osis()).toEqual("Bar.1.1");
            return true;
        });
    });
    describe("Localized book Sus (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: Sus (cs)", function () {
            expect(p.parse("Zuzana 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1");
            expect(p.parse("Zuz 1:1").osis()).toEqual("Sus.1.1");
            return true;
        });
    });
    describe("Localized book 2Macc (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 2Macc (cs)", function () {
            expect(p.parse("Druha Makabejska 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druha Makabejsk?? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druhy Makabejska 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druhy Makabejsk?? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? Makabejska 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? Makabejsk?? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? Makabejska 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? Makabejsk?? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Makabejska 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Makabejsk?? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makabejska 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Makabejsk?? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Makabejska 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Makabejsk?? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makabejska 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Makabejsk?? 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druha Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druhy Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("Druh?? Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II. Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2. Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("II Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2 Mak 1:1").osis()).toEqual("2Macc.1.1");
            expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1");
            return true;
        });
    });
    describe("Localized book 3Macc (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 3Macc (cs)", function () {
            expect(p.parse("Treti Makabejska 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Treti Makabejsk?? 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Tret?? Makabejska 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Tret?? Makabejsk?? 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("T??eti Makabejska 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("T??eti Makabejsk?? 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("T??et?? Makabejska 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("T??et?? Makabejsk?? 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Makabejska 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Makabejsk?? 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Makabejska 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Makabejsk?? 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makabejska 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Makabejsk?? 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makabejska 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Makabejsk?? 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Treti Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("Tret?? Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("T??eti Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("T??et?? Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III. Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("III Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3. Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3 Mak 1:1").osis()).toEqual("3Macc.1.1");
            expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1");
            return true;
        });
    });
    describe("Localized book 4Macc (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 4Macc (cs)", function () {
            expect(p.parse("Ctvrta Makabejska 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Ctvrta Makabejsk?? 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Ctvrt?? Makabejska 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Ctvrt?? Makabejsk?? 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("??tvrta Makabejska 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("??tvrta Makabejsk?? 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("??tvrt?? Makabejska 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("??tvrt?? Makabejsk?? 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Makabejska 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Makabejsk?? 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makabejska 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Makabejsk?? 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Makabejska 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Makabejsk?? 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makabejska 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Makabejsk?? 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Ctvrta Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("Ctvrt?? Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("??tvrta Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("??tvrt?? Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV. Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4. Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("IV Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4 Mak 1:1").osis()).toEqual("4Macc.1.1");
            expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1");
            return true;
        });
    });
    describe("Localized book 1Macc (cs)", function () {
        var p;
        p = {};
        beforeEach(function () {
            p = new bcv_parser;
            p.set_options({
                book_alone_strategy: "ignore",
                book_sequence_strategy: "ignore",
                osis_compaction_strategy: "bc",
                captive_end_digits_strategy: "delete"
            });
            return p.include_apocrypha(true);
        });
        return it("should handle book: 1Macc (cs)", function () {
            expect(p.parse("Prvni Makabejska 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prvni Makabejsk?? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prvn?? Makabejska 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prvn?? Makabejsk?? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makabejska 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Makabejsk?? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Makabejska 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Makabejsk?? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makabejska 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Makabejsk?? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Makabejska 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Makabejsk?? 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prvni Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("Prvn?? Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1. Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I. Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1 Mak 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1");
            expect(p.parse("I Mak 1:1").osis()).toEqual("1Macc.1.1");
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
            return expect(p.languages).toEqual(["cs"]);
        });
        it("should handle ranges (cs)", function () {
            expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
            expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
            return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
        });
        it("should handle chapters (cs)", function () {
            expect(p.parse("Titus 1:1, kapitola 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITOLA 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapitoly 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITOLY 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kapitol 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAPITOL 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kap. 2").osis()).toEqual("Titus.1.1,Titus.2");
            expect(p.parse("Matt 3:4 KAP. 6").osis()).toEqual("Matt.3.4,Matt.6");
            expect(p.parse("Titus 1:1, kap 2").osis()).toEqual("Titus.1.1,Titus.2");
            return expect(p.parse("Matt 3:4 KAP 6").osis()).toEqual("Matt.3.4,Matt.6");
        });
        it("should handle verses (cs)", function () {
            expect(p.parse("Exod 1:1 ver??e 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm VER??E 6").osis()).toEqual("Phlm.1.6");
            expect(p.parse("Exod 1:1 verse 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm VERSE 6").osis()).toEqual("Phlm.1.6");
        });
        it("should handle 'and' (cs)", function () {
            expect(p.parse("Exod 1:1 a 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 A 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 srv. 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            expect(p.parse("Phlm 2 SRV. 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
            expect(p.parse("Exod 1:1 srv 3").osis()).toEqual("Exod.1.1,Exod.1.3");
            return expect(p.parse("Phlm 2 SRV 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
        });
        it("should handle titles (cs)", function () {
            expect(p.parse("Ps 3 titul, 4:2, 5:titul").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
            return expect(p.parse("PS 3 TITUL, 4:2, 5:TITUL").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
        });
        it("should handle 'ff' (cs)", function () {
            expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
            return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
        });
        it("should handle translations (cs)", function () {
            expect(p.parse("Lev 1 (B21)").osis_and_translations()).toEqual([["Lev.1", "B21"]]);
            return expect(p.parse("lev 1 b21").osis_and_translations()).toEqual([["Lev.1", "B21"]]);
        });
        it("should handle book ranges (cs)", function () {
            p.set_options({
                book_alone_strategy: "full",
                book_range_strategy: "include"
            });
            return expect(p.parse("Prvn?? - T??et??  J").osis()).toEqual("1John.1-3John.1");
        });
        return it("should handle boundaries (cs)", function () {
            p.set_options({
                book_alone_strategy: "full"
            });
            expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
            return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
        });
    });
}).call(this);
//# sourceMappingURL=cs.spec.js.map