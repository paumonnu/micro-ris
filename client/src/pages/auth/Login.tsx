import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { login } from '../../api/auth';
import { useStore } from '../../hooks/useStore';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import micrologo from '../../assets/img/microris-logo3.png';
import { LoadingButton } from '@/components/ui/loading-button';

type FormInputs = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'pau@gmail.com',
      password: '6Mahoney9!',
    },
  });

  const { storeAuth, token } = useStore((state) => state.auth);

  const { isError, isPending, mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (formValues: FormInputs) => {
      return login(formValues.email, formValues.password);
    },
    onSuccess: (data) => {
      storeAuth(data.accessToken, data.refreshToken);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <>
      <div className="flex flex-1 items-center justify-center p-4">
        <section className=" max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <div className="mb-8">
            <img className="w-64" src={micrologo} />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col "
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                isLoading={isPending}
                className="self-center mt-2"
                type="submit"
              >
                Submit
              </LoadingButton>
            </form>
          </Form>
        </section>
      </div>
    </>
  );
}

export default Login;
