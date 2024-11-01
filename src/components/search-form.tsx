'use client';


import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
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

const FormSchema = z.object({
  searchQuery: z.string().min(2, {
    message: 'Search must be at least 2 characters.',
  }),
});

// type SearchFormProps = {
//   setSearchQuery: (searchQuery: string) => void;
// };

export default function SearchForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchQuery: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    router.push(`?search=${data.searchQuery.trim()}`);
    
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className={cn(
        'w-2/3 gap-x-3 self-center flex flex-row justify-center items-center'
      )}>
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Search</FormLabel> */}
              <FormControl>
                <Input
                  className={cn(
                    'w-[600px] border-[#b2b2b2] border-2',
                    'focus-visible:ring-opacity-0 ',
                    'focus-visible:ring-offset-0',
                  )}
                  placeholder="Search links..." 
                  {...field}
                />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <Button type="submit" className={cn(
          // 'bg-opacity-0 border-2 border-black/30 text-black',
          // 'hover:text-white'
          'bg-black/10 border-2 border-[#b2b2b2] text-black'
        )}>
          Search
        </Button>
      </form>
    </Form>
  );
}
