const exercises = require('./exercises.json');
const workouts = require('./sheiko-workouts');

export const pickRandom = (someList) => {
    return someList[Math.floor(Math.random()*someList.length)]
};

const matchTemplates = (block, exercise) => {
  let matchJoints = false;
  let matchLoad = false;
  let matchMuscles = false;

  if (!block.joints || (block.joints === exercise.joints)){
      matchJoints = true
  }
  if (!block.load || (block.load === exercise.load)){
      matchLoad = true
  }
  if (block['primary-muscles'].every(muscle => exercise['primary-muscles'].includes(muscle))){
      matchMuscles = true
  }

    return matchJoints && matchLoad && matchMuscles;
};

export const bundleBlockAndExercise = (block, exercise) => ({
      exercise: exercise.name,
      setBlocks: block.setBlocks,
      notes: block.notes
  });

const makeWorkoutFromTemplate = (workout) => {
    const filledExerciseBlocks = workout['exercise-blocks'].map(block => {
        const matches = exercises.filter(exercise => matchTemplates(block, exercise));
        return bundleBlockAndExercise(block, matches[0])
    });
    const filledWorkout = {...workout, 'exercise-blocks': filledExerciseBlocks};
    return filledWorkout
};

export const makeWorkout = () => {
    const chosenWorkout = pickRandom(workouts);
    return makeWorkoutFromTemplate(chosenWorkout)
}


makeWorkout();
console.log(makeWorkout());


