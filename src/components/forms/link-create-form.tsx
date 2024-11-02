'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/chadcn/utils';
import { createLink } from '@/server-actions';

const FormSchema = z.object({
  url: z.string().min(2, {
    message: 'URL must be at least 2 characters',
  }),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters',
  }),
  tags: z.string().optional(),
});

export default function LinkCreateForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: '',
      title: '',
      tags: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createLink({
      title: data.title,
      url: data.url,
      tags: data.tags
        ? data.tags.split(' ')
        : [],
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className={twForm}>
        <h1 className={twTitle}>Add New Link</h1>

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  className={twInput}
                  placeholder="https://example.com" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className={twInput}
                  placeholder="Title" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  className={twInput}
                  placeholder="Tags (space separated)" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={twButtonsArea}>
          <Button variant="outline" className={twCancelButton}>
            Cancel
          </Button>
          <Button type="submit" className={twSubmitButton}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

const twForm = cn(
  'w-[600px] -mt-10 px-8 py-8 flex flex-col gap-y-4',
  'bg-stone-200 shadow-md rounded'
);

const twTitle = cn(
  'mb-6 text-2xl font-semibold'
);

const twInput = cn(
  'border border-[#b2b2b2]'
);

const twButtonsArea = cn(
  'w-full mt-24 flex flex-row gap-x-4'
);

const twCancelButton = cn(
  'w-full text-md border border-black/50'
);

const twSubmitButton = cn(
  'w-full text-md'
);
