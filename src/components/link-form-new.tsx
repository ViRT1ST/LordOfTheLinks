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

import { NewLinkInput } from '@/types';
import { addLink } from '@/lib/actions';

const FormSchema = z.object({
  url: z.string().min(2, {
    message: 'Search must be at least 2 characters.',
  }),
  title: z.string().min(2, {
    message: 'Search must be at least 2 characters.',
  }),
  tags: z.string().min(2, {
    message: 'Search must be at least 2 characters.',
  }),
});

export default function LinkFormNew({ submitData }: { submitData: (linkData: any) => void }) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: '',
      title: '',
      tags: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    console.log(data);
    
    // 'use server';
    await addLink({
      title: data.title,
      url: data.url,
      tags: data.tags.split(','),
    });
    

  }


  //onSubmit={form.handleSubmit(onSubmit)}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className={cn(
        'bg-stone-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[600px]',
        'flex flex-col gap-y-4'
      )}>

        <h1 className="text-2xl mb-6 font-semibold">Add New Link</h1>

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    'border-[#b2b2b2] border',
                  )}
                  placeholder="URL" 
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
                  className={cn(
                    'border-[#b2b2b2] border',
                  )}
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
                  className={cn(
                    'border-[#b2b2b2] border',
                  )}
                  placeholder="Tags (comma separated)" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-x-4 w-full mt-20" >
          <Button type="submit" className={cn(
            'w-full'
          )}>
            Cancel
          </Button>
          <Button type="submit" className={cn(
            'w-full'
          )}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
