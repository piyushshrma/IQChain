import React from 'react';
import Adnan from '../Image/adnan.png'; // Correct relative path to the image file
import Image from 'next/image';
import Piyush from '../Image/piyush.jpg'; // Correct relative path to the image file
import Tiru from '../Image/tiru.jpg'; // Correct relative path to the image file
import Kunal from '../Image/kunal.jpg'; // Correct relative path to the image file


export default function AboutUs() {
  return (
    <div className="relative min-h-screen bg-black p-8 flex flex-col justify-between"> {/* Full-page background set to black with flex layout */}
      
      {/* Header Section */}
      <header className="mb-8 flex justify-center items-center">
        <h1 className="text-xl font-bold uppercase tracking-widest" style={{ color: '#b388ff' }}>About Us</h1> {/* Custom color #6b00b6 */}
      </header>

      {/* Grid for 4 Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8"> {/* 4 columns for large screens */}
        
        {/* Card 1 */}
        <a href="#" className="group relative block bg-black">
          <Image
            alt="Card image"
            src={Adnan}
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />
          <div className="relative p-4 sm:p-6 lg:p-8">
            <p className="text-sm font-medium uppercase tracking-widest" style={{ color: '#b388ff' }}>Front End Developer</p> {/* Custom color for "Developer" */}
            <p className="text-xl font-bold text-white sm:text-2xl">Adnan Dalal</p>
            <div className="mt-32 sm:mt-48 lg:mt-64">
              <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm" style={{ color: '#b388ff' }}>
                  Do not search up for Obama's full name! Happy Quizzing
                </p>
              </div>
            </div>
          </div>
        </a>

        {/* Repeat the same for the other cards */}

        {/* Card 2 */}
        <a href="#" className="group relative block bg-black">
          <Image
            alt="Card image"
            src={Piyush}
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />
          <div className="relative p-4 sm:p-6 lg:p-8">
            <p className="text-sm font-medium uppercase tracking-widest" style={{ color: '#b388ff' }}>Blockchain Developer</p> {/* Custom color for "Developer" */}
            <p className="text-xl font-bold text-white sm:text-2xl">Piyush Sharma</p>
            <div className="mt-32 sm:mt-48 lg:mt-64">
              <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm" style={{ color: '#b388ff' }}>
                  NEGUS PRO MAX
                </p>
              </div>
            </div>
          </div>
        </a>

        {/* Card 3 */}
        <a href="#" className="group relative block bg-black">
          <Image
            alt="Card image"
            src={Kunal}
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />
          <div className="relative p-4 sm:p-6 lg:p-8">
            <p className="text-sm font-medium uppercase tracking-widest" style={{ color: '#b388ff' }}>Backend Developer</p> {/* Custom color for "Developer" */}
            <p className="text-xl font-bold text-white sm:text-2xl">Kunal Pusdekar</p>
            <div className="mt-32 sm:mt-48 lg:mt-64">
              <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm" style={{ color: '#b388ff' }}>
                  Rehne de
                </p>
              </div>
            </div>
          </div>
        </a>

        {/* Card 4 */}
        <a href="#" className="group relative block bg-black">
          <Image
            alt="Card image"
            src={Tiru}
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />
          <div className="relative p-4 sm:p-6 lg:p-8">
            <p className="text-sm font-medium uppercase tracking-widest" style={{ color: '#b388ff' }}>Full Stack Developer</p> {/* Custom color for "Developer" */}
            <p className="text-xl font-bold text-white sm:text-2xl">Aayush Tirmanwar</p>
            <div className="mt-32 sm:mt-48 lg:mt-64">
              <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm" style={{ color: '#b388ff' }}>
                  Likes to have poha for breakfast!
                </p>
              </div>
            </div>
          </div>
        </a>

      </div>

      {/* Footer */}
      <footer className="flex justify-center items-center p-4">
        <p className="text-sm" style={{ color: '#b388ff' }}>
          © 2024 TechNomads. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
