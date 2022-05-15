import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

const Navigation = () => {
   const [session, loading] = useSession();

   return (
      <Navbar bg="dark" variant="dark">
         <Navbar.Brand>
            <Link href="/">My awesome app</Link>
         </Navbar.Brand>
         <Nav className="mr-auto">
            {!session && !loading && (
               <Link href="/sign_in" passHref>
                  <Nav.Link>Sign in</Nav.Link>
               </Link>
            )}

            {session && !loading && (
               <>
                  <Nav.Link onClick={() => signOut({ callbackUrl: '/' })}>
                     Sign out
                  </Nav.Link>

                  <Link href="/dashboard" passHref>
                     <Nav.Link>Dashboard</Nav.Link>
                  </Link>
               </>
            )}
         </Nav>
      </Navbar>
   );
};

export default Navigation;
