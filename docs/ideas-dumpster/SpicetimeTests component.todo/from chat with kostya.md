> Dmitry Shusterman:
> and im locking all versions, so i have to debug it just once

> Dmitry Shusterman:
> and thats the pattern thru entire spicetime. Im sticking to that version control iv described before.
> Ill use npm but itll be wrapped , thru gql schema
> and itll be domain based version system, and everything gonna be locked
> and immutable after published. Thats when package node goes visible, after virtual phase
> if you goofed, broadcast a message, and issue another version, done thru same process
> Same for updates. Create a variant, and broadcast message. Let dependants decide what to do about it. theyll prbly try
> to use it after testing, and might respond back with problems, then another cycle, totally mechanical, under ai control.
> no humans need to be involved, except to monitor, and control the process.

> Dmitry Shusterman: So, you publish an inhanced version, and watch it get debugged on real use cases in the field, not
> mocks. thats the missing part of testing process, really. So, there might be a prerelease version, to test in the field,
> after traditional tests with mocks are done. Just by replacing mock funcs with those processes i described.
> Maybe toy would run their integration tests, wo them being involved, or by contacting their ai agent
> So, its integration part of testing
> ITS SpicetimeTests component, im designing. Cool

> Dmitry Shusterman:
> so, theres no version hell in spicetime. Every possible existing integration is tested before a package is allowed to be
> visible

> Dmitry Shusterman:
> you might ask, how many years it would take to perform those integration tests.
> Two reasons why its almost instant
> All nodes run in parallel, but only when they have a spare moment, so instant might be a day, to follow the sleep cycle
> around the globe
> the service might be provided by a third party on dedicated server, to unload your busy network from constant testing by
> everybody in your deps, for a fee, to pay for pain free migrations, while locked into immutable versions.
> Thats a money maker, for it addresses a major sour spot.
> We can start providing such service, actually, not as efficient as spicetime would make it, but at a higher cost, using
> our dedicated ai model, using brute force approach, and converting client codebase to spicetime complience.
> So, a one time fee for conversion, then per use basis fee.
> Again, we selling AI services, anything else is free. Why bother

> Dmitry Shusterman:
> the second reason why its fast
> cos well make the distributed testing environment hierarchial
> domain based
> integration tests will be abstracted by GQL schemas, for each domain, etending parent schema
> so it does tree shking moving up the branches, super efficient
> Kind like an elephant size monkey, flying up a tree, to bring the fruits back to you

> Dmitry Shusterman:
> and our semver system will be domain based, kinda as i started designing little while back
> Not sure its exactly like i described then, but a triplet of names, for sure
> Yeah, the triplet is X Y and Z and the names are names of positions, resolved DNS style, from a real number, not an
> integer

> Dmitry Shusterman:
> so, yes, to answer your concern earlier.
> Theres plenty of room in 3d space to hold all the trials and errors and mishaps

> Dmitry Shusterman:
> thats a 3d URL

> Dmitry shusterman:
> conversion does not touch code base
> its conversion of deps to allience with spicetime
> it converts npm semver to st semver
> that takes locking all versions and placing packages into existing domain structure, or extending it
> and adding integration tests where missing, and adding a module on stTests connectivity, and stCollaboration
> connectivity, and hooking it up to universal stDocs site, after making sure docs are automated and up to standards
> so, we will convert the whole npm to spicetime, at their expense