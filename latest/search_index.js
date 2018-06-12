var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Pkg",
    "title": "Pkg",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Pkg-1",
    "page": "Pkg",
    "title": "Pkg",
    "category": "section",
    "text": "warning: Warning\nThis documentation is a work in progress and the information in it might be or become outdated."
},

{
    "location": "index.html#Introduction-1",
    "page": "Pkg",
    "title": "Introduction",
    "category": "section",
    "text": "Pkg is the standard package manager for Julia 1.0 and newer. Unlike traditional package managers, which install and manage a single global set of packages, Pkg is designed around “environments”: independent sets of packages that can be local to an individual project or shared and selected by name. The exact set of packages and versions in an environment is captured in a manifest file which can be checked into a project repository and tracked in version control, significantly improving reproducibility of projects. If you’ve ever tried to run code you haven’t used in a while only to find that you can’t get anything to work because you’ve updated or uninstalled some of the packages your project was using, you’ll understand the motivation for this approach. In Pkg, since each project maintains its own independent set of package versions, you’ll never have this problem again. Moreover, if you check out a project on a new system, you can simply materialize the environment described by its manifest file and immediately be up and running with a known-good set of dependencies.Since environments are managed and updated independently from each other, “dependency hell” is significantly alleviated in Pkg. If you want to use the latest and greatest version of some package in a new project but you’re stuck on an older version in a different project, that’s no problem – since they have separate environments they can just use different versions, which are both installed at the same time in different locations on your system. The location of each package version is canonical, so when environments use the same versions of packages, they can share installations, avoiding unnecessary duplication of the package. Old package versions that are no longer used by any environments are periodically “garbage collected” by the package manager.Pkg’s approach to local environments may be familiar to people who have used Python’s virtualenv or Ruby’s bundler. In Julia, instead of hacking the language’s code loading mechanisms to support environments, we have the benefit that Julia natively understands them. In addition, Julia environments are “stackable”: you can overlay one environment with another and thereby have access to additional packages outside of the primary environment. This makes it easy to work on a project, which provides the primary environment, while still having access to all your usual dev tools like profilers, debuggers, and so on, just by having an environment including these dev tools later in the load path.Last but not least, Pkg is designed to support federated package registries. This means that it allows multiple registries managed by different parties to interact seamlessly. In particular, this includes private registries which can live behind corporate firewalls. You can install and update your own packages from a private registry with exactly the same tools and workflows that you use to install and manage official Julia packages. If you urgently need to apply a hotfix for a public package that’s critical to your company’s product, you can tag a private version of it in your company’s internal registry and get a fix to your developers and ops teams quickly and easily without having to wait for an upstream patch to be accepted and published. Once an official fix is published, however, you can just upgrade your dependencies and you\'ll be back on an official release again."
},

