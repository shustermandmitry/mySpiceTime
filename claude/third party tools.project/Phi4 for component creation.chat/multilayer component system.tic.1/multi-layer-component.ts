// core/ComponentBase.ts
interface LayerDefinition {
    name: string;
    render: () => any;  // Could be JSX, events, messages, etc
    eventHandlers: Record<string, Function>;
    state: Record<string, any>;
}

class MultiLayerComponent {
    private layers: Map<string, LayerDefinition> = new Map();
    private sharedState: Record<string, any> = {};

    constructor(config: {
        layers: LayerDefinition[],
        initialState: Record<string, any>
    }) {
        this.sharedState = config.initialState;
        config.layers.forEach(layer => {
            this.layers.set(layer.name, layer);
        });
    }

    // Get render output for a specific layer
    public renderLayer(layerName: string) {
        const layer = this.layers.get(layerName);
        if (!layer) throw new Error(`Layer ${layerName} not found`);
        return layer.render();
    }

    // Each layer can update shared state
    protected updateState(newState: Partial<typeof this.sharedState>) {
        this.sharedState = {...this.sharedState, ...newState};
        this.notifyLayers();
    }

    private notifyLayers() {
        this.layers.forEach(layer => {
            // Each layer gets updated with new shared state
            layer.state = {...layer.state, ...this.sharedState};
        });
    }
}

// Example GHRepo Implementation
class GHRepoComponent extends MultiLayerComponent {
    constructor() {
        super({
            layers: [
                // Physical Git Layer
                {
                    name: 'git',
                    render: () => {
                        // Return git-specific events and messages
                        return {
                            commitStream: this.gitState.commits,
                            branchUpdates: this.gitState.branches,
                            pullRequests: this.gitState.prs
                        };
                    },
                    eventHandlers: {
                        onCommit: (commit) => this.handleCommit(commit),
                        onPush: (branch) => this.handlePush(branch),
                        onPR: (pr) => this.handlePR(pr)
                    },
                    state: {
                        branches: [],
                        commits: [],
                        prs: []
                    }
                },

                // Browser Visualization Layer
                {
                    name: 'browser',
                    render: () => {
                        // Return JSX for visual representation
                        return `
              <div class="repo-container">
                <div class="branch-view">
                  ${this.gitState.branches.map(branch =>
                            `<div class="branch">${branch.name}</div>`
                        ).join('')}
                </div>
                <div class="commit-history">
                  ${this.gitState.commits.map(commit =>
                            `<div class="commit">${commit.hash}: ${commit.message}</div>`
                        ).join('')}
                </div>
              </div>
            `;
                    },
                    eventHandlers: {
                        onClick: (e) => this.handleClick(e),
                        onHover: (e) => this.handleHover(e)
                    },
                    state: {
                        selectedBranch: null,
                        hoverState: null
                    }
                }
            ],
            initialState: {
                activeView: 'tree',
                selectedItems: [],
                userPreferences: {}
            }
        });
    }

    // Physical layer methods
    private handleCommit(commit) {
        const gitLayer = this.layers.get('git');
        gitLayer.state.commits.push(commit);
        this.updateState({lastActivity: 'commit'});
    }

    private handlePush(branch) {
        const gitLayer = this.layers.get('git');
        gitLayer.state.branches = gitLayer.state.branches.map(b =>
            b.name === branch.name ? branch : b
        );
        this.updateState({lastActivity: 'push'});
    }

    // Browser layer methods
    private handleClick(e) {
        const browserLayer = this.layers.get('browser');
        browserLayer.state.selectedBranch = e.target.branch;
        this.updateState({selectedItems: [e.target.branch]});
    }
}

// Usage
const repo = new GHRepoComponent();

// Get Git layer rendering (events/messages)
const gitLayer = repo.renderLayer('git');
// Handle git events
gitLayer.eventHandlers.onCommit({hash: '123', message: 'Update'});

// Get browser layer rendering (JSX/HTML)
const browserLayer = repo.renderLayer('browser');
// Handle DOM events
browserLayer.eventHandlers.onClick({target: {branch: 'main'}});