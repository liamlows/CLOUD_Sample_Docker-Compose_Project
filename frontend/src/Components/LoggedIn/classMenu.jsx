
import { getAllCourses } from "../../APIFolder/loginApi";
import { removeCourse } from "../../APIFolder/loginApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import { getAccountbyUsername } from "../../APIFolder/loginApi";

export const ClassMenu = ({currUser, ifDropShow}) => {
      const navigate = useNavigate();
      const [courses, setCourses] = useState(false);
 /*     const [ifDropShow, setifDropShow] = useState(false);*/

      const goToCourse = (course) => {
          navigate(`/users/${course.className}`);
      }

//    return (course.className, course.id, course.professor, course.days, course.start_time, course.end_time);

    //TODO: put nav bar in, data intergration
    return <div>
      {/**Fix course table data when schema is updated */}
    <div className='border-top mb-3'></div>
    {console.log(courses)}
    {courses.length > 0
        && <table>
            <thead>
                {courses.map(course => {
                    <tr key={course.courseID}>
                        <td>{course.className}</td>
                        <td>{course.start_date}</td>
                        <td>{course.end_date}</td>

                        <td>
                            <button variant="contained"
                                className="btn btn-secondary"
                                onClick={() => goToCourse(course)}>
                                View Profile
                            </button>
                        </td>
                        {/**TODO: button to drop course */}
                        {ifDropShow &&
                            <td>
                            <button variant="contained"
                                className="btn btn-secondary"
                                onClick={() => removeCourse(course, currUser)}>
                                Drop Course
                            </button>
                        </td>
                        }
                    </tr>
                })}

            </thead>
        </table>}
    {courses.length === 0 && <h2>No courses added. Try adding some!</h2>}
</div>
};