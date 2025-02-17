from dataclasses import dataclass
from typing import List, Dict, Optional
import asyncio

@dataclass
class Message:
    content: str
    type: str  # question, complaint, suggestion, action
    context: Dict
    timestamp: float

@dataclass
class Response:
    content: str
    explanation: Optional[str]
    follow_up_options: List[str]
    attached_data: Optional[Dict]

class SupervisingAgent:
    def __init__(
        self,
        scenario_generator: ScenarioGenerator,
        scoring_system: ScoringSystem
    ):
        self.scenario_generator = scenario_generator
        self.scoring_system = scoring_system
        self.conversation_history = []
        self.current_scenario = None
        self.player_context = None

    async def handle_message(self, message: Message) -> Response:
        """Handle incoming player message"""
        self.conversation_history.append(message)
        
        if message.type == "question":
            return await self._handle_question(message)
        elif message.type == "complaint":
            return await self._handle_complaint(message)
        elif message.type == "suggestion":
            return await self._handle_suggestion(message)
        elif message.type == "action":
            return await self._handle_action(message)
        
        return Response(
            content="I didn't understand that. Could you rephrase?",
            explanation=None,
            follow_up_options=["Ask a question", "Take an action", "Make a suggestion"],
            attached_data=None
        )

    async def _handle_question(self, message: Message) -> Response:
        """Handle player questions about scenarios or scoring"""
        question_type = self._classify_question(message.content)
        
        if question_type == "score_explanation":
            return await self._explain_score(message.context)
        elif question_type == "scenario_clarification":
            return await self._clarify_scenario(message.context)
        elif question_type == "improvement_advice":
            return await self._provide_improvement_advice(message.context)
        
        return Response(
            content="Could you be more specific about what you'd like to know?",
            explanation=None,
            follow_up_options=[
                "Why did I get this score?",
                "What are my options in this scenario?",
                "How can I improve?"
            ],
            attached_data=None
        )

    async def _handle_complaint(self, message: Message) -> Response:
        """Handle player complaints about scoring or scenarios"""
        complaint_type = self._classify_complaint(message.content)
        
        if complaint_type == "unfair_scoring":
            return await self._address_scoring_complaint(message.context)
        elif complaint_type == "unrealistic_scenario":
            return await self._address_scenario_complaint(message.context)
        
        return Response(
            content="I understand your concern. Let me explain my reasoning...",
            explanation=self._generate_detailed_explanation(message.context),
            follow_up_options=[
                "Request different scenario",
                "Appeal score",
                "Get improvement suggestions"
            ],
            attached_data=self._get_relevant_data(message.context)
        )

    async def _handle_suggestion(self, message: Message) -> Response:
        """Handle player suggestions for scenarios or system improvements"""
        suggestion_type = self._classify_suggestion(message.content)
        
        if suggestion_type == "new_scenario":