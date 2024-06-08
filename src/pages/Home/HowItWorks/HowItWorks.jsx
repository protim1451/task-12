import React from 'react';

const HowItWorks = () => {
    return (
        <div className="bg-white dark:bg-gray-800 py-12">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">How It Works</h2>
                <div className="flex flex-col lg:flex-row items-center mt-8">
                    <div className="lg:w-1/3 p-4">
                        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Step 1: Browse Pets</h3>
                            <p className="text-gray-600">
                                Explore various categories and find the pet that fits your lifestyle. We have a wide range of pets looking for a loving home.
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/3 p-4">
                        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Step 2: Meet Your Match</h3>
                            <p className="text-gray-600">
                                Once you find a pet you’re interested in, contact the shelter to set up a meet and greet. This helps ensure it’s a good fit for both you and the pet.
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/3 p-4">
                        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Step 3: Adopt &amp; Celebrate</h3>
                            <p className="text-gray-600">
                                Complete the adoption process and bring your new friend home. Celebrate the start of a beautiful relationship and enjoy your time together.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;
