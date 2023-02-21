import { FC, useEffect, useState, useMemo } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import * as yup from "yup";

import { GenderEnum } from "storage/types";
import {
  getUserThunk,
  updateUserThunk,
  userSelector,
} from "storage/slices/user";
import Cache from "storage/cache";
import { EmployeeDto } from "storage/slices/employees/types";
import { queryEmployees } from "storage/slices/employees";
import { UserDto } from "storage/slices/user/types";
import { StorageConstantsEnum } from "storage/cache/types";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useMatches } from "hooks/useMatches";
import MQForm from "modules/MQForm";
import MQButton from "modules/MQButton";
import AppHeader from "components/AppHeader";
import { OrderType, sortByKey } from "helpers/general";

import "./style.scss";

const MatchList = ({ data, handleClick, isLoading, type = null }: any) => {
  const [sortBy, setSortBy] = useState("first_name");
  const [ordering, setOrdering] = useState<OrderType>("asc");
  const sortOptions = Object.keys(data?.[0] ?? {}).filter(
    (option) => !["length", "email", "id"].includes(option)
  );
  const sortedValues = sortByKey<Record<keyof any, string | number>>(
    data,
    sortBy,
    ordering
  );

  const handleToggleOrdering = () => {
    setOrdering((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSortOptionsChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(target.value);
  };

  return (
    <div>
      <div className="mq-flex-center mq-flex-justify-between">
        <MQForm.Select
          name="gender"
          className="mq-flex-1 mq-mr-md"
          value={sortBy}
          onChange={handleSortOptionsChange}
        >
          {sortOptions.map((value) => (
            <option key={value} value={value} label={value} />
          ))}
        </MQForm.Select>
        <MQButton
          className="outline-none"
          variant="outline-primary"
          onClick={handleToggleOrdering}
        >
          {ordering === "asc" ? <span>&#8679;</span> : <span> &#8681;</span>}
        </MQButton>
      </div>
      {sortedValues?.map((item: any) => {
        return (
          <div
            className="mq-flex-center mq-flex-justify-between mq-my-xs"
            key={item.id}
          >
            <div>
              <p className="mq-my-xs">
                {item.first_name}
                {item.last_name}
              </p>
              <p className="mq-my-xs">
                {item.department}
                {item.job_title}
              </p>
            </div>
            <MQButton
              type="button"
              size="sm"
              isLoading={isLoading}
              onClick={handleClick(item.id)}
            >
              {type === "chosen" ? "Remove" : "Add"}
            </MQButton>
          </div>
        );
      })}
    </div>
  );
};

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const matches = useMatches();
  const userData = useAppSelector(({ user }) => userSelector(user));

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(queryEmployees());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: userData?.first_name || "",
      last_name: userData?.last_name || "",
      email: userData?.email || "",
      gender: userData?.gender || GenderEnum.Male,
      department: userData?.department || "",
      job_title: userData?.job_title || "",
      country: userData?.country || "",
      city: userData?.city || "",
      password: userData?.password || "",
      suggestions: userData?.suggestions || [],
    },
    validationSchema: yup.object().shape({
      first_name: yup.string().required("Field is Required"),
      last_name: yup.string().required("Field is Required"),
      gender: yup
        .string()
        .oneOf(Object.values(GenderEnum))
        .required("Field is Required"),
      department: yup.string().required("Field is Required"),
      job_title: yup.string().required("Field is Required"),
      country: yup.string().required("Field is Required"),
      city: yup.string().required("Field is Required"),
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
      suggestions: yup.array().required("There must be at least one match"),
    }),
    onSubmit: async (values) => {
      const res = await dispatch(
        updateUserThunk({ ...userData, ...values } as UserDto)
      );
      const updatedUser = unwrapResult(res);
      await Cache.setItem(StorageConstantsEnum.CurrentUser, updatedUser);
    },
  });

  const { chosenSuggestions, suggestions } = useMemo(() => {
    const data =
      matches?.reduce<{
        [key: string]: EmployeeDto[];
      }>(
        (acc, employee) => {

          if (formik.values.suggestions.includes(employee.id as number)) {
            acc.chosenSuggestions.push(employee as EmployeeDto);
            return acc;
          }
          acc.suggestions.push(employee as EmployeeDto);

          return acc;
        },
        {
          chosenSuggestions: [],
          suggestions: [],
        }
      ) ?? {};

    return data;
  }, [formik.values.suggestions, matches]);

  const handleDeleteMatching = (id: number) => () => {
    const newSuggestions = formik.values?.suggestions?.filter((s) => s !== id);
    formik.setFieldValue("suggestions", newSuggestions);
  };

  const handleAddMatching = (id: number) => () => {
    const newSuggestions = [...formik.values?.suggestions, id];
    formik.setFieldValue("suggestions", newSuggestions);
  };

  return (
    <div className="app-profile">
      <AppHeader />
      <div className="mq-flex ">
        <div className="app-profile-form__block mq-mx-sm mq-flex-1 mq-px-md">
          <h2 className="h3">Profile info</h2>
          <MQForm
            className="app-profile-user__form "
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
              <MQForm.Feedback
                type="invalid"
                touched={!!formik.touched.first_name}
              >
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
                isInvalid={
                  !!formik.touched.last_name && !!formik.errors.last_name
                }
              />
              <MQForm.Feedback
                type="invalid"
                touched={!!formik.touched.last_name}
              >
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
              <MQForm.Feedback
                type="invalid"
                touched={!!formik.touched.department}
              >
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
                isInvalid={
                  !!formik.touched.job_title && !!formik.errors.job_title
                }
              />
              <MQForm.Feedback
                type="invalid"
                touched={!!formik.touched.job_title}
              >
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
              <MQForm.Feedback
                type="invalid"
                touched={!!formik.touched.country}
              >
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
                isInvalid={
                  !!formik.touched.password && !!formik.errors.password
                }
              />
              <MQForm.Feedback
                type="invalid"
                touched={!!formik.touched.password}
              >
                {formik.errors.password}
              </MQForm.Feedback>
            </MQForm.Group>
            <MQForm.Group>
              <MQButton type="submit" isLoading={formik.isSubmitting} full>
                {"Save"}
              </MQButton>
            </MQForm.Group>
          </MQForm>
        </div>

        <div className="app-profile-matches__block mq-mx-sm mq-flex-1 mq-px-md">
          <h2>Chosen Matches</h2>
          <MatchList
            type="chosen"
            data={chosenSuggestions}
            handleClick={handleDeleteMatching}
            isLoading={formik.isSubmitting}
          />
          <MQForm.Feedback
            type="invalid"
            touched={!!formik.touched.suggestions}
          >
            {formik.errors.suggestions}
          </MQForm.Feedback>
        </div>

        <div className="app-profile-suggestions__block mq-mx-sm mq-flex-1 mq-px-md">
          <h2>More Matches</h2>
          <MatchList
            data={suggestions}
            handleClick={handleAddMatching}
            isLoading={formik.isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
