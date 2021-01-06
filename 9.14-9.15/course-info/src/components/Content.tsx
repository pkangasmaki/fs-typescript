import React from 'react';
import Part from './Part';
import { CoursePart } from '../types'

interface Content {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<Content> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(e => <Part key={e.name} coursePart={e}/>) }
    </div>
  )
};

export default Content;