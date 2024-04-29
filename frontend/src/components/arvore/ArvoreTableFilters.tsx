import { Search, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormInput } from '../ui/FormInput';
import { Button } from '../ui/Button';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const ordersFiltersSchema = z.object({
  utId: z.string().optional(),
  search: z.string().optional(),
  status: z.string().optional(),
});

type OrderFiltersSchema = z.infer<typeof ordersFiltersSchema>;

export function OrderTableFilters() {
  const searchParams = useSearchParams();

  const utId = searchParams.get('utId');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const { register, handleSubmit, reset, control } =
    useForm<OrderFiltersSchema>({
      defaultValues: {
        utId: utId ?? '',
        search: search ?? '',
        status: status ?? 'all',
      },
    });

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const queryString = useCallback(
        (type: string, name: string, value?: string) => {
          const params = new URLSearchParams(searchParams.toString());
          if (type === 'create') {
            params.set(name, value!);
          } else if (type === 'delete') {
            params.delete(name);
          }
          return params.toString();
        },
        [searchParams]
      );

    function handleFilter(data: OrderFiltersSchema) {
        const utId = data.utId?.toString();
        const search = data.search?.toString();
        const status = data.status?.toString();

        if (utId) {
        queryString('create', 'utId', utId);
        } else {
        queryString('delete', 'utId');
        }

        if (search) {
            queryString('create', 'search', search);
        } else {
            queryString('delete', 'search');
        }
        
    }
    function handleClearFilters() {
        
        queryString('delete', 'utId');
        queryString('delete', 'search');
        queryString('create', 'page', '1');

        reset({
            utId: '',
            search: '',
        });
    }

  const hasAnyFilter = !!utId || !!search;

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <FormInput
        id="utId"
        placeholder="Código da UT"
        className="h-8 w-auto"
        {...register('utId')}
      />
      <FormInput
        id="utId"
        placeholder="Número da UT"
        className="h-8 w-[320px]"
        {...register('search')}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        size="xs"
        disabled={!hasAnyFilter}
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
