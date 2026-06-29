#!/bin/bash

echo "🧪 Testing Error Handler"
echo "========================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Start server
echo "🚀 Starting server..."
node src/server.js > /dev/null 2>&1 &
SERVER_PID=$!
sleep 2

BASE_URL="http://localhost:3000/api"

echo ""
echo "Test 1: GET non-existent board (should return 404 from Prisma P2025)"
echo "---------------------------------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" "$BASE_URL/boards/99999")
HTTP_CODE=$(echo "$RESPONSE" | grep HTTP_CODE | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Response: $BODY"
if [ "$HTTP_CODE" = "404" ] || [ "$HTTP_CODE" = "501" ]; then
  echo -e "${GREEN}✅ PASS - Returns 404 or 501 (not implemented yet)${NC}"
else
  echo -e "${RED}❌ FAIL - Expected 404 or 501${NC}"
fi

echo ""
echo "Test 2: DELETE non-existent board (should return 404 from Prisma P2025)"
echo "------------------------------------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X DELETE "$BASE_URL/boards/99999")
HTTP_CODE=$(echo "$RESPONSE" | grep HTTP_CODE | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Response: $BODY"
if [ "$HTTP_CODE" = "404" ] || [ "$HTTP_CODE" = "501" ]; then
  echo -e "${GREEN}✅ PASS - Returns 404 or 501 (not implemented yet)${NC}"
else
  echo -e "${RED}❌ FAIL - Expected 404 or 501${NC}"
fi

echo ""
echo "Test 3: POST card with invalid boardId (should fail with P2003 foreign key)"
echo "----------------------------------------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE_URL/cards" \
  -H "Content-Type: application/json" \
  -d '{"message": "Test", "gifUrl": "http://test.gif", "boardId": 99999}')
HTTP_CODE=$(echo "$RESPONSE" | grep HTTP_CODE | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Response: $BODY"
if [ "$HTTP_CODE" = "400" ] || [ "$HTTP_CODE" = "501" ]; then
  echo -e "${GREEN}✅ PASS - Returns 400 or 501 (not implemented yet)${NC}"
else
  echo -e "${YELLOW}⚠️  WARN - Expected 400 for invalid foreign key${NC}"
fi

echo ""
echo "Test 4: Validation error from middleware (empty title)"
echo "-------------------------------------------------------"
RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE_URL/boards" \
  -H "Content-Type: application/json" \
  -d '{"title": "", "category": "Test"}')
HTTP_CODE=$(echo "$RESPONSE" | grep HTTP_CODE | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE/d')
echo "Status: $HTTP_CODE"
echo "Response: $BODY"
if [ "$HTTP_CODE" = "400" ] && echo "$BODY" | grep -q "Title is required"; then
  echo -e "${GREEN}✅ PASS - Validation middleware catches empty title${NC}"
else
  echo -e "${RED}❌ FAIL - Should return 400 with 'Title is required'${NC}"
fi

echo ""
echo "========================"
echo "🎉 Error handler tests complete!"
echo ""
echo -e "${YELLOW}Note: Some tests expect 501 because controllers aren't implemented yet.${NC}"
echo -e "${YELLOW}Once Feature 1 & 2 implement controllers, you'll see proper error codes.${NC}"
echo ""

# Stop server
kill $SERVER_PID 2>/dev/null
