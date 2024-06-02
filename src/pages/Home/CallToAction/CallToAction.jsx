import React from 'react';

const CallToAction = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2">
                        <img
                            src="path-to-inspirational-image"
                            alt="Adopt a pet"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0 text-center lg:text-left">
                        <h2 className="text-4xl font-bold mb-4 text-gray-800">
                            Adopt a Pet, Give Them a Better Life
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Every pet deserves a loving home. By adopting a pet, you're giving them a second chance at life. Open your heart and home to a furry friend in need.
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Find Out More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CallToAction;
