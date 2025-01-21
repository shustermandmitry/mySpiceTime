from typing import Dict, List, Optional, Union
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from dataclasses import dataclass
import json
from enum import Enum

class ModelRole(Enum):
    MANAGER = "manager"    # Mistral - handles coordination
    GENERATOR = "generator"  # Phi - handles code generation

@dataclass
class ModelConfig:
    model_id: str
    quantization: str  # '4bit' or '8bit'
    max_memory: int    # MB
    compute_type: str  # 'float16' or 'float32'
    context_window: int

class DualModelSystem:
    def __init__(self):
        self.configs = {
            ModelRole.MANAGER: ModelConfig(
                model_id="mistralai/Mistral-7B-v0.1",
                quantization="4bit",
                max_memory=8000,  # 8GB
                compute_type="float16",
                context_window=8192
            ),
            ModelRole.GENERATOR: ModelConfig(
                model_id="microsoft/phi-2",  # Using phi-2 as example
                quantization="4bit",
                max_memory=4000,  # 4GB
                compute_type="float16",
                context_window=2048
            )
        }
        self.models: Dict[ModelRole, torch.nn.Module] = {}
        self.tokenizers: Dict[ModelRole, AutoTokenizer] = {}
        
    async def initialize(self):
        """Initialize both models with optimized settings"""
        try:
            # Initialize Mistral (Manager)
            self.models[ModelRole.MANAGER] = await self._load_model(
                self.configs[ModelRole.MANAGER]
            )
            
            # Initialize Phi (Generator)
            self.models[ModelRole.GENERATOR] = await self._load_model(
                self.configs[ModelRole.GENERATOR]
            )
            
            return True
        except Exception as e:
            print(f"Initialization error: {e}")
            return False

    async def _load_model(self, config: ModelConfig) -> torch.nn.Module:
        """Load and optimize a model"""
        # Quantization config
        quantization_config = {
            "load_in_4bit": config.quantization == "4bit",
            "load_in_8bit": config.quantization == "8bit",
            "bnb_4bit_compute_dtype": getattr(torch, config.compute_type)
        }

        # Load model with optimizations
        model = AutoModelForCausalLM.from_pretrained(
            config.model_id,
            device_map="auto",
            torch_dtype=getattr(torch, config.compute_type),
            **quantization_config
        )

        # Load tokenizer
        self.tokenizers[model] = AutoTokenizer.from_pretrained(config.model_id)

        # Optimize for M1
        if torch.backends.mps.is_available():
            model = model.to('mps')

        return model

    async def manager_task(self, task: str, context: Dict) -> Dict:
        """Use Mistral to analyze task and create execution plan"""
        prompt = self._create_manager_prompt(task, context)
        
        response = await self._generate(
            ModelRole.MANAGER,
            prompt,
            max_length=1000
        )
        
        return self._parse_manager_response(response)

    async def generate_code(self, spec: Dict) -> str:
        """Use Phi to generate code based on specification"""
        prompt = self._create_generator_prompt(spec)
        
        response = await self._generate(
            ModelRole.GENERATOR,
            prompt,
            max_length=2000
        )
        
        return self._clean_code_response(response)

    async def development_cycle(self, task: str, context: Dict) -> Dict:
        """Complete development cycle using both models"""
        # 1. Manager analyzes task and creates plan
        plan = await self.manager_task(task, context)
        
        results = {
            'code': [],
            'reviews': [],
            'fixes': []
        }
        
        # 2. Execute plan steps
        for step in plan['steps']:
            if step['type'] == 'generate':
                # Use Phi for generation
                code = await self.generate_code(step['spec'])
                results['code'].append(code)
                
                # Manager reviews the code
                review = await self.manager_task(
                    'review_code',
                    {'code': code, **context}
                )
                results['reviews'].append(review)
                
                # If issues found, generate fixes
                if review['issues']:
                    fixes = await self.generate_code({
                        'type': 'fix',
                        'issues': review['issues'],
                        'code': code
                    })
                    results['fixes'].append(fixes)
        
        return results

    def _create_manager_prompt(self, task: str, context: Dict) -> str:
        """Create prompt for Mistral"""
        return f"""Task: {task}

Context:
{json.dumps(context, indent=2)}

Analyze the task and provide:
1. Step-by-step development plan
2. Required specifications
3. Validation criteria
4. Potential issues to watch for

Output in JSON format:
{{
    "steps": [
        {{"type": "...", "spec": {{...}}}},
        ...
    ],
    "validation": [...],
    "concerns": [...]
}}"""

    def _create_generator_prompt(self, spec: Dict) -> str:
        """Create prompt for Phi"""
        return f"""Generate code according to the following specification:
{json.dumps(spec, indent=2)}

Requirements:
- Follow clean code principles
- Include error handling
- Add type hints
- Include docstrings

Generate the code:
"""

    async def _generate(
        self,
        role: ModelRole,
        prompt: str,
        max_length: int = 1000
    ) -> str:
        """Generate text from specified model"""
        model = self.models[role]
        tokenizer = self.tokenizers[role]
        
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_length=max_length,
                num_return_sequences=1,
                pad_token_id=tokenizer.eos_token_id
            )
            
        return tokenizer.decode(outputs[0], skip_special_tokens=True)

    def _optimize_memory(self):
        """Optimize memory usage"""
        if torch.backends.mps.is_available():
            torch.mps.empty_cache()
        
        for role, model in self.models.items():
            if not self._is_model_needed(role):
                model.cpu()  # Move to CPU if not immediately needed

    def _is_model_needed(self, role: ModelRole) -> bool:
        """Determine if model is needed in current context"""
        # Implementation depends on your usage patterns
        return True  # Placeholder

# Usage example:
async def main():
    system = DualModelSystem()
    await system.initialize()
    
    result = await system.development_cycle(
        task="Create a user authentication system",
        context={
            "framework": "FastAPI",
            "database": "PostgreSQL",
            "requirements": [
                "JWT authentication",
                "Password hashing",
                "Rate limiting"
            ]
        }
    )
    
    print(json.dumps(result, indent=2))