{
    "location": "index.html#Glossary-1",
    "page": "Pkg",
    "title": "Glossary",
    "category": "section",
    "text": "Project: a source tree with a standard layout, including a src directory for the main body of Julia code, a test directory for testing the project, docs for documentation files, and optionally a build directory for a build script and its outputs. A project will typically also have a project file and may optionally have a manifest file:Project file: a file in the root directory of a project, named Project.toml (or JuliaProject.toml) describing metadata about the project, including its name, UUID (for packages), authors, license, and the names and UUIDs of packages and libraries that it depends on.\nManifest file: a file in the root directory of a project, named Manifest.toml (or JuliaManifest.toml) describing a complete dependency graph and exact versions of each package and library used by a project.Package: a project which provides reusable functionality that can be used by other Julia projects via import X or using X. A package should have a project file with a uuid entry giving its package UUID. This UUID is used to identify the package in projects that depend on it.note: Note\nFor legacy reasons it is possible to load a package without a project file or UUID from the REPL or the top-level of a script. It is not possible, however, to load a package without a project file or UUID from a project with them. Once you\'ve loaded from a project file, everything needs a project file and UUID.Application: a project which provides standalone functionality not intended to be reused by other Julia projects. For example a web application or a commmand-line utility. An application may have a UUID but does not need one. An application may also provide global configuration options for packages it depends on. Packages, on the other hand, may not provide global configuration since that could conflict with the configuration of the main application.note: Note\nProjects vs. Packages vs. Applications:Project is an umbrella term: packages and applications are kinds of projects.\nPackages should have UUIDs, applications can have a UUIDs but don\'t need them.\nApplications can provide global configuration, whereas packages cannot.Library (future work): a compiled binary dependency (not written in Julia) packaged to be used by a Julia project. These are currently typically built in- place by a deps/build.jl script in a project’s source tree, but in the future we plan to make libraries first-class entities directly installed and upgraded by the package manager.Environment: the combination of the top-level name map provided by a project file combined with the dependency graph and map from packages to their entry points provided by a manifest file. For more detail see the manual section on code loading.Explicit environment: an environment in the form of an explicit project file and an optional corresponding manifest file together in a directory. If the manifest file is absent then the implied dependency graph and location maps are empty.\nImplicit environment: an environment provided as a directory (without a project file or manifest file) containing packages with entry points of the form X.jl, X.jl/src/X.jl or X/src/X.jl. The top-level name map is implied by these entry points. The dependency graph is implied by the existence of project files inside of these package directories, e.g. X.jl/Project.toml or X/Project.toml. The dependencies of the X package are the dependencies in the corresponding project file if there is one. The location map is implied by the entry points themselves.Registry: a source tree with a standard layout recording metadata about a registered set of packages, the tagged versions of them which are available, and which versions of packages are compatible or incompatible with each other. A registry is indexed by package name and UUID, and has a directory for each registered package providing the following metadata about it:name – e.g. DataFrames\nUUID – e.g. a93c6f00-e57d-5684-b7b6-d8193f3e46c0\nauthors – e.g. Jane Q. Developer <jane@example.com>\nlicense – e.g. MIT, BSD3, or GPLv2\nrepository – e.g. https://github.com/JuliaData/DataFrames.jl.git\ndescription – a block of text summarizing the functionality of a package\nkeywords – e.g. data, tabular, analysis, statistics\nversions – a list of all registered version tagsFor each registered version of a package, the following information is provided:its semantic version number – e.g. v1.2.3\nits git tree SHA-1 hash – e.g. 7ffb18ea3245ef98e368b02b81e8a86543a11103\na map from names to UUIDs of dependencies\nwhich versions of other packages it is compatible/incompatible withDependencies and compatibility are stored in a compressed but human-readable format using ranges of package versions.Depot: a directory on a system where various package-related resources live, including:environments: shared named environments (e.g. v0.7, devtools)\nclones: bare clones of package repositories\ncompiled: cached compiled package images (.ji files)\nconfig: global configuration files (e.g. startup.jl)\ndev: default directory for package development\nlogs: log files (e.g. manifest_usage.toml, repl_history.jl)\npackages: installed package versions\nregistries: clones of registries (e.g. Uncurated)Load path: a stack of environments where package identities, their dependencies, and entry-points are searched for. The load path is controlled in Julia by the LOAD_PATH global variable which is populated at startup based on the value of the JULIA_LOAD_PATH environment variable. The first entry is your primary environment, often the current project, while later entries provide additional packages one may want to use from the REPL or top-level scripts.Depot path: a stack of depot locations where the package manager, as well as Julia\'s code loading mechanisms, look for registries, installed packages, named environments, repo clones, cached compiled package images, and configuration files. The depot path is controlled by the Julia DEPOT_PATH global variable which is populated at startup based on the value of the JULIA_DEPOT_PATH environment variable. The first entry is the “user depot” and should be writable by and owned by the current user. The user depot is where: registries are cloned, new package versions are installed, named environments are created and updated, package repos are cloned, new compiled package image files are saved, log files are written, development packages are checked out by default, and global configuration data is saved. Later entries in the depot path are treated as read-only and are appropriate for registries, packages, etc. installed and managed by system administrators."
},

{
    "location": "index.html#Getting-Started-1",
    "page": "Pkg",
    "title": "Getting Started",
    "category": "section",
    "text": "The Pkg REPL-mode is entered from the Julia REPL using the key ].(v0.7) pkg>The part inside the parenthesis of the prompt shows the name of the current project. Since we haven\'t created our own project yet, we are in the default project, located at ~/.julia/environments/v0.7 (or whatever version of Julia you happen to run).To return to the julia> prompt, either press backspace when the input line is empty or press Ctrl+C. Help is available by calling pkg> help.To generate files for a new project, use pkg> generate.(v0.7) pkg> generate HelloWorldThis creates a new project HelloWorld with the following files (visualized with the external tree command):julia> cd(\"HelloWorld\")\nshell> tree .\n.\n├── Project.toml\n└── src\n    └── HelloWorld.jl\n\n1 directory, 2 filesThe Project.toml file contains the name of the package, its unique UUID, its version, the author and eventual dependencies:name = \"HelloWorld\"\nuuid = \"b4cd1eb8-1e24-11e8-3319-93036a3eb9f3\"\nversion = \"0.1.0\"\nauthor = [\"Some One <someone@email.com>\"]\n\n[deps]The content of src/HelloWorld.jl is:module HelloWorld\n\ngreet() = print(\"Hello World!\")\n\nend # moduleWe can now load the project and use it:julia> import HelloWorld\n\njulia> HelloWorld.greet()\nHello World!"
},

