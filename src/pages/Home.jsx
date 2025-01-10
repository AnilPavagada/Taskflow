import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TableHeader from '../components/TableHeader';
import Dashboard from '../components/Dashboard';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <header>
                <Navbar />
            </header>

           {/* Main Content*/}
            <main className="flex-grow">
                {/* Hero Section */}
                 <section className="mt-6">
                    <Hero />
                </section> 

                {/* Table Header Section */}
               {/* <section className="mt-6">
                    <TableHeader />
                </section>*/}
                <div className="pt-16 bg-white min-h-screen">
  <Dashboard />
</div>


                {/* Dashboard 
                <section className="mt-10 px-6">
                    <Dashboard />
                </section>*/}
            </main>
        </div>
    );
};

export default Home;
