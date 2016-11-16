require(["map/Maps", "canvas/context"], function(map, can) {
    describe("Test de la map", function() {
        can.canvas = {
            setAttribute : function() {},
            gatAttribute : function() {},
            style : {}
        };
        map.loadMap("Test", "abc|def|ghi|");

        it("Test du parsing", function() {
            expect(map.content.length).toBe(3);

            expect(map.content[0].length).toBe(3);
            expect(map.content[1].length).toBe(3);
            expect(map.content[2].length).toBe(3);

            expect(map.content[0][0].char).toBe("a");
            expect(map.content[1][0].char).toBe("b");
            expect(map.content[2][0].char).toBe("c");
            expect(map.content[0][1].char).toBe("d");
            expect(map.content[1][1].char).toBe("e");
            expect(map.content[2][1].char).toBe("f");
            expect(map.content[0][2].char).toBe("g");
            expect(map.content[1][2].char).toBe("h");
            expect(map.content[2][2].char).toBe("i");
        });
    });
});