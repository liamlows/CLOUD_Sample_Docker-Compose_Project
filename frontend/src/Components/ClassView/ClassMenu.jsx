import { getAllCourses, getClasses } from "../../APIFolder/loginApi";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Add from "@mui/icons-material/Add";

export const ClassMenu = ({ pages, settings, setNavigated }) => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    getClasses().then(res => {
      setClasses(...res)
    })
  }, []);
  const goToCourseAdd = () => {
    navigate('/classes/enrollment');
  }

  //TODO: put nav bar in, data intergration
  return <section className="ClassesMenu">
    {/* <LoggedInResponsiveAppBar
      pages={pages}
      settings={settings}
      signOut={() => signOut()}
      account_id={account.account_id}
      account_type={account.role.role_type} /> */}
    <Button variant="contained" className="bg-success" onClick={() => goToCourseAdd()} endIcon={<Add />}>Add Class</Button>

  </section>
};