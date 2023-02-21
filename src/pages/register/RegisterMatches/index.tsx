import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { unwrapResult } from "@reduxjs/toolkit";
import * as yup from "yup";

import Cache from "storage/cache";
import { AuthDto } from "storage/slices/auth/types";
import { StorageConstantsEnum } from "storage/cache/types";
import { getUserThunk, saveUserThunk, userSelector } from "storage/slices/user";
import { authenticateThunk, registerThunk } from "storage/slices/auth";
import { employeesSelector, queryEmployees } from "storage/slices/employees";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import history from "helpers/history";
import { findMatches } from "helpers/matching";
import MQForm from "modules/MQForm";
import MQButton from "modules/MQButton";

const RegisterAuth: FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(({ user }) => userSelector(user));
  const employees = useAppSelector(({ employees }) =>
    employeesSelector(employees)
  );

  useEffect(() => {
    dispatch(queryEmployees());
    dispatch(getUserThunk());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      suggestions: userData?.suggestions || [],
    },
    validationSchema: yup.object().shape({
      suggestions: yup.array().required("Field is Required"),
    }),
    onSubmit: async (values) => {
      const saveResponse = await dispatch(
        saveUserThunk({
          suggestions: values.suggestions,
        })
      );
      if (saveResponse.type === saveUserThunk.fulfilled.type) {
        const result = unwrapResult(saveResponse);
        if (result) {
          const registerResponse = await dispatch(registerThunk(result));
          if (registerResponse.type === registerThunk.fulfilled.type) {
            const authData = unwrapResult(registerResponse);
            await Cache.setItem<AuthDto>(StorageConstantsEnum.User, authData);
            await Cache.setItem(
              StorageConstantsEnum.CurrentUser,
              authData.user
            );
            await dispatch(authenticateThunk());
          }
        }
      }
    },
  });

  const back = () => {
    history.push("/register/auth");
  };

  const matches = findMatches(userData, employees);

  const handleMatchesChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(target.options)
      .filter((option) => option.selected)
      .map((option) => Number(option.value));

    formik.setFieldValue("suggestions", value);
  };

  return (
    <div className="app-register-auth">
      <MQForm
        className="app-register-auth__form"
        onSubmit={formik.handleSubmit}
      >
        <MQForm.Group>
          <MQForm.Label required>{"Matches"}</MQForm.Label>
          <MQForm.Select
            name="suggestions"
            multiple
            value={formik.values.suggestions as unknown as number}
            onChange={handleMatchesChange}
            onBlur={formik.handleBlur}
            isInvalid={
              !!formik.touched.suggestions && !!formik.errors.suggestions
            }
          >
            {matches.map(({ id, first_name, department, job_title }) => (
              <option key={id} value={id}>
                {first_name} {first_name} | {department} {job_title}
              </option>
            ))}
          </MQForm.Select>
          <MQForm.Feedback
            type="invalid"
            touched={!!formik.touched.suggestions}
          >
            {formik.errors.suggestions}
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
