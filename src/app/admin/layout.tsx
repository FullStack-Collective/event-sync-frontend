'use client';

import { Admin, Resource, ListGuesser, Layout } from 'react-admin';
import { dataProvider } from '@/providers/data/dataProvider';
import { authProvider } from '@/providers/auth/authProvider';

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout>
    {children}
  </Layout>
);

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={AdminLayout}
      requireAuth
    >
      <Resource name="events" list={ListGuesser} />
      <Resource name="rooms" list={ListGuesser} />
      <Resource name="sessions" list={ListGuesser} />
      <Resource name="speakers" list={ListGuesser} />
      <Resource name="questions" list={ListGuesser} />
    </Admin>
  );
}