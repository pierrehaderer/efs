
var app = {
    images : {
        get : function(string) {
            var image = {
                width : 0,
                height : 0
            };
            return image;
       }
    },
    canvas : {
        setAttribute : function() {},
        gatAttribute : function() {},
        style : {}
    }
};

require(["map/Maps"],
function(Maps) {
        
    var maps = new Maps();

    describe("Test de la map", function() {
        maps.loadMap("Test", "abc|def|ghi|");

        it("Test du parsing", function() {
            expect(maps.content.length).toBe(3);

            expect(maps.content[0].length).toBe(3);
            expect(maps.content[1].length).toBe(3);
            expect(maps.content[2].length).toBe(3);

            expect(maps.content[0][0].char).toBe("a");
            expect(maps.content[1][0].char).toBe("b");
            expect(maps.content[2][0].char).toBe("c");
            expect(maps.content[0][1].char).toBe("d");
            expect(maps.content[1][1].char).toBe("e");
            expect(maps.content[2][1].char).toBe("f");
            expect(maps.content[0][2].char).toBe("g");
            expect(maps.content[1][2].char).toBe("h");
            expect(maps.content[2][2].char).toBe("i");
        });
    });
});