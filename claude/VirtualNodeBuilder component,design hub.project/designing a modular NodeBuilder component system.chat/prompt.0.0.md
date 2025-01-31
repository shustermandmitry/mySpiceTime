- the VirtualNodeBuilder component represents a build stage of a node processs
- the build stage is divided into a few tics/substages
- each substage and each stage are components and form a tree hirarchy and are managed thru ProcessBuilder component
- below is what would be product of interactive ProcessBuilder in context of VirtualNodeBuilder process
- each component is a process, a volume of spacetime as its state, managed by react component that orchestrates the
  process
- and together, as a system of processes, managed by spicetime-react-app all tye components/processes form
  a spicetime of its global state, orchestrated by react app, custom for each node
- the spicetime-react-app is built out of virtual components, meaning they react to user context and adjust
  implementation of self
  eg by selecting uppropriate versions to match local resources
- not all processes run sequentially, in a func chain style.
  another mode is parallel execution
- and third way is collaborative mode, coordinating with other processes, running in parallel

## domain building stage

- this is where functionalities/domains of the new node are designed, using virtual components, to interactively build
  the jsx string of the spicetime-react-app
- as explained, each component exist in its process spicetime. Here we use an abstraction of the components, that spans
  all common stages
- but some side views on odd stages can be split in separate windows and designed separately
- therew a common stage, main design window, then specialty windows, for each special component that diverges from
  mainline timeline
- in a sense, we are designing node processes, but acknowledging, theres a nainline process, and a bunch mero,
  supporting it, and used in edge cases, and for all kinda reasons
- this is where ai should create the iniotial structure of process timelines, composing them into those three atomic
  types, seq, parallel and collaborative, and designing the state
  logic coordinating the processes, thru collaborative features
- then alowing interacction thru a STEditor component that provides a code editor with injected global state full of
  trees and spicetime context for each process and domain
- each a scope of some peculiar domain, in a peculiar structure, allowing syntax of explicit destruct statemnets, rather
  then bulky, and brittle imports

## ComponentSelection stage of VirtualNodeBuilder

- it is virtual cos it specifies a set of possible children components to use in actual node implementation
  the actual node is built in context of user such as hardware limitations, most nodes are cheap phones
- Its is a compoaund compomnent with children as available versions of other components such as dbs and services
  each child is another virtual build parent holding its own
- its a component that orchestrates selection stage of each virtual component being used by spicetime-react-app in that
  particular node
- it provides a unified view for user and coordinates any deps in the choices, and provides guidence thru an interactive
  process,
  but can run on automatic as default

## downloading stage

- this the lazy loading process described in supplied context
- it orchestrates load ballancing and resource management and matches most appropriate versions to the local hardware
- and it loads and cashes packages as needed, starting with ipfs gateway
- but initiLLY USERS servicess of a closeby permanent server, then clones itself in appropriate variant, composed of
  appropriate versions locally, in a lazy way
- thus gradually becoming independant and distributed, and minimizing service fees

## mmaintainance stage

- im not even sure its a separate stage
- i think it runs concurrently
-
    - yes, why not, processes can run in parallel

## Virtual prefix can be dropped out of component names

They are all virtual, adjusting to user context, as described