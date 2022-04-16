/**
 * Course review (both the same professor and course)
 */
 export const review = ({course}) => {

    //TODO: add course review table
    return <section id="review">
        <h1>{course.className}</h1>
        <p>{course.description}</p>
        <p onclick={()=>navigate(`/users/${course.professor}`)}>{course.professor}</p> 
        <p>{course.average}</p>
        
    </section>
}