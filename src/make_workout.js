exercises = require('./exercises.json');

workouts = require('./sheiko-workouts');

const pickRandom = (someList) => {
    return someList[Math.floor(Math.random()*someList.length)]
};

const matchTemplates = (block, exercise) => {
  var matchJoints = false;
  var matchLoad = false;
  var matchMuscles = false;

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

const bundleBlockAndExercise = (block, exercise) => ({
      exercise: exercise.name,
      setBlocks: block.setBlocks,
      notes: block.notes
  });

const makeWorkout = () => {
    const workout = pickRandom(workouts);
    const filledExerciseBlocks = workout['exercise-blocks'].map(block => {
        //const matches = exercises;
        const matches = exercises.filter(exercise => matchTemplates(block, exercise));
        return bundleBlockAndExercise(block, matches[0])
    });
    const filledWorkout = {...workout, 'exercise-blocks': filledExerciseBlocks};
    return filledWorkout
};

makeWorkout();
console.log(makeWorkout());