{
    "location": "index.html#Adding-packages-to-the-project-1",
    "page": "Pkg",
    "title": "Adding packages to the project",
    "category": "section",
    "text": "Let’s say we want to use the standard library package Random and the registered package JSON in our project. We simply add these packages (note how the prompt now shows the name of the newly generated project, since we are inside the HelloWorld project directory):(HelloWorld) pkg> add Random JSON\n Resolving package versions...\n  Updating \"~/Documents/HelloWorld/Project.toml\"\n [682c06a0] + JSON v0.17.1\n [9a3f8284] + Random\n  Updating \"~/Documents/HelloWorld/Manifest.toml\"\n [34da2185] + Compat v0.57.0\n [682c06a0] + JSON v0.17.1\n [4d1e1d77] + Nullables v0.0.4\n ...Both Random and JSON got added to the project’s Project.toml file, and the resulting dependencies got added to the Manifest.toml file. The resolver has installed each package with the highest possible version, while still respecting the compatibility that each package enforce on its dependencies.We can now use both Random and JSON in our project. Changing src/HelloWorld.jl tomodule HelloWorld\n\nimport Random\nimport JSON\n\ngreet() = print(\"Hello World!\")\ngreet_alien() = print(\"Hello \", Random.randstring(8))\n\nend # moduleand reloading the package, the new greet_alien function that uses Random can be used:julia> HelloWorld.greet_alien()\nHello aT157rHVSometimes we might want to use the very latest, unreleased version of a package, or perhaps a specific branch in the package git repository. We can use e.g. the master branch of JSON by specifying the branch after a # when adding the package:(HelloWorld) pkg> add JSON#master\n   Cloning package from https://github.com/JuliaIO/JSON.jl.git\n Resolving package versions...\n  Updating \"~/Documents/HelloWorld/Project.toml\"\n [682c06a0] ~ JSON v0.17.1 ⇒ v0.17.1+ #master\n  Updating \"~/Documents/HelloWorld/Manifest.toml\"\n [682c06a0] ~ JSON v0.17.1 ⇒ v0.17.1+ #masterIf we want to use a package that has not been registered in a registry, we can add its git repository url:(HelloWorld) pkg> add https://github.com/fredrikekre/ImportMacros.jl\n  Cloning package from https://github.com/fredrikekre/ImportMacros.jl\n Resolving package versions...\nDownloaded MacroTools ─ v0.4.0\n  Updating \"~/Documents/HelloWorld/Project.toml\"\n [5adcef86] + ImportMacros v0.1.0 #master\n   Updating \"~/Documents/HelloWorld/Manifest.toml\"\n [5adcef86] + ImportMacros v0.1.0 #master\n [1914dd2f] + MacroTools v0.4.0The dependencies of the unregistered package (here MacroTools) got installed. For unregistered packages we could have given a branch (or commit SHA) to track using #, just like for registered packages."
},

{
    "location": "index.html#Developing-packages-1",
    "page": "Pkg",
    "title": "Developing packages",
    "category": "section",
    "text": "Let’s say we found a bug in one of our dependencies, e.g. JSON that we want to fix. We can get the full git-repo using the develop command(HelloWorld) pkg> develop JSON\n    Cloning package from https://github.com/JuliaIO/JSON.jl.git\n  Resolving package versions...\n   Updating \"~/Documents/HelloWorld/Project.toml\"\n [682c06a0] + JSON v0.17.1+ [~/.julia/dev/JSON]\n...By default, the package gets cloned to the ~/.julia/dev folder but can also be set by the JULIA_PKG_DEVDIR environment variable. When we have fixed the bug and checked that JSON now works correctly with our project, we can make a PR to the JSON repository. When the PR has been merged we can go over to track the master branch and finally when a new release of JSON is made, we can go back to using the versioned JSON using the command free and update (see next section):(HelloWorld) pkg> free JSON\n Resolving package versions...\n  Updating \"~/Documents/HelloWorld/Project.toml\"\n [682c06a0] ~ JSON v0.17.1+ #master ⇒ v0.17.1\n  Updating \"~/Documents/HelloWorld/Manifest.toml\"\n [682c06a0] ~ JSON v0.17.1+ #master ⇒ v0.17.1It is also possible to give a local path as the argument to develop which will not clone anything but simply use that directory for the package.Overriding the dependency path for a non-registered package is done by giving the git-repo url as an argument to develop."
},

