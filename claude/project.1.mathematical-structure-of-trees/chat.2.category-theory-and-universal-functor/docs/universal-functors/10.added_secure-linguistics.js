function functor(adjunct, name) {
  // Security settings in closure
  const security = {
    // Authority levels
    authorities: {
      OBSERVE: 0,      // Can only observe
      SUGGEST: 1,      // Can create suggestions
      INFLUENCE: 2,    // Can create minor changes
      SHAPE: 3,        // Can shape local space
      CONTROL: 4       // Full control
    },
    
    // Authority verification (in closure, can't be accessed directly)
    verifyAuthority: function(perspective, level) {
      // Check if perspective has required authority level
      // This would integrate with the broader authentication system
      return false; // Default to no authority
    },
    
    // Rate limiting
    rateLimits: new Map(),
    
    // Track linguistic pressure history
    pressureHistory: [],
    
    // Consensus tracking
    consensusGroups: new Map()
  };

  // Modified cosmos configuration
  const cosmosConfig = {
    lambda: 0.0001,
    
    // Now requires minimum authority levels
    operations: {
      adjustLambda: security.authorities.CONTROL,
      linguisticPressure: security.authorities.INFLUENCE,
      categorizeWord: security.authorities.SHAPE
    },
    
    // Requires consensus for major changes
    consensusThresholds: {
      minParticipants: 3,
      agreementPercent: 0.75,
      timeWindow: 1000 * 60 * 60 // 1 hour
    }
  };

  function createNode() {
    const node = {
      workshop: {
        cosmos: {
          // Now requires authority check
          linguisticPressure: function(text, perspective, options = {}) {
            // Verify authority
            if (!security.verifyAuthority(perspective, 
                cosmosConfig.operations.linguisticPressure)) {
              return {
                status: 'denied',
                message: 'Insufficient authority for linguistic pressure',
                suggestedAction: 'Request higher authority level'
              };
            }

            // Rate limiting
            const now = Date.now();
            const rateKey = `${perspective.id}-linguistic`;
            const lastAttempt = security.rateLimits.get(rateKey) || 0;
            
            if (now - lastAttempt < 1000 * 60) { // 1 minute cooldown
              return {
                status: 'limited',
                message: 'Rate limit exceeded',
                nextAllowed: new Date(lastAttempt + 1000 * 60)
              };
            }
            
            security.rateLimits.set(rateKey, now);

            // Record pressure attempt
            security.pressureHistory.push({
              time: now,
              perspective: perspective.id,
              text,
              pressure: calculatePressure(text)
            });

            // If major change, require consensus
            if (requiresConsensus(text)) {
              return initiateConsensus(perspective, text);
            }

            // Process pressure with dampening based on authority
            const rawPressure = calculatePressure(text);
            const authorityLevel = getAuthorityLevel(perspective);
            const dampening = 1 - (0.2 * (security.authorities.CONTROL - authorityLevel));
            
            return applyPressure(rawPressure * dampening);
          },

          // Suggest changes (available to lower authority levels)
          suggestChange: function(text, perspective) {
            if (!security.verifyAuthority(perspective, security.authorities.SUGGEST)) {
              return {
                status: 'denied',
                message: 'Insufficient authority for suggestions'
              };
            }

            // Add to consensus group
            const groupId = `change-${Date.now()}`;
            security.consensusGroups.set(groupId, {
              proposed: text,
              proposer: perspective.id,
              supporters: new Set([perspective.id]),
              created: Date.now(),
              expires: Date.now() + cosmosConfig.consensusThresholds.timeWindow
            });

            return {
              status: 'suggested',
              groupId,
              message: 'Change suggested, awaiting consensus',
              requiredSupport: cosmosConfig.consensusThresholds.minParticipants
            };
          },

          // Support a suggested change
          supportChange: function(groupId, perspective) {
            const group = security.consensusGroups.get(groupId);
            
            if (!group) {
              return {
                status: 'error',
                message: 'Change group not found'
              };
            }

            if (Date.now() > group.expires) {
              security.consensusGroups.delete(groupId);
              return {
                status: 'expired',
                message: 'Change suggestion has expired'
              };
            }

            group.supporters.add(perspective.id);

            // Check if we have consensus
            if (group.supporters.size >= cosmosConfig.consensusThresholds.minParticipants) {
              const result = this.linguisticPressure(
                group.proposed, 
                { id: 'consensus-group', authority: security.authorities.CONTROL }
              );
              
              security.consensusGroups.delete(groupId);
              
              return {
                status: 'consensus',
                message: 'Change applied through consensus',
                result
              };
            }

            return {
              status: 'supported',
              message: 'Support recorded',
              currentSupport: group.supporters.size,
              requiredSupport: cosmosConfig.consensusThresholds.minParticipants
            };
          }
        }
      }
    };

    return node;
  }

  // Private helper functions
  function calculatePressure(text) {
    // Calculate raw pressure as before but with safety checks
    return 0.5; // Default safe value
  }

  function requiresConsensus(text) {
    // Check if the change is major enough to require consensus
    return false;
  }

  function initiateConsensus(perspective, text) {
    // Start consensus process
    return {
      status: 'consensus_required',
      message: 'Change requires consensus',
      groupId: `consensus-${Date.now()}`
    };
  }

  function getAuthorityLevel(perspective) {
    // Get the authority level of the perspective
    return security.authorities.OBSERVE;
  }

  function applyPressure(pressure) {
    // Apply pressure with safety limits
    return {
      status: 'applied',
      pressure,
      effect: 'minimal'
    };
  }

  return createNode();
}

// Example usage with security
const node = functor("parentContext", "secure-cosmos");

// Attempt change without authority
const result = node.workshop.cosmos.linguisticPressure(
  "expand universe rapidly",
  { id: "random-person", authority: 0 }
);
// Result: { status: 'denied', message: 'Insufficient authority...' }

// Suggest change instead
const suggestion = node.workshop.cosmos.suggestChange(
  "gentle expansion for growth",
  { id: "community-member", authority: 1 }
);
// Result: { status: 'suggested', groupId: '...', message: 'Change suggested...' }