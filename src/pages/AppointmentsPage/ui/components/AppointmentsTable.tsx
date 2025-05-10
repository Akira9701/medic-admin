'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { IAppointment } from '@/entities/Appointments/types';
import { toast } from 'sonner';
import { AppointmentStatus } from '@/entities/Appointments/types';
import useVetsStore from '@/entities/Vets/model/vets.store';
import usePetStore from '@/entities/Pet/model/pet.store';

interface AppointmentsTableProps {
  appointments: IAppointment[];
}

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Get vets and pets from stores
  const vets = useVetsStore((state) => state.vets);
  const pets = usePetStore((state) => state.pets);

  const handleStatusChange = (appointment: IAppointment, newStatus: AppointmentStatus) => {
    // Here you would call your API to update the appointment status
    toast.success(`Статус приема изменен на ${newStatus}`);
  };

  const handleViewDetails = (appointment: IAppointment) => {
    navigate(`/appointment/${appointment.id}`);
  };

  const getVetName = (vetId: string) => {
    const vet = vets?.find((v) => v.id === vetId);
    return vet ? `${vet.firstName} ${vet.lastName}` : vetId;
  };

  const getPetName = (petId: string) => {
    const pet = pets?.find((p) => p.id === petId);
    return pet ? pet.name : petId;
  };

  const columns: ColumnDef<IAppointment>[] = [
    {
      accessorKey: 'petId',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-4">
            Питомец
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const petId = row.getValue('petId') as string;
        return <div className="capitalize pl-4">{getPetName(petId)}</div>;
      },
    },
    {
      accessorKey: 'vetId',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Ветеринар
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const vetId = row.getValue('vetId') as string;
        return <div className="font-normal">{getVetName(vetId)}</div>;
      },
    },
    {
      accessorKey: 'startTime',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Дата и время
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const startTime = new Date(row.getValue('startTime'));
        const endTime = new Date(row.original.endTime);
        return (
          <div>
            {startTime.toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}{' '}
            <span className="text-gray-500">
              {startTime.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              {' - '}
              {endTime.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Статус
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <div
            className={`font-medium ${
              status === AppointmentStatus.BOOKED || status === AppointmentStatus.CONFIRMED
                ? 'text-green-600'
                : status === AppointmentStatus.CANCELLED
                  ? 'text-red-600'
                  : status === AppointmentStatus.COMPLETED
                    ? 'text-blue-600'
                    : 'text-gray-600'
            }`}>
            {status}
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const appointment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Открыть меню</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleViewDetails(appointment)}
                className="cursor-pointer flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                Просмотр деталей
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleStatusChange(appointment, AppointmentStatus.BOOKED)}>
                Отметить как забронировано
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange(appointment, AppointmentStatus.CONFIRMED)}>
                Отметить как подтверждено
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange(appointment, AppointmentStatus.COMPLETED)}>
                Отметить как завершено
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange(appointment, AppointmentStatus.CANCELLED)}>
                Отметить как отменено
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Update filter to search by pet name instead of ID
  const filterPetsByName = (value: string) => {
    if (!pets) return;

    const filteredPetIds = pets
      .filter((pet) => pet.name.toLowerCase().includes(value.toLowerCase()))
      .map((pet) => pet.id);

    table.getColumn('petId')?.setFilterValue(filteredPetIds.length > 0 ? filteredPetIds : value);
  };

  const table = useReactTable({
    data: appointments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center pb-4">
        <Input
          placeholder="Фильтр по имени питомца..."
          value={(table.getColumn('petId')?.getFilterValue() as string) ?? ''}
          onChange={(event) => filterPetsByName(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer"
                  onClick={() => handleViewDetails(row.original)}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Приемы не найдены.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} из{' '}
          {table.getFilteredRowModel().rows.length} строк(и) выбрано.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Предыдущая
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Следующая
          </Button>
        </div>
      </div>
    </div>
  );
}
