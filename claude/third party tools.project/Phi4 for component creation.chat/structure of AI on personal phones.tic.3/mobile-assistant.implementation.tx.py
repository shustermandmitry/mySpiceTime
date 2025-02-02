import json
import threading
import torch
from datetime import datetime
from typing import Dict, List


class MobilePersonalAssistant:
    def __init__(self):
        # Use tiny model (~100MB when quantized)
        self.model_config = {
            "size": "100M",  # Base parameters
            "quantization": "4bit",
            "context_window": 1024,
            "embedding_size": 256
        }
        
        self.memory_budget = {
            "model": 100,  # MB
            "context": 50,  # MB
            "training": 150  # MB during training
        }
        
        # Sliding context window for recent interactions
        self.context_buffer = []
        self.max_context_items = 100
        
        # Background learning control
        self.is_learning = False
        self.learning_thread = None
        self.battery_threshold = 0.3  # Only learn above 30% battery
        
    async def initialize(self):
        """Load quantized model and prepare for inference"""
        try:
            # Load tiny quantized model
            self.model = await self._load_tiny_model()
            
            # Initialize context database
            self.context_db = await self._init_context_db()
            
            return True
        except Exception as e:
            print(f"Initialization error: {e}")
            return False

    def start_background_learning(self):
        """Start background learning when device is idle"""
        if self.is_learning:
            return
            
        if not self._check_device_conditions():
            return
            
        self.is_learning = True
        self.learning_thread = threading.Thread(
            target=self._background_learning_loop
        )
        self.learning_thread.start()

    def stop_background_learning(self):
        """Stop background learning"""
        self.is_learning = False
        if self.learning_thread:
            self.learning_thread.join()

    def add_context(self, item: Dict):
        """Add new context item and potentially trigger learning"""
        # Add timestamp
        item['timestamp'] = datetime.now().isoformat()
        
        # Add to sliding window
        self.context_buffer.append(item)
        if len(self.context_buffer) > self.max_context_items:
            self.context_buffer.pop(0)
        
        # Save to persistent storage
        self._save_context(item)
        
        # Maybe start background learning
        if self._should_start_learning():
            self.start_background_learning()

    async def query(self, question: str) -> str:
        """Query the model with personal context"""
        relevant_context = self._get_relevant_context(question)
        
        prompt = self._create_prompt(question, relevant_context)
        
        return await self._generate_response(prompt)

    def _check_device_conditions(self) -> bool:
        """Check if device conditions allow for learning"""
        # Check battery level
        battery_level = self._get_battery_level()
        if battery_level < self.battery_threshold:
            return False
            
        # Check if device is idle
        if not self._is_device_idle():
            return False
            
        # Check available memory
        if not self._has_sufficient_memory():
            return False
            
        return True

    def _background_learning_loop(self):
        """Background learning process"""
        while self.is_learning:
            try:
                # Get batch of context items
                batch = self._prepare_learning_batch()
                
                # Perform one step of learning
                self._learn_from_batch(batch)
                
                # Sleep to prevent overload
                time.sleep(5)
                
                # Check conditions
                if not self._check_device_conditions():
                    self.stop_background_learning()
                    
            except Exception as e:
                print(f"Learning error: {e}")
                self.stop_background_learning()

    def _prepare_learning_batch(self) -> List[Dict]:
        """Prepare a batch of context items for learning"""
        return self.context_buffer[-10:]  # Last 10 items

    async def _learn_from_batch(self, batch: List[Dict]):
        """Perform one step of learning on a batch"""
        try:
            # Convert batch to training format
            training_data = self._format_for_training(batch)
            
            # Single training step
            loss = await self._training_step(training_data)
            
            # Save updated weights if improved
            if self._should_save_weights(loss):
                await self._save_weights()
                
        except Exception as e:
            print(f"Training error: {e}")

    def _format_for_training(self, batch: List[Dict]) -> Dict:
        """Format context batch for training"""
        return {
            "inputs": [item['input'] for item in batch],
            "outputs": [item['output'] for item in batch],
            "metadata": [item.get('metadata', {}) for item in batch]
        }

    async def _training_step(self, data: Dict) -> float:
        """Perform single training step"""
        # Minimize memory usage during training
        with torch.no_grad():
            outputs = self.model(data['inputs'])
            loss = self._compute_loss(outputs, data['outputs'])
            
        # Update with small batch
        loss.backward()
        self._update_weights()
        
        return loss.item()

    def _get_relevant_context(self, query: str) -> List[Dict]:
        """Get context relevant to query"""
        # Simple relevance scoring
        scored_context = []
        for item in self.context_buffer:
            score = self._compute_relevance(query, item)
            if score > 0.5:  # Relevance threshold
                scored_context.append((score, item))
                
        # Sort by relevance and return top items
        scored_context.sort(reverse=True)
        return [item for _, item in scored_context[:5]]

    def _compute_relevance(self, query: str, context_item: Dict) -> float:
        """Compute relevance score between query and context item"""
        # Simple keyword matching for efficiency
        query_words = set(query.lower().split())
        context_words = set(str(context_item).lower().split())
        
        overlap = len(query_words & context_words)
        return overlap / len(query_words)

    def _create_prompt(self, question: str, context: List[Dict]) -> str:
        """Create prompt.0.0.utils design with question and relevant context"""
        context_str = "\n".join(
            f"Context {i+1}: {json.dumps(ctx)}" 
            for i, ctx in enumerate(context)
        )
        
        return f"""
        Question: {question}
        
        Relevant Context:
        {context_str}
        
        Answer based on the above context:
        """

    def _get_battery_level(self) -> float:
        """Get device battery level"""
        # Implementation depends on platform
        return 1.0  # Placeholder

    def _is_device_idle(self) -> bool:
        """Check if device is idle"""
        # Implementation depends on platform
        return True  # Placeholder

    def _has_sufficient_memory(self) -> bool:
        """Check if enough memory is available"""
        # Implementation depends on platform
        return True  # Placeholder