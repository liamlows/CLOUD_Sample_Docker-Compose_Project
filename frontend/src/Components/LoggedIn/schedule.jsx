/**
    Component to show a student's schedule
*/
import {LinearWithValueLabel} from "./Components/common/progressBar"
import {GenericButton} from "./Components/common/GenericButton"

export const Schedule = ({currUser}) => {
      //We're assuming that its already been checked that this account is a student
  
      //  return (course.className, course.id, course.professor, course.days, course.start_time, course.end_time);
    const [showHistory] = useState(false);
    const [showMajorMinor] = useState(false);
    const [showUniReq] = useState(false);


// <StickyTable rows = {createData({studentID.courses})} columns = {columnsMenu}/>
    return <section id="profile">
       <h1>{currUser.username}'s Schedule</h1>
       account.getCourses();
       put given courses into a generic class menu to display
      Might need to pass additional prop to class menu to indicate if the drop button should exist or not
      Figure out student grade thing
      student setting away for what to hide

        grades = account.getGrades();
        <table>
            <tr><td><h4>Course</h4></td><td><h4>Grades</h4></td></tr>
            grades.map(index arrow <tr><td><p>index.course</p></td><td><p>index.grade</p></td></tr>
            )
        </table>
    
       {/**TODO: made buttons work */}
       {!showHistory && 
       <GenericButton label= "See Course History" onClick={()=> showHistory = true}/>}
       {showHistory && 
       <GenericButton label= "Hide Course History" onClick={()=> showHistory = false}/>}
       Button will turn display to true and will present a class menu that was given full course history data
       {!showMajorMinor && 
       <GenericButton label= "See Major/Minor Requirments for me" onClick={()=> showMajorMinor = true}/>}
       {showMajorMinor && <div>
       <GenericButton label= "Hide Major/Minor Requirments" onClick={()=> showMajorMinor = false}/>
       <LinearWithValueLabel value={50}/>
       </div>}
       Button will unhide list of requirments for the specific student, along with a progress bar with a percentage
       {!showUniReq && 
        <GenericButton label= "See University Requirments for me" onClick={()=> showUniReq = true}/>}
       {showUniReq && <div>
        <GenericButton label= "Hide University Requirments" onClick={()=> showUniReq = false}/>
       <LinearWithValueLabel value={50}/>
       </div>}

    </section>
}