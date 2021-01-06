import React from 'react'
import { CoursePart } from '../types'

interface Props {
  coursePart: CoursePart
}

//Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<Props> = ({ coursePart }) => {
  switch(coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          <b>Name: </b>{ coursePart.name } <b> exerciseCount: </b> { coursePart.exerciseCount} <b> description: </b>{ coursePart.description }
        </div>
        )
    case "Using props to pass data":
      return (
        <div>
          <b>Name: </b>{ coursePart.name } <b> exerciseCount: </b> { coursePart.exerciseCount } <b> groupProjectCount: </b> { coursePart.groupProjectCount}
        </div>
        )
    case "Deeper type usage":
      return (
        <div>
          <b>Name: </b>{ coursePart.name } <b> exerciseCount: </b> { coursePart.exerciseCount } <b> description: </b> { coursePart.description} <b> exerciseSubmissionLink: </b> { coursePart.exerciseSubmissionLink }
        </div>
        )
    case "My own Course!":
      return (
      <div>
        <b>Name: </b>{ coursePart.name } <b> exerciseCount: </b> { coursePart.exerciseCount } <b> description: </b> { coursePart.description} <b> extra: </b> { coursePart.extra }
      </div>
      )
    default:
      return assertNever(coursePart);
  }
}

export default Part;