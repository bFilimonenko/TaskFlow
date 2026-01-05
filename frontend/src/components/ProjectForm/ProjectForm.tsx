import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { PRIORITY } from '@/contexts/ProjectsContext/context.tsx';
import { cn } from '@/lib/utils.ts';
import { ErrorMessage, Field, Formik } from 'formik';
import { CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export interface IProjectForm {
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
  starts: Yup.date()
    .required()
    .when('deadLine', (deadLine, schema) =>
      schema.max(deadLine, "The start can't be later than the deadline"),
    ),
  deadLine: Yup.date().required(),
});

export const ProjectForm = ({
  editValues,
  formAction,
  submitCallback,
}: {
  editValues?: IProjectForm;
  formAction: (values: IProjectForm, id?: number) => void;
  submitCallback?: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <Formik<IProjectForm>
      initialValues={
        editValues
          ? {
              ...editValues,
              starts: new Date(`${editValues.starts}`),
              deadLine: new Date(`${editValues.deadLine}`),
            }
          : {
              projectName: '',
              description: '',
              priority: undefined,
              starts: undefined,
              deadLine: undefined,
            }
      }
      validationSchema={addProjectSchema}
      onSubmit={(values: IProjectForm) => {
        formAction(values);
        if (submitCallback) return submitCallback();
        navigate(-1);
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6')}>
          <div className="grid gap-6 items-start">
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="projectName">Project Name *</Label>
              </div>
              <Field name="projectName" id="projectName" as={Input} />
              <ErrorMessage name="projectName" component="div" className="text-red-700" />
            </div>

            <div className="grid grid-cols-2">
              <div className="grid gap-3 place-self-start">
                <div className="flex items-center">
                  <Label htmlFor="starts">Start Date *</Label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="starts"
                      className="w-48 justify-between font-normal hover:bg-blue-100"
                    >
                      {values.starts ? values.starts.toLocaleDateString() : 'Select Date'}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={values.starts}
                      captionLayout="dropdown"
                      onSelect={(date: IProjectForm['starts']) => setFieldValue('starts', date)}
                    />
                  </PopoverContent>
                </Popover>
                <ErrorMessage name="starts" component="div" className="text-red-700" />
              </div>
              <div className="grid gap-3 place-self-start">
                <div className="flex items-center">
                  <Label htmlFor="deadLine">Dead Line *</Label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="deadLine"
                      className="w-48 justify-between font-normal hover:bg-blue-100"
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
                      onSelect={(date: IProjectForm['deadLine']) => setFieldValue('deadLine', date)}
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
                    defaultValue={editValues ? editValues.priority : undefined}
                    onValueChange={(newValue: PRIORITY) => setFieldValue('priority', newValue)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
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
            <Button type="submit" className="justify-self-end" variant="custom">
              Save Project
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
