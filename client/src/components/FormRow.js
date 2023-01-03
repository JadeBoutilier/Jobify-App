const FormRow = ({ type, name, value, handleChange, labelText }) => {
    return (
      <div class-Name="form-now"> 
        <label htmlFor={name} className="form-label">
        {labelText || name}
        </label>
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className="form-input"
        />
      </div>
    );
  };
  
  export default FormRow;
  