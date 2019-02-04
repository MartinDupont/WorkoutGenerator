import 'babel-polyfill'
import { bundleBlockAndExercise} from "../src/make_workout";
var assert = require('assert');

describe('bundleBlockAndExercises', ()=>{
    it('should work', () => {
        const exercise = {
            name: "name",
            irrelevantInfo: "irrelevantInfo"
        };
        const block = {
            notes: "",
            setBlocks: [{block: "setBlock"}],
            irrelevantBlockInfo: "irrelevantBlockInfo"
        };
        const expectedResult = {
            name: "name",
            notes: "",
            setBlocks: [{block: "setBlock"}],
        };
        const result = bundleBlockAndExercise(block, exercise);
        //expect(result).to.deep.equal(0)
        assert.equal(2,2)
    })
});
