export const TextAreaField = ({ label, value, setValue }) => {
return <>
  <label>{ label }</label>
  <textarea
    className="form-control"
    type="text"
    value={value}
    onChange={(event) => setValue(event.target.value)}
    />
</>;
}
