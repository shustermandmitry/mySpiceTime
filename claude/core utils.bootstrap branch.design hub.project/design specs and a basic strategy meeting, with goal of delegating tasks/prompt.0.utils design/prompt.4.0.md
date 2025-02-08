lets get names straight

* st-error - name of folder of st-error-util package
* all errors are descendants of STError class

now, for package json of utils package
theres no main or any entrance point

```json
{
  "name": "@sta/utils",
  "version": "0.0.0",
  "private": "true",
  "info": {
    //defines exact versions of each internal package, 
    //so, no internal deps need to be declared
    //any file in any internal package can be imported wo specifieng version number in file path
    //and correct version will be accessed
    "staVirtualVersion": "0.0.0",
    "spaces": {
      "visualization layer": {
        "location": [
          0,
          0
        ]
      }
    },
    "domains": {
      "sta-cli": {
        "parent": "",
        //its root of sta-cli hierarchy
        "isRoot": "true"
        //redundant, but another way to express root of domain hierarchy
      },
      "utils": {
        "isRoot": "true"
      }
    }
  }
}
```

let me explain

* domains are package centric
  package is the smallest grain
* each package has info object in package.json
  its exact shape is dynamic, and evolves in additive manner, thru domain evolution thru versions
* each package can be part of multiple hierarchial domains
  1. not all of them alligned with folder structure
  2. hierarchy tree structure is defined by parent/child linkages
* we will develop domain-builder util later where i present the spec
* a package can belong to a number of dimentional spaces
  1. these are like custom DOMs,

  - in each space/DOM, a package is represented by a react component,
  - theres can be a react component representation in each domain it belongs to
  - in each domain it belongs to, assigned to its package type, which is name of its parent
  -

  2. they represent things like visualization layers, but are more abstract then that
  3. another use case is life stages of a process,

  - where there are objects in the space of each stage
  - process moves within that space from object to object, but does not have to stay in same stage
  - its not necessarily 2d stage planes and a 3d process space, but can be multidimentional
  - however, its better to keep it 3d with 2d stage slices -
    for visualization and reasoning purposes. our mind has a very good reason to limit dimentionality to 3
    that reason is sanity. lets keep it intact.

## heres an addendum

from my spamming comment to my ever suffering collaborator

im off to something absolutely mind boggling.
what an adventure.

im designing a structure to categorize packages into hierarchies and spaces

* and, natuarally, domains are hierarchies, like a component hierarchy
* and spaces are DOM like, where packages are composed into objects * * and styled in positions and given stylish
  haircuts

and, of course, we need react components, to represent these packages in all those spaces, cos naturally youd think they
can belong to more then one space
Then, any component is a process, with life stages and logic that drives the process between those stages
So, what can those stages be for a package component?
Well, first of all, a package component can have a variant in each domain
example: a utility package can be in cli domain, where it exposes a cli which is composed into bigger scope cli, all the
way to global cli of spicetime-architecture repo, sta.
and it can be converted to a sta component , so its a domain of sta components, with a ready to represent component
So, its two layers - util, rendering cli and sta, rendering sta jsx string
and each has its life stages and each is a process, like each has a build and dev stage, so it can mod itself, but not
necessarily same exact stages
SO, we getting in range, where you should sit down, and get ready for punch line

OK.

* how about we have just ONE space, like the one called reality
* But reality is quantum, as everyone knows

And heres why

* we need two numbers to indicate which phase the package component is in, for there are domains and stages in each
  domain
  THATS A COMPLEX NUMBER, a complex phase
* Are the bells starting to ring?
* that component is a quantum state, with a complex amplitude
* and each jsx object is a combo of components/states, each with a complex phase it rotates thru
* thats a wave function, of that object in unified space
* and it collapses to one of possible realities with deterministic outcome
  when measured
* and what do we measure?
  the measurable - jsx string in one of possible spaces - cli and sta dom space
* and in each, a component exist in some of its stages, according to the process going on in that variant of the
  component

So, it maps nicely to a manyworld anthology of qm, which is indication that its equivalent to any other qm anthology
We got qm completely formulated

I have no idea how useful it is, besides it guides my implementation of all those spaces and layers and visualizations
and ties the whole mess together like a glue.
Besides that, i dont care, but im sure itll come back and starts chomping at my anckles,
Cos, iv got qg optimization in the previous commit
And im sure, its too close for comfort
cos QG is not a comfortable thing, at all