---
title: If you use a spell-book, you might believe its magic.
date: "2024-11-21"
description: "A observation about developer's growth opportunities"
---

*Do you leverage a text file to copy-paste helpful commands for every day development? This might be for you.*

I have noticed people have text files that contain various saved commands or workflows like

```
kubectl get pods ...
# or
vault login; export ENV_SECRET=$(vault kv get secrets/teamname/some/fun/secret); ENV_SECRET ./gradlew bootRun
```
...and sometimes, plaintext secrets

As I have asked people about these files, thematically, they are used to relieve cognitive load involved in development. While not inherently bad, these files can act as a crutch that inhibits a software developer's growth and subtly impact your team. This article will unpack these potential impacts and talk about how they can evolve. Lastly, I refer to these files “spell-books” because people execute commands like they are “casting spells” that work as if a magic trick they don't understand.

## Remove secrets from your spell-books

First, let’s quickly cover secrets in these files. Stop reading this and go delete them. If they are in Vault you can leverage something like the example above `vault login; export ENV_SECRET=$(vault kv get secrets/teamname/some/fun/secret);` to dynamically inject a secret into your spell. In addition, it is highly probable that the rest of your team also needs access to that secret to do their work anyway!

## The potential harms from using spell-books 

Without secrets, these files can be helpful orchestrating a complicated legacy environment, replicating an intricate test scenario, or executing a verbose access request. It makes sense. You want to focus on developing toward the feature you are working on. Unfortunately leveraging your spell book could cost your team or others focus when one doesn’t work. The most common spell I encounter is some variant of: `set-k8s-cluster-context && aws-vault ... -- kubectl ...`. And there is kind of a lot happening here. You are fetching a temporary credential to one of multiple AWS accounts, targeting a Kubernetes specific cluster in a specific region, using those temporary AWS credentials to low-key authenticate you to the target cluster and this maps to a service account in Kubernetes which restricts you to a team prefixed namespace. When I see these commands fail for people, they will say “whoops wrong spell” and choose a different one. Or worse they get stuck.

My observation is that this usage leads people to lose sight of how these mechanisms play an important role in their work. I am not suggesting that you should be able to type a specific command cold. However I do worry that when these spells fail, their next step is interrupting the flow of a colleague for troubleshooting. This means they both pay the cost of context switching to resolve a “broken spell”. This might even require getting the attention of infrastructure team. Unfortunately spells mix application and infrastructure context which can make it harder for both parties to debug. 

Again, I want to emphasize that it is understandable to encapsulate complexity to focus on what you care about in your day-to-day. But beware these lists can grow big and you might be hiding important context from your team that should be shared!

## How to ditch the spells and mitigate the risks 

First, you should not have individual ones for everyday development. Instead these should be a shared team resource like dotfiles, shared scripts, or downloadable artifacts. This is a great exercise for a junior engineer to own or work on. I found it gave me super powers when things basic local development broke.

Second, the spells you don’t understand is a great signal about where to invest time for growth. Focus on the contours of these problems and not the specific solutions. For example, `set-k8s-cluster-context` does not mean you should know how to write `kubectl config use-context target-cluster` but you should understand that `kubectl` will depend on an implicit understanding of which cluster it targets when you execute other commands. This becomes important when you get a “resource not found”-style error, all because you are probably just pointing to the wrong cluster. I have seen people spin on this for way too long!

Third, there are mechanisms that can help you learn these spells without the hassle of tedious typing. You can take advantage of a reverse index search in your bash_history (`control+r`) to help you find that command you executed before. This forces you to remember the cli tool you require and the structural elements of the command that are important.

Lastly, these spells are actually feedback to some interface! If an API is complicated to orchestrate or access, those same complications can result in people making mistakes or bad assumptions elsewhere about how a system works. Sometimes the provider of the API you calling can make things simpler for you and them! If you cannot get onto the priority queue of the upstream system you can at least integrate this feedback into your shared tooling. 

That is all I have and hope you enjoyed the read!



## A special thanks to
* Thomas Baker for some thoughtful insights on spells he has encountered
* Patrick McFadden for some early editor notes
* Luke Dowell for incredible feedback and the great conversation that sparked this idea