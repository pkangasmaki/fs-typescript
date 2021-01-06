// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartOwn extends CoursePartBaseDescription {
  name: "My own Course!";
  extra: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartOwn;