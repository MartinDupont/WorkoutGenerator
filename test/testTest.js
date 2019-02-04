import 'babel-polyfill'
import {bundleBlockAndExercise, pickRandom} from "../src/make_workout";
import { expect } from 'chai';


describe('bundleBlockAndExercises', () => {
    it('should include the exercise name, notes and set blocks', () => {
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
            exercise: "name",
            notes: "",
            setBlocks: [{block: "setBlock"}],
        };
        const result = bundleBlockAndExercise(block, exercise);
        expect(result).to.deep.equal(expectedResult)
    })
});

describe('pickRandom', () => {
    it('should pick elements from the list', () => {
        const arbitraryList = [1, 2, 3, 4, 5];
        const result = pickRandom(arbitraryList);
        expect(arbitraryList).to.contain(result)
    })
});
