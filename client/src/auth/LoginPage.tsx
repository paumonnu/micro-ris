import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../form/Input';
import Button from '../form/Button';
import logo from '../assets/img/microris-logo3.png';
import { useQuery } from '@tanstack/react-query';
import { fetchResources } from '../api/queries';

type FormInputs = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {};

  return (
    <>
      <div className="flex flex-1 items-center justify-center p-4">
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <img className="w-64" src={logo} />
            </div>
            <div>
              <Input register={register} name="email" placeholder="Email" />
            </div>

            <div>
              <Input
                register={register}
                name="password"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-center">
              <Button type="primary" size="md">
                Login
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
