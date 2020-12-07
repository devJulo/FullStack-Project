import React from 'react'


const Course = ({course}) =>{

    const Header = ({ course }) => {
      return (
        <h2>{course.name}</h2>
      )
    }
  
    const Part = ({ part }) => {
      return (
        <p>
          {part.name} {part.exercises}
        </p>    
      )
    }
    
    const Content = ({ course }) => {
      return (
        <div>
          {course.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
      )
    }
  
    const Total = ({ course }) => {
      let sum = 0
      course.parts.map(part => {
        sum += part.exercises
        return (sum)
      })
        
      return(
        <h4>Total of {sum} exercises</h4>
      ) 
    }
  
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </>
    )
  
  }

  export default Course