#!/bin/bash
set -e
echo "=== ZeroDeploy Demo ==="
echo ""
echo "Starting server on port 3001..."
# In a real run: node dist/index.js & (background)
# For demo purposes, we show the API calls:

echo ""
echo "1. Health check:"
echo "   GET /health"
echo "   $(curl -s http://localhost:3001/health 2>/dev/null || echo '{"status":"server not running — start with: npm start"}')"
echo ""

echo "2. Analyze facebook/react:"
echo "   POST /api/analyze"
curl -s -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://github.com/facebook/react"}' 2>/dev/null | python3 -m json.tool 2>/dev/null || echo '{"status":"server not running"}'
echo ""

echo "3. Analyze via shorthand:"
echo "   GET /api/analyze/microsoft/vscode"
curl -s http://localhost:3001/api/analyze/microsoft/vscode 2>/dev/null | python3 -m json.tool 2>/dev/null || echo '{"status":"server not running"}'
echo ""

echo "4. Parse a URL:"
echo "   POST /api/parse"
curl -s -X POST http://localhost:3001/api/parse \
  -H "Content-Type: application/json" \
  -d '{"url":"https://github.com/aggreyeric/qwenflow"}' 2>/dev/null | python3 -m json.tool 2>/dev/null || echo '{"status":"server not running"}'
echo ""

echo "=== Demo Complete ==="
echo "Open http://localhost:3001 in a browser for the visual UI"
