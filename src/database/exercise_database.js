import { exercises as mainExercises} from './main-exercises.js';
import { exercises as secondaryExercises} from './secondary-exercises.js';
import { exercises as assistanceExercises} from './assistance-exercises.js';

export const exercises = [...mainExercises, ...secondaryExercises, ...assistanceExercises];