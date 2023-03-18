org-nTOxkgZLTvhaLuKHzHQ1FGfe
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

curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "Say this is a test!"}],
     "temperature": 0.7
   }'