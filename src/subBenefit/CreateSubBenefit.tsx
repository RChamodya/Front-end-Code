import * as Yup from "yup";
import { axiosInstance } from "../api/Store";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Typography } from "@mui/material";
import FormTextField from "../components/textField/FormTextField";
import FormSwitchField from "../components/switch/FormSwitchField";

function CreateSubBenefit() {
  const commonError = "Field is required";
  const validationSchema = Yup.object().shape({
    // loanCode: Yup.string().required(commonError),

    subBenefitCode: Yup.string().required(commonError),
    subBenefitName: Yup.string().required(commonError),
    status: Yup.boolean(),
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [sBenefitId, setSBenefitId] = useState<number>(0);
  const navigate = useNavigate();
  const [title, setTitle] = useState("Create Sub Benefit");
  const [id, setId] = useState("");
  const [page, setpage] = useState("");
  const access = window.location.href.includes("view");
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const createSBenefit = async (data: any) => {
    console.log(mainBenefitId);

    if (mainBenefitId) {
      console.log(mainBenefitId);
      const payload = {
        subBenefitId: "",
        subBenefitCode: data.subBenefitCode,
        subBenefitName: data.subBenefitName,
        status: data.status,
        isDeleted: false,
        mainBenefitId: mainBenefitId,
      };
      console.log("payload", payload);
      try {
        const res = await axiosInstance.post(`/subBenefit/save`, payload);
        if (res.data?.status === 201) {
          setSBenefitId(res.data?.data?.subBenefitId);
          navigate(-1);
          // searchParams.set("id", id);
          // navigate(`/benefit/subBenefit?${searchParams}`);
          // notify.success(res.data?.message);
        }
      } catch (error: any) {
        console.error(error);
        // notify.error(error.response?.data?.message);
      }
    }
  };
  const [mainBenefitId, setMainBenefitId] = useState<any>("");

  const [defaultValues, setDefaultValues] = useState<any>({
    subBenefitCode: "",
    subBenefitName: "",
    status: false,
  });

  const updateSubBenefit = async (data: any) => {
    if (id && mainBenefitId) {
      const payloadData = {
        subBenefitId: parseInt(id),
        subBenefitCode: data.subBenefitCode,
        subBenefitName: data.subBenefitName,
        status: data.status,
        isDeleted: false,
        mainBenefitId: mainBenefitId,
      };
      try {
        const res = await axiosInstance.put(
          `/subBenefit/update/${id}`,
          payloadData
        );
        console.log(res);
        alert("Sub Benefit Updated!");
        navigate(-1);
      } catch (error: any) {
        console.error(error);
        // notify.error(error.response?.data?.message);
      }
    }
  };
  const handleClick = (data: any) => {
    if (page == "edit") {
      console.log("update called");
      updateSubBenefit(data);
    } else {
      console.log("create called");
      createSBenefit(data);
    }
  };
  useEffect(() => {
    const id = searchParams.get("subId");
    const page = searchParams.get("page");

    if (page == "edit") {
      setTitle("Edit Sub benefit");
      setIsEdit(true);
    }
    if (page == "view") {
      setIsView(true);
      setTitle("View Sub benefit");
    }
    if (page) setpage(page);
    if (id) {
      setId(id);
    }

    const ID = searchParams.get("mainBenefitId");
    if (ID) {
      setMainBenefitId(ID);
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
      getSubBenefitById();
    }
  }, [id]);

  function getSubBenefitById() {
    axiosInstance.get(`/subBenefit/viewById/${id}`).then((response: any) => {
      const responseData = response?.data?.data ?? {};
      const defVals = {
        subBenefitId: responseData?.subBenefitId ?? "",
        subBenefitCode: responseData?.subBenefitCode ?? "",
        subBenefitName: responseData?.subBenefitName ?? "",
        status: responseData?.status ?? false,
      };
      reset(defVals);
      setValue("subBenefitCode", defVals.subBenefitId);
      setValue("subBenefitName", defVals.subBenefitName);
      setValue("status", defVals.status);
    });
  }

  useEffect(() => {
    console.log("err", errors);
  }, [errors]);

  return (
    <>
      <Typography variant="h4" mt={5} textAlign="center">
        {title}
      </Typography>
      <hr />
      <form className="create-form">
        <Grid item xs={12} ml={25} display="flex" justifyContent="left">
          <Button
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={12} ml={25} display="flex" justifyContent="left">
          <Grid
            item
            xs={12}
            sm={4}
            lg={4}
            ml={2}
            mr={2}
            mt={10}
            sx={{ width: "20%" }}
          >
            <FormTextField
              label={"Sub Benefit Code"}
              type="text"
              register={register("subBenefitCode")}
              error={!!errors.subBenefitCode?.message}
              helperText={errors.subBenefitCode?.message?.toString()}
              disabled={access}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            lg={4}
            ml={2}
            mr={2}
            mt={10}
            sx={{ width: "20%" }}
          >
            <FormTextField
              label={"Sub Benefit Name"}
              type="text"
              register={register("subBenefitName")}
              error={!!errors.subBenefitName?.message}
              helperText={errors.subBenefitName?.message?.toString()}
              disabled={access}
            />
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
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
              error={false}
              control={control}
              setValue={() => setValue}
              helperText={""}
              disabled={isView}
            />
          </Grid>
        </Grid>
        {!isView ? (
          <Grid item xs={12} display="flex" justifyContent="center">
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
              variant="contained"
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
    </>
  );
}

export default CreateSubBenefit;
