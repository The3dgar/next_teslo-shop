import React, { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { IUser } from '@/interfaces';

import { useAdmin } from '@/hooks';
import { AdminLayout } from '@/components/layout';
import {
  FullScreenLoading,
  Grid,
  MenuItem,
  PeopleOutline,
  Select,
  Typography,
} from '@/components/ui';
import { validUserRoles } from '@/utils';
import { AdminService } from '@/services';
import { AdminTable } from '@/components/admin';

const UsersPage = () => {
  const { isError, isLoading, data } = useAdmin<IUser[]>('admin/users');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (isError) {
    console.log({ isError });
    return <Typography>Error al cargar la data</Typography>;
  }

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    try {
      await AdminService.updateUserRole({ role: newRole, userId });
      setUsers(updatedUsers);
    } catch (error) {
      console.log({ error });
      alert('No se pudo actualizar el role del usuario');
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Correo', width: 250 },
    {
      field: 'name',
      headerName: 'Nombre Completo',
      width: 300,
    },
    {
      field: 'role',
      headerName: 'Rol',
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label='Row'
            sx={{ width: '300px' }}
            onChange={(event) => onRoleUpdated(row.id, event.target.value)}>
            {validUserRoles.map((role) => (
              <MenuItem key={role} value={role}>
                {role.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title='Usuarios'
      subTitle='Mantenimiento de usuarios'
      icon={<PeopleOutline />}>
      <AdminTable rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default UsersPage;
