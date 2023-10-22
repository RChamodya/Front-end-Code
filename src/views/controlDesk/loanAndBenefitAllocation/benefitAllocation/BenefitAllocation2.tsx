import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import FormAutoCompleteField from "../../../../components/autoComplete/FormAutoCompleteField";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../../../../api/Store";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { log } from "console";
import MainBenefitLimits from "./MainBenefitLimits";
// import MainBenefitLimits from "./MainBenefitLimits.2";
export default function BenefitAllocation2() {
  const navigate = useNavigate();
  // const commonError = "Field is required";
  // const validationSchema = Yup.object().shape({
  //   // loanCode: Yup.string().required(commonError),

  //   mainBenefitCode: Yup.string().required(commonError),
  //   mainBenefitName: Yup.string().required(commonError),
  //   status: Yup.boolean(),
  // });
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: defaultValues,
  });
  const [mainBenefits, setMainBenefits] = useState<Array<any>>([]);
  const [mainBenefits2, setMainBenefits2] = useState<Array<any>>([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
    getAllMainBenefits();
  }, []);

  function getAllCategories() {
    axiosInstance
      .get("/category/viewAll")
      .then((response) => {
        console.log(response);
        const activeCategories = response.data.data.filter(
          (a: any) => a.status == true
        );
        setCategories(
          activeCategories.map((d: any) => ({
            value: d.catId,
            label: `${d.catCode} - ${d.categoryDescription}`,
          }))
        );
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }

  function getAllMainBenefits() {
    axiosInstance
      .get("/mainBenefit/viewAll")
      .then((response) => {
        const activeMainBenefit = response.data.data.filter(
          (a: any) => a.status == true
        );
        setMainBenefits(
          activeMainBenefit.map((d: any) => ({
            value: d.mainBenefitId,
            label: `${d.mainBenefitCode} - ${d.mainBenefitName}`,
          }))
        );
        setMainBenefits2(activeMainBenefit);
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }

  const changeMainBenefit = watch("mainBenefitId");

  function handleClear() {
    setValue("mainBenefitLimit", []);
  }

  const CategoryWatch = watch("catId");

  function handleClick(data: any) {
    //     {
    //   "customerCategoryId": 0,
    //   "mainBenefitLimits": [
    //     {
    //       "maxAllowedQuantity": 0,
    //       "mainBenefitId": 0,
    //       "customerCategoryId": 0,
    //       "subBenefitLimits": [
    //         {
    //           "maxAllowedQuantity": 0,
    //           "subBenefitId": 0
    //         }
    //       ]
    //     }
    //   ]
    // }

    if (CategoryWatch) {
      const payload = {
        customerCategoryId: CategoryWatch,
        mainBenefitLimits:
          getValues()?.mainBenefitLimit?.map((f: any) => ({
            maxAllowedQuantity: parseInt(f?.maxAllowedLimit),
            mainBenefitId: f?.mainBenefitId,
            customerCategoryId: CategoryWatch,
            subBenefitLimits:
              f?.subBenefitLimit.map((s: any) => ({
                maxAllowedQuantity: parseInt(s?.maxAllowedLimit),
                subBenefitId: s?.subBenefitId,
              })) ?? [],
          })) ?? [],
      };
      console.log(payload);
      axiosInstance
        .post("/benefitLimits/createBenefitLimit", payload)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("error fetching data", error);
        });
    }
  }
  const { prepend, remove, fields } = useFieldArray({
    control,
    name: "mainBenefitLimit",
  });
  function handleAddMainBenefit() {
    if (changeMainBenefit) {
      console.log(changeMainBenefit);
      const findOnField = fields.find(
        (f: any) => f.mainBenefitId == changeMainBenefit
      );
      if (!findOnField) {
        prepend({
          mainBenefitId: changeMainBenefit,
          mainBenefitName: mainBenefits2.find(
            (i: any) => i.mainBenefitId == changeMainBenefit
          ).mainBenefitName,
          mainBenefitCode: mainBenefits2.find(
            (c: any) => c.mainBenefitId == changeMainBenefit
          ).mainBenefitCode,
          maxAllowedLimit: "",
        });
        setValue("mainBenefitId", "");
      } else {
        setValue("mainBenefitId", "");
        alert("Already Added!");
      }
    }
  }

  return (
    <>
      <Typography variant="h4" mt={5} textAlign="center">
        Benefit Allocation
      </Typography>
      <hr />
      <Card
        style={{
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "75%",
          margin: "0 auto",
          marginTop: "88px",
        }}
      >
        <CardContent>
          <form className="create-form">
            <Grid
              item
              xs={12}
              ml={12}
              mt={3}
              display="flex"
              justifyContent="left"
            >
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/loanAmount");
                }}
              >
                Back
              </Button>
            </Grid>
            <Grid
              container
              spacing={2}
              mt={1}
              justifyContent="center"
              alignItems="center"
            >
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
                  options={categories}
                  register={register("catId")}
                  label={"Category Id"}
                  error={!!errors.catId?.message}
                  helperText={
                    errors?.catId?.message
                      ? errors?.catId?.message?.toString()
                      : ""
                  }
                  id={"catId"}
                  required={false}
                  control={control}
                  setValue={setValue}
                  watch={watch}
                  disabled={false}
                />
              </Grid>

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
                  options={mainBenefits}
                  register={register("mainBenefitId")}
                  label={"Main Benefit"}
                  error={!!errors.mainBenefitId?.message}
                  helperText={""}
                  id={"mainBenefitId"}
                  required={false}
                  control={control}
                  setValue={setValue}
                  watch={watch}
                  disabled={false}
                />
              </Grid>
              <AddBoxIcon
                style={{ marginLeft: 0, marginRight: 0, marginTop: 50 }}
                onClick={handleAddMainBenefit}
              />

              {fields.map((m: any, index: number) => (
                <MainBenefitLimits
                  key={index}
                  register={register}
                  control={control}
                  setValue={setValue}
                  watch={watch}
                  mainBenefitIndex={index}
                  mainBenefitArray={mainBenefits2}
                  mainBenefitId={m.mainBenefitId}
                  removeMainBenefit={remove}
                />
              ))}

              <Grid item xs={12} mb={10} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(handleClick)}
                >
                  Submit
                </Button>
                <Button
                  sx={{ marginLeft: 25 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Grid>

              <></>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
