import tesloApi from './tesloApi';

type IUserRole = {
  userId: string;
  role: string;
};

export const updateUserRole = async (props: IUserRole) => {
  const { data } = await tesloApi.put('/admin/users', props);
  return data;
};
