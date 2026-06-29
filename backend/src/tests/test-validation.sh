#!/bin/bash

echo "🧪 Testing Validation Middleware"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Start server in background
echo "🚀 Starting server..."
node src/server.js > /dev/null 2>&1 &
SERVER_PID=$!
sleep 2

BASE_URL="http://localhost:3000/api"

echo ""
echo "Test 1: Create board WITHOUT title (should fail)"
echo "------------------------------------------------"
RESPONSE=$(curl -s -X POST "$BASE_URL/boards" \
  -H "Content-Type: application/json" \
  -d '{"category": "Celebration"}')
echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q "Title is required"; then
  echo -e "${GREEN}✅ PASS - Validation rejected missing title${NC}"
else
  echo -e "${RED}❌ FAIL - Should have rejected missing title${NC}"
fi

echo ""
echo "Test 2: Create board WITHOUT category (should fail)"
echo "----------------------------------------------------"
RESPONSE=$(curl -s -X POST "$BASE_URL/boards" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Board"}')
echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q "Category is required"; then
  echo -e "${GREEN}✅ PASS - Validation rejected missing category${NC}"
else
  echo -e "${RED}❌ FAIL - Should have rejected missing category${NC}"
fi

echo ""
echo "Test 3: Create board with empty title (should fail)"
echo "----------------------------------------------------"
RESPONSE=$(curl -s -X POST "$BASE_URL/boards" \
  -H "Content-Type: application/json" \
  -d '{"title": "   ", "category": "Test"}')
echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q "Title is required"; then
  echo -e "${GREEN}✅ PASS - Validation rejected empty title${NC}"
else
  echo -e "${RED}❌ FAIL - Should have rejected empty title${NC}"
fi

echo ""
echo "Test 4: Create card WITHOUT message (should fail)"
echo "--------------------------------------------------"
RESPONSE=$(curl -s -X POST "$BASE_URL/cards" \
  -H "Content-Type: application/json" \
  -d '{"gifUrl": "http://giphy.com/test.gif", "boardId": 1}')
echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q "Message is required"; then
  echo -e "${GREEN}✅ PASS - Validation rejected missing message${NC}"
else
  echo -e "${RED}❌ FAIL - Should have rejected missing message${NC}"
fi

echo ""
echo "Test 5: Create card WITHOUT gifUrl (should fail)"
echo "-------------------------------------------------"
RESPONSE=$(curl -s -X POST "$BASE_URL/cards" \
  -H "Content-Type: application/json" \
  -d '{"message": "Test message", "boardId": 1}')
echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q "GIF URL is required"; then
  echo -e "${GREEN}✅ PASS - Validation rejected missing gifUrl${NC}"
else
  echo -e "${RED}❌ FAIL - Should have rejected missing gifUrl${NC}"
fi

echo ""
echo "Test 6: Create card WITHOUT boardId (should fail)"
echo "--------------------------------------------------"
RESPONSE=$(curl -s -X POST "$BASE_URL/cards" \
  -H "Content-Type: application/json" \
  -d '{"message": "Test", "gifUrl": "http://test.gif"}')
echo "Response: $RESPONSE"
if echo "$RESPONSE" | grep -q "Board ID is required"; then
  echo -e "${GREEN}✅ PASS - Validation rejected missing boardId${NC}"
else
  echo -e "${RED}❌ FAIL - Should have rejected missing boardId${NC}"
fi

echo ""
echo "================================"
echo "🎉 Validation tests complete!"
echo ""

# Stop server
kill $SERVER_PID 2>/dev/null
