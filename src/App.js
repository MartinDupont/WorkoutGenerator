
(function() {
    'use strict';

    var app = {
        selectedDifficulty: "",
    };


    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/

    document.getElementById('selectDifficulty').addEventListener('change', function() {
        // Add the newly selected city
        var select = document.getElementById('selectDifficulty');
        var selected = select.options[select.selectedIndex];
        var key = selected.value;
        app.selectedDifficulty = key;
        console.log(app.selectedDifficulty);
    });
})();

