import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const JoinDevelopment = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Help Build Tools For Pilots</h1>
        <p className="text-lg">Join us in creating technology that keeps students safe and instructors independent</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What We're Building</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Current Projects</h3>
              <ul className="list-disc pl-4">
                <li>Student safety tracking</li>
                <li>Weather integration</li>
                <li>Equipment management</li>
                <li>Training tools</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Tech We Use</h3>
              <ul className="list-disc pl-4">
                <li>React/Next.js frontend</li>
                <li>GraphQL APIs</li>
                <li>Mobile-first design</li>
                <li>AI assistance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fair Pay for Real Work</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is paid work, not a volunteer project. You'll receive:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Competitive compensation in USD and TE (our community currency)</li>
            <li>Growth potential as our platform expands</li>
            <li>Direct impact on pilot safety and independence</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Join Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Whether you're an experienced developer or just learning to code:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Experienced</h3>
              <ul className="list-disc pl-4">
                <li>Build core features</li>
                <li>Mentor others</li>
                <li>Guide architecture</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Learning</h3>
              <ul className="list-disc pl-4">
                <li>Start with basics</li>
                <li>Get mentoring</li>
                <li>Learn by doing</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p>Ready to help? Contact us on Telegram to get started</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinDevelopment;
