import * as Yup from "yup";
import { axiosInstance } from "../../../api/Store";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Simulate } from "react-dom/test-utils";
import reset = Simulate.reset;
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import FormTextField from "../../../components/textField/FormTextField";
import FormSwitchField from "../../../components/switch/FormSwitchField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function CreateMainBenefit() {
  const commonError = "Field is required";
  const validationSchema = Yup.object().shape({
    // loanCode: Yup.string().required(commonError),

    mainBenefitCode: Yup.string().required(commonError),
    mainBenefitName: Yup.string().required(commonError),
    status: Yup.boolean(),
  });
  const createMainBenefit = async (data: any) => {
    alert("main Main Benefit created");
    // console.log(data);
    const payload = {
      mainBenefitId: "",
      mainBenefitCode: data.mainBenefitCode,
      mainBenefitName: data.mainBenefitName,
      status: data.status,
      isDeleted: false,
    };
    // console.log("payload",payload)
    try {
      const res = await axiosInstance.post(`/mainBenefit/save`, payload);
      if (res.data?.status === 201) {
        setMBenefitId(res.data?.data?.loanId);
        navigate(-1);
        // notify.success(res.data?.message);
      }
    } catch (error: any) {
      console.error(error);
      // notify.error(error.response?.data?.message);
    }
  };
  const updateMainBenefit = async (data: any) => {
    if (id) {
      const payloadData = {
        mainBenefitId: parseInt(id),
        mainBenefitCode: data.mainBenefitCode,
        mainBenefitName: data.mainBenefitName,
        status: data.status,
        isDeleted: false,
      };
      try {
        const res = await axiosInstance.put(
          `/mainBenefit/update/${id}`,
          payloadData,
        );
        console.log(res);
        alert("Main Benefit Updated!");
        navigate(-1);
      } catch (error: any) {
        console.error(error);
        // notify.error(error.response?.data?.message);
      }
    }
  };
  const handleClick = (data: any) => {
    if (page == "edit") {
      updateMainBenefit(data);
    } else {
      createMainBenefit(data);
    }
  };
  const [defaultValues, setDefaultValues] = useState<any>({
    mainBenefitCode: "",
    mainBenefitName: "",
    status: false,
  });
  const [mBenefitId, setMBenefitId] = useState<number>(0);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [title, setTitle] = useState("Create Main Benefit");

  const [id, setId] = useState("");
  const [page, setpage] = useState("");
  const access = window.location.href.includes("view");
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    const page = searchParams.get("page");

    if (page == "edit") {
      setTitle("Edit Main benefit");
      setIsEdit(true);
    }
    if (page == "view") {
      setIsView(true);
      setTitle("View Main benefit");
    }
    if (page) setpage(page);
    if (id) {
      setId(id);
    }
  }, [location]);
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
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (id) {
      getMainBenefitById();
    }
  }, [id]);

  function getMainBenefitById() {
    axiosInstance.get(`/mainBenefit/viewById/${id}`).then((response: any) => {
      const responseData = response?.data?.data ?? {};
      const defVals = {
        mainBenefitId: responseData?.mainBenefitId ?? "",
        mainBenefitCode: responseData?.mainBenefitCode ?? "",
        mainBenefitName: responseData?.mainBenefitName ?? "",
        status: responseData?.status ?? false,
      };
      reset(defVals);
      setValue("mainBenefitCode", defVals.mainBenefitId);
      setValue("mainBenefitName", defVals.mainBenefitName);
      setValue("status", defVals.status);
    });
  }

  // const [mainBenefits, setMainbenefits] = useState([]);

  // function getAllMainSubBenefits() {
  //   axiosInstance
  //     .get(`/mainbenefit/viewById/${id}`)
  //     .then((response) => {
  //       setMainbenefits(
  //         response.data.data.map((d: any) => ({
  //           value: d.mainBenefitId,
  //           label: `${d.mainBenefitCode} - ${d.mainBenefitName}`,
  //         })),
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("error fetching data", error);
  //     });
  // }
  useEffect(() => {
    console.log("err", errors);
  }, [errors]);

  return (
    <>
      <Typography variant="h4" mt={5} textAlign="center">
        {title}
      </Typography>
      <hr />
      <Card
        style={{
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
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
                variant="outlined"
                onClick={() => {
                  navigate("/benefit");
                }}
              >
                Back
              </Button>
            </Grid>
            <Grid
              container
              xs={12}
              ml={10}
              display="flex"
              justifyContent="left"
            >
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "20%" }}
              >
                <FormTextField
                  label={"Main Benefit Code"}
                  type="text"
                  register={register("mainBenefitCode")}
                  error={!!errors.mainBenefitCode?.message}
                  helperText={errors.mainBenefitCode?.message?.toString()}
                  disabled={access}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "20%" }}
              >
                <FormTextField
                  label={"Main Benefit Name"}
                  type="text"
                  register={register("mainBenefitName")}
                  error={!!errors.mainBenefitName?.message}
                  helperText={errors.mainBenefitName?.message?.toString()}
                  disabled={access}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "5%" }}
              >
                <FormSwitchField
                  name={"status"}
                  label={"status"}
                  // helperText={errors.specializedCustomer?.message}
                  error={!!errors.status?.message}
                  control={control}
                  setValue={() => setValue}
                  helperText={""}
                  disabled={isView}
                />
              </Grid>
            </Grid>
            {!isView ? (
              <Grid item xs={12} mb={2} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(handleClick)}
                >
                  Submit
                </Button>
                <Button
                  sx={{ marginLeft: 5 }}
                  type="submit"
                  variant="outlined"
                  color="primary"
                  onClick={() => reset()}
                >
                  {" "}
                  Clear{" "}
                </Button>
              </Grid>
            ) : (
              <></>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
export default CreateMainBenefit;
