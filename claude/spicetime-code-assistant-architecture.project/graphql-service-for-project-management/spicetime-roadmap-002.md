# Team Formation and Ethics Service Planning

## Extracted Features from PM Service
The following features will be moved to dedicated services:

### Team Formation Service
- Team member selection and scoring
- Role-based team assembly
- Team balance optimization
- Experience mix calculations
- Member standing tracking
- Priority standing calculations
- Team composition suggestions

### Ethics and Mentorship Service
- Ethics ratings management
- Mentorship requirements
- Mentorship session tracking
- Ethics thresholds for roles
- Ethics-based suggestions
- Mentorship status tracking

## Integration Points
The PM service will:
1. Maintain basic team and role information only
2. Reference member IDs without storing ethics/scoring data
3. Support role assignments without complex selection logic
4. Delegate team formation decisions to dedicated service
5. Handle basic role status tracking only

## Next Steps
1. Create dedicated Team Formation service
2. Create Ethics and Mentorship service
3. Define clean integration boundaries
4. Implement role assignment workflow
5. Design team suggestion API

## Future Considerations
- Ethics scoring algorithms
- Team balance metrics
- Mentorship matching logic
- Performance impact tracking
- Rating privacy management
- Role requirement definitions