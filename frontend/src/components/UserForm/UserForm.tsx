import { Button } from '@/components/ui/button.tsx';
import { DialogClose } from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import type { User } from '@/contexts/AuthContext/context.tsx';
import { useEmployees } from '@/contexts/EmployeesContext';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Name must be at least 2 letters')
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      'Name can only contain Latin letters.',
    )
    .required(),
  lastName: Yup.string()
    .min(2, 'Name must be at least 2 letters')
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      'Name can only contain Latin letters.',
    )
    .required(),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  age: Yup.number().min(18).notRequired(),
  city: Yup.string().notRequired(),
});

export const UserForm = ({ user }: { user: User }) => {
  const { editUserProfile } = useEmployees();

  return (
    <Formik
      initialValues={user}
      validationSchema={userSchema}
      onSubmit={(values) => {
        editUserProfile?.mutate({ id: user.id, userValues: values });
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 items-start p-4">
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="firstName">First Name *</Label>
              </div>
              <Field name="firstName" id="firstName" as={Input} />
              <ErrorMessage name="firstName" component="div" className="text-red-700" />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="lastName">Last Name *</Label>
              </div>
              <Field name="lastName" id="lastName" as={Input} />
              <ErrorMessage name="lastName" component="div" className="text-red-700" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email Address *</Label>
              <Field name="email" id="email" placeholder="youremail@gmail.com" as={Input} />
              <ErrorMessage name="email" component="div" className="text-red-700" />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="age">Age</Label>
              </div>
              <Field type="number" name="age" id="age" as={Input} />
              <ErrorMessage name="age" component="div" className="text-red-700" />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="city">City</Label>
              </div>
              <Field name="city" id="city" as={Input} />
              <ErrorMessage name="city" component="div" className="text-red-700" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-3">
            <DialogClose>
              <Button
                type="button"
                className="w-full hover:shadow-lg hover:bg-red-200 bg-red-300 font-bold"
                variant="secondary"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="hover:shadow-lg hover:bg-blue-100 bg-blue-300 font-bold"
              variant="outline"
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
