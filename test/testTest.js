import 'babel-polyfill'
import {bundleBlockAndExercise, matchTemplates, pickRandom} from '../src/make_workout';
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

describe('matchTemplates', () => {
    const matchProvider = [
        {
         message: "should match if only the joints are specified",
          block: { joints: "a"},
          exercise: { joints: "a", load: "b"}
        },
        {
            message: "should match if only the load is specified",
            block: { load: "heavy"},
            exercise: { load: "heavy", joints: "b"}
        },
        {
            message: "should match if the exercise contains one of the desired primary muscles.",
            block: { "primary-muscles": ["triceps"]},
            exercise: { "primary-muscles": ["triceps", "shoulders"], joints: "b"}
        },
    ];

    matchProvider.forEach(({ message, block, exercise }) => it(message, () => {
        const result = matchTemplates(block, exercise);

        expect(result).to.equal(true);
    }));

    const notMatchProvider = [
        {
            message: "should not match if the exercise does not contain one of the desired primary muscles.",
            block: { "primary-muscles": ["triceps"], joints: "b", load:"c"},
            exercise: { "primary-muscles": ["biceps", "shoulders"], joints: "b", load:"c"}
        },
        {
            message: "should not match if the exercise does not have the desired load.",
            block: { "primary-muscles": ["triceps"], joints: "b", load:"light"},
            exercise: { "primary-muscles": ["triceps"], joints: "b", load:"heavy"}
        },
        {
            message: "should not match if the exercise does not have the desired joints.",
            block: { "primary-muscles": ["triceps"], joints: "isolation", load:"light"},
            exercise: { "primary-muscles": ["triceps"], joints: "compound", load:"light"}
        },
    ];

    notMatchProvider.forEach(({ message, block, exercise }) => it(message, () => {
        const result = matchTemplates(block, exercise);

        expect(result).to.equal(false);
    }));
});
