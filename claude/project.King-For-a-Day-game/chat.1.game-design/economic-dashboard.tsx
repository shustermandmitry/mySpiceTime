import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Coins, TrendingUp, Users, Scale } from 'lucide-react';

interface EconomicMetrics {
  timestamp: number;
  capital: number;
  ethicsScore: number;
  taxRate: number;
  influence: number;
}

const EconomicDashboard = () => {
  const [metrics, setMetrics] = useState<EconomicMetrics[]>([]);
  const [currentState, setCurrentState] = useState({
    capital: 1000,
    ethicsScore: 0.8,
    taxRate: 0.2,
    influence: 0.5
  });

  useEffect(() => {
    // Simulate metrics over time
    const historicalMetrics = Array.from({ length: 10 }, (_, i) => ({
      timestamp: Date.now() - (9 - i) * 86400000,
      capital: 1000 + i * 100 * Math.random(),
      ethicsScore: 0.7 + i * 0.02,
      taxRate: 0.2 - i * 0.01,
      influence: 0.5 + i * 0.03
    }));
    setMetrics(historicalMetrics);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Capital Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Capital
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${currentState.capital.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last period
            </p>
          </CardContent>
        </Card>

        {/* Ethics Score Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ethics Score
            </CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(currentState.ethicsScore * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last period
            </p>
          </CardContent>
        </Card>

        {/* Tax Rate Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tax Rate
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(currentState.taxRate * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              -1.0% from last period
            </p>
          </CardContent>
        </Card>

        {/* Influence Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Social Influence
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(currentState.influence * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Economic Metrics Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  labelFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="capital"
                  stroke="#8884d8"
                  name="Capital"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="ethicsScore"
                  stroke="#82ca9d"
                  name="Ethics Score"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="taxRate"
                  stroke="#ffc658"
                  name="Tax Rate"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="influence"
                  stroke="#ff7300"
                  name="Influence"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EconomicDashboard;