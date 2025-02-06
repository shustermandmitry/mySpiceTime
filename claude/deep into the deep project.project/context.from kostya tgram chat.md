> Dmitry:
im deep into the deep
im building a deep instance with a middleware pipeline that works as a process, with environmental control coming from another deep instance controlled by another pipeline
so each pipeline is ract logic acting on state which is its deep instance
and all instances are global state
thats a base react component in spice time
Now we can plug in all kinda crazy stuff in there, per domain basis
like highest level abstractions, in one line of code

> Dmitry:
but why even have separate instances. they can be combined, by layering contexts, and composed, mixed and matched, so each local node runs a single deep instance, and connects to other remote nodes thru treeRPC

> Dmitry:
so all i need after that, to connect that crazy abstract insanity to some reality, is sets of some utils/resolvers that operate on a file system or telegram or gh repo
so its a gql interface, with deep enulating the whole domain of crazy stuff of incomprehencable complexity. Hook it up to ai service thru pipeline, and a data storage thru anther pipeline link and you got ai assisted domain of anything, and just compose these things with one liners

CRAAAZZZZYYY!!!!

> Dmitry:
deep is deeply satisfying
just look at that code
nicely uniform across entire codebase
im deeply in it
like a home inever had
and syntax is just fantastic
cant wait to see what TreeRPC got

> Dmitry:
best is, we can eperiment by trial and error, at almost no cost, on casual basis, wo causing any side effects, mocking stuff thru the pipilene
thats a perfect testing environment, with buil;d in ai assist, as just a pipeline link

> Dmitry:
these pipelines are completely interactive, effecting behaviour of incomprehencable complexity, but all testable to the last edge case, in locally understood contexts
with ai driven behaviour
tell me its not gonna get married, get some bright idea, and run off on a mormon mission. I wont beleive you

> Dmitry:
the trick is to structure that craziness, anchor it to some intuitive abstraction
im sure its our reality and all the limitations of it
I dont see yet how it maps, but it will, i guearantee you that

> Dmitry:
we got a powerful tool, a core util
we got a hammer thats looking for nails
nothing else changed, just got easier

> Kostya:
Now I’m in the train to my parents

> Dmitry:
and im streamlining my spacetime folder structure.
its nothing special or fundamental, but suoer useful
its just a representation of a graph in a limiting view of a fs viewer
and exact structure , its naming convention, is domain dependant
claude projects are different then packages in a dev repo
but the gist of it, those file names are virtual semantic filepaths
easy on the mind, and very descriptive and easily represented
the names get shortened as folder structure deppens
remaining file name is its virtual path
so symantics drives structure, and time is just sequential markers in appropriate points in the name. depends how you want organize time and space

> Kostya:
Let’s make a call tomorrow

> Dmitry:
get some tea from nice conductor, and read some of my scribbles

> Dmitry:
for sure

> Dmitry:
and, the language ised, like verbs and nouns and attributes, are processed by a an ast parser created by a util i got, an interpreter builder
we can design a human readable, executable lingo, that is composing folders of structure, a functional structure?
Hows that?

> Kostya:
And discuss all this. I’m not успеваю за всем следить

> Dmitry:
i dont blame you
im barely keeping up
thats a real bottleneck on pace
thats why im building all this

we should talk like at least once a week, for 30min
well get oresentations ready and share screens and do it super efficient

> Dmitry:
ill push the latest
a ton happened today

> Dmitry:
why dont you follow this one
thats current work spot
its absolutely mind boggling

https://claude.ai/project/90f91da4-2f0a-43a9-b20e-3feee5711c48

> Dmitry:
in gh, im just mirroring that to folder structure
but commits are not in real time

> Dmitry:
the reason we should work together on this particular project
its absolutely THE point of integration
thertes a lot of overlap between TreeRPC/Treenity and Deep
I dont understand the best way to leverage and how they would interact
i can see we need TreeRPC to sync Deep models across remote nodes
What else?

> Dmitry:
Do we need Deep, if we have TreeRPC
look at the functionality iv built into my design
Thats the core of STNode
The self optimizing entangled middleware pipelines

> Dmitry:
should TreeRPC sit on top of Deep and mirror its actions, and take over where appropriate?
what would that be , the appropriate part

> Dmitry:
i think it can provide functional links
Deep is very simple
its just edges and nodes and it reacts, like a mobx structure, kinda
just a nice syntax and a neat abstraction
Ity would be much easier to effect functional links
Actually, that would be THE pipeline, sitting right there in structure, declared by the nodepaths, in plain english, or whatever interpreter my DomainBuilder creates. Custom syntax of functional programming for each domain
I like it better then Deep
But what can deep do for us
its a nice syntax
It can provide a useful abstraction of pipelines. its more appropriate for some cases, but TreeRPC prbly can do that as well
It comes down to performance, i think
we would have to run all variants and monitore performance
This is THE most important aspect
These pipelines run at every event
it has to be dead efficient

> Dmitry:
aha
pipelines are components of composed functional timelines, actually whole processes with branching timelines
But so are structure templates in TreeRPC
and those scaffolding templates can be transformed into pipelines, the way im designing them in Deep
but thats kinda an unnecessary level of abstraction
Still, its much easier to have a one step pipeline that applyes to entire universe, or some domain defined by Deep instance, thewn create a template skeleton the size of universe, with one functional link connecting every child and parent. Thats nutz.
Theres a place for both abstractions
But the same code im writing for Deep, to implement pipes, can be adapted one to one to TreeRPC, right?

> Dmitry:
TELL ME WHERE IM WRONG, if i am
Even if we dont need Deep, the pipes are a useful thing to have, and the smart optimization applies to either, pipes or func structure
But it might be easier to do some optimization techniques with pies
eg insertion of extra tics into loop pathways, just a delay item in a pipe
how it translates to structure, is a good quastion, for we need to identify domain that is affected, represented by deep instance pipe is serving
Trees might be for eye candy visuals, and pipes and deep or TreeRPC domains are the run time model
I guess, your contexts will do nicely for creating those domains where each pipe is operating. But just strings for context is very limiting
I hope you changed that
Contexts can be objects and funcs and domains and Deep instances
But we gotta put an end to it somewhere

> Dmitry:
context is how you link domains
one domain becomes context for another

> Dmitry:
so, this is agenda for tomorrow meeting
ill get claude to prepair agenda doc

> Dmitry:
heres the plan
no matter TreeRPC or Deep, thats implementation detail,
but well use inhouse solution if it does the job

So,
Use functional tree templates to design procedural pipelines, as react components, driven by the state, which is another contextual layer or another instance of a tree
then, define the graph, domain, jsx string/DOM, or an app route
where the pipeline will apply, on every operation on the state, query or muta
thats redux on hormones, really
yeah, we can just extend redux, and document it in three lines in  readme file
everyone knows what redux does
we added procedural aspect to the pipeline and domains of operation agnostic of app borders, making it a distrubuted redux
and multiple pipes per app operating on different routers

> Dmitry:
whats the motivation?
we can overlay processes on domains, wo rewriting components, or some other crazy manipulations that are hard to reason between cases
you see, pipelines are composed like structure, and one pipeline can be composed of all wolkflows and processes and policies an org has, in one place, in Treenity builder window, by just moving folders around, to form coherent descriptions of actions

> Dmitry:
ill procede in this approach with Deep
Im not deep into Deep
we will convert the code wholesale when TreeRPC api is formulated
