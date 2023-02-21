import { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { getUserThunk, saveUserThunk, userSelector } from "storage/slices/user";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import history from "helpers/history";
import MQForm from "modules/MQForm";
import MQButton from "modules/MQButton";

const RegisterAuth: FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(({ user }) => userSelector(user));

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: userData?.email || "",
      password: userData?.password || "",
      rePassword: userData?.password || "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid Email Address")
        .required("Field is Required"),
      password: yup
        .string()
        .required("Password field is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must contain 8 characters, one uppercase, one lowercase."
        ),
      rePassword: yup
        .string()
        .required("Confirm password field is required.")
        .oneOf([yup.ref("password")], "Passwords must match."),
    }),
    onSubmit: async (values) => {
      const saveResponse = await dispatch(
        saveUserThunk({
          email: values.email,
          password: values.password,
        })
      );

      if (saveResponse.type === saveUserThunk.fulfilled.type) {
        history.push("/register/matches");
      }
    },
  });

  const back = () => {
    history.push("/register/job");
  };

  return (
    <div className="app-register-auth">
      <MQForm
        className="app-register-auth__form"
        onSubmit={formik.handleSubmit}
      >
        <MQForm.Group>
          <MQForm.Label required>{"Email Address"}</MQForm.Label>
          <MQForm.Input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            isInvalid={!!formik.touched.email && !!formik.errors.email}
          />
          <MQForm.Feedback type="invalid" touched={!!formik.touched.email}>
            {formik.errors.email}
          </MQForm.Feedback>
        </MQForm.Group>
        <MQForm.Group>
          <MQForm.Label required>{"Password"}</MQForm.Label>
          <MQForm.Input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={!!formik.touched.password && !!formik.errors.password}
          />
          <MQForm.Feedback type="invalid" touched={!!formik.touched.password}>
            {formik.errors.password}
          </MQForm.Feedback>
        </MQForm.Group>
        <MQForm.Group>
          <MQForm.Label required>{"Confirm Password"}</MQForm.Label>
          <MQForm.Input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            isInvalid={
              !!formik.touched.rePassword && !!formik.errors.rePassword
            }
          />
          <MQForm.Feedback type="invalid" touched={!!formik.touched.rePassword}>
            {formik.errors.rePassword}
          </MQForm.Feedback>
        </MQForm.Group>
        <MQForm.Group>
          <MQButton type="submit" full>
            {"Register"}
          </MQButton>
        </MQForm.Group>
        <MQForm.Group>
          <MQButton onClick={back} variant="secondary" full>
            {"Back"}
          </MQButton>
        </MQForm.Group>
      </MQForm>
    </div>
  );
};

export default RegisterAuth;
