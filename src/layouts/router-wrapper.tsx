"use client"
// RouterWrapper.js
import { usePathname  } from 'next/navigation';
import PublicLayout from '@/layouts/routes/public';
import PrivateLayout from '@/layouts/routes/private';

const RouterWrapper = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();

  const isPublicPage = ["", "/", "login", "signup"].includes(pathname)

  return <>
  {
    isPublicPage ? <PublicLayout>{children}</PublicLayout> : <PrivateLayout>{children}</PrivateLayout>
  }
  </>
};

export default RouterWrapper;
