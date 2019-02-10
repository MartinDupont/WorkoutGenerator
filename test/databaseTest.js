// This whole test shouldn't be neccessary once I switch to using a real database.
import { workouts } from '../src/database/workout_database.js';
import { exercises } from '../src/database/exercise_database.js';
import { makeWorkoutFromTemplate } from '../src/make_workout.js';
import { expect } from "chai";

describe("the workouts database", ()=> {
  it("should be possible to generate a workout for every entry", () => {
    workouts.forEach(workout => {
      const result = makeWorkoutFromTemplate(workout)
      if (result === undefined){console.log(workout)}
      expect(result).not.to.be.undefined
    })
  })
  it("should only have the difficulties: light, medium, heavy", () => {
    const difficulties = workouts.map(workout => workout.difficulty);
    const result = new Set(difficulties);
    const expected = new Set(["light", "medium", "heavy"])
    expect(result).to.deep.equal(expected);
  })
  it("should have unique ids for every exercise", () => {
    const ids = workouts.map(workout => workout.id);
    const uniqueIds = Array.from(new Set(ids));
    expect(ids.length).to.deep.equal(uniqueIds.length);
  })
  it("should have durations quantized by 30mins", () => {
    const durations = workouts.map(workout => workout.duration);
    const result = Array.from(new Set(durations));
    const allowed = ["30-60", "60-90", "90-120", "120-150"]
    expect(result.every(d => allowed.includes(d))).to.be.true;
  })
})

describe("the exercises database", () => {
  it("All exercises should be either compound or isolation", () => {
    const joints = exercises.map(exercise => exercise.joints)
    const result = new Set(joints)
    const expected = new Set(["compound", "isolation"])
    expect(result).to.deep.equal(expected)
  })

  it("All exercises should be either light medium or heavy", () => {
    const joints = exercises.map(exercise => exercise.load)
    const result = new Set(joints)
    const expected = new Set(["light", "medium", "heavy"])
    expect(result).to.deep.equal(expected)
  })

  it("should not contain any typos in the muscles", () => {
    const allMuscles = new Set();
    exercises.forEach(exercise => {
      exercise['primary-muscles'].forEach(muscle => allMuscles.add(muscle));
      if (exercise['secondary-muscles'] !== undefined){
        exercise['secondary-muscles'].forEach(muscle => allMuscles.add(muscle));
      }
    });
    const expected = new Set(["chest", "triceps", "lats", "quads", "glutes", "hamstrings", "abs", "lower back", "shoulders", "biceps"])
    expect(allMuscles).to.deep.equal(expected)
  })

})
