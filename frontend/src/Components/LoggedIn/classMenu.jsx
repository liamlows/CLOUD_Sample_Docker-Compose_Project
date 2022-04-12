import {StickyTable} from "./stickyTable";
import { getAllCourses } from "../../APIFolder/loginApi";

export const ClassMenu = () => {

    /**interface Column {
    id: 'Class' | 'ID' | 'Professor' | 'Days' | 'Time';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
const rows = [
    //Insert Data
];
     * 
     */
    //minWidth 170, 100?

  
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
      id: 'Time',
      label: 'Time',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  
  
  function createData(courses){
    var rowsMenu = [];
    for(var index = 0; index < courses.length; index++){
      rowsMenu[index] = splitData(courses.index);
    }
    return rowsMenu;
  }
  function splitData(course){
    return (course.className, course.id, course.professor, course.days, course.time);
  }

    //TODO: put nav bar in, data intergration
    return <div>
        <StickyTable rows = {createData({getAllCourses})} columns = {columnsMenu}/>
     </div>
};