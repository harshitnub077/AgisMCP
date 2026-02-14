---
name: mcp-health-check
description: A skill to ping registered remote MCP servers and validate their JSON-RPC adherence.
---

# MCP Health Check Skill

This skill allows the agent to validate the connectivity and protocol adherence of remote MCP servers.

## Instructions

1.  **Objective**: verify if a given MCP endpoint is reachable and responding correctly to JSON-RPC 2.0 requests.
2.  **Input**: `ENDPOINT_URL` (The URL of the MCP server) and optional `ACCESS_TOKEN`.
3.  **Mechanism**: strictly use `curl` to send a standard JSON-RPC `ping` or `initialize` request.
4.  **Output**: Return a JSON object indicating status: `{"status": "Online" | "Offline" | "High Latency", "latency_ms": number, "details": string}`.

## Execution Script (validate_mcp.sh)

```bash
#!/bin/bash

# Arguments
ENDPOINT=$1
TOKEN=$2

# Start time for latency check
start_time=$(date +%s%3N)

# JSON-RPC Payload for an 'initialize' or 'ping' equivalent
# MCP protocol requires version negotiation, here we send a minimal JSON-RPC request to check liveliness.
# We will assume a method 'ping' exists or check for a valid JSON-RPC error response which implies the server is active.
PAYLOAD='{"jsonrpc": "2.0", "method": "ping", "id": 1}'

# Headers
HEADER_CONTENT="Content-Type: application/json"
HEADER_AUTH="Authorization: Bearer $TOKEN"

if [ -z "$TOKEN" ]; then
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST -H "$HEADER_CONTENT" -d "$PAYLOAD" --max-time 5 "$ENDPOINT")
else
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST -H "$HEADER_CONTENT" -H "$HEADER_AUTH" -d "$PAYLOAD" --max-time 5 "$ENDPOINT")
fi

# End time
end_time=$(date +%s%3N)
latency=$((end_time - start_time))

# Process Response
HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

if [ "$HTTP_CODE" -eq 200 ]; then
    # Check if body is valid JSON-RPC (simple check)
    if echo "$HTTP_BODY" | grep -q "jsonrpc"; then
        STATUS="Online"
        if [ "$latency" -gt 1000 ]; then
            STATUS="High Latency"
        fi
        echo "{\"status\": \"$STATUS\", \"latency_ms\": $latency, \"details\": \"Valid JSON-RPC response received\"}"
    else
         echo "{\"status\": \"Offline\", \"latency_ms\": $latency, \"details\": \"Invalid JSON-RPC response body\"}"
    fi
else
    echo "{\"status\": \"Offline\", \"latency_ms\": $latency, \"details\": \"HTTP Error $HTTP_CODE\"}"
fi
```
