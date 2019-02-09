import { exercises } from './database/exercise_database.js';
import { workouts } from './database/workout_database.js';

export const pickRandom = (someList) => {
    return someList[Math.floor(Math.random()*someList.length)]
};

export const matchTemplates = (block, exercise) => {

  if (block.joints && (block.joints !== exercise.joints)){
      return false
  }
  if (block.load && (block.load !== exercise.load)){
      return false
  }
  if (block.type && (block.type !== exercise.type)){
      return false
  }
  if (block['primary-muscles'] && !(block['primary-muscles'].every(muscle => exercise['primary-muscles'].includes(muscle)))){
      return false
  }

    return true
};

export const matchWorkouts = (query, workout) => {
    if (query.difficulty && workout.difficulty !== query.difficulty){
        return false
    }
    if (query.type && workout.type !== query.type){
        return false
    }
    if (query.tags && !(query.tags.every(tag => workout.tags.includes(tag)))){
        return false
    }

    return true
};

export const bundleBlockAndExercise = (block, exercise) => ({
      exercise: exercise.name,
      setBlocks: block.setBlocks,
      notes: block.notes
  });

export const fillExerciseBlocks = (block) => {
  if (!block.exercise){
    const matches = exercises.filter(exercise => matchTemplates(block, exercise));
    return bundleBlockAndExercise(block, pickRandom(matches))
  }
  return block
}

export const makeWorkoutFromTemplate = (workout) => {
    const filledExerciseBlocks = workout['exercise-blocks'].map(block => fillExerciseBlocks(block));
    const filledWorkout = {...workout, 'exercise-blocks': filledExerciseBlocks};
    return filledWorkout
};

export const makeWorkout = (query = {}) => {
    const matches = workouts.filter(workout => matchWorkouts(query, workout));
    const chosenWorkout = pickRandom(matches);
    return makeWorkoutFromTemplate(chosenWorkout)
};
