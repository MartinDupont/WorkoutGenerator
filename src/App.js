import {makeWorkout} from "./make_workout.js";

const thing = function() {
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
        document.getElementById("tableArea").innerHTML = makeTableFromJson(result);
    });

    /*****************************************************************************
     *
     * Functions for generating the table
     *
     ****************************************************************************/


    const makeTableFromJson = (jsonWorkout) => {
        let outputString = '';
        if (jsonWorkout.name){outputString += `<div>${jsonWorkout.name}</div>`}
        if (jsonWorkout.notes){outputString += `<div>${jsonWorkout.notes}</div>`}

        outputString += (`
            <table style="width:100%">
                <tr><th>Exercise</th><th>Reps, Sets, Percentage</th></tr>
                ${mapExerciseBlocks(jsonWorkout['exercise-blocks'])}
            </table>
        `);

        return outputString
    };

    const mapExerciseBlocks = (exerciseBlocks) => {
        let outputString = "";
        exerciseBlocks.forEach(block => outputString += `<tr><td>${block.exercise}</td><td>${makeSubTable(block.setBlocks)}</td></tr>`);
        return outputString
    };

    const makeSubTable = (setBlocks) => {
        let outputString = `
            <table style="width:100%">
                ${setBlocks.map(block => makeRow(block)).join('\n')}
            </table>`;
        return outputString
    };

    const makeRow = (block) => (`
        <tr>
            <td>${block.reps}</td>
            <td>${block.sets}</td>
            <td>${block.percent ? block.percent : ""}</td>
        </tr>`
    )

};
thing();
