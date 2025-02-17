import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Crown, Scale, Users, Brain, MessageCircle, Database } from 'lucide-react';

const StrategyBuilder = () => {
  const [strategy, setStrategy] = useState({
    decisionMaking: {
      consultative: 50,
      directive: 50,
      collaborative: 50,
      analytical: 50
    },
    communication: {
      transparent: 50,
      controlled: 50,
      inspirational: 50,
      factBased: 50
    },
    resourceAllocation: {
      egalitarian: 50,
      meritBased: 50,
      needBased: 50,
      investmentFocused: 50
    },
    conflictResolution: {
      mediation: 50,
      ruleBased: 50,
      consensusBuilding: 50,
      powerBalancing: 50
    }
  });

  const [consistencyScore, setConsistencyScore] = useState(0);
  const [worldImpact, setWorldImpact] = useState(null);

  const handleStrategyChange = (category, attribute, value) => {
    setStrategy(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [attribute]: value
      }
    }));
  };

  useEffect(() => {
    // Calculate strategy consistency and world impact
    const newConsistencyScore = calculateConsistency(strategy);
    const newWorldImpact = simulateWorldImpact(strategy);
    
    setConsistencyScore(newConsistencyScore);
    setWorldImpact(newWorldImpact);
  }, [strategy]);

  const calculateConsistency = (strat) => {
    // Complex consistency calculation logic
    return 75; // Placeholder
  };

  const simulateWorldImpact = (strat) => {
    // Simulate world impact based on strategy
    return {
      stability: 70,
      prosperity: 65,
      satisfaction: 80,
      sustainability: 75
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-6 h-6" />
            Strategy Builder - King For A Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Decision Making Section */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5" />
                <h3 className="font-semibold">Decision Making</h3>
              </div>
              {Object.entries(strategy.decisionMaking).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <Slider
                    value={[value]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={([newValue]) => 
                      handleStrategyChange('decisionMaking', key, newValue)
                    }
                    className="w-full"
                  />
                </div>
              ))}
            </Card>

            {/* Communication Section */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-semibold">Communication</h3>
              </div>
              {Object.entries(strategy.communication).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <Slider
                    value={[value]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={([newValue]) => 
                      handleStrategyChange('communication', key, newValue)
                    }
                    className="w-full"
                  />
                </div>
              ))}
            </Card>

            {/* Resource Allocation Section */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5" />
                <h3 className="font-semibold">Resource Allocation</h3>
              </div>
              {Object.entries(strategy.resourceAllocation).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <Slider
                    value={[value]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={([newValue]) => 
                      handleStrategyChange('resourceAllocation', key, newValue)
                    }
                    className="w-full"
                  />
                </div>
              ))}
            </Card>

            {/* Conflict Resolution Section */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-5 h-5" />
                <h3 className="font-semibold">Conflict Resolution</h3>
              </div>
              {Object.entries(strategy.conflictResolution).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <Slider
                    value={[value]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={([newValue]) => 
                      handleStrategyChange('conflictResolution', key, newValue)
                    }
                    className="w-full"
                  />
                </div>
              ))}
            </Card>
          </div>

          {/* Results Section */}
          <Card className="mt-6 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5" />
              <h3 className="font-semibold">World Impact Simulation</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Strategy Consistency Score</h4>
                <div className="text-2xl font-bold">
                  {consistencyScore}%
                </div>
              </div>
              
              {worldImpact && (
                <div>
                  <h4 className="font-medium mb-2">Projected Outcomes</h4>
                  <div className="space-y-2">
                    {Object.entries(worldImpact).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="capitalize">{key}</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {consistencyScore < 60 && (
              <Alert className="mt-4">
                <AlertDescription>
                  Your strategy has some internal conflicts. Consider adjusting your choices to improve consistency.
                </AlertDescription>
              </Alert>
            )}
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyBuilder;