import 'babel-polyfill'
import {bundleBlockAndExercise, matchQuery, pickRandom, isNotEmptyStringOrArray} from '../src/make_workout';
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

describe('isNotEmptyStringOrArray', () => {
  it('should deliver false for empty string', () => {
    expect(isNotEmptyStringOrArray("")).to.be.false
  })
  it('should deliver false for empty array', () => {
    expect(isNotEmptyStringOrArray([])).to.be.false
  })
  it('should deliver true for valid string', () => {
    expect(isNotEmptyStringOrArray("a")).to.be.true
  })
  it('should deliver false for filled list', () => {
    expect(isNotEmptyStringOrArray(["a"])).to.be.true
  })
})

describe('matchQuery', () => {
    const matchProvider = [
        {
         message: "if both the query parameter and object parameter are items, then they must be identical",
          block: { joints: "a"},
          exercise: { joints: "a", load: "b"}
        },
        {
            message: "if the query is a list, and the object is a list, then all elements in the query list must be in the object list",
            block: { "primary-muscles": ["triceps"]},
            exercise: { "primary-muscles": ["triceps", "shoulders"], "dummy": "dummy"}
        },
        {
            message: "if the query is a value, and the object is a list, then the value must be in the object list",
            block: { "primary-muscles": "triceps"},
            exercise: { "primary-muscles": ["triceps", "shoulders"], "dummy": "dummy"}
        },
        {
            message: "if the query is a list, and the object is an item, then the query list must contain the item",
            block: { "tags": ["a", "b"]},
            exercise: { "tags": "a", "dummy": "dummy"}
        },
        {
            message: "queries with empty strings should match everything",
            block: { "a": "", "b": ""},
            exercise: { "a": "1", "b": ["2"]}
        },
        {
            message: "queries with empty lists should match everything",
            block: { "a": [], "b": []},
            exercise: { "a": "1", "b": ["2"]}
        }
    ];

    matchProvider.forEach(({ message, block, exercise }) => it(`In order to match: ${message}`, () => {
        const result = matchQuery(block, exercise);

        expect(result).to.equal(true);
    }));

    const notMatchProvider = [
        {
            message: "should not match if the exercise does not contain one of the desired primary muscles.",
            block: { "primary-muscles": ["triceps"]},
            exercise: { "primary-muscles": ["biceps", "shoulders"]}
        },
        {
            message: "should not match if the exercise does not have the desired load.",
            block: { "primary-muscles": ["triceps"], joints: "b", load:"light"},
            exercise: { "primary-muscles": ["triceps"], joints: "b", load:"heavy"}
        },
        {
            message: "should not match if the exercise does not have the desired joints.",
            block: {  joints: "isolation", load:"light"},
            exercise: {  joints: "compound", load:"light"}
        },
    ];

    notMatchProvider.forEach(({ message, block, exercise }) => it(message, () => {
        const result = matchQuery(block, exercise);

        expect(result).to.equal(false);
    }));
});
