# overview: the common practices of managing state in react components
i know redux and its pipelines and reducers
react natively uses reducer patterns for its hooks
there are reactive frameworks like mobx
im inclined on reactive tree approach, as least boilerplate and unifying in its simplicity
so the state tree would be constructed organicaly as part of jsx string structure
redux pattern is more static and gets broken down when compononts flicker in and out of existence
when mobx executable tree would take care of it organically
i do like the middleware pattern of redux, and its pipelines
but its just a pipeline on the messaging system
whats a message is another issue
we can interpret any access of a node in mobx state tree as an event, or message, or patch
and allow installation of middleware that is state tree aware
then, we are creating a nightmare of spagetti state management, with a fancy name of third party middleware, and giving up on any local control
as our sibling component can slap 20 middleware funcs and wack on our state in a completely non declarative way
so, it comes down to reduxy central event management
but we back at inflexible structure of
## so, i think domain based approach is a good solution
domain is a hves the same way with jsx tree structur hierarchy of compound paren components and their chidren with their own progeny and domain sub families
its very similar to DOM structure of container els
but here components/containers dont jump domain boundaries
not without changing their name and getting extended by new parent
but any component in a hierarchy can be instantiated multiple times, and dynamically into DOM by jsx string

## Node, base component
lets design Node component as the base of any compound component hierarchy
- it is rooted in domain centric approach
- its composed of util modules
- util modules are internal repo packages that live in packages/utils folder
- they are basically leftovers from process of bootstrapping repo itself - automating 
process of AI assisted design, and purposely designed with a duel personality. as cli packages, and 
providing a run time api surface
- theres no components inside it, not even children component
- its not a compound component - that comes later as an extension,
- its simply the last divisable element of composition
- Node composition is managed by process module in its bootstrap stage

## now we will cover modules composing Node
functionalities of all these modules
## so state tree grows organically
as jsx string evolves

## unified messaging system
messaging system is unified as the state,
and evolves with jsx string as well
each child component declares its eventsve of its child
it can send and receive events and messages from its parent and from its children
but parent can route it on behalve of its kids, subject to same restrictions
messages can be addressed in a variety of creative ways, and its up to middleware
to implement their own schemes

## pipelines
- they compose the same way as state and messaging system
  out of jsx string dynamically
- thats a bit of an eyebrow raiser - usually, redux installs middleware and builds pipelines at build time
  or the structure is static and does not provide a built in mechanics to react to dynamically evolving
  structure
- we do have that as well - each component has static pipeline, that accepts middleware at build time
  note that all components are procedural, and handle dev stages locally, as part of its own process
  the chaos is orchestrated by the parent Repo or WebDevProject or DevEnvironment
  does not matter, something upscope, that sends messages with requests to manipulate pipeline
- both at build stage and run stage - the build stage handler sits on the component func as a static member.
  the run time on





