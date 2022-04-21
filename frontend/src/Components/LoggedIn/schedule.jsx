/**
    Component to show a student's schedule
*/
import { StickyTable } from "./stickyTable"
import {GenericButton} from "./Components/common/GenericButton"

export const Schedule = ({account}) => {
      //We're assuming that its already been checked that this account is a student
  
      //  return (course.className, course.id, course.professor, course.days, course.start_time, course.end_time);


// <StickyTable rows = {createData({studentID.courses})} columns = {columnsMenu}/>
    return <section id="profile">
       <h1>{account.username}'s Schedule</h1>
       account.getCourses();
       
       {/**TODO: made buttons work */}
       <GenericButton label= "See Sourse History"/>
       <GenericButton label= "Hide Course History"/>
    </section>
}