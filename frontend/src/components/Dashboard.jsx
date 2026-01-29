import React, { useState } from 'react';

const Dashboard = () => {
    const [candidates, setCandidates] = useState([
        { id: '1', name: 'Alice Smith', role: 'DevOps Engineer', score: 95, skills: ['AWS', 'Terraform', 'Python'] },
        { id: '2', name: 'Bob Jones', role: 'Frontend Dev', score: 60, skills: ['React', 'CSS'] },
        { id: '3', name: 'Charlie Day', role: 'Cloud Architect', score: 88, skills: ['AWS', 'Docker', 'Kubernetes'] },
    ]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">📄 Resume Parser Dashboard</h1>
                <p className="text-gray-600">Automated Screening & Ranking System</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates
                    .sort((a, b) => b.score - a.score)
                    .map((candidate) => (
                        <div key={candidate.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{candidate.name}</h2>
                                    <p className="text-sm text-gray-500">{candidate.role}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${candidate.score >= 80 ? 'bg-green-100 text-green-800' :
                                        candidate.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    Score: {candidate.score}%
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xs font-uppercase text-gray-400 tracking-wider mb-2">Detected Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.skills.map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full mt-2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                View Analysis
                            </button>
                        </div>
                    ))}
            </div>

            {/* Mock Upload Section */}
            <div className="mt-12 p-8 border-2 border-dashed border-gray-300 rounded-xl text-center">
                <p className="text-gray-500 mb-4">Drag and drop PDF resumes here to process</p>
                <button className="px-6 py-2 bg-gray-800 text-white rounded-lg">Select Files</button>
            </div>
        </div>
    );
};

export default Dashboard;
