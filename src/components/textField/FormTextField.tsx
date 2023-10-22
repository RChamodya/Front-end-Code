import {TextField, TextFieldProps} from "@mui/material";

interface FormTextFieldProps {
    register?: any;
}

const FormTextField = ({
                           register,
                           error,
                           helperText,
                           label,
                           id,
                           disabled,
                           type,
                           required,
                           ...rest
                       }: FormTextFieldProps & TextFieldProps) => {
    const textFieldStyles = {
        '& .MuiInputBase-input.Mui-disabled': {
            color: 'rgba(60, 60, 60, 60)'
        },
    };
    return (
        <TextField sx={textFieldStyles} required={required} id={id} label={label} variant="outlined" {...register} error={error}
                   helperText={helperText} {...rest} size={"small"} disabled={disabled} type={type} fullWidth
                   InputLabelProps={{shrink: true}}/>
    );
}

export default FormTextField;