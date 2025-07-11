import { APP_PATHS } from '@/app-paths.enum.ts';
import type { IAddProjectForm } from '@/components/AddProject/AddProject.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import MultipleSelector, { type Option } from '@/components/ui/multiple-selector.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { useEmployees } from '@/contexts/EmployeesContext';
import { useProjects } from '@/contexts/ProjectsContext';
import { PRIORITY } from '@/contexts/ProjectsContext/context.tsx';
import { cn } from '@/lib/utils.ts';
import { ErrorMessage, Field, Formik } from 'formik';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export interface IAddTaskForm {
  taskName: string;
  description?: string;
  priority: PRIORITY | undefined;
  estimate: number | undefined;
  deadLine: Date | undefined;
  users: number[];
}

const addTaskSchema = Yup.object().shape({
  taskName: Yup.string().required(),
  description: Yup.string().notRequired(),
  priority: Yup.mixed<PRIORITY>().oneOf(Object.values(PRIORITY)).required(),
  estimate: Yup.number().min(1).required(),
  deadLine: Yup.date().required(),
  users: Yup.array().min(1).required(),
});

export const AddTask = ({ submitCallback }: { submitCallback: () => void }) => {
  const [openDeadLineDate, setOpenDeadLineDate] = useState(false);
  const [deadLineDate, setDeadLineDate] = useState<Date | undefined>(undefined);
  const { currentProject, createTask } = useProjects();
  const { employees } = useEmployees();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentProject) {
      toast.error('something went wrong!');
      navigate(`/${APP_PATHS.PROJECTS}`);
    }
  }, [currentProject, navigate]);
  if (!currentProject) return null;

  const employeeOptions: Option[] | undefined = employees?.map((employee) => ({
    label: `${employee.firstName} ${employee.lastName}`,
    value: employee.id.toString(),
  }));

  return (
    <DialogContent>
      <div>
        <Formik<IAddTaskForm>
          initialValues={{
            taskName: '',
            description: '',
            priority: undefined,
            estimate: undefined,
            deadLine: undefined,
            users: [],
          }}
          validationSchema={addTaskSchema}
          onSubmit={(values: IAddTaskForm) => {
            createTask?.mutate({ id: currentProject.id, values });
            submitCallback();
          }}
        >
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6')}>
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[400px]">
                <div className="m-2">
                  <div className="grid gap-6 items-start">
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="taskName">Task Name *</Label>
                      </div>
                      <Field name="taskName" id="taskName" as={Input} />
                      <ErrorMessage name="taskName" component="div" className="text-red-700" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <Label htmlFor="estimate">Estimate *</Label>
                        </div>
                        <Field
                          type="number"
                          name="estimate"
                          id="estimate"
                          as={Input}
                          placeholder="Select duration"
                        />
                        <ErrorMessage name="estimate" component="div" className="text-red-700" />
                      </div>
                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <Label htmlFor="deadLine">Dead Line *</Label>
                        </div>
                        <Popover open={openDeadLineDate} onOpenChange={setOpenDeadLineDate}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="deadLine"
                              className="w-48 justify-between font-normal hover:bg-blue-100"
                            >
                              {deadLineDate ? deadLineDate.toLocaleDateString() : 'Select Date'}
                              <CalendarIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={deadLineDate}
                              captionLayout="dropdown"
                              onSelect={(date: IAddProjectForm['deadLine']) => {
                                values.deadLine = date;
                                setDeadLineDate(date);
                                setOpenDeadLineDate(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <ErrorMessage name="deadLine" component="div" className="text-red-700" />
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="priority">Priority *</Label>
                      </div>
                      <Field name="priority" id="priority">
                        {() => (
                          <Select
                            onValueChange={(newValue: PRIORITY) => {
                              values.priority = newValue;
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
                        <Label htmlFor="users">Assignee *</Label>
                      </div>
                      <Field name="users" id="users">
                        {() => (
                          <MultipleSelector
                            defaultOptions={employeeOptions}
                            placeholder="Select Assignee"
                            emptyIndicator={
                              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                no results found.
                              </p>
                            }
                            onChange={(newValue) => {
                              values.users = newValue.map((option) => Number(option.value));
                            }}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="users" component="div" className="text-red-700" />
                    </div>

                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="description">Description</Label>
                      </div>
                      <Field
                        name="description"
                        id="description"
                        as={Textarea}
                        className="resize-none"
                      />
                      <ErrorMessage name="description" component="div" className="text-red-700" />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="justify-self-end" variant="custom">
                        Save Task
                      </Button>
                    </DialogFooter>
                  </div>
                </div>
              </ScrollArea>
            </form>
          )}
        </Formik>
      </div>
    </DialogContent>
  );
};
