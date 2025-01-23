# Node Positions and Space Transforms

## Child Domain: Collaborative Space

### Space Coordinates

- Peer Review (x)
- Mentorship (y)
- Leadership (z)

### Node Positions

Each project/feature/idea positioned by:

```
Node[collaborative] = (review_metric, mentor_impact, lead_effect)
```

## Bulk Domain: Ethical Space

### Space Coordinates

- Accountability (x)
- Openness (y)
- Respect (z)

### Node Positions

Same nodes positioned in ethical frame:

```
Node[ethical] = (accountability_metric, openness_score, respect_measure)
```

## Transforms

### Frame Transformation

```
Position[ethical] = S × Position[collaborative]
```

Where S is the transform tensor mapping collaborative metrics to ethical coordinates

### Properties

- Preserves relationships
- Maps metrics between spaces
- Enables optimization through frame changes
- Allows additive effects from other child spaces

Simple, measurable positions in each space with clear transforms between them.