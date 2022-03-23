import { useNavigate } from "react-router-dom"

export const GenericButton = ({ label, click}) => {
    const navigate = useNavigate();
    const path = click;
    return <div className="form-group">
        <button type="button" onClick={() => navigate(path) }>{ label }</button>
    
</div>
}