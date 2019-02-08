import {makeWorkout} from "./make_workout.js";

(function() {
    'use strict';

    var app = {
        selectedDifficulty: "",
    };!


    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/

    document.getElementById('selectDifficulty').addEventListener('change', function() {
        // Add the newly selected city
        const select = document.getElementById('selectDifficulty');
        const selected = select.options[select.selectedIndex];
        const key = selected.value;
        app.selectedDifficulty = key;
        console.log(app.selectedDifficulty);
    });

    document.getElementById('generate').addEventListener('click', function() {
        const query = { difficulty: app.selectedDifficulty };
        const result = makeWorkout(query);
        console.log(result)
    })
})();

