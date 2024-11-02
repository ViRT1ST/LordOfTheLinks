'use client';

import { useRouter } from 'next/navigation';
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
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/chadcn/utils';

const FormSchema = z.object({
  searchQuery: z.string().min(2, {
    message: 'Search query must be at least 2 characters',
  }),
});

export default function SearchForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchQuery: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    router.push(`?search=${data.searchQuery.trim()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className={twForm}>
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={twInput}
                  placeholder="Search links..." 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={twSubmitButton}>
          Search
        </Button>
      </form>
    </Form>
  );
}


const twForm = cn(
  'w-[800px] flex flex-row gap-x-3 justify-center items-center self-center'
);

const twInput = cn(
  'w-[600px] self-start',
  'border-2 border-[#b2b2b2]',
  'focus-visible:ring-opacity-0 ',
  'focus-visible:ring-offset-0',
);

const twSubmitButton = cn(
  'bg-black/10 text-black border-2 border-[#b2b2b2] self-start'
);