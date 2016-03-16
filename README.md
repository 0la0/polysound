### Polysound

Polysound is a web application for creating real-time electronic music in the browser.
It is built with the Polymer framework and utilizes both the Web Audio API and
the Web MIDI API.

### Run
After an NPM and bower install,
```
gulp serve
```

![screenshot](http://0la0.github.io/images/projects/browserSampler/sampler1.png)

### UI
The UI is organized in rows of audio or feature nodes. A node in a layer can connect to any node in the layer below, thus creating a directed acyclic audio graph.

#### Driver Row
The top row contains feature nodes that schedule sounds and parameters. Nodes include: sequencers, granular samplers, learning based sequencers, and MIDI device interfaces.

#### Instrument Row
The second row contains nodes that make sounds, such as samplers and synthesizers. By themselves they do nothing but hold audio buffers or oscillators, but they can be scheduled by driver nodes.

#### Effect Rows
The lower three rows contain effect nodes like equalizers, delays, reverbs, compressors, etc.

#### About
More project documentation: [http://0la0.github.io/#!/projects/browserSampler](http://0la0.github.io/#!/projects/browserSampler)
