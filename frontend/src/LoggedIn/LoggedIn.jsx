import { GenericButton } from "../common/GenericButton"

export const LoggedIn = () => {

    return <section id="loggedInView">
        <GenericButton label="Sign Out" click="/login" />
    </section>
}
