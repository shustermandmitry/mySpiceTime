import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const PilotPoetryHub = () => {
  const [showSubmit, setShowSubmit] = useState(false);

  const corePoemContent = 
    `The flow
You know

youv done it
You in it

a bird
  of a spirit
a sailor
  of freedom`;

  const guidelines = [
    "Poetry should reflect genuine flight experience",
    "Focus on safety, freedom, and ethical instruction",
    "Express the spirit of independent instruction",
    "Share authentic moments of connection with wind and sky",
    "Honor the responsibility of teaching others to fly"
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">The Eagle's Voice</h1>
        <p className="text-lg">Where pilots share their soul of flight</p>
      </div>

      <Card className="bg-blue-50">
        <CardContent>
          <div className="whitespace-pre-line font-serif text-lg">
            {corePoemContent}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Our poetry collection maintains its spirit through carefully considered submissions:</p>
          <ul className="list-disc pl-6 space-y-2">
            {guidelines.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="text-center">
        <button
          onClick={() => setShowSubmit(!showSubmit)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Share Your Flight Poetry
        </button>
      </div>

      {showSubmit && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Poetry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Your Poetry</label>
                <textarea 
                  className="w-full h-32 p-2 border rounded-lg"
                  placeholder="Share your authentic flight experience..."
                />
              </div>
              <p className="text-sm text-gray-600">
                Each submission is reviewed to ensure it reflects our community's values 
                and contributes to our collective spirit of flight.
              </p>
              <div className="text-right">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Submit for Review
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PilotPoetryHub;
