import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { useProjects } from '@/contexts/ProjectsContext';
import { PRIORITY } from '@/contexts/ProjectsContext/context.tsx';
import { cn } from '@/lib/utils.ts';
import { ErrorMessage, Field, Formik } from 'formik';
import { CalendarIcon, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export interface IAddProjectForm {
  projectName: string;
  description?: string;
  priority: PRIORITY | undefined;
  starts: Date | undefined;
  deadLine: Date | undefined;
}

const addProjectSchema = Yup.object().shape({
  projectName: Yup.string().required(),
  description: Yup.string().notRequired(),
  priority: Yup.mixed<PRIORITY>().oneOf(Object.values(PRIORITY)).required(),
  starts: Yup.date().required(),
  deadLine: Yup.date().required(),
});

export const AddProject = () => {
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openDeadLineDate, setOpenDeadLineDate] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [deadLineDate, setDeadLineDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();
  const { createProject } = useProjects();

  return (
    <div className="w-full bg-white lg:px-30 px-10 py-10 rounded-3xl">
      <Formik<IAddProjectForm>
        initialValues={{
          projectName: '',
          description: '',
          priority: undefined,
          starts: undefined,
          deadLine: undefined,
        }}
        validationSchema={addProjectSchema}
        onSubmit={(values: IAddProjectForm) => {
          console.log(values);
          createProject?.mutate(values);
          navigate(-1)
          toast.success('Add project successfully.');
        }}
      >
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6')}>
            <h1 className="text-2xl font-bold mb-8">Add Project</h1>

            <div className="grid gap-6 items-start">
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="projectName">Project Name *</Label>
                </div>
                <Field name="projectName" id="projectName" as={Input} />
                <ErrorMessage name="projectName" component="div" className="text-red-700" />
              </div>

              <div className="grid grid-cols-2">
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="starts">Start Date *</Label>
                  </div>
                  <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="starts"
                        className="w-48 justify-between font-normal hover:bg-blue-100"
                      >
                        {startDate ? startDate.toLocaleDateString() : 'Select Date'}
                        <CalendarIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        captionLayout="dropdown"
                        onSelect={(date: IAddProjectForm['starts']) => {
                          values.starts = date;
                          setStartDate(date);
                          setOpenStartDate(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <ErrorMessage name="starts" component="div" className="text-red-700" />
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
                        console.dir(newValue);
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
                  <Label htmlFor="description">Description</Label>
                </div>
                <Field name="description" id="description" as={Textarea} className="resize-none" />
                <ErrorMessage name="description" component="div" className="text-red-700" />
              </div>
              <Button
                type="submit"
                className="justify-self-end"
                variant="custom"
                onClick={() => {
                }}
              >
                Save Project
              </Button>
            </div>
          </form>
        )}
      </Formik>

      <Button
        className="absolute top-12 right-12"
        variant="secondary"
        size="icon"
        onClick={() => navigate(-1)}
      >
        <X />
      </Button>
    </div>
  );
};
