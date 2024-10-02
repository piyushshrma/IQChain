"use client"

import Link from 'next/link';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Spline from '@splinetool/react-spline';
import { useState } from 'react';
import AboutUs from '../AboutUs/page.js';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-[var(--background)] shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-3xl font-bold text-[var(--primary)] dark:text-[var(--accent)]">IQChain</h1>
          </div>

          {/* Menu for larger screens */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-800 dark:text-[var(--foreground)] hover:text-purple-800">
              Home
            </Link>
            <Link href="/AboutUs" className="text-gray-800 dark:text-[var(--foreground)] hover:text-purple-800">
              About Us
            </Link>
            <SignedIn>
              <Link href="/create-quiz" className="text-gray-800 dark:text-[var(--foreground)] hover:text-purple-800">
                Create Quiz
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-[var(--foreground)]">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={!isOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                <path className={isOpen ? 'block' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-[var(--foreground)] hover:text-purple-800">
            Home
          </Link>
          <Link href="/AboutUs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-[var(--foreground)] hover:text-purple-800">
            About Us
          </Link>
          <SignedIn>
            <Link href="/create-quiz" className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-[var(--foreground)] hover:text-purple-800">
              Create Quiz
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white dark:bg-[var(--background)] p-8">
      <Navbar />
      <div className="relative flex flex-col md:flex-row w-full max-w-6xl justify-between items-center h-full z-10">
        {/* Left Side: Text and Buttons */}
        <div className="flex flex-col gap-6 max-w-md h-full justify-center md:mt-[-100px]">
          <h1 className="font-extrabold text-7xl text-[var(--primary)] dark:text-[var(--accent)]">
            IQChain
          </h1>
          <span className="text-2xl font-light text-gray-700 dark:text-[var(--foreground)]">
            "Where Knowledge Meets the Blockchain"
          </span>
          <div className="space-y-4">
            <Link href="/Tn-quiz">
              <button className="px-6 py-3 bg-[var(--primary)] dark:bg-[var(--accent)] text-white font-semibold rounded-lg shadow-lg hover:bg-purple-800 transition duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Spline Scene */}
        <div className="w-full md:w-auto h-full flex justify-end items-center mt-[20px]">
          <div className="w-full h-full max-w-[700px]">
            <Spline scene="https://prod.spline.design/64buftY0pHtSHrcH/scene.splinecode" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
