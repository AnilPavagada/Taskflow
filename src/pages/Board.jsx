
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Todo from '../components/Todo';

const Board = () => {
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

                <div className="pt-16 bg-white min-h-screen">
                    
                    <Todo/>
                </div>
            </main>
        </div>
    );
}

export default Board