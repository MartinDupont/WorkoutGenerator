import {makeWorkout} from "./make_workout.js";

const main = function() {
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
        return (`
            ${jsonWorkout.name ? `<div class="workout-name">${jsonWorkout.name}</div>` : ''}
            ${jsonWorkout.notes ? `<div>${`Notes: ${jsonWorkout.notes}`}</div>` : ''}
            ${app.selectedDifficulty ? '' : `<div>${`Difficulty: ${jsonWorkout.difficulty}`}</div>`}
            <table style="width:100%" class="outerTable">
                <tr>
                  <th width="40%">Exercise</th>
                  <th width="20%">Percent</th>
                  <th width="20%">Reps</th>
                  <th width="20%">Sets</th>
                </tr>
                ${mapExerciseBlocks(jsonWorkout['exercise-blocks'])}
            </table>
        `);
    };

    const mapExerciseBlocks = (exerciseBlocks) => {
        let outputString = "";
        exerciseBlocks.forEach(block => outputString += `<tr><td>${block.exercise}</td>${makeSubTables(block.setBlocks)}</tr>`);
        return outputString
    };

    const makeSubTables = (setBlocks) => {
        let outputString = '';
        const columns = ['percent', 'reps', 'sets'];
        columns.forEach(column => {
          outputString += `
            <td>
              <table style="width:100%" class="innerTable">
                  ${setBlocks.map(block => makeColumn(block[column])).join('\n')}
              </table>
            </td>`;
        })
        return outputString
    };

    const makeColumn = (entry) => (`<tr><td>${entry ? entry : "-"}</td></tr>`);

};
main();
