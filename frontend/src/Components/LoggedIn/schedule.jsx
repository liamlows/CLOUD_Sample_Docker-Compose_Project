/**
    Component to show a student's schedule
*/
import { StickyTable } from "./stickyTable"

export const Schedule = ({studentID}) => {

    const columnsMenu = [
        { id: 'Class', label: 'Class', minWidth: 170 },
        { id: 'ID', label: 'ID', minWidth: 100 },
        {
          id: 'Professor',
          label: 'Professor',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'Days',
          label: 'Days',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'StartTime',
          label: 'Start Time',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toFixed(2),
        },
        {
          id: 'EndTime',
          label: 'End Time',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toFixed(2),
        }
      ];

      function createData(courses){
        var rowsMenu = [];
        for(var index = 0; index < courses.length; index++){
          rowsMenu[index] = splitData(courses.index);
        }
        return rowsMenu;
      }
      function splitData(course){
        return (course.className, course.id, course.professor, course.days, course.start_time, course.end_time);
      }


// <StickyTable rows = {createData({studentID.courses})} columns = {columnsMenu}/>
    return <section id="profile">{
       
       <h1>Student needs courses </h1>
}
    </section>
}