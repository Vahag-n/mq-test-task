import { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { GenderEnum } from "storage/types";
import { getUserThunk, saveUserThunk, userSelector } from "storage/slices/user";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import MQForm from "modules/MQForm";
import MQButton from "modules/MQButton";
import history from "helpers/history";

const RegisterDetails: FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(({ user }) => userSelector(user));

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: userData?.first_name || "",
      last_name: userData?.last_name || "",
      gender: userData?.gender || GenderEnum.Male,
    },
    validationSchema: yup.object().shape({
      first_name: yup.string().required("Field is Required"),
      last_name: yup.string().required("Field is Required"),
      gender: yup
        .string()
        .oneOf(Object.values(GenderEnum))
        .required("Field is Required"),
    }),
    onSubmit: async (values) => {
      const response = await dispatch(saveUserThunk(values));

      if (response.type === saveUserThunk.fulfilled.type) {
        history.push("/register/job");
      }
    },
  });

  return (
    <div className="app-register-details">
      <MQForm
        className="app-register-details__form"
        onSubmit={formik.handleSubmit}
      >
        <MQForm.Group>
          <MQForm.Label required>{"First Name"}</MQForm.Label>
          <MQForm.Input
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              !!formik.touched.first_name && !!formik.errors.first_name
            }
          />
          <MQForm.Feedback type="invalid" touched={!!formik.touched.first_name}>
            {formik.errors.first_name}
          </MQForm.Feedback>
        </MQForm.Group>
        <MQForm.Group>
          <MQForm.Label required>{"Last Name"}</MQForm.Label>
          <MQForm.Input
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.touched.last_name && !!formik.errors.last_name}
          />
          <MQForm.Feedback type="invalid" touched={!!formik.touched.last_name}>
            {formik.errors.last_name}
          </MQForm.Feedback>
        </MQForm.Group>
        <MQForm.Group>
          <MQForm.Label required>{"Gender"}</MQForm.Label>
          <MQForm.Select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.touched.gender && !!formik.errors.gender}
          >
            {Object.values(GenderEnum).map((value) => (
              <option key={value} value={value} label={value} />
            ))}
          </MQForm.Select>
          <MQForm.Feedback type="invalid" touched={!!formik.touched.gender}>
            {formik.errors.gender}
          </MQForm.Feedback>
        </MQForm.Group>
        <MQForm.Group>
          <MQButton type="submit" isLoading={formik.isSubmitting} full>
            {"Next"}
          </MQButton>
        </MQForm.Group>
        <MQForm.Group>
          <p className="mq-text-center">
            <NavLink to={"/login"}>{"Back To Login"}</NavLink>
          </p>
        </MQForm.Group>
      </MQForm>
    </div>
  );
};

export default RegisterDetails;
