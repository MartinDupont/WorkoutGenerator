import { exercises } from './database/exercise_database.js';
import { workouts } from './database/workout_database.js';

export const pickRandom = (someList) => {
    return someList[Math.floor(Math.random()*someList.length)]
};

export const isNotEmptyStringOrArray = (item) => {
    return (item !== "") && !(Array.isArray(item) && item.length === 0)
}

export const matchQuery = (query, item) => {
    const queryKeys = Object.keys(query).filter(key => isNotEmptyStringOrArray(query[key]));
    for (var i = 0; i < queryKeys.length; i++){
      const key = queryKeys[i];
      const val = query[key];
      const itemVal = item[key];

      if (!itemVal || !val){
        return false
      }
      if (Array.isArray(val) && Array.isArray(itemVal)){
        if (!val.every(v => itemVal.includes(v))){
          return false
        }
      }  else if (Array.isArray(itemVal)){
        if (!itemVal.includes(val)){
          return false
        }
      } else if (Array.isArray(val)){
        if (!val.includes(itemVal)){
          return false
        }
      } else if (val !== itemVal){
        return false
      }
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
    const queryFromBlock = {...block, setBlocks: []}
    const matches = exercises.filter(exercise => matchQuery(queryFromBlock, exercise));
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
    const matches = workouts.filter(workout => matchQuery(query, workout));
    const chosenWorkout = pickRandom(matches);
    return makeWorkoutFromTemplate(chosenWorkout)
};
