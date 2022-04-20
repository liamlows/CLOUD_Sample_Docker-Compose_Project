import {StickyTable} from "../LoggedIn/stickyTable";
import { getAllCourses } from "../../APIFolder/loginApi";

export const ClassMenu = () => {

    //TODO: put nav bar in, data intergration
    return <div>
        <StickyTable rows = {createData({getAllCourses})} columns = {columnsMenu}/>
     </div>
};