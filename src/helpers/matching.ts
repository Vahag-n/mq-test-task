import { EmployeeDto } from "storage/slices/employees/types";
import { UserDto } from "storage/slices/user/types";

type MatchCriteria = Partial<keyof Omit<EmployeeDto, "length">>[];

export const findMatches = (
  user: Partial<UserDto | null>,
  employees: EmployeeDto[] | null,
  criteria: MatchCriteria = ["department", "job_title"]
): EmployeeDto[] => {
  if (!user || !employees) return [];
  return employees.filter((employee) =>
    criteria.some((criterion) => employee[criterion] === user[criterion])
  );
};
