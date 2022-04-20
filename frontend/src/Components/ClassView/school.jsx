export const CourseProfile = ({school}) => {
    //TODO: Navbar

    return <section id="profile">
        
        <h1>{school.name}</h1>
        <p>{school.location}</p>
        <p>{school.id}</p>
    </section>
}