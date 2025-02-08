## we are bootstrapping a monorepo spicetime-architecture

- its the core architecture of a distributed net
- each node will run its own version of spicetime-react-app, running its own jsx
  string
- each node is most likely a phone, running a saas headless server, as well as its own client app
- each node has its own perspective of common spacetime, not necessarily entirely accurate, but overlapping
  and synched with other perspectives
- all spicetime-react-apps share common state, which is spacetime structure, but each node
  has its own perspective of that state
- the important parts of the state are kept in sync at priority level
- others might be on backburner, or deliberately kept private
- theres a system of permitions that define visibility of each node in different symantic domains
  not unlike objects in physical spacetime having brightness and transparency and shading each other
  and flashing beacons, and subscribing to newsletters and advertising its wares and intentions

## The focus of this bootstrap

- is to build a generative and context aware ai coding assistant,
- that has a scope
  in spacial and temporal dimentions, to cover entire project
- we will stage design in stepwise approach, starting with simplest utils, as
  will be described later, and progressing to a react app that will run that ai
  assistant, first locally, then across distributed team of web devs and collaborators

## we will start with core utils

as outlined in util core structure doc , with design specs following it

- we will be aware of a bigger scope of composing thesee utils into more sophisticated
  util scripts
- later we will be building react components wrapping these utils and following their structure
  and functionality

## i will introduce my design notes for each util

- we are not implementing these utils in this project, but just coordinating child projects
  as will be descfribed
- when appropriate and prompted by me, you will produce scripts that are production
  ready, properly annotated with typedoc comments
  Each will have a short module uptop but each will have a separate .ts
  file with a module of complete description as design doc
  wwhen implementing we will generate design module first, then tests then implementation script and we will pass the
  tests before moving forward

This will be an iterative process over all of the utils