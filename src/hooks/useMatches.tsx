import { employeesSelector } from "storage/slices/employees";
import { userSelector } from "storage/slices/user";
import { findMatches } from "helpers/matching";
import { useAppSelector } from "./useAppSelector";
import { useMemo } from "react";

export const useMatches = () => {
  const userData = useAppSelector(({ user }) => userSelector(user));
  const employees = useAppSelector(({ employees }) =>
    employeesSelector(employees)
  );

  const matches = useMemo(() => {
    return findMatches(userData, employees);
  }, [employees, userData]);

  return matches;
};
