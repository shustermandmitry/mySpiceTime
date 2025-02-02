> Dmitry Shusterman:
> heres my plan for version control, not for every dev out there, just for my spicetime-structure monorepo

whole repo is released on every package repease, as a new version
Versions have only major breaking changes, so onle first number in semver has meaning for versioning
The other two are for positioning in repo structure, indicating XY coordinates in two dimentional folder structure
and its semantic like the name implies. I have no idea what those numbers in semver have to do with semantics, they are
just numbers
Mine are actual titles, like component, util, and component name, or util name
but it is a number, resolved thru STRegistration component, a DNS type of service
So, component means its in component folder, in root/packages/spicetime-components
That positions it in X direction
name positions it in Y directions, along with siblings
Z direction is the major version number
So, now i can precizely know where the root of monorepo is, by just examining any semver
And thats a major win
Im fixing repo structure to a version number
And feel no shame or regret
Any package that will use anything in that monorepo as a dep. will declare one single dep, spicetime-architecture
And will get a fare tree shake, and just what he needs in his footprint, and complete lock on all the deps and 100% test
coverage and no version hell, ever

> Dmitry Shusterman:
> so, all my packages are internal
> Thats wgere that peculiar semver applies
> It has nothing to do with npm, just internal implementation detail
> If a package needs to live on his own, its a different project in a different repo, that declares STA as a dep, like
> everyone else
> However, STA itself will stick t same semver system, but theres no outer structure to be an address in.
> So, itll be the center of universe of one, the seed
> And its semver will put it smack in that spot, at the root of structure of STAs yet to come, v[vNumber],0.0 - the origin
> in each Z layer

> Dmitry Shusterman:
> so, z is the time dimention
> its a 2+1 dimentional space
> ANd the reason, cos i dont wanna mix time and space in y web dev repo
> it would compete with git version control directly, and i dont want weird tics in my package names and folder names
