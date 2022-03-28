
import { GenericButton } from "../common/GenericButton"

export const LoggedIn = () => {

    return <section id="loggedInView">
        {/* TODO:  get profile link to work**/}
        <GenericButton label="Profile" click="/profile" />
        <GenericButton label="Sign Out" click="/" />
    </section>
}
