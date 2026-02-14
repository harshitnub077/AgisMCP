# AegisMCP

AegisMCP is a centralized "Command Center" for Model Context Protocol (MCP) servers. It provides a dashboard to manage remote agents, visualize their connections, and monitor their health.

## Features

- **Fleet Command Dashboard**: Monitor the status of all your MCP servers.
- **Contextual Memory Graph**: Visual representation of your agentic network using `reactflow`.
- **Server Registration**: Easily add and manage MCP endpoints.
- **Secure Authentication**: Integration with Supabase Auth (GitHub).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Visualization**: React Flow
- **Icons**: Lucide React

## Getting Started

1.  Clone the repository.
2.  Copy `.env.local.example` to `.env.local` and add your Supabase credentials.
3.  Run `npm install`.
4.  Run `npm run dev`.
