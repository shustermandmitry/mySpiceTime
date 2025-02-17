from dataclasses import dataclass
from typing import Dict, List, Optional
import math

@dataclass
class EthicalScore:
    base_score: float
    dimension_scores: Dict[str, float]
    community_impact: float
    trend: float  # Rate of improvement

@dataclass
class MarketPosition:
    capital: float
    resources: Dict[str, float]
    influence: float
    tax_rate: float
    benefits: Dict[str, float]

@dataclass
class CommunityState:
    average_ethics: float
    economic_health: float
    resource_distribution: Dict[str, float]
    social_cohesion: float

class EthicalEconomySimulator:
    def __init__(self):
        self.base_tax_rate = 0.2
        self.ethics_multiplier = 0.5
        self.community_bonus = 0.3
        
    def calculate_effective_tax_rate(self, ethical_score: EthicalScore) -> float:
        """Calculate tax rate based on ethical behavior"""
        # Base tax rate modified by ethical score
        ethics_adjustment = (1 - ethical_score.base_score) * self.ethics_multiplier
        
        # Community impact bonus
        community_bonus = ethical_score.community_impact * self.community_bonus
        
        # Trend bonus - reward improvement
        trend_bonus = max(0, ethical_score.trend * 0.1)
        
        effective_rate = self.base_tax_rate + ethics_adjustment - community_bonus - trend_bonus
        return max(0.05, min(0.5, effective_rate))  # Cap between 5% and 50%

    def simulate_market_dynamics(
        self,
        player: MarketPosition,
        ethical_score: EthicalScore,
        community: CommunityState
    ) -> MarketPosition:
        """Simulate market outcomes based on ethics and community state"""
        # Calculate economic benefits
        benefit_multiplier = self._calculate_benefit_multiplier(ethical_score, community)
        
        # Update capital
        new_capital = player.capital * (1 + benefit_multiplier)
        
        # Calculate resource access based on ethical standing
        resource_access = self._calculate_resource_access(
            ethical_score,
            community.resource_distribution
        )
        
        # Calculate social influence
        new_influence = self._calculate_influence(
            ethical_score,
            player.influence,
            community.social_cohesion
        )
        
        # Calculate new tax rate
        new_tax_rate = self.calculate_effective_tax_rate(ethical_score)
        
        # Calculate benefits (subsidies, opportunities, etc.)
        new_benefits = self._calculate_benefits(
            ethical_score,
            new_tax_rate,
            community
        )
        
        return MarketPosition(
            capital=new_capital,
            resources=resource_access,
            influence=new_influence,
            tax_rate=new_tax_rate,
            benefits=new_benefits
        )

    def _calculate_benefit_multiplier(
        self,
        ethics: EthicalScore,
        community: CommunityState
    ) -> float:
        """Calculate economic benefit multiplier based on ethics"""
        # Base multiplier from ethical score
        base_mult = ethics.base_score * 0.2  # Up to 20% return
        
        # Community alignment bonus
        alignment_bonus = max(0, (ethics.base_score - community.average_ethics) * 0.1)
        
        # Innovation bonus from high ethical standards
        innovation_bonus = 0
        if ethics.base_score > 0.8:  # Threshold for innovation bonus
            innovation_bonus = 0.05
        
        return base_mult + alignment_bonus + innovation_bonus

    def _calculate_resource_access(
        self,
        ethics: EthicalScore,
        community_resources: Dict[str, float]
    ) -> Dict[str, float]:
        """Calculate resource access based on ethical standing"""
        access_multiplier = (ethics.base_score + ethics.community_impact) / 2
        return {
            resource: amount * access_multiplier
            for resource, amount in community_resources.items()
        }

    def _calculate_influence(
        self,
        ethics: EthicalScore,
        current_influence: float,
        social_cohesion: float
    ) -> float:
        """Calculate social influence based on ethical behavior"""
        # Influence grows with ethical score but is tempered by social cohesion
        influence_growth = ethics.base_score * ethics.community_impact
        cohesion_factor = math.sqrt(social_cohesion)
        
        new_influence = current_influence * (1 + influence_growth * cohesion_factor)
        return min(1.0, new_influence)  # Cap at 1.0

    def _calculate_benefits(
        self,
        ethics: EthicalScore,
        tax_rate: float,
        community: CommunityState
    ) -> Dict[str, float]:
        """Calculate various benefits and opportunities"""
        return {
            "tax_refund": max(0, self.base_tax_rate - tax_rate) * 100,
            "resource_bonus": ethics.base_score * community.economic_health * 100,
            "influence_multiplier": (1 + ethics.community_impact) * 100,
            "innovation_access": (ethics.base_score > 0.8) * 100
        }

class LocalGovernanceSimulator:
    def __init__(self, economy: EthicalEconomySimulator):
        self.economy = economy
        self.policy_weights = {
            "tax_rate": 0.3,
            "resource_distribution": 0.3,
            "social_programs": 0.2,
            "innovation_incentives": 0.2
        }

    def simulate_governance_cycle(
        self,
        community: CommunityState,
        proposals: List[Dict],
        voter_ethics: Dict[str, EthicalScore]
    ) -> CommunityState:
        """Simulate local governance decision-making"""
        # Weight votes by ethical scores
        weighted_votes = self._calculate_weighted_votes(voter_ethics, proposals)
        
        # Select winning proposals
        winning_policies = self._select_winning_policies(weighted_votes)
        
        # Apply policies to community state
        new_community = self._apply_policies(community, winning_policies)
        
        return new_community

    def _calculate_weighted_votes(
        self,
        voter_ethics: Dict[str, EthicalScore],
        proposals: List[Dict]
    ) -> Dict[str, float]:
        """Calculate weighted votes based on ethical scores"""
        weighted_votes = {}
        for proposal_id, proposal in enumerate(proposals):
            vote_weight = sum(
                score.base_score * score.community_impact
                for score in voter_ethics.values()
            )
            weighted_votes[str(proposal_id)] = vote_weight * proposal.get("support", 0)
        return weighted_votes

    def _select_winning_policies(
        self,
        weighted_votes: Dict[str, float]
    ) -> List[Dict]:
        """Select winning policy proposals"""
        # Sort by weighted votes and return top policies
        sorted_proposals = sorted(
            weighted_votes.items(),
            key=lambda x: x[1],
            reverse=True
        )
        return [{"id": p[0], "weight": p[1]} for p in sorted_proposals[:3]]

    def _apply_policies(
        self,
        community: CommunityState,
        policies: List[Dict]
    ) -> CommunityState:
        """Apply winning policies to community state"""
        new_economic_health = community.economic_health
        new_resource_distribution = community.resource_distribution.copy()
        new_social_cohesion = community.social_cohesion
        
        for policy in policies:
            # Apply policy effects
            policy_weight = policy["weight"]
            
            # Update economic health
            new_economic_health *= (1 + 0.1 * policy_weight)
            
            # Update resource distribution
            for resource in new_resource_distribution:
                new_resource_distribution[resource] *= (1 + 0.05 * policy_weight)
            
            # Update social cohesion
            new_social_cohesion *= (1 + 0.15 * policy_weight)
        
        return CommunityState(
            average_ethics=community.average_ethics,
            economic_health=min(1.0, new_economic_health),
            resource_distribution=new_resource_distribution,
            social_cohesion=min(1.0, new_social_cohesion)
        )