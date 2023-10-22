import React from "react";
import FormTextField from "../../../../components/textField/FormTextField";
import { Grid } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

interface SubBenefitLimitProps {
  register: any;
  control: any;
  setValue: any;
  watch: any;
  subBenefitIndex: any;
  subBenefitArray: any[];
  subBenefitId: number;
  removeSubBenefit: any;
}

export default function SubBenefitLimits({
  register,
  control,
  setValue,
  watch,
  subBenefitIndex,
  subBenefitArray,
  subBenefitId,
  removeSubBenefit,
}: SubBenefitLimitProps) {
  function handleDeleteSubBenefit() {
    removeSubBenefit(subBenefitIndex);
    alert("deleted!");
  }
  return (
    <>
      {" "}
      <Grid container>
        <Grid
          item
          xs={12}
          sm={3}
          lg={3}
          ml={3}
          mr={3}
          mt={3}
          sx={{ width: "20%" }}
        >
          <FormTextField
            label={"Sub Benefit Code"}
            type="text"
            register={register(`${subBenefitIndex}.subBenefitCode`)}
            error={false}
            helperText={""}
            disabled={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          lg={3}
          ml={3}
          mr={3}
          mt={3}
          sx={{ width: "20%" }}
        >
          <FormTextField
            label={"Sub Benefit Name"}
            type="text"
            register={register(`${subBenefitIndex}.subBenefitName`)}
            error={false}
            helperText={""}
            disabled={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          lg={3}
          ml={3}
          mr={3}
          mt={3}
          sx={{ width: "20%" }}
        >
          <FormTextField
            label={"Max Allowed Limit"}
            type="number"
            register={register(`${subBenefitIndex}.maxAllowedLimit`)}
            error={false}
            helperText={""}
            disabled={false}
          />
        </Grid>
        <DeleteIcon
          style={{ marginLeft: 0, marginRight: 0, marginTop: 30 }}
          onClick={handleDeleteSubBenefit}
        />
      </Grid>
    </>
  );
}
function removeSubBenefit(subBenefitIndex: any) {
  throw new Error("Function not implemented.");
}
