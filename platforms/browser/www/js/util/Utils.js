define(['require', 'module'], function(require, module) {
    'use strict';

    module.exports = {
        revertMatrix : function(matrix) {
            var revertedMatrix = [];
            for (var i = 0; i < matrix[0].length; i++) {
                var line = [];
                for (var j = 0; j < matrix.length; j++) {
                    line.push(matrix[j][i]);
                }
                revertedMatrix.push(line);
            }
            return revertedMatrix;
        },

        /**
         * Simplest and universal way to check if a variable is defined
         */
        isDefined : function(myVar) {
            return typeof myVar !== "undefined";
        }
    };
});

