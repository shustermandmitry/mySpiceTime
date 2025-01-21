from typing import Dict, List, Optional
import torch
from dataclasses import dataclass
from enum import Enum
import numpy as np
from datetime import datetime

@dataclass
class MemoryConfig:
    model_size: int = 600  # MB, larger base model
    context_window: int = 16384  # 16k context window
    embedding_size: int = 768
    max_permanent_memories: int = 100000  # Long-term storage
    active_memory_size: int = 8192  # Currently active memories
    
    # Memory allocations (in MB)
    working_memory: int = 400    # Fast, active memory
    episodic_memory: int = 300   # Recent experiences
    semantic_memory: int = 400   # Facts and knowledge
    procedural_memory: int = 100 # Skills and procedures

class MemoryType(Enum):
    WORKING = "working"
    EPISODIC = "episodic"
    SEMANTIC = "semantic"
    PROCEDURAL = "procedural"

@dataclass
class Memory:
    content: str
    type: MemoryType
    timestamp: datetime
    associations: List[str]
    importance: float
    embedding: np.ndarray
    retrieval_count: int = 0

class ExpandedBrain:
    def __init__(self):
        self.config = MemoryConfig()
        self.memories: Dict[MemoryType, List[Memory]] = {
            type: [] for type in MemoryType
        }
        self.memory_index = None  # For fast retrieval
        self.active_thoughts = []
        
    async def initialize(self):
        """Initialize the expanded brain system"""
        # Load quantized but larger model
        self.model = await self._load_expanded_model()
        
        # Initialize memory indices
        self.memory_index = self._init_memory_index()
        
        # Load existing memories from storage
        await self._load_persistent_memories()
        
        # Start background processes
        self._start_memory_consolidation()
        self._start_pattern_recognition()

    async def process_input(self, input_data: Dict) -> Dict:
        """Process new input with expanded context"""
        # Extract relevant memories
        relevant_memories = self._retrieve_relevant_memories(input_data)
        
        # Combine with working memory
        context = self._combine_memories(relevant_memories)
        
        # Process with full context
        result = await self._process_with_context(input_data, context)
        
        # Store new memory
        self._store_memory(input_data, result)
        
        return result

    def _retrieve_relevant_memories(self, input_data: Dict) -> List[Memory]:
        """Retrieve relevant memories across all memory types"""
        query_embedding = self._compute_embedding(input_data)
        
        relevant_memories = []
        for memory_type in MemoryType:
            # Get memories of this type
            memories = self.memories[memory_type]
            
            # Compute relevance scores
            scores = [
                (self._compute_relevance(query_embedding, m.embedding), m)
                for m in memories
            ]
            
            # Sort by relevance and importance
            scored_memories = [
                (score * m.importance, m)
                for score, m in scores
            ]
            scored_memories.sort(reverse=True)
            
            # Take top memories based on type
            if memory_type == MemoryType.WORKING:
                top_k = 50  # More working memories
            elif memory_type == MemoryType.EPISODIC:
                top_k = 30  # Recent relevant experiences
            else:
                top_k = 20  # Others
                
            relevant_memories.extend([m for _, m in scored_memories[:top_k]])
        
        return relevant_memories

    def _store_memory(self, input_data: Dict, result: Dict):
        """Store new memory with enhanced metadata"""
        embedding = self._compute_embedding(input_data)
        
        # Determine memory type
        memory_type = self._determine_memory_type(input_data)
        
        # Create new memory
        memory = Memory(
            content=json.dumps({
                'input': input_data,
                'result': result
            }),
            type=memory_type,
            timestamp=datetime.now(),
            associations=self._find_associations(embedding),
            importance=self._compute_importance(input_data, result),
            embedding=embedding
        )
        
        # Store in appropriate memory store
        self.memories[memory_type].append(memory)
        
        # Update indices
        self._update_memory_index(memory)
        
        # Trigger consolidation if needed
        if len(self.memories[memory_type]) > self.config.active_memory_size:
            self._consolidate_memories(memory_type)

    def _consolidate_memories(self, memory_type: MemoryType):
        """Consolidate memories, moving less important ones to long-term storage"""
        memories = self.memories[memory_type]
        
        # Score memories based on:
        # - Recency
        # - Importance
        # - Retrieval frequency
        # - Association strength
        scores = [
            (
                self._compute_memory_score(m),
                m
            )
            for m in memories
        ]
        
        # Sort by score
        scores.sort(reverse=True)
        
        # Keep top memories active
        active_size = self.config.active_memory_size
        active_memories = [m for _, m in scores[:active_size]]
        archived_memories = [m for _, m in scores[active_size:]]
        
        # Update active memories
        self.memories[memory_type] = active_memories
        
        # Archive others to persistent storage
        self._archive_memories(archived_memories)

    def _compute_memory_score(self, memory: Memory) -> float:
        """Compute comprehensive memory score"""
        now = datetime.now()
        
        # Recency score (exponential decay)
        time_diff = (now - memory.timestamp).total_seconds()
        recency_score = np.exp(-time_diff / (7 * 24 * 3600))  # 7 day half-life
        
        # Retrieval score
        retrieval_score = np.log1p(memory.retrieval_count)
        
        # Association score
        association_score = len(memory.associations) / 10  # Normalize
        
        # Combine scores
        return (
            0.4 * memory.importance +
            0.3 * recency_score +
            0.2 * retrieval_score +
            0.1 * association_score
        )

    def _find_associations(self, embedding: np.ndarray) -> List[str]:
        """Find associated concepts/memories"""
        associations = []
        
        # Search across all memory types
        for memory_type in MemoryType:
            memories = self.memories[memory_type]
            
            # Find similar memories
            for memory in memories:
                similarity = self._compute_similarity(embedding, memory.embedding)
                if similarity > 0.8:  # High similarity threshold
                    # Extract key concepts
                    concepts = self._extract_concepts(memory.content)
                    associations.extend(concepts)
        
        return list(set(associations))  # Remove duplicates

    def _extract_concepts(self, content: str) -> List[str]:
        """Extract key concepts from content"""
        # Implementation would use NLP techniques
        return []  # Placeholder

    async def _process_with_context(
        self,
        input_data: Dict,
        context: List[Memory]
    ) -> Dict:
        """Process input with full context window"""
        # Format prompt with full context
        prompt = self._create_prompt(input_data, context)
        
        # Generate response using model
        response = await self._generate_response(prompt)
        
        return response

    def _create_prompt(self, input_data: Dict, context: List[Memory]) -> str:
        """Create prompt with rich context"""
        # Format context by type
        context_by_type = {
            type: [m for m in context if m.type == type]
            for type in MemoryType
        }
        
        prompt_parts = []
        
        # Add working memory context
        prompt_parts.append("Current Context:")
        for memory in context_by_type[MemoryType.WORKING][:5]:
            prompt_parts.append(f"- {memory.content}")
            
        # Add relevant episodic memories
        prompt_parts.append("\nRelevant Experiences:")
        for memory in context_by_type[MemoryType.EPISODIC][:3]:
            prompt_parts.append(f"- {memory.content}")
            
        # Add semantic knowledge
        prompt_parts.append("\nRelevant Knowledge:")
        for memory in context_by_type[MemoryType.SEMANTIC][:3]:
            prompt_parts.append(f"- {memory.content}")
            
        # Add input
        prompt_parts.append(f"\nCurrent Input: {json.dumps(input_data)}")
        
        return "\n".join(prompt_parts)