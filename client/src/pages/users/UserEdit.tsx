import { PageLayout } from '@/components/layout/PageLayout';
import { useParams } from 'react-router';
import { useUser } from './hooks/useUser';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { LoadingButton } from '@/components/ui/loading-button';
import { User } from '@/types/entities/user';
import { useCallback } from 'react';
import { useUpdateUser } from './hooks/useUpdateUser';
import { Input } from '@/components/ui/input-custom';
import { filterChangedFormFields } from '@/utils/rhf';

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2).max(64),
  lastName: z.string().min(2).max(64),
});

type UserEditFormProps = {
  user: User;
};

function UserEditForm({ user }: UserEditFormProps) {
  const { mutate, isPending } = useUpdateUser(user.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      firstName: user.info.firstName,
      lastName: user.info.lastName,
    },
  });

  const { formState } = form;
  const { dirtyFields } = formState;

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      return mutate(filterChangedFormFields(values, dirtyFields));
    },
    [dirtyFields, mutate],
  );

  return (
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isPending} className="mr-auto" type="submit">
          Save
        </LoadingButton>
      </form>
    </Form>
  );
}

export function UserEdit() {
  const { id } = useParams();
  const { user, isLoading } = useUser(id as string);

  return (
    <PageLayout
      title={`${user?.info?.firstName} ${user?.info?.lastName}`}
      isLoading={isLoading}
    >
      {user && <UserEditForm user={user} />}
    </PageLayout>
  );
}
