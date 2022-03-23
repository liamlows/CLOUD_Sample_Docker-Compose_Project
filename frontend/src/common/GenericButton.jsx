export const GenericButton = ({ label, click}) => {
    return <div className="form-group">
        <button type="button" onClick={click}>{ label }</button>
    
</div>
}