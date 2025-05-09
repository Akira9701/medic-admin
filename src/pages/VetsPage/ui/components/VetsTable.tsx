'use client';

import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/shared/ui/button';
// import { Checkbox } from '@/shared/ui/checkbox';
import AlertModal from '@/shared/ui/alert-modal';
// import { buttonVariants } from '@/shared/ui/button';
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { IVet } from '@/entities/Vets/types';
import vetsApi from '@/entities/Vets/api';
// import { updateVet } from "@/entities/Vets/model/vets.store"
// import { deleteVet } from "@/entities/Vets/model/vets.store"

const ActionCell = ({ vet }: { vet: IVet }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      await vetsApi.addVetToClinic(vet.id);
    } catch (error) {
      console.error(error);
    }
     finally {
      setIsOpen(false); 
      setIsLoading(false);
      //setIsDropdownOpen(false); 
     }
  };

  const handleCancel = () => {
    if (!isLoading) {
      setIsOpen(false);
    }
  };

  return (
    
    <DropdownMenu 
    // open={isDropdownOpen} onOpenChange={setIsDropdownOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <AlertModal
          title="Добавление ветеринара"
          description={`Вы уверены, что хотите добавить ветеринара ${vet.firstName} ${vet.lastName} в клинику?`}
          buttonApproveText={isLoading ? <span className="loader" /> : "Добавить"}
          buttonCancelText="Отмена" 
          buttonShowModalText="Добавить в клинику"
          onApprove={handleAdd}
          onCancel={handleCancel}
          isOpen={isOpen}
          onOpenChange={(open) => {
            if (!isLoading) {
              setIsOpen(open);
            }
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface VetsTableProps {
  vets: IVet[];
  addVet: (vet: IVet) => void;
  updateVet: (vet: Partial<IVet>) => void;
  deleteVet: (id: string) => void;
}
export function VetsTable({ vets }: VetsTableProps) {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<IVet>[] = [
    {
      id: 'select',
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'specialization',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="pl-4">
            Specialization
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize pl-4">{row.getValue('specialization')}</div>,
    },
    {
      id: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const firstname = row.original.firstName;
        const lastname = row.original.lastName;
        return (
          <div className="font-normal">
            {firstname} {lastname}
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('email')}</div>,
    },
    {
      id: "profile",
      cell: ({ row }) => {
        const vetId = row.original.id;
        return (
          <Button 
            variant="outline"
            size="sm"
            onClick={() => navigate(`/vet/${vetId}`)}
          >
            View Profile
          </Button>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const vet = row.original;
        return <ActionCell vet={vet} />;
      },
    },
  ];

  const table = useReactTable({
    data: vets,
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
          placeholder="Filter by name..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
