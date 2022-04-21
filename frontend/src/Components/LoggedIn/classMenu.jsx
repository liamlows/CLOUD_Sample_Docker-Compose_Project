
import { getAllCourses } from "../../APIFolder/loginApi";
import { removeCourse } from "../../APIFolder/loginApi";

export const ClassMenu = ({ currUser, setCurrUser, pages, settings, setNavigated, ifDropShow}) => {
      const navigate = useNavigate();
      const [courses, setCourses] = useState(false);
 /*     const [ifDropShow, setifDropShow] = useState(false);*/

      const goToCourse = (course) => {
          navigate(`/users/${course.className}`);
      }

      if (!currUser) {
          let username = Cookies.get("username");
          if (username) {
              getAccountbyUsername(username)
                  .then(account => {
                      if (account) {
                          setCurrUser(account);
                      }
                      else {
                          console.log("User is null after request");
                          setCurrUser('');
                      }
                  });
          }
          else {
              setCurrUser('');
              setNavigated(true);
              navigate('/');
          }
      }
  

//    return (course.className, course.id, course.professor, course.days, course.start_time, course.end_time);

    //TODO: put nav bar in, data intergration
    return <div>
    <LoggedInResponsiveAppBar
        pages={pages}
        settings={settings}
        signOut={() => signOut()}
        username={currUser.username}
        profileNav={() => profileNav()}
        account={() => accountNav()} />

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
                            <Button variant="contained"
                                className="btn btn-secondary"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => goToCourse(course)}>
                                View Profile
                            </Button>
                        </td>
                        {/**TODO: button to drop course */}
                        {ifDropShow &&
                            <td>
                            <Button variant="contained"
                                className="btn btn-secondary"
                                onClick={() => removeCourse(course, currUser)}>
                                Drop Course
                            </Button>
                        </td>
                        }
                    </tr>
                })}

            </thead>
        </table>}
    {courses.length === 0 && <h2>No courses added. Try adding some!</h2>}
</div>
};