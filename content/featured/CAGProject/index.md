---
date: '2'
title: 'CAG - Cache-Augmented Generation'
cover: './demo.gif'
github: 'https://github.com/kris225/cag'
external: ''
tech:
  - Python
  - Vertex AI
  - LLM
  - Embeddings
  - RAG
---

A lightweight alternative to RAG that grounds LLM responses using your own documentation. Features semantic chunking of markdown docs by sections, vector embeddings via text-embedding-005 for retrieval, cosine similarity search to find relevant context, and chat history summarization to reduce token costs on long conversations. Built with Vertex AI (Gemini 2.5 Flash) and includes token usage tracking with cost estimation.
