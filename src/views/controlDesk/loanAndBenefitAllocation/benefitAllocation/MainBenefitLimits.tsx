import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import FormTextField from "../../../../components/textField/FormTextField";
import FormAutoCompleteField from "../../../../components/autoComplete/FormAutoCompleteField";
import { axiosInstance } from "../../../../api/Store";
import SubBenefitLimits from "./SubBenefitLimits";
import { useFieldArray } from "react-hook-form";
// import MainBenefitLimits from "./MainBenefitLimits";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

interface MainBenefitLimitProps {
  register: any;
  control: any;
  setValue: any;
  watch: any;
  mainBenefitIndex: number;
  mainBenefitArray: any[];
  mainBenefitId: number;
  removeMainBenefit: any;
}

export default function MainBenefitLimits({
  register,
  control,
  setValue,
  watch,
  mainBenefitIndex,
  mainBenefitArray,
  mainBenefitId,
  removeMainBenefit,
}: MainBenefitLimitProps) {
  const [subBenefitByMainBenefit, setsubBenefitByMainBenefit] = useState<
    Array<any>
  >([]);
  const [subBenefitByMainBenefit2, setsubBenefitByMainBenefit2] = useState<
    Array<any>
  >([]);

  useEffect(() => {
    getSubBenefitByMainBenefitID();
  }, [mainBenefitId]);

  function handleAddSubBenefit() {
    if (changeSubBenefit) {
      console.log(changeSubBenefit);
      const findOnField = fields.find(
        (f: any) => f.subBenefitId == changeSubBenefit
      );
      if (!findOnField) {
        prepend({
          subBenefitId: changeSubBenefit,
          subBenefitName: subBenefitByMainBenefit2.find(
            (i: any) => i.subBenefitId == changeSubBenefit
          ).subBenefitName,
          subBenefitCode: subBenefitByMainBenefit2.find(
            (c: any) => c.subBenefitId == changeSubBenefit
          ).subBenefitCode,
          maxAllowedLimit: "",
        });
        setValue(`mainBenefitLimit.${mainBenefitIndex}.subBenefit`, "");
      } else {
        setValue(`mainBenefitLimit.${mainBenefitIndex}.subBenefit`, "");
        alert("Already Added!");
      }
    }
  }

  function handleDeleteSubBenefit() {
    removeMainBenefit(mainBenefitIndex);
    alert("deleted!");
  }

  function getSubBenefitByMainBenefitID() {
    if (mainBenefitId) {
      axiosInstance
        .get(`/subBenefit/getSubBenefitByMainBenefitID/${mainBenefitId}`)
        .then((response) => {
          const activeSubBenefit = response.data.data.filter(
            (a: any) => a.status == true
          );
          setsubBenefitByMainBenefit(
            activeSubBenefit.map((d: any) => ({
              value: d.subBenefitId,
              label: `${d.subBenefitCode} - ${d.subBenefitName}`,
            }))
          );
          setsubBenefitByMainBenefit2(activeSubBenefit);
        })
        .catch((error) => {
          console.error("error fetching data", error);
        });
    }
  }
  const { prepend, remove, fields } = useFieldArray({
    control,
    name: `mainBenefitLimit.${mainBenefitIndex}.subBenefitLimit`,
  });
  const changeSubBenefit = watch(
    `mainBenefitLimit.${mainBenefitIndex}.subBenefit`
  );
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
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
                label={"Main Benefit Code"}
                type="text"
                register={register(
                  `mainBenefitLimit.${mainBenefitIndex}.mainBenefitCode`
                )}
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
                label={"Main Benefit Name"}
                type="text"
                register={register(
                  `mainBenefitLimit.${mainBenefitIndex}.mainBenefitName`
                )}
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
                register={register(
                  `mainBenefitLimit.${mainBenefitIndex}.maxAllowedLimit`
                )}
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
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={4}
              lg={4}
              ml={2}
              mr={2}
              mt={5}
              sx={{ width: "20%" }}
            >
              <FormAutoCompleteField
                register={register(
                  `mainBenefitLimit.${mainBenefitIndex}.subBenefit`
                )}
                label={"Sub Benefit"}
                error={false}
                helperText={""}
                id={`mainBenefitLimit.${mainBenefitIndex}.subBenefit`}
                required={false}
                control={control}
                setValue={setValue}
                watch={watch}
                options={subBenefitByMainBenefit}
                disabled={false}
              />
            </Grid>

            <AddBoxIcon
              style={{ marginLeft: 0, marginRight: 0, marginTop: 50 }}
              onClick={handleAddSubBenefit}
            />
            {fields.map((m: any, index: number) => (
              <SubBenefitLimits
                register={register}
                control={control}
                setValue={setValue}
                watch={watch}
                subBenefitIndex={`mainBenefitLimit.${mainBenefitIndex}.subBenefitLimit.${index}`}
                subBenefitArray={subBenefitByMainBenefit2}
                subBenefitId={m.subBenefitId}
                removeSubBenefit={remove}
              />
            ))}
            {/* <SubBenefitLimits
              register={register}
              control={control}
              setValue={setValue}
              watch={watch}
              subBenefitIndex={0}
              subBenefitArray={[]}
              subBenefitId={0}
            /> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