{
    "location": "index.html#Updating-dependencies-1",
    "page": "Pkg",
    "title": "Updating dependencies",
    "category": "section",
    "text": "When new versions of packages the project is using are released, it is a good idea to update. Simply calling up will try to update all the dependencies of the project. Sometimes this is not what you want. You can specify a subset of the dependencies to upgrade by giving them as arguments to up, e.g:(HelloWorld) pkg> up JSONThe version of all other direct dependencies will stay the same. If you only want to update the minor version of packages, to reduce the risk that your project breaks, you can give the --minor flag, e.g:(HelloWorld) pkg> up --minor JSONPackages that track a branch are not updated when a minor upgrade is done. Developed packages are never touched by the package manager.If you just want to install the packages that are given by the current Manifest.toml use(HelloWorld) pkg> instantiate"
},

{
    "location": "index.html#Precompiling-the-project-1",
    "page": "Pkg",
    "title": "Precompiling the project",
    "category": "section",
    "text": "The REPL command precompile can be used to precompile all the dependencies in the project. You can for example do(HelloWorld) pkg> update; precompiledo update the dependencies and then precompile them."
},

{
    "location": "index.html#Preview-mode-1",
    "page": "Pkg",
    "title": "Preview mode",
    "category": "section",
    "text": "If you just want to see the effects of running a command, but not change your state you can preview a command. For example:(HelloWorld) pkg> preview add Plotsor(HelloWorld) pkg> preview upwill show you the effects of adding Plots, or doing a full upgrade, respectively, would have on your project. However, nothing would be installed and your Project.toml and Manfiest.toml are untouched."
},

{
    "location": "index.html#Using-someone-else\'s-project-1",
    "page": "Pkg",
    "title": "Using someone else\'s project",
    "category": "section",
    "text": "Simple clone their project using e.g. git clone, cd to the project directory and call(SomeProject) pkg> instantiateIf the project contains a manifest, this will install the packages in the same state that is given by that manifest. Otherwise, it will resolve the latest versions of the dependencies compatible with the project."
},

{
    "location": "index.html#Compatibility-1",
    "page": "Pkg",
    "title": "Compatibility",
    "category": "section",
    "text": "Compatibility refers to the ability to restrict what version of the dependencies that your project is compatible with. If the compatibility for a dependency is not given, the project is assumed to be compatible with all versions of that dependency.Compatibility for a dependency is entered in the Project.toml file as for example:[compat]\nExample = \"0.4.3\"After a compatibility entry is put into the project file, up can be used to apply it.The format of the version specifier is described in detail below.info: Info\nThere is currently no way to give compatibility from the Pkg REPL mode so for now, one has to manually edit the project file."
},

{
    "location": "index.html#Version-specifier-format-1",
    "page": "Pkg",
    "title": "Version specifier format",
    "category": "section",
    "text": "Similar to other package managers, the Julia package manager respects semantic versioning (semver). As an example, a version specifier is given as e.g. 1.2.3 is therefore assumed to be compatible with the versions [1.2.3 - 2.0.0) where ) is a non-inclusive upper bound. More specifically, a version specifier is either given as a caret specifier, e.g. ^1.2.3  or a tilde specifier ~1.2.3. Caret specifiers are the default and hence 1.2.3 == ^1.2.3. The difference between a caret and tilde is described in the next section."
},

{
    "location": "index.html#Caret-specifiers-1",
    "page": "Pkg",
    "title": "Caret specifiers",
    "category": "section",
    "text": "A caret specifier allows upgrade that would be compatible according to semver. An updated dependency is considered compatible if the new version does not modify the left-most non zero digit in the version specifier.Some examples are shown below.^1.2.3 = [1.2.3, 2.0.0)\n^1.2 = [1.2.0, 2.0.0)\n^1 =  [1.0.0, 2.0.0)\n^0.2.3 = [0.2.3, 0.3.0)\n^0.0.3 = [0.0.3, 0.0.4)\n^0.0 = [0.0.0, 0.1.0)\n^0 = [0.0.0, 1.0.0)While the semver specification says that all versions with a major version of 0 are incompatible with each other, we have made that choice that a version given as 0.a.b is considered compatible with 0.a.c if a != 0 and  c >= b."
},

{
    "location": "index.html#Tilde-specifiers-1",
    "page": "Pkg",
    "title": "Tilde specifiers",
    "category": "section",
    "text": "A tilde specifier provides more limited upgrade possibilities. With a tilde, only the last specified digit is allowed to increment by one. This gives the following example.~1.2.3 = [1.2.3, 1.2.4)\n~1.2 = [1.2.0, 1.3.0)\n~1 = [1.0.0, 2.0.0)"
},

]}
