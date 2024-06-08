import React from 'react';

const successStories = [
    {
        name: 'Max',
        img: 'https://i.ibb.co/yyBXvZp/max.jpg',
        story: 'Max was adopted from our shelter and now lives happily with his new family. He loves playing fetch and going on long walks in the park.'
    },
    {
        name: 'Bella',
        img: 'https://i.ibb.co/W2cpKBW/bella.jpg',
        story: 'Bella found her forever home and enjoys cuddling with her new owner. She is a sweet and affectionate cat who has brought joy to her new family.'
    },
    {
        name: 'Charlie',
        img: 'https://i.ibb.co/Z1JhN7G/charlie.jpg',
        story: 'Charlie was a shy rabbit who found a loving home. He has come out of his shell and loves munching on carrots and exploring his new environment.'
    },
];

const SuccessStories = () => {
    return (
        <div className="bg-gray-100 py-12 dark:bg-gray-800">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">Success Stories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {successStories.map((story, index) => (
                        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                            <img className="w-full  object-cover" src={story.img} alt={story.name} />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-center text-black">{story.name}</div>
                                <p className="text-gray-700 text-base">
                                    {story.story}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SuccessStories;
