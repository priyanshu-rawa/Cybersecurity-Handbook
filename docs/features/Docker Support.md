---
title: "Docker Support"
tags:
  - feature
---

Quartz comes shipped with a Docker image that will allow you to preview your Quartz locally without installing Node.

You can run the below one-liner to run Quartz in Docker.

```sh
docker run --rm -itp 8080:8080 -p 3001:3001 -v ./content:/usr/src/app/content $(docker build -q .)
```

> [!warning] Not to be used for production
> Serve mode is intended for local previews only.
> For production workloads, see the page on [[hosting]].
