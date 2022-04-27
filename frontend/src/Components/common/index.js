import {logout} from "../../APIFolder/loginApi";
import {websocket} from "../../client-websocket";

export * from './CheckboxField';
export * from './SelectField';
export * from './TextField';
export * from './PasswordField';


export async function doSignOut() {
    logout().then(() => {
        if(websocket.readyState !== WebSocket.CLOSED){
            websocket.close();
        }
        localStorage.setItem("currUser", "{}")
    });
}

