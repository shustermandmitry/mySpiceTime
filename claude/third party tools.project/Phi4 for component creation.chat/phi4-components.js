// phi4-component-system.js
import {createComponentGenerator} from 'phi4';

// 1. Domain Visualization Component Generator
const domainVisConfig = {
    framework: 'react',
    patterns: {
        domainContainer: {
            template: ({name, level, subdomains}) => `
        const ${name}Domain = () => {
          const [activeSubdomain, setActiveSubdomain] = useState(null);
          
          return (
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-4">${level}</h3>
              <div className="grid grid-cols-${subdomains.length} gap-4">
                {${JSON.stringify(subdomains)}.map(sub => (
                  <div 
                    key={sub.name}
                    className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow"
                    onMouseEnter={() => setActiveSubdomain(sub.name)}
                    onMouseLeave={() => setActiveSubdomain(null)}
                  >
                    <h4 className="font-semibold">{sub.name}</h4>
                    <p className="text-sm text-gray-600">{sub.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        };
      `
        }
    }
};

// 2. Resource Flow Component Generator
const flowConfig = {
    framework: 'react',
    patterns: {
        flowVisualization: {
            template: ({source, target, constraints}) => `
        const ${source}To${target}Flow = () => {
          const [flowData, setFlowData] = useState({
            currentFlow: 0,
            capacity: ${constraints.maxCapacity},
            efficiency: ${constraints.targetEfficiency}
          });

          useEffect(() => {
            // Apply geometric constraints to flow
            const optimizedFlow = calculateOptimalFlow({
              source: '${source}',
              target: '${target}',
              constraints: ${JSON.stringify(constraints)}
            });
            setFlowData(prev => ({...prev, currentFlow: optimizedFlow}));
          }, []);

          return (
            <div className="flow-container p-4">
              <div className="flex justify-between items-center">
                <div className="source-node">${source}</div>
                <svg className="flow-path" viewBox="0 0 100 20">
                  <path 
                    d="M10,10 L90,10" 
                    className="stroke-2 stroke-blue-500"
                    strokeDasharray={flowData.currentFlow * 100 / flowData.capacity}
                  />
                </svg>
                <div className="target-node">${target}</div>
              </div>
              <div className="metrics text-sm text-gray-600 mt-2">
                Efficiency: {flowData.efficiency}%
              </div>
            </div>
          );
        };
      `
        }
    }
};

// 3. Metrics Display Component Generator
const metricsConfig = {
    framework: 'react',
    patterns: {
        metricsDashboard: {
            template: ({metrics}) => `
        const MetricsDashboard = () => {
          const [metricsData, setMetricsData] = useState(${JSON.stringify(metrics)});

          const updateMetric = (id, value) => {
            setMetricsData(prev => 
              prev.map(m => m.id === id ? {...m, value} : m)
            );
          };

          return (
            <div className="metrics-grid grid grid-cols-3 gap-4 p-4">
              {metricsData.map(metric => (
                <div 
                  key={metric.id}
                  className="metric-card bg-white p-4 rounded-lg shadow"
                >
                  <h4 className="font-medium text-gray-700">{metric.name}</h4>
                  <div className="text-2xl font-bold mt-2">
                    {metric.value}{metric.unit}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {metric.description}
                  </div>
                  {metric.trend && (
                    <div className="trend-indicator mt-2">
                      <span className={
                        metric.trend > 0 ? 'text-green-500' : 'text-red-500'
                      }>
                        {metric.trend}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        };
      `
        }
    }
};

// Create generators
const domainGenerator = createComponentGenerator(domainVisConfig);
const flowGenerator = createComponentGenerator(flowConfig);
const metricsGenerator = createComponentGenerator(metricsConfig);

// Example usage
const generateFullSystem = async () => {
    // 1. Generate domain components
    const domainSpec = {
        name: 'CommunityHealth',
        level: 'Primary',
        subdomains: [
            {name: 'Healthcare', description: 'Medical services and facilities'},
            {name: 'Wellness', description: 'Preventive care and lifestyle'},
            {name: 'Support', description: 'Community assistance programs'}
        ]
    };

    const DomainComponent = await domainGenerator.generate({
        type: 'domainContainer',
        props: domainSpec
    });

    // 2. Generate flow components
    const flowSpec = {
        source: 'Resources',
        target: 'Healthcare',
        constraints: {
            maxCapacity: 1000,
            targetEfficiency: 85,
            geometricRules: {
                pathOptimization: 'shortest',
                loadBalancing: true
            }
        }
    };

    const FlowComponent = await flowGenerator.generate({
        type: 'flowVisualization',
        props: flowSpec
    });

    // 3. Generate metrics components
    const metricsSpec = {
        metrics: [
            {
                id: 'access',
                name: 'Access Rate',
                value: 92.5,
                unit: '%',
                description: 'Population with healthcare access',
                trend: 3.2
            },
            {
                id: 'satisfaction',
                name: 'Satisfaction Score',
                value: 4.2,
                unit: '/5',
                description: 'Community satisfaction rating',
                trend: 0.5
            },
            {
                id: 'efficiency',
                name: 'Resource Efficiency',
                value: 87,
                unit: '%',
                description: 'Resource utilization rate',
                trend: -1.2
            }
        ]
    };

    const MetricsComponent = await metricsGenerator.generate({
        type: 'metricsDashboard',
        props: metricsSpec
    });

    return {
        DomainComponent,
        FlowComponent,
        MetricsComponent
    };
};

export const generatedComponents = await generateFullSystem();