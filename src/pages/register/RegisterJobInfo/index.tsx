import { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { getUserThunk, saveUserThunk, userSelector } from "storage/slices/user";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import MQForm from "modules/MQForm";
import MQButton from "modules/MQButton";
import history from "helpers/history";

const RegisterJobInfo: FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(({ user }) => userSelector(user));

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      department: userData?.department || "",
      job_title: userData?.job_title || "",
      country: userData?.country || "",
      city: userData?.city || "",
    },
    validationSchema: yup.object().shape({
      department: yup.string().required("Field is Required"),
      job_title: yup.string().required("Field is Required"),
      country: yup.string().required("Field is Required"),
      city: yup.string().required("Field is Required"),
    }),
    onSubmit: async (values) => {
      const response = await dispatch(saveUserThunk(values));

      if (response.type === saveUserThunk.fulfilled.type) {
        history.push("/register/auth");
      }
    },
  });

  const back = () => {
    history.push("/register/details");
  };

  return (
    <div className="app-register-details">
      <MQForm
        className="app-register-details__form"
        onSubmit={formik.handleSubmit}
      >
        <MQForm.Group>
          <MQForm.Label required>{"Department"}</MQForm.Label>
          <MQForm.Input
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              !!formik.touched.department && !!formik.errors.department
            }
          />
          <MQForm.Feedback type="invalid" touched={!!formik.touched.department}>
            {formik.errors.department}
          </MQForm.Feedback>
        </MQForm.Group>
        <MQForm.Group>
          <MQForm.Label required>{"Job Title"}</MQForm.Label>
          <MQForm.Input
            name="job_title"
            value={formik.values.job_title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.touched.job_title && !!formik.errors.job_title}
          />
          <MQForm.Feedback type="invalid" touched={!!formik.touched.job_title}>
            {formik.errors.job_title}
          </MQForm.Feedback>
        </MQForm.Group>
        <MQForm.Group>
          <MQForm.Label required>{"Country"}</MQForm.Label>
          <MQForm.Input
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.touched.country && !!formik.errors.country}
          />
          <MQForm.Feedback type="invalid" touched={!!formik.touched.country}>
            {formik.errors.country}
          </MQForm.Feedback>
        </MQForm.Group>
        <MQForm.Group>
          <MQForm.Label required>{"City"}</MQForm.Label>
          <MQForm.Input
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.touched.city && !!formik.errors.city}
          />
          <MQForm.Feedback type="invalid" touched={!!formik.touched.city}>
            {formik.errors.city}
          </MQForm.Feedback>
        </MQForm.Group>
        <MQForm.Group>
          <MQButton type="submit" isLoading={formik.isSubmitting} full>
            {"Next"}
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

export default RegisterJobInfo;
