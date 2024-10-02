import HomePage from "../app/HomePage/page.js";
import { ClerkProvider } from '@clerk/nextjs';

export default function Home() {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <HomePage/>
    </ClerkProvider>
  );
}
