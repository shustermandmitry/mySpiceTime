from dataclasses import dataclass
from typing import Dict, List
import math

@dataclass
class PlayerAction:
    description: str
    stakeholder_impacts: Dict[str, float]
    ethical_metrics: Dict[str, float]
    timestamp: float

@dataclass
class ScoreCard:
    total_score: float
    dimension_scores: Dict[str, float]
    improvement_areas: List[str]
    bonus_points: float
    difficulty_multiplier: float
    detailed_breakdown: Dict[str, Dict[str, float]]

class ScoringSystem:
    def __init__(self):
        self.dimension_weights = {
            "openness": 1.0,
            "respect": 1.0,
            "accountability": 1.0,
            "practice": 1.0,
            "validation": 1.0,
            "outcomes": 1.0
        }
        
        self.bonus_thresholds = {
            "consistent_improvement": 5,
            "stakeholder_satisfaction": 8,
            "creative_solution": 3,
            "community_impact": 5
        }

    def calculate_score(self, player_action: PlayerAction, scenario_context: Dict) -> ScoreCard:
        """Calculate comprehensive score for a player's action"""
        # Base scores for each dimension
        dimension_scores = self._calculate_dimension_scores(
            player_action.ethical_metrics,
            scenario_context
        )
        
        # Calculate difficulty multiplier
        difficulty_multiplier = self._calculate_difficulty_multiplier(
            scenario_context["difficulty"]
        )
        
        # Calculate bonus points
        bonus_points = self._calculate_bonus_points(
            player_action,
            scenario_context
        )
        
        # Calculate total score
        total_score = self._calculate_total_score(
            dimension_scores,
            difficulty_multiplier,
            bonus_points
        )
        
        # Generate improvement suggestions
        improvement_areas = self._identify_improvement_areas(dimension_scores)
        
        # Detailed breakdown for explanation
        detailed_breakdown = self._generate_score_breakdown(
            dimension_scores,
            player_action,
            scenario_context
        )
        
        return ScoreCard(
            total_score=total_score,
            dimension_scores=dimension_scores,
            improvement_areas=improvement_areas,
            bonus_points=bonus_points,
            difficulty_multiplier=difficulty_multiplier,
            detailed_breakdown=detailed_breakdown
        )

    def _calculate_dimension_scores(
        self,
        action_metrics: Dict[str, float],
        scenario_context: Dict
    ) -> Dict[str, float]:
        """Calculate scores for each ethical dimension"""
        scores = {}
        for dimension, weight in self.dimension_weights.items():
            target_value = scenario_context["ethical_dimensions"][dimension]
            achieved_value = action_metrics[dimension]
            scores[dimension] = self._calculate_dimension_score(
                achieved_value,
                target_value,
                weight
            )
        return scores

    def _calculate_dimension_score(
        self,
        achieved: float,
        target: float,
        weight: float
    ) -> float:
        """Calculate score for a single dimension"""
        base_score = (achieved / target) * 10
        weighted_score = base_score * weight
        return min(10, weighted_score)  # Cap at 10

    def _calculate_difficulty_multiplier(self, difficulty: int) -> float:
        """Calculate score multiplier based on difficulty"""
        return 1 + (difficulty - 1) * 0.25

    def _calculate_bonus_points(
        self,
        action: PlayerAction,
        context: Dict
    ) -> float:
        """Calculate bonus points for exceptional performance"""
        bonus = 0
        
        # Check for consistent improvement
        if self._check_improvement_streak(action, context):
            bonus += self.bonus_thresholds["consistent_improvement"]
            
        # Check stakeholder satisfaction
        if self._check_stakeholder_satisfaction(action):
            bonus += self.bonus_thresholds["stakeholder_satisfaction"]
            
        # Check for creative solutions
        if self._check_creative_solution(action, context):
            bonus += self.bonus_thresholds["creative_solution"]
            
        # Check community impact
        if self._check_community_impact(action):
            bonus += self.bonus_thresholds["community_impact"]
            
        return bonus

    def _calculate_total_score(
        self,
        dimension_scores: Dict[str, float],
        difficulty_multiplier: float,
        bonus_points: float
    ) -> float:
        """Calculate final total score"""
        base_score = sum(dimension_scores.values()) / len(dimension_scores)
        return (base_score * difficulty_multiplier) + bonus_points

    def _identify_improvement_areas(
        self,
        dimension_scores: Dict[str, float]
    ) -> List[str]:
        """Identify areas needing improvement"""
        improvements = []
        for dimension, score in dimension_scores.items():
            if score < 7:
                improvements.append(f"Improve {dimension}: {self._get_improvement_suggestion(dimension)}")
        return improvements

    def _get_improvement_suggestion(self, dimension: str) -> str:
        """Get specific improvement suggestion for a dimension"""
        suggestions = {
            "openness": "Consider being more transparent about your decision-making process",
            "respect": "Try to acknowledge and address all stakeholders' perspectives",
            "accountability": "Develop clearer ways to measure and track outcomes",
            "practice": "Focus on making solutions more practically implementable",
            "validation": "Create better ways for others to verify your approach",
            "outcomes": "Consider longer-term implications of your decisions"
        }
        return suggestions.get(dimension, "Focus on improving this area")

    def _generate_score_breakdown(
        self,
        dimension_scores: Dict[str, float],
        action: PlayerAction,
        context: Dict
    ) -> Dict[str, Dict[str, float]]:
        """Generate detailed score breakdown for explanation"""
        breakdown = {}
        for dimension, score in dimension_scores.items():
            breakdown[dimension] = {
                "base_score": score,
                "weight": self.dimension_weights[dimension],
                "target_value": context["ethical_dimensions"][dimension],
                "achieved_value": action.ethical_metrics[dimension],
                "contribution_to_total": score * self.dimension_weights[dimension]
            }
        return breakdown

    def explain_score(self, score_card: ScoreCard) -> str:
        """Generate human-readable explanation of the score"""
        explanation = [
            f"Total Score: {score_card.total_score:.2f}",
            "\nBreakdown by dimension:"
        ]
        
        for dimension, score in score_card.dimension_scores.items():
            explanation.append(f"- {dimension.capitalize()}: {score:.2f}/10")
            
        if score_card.bonus_points > 0:
            explanation.append(f"\nBonus Points: +{score_card.bonus_points}")
            
        if score_card.improvement_areas:
            explanation.append("\nAreas for improvement:")
            for area in score_card.improvement_areas:
                explanation.append(f"- {area}")
                
        return "\n".join(explanation)
