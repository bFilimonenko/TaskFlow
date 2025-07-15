import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import MultipleSelector, { type Option } from '@/components/ui/multiple-selector.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEmployees } from '@/contexts/EmployeesContext';
import { useProjects } from '@/contexts/ProjectsContext';
import { PRIORITY, STATUS } from '@/contexts/ProjectsContext/context';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CalendarIcon } from 'lucide-react';

export interface IFilterForm {
  deadLine?: Date;
  estimate?: number;
  priority?: PRIORITY;
  status?: STATUS;
  users?: number[];
}

export const FilterTasks = ({ submitCallback }: { submitCallback: () => void }) => {
  const { taskFilters, setTaskFilters, refetchProjectTasks } = useProjects();
  const { employees, setEmployeeIdsToFetch, selectedEmployees } = useEmployees();

  const employeeOptions: Option[] | undefined = employees?.map((employee) => ({
    label: `${employee.firstName} ${employee.lastName}`,
    value: employee.id.toString(),
  }));

  const selectedEmployeesOptions: Option[] | undefined = selectedEmployees?.map((employee) => ({
    label: `${employee.firstName} ${employee.lastName}`,
    value: employee.id.toString(),
  }));

  const handleSubmit = (values: IFilterForm) => {
    setTaskFilters(values);
    if (values.users) setEmployeeIdsToFetch(values.users);
    refetchProjectTasks();
    submitCallback();
  };

  return (
    <Formik<IFilterForm>
      initialValues={taskFilters}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, resetForm, values }) => (
        <Form className="grid gap-5 items-center mb-4 p-3">
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="deadLine">Period</Label>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="deadLine"
                  className="w-auto justify-between font-normal hover:bg-blue-100"
                >
                  {values.deadLine ? values.deadLine.toLocaleDateString() : 'Select Date'}
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={values.deadLine}
                  captionLayout="dropdown"
                  onSelect={(date: Date | undefined) => {
                    setFieldValue('deadLine', date);
                  }}
                />
              </PopoverContent>
            </Popover>
            <ErrorMessage name="deadLine" component="div" className="text-red-700" />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="estimate">Estimate</Label>
            </div>
            <Field
              type="number"
              name="estimate"
              id="estimate"
              as={Input}
              placeholder="Select duration"
              min={1}
            />
            <ErrorMessage name="estimate" component="div" className="text-red-700" />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="priority">Priority</Label>
            </div>
            <Field name="priority" id="priority">
              {() => (
                <Select
                  defaultValue={taskFilters.priority ? taskFilters.priority : undefined}
                  onValueChange={(newValue: PRIORITY) => {
                    setFieldValue('priority', newValue);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PRIORITY.LOW}>Low</SelectItem>
                    <SelectItem value={PRIORITY.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={PRIORITY.HIGH}>High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage name="priority" component="div" className="text-red-700" />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="status">Status</Label>
            </div>
            <Field name="status" id="status">
              {() => (
                <Select
                  defaultValue={taskFilters.status ? taskFilters.status : undefined}
                  onValueChange={(newValue: STATUS) => {
                    setFieldValue('status', newValue);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={STATUS.TO_DO}>To Do</SelectItem>
                    <SelectItem value={STATUS.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={STATUS.IN_REVIEW}>In Review</SelectItem>
                    <SelectItem value={STATUS.DONE}>Done</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-700" />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="users">Assignees</Label>
            </div>
            <Field name="users" id="users" defaultValue={() => {
            }}>
              {() => (
                <MultipleSelector
                  value={selectedEmployeesOptions}
                  options={employeeOptions}
                  placeholder="Select Assignee"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                  onChange={(newValue) =>
                    setFieldValue(
                      'users',
                      newValue.map((option) => Number(option.value)),
                    )
                  }
                />
              )}
            </Field>
            <ErrorMessage name="users" component="div" className="text-red-700" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="bg-red-100 hover:bg-red-300"
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setTaskFilters({});
                refetchProjectTasks();
                submitCallback();
              }}
            >
              Clear Filters
            </Button>
            <Button className="bg-blue-100 hover:bg-blue-300" type="submit" variant="outline">
              Save Filters
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
